'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ShieldCheck, Server, Lock, Network, Cable, Cloud, Calendar,
  Laptop, Tablet, Wifi, Printer, ArrowRight, Phone, Mail,
  MapPin, Clock, CheckCircle2, Building2,
  HeartHandshake, Award, Users, Activity, Headphones
} from 'lucide-react'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import { UAEFlag, CanadaFlag } from '@/components/site/Logo'

/* ---------------- IntersectionObserver reveal hook ---------------- */
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

/* ---------------- Counter animation ---------------- */
function Counter({ end, suffix = '', duration = 1600 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now) => {
            const p = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - p, 3)
            setVal(Math.floor(eased * end))
            if (p < 1) requestAnimationFrame(tick)
            else setVal(end)
          }
          requestAnimationFrame(tick)
        }
      })
    }, { threshold: 0.4 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [end, duration])
  return <span ref={ref} className="stat-num text-4xl md:text-5xl">{val.toLocaleString()}{suffix}</span>
}

/* ---------------- Hero (wide, no back card) ---------------- */
const HERO_HEADLINES = [
  { main: 'Enterprise IT Solutions.', accent: 'Trusted Since 2003.' },
  { main: "Powering UAE's Biggest Events &", accent: 'Leading Businesses.' },
  { main: 'Expert Cybersecurity.', accent: 'Zero Trust. SASE. Cloud.' },
]

function RotatingHeadline() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const ADVANCE = 4000
    const FADE = reduced ? 0 : 500

    const tick = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx((i) => (i + 1) % HERO_HEADLINES.length)
        setVisible(true)
      }, FADE)
    }, ADVANCE)
    return () => clearInterval(tick)
  }, [])

  const jumpTo = (next) => {
    if (next === idx) return
    setVisible(false)
    setTimeout(() => { setIdx(next); setVisible(true) }, 500)
  }

  const h = HERO_HEADLINES[idx]

  return (
    <>
      <h1
        aria-live="polite"
        className="font-extrabold tracking-tight leading-[1.1] transition-opacity duration-500"
        style={{
          opacity: visible ? 1 : 0,
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 800,
          color: '#FFFFFF',
        }}
      >
        <span style={{ color: '#FFFFFF' }}>{h.main}</span>
        <br/>
        <span style={{ color: '#E87722' }}>{h.accent}</span>
      </h1>

      {/* Dot indicators */}
      <div className="mt-6 flex items-center justify-center gap-2.5" role="tablist" aria-label="Headline slide">
        {HERO_HEADLINES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === idx}
            aria-label={`Show headline ${i + 1}`}
            onClick={() => jumpTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === idx ? 22 : 8,
              height: 8,
              background: i === idx ? '#E87722' : 'rgba(255,255,255,0.3)',
            }}
          />
        ))}
      </div>
    </>
  )
}

function Hero() {
  return (
    <section id="home" className="relative flex items-center justify-center min-h-[calc(100vh-72px-36px)] px-6 py-20 md:py-24 overflow-hidden">
      {/* subtle ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full blur-3xl opacity-35" style={{ background: 'radial-gradient(circle, #3B7BFF 0%, transparent 70%)' }}/>
        <div className="absolute -bottom-44 -right-32 w-[620px] h-[620px] rounded-full blur-3xl opacity-25" style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)' }}/>
      </div>

      <div className="relative w-full max-w-[1100px] mx-auto text-center reveal">
        {/* Shield icon */}
        <div className="mx-auto mb-7 w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(10px)' }}>
          <ShieldCheck size={30} className="text-white" strokeWidth={2.2}/>
        </div>

        {/* Rotating headline + dot indicators */}
        <RotatingHeadline />

        {/* Subheading */}
        <p className="mt-7 text-white/85 text-base md:text-xl max-w-3xl mx-auto leading-relaxed">
          Managed IT, Cybersecurity, Event Infrastructure &amp; Equipment Rental — UAE &amp; Canada
        </p>

        {/* Trust pills */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          {['20+ Years','UAE & Canada','24/7 SLA','100M+ Users Protected'].map((b) => (
            <span key={b} className="pill-badge">{b}</span>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/contact" className="btn-primary w-full sm:w-auto justify-center" style={{ padding: '16px 34px', fontSize: '15px' }}>
            Get a Free Consultation <ArrowRight size={18}/>
          </a>
          <a href="/services" className="btn-ghost w-full sm:w-auto justify-center" style={{ padding: '15px 30px', fontSize: '15px' }}>
            View Our Services
          </a>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Trust Marquee ---------------- */
function TrustMarquee() {
  const logos = ['FIFA CLUB WORLD CUP', 'UFC', 'NBA', 'COLDPLAY', 'FIFA CLUB WORLD CUP', 'UFC', 'NBA', 'COLDPLAY']
  return (
    <section className="relative overflow-hidden" style={{ background: 'rgba(232,119,34,0.08)', borderTop: '1px solid rgba(232,119,34,0.25)', borderBottom: '1px solid rgba(232,119,34,0.25)', height: '56px' }}>
      <div className="max-w-[1400px] mx-auto px-6 py-2 text-center">
        <p className="text-[#E87722] text-[11px] font-bold uppercase tracking-[3px] mb-2">TRUSTED BY THE WORLD'S BIGGEST EVENTS</p>
      </div>
      <div className="relative overflow-hidden">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none z-10" style={{ background: 'linear-gradient(to right, rgba(232,119,34,0.08), transparent)' }}/>
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none z-10" style={{ background: 'linear-gradient(to left, rgba(232,119,34,0.08), transparent)' }}/>
        
        <div className="marquee-track">
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex-shrink-0 px-8 flex items-center justify-center gap-6">
              <div className="flex items-center gap-3">
                <svg width="10" height="10" viewBox="0 0 10 10" className="text-[#E87722] opacity-90"><circle cx="5" cy="5" r="2" fill="currentColor"/></svg>
                <span className="text-white text-[15px] font-bold uppercase tracking-[2px] whitespace-nowrap">{logo}</span>
              </div>
              <span className="text-[#E87722] opacity-70 text-lg">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Services ---------------- */
function Services() {
  const services = [
    { icon: Server, name: 'Managed IT Services', d: 'End-to-end IT operations, 24/7 monitoring, proactive maintenance and SLA-backed support.' },
    { icon: Lock, name: 'Cybersecurity', d: 'SOC, Zero Trust, firewall management and compliance aligned to NESA, PCI, ISO 27001.' },
    { icon: Cable, name: 'ELV & Physical Security', d: 'CCTV, access control, structured cabling and intrusion detection for modern facilities.' },
    { icon: Calendar, name: 'Event IT Infrastructure', d: 'Turnkey event networks, temporary WiFi, broadcast connectivity and production LANs.' },
    { icon: Network, name: 'Equipment Rental', d: 'Laptops, iPads, routers, switches & printers — short & long-term with logistics.' },
    { icon: Cloud, name: 'Cloud Services', d: 'AWS, Azure, private cloud design, migration, cost optimisation and FinOps.' },
  ]
  return (
    <section id="services" className="py-24 md:py-28 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-14 reveal">
          <h2 className="text-white text-4xl md:text-5xl font-bold heading-accent">Our Core Services</h2>
          <p className="body-text mt-5 max-w-2xl mx-auto text-base md:text-lg">Full-stack IT capability delivered across enterprise, government and event clients in UAE & Canada.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div key={s.name} className="glass-card p-7 reveal group" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5" style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.3)' }}>
                <s.icon size={24} className="text-[#E87722]" strokeWidth={2}/>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">{s.name}</h3>
              <p className="body-text text-sm leading-relaxed mb-5">{s.d}</p>
              <a href="#contact" className="inline-flex items-center gap-1.5 text-[#1B6CA8] font-semibold text-sm hover:gap-2.5 transition-all">
                Learn More <ArrowRight size={14}/>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Stats / Why choose us ---------------- */
function Stats() {
  const stats = [
    { end: 20, suffix: '+', label: 'Years Experience', icon: Award },
    { end: 500, suffix: '+', label: 'Projects Delivered', icon: CheckCircle2 },
    { end: 200, suffix: '+', label: 'Enterprise Clients', icon: Users },
    { end: 99, suffix: '.9%', label: 'Uptime SLA', icon: Activity },
    { end: 24, suffix: '/7', label: 'Support', icon: Headphones },
  ]
  return (
    <section className="py-20 px-6" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-white text-3xl md:text-4xl font-bold">Why Choose IP Care</h2>
          <p className="body-text mt-3">Numbers that reflect our commitment to enterprise excellence.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((s, i) => (
            <div key={s.label} className="glass-card p-6 text-center reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <s.icon className="mx-auto mb-3 text-[#E87722] opacity-90" size={22}/>
              <div><Counter end={s.end} suffix={s.suffix}/></div>
              <div className="text-white/60 text-xs md:text-sm mt-2 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Cyber Advisory Spotlight ---------------- */
function CyberAdvisory() {
  const vendors = ['Palo Alto Networks', 'Check Point', 'Fortinet', 'Zscaler']
  const stats = [
    { n: '15+ Years', l: 'Cybersecurity Practice' },
    { n: '100M+', l: 'Users Protected' },
    { n: '50+', l: 'Enterprise Engagements' },
    { n: '99.9%', l: 'Deployment Success' },
  ]
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, #E87722 0%, transparent 70%)' }}/>
      </div>
      <div className="max-w-[1200px] mx-auto relative">
        <div className="glass-card p-10 md:p-14 reveal" style={{ borderColor: 'rgba(232,119,34,0.35)' }}>
          <div className="flex items-center gap-2 text-[#E87722] font-semibold text-sm uppercase tracking-[0.2em] mb-4">
            <Lock size={16}/> Cybersecurity Advisory
          </div>
          <h2 className="text-white text-3xl md:text-[42px] font-bold leading-tight mb-4">
            Expert Cybersecurity Advisory — <span className="text-[#E87722]">Powered by The Cyber Adviser</span>
          </h2>
          <p className="body-text md:text-lg max-w-3xl mb-8">Strategy, architecture and deployment across world-class platforms. From Zero Trust rollouts to SOC maturity — delivered by practitioners who have protected the world's largest enterprises.</p>

          <div className="flex flex-wrap gap-3 mb-10">
            {vendors.map((v) => (
              <span key={v} className="px-4 py-2 rounded-full text-white/90 text-sm font-medium" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}>{v}</span>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            {stats.map((s) => (
              <div key={s.l} className="p-5 rounded-xl" style={{ background: 'rgba(232,119,34,0.07)', border: '1px solid rgba(232,119,34,0.2)' }}>
                <div className="text-2xl md:text-3xl font-bold text-[#E87722]">{s.n}</div>
                <div className="text-white/70 text-xs md:text-sm mt-1">{s.l}</div>
              </div>
            ))}
          </div>

          <a href="/cybersecurity-advisory" className="btn-primary">Explore Cybersecurity Advisory <ArrowRight size={16}/></a>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Rental Teaser ---------------- */
function RentalTeaser() {
  const items = [
    { name: 'Laptops', spec: 'Intel i7 / 16GB / SSD', icon: Laptop, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80' },
    { name: 'iPads & Tablets', spec: 'iPad Pro, Samsung Tab', icon: Tablet, img: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&q=80' },
    { name: 'Event WiFi', spec: 'High-density access points', icon: Wifi, img: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=600&q=80' },
    { name: 'Networking', spec: 'Switches, firewalls, servers', icon: Network, img: 'https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?w=600&q=80' },
    { name: 'Printers', spec: 'Mono / Colour / MFP', icon: Printer, img: 'https://images.unsplash.com/photo-1650094980833-7373de26feb6?w=600&q=80' },
  ]
  return (
    <section id="rental" className="py-24 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-white text-4xl md:text-5xl font-bold heading-accent">IT Equipment Rental — UAE & Canada</h2>
          <p className="body-text mt-5 max-w-2xl mx-auto">Flexible short-term and long-term rentals with nationwide logistics, configuration and white-glove support.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {items.map((it, i) => (
            <div key={it.name} className="glass-card overflow-hidden reveal" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="relative h-36 overflow-hidden bg-black/30">
                <img src={it.img} alt={`${it.name} for rent from IP Care Technologies`} loading="lazy" className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform"/>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(7,16,42,0.8) 100%)' }}/>
                <div className="absolute top-3 left-3 w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(232,119,34,0.9)' }}>
                  <it.icon size={18} className="text-white"/>
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-white font-semibold text-base">{it.name}</h4>
                <p className="text-white/60 text-xs mt-1 mb-3">{it.spec}</p>
                <button className="w-full btn-primary text-xs justify-center" style={{ padding: '8px 12px' }}>Add to Quote</button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 reveal">
          <a href="#contact" className="btn-ghost">Browse Full Rental Catalogue <ArrowRight size={16}/></a>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Events Portfolio ---------------- */
function EventsPortfolio() {
  const events = [
    { name: 'FIFA Club World Cup', loc: 'Abu Dhabi, UAE • 2022', region: 'UAE Events', img: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=900&q=80' },
    { name: 'UFC Fight Night', loc: 'Yas Island, UAE • 2023', region: 'UAE Events', img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=900&q=80' },
    { name: 'NBA Global Games', loc: 'Toronto, Canada • 2024', region: 'Global Events', img: 'https://images.unsplash.com/photo-1563841930606-67e2bce48b78?w=900&q=80' },
    { name: 'Coldplay World Tour', loc: 'Abu Dhabi • 2024', region: 'Global Events', img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=900&q=80' },
  ]
  const [filter, setFilter] = useState('All Events')
  const tabs = ['All Events', 'UAE Events', 'Global Events']
  const filtered = filter === 'All Events' ? events : events.filter(e => e.region === filter)
  return (
    <section id="events" className="py-24 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10 reveal">
          <h2 className="text-white text-4xl md:text-5xl font-bold heading-accent">Major Events Powered</h2>
          <p className="body-text mt-5 max-w-2xl mx-auto">From world finals to global tours — we deliver the IT backbone that keeps the show on.</p>
        </div>
        <div className="flex justify-center gap-2.5 mb-10 flex-wrap reveal">
          {tabs.map((t) => (
            <button key={t} onClick={() => setFilter(t)} className={`glass-pill ${filter === t ? 'active' : ''}`}>{t}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((ev, i) => (
            <div key={ev.name} className="group relative rounded-xl overflow-hidden aspect-[3/4] reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <img src={ev.img} alt={`${ev.name} — event IT infrastructure by IP Care`} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(7,16,42,0.1) 0%, rgba(7,16,42,0.95) 85%)' }}/>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-block px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-semibold mb-2" style={{ background: '#E87722', color: '#fff' }}>{ev.region}</span>
                <h3 className="text-white text-lg font-semibold leading-snug">{ev.name}</h3>
                <p className="text-white/70 text-xs mt-1">{ev.loc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 reveal">
          <a href="/event-it/portfolio" className="btn-ghost">View Full Portfolio <ArrowRight size={16}/></a>
        </div>
      </div>
    </section>
  )
}

/* ---------------- About (LIGHT SECTION) ---------------- */
function About() {
  return (
    <section id="about" className="py-24 px-6" style={{ background: '#FFFFFF' }}>
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div className="reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ background: 'rgba(232,119,34,0.1)', color: '#E87722' }}>
            <Building2 size={14}/> ABOUT IP CARE TECHNOLOGIES
          </div>
          <h2 className="text-[32px] md:text-[44px] font-bold leading-tight" style={{ color: '#0D2B55' }}>
            Two decades of enterprise IT excellence across <span className="text-[#E87722]">UAE & Canada</span>.
          </h2>
          <p className="mt-5 text-base md:text-lg" style={{ color: '#333F50' }}>
            Founded in 2003, IP Care Technologies L.L.C. is a premier enterprise IT services firm delivering managed IT, cybersecurity, event infrastructure and equipment rental. From government institutions to Fortune 500 clients — we design, deploy and operate mission-critical technology.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-5">
            {[
              { icon: Award, t: 'Since 2003', d: '20+ years of enterprise delivery' },
              { icon: MapPin, t: 'Two Regions', d: 'UAE HQ & Canada operations' },
              { icon: HeartHandshake, t: 'Vendor Certified', d: 'Palo Alto, Check Point, Fortinet' },
              { icon: Clock, t: '24/7 SLA', d: 'Round-the-clock support' },
            ].map((f) => (
              <div key={f.t} className="flex gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(232,119,34,0.12)' }}>
                  <f.icon size={18} className="text-[#E87722]"/>
                </div>
                <div>
                  <div className="font-semibold" style={{ color: '#0D2B55' }}>{f.t}</div>
                  <div className="text-sm" style={{ color: '#333F50' }}>{f.d}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <a href="#contact" className="btn-primary">Talk to an Expert <ArrowRight size={16}/></a>
          </div>
        </div>
        <div className="reveal">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
            <img src="https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?w=900&q=85" alt="Enterprise data center operated by IP Care Technologies" loading="lazy" className="absolute inset-0 w-full h-full object-cover"/>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(13,43,85,0.7) 100%)' }}/>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="text-5xl font-bold text-[#E87722]">20+</div>
              <div className="text-sm uppercase tracking-wider opacity-90 mt-1">Years Protecting Business</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Testimonials ---------------- */
function Testimonials() {
  const quotes = [
    { q: 'IP Care delivered flawless event IT for a global broadcast — zero incidents across 10 days. Their team is world-class.', who: 'Director of Operations', type: 'Event IT Infrastructure', loc: 'Abu Dhabi, UAE' },
    { q: 'Their cybersecurity advisory transformed our Zero Trust roadmap. Deployment was ahead of schedule and under budget.', who: 'CISO', type: 'Cybersecurity Advisory', loc: 'Toronto, Canada' },
    { q: '24/7 managed IT that actually responds in minutes. Best SLA partner we have worked with in over a decade.', who: 'VP Technology', type: 'Managed IT Services', loc: 'Dubai, UAE' },
  ]
  return (
    <section className="py-24 px-6" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-white text-4xl md:text-5xl font-bold heading-accent">What Clients Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {quotes.map((t, i) => (
            <div key={i} className="glass-card p-7 reveal" style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="text-[#E87722] text-5xl font-serif leading-none mb-3">&ldquo;</div>
              <p className="text-white/90 leading-relaxed text-[15px] mb-6">{t.q}</p>
              <div className="border-t border-white/10 pt-4">
                <div className="text-white font-semibold text-sm">{t.who}</div>
                <div className="text-white/60 text-xs mt-0.5">{t.type} • {t.loc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Blog Teaser ---------------- */
function BlogTeaser() {
  const posts = [
    { cat: 'Cybersecurity', title: 'Zero Trust in 2025: A Practical Enterprise Roadmap', date: 'Jun 12, 2025', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80' },
    { cat: 'Event IT', title: 'How We Powered a 50,000-Seat Stadium Network in 72 Hours', date: 'May 28, 2025', img: 'https://images.unsplash.com/photo-1548092372-0d1bd40894a3?w=800&q=80' },
    { cat: 'Cloud', title: 'FinOps for Mid-Market: Cut Azure Spend by 34%', date: 'May 15, 2025', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80' },
  ]
  return (
    <section id="blog" className="py-24 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-white text-4xl md:text-5xl font-bold heading-accent">From the Knowledge Base</h2>
          <p className="body-text mt-5">Insights from our engineers and advisors.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {posts.map((p, i) => (
            <article key={p.title} className="glass-card overflow-hidden reveal group cursor-pointer" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="relative h-48 overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-semibold" style={{ background: '#E87722', color: '#fff' }}>{p.cat}</span>
              </div>
              <div className="p-6">
                <h3 className="text-white font-semibold text-lg leading-snug mb-2">{p.title}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-white/50 text-xs">{p.date}</span>
                  <span className="inline-flex items-center gap-1 text-[#1B6CA8] text-sm font-semibold group-hover:gap-2 transition-all">Read More <ArrowRight size={13}/></span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-10 reveal">
          <a href="#blog" className="btn-ghost">Visit Our Knowledge Base <ArrowRight size={16}/></a>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Global Offices CTA ---------------- */
function OfficesCTA() {
  return (
    <section id="contact" className="py-16 px-6">
      <div className="max-w-[1300px] mx-auto">
        <div className="rounded-2xl p-10 md:p-14 reveal" style={{ background: 'rgba(232,119,34,0.07)', border: '1px solid rgba(232,119,34,0.28)', backdropFilter: 'blur(14px)' }}>
          <div className="grid md:grid-cols-3 gap-10 items-center">
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 text-[#E87722] font-semibold text-sm mb-3"><UAEFlag/> UNITED ARAB EMIRATES</div>
                <h3 className="text-white text-xl font-bold mb-2">Abu Dhabi Headquarters</h3>
                <div className="space-y-1.5 text-white/85 text-sm">
                  <div className="flex items-center gap-2"><Phone size={14} className="text-[#E87722] flex-shrink-0"/><span>+971 2 676 6935</span></div>
                  <div className="flex items-center gap-2"><Mail size={14} className="text-[#E87722] flex-shrink-0"/><span>info@ipcare.ae</span></div>
                  <div className="flex items-start gap-2"><MapPin size={14} className="text-[#E87722] mt-0.5 flex-shrink-0"/><span>Salaam Street, Behind Fabrix, P.O. Box 53209, Abu Dhabi, UAE</span></div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[#E87722] font-semibold text-sm mb-3"><CanadaFlag/> CANADA</div>
                <h3 className="text-white text-xl font-bold mb-2">Toronto Operations</h3>
                <div className="space-y-1.5 text-white/85 text-sm">
                  <div className="flex items-center gap-2"><Phone size={14} className="text-[#E87722] flex-shrink-0"/><span>+1 416 786 0782</span></div>
                  <div className="flex items-center gap-2"><Mail size={14} className="text-[#E87722] flex-shrink-0"/><span>info@ipcare.ae</span></div>
                  <div className="flex items-start gap-2"><MapPin size={14} className="text-[#E87722] mt-0.5 flex-shrink-0"/><span>1 Concorde Gate, North York, ON, Canada</span></div>
                </div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-white text-2xl font-bold mb-2">Let&apos;s build something<br/>enterprise-grade.</h3>
              <a href="mailto:info@ipcare.ae" className="btn-primary mt-4">Get in Touch <ArrowRight size={16}/></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- MAIN APP ---------------- */
const App = () => {
  useReveal()
  return (
    <main>
      <Header />
      <Hero />
      <TrustMarquee />
      <Services />
      <Stats />
      <CyberAdvisory />
      <RentalTeaser />
      <EventsPortfolio />
      <About />
      <Testimonials />
      <BlogTeaser />
      <OfficesCTA />
      <Footer />
    </main>
  )
}

export default App
