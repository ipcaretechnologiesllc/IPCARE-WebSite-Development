// Thin Resend wrapper — drop-in replacement for the previous SendGrid wrapper.
// Keeps the EXACT same exported function signature (sendMail) so no caller
// in the codebase needs to change beyond the import path.
//
// If RESEND_API_KEY is missing we MOCK by logging to the server console
// and return { ok: true, mocked: true } — same behaviour as before.

import { Resend } from 'resend'

// Hardcoded from-address per spec — no longer driven by env var.
const FROM_ADDRESS = 'IP Care Technologies <no-reply@ipcare.ae>'

// Lazy-init so importing this module never throws when the key is absent.
let _client = null
function getClient() {
  if (_client) return _client
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  _client = new Resend(key)
  return _client
}

/**
 * sendMail — same signature as the old SendGrid wrapper.
 *
 * @param {Object}   opts
 * @param {string|string[]} opts.to         Recipient email(s)
 * @param {string}   opts.subject
 * @param {string}   opts.html
 * @param {string=}  opts.replyTo
 * @param {string[]=} opts.cc
 * @param {string[]=} opts.bcc
 * @param {Array<{content:string|Buffer, filename:string, type?:string, disposition?:string}>=} opts.attachments
 *                                          `content` is base64 string (legacy SendGrid format) OR Buffer.
 * @param {string[]=} opts.categories       Mapped to Resend tags ([{name:'category', value:<cat>}])
 */
export async function sendMail({ to, subject, html, replyTo, cc, bcc, attachments, categories } = {}) {
  // Normalise recipients
  if (!Array.isArray(to)) to = [to]
  to = to
    .filter(Boolean)
    .map(e => (typeof e === 'string' ? e : (e && e.email) || null))
    .filter(Boolean)

  if (!to.length || !subject || !html) {
    return { ok: false, error: 'missing-required-fields' }
  }

  // Normalise attachments to Resend's expected format:
  //   { filename: string, content: Buffer | string(base64) }
  // The existing callers in route.js pass base64-encoded strings (SendGrid legacy
  // format) — we convert those to Buffer to be safe with Resend's strictest typing.
  let resendAttachments
  if (Array.isArray(attachments) && attachments.length) {
    resendAttachments = attachments.map(a => {
      let buf
      if (Buffer.isBuffer(a.content)) buf = a.content
      else if (typeof a.content === 'string') {
        // Assume base64 (that's what the old route.js produced)
        try { buf = Buffer.from(a.content, 'base64') }
        catch { buf = Buffer.from(a.content) }
      }
      return {
        filename: a.filename,
        content: buf,
        ...(a.type ? { contentType: a.type } : {}),
      }
    })
  }

  // Map SendGrid-style "categories" → Resend tags.
  // Resend tag values must match /^[A-Za-z0-9_-]+$/, so we sanitise.
  let tags
  if (Array.isArray(categories) && categories.length) {
    tags = categories.map((c, i) => ({
      name: i === 0 ? 'category' : `category_${i + 1}`,
      value: String(c).replace(/[^A-Za-z0-9_-]/g, '_').slice(0, 256),
    }))
  }

  // ---- MOCK PATH (no API key) ----
  const client = getClient()
  if (!client) {
    console.log('[Resend][MOCKED]', {
      to,
      subject,
      replyTo,
      attachmentsCount: resendAttachments?.length || 0,
      categories,
    })
    return { ok: true, mocked: true, reason: 'RESEND_API_KEY not configured' }
  }

  // ---- LIVE PATH ----
  try {
    const payload = {
      from: FROM_ADDRESS,
      to,
      subject,
      html,
    }
    if (replyTo) payload.replyTo = replyTo
    if (Array.isArray(cc) && cc.length) payload.cc = cc
    if (Array.isArray(bcc) && bcc.length) payload.bcc = bcc
    if (resendAttachments) payload.attachments = resendAttachments
    if (tags) payload.tags = tags

    const { data, error } = await client.emails.send(payload)

    if (error) {
      console.error('[Resend] send failed', error.statusCode || '', error.name || '', (error.message || '').slice(0, 500))
      return { ok: false, status: error.statusCode || 500, error: error.message || 'send-failed' }
    }
    return { ok: true, status: 200, messageId: data?.id || null }
  } catch (err) {
    console.error('[Resend] exception', err.message)
    return { ok: false, error: err.message }
  }
}
