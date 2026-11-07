'use client'

// Standalone "thank you" card shown in place of an enquiry form after a successful
// submit. Shared by the Contact page, the QuickEnquiry call-back form and the rental
// quote modal so all three confirm a submission the same way.
//
// `reference` is the code the API returns (CN-/RQ-YYYYMMDD-XXXXXX). It is shown with a
// copy button and is the same value that is stamped on the team notification email, so
// a customer quoting it lets the team find the enquiry instantly.
//
// variant 'light' = white card on the light page; 'dark' = navy card inside the rental modal.

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Check, Copy, ArrowRight, Home, Phone } from 'lucide-react'

const PHONE_TEL = 'tel:+97126766935'
const WHATSAPP_URL = 'https://wa.me/971506828290'
// Same glyph as the floating WhatsApp button (components/global/WhatsAppButton.jsx).
const WHATSAPP_GLYPH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.695.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z'

export default function EnquirySuccessCard({
  title,
  message,
  reference = '',
  referenceHint = 'Please quote this reference if you contact us about this enquiry.',
  variant = 'light',
  onReset,
  resetLabel = 'Send another enquiry',
  onDone,
  doneLabel = 'Done',
  showHome = true,
  showUrgent = true,
}) {
  const dark = variant === 'dark'
  const pathname = usePathname()
  const cardRef = useRef(null)
  const [copied, setCopied] = useState(false)

  // The form (taller) is swapped for this card, so bring it into view and move focus
  // to it for keyboard / screen-reader users.
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    el.focus({ preventScroll: true })
    el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [])

  async function copyReference() {
    try {
      await navigator.clipboard.writeText(reference)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be blocked (insecure context, permissions); the reference is
      // plain selectable text, so nothing else to do.
    }
  }

  const c = dark
    ? { title: '#FFFFFF', text: 'rgba(255,255,255,0.78)', label: 'rgba(255,255,255,0.55)', refBg: 'rgba(255,255,255,0.05)', refBorder: 'rgba(232,119,34,0.45)', refText: '#FFFFFF', hint: 'rgba(255,255,255,0.55)', divider: 'rgba(255,255,255,0.1)', link: '#F28A2E', ghost: 'rgba(255,255,255,0.8)' }
    : { title: '#0B1A46', text: '#4A5878', label: '#6B7280', refBg: '#FFF7F0', refBorder: 'rgba(232,119,34,0.4)', refText: '#0B1A46', hint: '#6B7280', divider: '#E1E8F0', link: '#E87722', ghost: '#4A5878' }

  const wrapStyle = dark
    ? { background: 'rgba(11,26,70,0.97)', borderTop: '3px solid #E87722', padding: '40px 28px' }
    : { background: '#fff', borderTop: '3px solid #E87722', boxShadow: '0 8px 32px rgba(10,26,70,0.12)', padding: '44px 32px' }

  return (
    <div
      ref={cardRef}
      tabIndex={-1}
      role="status"
      aria-live="polite"
      className={`${dark ? 'glass-card' : ''} rounded-2xl text-center focus:outline-none`}
      style={wrapStyle}
    >
      <div
        className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-5"
        style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.4)' }}
      >
        <Check size={28} style={{ color: dark ? '#4ADE80' : '#16a34a' }} aria-hidden="true" />
      </div>

      <h2 className="font-bold mb-2" style={{ color: c.title, fontSize: '1.6rem', lineHeight: 1.2 }}>{title}</h2>
      <p className="mx-auto max-w-[460px]" style={{ color: c.text }}>{message}</p>

      {reference && (
        <div className="mx-auto mt-7 max-w-[420px]">
          <div className="mono text-[11px] uppercase tracking-widest mb-2" style={{ color: c.label }}>
            Your reference number
          </div>
          <div
            className="flex items-center justify-between gap-3 rounded-xl px-4 py-3"
            style={{ background: c.refBg, border: `1.5px dashed ${c.refBorder}` }}
          >
            <span className="mono font-bold select-all break-all text-left" style={{ color: c.refText, fontSize: '1.15rem', letterSpacing: '0.06em' }}>
              {reference}
            </span>
            <button
              type="button"
              onClick={copyReference}
              className="inline-flex items-center gap-1.5 flex-shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
              style={{ background: copied ? '#16a34a' : '#E87722', color: '#fff' }}
              aria-label={copied ? 'Reference copied' : 'Copy reference number'}
            >
              {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p className="text-xs mt-2.5" style={{ color: c.hint }}>{referenceHint}</p>
        </div>
      )}

      {showUrgent && (
        <div className="mt-7 pt-6 text-sm" style={{ borderTop: `1px solid ${c.divider}`, color: c.text }}>
          <div className="mb-4">Urgent? Reach us directly:</div>
          {/* Same round buttons as the floating Call / WhatsApp buttons (CallNowButton, WhatsAppButton). */}
          <div className="flex items-start justify-center gap-10">
            <a href={PHONE_TEL} aria-label="Call us on +971 2 676 6935" className="group flex flex-col items-center gap-2 no-underline">
              <span
                className="flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                style={{ width: 56, height: 56, borderRadius: 9999, background: '#FFFFFF', border: '2px solid #E87722', boxShadow: '0 4px 14px rgba(0,0,0,0.20)' }}
              >
                <Phone size={24} color="#E87722" strokeWidth={2} aria-hidden="true" />
              </span>
              <span className="font-semibold" style={{ color: c.title }}>Call us</span>
              <span className="mono text-xs" style={{ color: c.hint }}>+971 2 676 6935</span>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp +971 50 682 8290" className="group flex flex-col items-center gap-2 no-underline">
              <span
                className="flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
                style={{ width: 56, height: 56, borderRadius: 9999, background: '#25D366', boxShadow: '0 4px 12px rgba(0,0,0,0.25)' }}
              >
                <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" fill="#ffffff"><path d={WHATSAPP_GLYPH} /></svg>
              </span>
              <span className="font-semibold" style={{ color: c.title }}>WhatsApp</span>
              <span className="mono text-xs" style={{ color: c.hint }}>+971 50 682 8290</span>
            </a>
          </div>
        </div>
      )}

      {(onReset || onDone || (showHome && pathname !== '/')) && (
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {onDone && (
            <button type="button" onClick={onDone} className="btn-primary justify-center">
              {doneLabel} <ArrowRight size={14} aria-hidden="true" />
            </button>
          )}
          {onReset && (
            <button type="button" onClick={onReset} className="btn-primary justify-center">
              {resetLabel} <ArrowRight size={14} aria-hidden="true" />
            </button>
          )}
          {showHome && pathname !== '/' && (
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline" style={{ color: c.ghost }}>
              <Home size={14} aria-hidden="true" /> Back to home
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
