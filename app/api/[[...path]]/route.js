import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { sanitizeForm, sanitizeText, sanitizeEmail, escapeHtml } from '@/lib/server/sanitize'
import { rateLimit, getClientIp } from '@/lib/server/ratelimit'
import { verifyRecaptchaToken } from '@/lib/server/recaptcha'
import { sendMail } from '@/lib/server/resend'
import {
  tplContactTeam, tplContactAutoReply, tplContactRentalAutoReply,
  tplRentalQuoteTeam, tplRentalQuoteAutoReply,
  tplCareerTeam, tplCareerAutoReply,
  tplNewsletterWelcome,
} from '@/lib/server/emailTemplates'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// ---------- Config ----------
const INFO_EMAIL = process.env.CONTACT_TO_EMAIL || 'info@ipcare.ae'
const HR_EMAIL = process.env.CAREERS_TO_EMAIL || 'hr@ipcare.ae'
// reCAPTCHA v3 score threshold. Defaults to 0.3 — Google's "catch most bots" recommendation,
// which is the right value for newly-launched domains where Google hasn't yet learned the
// site's normal traffic patterns. Raise to 0.5 once you've seen 2-4 weeks of real traffic
// and confirmed scores are consistently ≥ 0.5 for legitimate users.
const RECAPTCHA_THRESHOLD = Number(process.env.RECAPTCHA_THRESHOLD || 0.3)
const MAX_PDF_BYTES = 5 * 1024 * 1024 // 5 MB
const RL_MAX = 5
const RL_WINDOW_MS = 10 * 60 * 1000

// ---------- DB ----------
let cachedClient = null
async function getDb() {
  if (cachedClient) return cachedClient.db(process.env.DB_NAME || 'ipcare')
  const client = new MongoClient(process.env.MONGO_URL)
  await client.connect()
  cachedClient = client
  return client.db(process.env.DB_NAME || 'ipcare')
}

// ---------- CORS ----------
// Previously `Access-Control-Allow-Origin: *`, which let any website on the internet
// read this API's responses from a visitor's browser. The forms that call this route
// are all same-origin, so an explicit allowlist costs nothing and closes that hole.
// Same-origin requests don't need CORS headers at all — the browser permits them
// regardless — so omitting the header for unknown origins is the correct default.
const ALLOWED_ORIGINS = new Set([
  'https://www.ipcare.ae',
  'https://www.ipcare.ca',
])

function corsHeaders(request) {
  const headers = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    // Responses differ by Origin — without this, a shared cache could serve one
    // origin's CORS headers to another.
    'Vary': 'Origin',
  }
  const origin = request?.headers?.get('origin') || ''
  if (!origin) return headers
  const allowed = ALLOWED_ORIGINS.has(origin) ||
    (process.env.NODE_ENV !== 'production' && /^https?:\/\/localhost(:\d+)?$/.test(origin))
  if (allowed) headers['Access-Control-Allow-Origin'] = origin
  return headers
}

export async function OPTIONS(request) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request) })
}

function jsonOk(request, data, init) {
  return NextResponse.json({ ok: true, ...data }, { headers: corsHeaders(request), ...init })
}
function jsonErr(request, error, status = 400, extra = {}) {
  return NextResponse.json({ ok: false, error, ...extra }, { status, headers: corsHeaders(request) })
}

// ---------- Helpers ----------
function newRentalReference() {
  const d = new Date()
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  // 6-char uppercase alnum suffix (no confusables)
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let rand = ''
  for (let i = 0; i < 6; i++) rand += alphabet[Math.floor(Math.random() * alphabet.length)]
  return `RQ-${y}${m}${day}-${rand}`
}

function newContactReference() {
  const d = new Date()
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let rand = ''
  for (let i = 0; i < 6; i++) rand += alphabet[Math.floor(Math.random() * alphabet.length)]
  return `CN-${y}${m}${day}-${rand}`
}

// PDF magic bytes: %PDF-  =>  0x25 0x50 0x44 0x46 0x2D
function isValidPdfMagic(buf) {
  if (!buf || buf.length < 5) return false
  return buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46 && buf[4] === 0x2D
}

async function enforceRateLimit(request, bucket) {
  const ip = getClientIp(request)
  const rl = rateLimit(bucket, ip, { max: RL_MAX, windowMs: RL_WINDOW_MS })
  if (!rl.ok) {
    return {
      ip,
      response: jsonErr(request, 'too-many-requests', 429, { retryAfter: rl.retryAfterSec }),
    }
  }
  return { ip, response: null }
}

// Length-independent comparison so a wrong token can't be recovered by timing responses.
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

// `GET /api/rental/quotes` reads customer names, companies and email addresses out of
// the leads collection. It previously had NO authentication — it was live and returning
// real lead data to anyone who asked. It now requires a bearer token, and when
// ADMIN_API_TOKEN is unset it reports 404 (fail closed, and doesn't advertise itself).
function isAuthorizedAdmin(request) {
  const expected = process.env.ADMIN_API_TOKEN
  if (!expected) return false
  const auth = request.headers.get('authorization') || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : ''
  return safeEqual(token, expected)
}

// ---------- GET ----------
export async function GET(request, props) {
  const params = await props.params;
  const path = (params?.path || []).join('/')
  if (path === '' || path === 'health') {
    return jsonOk(request, { service: 'IP Care Technologies API', time: new Date().toISOString() })
  }
  if (path === 'rental/quotes') {
    if (!isAuthorizedAdmin(request)) return jsonErr(request, 'not-found', 404)
    try {
      const db = await getDb()
      const docs = await db.collection('leads').find(
        { type: { $in: ['rental-quote', 'quote', 'contact'] } },
        { projection: { _id: 0, id: 1, reference: 1, type: 1, 'customer.fullName': 1, 'customer.company': 1, 'customer.email': 1, createdAt: 1, status: 1 } }
      ).sort({ createdAt: -1 }).limit(100).toArray()
      return jsonOk(request, { count: docs.length, leads: docs })
    } catch (e) {
      console.error('[api] rental/quotes error:', e)
      return jsonErr(request, 'server-error', 500)
    }
  }
  return jsonErr(request, 'not-found', 404)
}

// ---------- POST ----------
export async function POST(request, props) {
  const params = await props.params;
  const path = (params?.path || []).join('/')
  const userAgent = (request.headers.get('user-agent') || '').slice(0, 300)

  try {
    // Careers uses multipart/form-data because of the PDF upload.
    // All others are JSON.
    const isCareers = path === 'careers/apply'
    const contentType = request.headers.get('content-type') || ''
    let body = {}
    let pdfAttachment = null

    if (isCareers && contentType.includes('multipart/form-data')) {
      const formData = await request.formData().catch(() => null)
      if (!formData) return jsonErr(request, 'invalid-form-data', 400)

      body = {
        name: formData.get('name'),
        email: formData.get('email'),
        role: formData.get('role'),
        cover: formData.get('cover'),
        recaptchaToken: formData.get('recaptchaToken'),
      }
      const file = formData.get('cv')
      if (file && typeof file !== 'string' && file.size > 0) {
        if (file.size > MAX_PDF_BYTES) return jsonErr(request, 'file-too-large', 413, { maxBytes: MAX_PDF_BYTES })
        if (!(file.type === 'application/pdf' || (file.name || '').toLowerCase().endsWith('.pdf'))) {
          return jsonErr(request, 'invalid-file-type', 400)
        }
        const ab = await file.arrayBuffer()
        const buf = Buffer.from(ab)
        if (!isValidPdfMagic(buf)) return jsonErr(request, 'invalid-pdf-signature', 400)
        pdfAttachment = {
          filename: (file.name || 'cv.pdf').replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80),
          size: file.size,
          buffer: buf,
        }
      }
    } else {
      body = await request.json().catch(() => ({}))
    }

    // =====================================================================
    // NEWSLETTER — welcome email only, no team email
    // =====================================================================
    if (path === 'newsletter/subscribe') {
      const { ip, response } = await enforceRateLimit(request, 'newsletter')
      if (response) return response

      const clean = sanitizeForm(body, { email: { type: 'email' }, source: { type: 'text', maxLen: 40, allowNewlines: false } })
      if (!clean.email) return jsonErr(request, 'invalid-email', 400)

      const db = await getDb()
      const coll = db.collection('newsletter_subscribers')
      const existing = await coll.findOne({ email: clean.email }, { projection: { _id: 1 } })
      if (existing) return jsonOk(request, { duplicate: true })

      const token = uuidv4().replace(/-/g, '')
      const doc = {
        id: uuidv4(),
        email: clean.email,
        source: clean.source || 'website',
        subscribedAt: new Date().toISOString(),
        ipAddress: ip,
        userAgent,
        unsubscribeToken: token,
      }
      await coll.insertOne(doc)

      const unsubscribeUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'}/unsubscribe?token=${token}`
      const welcome = tplNewsletterWelcome({ unsubscribeUrl })
      const r = await sendMail({ to: clean.email, subject: welcome.subject, html: welcome.html, replyTo: INFO_EMAIL, categories: ['newsletter', 'welcome'] })
      return jsonOk(request, { emailSent: r.ok, mocked: !!r.mocked })
    }

    // =====================================================================
    // CONTACT — info@ipcare.ae + auto-reply. reCAPTCHA verified.
    // =====================================================================
    if (path === 'contact') {
      const { ip, response } = await enforceRateLimit(request, 'contact')
      if (response) return response

      const clean = sanitizeForm(body, {
        name: { type: 'text', maxLen: 120, allowNewlines: false },
        company: { type: 'text', maxLen: 160, allowNewlines: false },
        email: { type: 'email' },
        phone: { type: 'phone' },
        country: { type: 'text', maxLen: 40, allowNewlines: false },
        service: { type: 'text', maxLen: 80, allowNewlines: false },
        message: { type: 'text', maxLen: 3000, allowNewlines: true },
        tab: { type: 'text', maxLen: 20, allowNewlines: false },
      })
      if (!clean.name || !clean.email || !clean.company || !clean.phone) {
        return jsonErr(request, 'missing-required-fields', 400)
      }

      // reCAPTCHA v3
      const captcha = await verifyRecaptchaToken(body.recaptchaToken, { action: 'contact', threshold: RECAPTCHA_THRESHOLD, remoteip: ip })
      console.log(`[recaptcha] action=contact score=${captcha.score} threshold=${RECAPTCHA_THRESHOLD} ok=${captcha.ok} ip=${ip}${captcha.bypassed ? ' (bypassed)' : ''}${captcha.error ? ' error=' + captcha.error : ''}`)
      if (!captcha.ok) return jsonErr(request, 'captcha-failed', 400)

      const reference = newContactReference()
      const db = await getDb()
      const doc = {
        id: uuidv4(), reference, type: 'contact', ...clean,
        createdAt: new Date().toISOString(), ipAddress: ip, userAgent,
        recaptchaScore: captcha.score, recaptchaBypassed: !!captcha.bypassed,
      }
      await db.collection('leads').insertOne(doc)

      const team = tplContactTeam({ ...clean, reference, ipAddress: ip, userAgent })
      const teamRes = await sendMail({ to: INFO_EMAIL, subject: team.subject, html: team.html, replyTo: clean.email, categories: ['contact', 'team'] })
      const auto = clean.tab === 'rental'
        ? tplContactRentalAutoReply({ name: clean.name })
        : tplContactAutoReply({ name: clean.name })
      const autoRes = await sendMail({ to: clean.email, subject: auto.subject, html: auto.html, replyTo: INFO_EMAIL, categories: ['contact', 'auto-reply'] })

      return jsonOk(request, { reference })
    }

    // =====================================================================
    // RENTAL QUOTE — info@ + auto-reply. reCAPTCHA verified. RQ-YYYYMMDD-XXXXXX
    // =====================================================================
    if (path === 'rental/quote' || path === 'quote') {
      const { ip, response } = await enforceRateLimit(request, 'rental')
      if (response) return response

      const clean = sanitizeForm(body, {
        fullName: { type: 'text', maxLen: 120, allowNewlines: false },
        company: { type: 'text', maxLen: 160, allowNewlines: false },
        email: { type: 'email' },
        phone: { type: 'phone' },
        country: { type: 'text', maxLen: 40, allowNewlines: false },
        projectName: { type: 'text', maxLen: 160, allowNewlines: false },
        startDate: { type: 'text', maxLen: 20, allowNewlines: false },
        endDate: { type: 'text', maxLen: 20, allowNewlines: false },
        location: { type: 'text', maxLen: 400, allowNewlines: true },
        setupRequired: { type: 'text', maxLen: 10, allowNewlines: false },
        requirements: { type: 'text', maxLen: 3000, allowNewlines: true },
        source: { type: 'text', maxLen: 60, allowNewlines: false },
      })
      if (!clean.fullName || !clean.email || !clean.company || !clean.phone || !clean.startDate || !clean.endDate || !clean.location) {
        return jsonErr(request, 'missing-required-fields', 400)
      }

      const captcha = await verifyRecaptchaToken(body.recaptchaToken, { action: 'rental_quote', threshold: RECAPTCHA_THRESHOLD, remoteip: ip })
      console.log(`[recaptcha] action=rental_quote score=${captcha.score} threshold=${RECAPTCHA_THRESHOLD} ok=${captcha.ok} ip=${ip}${captcha.bypassed ? ' (bypassed)' : ''}${captcha.error ? ' error=' + captcha.error : ''}`)
      if (!captcha.ok) return jsonErr(request, 'captcha-failed', 400)

      // Sanitise and limit items array.
      // Cart items arrive as { product: { brand, model, slug, ... }, duration, quantity, ... }
      // Fallback to flat shape (it?.brand) for any legacy callers.
      const rawItems = Array.isArray(body.items) ? body.items.slice(0, 50) : []
      const items = rawItems.map(it => ({
        brand:    sanitizeText(it?.product?.brand    ?? it?.brand,    { maxLen: 80,  allowNewlines: false }),
        model:    sanitizeText(it?.product?.model    ?? it?.model,    { maxLen: 120, allowNewlines: false }),
        slug:     sanitizeText(it?.product?.slug     ?? it?.slug,     { maxLen: 120, allowNewlines: false }),
        category: sanitizeText(it?.product?.categoryName ?? it?.category, { maxLen: 80, allowNewlines: false }),
        quantity: Math.max(1, Math.min(999, Number(it?.quantity ?? it?.qty ?? 1) || 1)),
        duration: sanitizeText(it?.duration, { maxLen: 20, allowNewlines: false }),
      }))

      const reference = newRentalReference()
      const db = await getDb()
      const doc = {
        id: uuidv4(), reference, type: 'rental-quote',
        customer: clean, items, ipAddress: ip, userAgent,
        recaptchaScore: captcha.score, recaptchaBypassed: !!captcha.bypassed,
        createdAt: new Date().toISOString(), status: 'new',
      }
      await db.collection('leads').insertOne(doc)

      const team = tplRentalQuoteTeam({ reference, ...clean, items, ipAddress: ip, userAgent })
      await sendMail({ to: INFO_EMAIL, subject: team.subject, html: team.html, replyTo: clean.email, categories: ['rental-quote', 'team'] })
      const auto = tplRentalQuoteAutoReply({ reference, fullName: clean.fullName })
      await sendMail({ to: clean.email, subject: auto.subject, html: auto.html, replyTo: INFO_EMAIL, categories: ['rental-quote', 'auto-reply'] })

      return jsonOk(request, { reference })
    }

    // =====================================================================
    // CAREERS — hr@ipcare.ae + auto-reply. PDF attached. Multipart form.
    // =====================================================================
    if (isCareers) {
      const { ip, response } = await enforceRateLimit(request, 'careers')
      if (response) return response

      const clean = sanitizeForm(body, {
        name: { type: 'text', maxLen: 120, allowNewlines: false },
        email: { type: 'email' },
        role: { type: 'text', maxLen: 160, allowNewlines: false },
        cover: { type: 'text', maxLen: 5000, allowNewlines: true },
      })
      if (!clean.name || !clean.email || !clean.role) return jsonErr(request, 'missing-required-fields', 400)

      const captcha = await verifyRecaptchaToken(body.recaptchaToken, { action: 'careers', threshold: RECAPTCHA_THRESHOLD, remoteip: ip })
      console.log(`[recaptcha] action=careers score=${captcha.score} threshold=${RECAPTCHA_THRESHOLD} ok=${captcha.ok} ip=${ip}${captcha.bypassed ? ' (bypassed)' : ''}${captcha.error ? ' error=' + captcha.error : ''}`)
      if (!captcha.ok) return jsonErr(request, 'captcha-failed', 400)

      const reference = `JOB-${Date.now().toString().slice(-10)}`
      const db = await getDb()
      await db.collection('career_applications').insertOne({
        id: uuidv4(), reference,
        ...clean,
        cvFileName: pdfAttachment?.filename || null,
        cvSize: pdfAttachment?.size || null,
        cvReceived: !!pdfAttachment,
        ipAddress: ip, userAgent,
        recaptchaScore: captcha.score, recaptchaBypassed: !!captcha.bypassed,
        createdAt: new Date().toISOString(),
      })

      const teamAttachments = pdfAttachment ? [{
        content: pdfAttachment.buffer.toString('base64'),
        filename: pdfAttachment.filename,
        type: 'application/pdf',
        disposition: 'attachment',
      }] : undefined

      const team = tplCareerTeam({
        name: clean.name, email: clean.email, role: clean.role, cover: clean.cover,
        cvFileName: pdfAttachment?.filename, cvSize: pdfAttachment?.size,
        ipAddress: ip, userAgent,
      })
      await sendMail({ to: HR_EMAIL, subject: team.subject, html: team.html, replyTo: clean.email, attachments: teamAttachments, categories: ['careers', 'team'] })
      const auto = tplCareerAutoReply({ name: clean.name, role: clean.role })
      await sendMail({ to: clean.email, subject: auto.subject, html: auto.html, replyTo: HR_EMAIL, categories: ['careers', 'auto-reply'] })

      return jsonOk(request, { reference, cvReceived: !!pdfAttachment, cvSize: pdfAttachment?.size || null })
    }

    return jsonErr(request, 'not-found', 404)
  } catch (e) {
    // Log the detail server-side; return a generic string to the client. Previously
    // `e.message` was sent to the browser, which can leak Mongo connection details,
    // internal hostnames and driver internals to anyone who can trigger an error.
    console.error('[api] route error:', path, e)
    return jsonErr(request, 'server-error', 500)
  }
}
