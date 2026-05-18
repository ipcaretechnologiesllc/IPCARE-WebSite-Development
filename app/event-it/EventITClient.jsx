'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { events, eventServices, partners, capabilityStats } from '@/lib/event-it-data'

const Ic = ({ name, ...rest }) => {
  const C = Icons[name] || Icons.Wifi
  return <C {...rest} />
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) } })
    }, { threshold: 0.12 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ============ 1. HERO ============ */
function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1920&q=85"
          alt="Major event with crowd and stage lighting"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(4,10,24,0.75) 0%, rgba(4,10,24,0.92) 70%, #040a18 100%)' }}/>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 60%)' }}/>
      </div>

      <div className="relative hero-glass max-w-[900px] w-full px-8 md:px-14 py-14 md:py-16 text-center reveal">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.4)' }}>
          <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E87722] opacity-75"/><span className="relative inline-flex rounded-full h-2 w-2 bg-[#E87722]"/></span>
          <span className="mono text-[#E87722] text-xs font-semibold uppercase tracking-[0.2em]">Event IT Infrastructure</span>
        </div>
        <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight">
          Mission-Critical IT Infrastructure<br/>for the World&apos;s <span className="text-[#E87722]">Biggest Events</span>
        </h1>
        <p className="body-text mt-6 text-base md:text-lg max-w-2xl mx-auto">
          Trusted on FIFA Club World Cup, UFC UAE (2020–2025), NBA Abu Dhabi Games, EuroLeague Final Four 2025 (first outside Europe), FINA World Swimming, IIFA Awards, Coldplay, Saadiyat Nights and the UAE Official National Day events. From temporary WiFi for 60,000 fans to broadcast-grade data centres in 48 hours.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {['FIFA', 'UFC', 'NBA', 'EuroLeague', 'FINA', 'IIFA', 'Coldplay', 'Saadiyat Nights', 'WBA', 'Mubadala Open', 'UAE National Day'].map((b) => <span key={b} className="pill-badge">{b}</span>)}
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/#contact" className="btn-primary">Plan Your Event IT <Icons.ArrowRight size={16}/></Link>
          <Link href="/event-it/portfolio" className="btn-ghost">View Portfolio</Link>
        </div>
      </div>
    </section>
  )
}

/* ============ 2. EVENTS PORTFOLIO ============ */
function EventsPortfolio() {
  const [filter, setFilter] = useState('All Events')
  const tabs = ['All Events', 'UAE Events', 'Global Events']
  const filtered = filter === 'All Events' ? events : events.filter((e) => e.region === filter)

  return (
    <section className="py-20 md:py-24 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10 reveal">
          <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Portfolio</div>
          <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight">Major Events Powered</h2>
          <p className="body-text mt-4 max-w-2xl mx-auto">Every deployment is a zero-failure environment. Here is a selection.</p>
        </div>
        <div className="flex justify-center gap-2.5 mb-10 flex-wrap reveal">
          {tabs.map((t) => (
            <button key={t} onClick={() => setFilter(t)} className={`glass-pill ${filter === t ? 'active' : ''}`}>{t}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((ev, i) => (
            <article key={ev.slug} className="group relative rounded-xl overflow-hidden aspect-[4/5] reveal" style={{ transitionDelay: `${i * 70}ms` }}>
              <img src={ev.img} alt={`${ev.name} — event IT by IP Care Technologies`} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(7,16,42,0.15) 0%, rgba(7,16,42,0.5) 50%, rgba(4,10,24,0.97) 100%)' }}/>
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <span className="mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: '#E87722', color: '#fff' }}>{ev.region}</span>
                <span className="mono text-[11px] text-white/90 bg-black/50 px-2 py-1 rounded">{ev.year}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-2xl font-bold leading-tight mb-1">{ev.name}</h3>
                <p className="text-white/70 text-sm mb-3 flex items-center gap-1.5"><Icons.MapPin size={12}/>{ev.location}</p>
                <p className="text-white/85 text-xs leading-relaxed mb-4 opacity-80 line-clamp-2">{ev.tech}</p>
                <Link href={`/event-it/${ev.slug}`} className="inline-flex items-center gap-1.5 text-[#E87722] text-sm font-semibold group-hover:gap-2.5 transition-all">
                  View Case Study <Icons.ArrowRight size={14}/>
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-10 reveal">
          <Link href="/event-it/portfolio" className="btn-ghost">View Full Portfolio <Icons.ArrowRight size={16}/></Link>
        </div>
      </div>
    </section>
  )
}

/* ============ 3. SERVICES ============ */
function Services() {
  return (
    <section className="py-20 md:py-24 px-6" style={{ background: 'rgba(3,7,15,0.55)' }}>
      <div className="max-w-[1300px] mx-auto">
        <div className="text-center mb-12 reveal">
          <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Services</div>
          <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight">End-to-End Event IT Services</h2>
          <p className="body-text mt-4 max-w-2xl mx-auto">From first network diagram to final de-rig — we own every layer.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {eventServices.map((s, i) => {
            const link = ['event-wifi','temporary-data-centres','event-cctv'].includes(s.slug) ? `/event-it/${s.slug}` : '/#contact'
            return (
              <Link key={s.slug} href={link} className="glass-card p-7 md:p-8 block reveal group relative overflow-hidden" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="absolute -top-10 -right-10 w-40 h-40 blur-2xl opacity-0 group-hover:opacity-30 transition-opacity" style={{ background: 'radial-gradient(circle, #E87722 0%, transparent 70%)' }}/>
                <div className="relative flex gap-5 items-start">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.4)' }}>
                    <Ic name={s.icon} size={26} className="text-[#E87722]"/>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-xl font-semibold mb-2 leading-tight">{s.name}</h3>
                    <p className="body-text text-sm leading-relaxed mb-4">{s.short}</p>
                    <span className="inline-flex items-center gap-1.5 text-[#E87722] font-semibold text-sm px-4 py-1.5 rounded-full border border-[#E87722]/50 bg-[#E87722]/5 group-hover:bg-[#E87722] group-hover:text-white group-hover:border-[#E87722] group-hover:gap-2.5 transition-all">Learn More <Icons.ArrowRight size={13}/></span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ============ 4. CAPABILITY STATS ============ */
function CapabilityStats() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(232,119,34,0.04) 50%, transparent 100%)' }}/>
      </div>
      <div className="max-w-[1200px] mx-auto relative">
        <div className="text-center mb-10 reveal">
          <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Capability</div>
          <h2 className="text-white text-3xl md:text-4xl font-bold">Engineered at Event Scale</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {capabilityStats.map((t, i) => (
            <div key={t.l} className="glass-card p-7 text-center reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="text-4xl md:text-5xl font-bold text-[#E87722] tracking-tight">{t.n}</div>
              <div className="text-white/60 text-xs md:text-sm mt-2 uppercase tracking-wider mono">{t.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ 5. PARTNERS ============ */
function Partners() {
  return (
    <section className="py-16 px-6" style={{ background: 'rgba(3,7,15,0.55)' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10 reveal">
          <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Technology Partners</div>
          <h2 className="text-white text-2xl md:text-3xl font-bold">Certified across the platforms that power modern events</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {partners.map((p, i) => (
            <div key={p.name} className="glass-card p-5 text-center reveal" style={{ transitionDelay: `${i * 50}ms` }}>
              <div className="mono text-xl font-bold mb-1.5 tracking-tight" style={{ color: p.color }}>{p.name}</div>
              <div className="text-white/50 text-[11px] mono uppercase tracking-wider">{p.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ 6. CTA STRIP ============ */
function CTAStrip() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="rounded-2xl p-10 md:p-14 relative overflow-hidden reveal" style={{ background: 'rgba(232,119,34,0.07)', border: '1px solid rgba(232,119,34,0.28)', backdropFilter: 'blur(12px)' }}>
          <div className="absolute -top-20 -right-20 w-80 h-80 blur-3xl opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, #E87722 0%, transparent 70%)' }}/>
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Book Your Event</div>
              <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-4">Ready to Power Your Next Event?</h2>
              <p className="body-text mb-0">From kick-off to encore, IP Care keeps the network on. Get a tailored event IT proposal within 48 hours.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
              <Link href="/#contact" className="btn-primary">Get an Event Quote <Icons.ArrowRight size={16}/></Link>
              <a href="tel:+97126766935" className="btn-ghost"><Icons.Phone size={14}/> +971 2 676 6935</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function EventITClient() {
  useReveal()
  return (
    <main>
      <Hero />
      <EventsPortfolio />
      <Services />
      <CapabilityStats />
      <Partners />
      <CTAStrip />
    </main>
  )
}
