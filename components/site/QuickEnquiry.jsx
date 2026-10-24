'use client'

// Short call-back form (name, phone, need) for pages where the full /contact form is
// too much friction. Posts to the same /api/contact pipeline with tab: 'quick', which the
// API accepts without email/company; rate limit and reCAPTCHA apply exactly as for /contact.
// reCAPTCHA's script is only fetched on submit, so this adds no load-time weight.
//
// variant 'rental' (rental category + product pages): the third field is free text for
// equipment, quantity and dates, the service is fixed to Equipment Rental, and `context`
// (category or product name) plus the page path are appended to the message so the
// team's CALL BACK email says exactly what the visitor was looking at.

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, PhoneCall, ShieldCheck, Headphones, Award, Truck, MapPin } from 'lucide-react'
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

const VARIANTS = {
  general: {
    eyebrow: 'Request A Call Back',
    heading: <>Tell Us What <span className="text-[#E87722]">You Need</span></>,
    sub: <>A Solutions Specialist Calls You Back Within <strong className="text-white">4 Business Hours</strong>.</>,
    points: [
      { I: ShieldCheck, text: 'No-Obligation Consultation' },
      { I: Award, text: '20+ Years Of Enterprise Delivery' },
      { I: Headphones, text: '24/7 Support Across The UAE & GCC' },
    ],
  },
  // Points reuse claims the rental hub already makes ("Delivery & Setup Included",
  // technical support, Dubai & Abu Dhabi) — don't add new promises here.
  rental: {
    eyebrow: 'Rental Quote By Phone',
    heading: <>Need It Fast? <span className="text-[#E87722]">Get A Quote By Phone</span></>,
    sub: <>Tap What You Need. Our Rental Team Calls You Back Within <strong className="text-white">4 Business Hours</strong>.</>,
    points: [
      { I: Truck, text: 'Delivery & Setup Included' },
      { I: Headphones, text: 'Technical Support During Your Rental' },
      { I: MapPin, text: 'Serving Dubai & Abu Dhabi' },
    ],
  },
}

const inputStyle = { background: '#fff', border: '1.5px solid #D8DEE9', color: '#0B1A46' }
const inputClass = 'w-full px-3.5 py-3 rounded-lg text-sm focus:outline-none focus:border-[#E87722] focus:ring-[3px] focus:ring-[#E87722]/15 transition-colors'

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="mono text-[11px] uppercase tracking-widest block mb-1.5" style={{ color: '#0B1A46' }}>
    {children}
  </label>
)

// Pre-selects the service dropdown from the page path on service / Event IT pages.
// Unlisted paths (consulting, digital solutions, ...) leave it for the visitor to pick.
const SERVICE_BY_PATH = [
  [/^\/event-it/, 'Event IT & Temporary Infrastructure'],
  [/^\/services\/managed-it/, 'Managed IT Services'],
  [/^\/(services\/cybersecurity|cybersecurity-advisory)/, 'Cybersecurity'],
  [/^\/services\/cloud/, 'Cloud Services'],
  [/^\/services\/elv/, 'CCTV & Access Control'],
  [/^\/services\/infrastructure/, 'Structured Cabling & Networks'],
]
export function serviceForPath(pathname = '') {
  return SERVICE_BY_PATH.find(([re]) => re.test(pathname))?.[1] || ''
}

// Rental quick picks — one tap each, all optional, tap again to clear.
const QTY_OPTIONS = ['1–5', '6–20', '21–50', '50+']
const PERIOD_OPTIONS = ['1 day', '2–3 days', '1 week', '1 month+']
const START_OPTIONS = ['This week', 'Next week', 'Later']
const NOT_SURE = 'Mix / Not sure'

function Chips({ label, options, value, onChange }) {
  return (
    <div>
      <div className="mono text-[11px] uppercase tracking-widest mb-1.5" style={{ color: '#0B1A46' }}>{label}</div>
      <div className="flex flex-wrap gap-1.5 sm:gap-2" role="group" aria-label={label}>
        {options.map((o) => {
          const on = value === o
          return (
            <button
              key={o} type="button" aria-pressed={on}
              onClick={() => onChange(on ? '' : o)}
              className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-[13px] font-medium transition-colors"
              style={on
                ? { background: '#E87722', border: '1.5px solid #E87722', color: '#fff' }
                : { background: '#fff', border: '1.5px solid #D8DEE9', color: '#0B1A46' }}
            >
              {o}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Rental props: `equipment` (product page: the item is fixed and shown, not picked) or
// `equipmentOptions` (category page: a dropdown of that category's products).
export default function QuickEnquiry({ source = 'homepage', variant = 'general', context = '', defaultService = '', equipment = '', equipmentOptions = [], sectionStyle }) {
  const v = VARIANTS[variant] || VARIANTS.general
  const rental = variant === 'rental'
  const [form, setForm] = useState({ name: '', phone: '', service: defaultService, need: '', item: '', qty: '', period: '', start: '' })
  const pick = (key) => (val) => setForm(f => ({ ...f, [key]: val }))
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
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          service: rental ? 'Equipment Rental' : form.service,
          message: rental
            ? [
                ...[
                  ['Equipment', equipment || form.item],
                  ['Quantity', form.qty],
                  ['Rental period', form.period],
                  ['Needed from', form.start],
                  ['Notes', form.need.trim()],
                ].filter(([, val]) => val).map(([k, val]) => `${k}: ${val}`),
                '',
                `Page: ${context || 'Rental'} (${window.location.pathname})`,
              ].join('\n').trim()
            : context ? `Page: ${context} (${window.location.pathname})` : '',
          tab: 'quick', source, recaptchaToken: await getRecaptchaToken('contact'),
        }),
      }))
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        if (data.error === 'captcha-failed') setErr('Security check failed. Please refresh the page and try again.')
        else if (data.error === 'too-many-requests') setErr('Too many submissions from your IP. Please try again in a few minutes.')
        else if (data.error === 'delivery-failed') setErr("We couldn't deliver your enquiry. Please call +971 2 676 6935 or WhatsApp +971 50 682 8290.")
        else setErr('Submission failed, please try again or call +971 2 676 6935.')
        setSubmitting(false)
        return
      }
      trackLead('quick_enquiry', { enquiry_type: 'quick', service: rental ? 'Equipment Rental' : (form.service || '(none)'), source })
      setSubmitted(true)
    } catch { setErr('Submission failed, please try again or call +971 2 676 6935.') }
    setSubmitting(false)
  }

  return (
    <section className="px-4 sm:px-6" style={{ background: '#F4F6FA', paddingTop: '56px', paddingBottom: '56px', ...sectionStyle }} aria-labelledby="quick-enquiry-heading">
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
              <span className="mono text-[11px] uppercase tracking-widest font-bold">{v.eyebrow}</span>
            </div>
            <h2 id="quick-enquiry-heading" className="font-extrabold text-white mb-3" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', lineHeight: 1.15 }}>
              {v.heading}
            </h2>
            <p className="sm:mb-7" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.02rem', lineHeight: 1.5 }}>
              {v.sub}
            </p>
            <ul className="hidden sm:block space-y-3">
              {v.points.map(({ I, text }) => (
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
        <div className="bg-white p-5 sm:p-8 lg:p-10 flex flex-col justify-center">
          {submitted ? (
            <div className="text-center py-8" role="status">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.4)' }}>
                <Check size={28} style={{ color: '#16a34a' }} />
              </div>
              <h3 className="font-bold text-2xl mb-2" style={{ color: '#0B1A46' }}>Thank You, We Have Your Request</h3>
              <p style={{ color: '#4A5878' }}>Our {rental ? 'rental ' : ''}team will call you within 4 business hours (UAE 09:00-18:00).</p>
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
              {rental ? (
                <>
                  {equipment ? (
                    <div className="text-sm px-3.5 py-2.5 rounded-lg" style={{ background: '#F4F6FA', border: '1.5px solid #E1E8F0', color: '#0B1A46' }}>
                      <span className="mono text-[11px] uppercase tracking-widest mr-2" style={{ color: '#58595B' }}>Quote for</span>
                      <strong>{equipment}</strong>
                    </div>
                  ) : equipmentOptions.length > 0 && (
                    <div>
                      <Label htmlFor="qe-item">Equipment</Label>
                      <select
                        id="qe-item" name="item" value={form.item} onChange={e => pick('item')(e.target.value)}
                        className={inputClass} style={{ ...inputStyle, color: form.item ? '#0B1A46' : '#6B7280' }}
                      >
                        <option value="">Select equipment</option>
                        {equipmentOptions.map(o => <option key={o} value={o} style={{ color: '#0B1A46' }}>{o}</option>)}
                        <option value={NOT_SURE} style={{ color: '#0B1A46' }}>{NOT_SURE}</option>
                      </select>
                    </div>
                  )}
                  <Chips label="Quantity" options={QTY_OPTIONS} value={form.qty} onChange={pick('qty')} />
                  <Chips label="Rental Period" options={PERIOD_OPTIONS} value={form.period} onChange={pick('period')} />
                  <Chips label="Needed From" options={START_OPTIONS} value={form.start} onChange={pick('start')} />
                  <div>
                    <Label htmlFor="qe-need">Anything Else? (Optional)</Label>
                    <input
                      id="qe-need" type="text" name="need" maxLength={300}
                      placeholder="e.g. delivery location, specs, exact dates"
                      value={form.need} onChange={e => pick('need')(e.target.value)}
                      className={inputClass} style={inputStyle}
                    />
                  </div>
                </>
              ) : (
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
              )}
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
