'use client'

import { useEffect, useState } from 'react'
import * as Icons from 'lucide-react'
import { jobs } from '@/lib/careers-data'
import { getRecaptchaToken } from '@/lib/recaptcha-client'

const MAX_CV_BYTES = 5 * 1024 * 1024

const T_NAV  = '#0B1A46'
const T_BODY = '#4A5878'
const BG_WHITE = '#FFFFFF'
const BG_GREY  = '#F4F6FA'
const iS = { background: '#fff', border: '1.5px solid #D8DEE9', color: '#0B1A46' }

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) } }), { threshold: 0, rootMargin: '0px 0px -10% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const valuePillars = [
  { icon: 'Award', t: 'Craft', d: 'We take pride in technical excellence.' },
  { icon: 'Users', t: 'Team', d: 'We hire senior, we invest in growth.' },
  { icon: 'Rocket', t: 'Impact', d: 'Work on projects that matter, at scale.' },
  { icon: 'Globe2', t: 'Reach', d: 'UAE, Canada and global event delivery.' },
]
const Ic = ({ name, ...rest }) => { const C = Icons[name] || Icons.Award; return <C {...rest}/> }

function Eyebrow({ children }) {
  return <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', color: '#E87722', marginBottom: '12px' }}>{children}</p>
}

function SectionHeading({ children }) {
  return (
    <div className="text-center">
      <h2 style={{ color: T_NAV, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em' }}>{children}</h2>
      <div style={{ width: '56px', height: '3px', background: '#E87722', borderRadius: '3px', margin: '14px auto 0' }} aria-hidden="true" />
    </div>
  )
}

const L = ({ children }) => <label className="mono text-[11px] uppercase tracking-widest block mb-1.5" style={{ color: T_NAV }}>{children}</label>

function F({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <L>{label}</L>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none" style={iS}
        onFocus={e => { e.target.style.border = '1.5px solid #E87722'; e.target.style.boxShadow = '0 0 0 3px rgba(232,119,34,0.12)' }}
        onBlur={e => { e.target.style.border = '1.5px solid #D8DEE9'; e.target.style.boxShadow = 'none' }}
      />
    </div>
  )
}

export default function CareersClient() {
  useReveal()
  const [selectedJob, setSelectedJob] = useState('')
  const [form, setForm] = useState({ name: '', email: '', role: '', cover: '' })
  const [cv, setCv] = useState(null)
  const [cvErr, setCvErr] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [err, setErr] = useState('')

  function handleCvSelect(file) {
    setCvErr('')
    if (!file) { setCv(null); return }
    if (file.size > MAX_CV_BYTES) { setCvErr('File too large, max 5 MB.'); setCv(null); return }
    const name = (file.name || '').toLowerCase()
    if (!(file.type === 'application/pdf' || name.endsWith('.pdf'))) { setCvErr('Only PDF files are accepted.'); setCv(null); return }
    setCv(file)
  }

  async function submit(e) {
    e.preventDefault()
    setErr('')
    if (!form.name || !form.email || !form.role) { setErr('Please complete required fields.'); return }
    setSubmitting(true)
    try {
      const recaptchaToken = await getRecaptchaToken('careers')
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('email', form.email)
      fd.append('role', form.role)
      fd.append('cover', form.cover)
      fd.append('recaptchaToken', recaptchaToken)
      if (cv) fd.append('cv', cv, cv.name)
      const res = await fetch('/api/careers/apply', { method: 'POST', body: fd })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        if (data.error === 'captcha-failed') setErr('Security check failed. Please refresh and try again.')
        else if (data.error === 'too-many-requests') setErr('Too many submissions from your IP. Please try again in a few minutes.')
        else if (data.error === 'file-too-large') setErr('CV exceeds 5 MB limit. Please compress and retry.')
        else if (data.error === 'invalid-pdf-signature' || data.error === 'invalid-file-type') setErr('The uploaded file is not a valid PDF.')
        else setErr('Submission failed. Please try again or email hr@ipcare.ae.')
        setSubmitting(false)
        return
      }
      setSubmitted(true)
    } catch { setErr('Submission failed. Please try again.') }
    setSubmitting(false)
  }

  return (
    <main>
      {/* ── HERO, navy, full-bleed photo ─────────────────────────────────── */}
      <section style={{ background: '#1E3A8A', borderBottom: '3px solid #E87722', position: 'relative', overflow: 'hidden', padding: '140px 24px 100px', minHeight: '480px', display: 'flex', alignItems: 'center' }}>
        <img
          src="/images/pages/careers-bg.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ zIndex: 0 }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0" style={{ zIndex: 1, background: 'radial-gradient(ellipse 65% 75% at 50% 45%, rgba(11,26,70,0.62) 0%, rgba(11,26,70,0.30) 55%, rgba(11,26,70,0.15) 100%)' }} />
        <div className="premium-grid" style={{ position: 'absolute', inset: 0, opacity: 0.35, zIndex: 2 }} aria-hidden="true" />
        <div style={{ position: 'absolute', top: '-80px', right: '15%', width: '420px', height: '420px', background: 'radial-gradient(circle, rgba(232,119,34,0.15) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 2 }} aria-hidden="true" />
        <div className="relative max-w-[1200px] mx-auto text-center reveal" style={{ zIndex: 3 }}>
          <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-4">Careers</div>
          <h1 className="text-white font-extrabold leading-[1.08]" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)' }}>Build <span className="text-[#E87722]">Your Career</span> at IP Care</h1>
          <p className="mt-5 text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.78)' }}>Senior-level technology work across UAE and Canada, cybersecurity, cloud, networking and event IT.</p>
        </div>
      </section>

      {/* ── WHAT DRIVES US, white ────────────────────────────────────────── */}
      <section className="py-16 px-6" style={{ background: BG_WHITE }}>
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-10 reveal"><Eyebrow>Our Culture</Eyebrow><SectionHeading>What drives us</SectionHeading></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {valuePillars.map((v, i) => (
              <div key={v.t} className="p-6 text-center rounded-2xl reveal" style={{ background: BG_WHITE, borderTop: '3px solid #E87722', boxShadow: '0 4px 20px rgba(10,26,70,0.07)', transitionDelay: `${i * 60}ms` }}>
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(232,119,34,0.10)' }}><Ic name={v.icon} size={22} className="text-[#E87722]"/></div>
                <h3 className="font-bold mb-2" style={{ color: T_NAV }}>{v.t}</h3>
                <p className="text-sm leading-relaxed" style={{ color: T_BODY }}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRENT OPENINGS, light grey ─────────────────────────────────── */}
      <section id="openings" className="py-20 px-6" style={{ background: BG_GREY }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12 reveal"><Eyebrow>Open Roles</Eyebrow><SectionHeading>Current Openings</SectionHeading></div>
          <div className="space-y-4">
            {jobs.map((j, i) => (
              <div key={j.slug} className="p-6 md:p-7 rounded-2xl reveal flex flex-col md:flex-row md:items-center gap-4 md:gap-8" style={{ background: BG_WHITE, borderTop: '3px solid #E87722', boxShadow: '0 4px 20px rgba(10,26,70,0.07)', transitionDelay: `${i * 60}ms` }}>
                <div className="flex-1">
                  <div className="mono text-[#E87722] text-[11px] uppercase tracking-widest mb-1">{j.team}</div>
                  <h3 className="text-xl font-bold mb-1.5" style={{ color: T_NAV }}>{j.title}</h3>
                  <p className="text-sm mb-3" style={{ color: T_BODY }}>{j.summary}</p>
                  <div className="flex flex-wrap gap-2 text-[11px] mono uppercase tracking-wider" style={{ color: T_BODY }}>
                    <span className="inline-flex items-center gap-1.5"><Icons.MapPin size={11}/> {j.location}</span>
                    <span className="inline-flex items-center gap-1.5"><Icons.Clock size={11}/> {j.type}</span>
                  </div>
                </div>
                <button onClick={() => { setSelectedJob(j.title); setForm(f => ({ ...f, role: j.title })); document.getElementById('apply').scrollIntoView({behavior:'smooth'}) }} className="btn-primary">Apply <Icons.ArrowRight size={14}/></button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLY FORM, white ────────────────────────────────────────────── */}
      <section id="apply" className="py-20 px-6" style={{ background: BG_WHITE }}>
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-10 reveal"><Eyebrow>Apply Now</Eyebrow><SectionHeading>Send us your application</SectionHeading></div>
          {submitted ? (
            <div className="rounded-2xl p-10 text-center reveal" style={{ background: BG_GREY, borderTop: '3px solid #E87722' }}>
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.4)' }}><Icons.Check size={28} style={{ color: '#16a34a' }}/></div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: T_NAV }}>Application received!</h3>
              <p style={{ color: T_BODY }}>Our talent team will review your application and come back within 7 business days.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="rounded-2xl p-8 md:p-10 space-y-4 reveal" style={{ background: BG_GREY, borderTop: '3px solid #E87722', boxShadow: '0 8px 32px rgba(10,26,70,0.12)' }}>
              <F label="Full Name *" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))}/>
              <F label="Email *" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))}/>
              <div>
                <L>Role *</L>
                <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none" style={iS}>
                  <option value="">, Select a role ,</option>
                  {jobs.map(j => <option key={j.slug} value={j.title}>{j.title}</option>)}
                  <option value="General Application">General Application</option>
                </select>
              </div>
              <div>
                <L>CV Upload (PDF only, max 5MB)</L>
                <input type="file" accept="application/pdf,.pdf" onChange={e => handleCvSelect(e.target.files?.[0] || null)} className="w-full text-sm file:mr-3 file:px-3 file:py-2 file:rounded file:border-0 file:bg-[#E87722] file:text-white file:font-semibold" style={{ color: T_NAV }}/>
                {cv && !cvErr && <div className="mt-2 mono text-xs" style={{ color: '#16a34a' }}>✓ {cv.name} ({(cv.size/1024).toFixed(0)} KB)</div>}
                {cvErr && <div className="mt-2 mono text-xs text-red-500">✗ {cvErr}</div>}
              </div>
              <div>
                <L>Cover Note</L>
                <textarea
                  value={form.cover} onChange={e => setForm(f => ({ ...f, cover: e.target.value }))} rows={5}
                  className="w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none" style={iS} placeholder="Tell us why you’d be a great fit."
                  onFocus={e => { e.target.style.border = '1.5px solid #E87722'; e.target.style.boxShadow = '0 0 0 3px rgba(232,119,34,0.12)' }}
                  onBlur={e => { e.target.style.border = '1.5px solid #D8DEE9'; e.target.style.boxShadow = 'none' }}
                />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-60">{submitting ? 'Submitting...' : <>Submit Application <Icons.ArrowRight size={14}/></>}</button>
              {err && <div className="text-sm p-3 rounded-lg" style={{ color: '#dc2626', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.25)' }}>{err}</div>}
              <div className="mono text-[10px] uppercase tracking-wider text-center pt-2" style={{ color: '#94A3B8' }}>Protected by Google reCAPTCHA v3</div>
            </form>
          )}
        </div>
      </section>

      {/* ── BOTTOM CTA, navy ─────────────────────────────────────────────── */}
      <section style={{ background: '#1E3A8A', borderTop: '3px solid #E87722', padding: '64px 24px' }}>
        <div className="max-w-[1000px] mx-auto text-center reveal">
          <h2 className="text-white font-bold mb-4" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', letterSpacing: '-0.02em' }}>Don't See Your Role?</h2>
          <p className="max-w-xl mx-auto mb-8" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', lineHeight: 1.7 }}>Send a general application and tell us where you'd add the most value, we're always looking for senior talent.</p>
          <a href="#apply" onClick={() => setForm(f => ({ ...f, role: 'General Application' }))} className="btn-primary">General Application <Icons.ArrowRight size={16}/></a>
        </div>
      </section>
    </main>
  )
}
