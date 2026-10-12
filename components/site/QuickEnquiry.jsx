'use client'

// Short call-back form (name, phone, need) for pages where the full /contact form is
// too much friction. Posts to the same /api/contact pipeline with tab: 'quick', which the
// API accepts without email/company; rate limit and reCAPTCHA apply exactly as for /contact.
// reCAPTCHA's script is only fetched on submit, so this adds no load-time weight.

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, PhoneCall } from 'lucide-react'
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

const inputStyle = { background: '#fff', border: '1.5px solid #D8DEE9', color: '#0B1A46' }
const inputClass = 'w-full px-3 py-3 rounded-lg text-sm focus:outline-none focus:border-[#E87722] focus:ring-[3px] focus:ring-[#E87722]/15'

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
    <section className="px-6" style={{ background: '#F4F6FA', paddingTop: '48px', paddingBottom: '48px' }} aria-labelledby="quick-enquiry-heading">
      <div className="max-w-[1200px] mx-auto bg-white rounded-2xl" style={{ borderTop: '3px solid #E87722', boxShadow: '0 8px 32px rgba(10,26,70,0.10)', padding: '28px' }}>
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-6 lg:gap-10 items-center">
          <div>
            <div className="flex items-center gap-2 mb-2" style={{ color: '#E87722' }}>
              <PhoneCall size={16} aria-hidden="true" />
              <span className="mono text-[11px] uppercase tracking-widest font-bold">Request a Call Back</span>
            </div>
            <h2 id="quick-enquiry-heading" className="font-extrabold" style={{ color: '#0B1A46', fontSize: 'clamp(1.15rem, 2.4vw, 1.4rem)', lineHeight: 1.25 }}>
              Tell us what you need. An engineer calls you back within 4 business hours.
            </h2>
          </div>

          {submitted ? (
            <div className="flex items-center gap-4 p-5 rounded-xl" role="status" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.35)' }}>
              <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(34,197,94,0.15)' }}>
                <Check size={22} style={{ color: '#16a34a' }} />
              </div>
              <div>
                <p className="font-bold" style={{ color: '#0B1A46' }}>Thanks, we have your request.</p>
                <p className="text-sm" style={{ color: '#4A5878' }}>Our team will call you within 4 business hours (UAE 09:00-18:00).</p>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="grid sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr_auto] gap-3">
                <label className="block">
                  <span className="sr-only">Your name</span>
                  <input
                    type="text" name="name" autoComplete="name" placeholder="Your name *" required maxLength={120}
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={inputClass} style={inputStyle}
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Phone or WhatsApp number</span>
                  <input
                    type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="Phone / WhatsApp *" required maxLength={40}
                    value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className={inputClass} style={inputStyle}
                  />
                </label>
                <label className="block sm:col-span-2 lg:col-span-1">
                  <span className="sr-only">What do you need?</span>
                  <select
                    name="service" value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                    className={inputClass} style={{ ...inputStyle, color: form.service ? '#0B1A46' : '#6B7280' }}
                  >
                    <option value="">What do you need?</option>
                    {NEEDS.map(n => <option key={n} value={n} style={{ color: '#0B1A46' }}>{n}</option>)}
                  </select>
                </label>
                <button type="submit" disabled={submitting} className="btn-primary justify-center whitespace-nowrap disabled:opacity-60 sm:col-span-2 lg:col-span-1">
                  {submitting ? 'Sending…' : <>Call Me Back <ArrowRight size={15} /></>}
                </button>
              </div>
              {err && (
                <p className="text-red-600 text-sm mt-3" role="alert">{err}</p>
              )}
              <p className="text-xs mt-3" style={{ color: '#6B7280' }}>
                By submitting, you agree to our <Link href="/privacy-policy" className="underline hover:text-[#E87722]">privacy policy</Link> and to be contacted about this enquiry. Protected by reCAPTCHA.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
