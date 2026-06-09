'use client'

import { useState } from 'react'
import * as Icons from 'lucide-react'
import { UAEFlag, CanadaFlag } from '@/components/site/Logo'
import { getRecaptchaToken, isRecaptchaConfigured } from '@/lib/recaptcha-client'

const SERVICES = ['Managed IT Services', 'Cybersecurity', 'Cloud Services', 'Event IT', 'Equipment Rental', 'ELV & Security', 'IT Consulting', 'Other']

// ─────────────────────────────────────────────────────────────────────────────
// Form pipeline (Route A → /api/contact → MongoDB leads → Resend) is untouched.
// Only the JSX layout + visual styles have changed below.
// ─────────────────────────────────────────────────────────────────────────────

export default function ContactClient() {
  const [tab, setTab] = useState('general')
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', country: 'UAE', service: '', message: '', agree: false })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [err, setErr] = useState('')

  async function submit(e) {
    e.preventDefault()
    setErr('')
    if (!form.name || !form.company || !form.email || !form.phone) { setErr('Please complete required fields.'); return }
    if (!form.agree) { setErr('Please agree to the privacy policy before continuing.'); return }
    setSubmitting(true)
    try {
      const recaptchaToken = await getRecaptchaToken('contact')
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tab, recaptchaToken }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        if (data.error === 'captcha-failed') setErr('Security check failed. Please refresh the page and try again.')
        else if (data.error === 'too-many-requests') setErr('Too many submissions from your IP. Please try again in a few minutes.')
        else setErr('Submission failed, please try again.')
        setSubmitting(false)
        return
      }
      setSubmitted(true)
    } catch { setErr('Submission failed, please try again.') }
    setSubmitting(false)
  }

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, #0B1A46 0%, #0F245F 50%, #1E3A8A 100%)', borderBottom: '3px solid #E87722', position: 'relative', overflow: 'hidden' }}>
        <div className="premium-grid" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
        <div style={{ position: 'absolute', top: '-80px', right: '15%', width: '420px', height: '420px', background: 'radial-gradient(circle, rgba(232,119,34,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="relative py-20 md:py-28 px-6 text-center max-w-[700px] mx-auto">
          <div className="section-eyebrow">Contact</div>
          <h1 className="font-extrabold text-white mb-5" style={{ fontSize: 'clamp(2.4rem,5vw,3.6rem)', lineHeight: 1.08 }}>Get <span className="text-[#E87722]">in Touch</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '1.1rem' }}>We respond within 4 business hours.</p>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <section className="px-6 relative overflow-hidden" style={{ paddingTop: '72px', paddingBottom: '96px' }}>
        {/* Background image */}
        <img
          src="/images/pages/contact-bg.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ zIndex: 0 }}
          loading="lazy"
        />
        {/* Navy overlay */}
        <div className="absolute inset-0 bg-[#0B1A46]/70" style={{ zIndex: 10 }} />
        <div className="relative max-w-[1200px] mx-auto" style={{ zIndex: 20 }}>

          <div className="grid lg:grid-cols-2 gap-8 items-start">

            {/* ── FORM CARD ──────────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl" style={{ borderTop: '3px solid #E87722', boxShadow: '0 8px 32px rgba(10,26,70,0.12)', padding: '36px' }}>
              {/* Tab toggle */}
              <div className="flex gap-2 mb-6 flex-wrap">
                {[['general', 'General Enquiry'], ['rental', 'Rental Enquiry']].map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setTab(val)}
                    className="text-sm font-medium transition-all"
                    style={{
                      padding: '8px 20px',
                      borderRadius: '9999px',
                      border: tab === val ? '2px solid #E87722' : '2px solid #D8DEE9',
                      background: tab === val ? '#E87722' : '#fff',
                      color: tab === val ? '#fff' : '#0B1A46',
                      cursor: 'pointer',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <h2 className="font-bold mb-6" style={{ color: '#0B1A46', fontSize: '1.4rem' }}>
                {tab === 'general' ? 'Get Immediate Support' : 'Request a Rental Quote'}
              </h2>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.4)' }}>
                    <Icons.Check size={28} style={{ color: '#16a34a' }} />
                  </div>
                  <h3 className="font-bold text-2xl mb-2" style={{ color: '#0B1A46' }}>Message sent!</h3>
                  <p style={{ color: '#4A5878' }}>We&apos;ll reply within 4 business hours.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <F label="Name *"    v={form.name}    on={v => setForm(f => ({...f, name:v}))}/>
                    <F label="Company *" v={form.company} on={v => setForm(f => ({...f, company:v}))}/>
                    <F label="Email *"   type="email" v={form.email} on={v => setForm(f => ({...f, email:v}))}/>
                    <F label="Phone *"   v={form.phone}   on={v => setForm(f => ({...f, phone:v}))}/>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <L>Country</L>
                      <select value={form.country} onChange={e => setForm(f => ({...f, country:e.target.value}))} className="w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none" style={iS}>
                        <option>UAE</option><option>Canada</option><option>KSA</option><option>Qatar</option><option>Other</option>
                      </select>
                    </div>
                    <div>
                      <L>{tab === 'rental' ? 'Equipment Needed' : 'Service Interest'}</L>
                      <select value={form.service} onChange={e => setForm(f => ({...f, service:e.target.value}))} className="w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none" style={iS}>
                        <option value="">— Select —</option>
                        {SERVICES.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <L>Message</L>
                    <textarea
                      value={form.message}
                      onChange={e => setForm(f => ({...f, message:e.target.value}))}
                      rows={4}
                      className="w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none"
                      style={iS}
                      onFocus={e => { e.target.style.border = '1.5px solid #E87722'; e.target.style.boxShadow = '0 0 0 3px rgba(232,119,34,0.12)' }}
                      onBlur={e =>  { e.target.style.border = '1.5px solid #D8DEE9'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: '#F4F6FA', border: '1px solid #E1E8F0' }}>
                    <input type="checkbox" checked={form.agree} onChange={e => setForm(f => ({...f, agree:e.target.checked}))} className="accent-[#E87722] flex-shrink-0"/>
                    <span className="text-sm flex-1" style={{ color: '#4A5878' }}>I agree to the privacy policy and consent to be contacted about this enquiry.</span>
                    <div
                      className="mono text-[10px] uppercase tracking-wider flex-shrink-0"
                      style={{ color: '#94A3B8' }}
                      title={isRecaptchaConfigured() ? 'Protected by Google reCAPTCHA v3' : 'reCAPTCHA not configured'}
                    >
                      reCAPTCHA v3
                    </div>
                  </div>
                  {err && (
                    <div className="text-red-500 text-sm p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.25)' }}>{err}</div>
                  )}
                  <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-60">
                    {submitting ? 'Sending…' : <>Send Message <Icons.ArrowRight size={14}/></>}
                  </button>
                </form>
              )}
            </div>

            {/* ── RIGHT COLUMN ─────────────────────────────────────────────── */}
            <div className="flex flex-col gap-5">

              {/* Abu Dhabi office */}
              <OfficeCard
                flag={<UAEFlag/>}
                region="United Arab Emirates"
                city="Abu Dhabi"
                phone="+971 2 676 6935"
                email="info@ipcare.ae"
                address="Salam Street, P.O. Box 53209, Abu Dhabi, UAE"
                hours="Monday – Friday, 9:00 AM – 6:00 PM (GST)"
              />

              {/* Toronto office */}
              <OfficeCard
                flag={<CanadaFlag/>}
                region="Canada"
                city="Toronto"
                phone="+1 416 786 0782"
                email="info@ipcare.ca"
                address="1 Concorde Gate, North York, ON, Canada"
                hours="Monday – Friday, 9:00 AM – 6:00 PM (EST)"
              />

              {/* What to expect — fills the remaining height and balances the column */}
              <div className="bg-white rounded-2xl" style={{ borderTop: '3px solid #E87722', boxShadow: '0 8px 32px rgba(10,26,70,0.12)', padding: '28px 32px' }}>
                <div className="section-eyebrow">What to Expect</div>
                <ul className="space-y-3.5">
                  {[
                    { I: Icons.Clock,      text: 'Reply within 4 business hours — usually sooner' },
                    { I: Icons.UserCheck,  text: 'A named account manager, not a call centre' },
                    { I: Icons.ShieldCheck, text: 'No-obligation initial consultation' },
                    { I: Icons.Globe,      text: 'Coverage across UAE and Canada' },
                  ].map(({ I, text }) => (
                    <li key={text} className="flex items-start gap-3 text-sm" style={{ color: '#4A5878' }}>
                      <I size={15} className="flex-shrink-0 mt-0.5" style={{ color: '#E87722' }} />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* ── MAPS ─────────────────────────────────────────────────────── */}
          <div className="grid md:grid-cols-2 gap-8 mt-14">

            <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(10,26,70,0.12)' }}>
              <div className="px-6 pt-5 pb-3">
                <div className="section-eyebrow">Abu Dhabi, UAE</div>
              </div>
              <iframe
                src="https://maps.google.com/maps?q=24.4947355,54.3732241&z=16&output=embed"
                title="IP Care Technologies Abu Dhabi office map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                frameBorder="0"
                style={{ width: '100%', height: '300px', display: 'block' }}
              />
            </div>

            <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(10,26,70,0.12)' }}>
              <div className="px-6 pt-5 pb-3">
                <div className="section-eyebrow">Toronto, Canada</div>
              </div>
              <iframe
                src="https://maps.google.com/maps?q=43.5019444,-79.8344167&z=14&output=embed"
                title="IP Care Technologies Toronto office map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                frameBorder="0"
                style={{ width: '100%', height: '300px', display: 'block' }}
              />
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}

// ── Shared styles ─────────────────────────────────────────────────────────────
// White inputs with light border + navy text. Focus ring applied via onFocus/onBlur.
const iS = { background: '#fff', border: '1.5px solid #D8DEE9', color: '#0B1A46' }

// ── Field label ───────────────────────────────────────────────────────────────
const L = ({ children }) => (
  <label className="mono text-[11px] uppercase tracking-widest block mb-1.5" style={{ color: '#0B1A46' }}>
    {children}
  </label>
)

// ── Text / email / tel input ──────────────────────────────────────────────────
function F({ label, v, on, type = 'text' }) {
  return (
    <div>
      <L>{label}</L>
      <input
        type={type}
        value={v}
        onChange={e => on(e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none"
        style={iS}
        onFocus={e => { e.target.style.border = '1.5px solid #E87722'; e.target.style.boxShadow = '0 0 0 3px rgba(232,119,34,0.12)' }}
        onBlur={e =>  { e.target.style.border = '1.5px solid #D8DEE9'; e.target.style.boxShadow = 'none' }}
      />
    </div>
  )
}

// ── Office card ───────────────────────────────────────────────────────────────
function OfficeCard({ flag, region, city, phone, email, address, hours }) {
  return (
    <div className="bg-white rounded-2xl" style={{ borderTop: '3px solid #E87722', boxShadow: '0 8px 32px rgba(10,26,70,0.12)', padding: '28px 32px' }}>
      <div className="flex items-center gap-2 mb-1">
        {flag}
        <span className="mono text-[13px] uppercase tracking-widest font-bold" style={{ color: '#E87722' }}>{region}</span>
      </div>
      <h3 className="font-extrabold mb-4" style={{ color: '#0B1A46', fontSize: '1.35rem' }}>{city}</h3>
      <div className="space-y-2.5 text-sm" style={{ color: '#4A5878' }}>
        {address && (
          <div className="flex items-start gap-2.5">
            <Icons.MapPin size={14} className="flex-shrink-0 mt-0.5" style={{ color: '#E87722' }}/>
            <span>{address}</span>
          </div>
        )}
        <div className="flex items-center gap-2.5">
          <Icons.Phone size={14} className="flex-shrink-0" style={{ color: '#E87722' }}/>
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Icons.Mail size={14} className="flex-shrink-0" style={{ color: '#E87722' }}/>
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Icons.Clock size={14} className="flex-shrink-0" style={{ color: '#E87722' }}/>
          <span>{hours}</span>
        </div>
      </div>
    </div>
  )
}
