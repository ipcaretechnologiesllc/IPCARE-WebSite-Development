import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { rateLimit, getClientIp } from '@/lib/server/ratelimit'
import { sendRows, clickRow } from '@/lib/server/leads-sheet'

// Logs phone / WhatsApp / email button taps to the "Click log" tab of the leads sheet.
// Fired by the delegated click listener in components/global/Analytics.jsx. A tap is an
// intent, not a confirmed call or message. No IP or user agent is stored: they are only
// hashed in memory to ignore repeat taps from the same visitor within 60 seconds.

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const ACTIONS = { phone: 'Phone', whatsapp: 'WhatsApp', email: 'Email' }
const TARGET_RE = /^(tel:\+?[\d\s()-]{5,25}|mailto:[^\s]{3,100}|https:\/\/(wa\.me|api\.whatsapp\.com|chat\.whatsapp\.com)\/[^\s]{0,100})$/i
const ALLOWED_HOSTS = new Set(['www.ipcare.ae', 'ipcare.ae', 'www.ipcare.ca', 'ipcare.ca'])
const BOT_RE = /bot|crawl|spider|headless|lighthouse|pagespeed|curl|wget|python|axios|node-fetch|go-http/i
const DEDUPE_MS = 60 * 1000

// key -> expiry (ms). One process, in memory: good enough to absorb double taps; a restart
// at worst lets one repeat through.
const seen = new Map()

function sameSite(request) {
  const src = request.headers.get('origin') || request.headers.get('referer') || ''
  try {
    const host = new URL(src).hostname
    return ALLOWED_HOSTS.has(host) || (process.env.NODE_ENV !== 'production' && host === 'localhost')
  } catch {
    return false
  }
}

const done = () => new NextResponse(null, { status: 204 })

export async function POST(request) {
  try {
    if (!sameSite(request)) return new NextResponse(null, { status: 403 })
    const ua = request.headers.get('user-agent') || ''
    if (!ua || BOT_RE.test(ua)) return done()

    const ip = getClientIp(request)
    // Generous: a real visitor rarely taps more than a handful of contact links per visit.
    if (!rateLimit('track', ip, { max: 30, windowMs: 10 * 60 * 1000 }).ok) return done()

    const body = await request.json().catch(() => null)
    const action = ACTIONS[body?.action]
    const target = typeof body?.target === 'string' ? body.target.trim() : ''
    const page = typeof body?.page === 'string' ? body.page.split('?')[0].slice(0, 200) : ''
    if (!action || !page.startsWith('/') || !TARGET_RE.test(target)) return new NextResponse(null, { status: 400 })
    const text = typeof body?.text === 'string' ? body.text.replace(/\s+/g, ' ').trim().slice(0, 100) : ''

    const now = Date.now()
    for (const [k, exp] of seen) if (exp <= now) seen.delete(k)
    const key = createHash('sha1').update(`${ip}|${ua}|${action}|${page}|${target}`).digest('hex')
    if (seen.has(key)) return done()
    seen.set(key, now + DEDUPE_MS)

    await sendRows([clickRow({ action, page, text, target })])
    return done()
  } catch (e) {
    console.error('[track] error:', e?.name || 'error')
    return done()
  }
}
