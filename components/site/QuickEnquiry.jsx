'use client'

// Short call-back form (name, phone, need) for pages where the full /contact form is
// too much friction. Posts to the same /api/contact pipeline with tab: 'quick', which the
// API accepts without email/company; rate limit and reCAPTCHA apply exactly as for /contact.
// reCAPTCHA's script is only fetched on submit, so this adds no load-time weight.

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, PhoneCall, ShieldCheck, Headphones, Award } from 'lucide-react'
import { getRecaptchaToken } from '@/lib/recaptcha-client'
import { postWithRetry } from '@/lib/post-with-retry'
import { trackLead } from '@/lib/analytics'

const NEEDS = [
  'Event IT & Temporary Infrastructure',
  'Managed IT Services',
  'Cybersecurity',
  'CCTV & Access Control',
  'Structured Cabling & Networks',
  'Cloud Services',
  'Equipment Rental',
  'Other',
]

const POINTS = [
  { I: ShieldCheck, text: 'No-Obligation Consultation' },
  { I: Award, text: '20+ Years Of Enterprise Delivery' },
  { I: Headphones, text: '24/7 Support Across The UAE & GCC' },
]

const inputStyle = { background: '#fff', border: '1.5px solid #D8DEE9', color: '#0B1A46' }
const inputClass = 'w-full px-3.5 py-3 rounded-lg text-sm focus:outline-none focus:border-[#E87722] focus:ring-[3px] focus:ring-[#E87722]/15 transition-colors'

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="mono text-[11px] uppercase tracking-widest block mb-1.5" style={{ color: '#0B1A46' }}>
    {children}
  </label>
)

export default function QuickEnquiry({ source = 'homepage' }) {
  const [form, setForm] = useState({ name: '', phone: '', service: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [err, setErr] = useState('')

  async function submit(e) {
    e.preventDefault()
    setErr('')
    if (!form.name.trim() || form.phone.replace(/\D/g, '').length < 7) {
      setErr('Please enter your name and a valid phone number.')
      return
    }
    setSubmitting(true)
    try {
      const res = await postWithRetry('/api/contact', async () => ({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tab: 'quick', source, recaptchaToken: await getRecaptchaToken('contact') }),
      }))
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        if (data.error === 'captcha-failed') setErr('Security check failed. Please refresh the page and try again.')
        else if (data.error === 'too-many-requests') setErr('Too many submissions from your IP. Please try again in a few minutes.')
        else setErr('Submission failed, please try again or call +971 2 676 6935.')
        setSubmitting(false)
        return
      }
      trackLead('quick_enquiry', { enquiry_type: 'quick', service: form.service || '(none)', source })
      setSubmitted(true)
    } catch { setErr('Submission failed, please try again or call +971 2 676 6935.') }
    setSubmitting(false)
  }

  return (
    <section className="px-6" style={{ background: '#F4F6FA', paddingTop: '56px', paddingBottom: '56px' }} aria-labelledby="quick-enquiry-heading">
      <div
        className="max-w-[1200px] mx-auto rounded-2xl overflow-hidden grid lg:grid-cols-[5fr_7fr]"
        style={{ borderTop: '3px solid #E87722', boxShadow: '0 12px 40px rgba(10,26,70,0.14)' }}
      >
        {/* ── Left: pitch ─────────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden p-6 sm:p-8 lg:p-10 flex flex-col justify-center"
          style={{ background: 'linear-gradient(135deg, #0B1A46 0%, #0F245F 55%, #1E3A8A 100%)' }}
        >
          <div className="premium-grid" style={{ position: 'absolute', inset: 0, opacity: 0.25 }} aria-hidden="true" />
          <div style={{ position: 'absolute', top: '-90px', right: '-60px', width: '280px', height: '280px', background: 'radial-gradient(circle, rgba(232,119,34,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} aria-hidden="true" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4" style={{ color: '#E87722' }}>
              <PhoneCall size={15} aria-hidden="true" />
              <span className="mono text-[11px] uppercase tracking-widest font-bold">Request A Call Back</span>
            </div>
            <h2 id="quick-enquiry-heading" className="font-extrabold text-white mb-3" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', lineHeight: 1.15 }}>
              Tell Us What <span className="text-[#E87722]">You Need</span>
            </h2>
            <p className="sm:mb-7" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.02rem', lineHeight: 1.5 }}>
              An Engineer Calls You Back Within <strong className="text-white">4 Business Hours</strong>.
            </p>
            <ul className="hidden sm:block space-y-3">
              {POINTS.map(({ I, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.88)' }}>
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(232,119,34,0.14)', border: '1px solid rgba(232,119,34,0.35)' }}>
                    <I size={15} style={{ color: '#E87722' }} aria-hidden="true" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Right: form ─────────────────────────────────────────────── */}
        <div className="bg-white p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          {submitted ? (
            <div className="text-center py-8" role="status">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.4)' }}>
                <Check size={28} style={{ color: '#16a34a' }} />
              </div>
              <h3 className="font-bold text-2xl mb-2" style={{ color: '#0B1A46' }}>Thank You, We Have Your Request</h3>
              <p style={{ color: '#4A5878' }}>Our team will call you within 4 business hours (UAE 09:00-18:00).</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="qe-name">Your Name *</Label>
                  <input
                    id="qe-name" type="text" name="name" autoComplete="name" placeholder="Full name" required maxLength={120}
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={inputClass} style={inputStyle}
                  />
                </div>
                <div>
                  <Label htmlFor="qe-phone">Phone / WhatsApp *</Label>
                  <input
                    id="qe-phone" type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="+971 50 123 4567" required maxLength={40}
                    value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className={inputClass} style={inputStyle}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="qe-service">What Do You Need?</Label>
                <select
                  id="qe-service" name="service" value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                  className={inputClass} style={{ ...inputStyle, color: form.service ? '#0B1A46' : '#6B7280' }}
                >
                  <option value="">Select a service</option>
                  {NEEDS.map(n => <option key={n} value={n} style={{ color: '#0B1A46' }}>{n}</option>)}
                </select>
              </div>
              {err && (
                <div className="text-red-600 text-sm p-3 rounded-lg" role="alert" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.25)' }}>{err}</div>
              )}
              <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-60">
                {submitting ? 'Sending…' : <>Call Me Back <ArrowRight size={15} /></>}
              </button>
              <p className="text-xs text-center" style={{ color: '#6B7280' }}>
                By submitting, you agree to our <Link href="/privacy-policy" className="underline hover:text-[#E87722]">privacy policy</Link> and to be contacted about this enquiry. Protected by reCAPTCHA.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
