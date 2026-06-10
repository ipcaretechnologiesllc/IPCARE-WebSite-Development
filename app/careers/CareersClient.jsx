'use client'

import { useEffect, useState } from 'react'
import * as Icons from 'lucide-react'
import { jobs } from '@/lib/careers-data'
import { getRecaptchaToken } from '@/lib/recaptcha-client'

const MAX_CV_BYTES = 5 * 1024 * 1024

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) } }), { threshold: 0.1 })
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
      <section className="py-20 md:py-24 px-6">
        <div className="max-w-[1200px] mx-auto text-center reveal">
          <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-4">Careers</div>
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-[1.08]">Build <span className="text-[#E87722]">Your Career</span> at IP Care</h1>
          <p className="body-text mt-5 text-lg max-w-2xl mx-auto">Senior-level technology work across UAE and Canada, cybersecurity, cloud, networking and event IT.</p>
        </div>
      </section>

      <section className="py-16 px-6" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-10 reveal"><div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Our Culture</div><h2 className="text-white text-3xl md:text-4xl font-bold">What drives us</h2></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {valuePillars.map((v, i) => (
              <div key={v.t} className="glass-card p-6 text-center reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(232,119,34,0.12)' }}><Ic name={v.icon} size={22} className="text-[#E87722]"/></div>
                <h3 className="text-white font-semibold mb-2">{v.t}</h3>
                <p className="body-text text-sm">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="openings" className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12 reveal"><div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Open Roles</div><h2 className="text-white text-3xl md:text-5xl font-bold heading-accent">Current Openings</h2></div>
          <div className="space-y-3">
            {jobs.map((j, i) => (
              <div key={j.slug} className="glass-card p-6 md:p-7 reveal flex flex-col md:flex-row md:items-center gap-4 md:gap-8" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="flex-1">
                  <div className="mono text-[#E87722] text-[11px] uppercase tracking-widest mb-1">{j.team}</div>
                  <h3 className="text-white text-xl font-bold mb-1.5">{j.title}</h3>
                  <p className="body-text text-sm mb-3">{j.summary}</p>
                  <div className="flex flex-wrap gap-2 text-[11px] text-white/70 mono uppercase tracking-wider">
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

      <section id="apply" className="py-20 px-6" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-10 reveal"><div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Apply Now</div><h2 className="text-white text-3xl md:text-4xl font-bold">Send us your application</h2></div>
          {submitted ? (
            <div className="glass-card p-10 text-center reveal">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.5)' }}><Icons.Check size={28} className="text-green-400"/></div>
              <h3 className="text-white text-2xl font-bold mb-2">Application received!</h3>
              <p className="body-text">Our talent team will review your application and come back within 7 business days.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="glass-card p-8 md:p-10 space-y-4 reveal">
              <Field label="Full Name *" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))}/>
              <Field label="Email *" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))}/>
              <div>
                <label className="mono text-[11px] text-white/70 uppercase tracking-widest block mb-1.5">Role *</label>
                <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg text-white text-sm" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <option value="">, Select a role ,</option>
                  {jobs.map(j => <option key={j.slug} value={j.title}>{j.title}</option>)}
                  <option value="General Application">General Application</option>
                </select>
              </div>
              <div>
                <label className="mono text-[11px] text-white/70 uppercase tracking-widest block mb-1.5">CV Upload (PDF only, max 5MB)</label>
                <input type="file" accept="application/pdf,.pdf" onChange={e => handleCvSelect(e.target.files?.[0] || null)} className="w-full text-white text-sm file:mr-3 file:px-3 file:py-2 file:rounded file:border-0 file:bg-[#E87722] file:text-white file:font-semibold"/>
                {cv && !cvErr && <div className="mt-2 mono text-xs text-green-400">✓ {cv.name} ({(cv.size/1024).toFixed(0)} KB)</div>}
                {cvErr && <div className="mt-2 mono text-xs text-red-400">✗ {cvErr}</div>}
              </div>
              <div>
                <label className="mono text-[11px] text-white/70 uppercase tracking-widest block mb-1.5">Cover Note</label>
                <textarea value={form.cover} onChange={e => setForm(f => ({ ...f, cover: e.target.value }))} rows={5} className="w-full px-3 py-2.5 rounded-lg text-white text-sm" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)' }} placeholder="Tell us why you’d be a great fit."/>
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-60">{submitting ? 'Submitting...' : <>Submit Application <Icons.ArrowRight size={14}/></>}</button>
              {err && <div className="text-red-400 text-sm p-3 rounded" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>{err}</div>}
              <div className="mono text-[10px] text-white/40 uppercase tracking-wider text-center pt-2">Protected by Google reCAPTCHA v3</div>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className="mono text-[11px] text-white/70 uppercase tracking-widest block mb-1.5">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} className="w-full px-3 py-2.5 rounded-lg text-white text-sm" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)' }}/>
    </div>
  )
}
