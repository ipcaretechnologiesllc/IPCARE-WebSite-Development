'use client'

// Client-side reCAPTCHA v3 helper.
// - Loads google.com/recaptcha/api.js?render={SITE_KEY} once on demand.
// - Exposes getRecaptchaToken(action): Promise<string>
// - If NEXT_PUBLIC_RECAPTCHA_SITE_KEY is missing, returns '' (dev bypass — server will also bypass).

let loadPromise = null

function loadRecaptchaScript(siteKey) {
  if (loadPromise) return loadPromise
  loadPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return resolve(null)
    if (window.grecaptcha && window.grecaptcha.execute) return resolve(window.grecaptcha)
    const existing = document.querySelector('script[data-ipcare-recaptcha]')
    if (existing) {
      existing.addEventListener('load', () => resolve(window.grecaptcha))
      existing.addEventListener('error', reject)
      return
    }
    const s = document.createElement('script')
    s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`
    s.async = true
    s.defer = true
    s.setAttribute('data-ipcare-recaptcha', '1')
    s.onload = () => {
      if (window.grecaptcha?.ready) {
        window.grecaptcha.ready(() => resolve(window.grecaptcha))
      } else {
        resolve(window.grecaptcha)
      }
    }
    s.onerror = () => reject(new Error('Failed to load reCAPTCHA'))
    document.head.appendChild(s)
  })
  return loadPromise
}

export async function getRecaptchaToken(action = 'submit') {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  if (!siteKey || typeof window === 'undefined') return ''
  try {
    const grc = await loadRecaptchaScript(siteKey)
    if (!grc?.execute) return ''
    const token = await grc.execute(siteKey, { action })
    return token || ''
  } catch (e) {
    console.warn('[recaptcha] token error:', e?.message)
    return ''
  }
}

export function isRecaptchaConfigured() {
  return !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
}
