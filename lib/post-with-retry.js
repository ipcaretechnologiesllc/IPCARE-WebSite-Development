// Form POSTs retry once when Cloudflare could not connect to the origin at all.
//
// 525 (origin TLS handshake failed) and 522 (origin TCP connect timed out) mean the
// request never reached the API route, so sending it again cannot create a duplicate
// lead or email. In Sep 2026 about 1 in 9 uncached requests hit a 525 while
// Hostinger's network layer stalled Cloudflare's handshakes. Every other status,
// including 502/503/504/524 where the origin may already have processed the request,
// and network errors, is returned or thrown unchanged and never retried.
//
// buildInit is called for every attempt so each one gets a fresh reCAPTCHA token:
// tokens are single-use, expire after 2 minutes, and a 525 can take ~15s to arrive.
const RETRYABLE_STATUSES = new Set([522, 525])

export async function postWithRetry(url, buildInit, { retries = 1, delayMs = 800 } = {}) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(url, await buildInit())
    if (!RETRYABLE_STATUSES.has(res.status) || attempt >= retries) return res
    await new Promise((resolve) => setTimeout(resolve, delayMs))
  }
}
