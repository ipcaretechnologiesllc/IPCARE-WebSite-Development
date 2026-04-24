// Server-side reCAPTCHA v3 verification.
// Returns { ok, score, action, hostname, reasons } — caller decides policy (score threshold).

const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'
const DEFAULT_THRESHOLD = 0.5

export async function verifyRecaptchaToken(token, { action, threshold = DEFAULT_THRESHOLD, remoteip } = {}) {
  const secret = process.env.RECAPTCHA_SECRET_KEY

  // If no secret configured, treat as BYPASS in dev so forms still work before keys are loaded.
  if (!secret) {
    return { ok: true, score: 1.0, action: action || 'unknown', bypassed: true, reason: 'RECAPTCHA_SECRET_KEY not configured' }
  }
  if (!token) {
    return { ok: false, score: 0, error: 'missing-token' }
  }
  try {
    const params = new URLSearchParams({ secret, response: token })
    if (remoteip) params.set('remoteip', remoteip)
    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    })
    const data = await res.json().catch(() => ({}))
    if (!data?.success) {
      return { ok: false, score: 0, error: 'verify-failed', reasons: data?.['error-codes'] || [] }
    }
    const score = typeof data.score === 'number' ? data.score : 0
    const actionMatch = action ? data.action === action : true
    const ok = score >= threshold && actionMatch
    return { ok, score, action: data.action, hostname: data.hostname, threshold, actionMatch }
  } catch (err) {
    return { ok: false, score: 0, error: 'verify-exception', message: err.message }
  }
}
