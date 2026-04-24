// Thin SendGrid v3 Mail Send wrapper — uses direct fetch (no extra dependency).
// If SENDGRID_API_KEY is missing we MOCK by logging to the server console and return { mocked: true }.

const SEND_URL = 'https://api.sendgrid.com/v3/mail/send'
const DEFAULT_FROM_NAME = 'IP Care Technologies'

export async function sendMail({ to, subject, html, replyTo, cc, bcc, attachments, categories } = {}) {
  const apiKey = process.env.SENDGRID_API_KEY
  const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'no-reply@ipcare.ae'
  const fromName = process.env.SENDGRID_FROM_NAME || DEFAULT_FROM_NAME

  if (!Array.isArray(to)) to = [to]
  to = to.filter(Boolean)
  if (!to.length || !subject || !html) {
    return { ok: false, error: 'missing-required-fields' }
  }

  const personalization = {
    to: to.map(e => (typeof e === 'string' ? { email: e } : e)),
  }
  if (cc?.length) personalization.cc = cc.map(e => ({ email: e }))
  if (bcc?.length) personalization.bcc = bcc.map(e => ({ email: e }))

  const payload = {
    personalizations: [personalization],
    from: { email: fromEmail, name: fromName },
    subject,
    content: [{ type: 'text/html', value: html }],
  }
  if (replyTo) payload.reply_to = { email: replyTo }
  if (categories?.length) payload.categories = categories
  if (attachments?.length) payload.attachments = attachments

  if (!apiKey) {
    console.log('[SendGrid][MOCKED]', {
      to: to.map(t => (typeof t === 'string' ? t : t.email)),
      subject,
      replyTo,
      attachmentsCount: attachments?.length || 0,
      categories,
    })
    return { ok: true, mocked: true, reason: 'SENDGRID_API_KEY not configured' }
  }

  try {
    const res = await fetch(SEND_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error('[SendGrid] send failed', res.status, text.slice(0, 500))
      return { ok: false, status: res.status, error: text.slice(0, 500) }
    }
    return { ok: true, status: res.status, messageId: res.headers.get('x-message-id') || null }
  } catch (err) {
    console.error('[SendGrid] exception', err.message)
    return { ok: false, error: err.message }
  }
}
