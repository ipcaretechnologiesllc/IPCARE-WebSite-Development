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
import { Check, Copy, ArrowRight, Home, Phone, MessageCircle } from 'lucide-react'

const PHONE_TEL = 'tel:+97126766935'
const WHATSAPP_URL = 'https://wa.me/971506828290'

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
          <div className="mb-2">Urgent? Reach us directly:</div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-semibold">
            <a href={PHONE_TEL} className="inline-flex items-center gap-2 hover:underline" style={{ color: c.link }}>
              <Phone size={14} aria-hidden="true" /> +971 2 676 6935
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline" style={{ color: c.link }}>
              <MessageCircle size={14} aria-hidden="true" /> WhatsApp +971 50 682 8290
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
