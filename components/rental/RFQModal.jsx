'use client'

import { useState } from 'react'
import * as Icons from 'lucide-react'

export default function RFQModal({ onClose, onSuccess, items }) {
  const [form, setForm] = useState({
    fullName: '', company: '', email: '', phoneCountry: '+971', phone: '',
    country: 'UAE', projectName: '', startDate: '', endDate: '', location: '',
    setupRequired: 'Yes', requirements: '', source: '', agree: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  async function submit(e) {
    e.preventDefault()
    setError('')
    if (!form.fullName || !form.company || !form.email || !form.phone || !form.startDate || !form.endDate || !form.location) {
      setError('Please complete all required fields.'); return
    }
    if (!form.agree) { setError('Please accept the terms to continue.'); return }
    setSubmitting(true)
    try {
      const res = await fetch('/api/rental/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, phone: `${form.phoneCountry} ${form.phone}`, items }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
      setTimeout(() => { onSuccess?.() }, 3200)
    } catch (err) {
      setError('Something went wrong — please try again or call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 glass-card" style={{ background: 'rgba(11,26,70,0.97)' }}>
        <header className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <div className="mono text-[#E87722] text-[10px] uppercase tracking-[0.25em] mb-1">Request a Quote</div>
            <h2 className="text-white text-xl font-bold">Tell us about your project</h2>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white" aria-label="Close"><Icons.X size={22}/></button>
        </header>

        {submitted ? (
          <div className="p-10 text-center">
            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.5)' }}>
              <Icons.Check size={28} className="text-green-400"/>
            </div>
            <h3 className="text-white text-2xl font-bold mb-3">Quote request received!</h3>
            <p className="body-text mb-6">Thank you — our rental team will email you a tailored quote within <span className="text-[#E87722] font-semibold">4 business hours</span>. We&apos;ve sent a confirmation to <span className="text-white">{form.email}</span>.</p>
            <p className="mono text-xs text-white/50">Reference: <span className="text-white/80">IPC-{Date.now().toString().slice(-8)}</span></p>
          </div>
        ) : (
          <form onSubmit={submit} className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Full Name *" value={form.fullName} onChange={v => set('fullName', v)} />
              <Field label="Company *" value={form.company} onChange={v => set('company', v)} />
              <Field label="Email *" type="email" value={form.email} onChange={v => set('email', v)} />
              <div>
                <label className="mono text-[11px] text-white/70 uppercase tracking-widest block mb-1.5">Phone *</label>
                <div className="flex gap-2">
                  <select value={form.phoneCountry} onChange={e => set('phoneCountry', e.target.value)} className="px-3 py-2.5 rounded-lg text-white text-sm focus:outline-none focus:border-[#E87722]" style={inputStyle}>
                    <option value="+971">+971 UAE</option>
                    <option value="+1">+1 Canada</option>
                    <option value="+44">+44 UK</option>
                    <option value="+966">+966 KSA</option>
                  </select>
                  <input value={form.phone} onChange={e => set('phone', e.target.value)} className="flex-1 px-3 py-2.5 rounded-lg text-white text-sm focus:outline-none focus:border-[#E87722]" style={inputStyle}/>
                </div>
              </div>
              <div>
                <label className="mono text-[11px] text-white/70 uppercase tracking-widest block mb-1.5">Country *</label>
                <select value={form.country} onChange={e => set('country', e.target.value)} className="w-full px-3 py-2.5 rounded-lg text-white text-sm focus:outline-none focus:border-[#E87722]" style={inputStyle}>
                  <option value="UAE">United Arab Emirates</option>
                  <option value="Canada">Canada</option>
                  <option value="KSA">Saudi Arabia</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <Field label="Event / Project Name" value={form.projectName} onChange={v => set('projectName', v)} />
              <Field label="Rental Start Date *" type="date" value={form.startDate} onChange={v => set('startDate', v)} />
              <Field label="Rental End Date *" type="date" value={form.endDate} onChange={v => set('endDate', v)} />
            </div>

            <div>
              <label className="mono text-[11px] text-white/70 uppercase tracking-widest block mb-1.5">Delivery Location *</label>
              <textarea value={form.location} onChange={e => set('location', e.target.value)} rows={2} className="w-full px-3 py-2.5 rounded-lg text-white text-sm focus:outline-none focus:border-[#E87722]" style={inputStyle} placeholder="Venue name, address, city"/>
            </div>

            <div>
              <label className="mono text-[11px] text-white/70 uppercase tracking-widest block mb-1.5">Setup Required?</label>
              <div className="flex gap-5">
                {['Yes', 'No'].map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer text-white text-sm">
                    <input type="radio" name="setup" checked={form.setupRequired === opt} onChange={() => set('setupRequired', opt)} className="accent-[#E87722]"/>
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="mono text-[11px] text-white/70 uppercase tracking-widest block mb-1.5">Additional Requirements</label>
              <textarea value={form.requirements} onChange={e => set('requirements', e.target.value)} rows={3} className="w-full px-3 py-2.5 rounded-lg text-white text-sm focus:outline-none focus:border-[#E87722]" style={inputStyle} placeholder="Any special configuration, on-site engineer requests, etc."/>
            </div>

            <div>
              <label className="mono text-[11px] text-white/70 uppercase tracking-widest block mb-1.5">How did you hear about us?</label>
              <select value={form.source} onChange={e => set('source', e.target.value)} className="w-full px-3 py-2.5 rounded-lg text-white text-sm focus:outline-none focus:border-[#E87722]" style={inputStyle}>
                <option value="">— Select —</option>
                <option>Google Search</option><option>Referral</option><option>LinkedIn</option>
                <option>Existing Customer</option><option>Industry Event</option><option>Other</option>
              </select>
            </div>

            <label className="flex items-start gap-3 cursor-pointer text-white/80 text-sm">
              <input type="checkbox" checked={form.agree} onChange={e => set('agree', e.target.checked)} className="mt-1 accent-[#E87722]"/>
              <span>I agree to IP Care Technologies&apos; privacy policy and consent to being contacted about this quote request. *</span>
            </label>

            {error && <div className="text-red-400 text-sm p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>{error}</div>}

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <div className="mono text-xs text-white/50">{items.length} item{items.length !== 1 ? 's' : ''} in quote</div>
              <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">{submitting ? <>Submitting... <Icons.Loader2 size={14} className="animate-spin"/></> : <>Submit Quote Request <Icons.ArrowRight size={14}/></>}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

const inputStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)' }

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className="mono text-[11px] text-white/70 uppercase tracking-widest block mb-1.5">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} className="w-full px-3 py-2.5 rounded-lg text-white text-sm focus:outline-none focus:border-[#E87722]" style={inputStyle}/>
    </div>
  )
}
