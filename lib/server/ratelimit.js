// Simple in-memory fixed-window rate limiter keyed by (bucket + ip).
// Limits: 5 requests per IP per 10 minutes by default.
// Note: In-memory store is per-process only — for production behind multiple workers,
// swap in MongoDB/Redis. Sufficient for MVP launch.

const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_HITS = 5

// Map<string, { count: number, resetAt: number }>
const store = new Map()

// Opportunistic cleanup: on every call, drop entries past reset
function cleanup(now) {
  if (store.size < 5000) return
  for (const [k, v] of store) {
    if (v.resetAt <= now) store.delete(k)
  }
}

export function getClientIp(request) {
  const h = request.headers
  const fwd = h.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  const real = h.get('x-real-ip')
  if (real) return real.trim()
  const cf = h.get('cf-connecting-ip')
  if (cf) return cf.trim()
  return 'unknown'
}

/**
 * @returns {{ ok: boolean, remaining: number, resetAt: number, retryAfterSec: number }}
 */
export function rateLimit(bucket, ip, { max = MAX_HITS, windowMs = WINDOW_MS } = {}) {
  const now = Date.now()
  cleanup(now)
  const key = `${bucket}:${ip}`
  const entry = store.get(key)

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, remaining: max - 1, resetAt: now + windowMs, retryAfterSec: 0 }
  }
  if (entry.count >= max) {
    return { ok: false, remaining: 0, resetAt: entry.resetAt, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) }
  }
  entry.count += 1
  return { ok: true, remaining: max - entry.count, resetAt: entry.resetAt, retryAfterSec: 0 }
}
