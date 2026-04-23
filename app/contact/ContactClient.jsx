'use client'

import { useState } from 'react'
import * as Icons from 'lucide-react'
import { UAEFlag, CanadaFlag } from '@/components/site/Logo'

const SERVICES = ['Managed IT Services', 'Cybersecurity', 'Cloud Services', 'Event IT', 'Equipment Rental', 'ELV & Security', 'IT Consulting', 'Other']

export default function ContactClient() {
  const [tab, setTab] = useState('general')
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', country: 'UAE', service: '', message: '', recaptcha: false })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [err, setErr] = useState('')

  async function submit(e) {
    e.preventDefault()
    setErr('')
    if (!form.name || !form.company || !form.email || !form.phone) { setErr('Please complete required fields.'); return }
    if (!form.recaptcha) { setErr('Please verify you are not a robot.'); return }
    setSubmitting(true)
    try {
      await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, tab }) })
      setSubmitted(true)
    } catch { setErr('Submission failed, please try again.') }
    setSubmitting(false)
  }

  return (
    <main>
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Contact</div>
            <h1 className="text-white text-4xl md:text-6xl font-bold leading-[1.08]">Get in Touch</h1>
            <p className="body-text mt-5 text-lg max-w-2xl mx-auto">We respond within 4 business hours.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="glass-card p-8 md:p-10">
              <div className="flex gap-2 mb-6">
                <button onClick={() => setTab('general')} className={`glass-pill ${tab === 'general' ? 'active' : ''}`}>General Enquiry</button>
                <button onClick={() => setTab('rental')} className={`glass-pill ${tab === 'rental' ? 'active' : ''}`}>Rental Enquiry</button>
              </div>
              <h2 className="text-white text-2xl font-bold mb-6">{tab === 'general' ? 'Get Immediate Support' : 'Request a Rental Quote'}</h2>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.5)' }}><Icons.Check size={28} className="text-green-400"/></div>
                  <h3 className="text-white text-2xl font-bold mb-2">Message sent!</h3>
                  <p className="body-text">We’ll reply within 4 business hours.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <F label="Name *" v={form.name} on={v => setForm(f => ({...f, name:v}))}/>
                    <F label="Company *" v={form.company} on={v => setForm(f => ({...f, company:v}))}/>
                    <F label="Email *" type="email" v={form.email} on={v => setForm(f => ({...f, email:v}))}/>
                    <F label="Phone *" v={form.phone} on={v => setForm(f => ({...f, phone:v}))}/>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><L>Country</L><select value={form.country} onChange={e => setForm(f => ({...f, country:e.target.value}))} className="w-full px-3 py-2.5 rounded-lg text-white text-sm" style={iS}><option>UAE</option><option>Canada</option><option>KSA</option><option>Qatar</option><option>Other</option></select></div>
                    <div><L>{tab === 'rental' ? 'Equipment Needed' : 'Service Interest'}</L><select value={form.service} onChange={e => setForm(f => ({...f, service:e.target.value}))} className="w-full px-3 py-2.5 rounded-lg text-white text-sm" style={iS}><option value="">— Select —</option>{SERVICES.map(s => <option key={s}>{s}</option>)}</select></div>
                  </div>
                  <div><L>Message</L><textarea value={form.message} onChange={e => setForm(f => ({...f, message:e.target.value}))} rows={4} className="w-full px-3 py-2.5 rounded-lg text-white text-sm" style={iS}/></div>
                  <div className="flex items-center gap-3 p-3 rounded" style={iS}>
                    <input type="checkbox" checked={form.recaptcha} onChange={e => setForm(f => ({...f, recaptcha:e.target.checked}))} className="accent-[#E87722]"/>
                    <span className="text-white/80 text-sm flex-1">I’m not a robot</span>
                    <div className="mono text-[10px] text-white/40 uppercase tracking-wider">reCAPTCHA</div>
                  </div>
                  {err && <div className="text-red-400 text-sm p-3 rounded" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>{err}</div>}
                  <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-60">{submitting ? 'Sending...' : <>Send Message <Icons.ArrowRight size={14}/></>}</button>
                </form>
              )}
            </div>

            {/* Office cards */}
            <div className="space-y-5">
              <OfficeCard flag={<UAEFlag/>} region="United Arab Emirates" city="Abu Dhabi" phone="+971 2 676 6935" email="info@ipcare.ae" address="Salaam Street, Behind Fabrix, P.O. Box 53209, Abu Dhabi, UAE" hours="Monday – Friday, 9:00 AM – 6:00 PM (GST)" mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14480.0!2d54.36!3d24.46!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sae"/>
              <OfficeCard flag={<CanadaFlag/>} region="Canada" city="Toronto" phone="+1 416 786 0782" email="info@ipcare.ae" address="1 Concorde Gate, North York, ON, Canada" hours="Monday – Friday, 9:00 AM – 6:00 PM (EST)" mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92640.0!2d-79.38!3d43.65!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sca"/>
            </div>
          </div>

          {/* Google Maps embeds */}
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div>
              <div className="mono text-[11px] uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>Abu Dhabi, UAE</div>
              <iframe
                src="https://maps.google.com/maps?q=24.4947355,54.3732241&z=16&output=embed"
                title="IP Care Technologies Abu Dhabi office map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ width: '100%', height: '280px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.10)' }}
              />
            </div>
            <div>
              <div className="mono text-[11px] uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>Toronto, Canada</div>
              <iframe
                src="https://maps.google.com/maps?q=43.5019444,-79.8344167&z=14&output=embed"
                title="IP Care Technologies Toronto office map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ width: '100%', height: '280px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.10)' }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

const iS = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)' }
const L = ({ children }) => <label className="mono text-[11px] text-white/70 uppercase tracking-widest block mb-1.5">{children}</label>
function F({ label, v, on, type = 'text' }) { return <div><L>{label}</L><input type={type} value={v} onChange={e => on(e.target.value)} className="w-full px-3 py-2.5 rounded-lg text-white text-sm" style={iS}/></div> }

function OfficeCard({ flag, region, city, phone, email, address, hours, mapUrl }) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="p-6 md:p-7">
        <div className="flex items-center gap-2 mb-3">{flag}<span className="mono text-[10px] uppercase tracking-widest text-[#E87722]">{region}</span></div>
        <h3 className="text-white text-2xl font-bold mb-4">{city}</h3>
        <div className="space-y-2.5 text-sm text-white/80">
          {address && <div className="flex items-start gap-2"><Icons.MapPin size={14} className="text-[#E87722] mt-0.5 flex-shrink-0"/><span>{address}</span></div>}
          <div className="flex items-center gap-2"><Icons.Phone size={14} className="text-[#E87722] flex-shrink-0"/><span>{phone}</span></div>
          <div className="flex items-center gap-2"><Icons.Mail size={14} className="text-[#E87722] flex-shrink-0"/><span>{email}</span></div>
          <div className="flex items-center gap-2"><Icons.Clock size={14} className="text-[#E87722] flex-shrink-0"/><span>{hours}</span></div>
        </div>
      </div>
      <div className="relative h-48 overflow-hidden border-t border-white/10" style={{ filter: 'invert(90%) hue-rotate(180deg) contrast(0.9)' }}>
        <iframe src={mapUrl} className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`${city} office map`}/>
      </div>
    </div>
  )
}
