// Basic server-side input sanitisation for form fields.
// Strips HTML tags, collapses whitespace, trims, and enforces a max length.

export function sanitizeText(value, { maxLen = 2000, allowNewlines = true } = {}) {
  if (value === undefined || value === null) return ''
  let s = String(value)
  // Strip all HTML tags (we never render user HTML)
  s = s.replace(/<\/?[a-z][^>]*>/gi, '')
  // Strip script/style residues just in case (defence-in-depth)
  s = s.replace(/javascript:/gi, '')
  s = s.replace(/on\w+\s*=/gi, '')
  // Normalise newlines
  if (!allowNewlines) s = s.replace(/[\r\n]+/g, ' ')
  // Collapse excessive whitespace (keep single newlines if allowed)
  s = allowNewlines
    ? s.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n')
    : s.replace(/\s+/g, ' ')
  s = s.trim()
  if (s.length > maxLen) s = s.slice(0, maxLen)
  return s
}

export function sanitizeEmail(value) {
  const s = sanitizeText(value, { maxLen: 200, allowNewlines: false }).toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return ''
  return s
}

export function sanitizePhone(value) {
  return sanitizeText(value, { maxLen: 40, allowNewlines: false }).replace(/[^+\d\s()\-]/g, '')
}

export function sanitizeForm(obj, schema) {
  const out = {}
  for (const [key, rules] of Object.entries(schema)) {
    const v = obj?.[key]
    switch (rules.type) {
      case 'email':
        out[key] = sanitizeEmail(v)
        break
      case 'phone':
        out[key] = sanitizePhone(v)
        break
      case 'bool':
        out[key] = Boolean(v)
        break
      case 'number':
        out[key] = Number.isFinite(Number(v)) ? Number(v) : 0
        break
      case 'array':
        out[key] = Array.isArray(v) ? v.map(item => (typeof item === 'string' ? sanitizeText(item, rules) : item)) : []
        break
      default:
        out[key] = sanitizeText(v, rules)
    }
  }
  return out
}

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
