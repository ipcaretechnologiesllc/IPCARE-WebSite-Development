// app/api/rental/quote/route.js
//
// Dedicated rental-quote endpoint — takes precedence over the catch-all
// app/api/[[...path]]/route.js for this exact path.
//
// Does NOT require MongoDB.  Pipeline:
//   rate-limit → parse + sanitise → validate → reCAPTCHA → send emails → return ref
//
// Env vars (all optional during development — route degrades gracefully):
//   RESEND_API_KEY           → if absent, emails are console-mocked; submissions still succeed
//   QUOTE_TO_EMAIL           → recipient for the team notification (default: info@ipcare.ae)
//   QUOTE_FROM_EMAIL         → sender address (default: IP Care no-reply@ipcare.ae)
//                              Falls back to onboarding@resend.dev when domain is not yet
//                              verified in Resend (automatic retry on send failure).
//   RECAPTCHA_SECRET_KEY     → if absent, reCAPTCHA is bypassed (safe for local testing)
//   NEXT_PUBLIC_RECAPTCHA_SITE_KEY → must be set in .env.local for the client widget to fire

import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { sanitizeForm, sanitizeText } from '@/lib/server/sanitize'
import { verifyRecaptchaToken } from '@/lib/server/recaptcha'
import { rateLimit, getClientIp } from '@/lib/server/ratelimit'
import { tplRentalQuoteTeam, tplRentalQuoteAutoReply } from '@/lib/server/emailTemplates'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// ── Config ────────────────────────────────────────────────────────────────────
const TO_EMAIL    = process.env.QUOTE_TO_EMAIL   || 'info@ipcare.ae'
const FROM_DOMAIN = process.env.QUOTE_FROM_EMAIL || 'IP Care Technologies <no-reply@ipcare.ae>'
const FALLBACK_FROM = 'onboarding@resend.dev'      // used when domain not yet verified in Resend
const RECAPTCHA_THRESHOLD = 0.3                    // conservative — raise to 0.5 after 2-4 weeks of traffic
const RL_MAX = 5
const RL_WINDOW_MS = 10 * 60 * 1000               // 5 submissions per IP per 10 minutes

// ── Resend client (lazy singleton) ───────────────────────────────────────────
let _resend = null
function getResend() {
  if (_resend) return _resend
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  _resend = new Resend(key)
  return _resend
}

// ── Reference generator: RFQ-YYYYMMDD-XXXX ───────────────────────────────────
function makeReference() {
  const d = new Date()
  const date = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`
  const alpha = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // no ambiguous chars (0/O, 1/I)
  const rand  = Array.from({ length: 4 }, () => alpha[Math.floor(Math.random() * alpha.length)]).join('')
  return `RFQ-${date}-${rand}`
}

// ── Email sender with automatic domain-fallback ───────────────────────────────
async function sendEmail(client, { from, to, subject, html, replyTo }) {
  // No API key → mock (log only); submission still succeeds
  if (!client) {
    console.log('[rental-quote][MOCKED] email not sent — RESEND_API_KEY missing:', { from, to, subject, replyTo })
    return { ok: true, mocked: true }
  }

  const payload = { from, to: Array.isArray(to) ? to : [to], subject, html }
  if (replyTo) payload.replyTo = replyTo

  try {
    const { data, error } = await client.emails.send(payload)
    if (error) {
      console.error('[rental-quote] Resend error:', error.name, error.statusCode, error.message?.slice(0, 200))
      return { ok: false, error: error.message, status: error.statusCode }
    }
    return { ok: true, messageId: data?.id }
  } catch (err) {
    console.error('[rental-quote] Resend exception:', err.message)
    return { ok: false, error: err.message }
  }
}

async function sendWithFallback(client, opts) {
  const result = await sendEmail(client, { ...opts, from: FROM_DOMAIN })
  if (result.ok) return result

  // If the primary domain address fails, retry from the Resend onboarding address.
  // This handles the "domain not verified" case during initial setup.
  console.warn('[rental-quote] Primary FROM failed — retrying from onboarding@resend.dev. Error:', result.error)
  return sendEmail(client, { ...opts, from: FALLBACK_FROM })
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function jsonErr(message, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status })
}

// ═══════════════════════════════════════════════════════════════════════════════
// POST /api/rental/quote
// ═══════════════════════════════════════════════════════════════════════════════
export async function POST(request) {
  const ip = getClientIp(request)

  // ── 1. Rate limit ────────────────────────────────────────────────────────────
  const rl = rateLimit('rental-quote-v2', ip, { max: RL_MAX, windowMs: RL_WINDOW_MS })
  if (!rl.ok) {
    return jsonErr('too-many-requests', 429)
  }

  // ── 2. Parse body ────────────────────────────────────────────────────────────
  let body = {}
  try {
    body = await request.json()
  } catch {
    return jsonErr('invalid-request-body', 400)
  }

  // ── 3. Sanitise form fields ──────────────────────────────────────────────────
  const clean = sanitizeForm(body, {
    fullName:      { type: 'text',  maxLen: 120,  allowNewlines: false },
    company:       { type: 'text',  maxLen: 160,  allowNewlines: false },
    email:         { type: 'email'                                     },
    phone:         { type: 'phone'                                     },
    country:       { type: 'text',  maxLen: 40,   allowNewlines: false },
    projectName:   { type: 'text',  maxLen: 160,  allowNewlines: false },
    startDate:     { type: 'text',  maxLen: 20,   allowNewlines: false },
    endDate:       { type: 'text',  maxLen: 20,   allowNewlines: false },
    location:      { type: 'text',  maxLen: 400,  allowNewlines: true  },
    setupRequired: { type: 'text',  maxLen: 10,   allowNewlines: false },
    requirements:  { type: 'text',  maxLen: 3000, allowNewlines: true  },
    source:        { type: 'text',  maxLen: 60,   allowNewlines: false },
  })

  // ── 4. Validate required fields ──────────────────────────────────────────────
  if (!clean.fullName)  return jsonErr('missing-required-fields', 400)
  if (!clean.email)     return jsonErr('missing-required-fields', 400)
  if (!clean.phone)     return jsonErr('missing-required-fields', 400)
  if (!clean.startDate) return jsonErr('missing-required-fields', 400)
  if (!clean.endDate)   return jsonErr('missing-required-fields', 400)
  if (!clean.location)  return jsonErr('missing-required-fields', 400)

  // ── 5. Sanitise items ────────────────────────────────────────────────────────
  const rawItems = Array.isArray(body.items) ? body.items.slice(0, 50) : []
  if (rawItems.length === 0) {
    return jsonErr('cart-is-empty', 400)
  }
  const items = rawItems.map(it => ({
    brand:    sanitizeText(it?.product?.brand    || it?.brand    || '', { maxLen: 80,  allowNewlines: false }),
    model:    sanitizeText(it?.product?.model    || it?.model    || '', { maxLen: 120, allowNewlines: false }),
    category: sanitizeText(it?.product?.categoryName || it?.category || '', { maxLen: 80, allowNewlines: false }),
    duration: sanitizeText(it?.duration || '', { maxLen: 20, allowNewlines: false }),
    quantity: Math.max(1, Math.min(999, Number(it?.quantity ?? 1) || 1)),
  }))

  // ── 6. Verify reCAPTCHA ──────────────────────────────────────────────────────
  const captcha = await verifyRecaptchaToken(body.recaptchaToken, {
    action:    'rental_quote',
    threshold: RECAPTCHA_THRESHOLD,
    remoteip:  ip,
  })
  console.log(
    `[rental-quote][recaptcha] score=${captcha.score} ok=${captcha.ok} ip=${ip}` +
    `${captcha.bypassed ? ' (bypassed — no secret key)' : ''}` +
    `${captcha.error    ? ' error=' + captcha.error : ''}`
  )
  if (!captcha.ok) {
    return jsonErr('captcha-failed', 403)
  }

  // ── 7. Generate reference ────────────────────────────────────────────────────
  const reference = makeReference()
  const ua        = (request.headers.get('user-agent') || '').slice(0, 300)

  // ── 8. Build email content ───────────────────────────────────────────────────
  const teamTpl = tplRentalQuoteTeam({
    reference,
    ...clean,
    items,
    ipAddress: ip,
    userAgent: ua,
  })
  const autoTpl = tplRentalQuoteAutoReply({
    reference,
    fullName: clean.fullName,
  })

  const client = getResend()

  // ── 9a. Send team notification (required) ────────────────────────────────────
  const teamResult = await sendWithFallback(client, {
    to:       TO_EMAIL,
    subject:  teamTpl.subject,
    html:     teamTpl.html,
    replyTo:  clean.email,
  })

  if (!teamResult.ok && !teamResult.mocked) {
    console.error('[rental-quote] Team email send failed after fallback. ref:', reference)
    return jsonErr('Could not submit quote. Please try again or call +971 2 676 6935.', 500)
  }

  // ── 9b. Send auto-reply to customer (best-effort — never fails the submission) ─
  sendWithFallback(client, {
    to:      clean.email,
    subject: autoTpl.subject,
    html:    autoTpl.html,
    replyTo: TO_EMAIL,
  }).catch(err => console.warn('[rental-quote] auto-reply exception (ignored):', err.message))

  // ── 10. Respond ──────────────────────────────────────────────────────────────
  console.log(
    `[rental-quote] success ref=${reference} email=${clean.email} items=${items.length}` +
    `${teamResult.mocked ? ' [MOCKED — add RESEND_API_KEY to send real emails]' : ''}`
  )
  return NextResponse.json({ ok: true, reference })
}

// Only POST is supported
export async function GET()    { return NextResponse.json({ ok: false, error: 'method-not-allowed' }, { status: 405 }) }
export async function PUT()    { return NextResponse.json({ ok: false, error: 'method-not-allowed' }, { status: 405 }) }
export async function DELETE() { return NextResponse.json({ ok: false, error: 'method-not-allowed' }, { status: 405 }) }
export async function OPTIONS(){ return new NextResponse(null, { status: 204 }) }
