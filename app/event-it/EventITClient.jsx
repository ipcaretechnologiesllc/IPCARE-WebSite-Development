'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { events, eventServices, partners, capabilityStats } from '@/lib/event-it-data'
import CTAPhoneButtons from '@/components/site/CTAPhoneButtons'

const Ic = ({ name, ...rest }) => {
  const C = Icons[name] || Icons.Wifi
  return <C {...rest} />
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ============ 1. HERO ============ */
function Hero() {
  return (
    <section
      className="relative flex items-center justify-center px-6 py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0B1A46 0%, #0F245F 50%, #1E3A8A 100%)',
        borderBottom: '3px solid #E87722',
        minHeight: '85vh',
      }}
    >
      {/* Grid texture */}
      <div className="absolute inset-0 premium-grid pointer-events-none" />
      {/* Orange glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 60%)' }}
      />

      <div className="relative max-w-[900px] w-full text-center reveal">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
          style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.4)' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E87722] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E87722]" />
          </span>
          <span className="mono text-[#E87722] text-xs font-semibold uppercase tracking-[0.2em]">
            Event IT Infrastructure
          </span>
        </div>

        <h1
          className="text-white font-bold leading-[1.08] tracking-tight"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)' }}
        >
          Mission-Critical IT Infrastructure for the World&apos;s{' '}
          <span className="text-[#E87722]">Biggest Events</span>
        </h1>

        <p className="body-text mt-6 text-base md:text-lg max-w-2xl mx-auto">
          Trusted on FIFA Club World Cup, UFC UAE (2020–2025), NBA Abu Dhabi Games, EuroLeague
          Final Four 2025 (first outside Europe), FINA World Swimming, IIFA Awards, Coldplay,
          Saadiyat Nights and the UAE Official National Day events. From temporary WiFi for
          60,000 fans to broadcast-grade data centres, deployed at speed.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {[
            'FIFA', 'UFC', 'NBA', 'EuroLeague', 'FINA', 'IIFA',
            'Coldplay', 'Saadiyat Nights', 'WBA', 'Mubadala Open', 'UAE National Day',
          ].map((b) => (
            <span key={b} className="pill-badge">{b}</span>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/#contact" className="btn-primary">
            Plan Your Event IT <Icons.ArrowRight size={16} />
          </Link>
          <Link href="/event-it/portfolio" className="btn-ghost">
            View Our Portfolio
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ============ 2. EVENTS PORTFOLIO ============ */
function EventsPortfolio() {
  const [filter, setFilter] = useState('All Events')
  const tabs = ['All Events', 'Sports', 'Concerts', 'National']
  const filtered = filter === 'All Events' ? events : events.filter((e) => e.category === filter)

  return (
    <section className="py-20 md:py-24 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10 reveal">
          <h2 className="text-white text-4xl md:text-5xl font-bold heading-accent">
            Major Events Powered
          </h2>
          <p className="body-text mt-5 max-w-2xl mx-auto">
            From world finals to global tours — we deliver the IT backbone that keeps the show on.
          </p>
        </div>

        {/* Filter tabs — All Events / Sports / Concerts / National */}
        <div className="flex justify-center gap-2.5 mb-10 flex-wrap reveal">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`glass-pill${filter === t ? ' active' : ''}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Cards — identical structure to homepage EventsPortfolio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((ev, i) => (
            <Link
              key={ev.slug}
              href={ev.link || `/event-it/${ev.slug}`}
              className="group relative rounded-xl overflow-hidden aspect-[3/4] block reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <img
                src={ev.img}
                alt={`${ev.name} — event IT infrastructure by IP Care`}
                width={600}
                height={800}
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'auto'}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentElement.style.background =
                    'linear-gradient(135deg, #0B1A46 0%, #1E3A8A 100%)'
                }}
              />
              {/* Dark gradient overlay — tall enough for two-line titles */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(11,26,70,0.95) 0%, rgba(11,26,70,0.75) 35%, transparent 75%)',
                }}
              />
              {/* Card content */}
              <div className="absolute bottom-0 left-0 right-0" style={{ padding: '20px' }}>
                <span
                  className="inline-block px-2.5 py-1 rounded text-[13px] uppercase tracking-wider font-semibold"
                  style={{ background: '#E87722', color: '#fff', marginBottom: '8px' }}
                >
                  {ev.category}
                </span>
                <h3 className="text-white text-lg font-bold leading-snug" style={{ marginBottom: '6px' }}>{ev.name}</h3>
                <p className="text-white/70 text-xs" style={{ marginBottom: '10px' }}>
                  {ev.location} · {ev.year}
                </p>
                <span className="inline-flex items-center gap-1 text-[#E87722] text-xs font-semibold group-hover:gap-2 transition-all">
                  View Case Study <Icons.ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10 reveal">
          <Link href="/event-it/portfolio" className="btn-ghost">
            View Full Portfolio <Icons.ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ============ 3. END-TO-END SERVICES ============ */
function Services() {
  return (
    <section className="py-20 md:py-24 px-6" style={{ background: '#F4F6FA' }}>
      <div className="max-w-[1300px] mx-auto">
        <div className="text-center mb-12 reveal">
          <div className="section-eyebrow">Services</div>
          <h2 className="text-[#0B1A46] text-3xl md:text-5xl font-bold leading-tight">
            End-to-End Event IT Services
          </h2>
          <p className="text-[#4B5563] mt-4 max-w-2xl mx-auto">
            From first network diagram to final de-rig — we own every layer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {eventServices.map((s, i) => {
            const link = ['event-wifi', 'temporary-data-centres', 'event-cctv'].includes(s.slug)
              ? `/event-it/${s.slug}`
              : '/#contact'
            return (
              <Link
                key={s.slug}
                href={link}
                className="service-card p-8 block group reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Orange icon in soft-orange rounded square */}
                <div
                  className="w-14 h-14 flex items-center justify-center mb-5 rounded-xl"
                  style={{ background: 'rgba(232,119,34,0.12)' }}
                >
                  <Ic name={s.icon} size={26} className="text-[#E87722]" />
                </div>
                <h3 className="service-card__title text-xl mb-2">{s.name}</h3>
                <p className="service-card__desc text-sm leading-relaxed mb-5">{s.short}</p>
                <span className="service-card__cta inline-flex items-center gap-1.5 font-semibold text-sm px-4 py-2">
                  Learn More <Icons.ArrowRight size={13} />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ============ 4. HOW IT WORKS ============ */
const HOW_IT_WORKS_STEPS = [
  {
    n: '01',
    t: 'Consultation',
    d: 'We scope your event requirements — venue layout, capacity, broadcast needs, timeline — and deliver a written IT brief on a fast turnaround.',
  },
  {
    n: '02',
    t: 'Design',
    d: 'RF planning, heat-mapping, rack design and cabling schedules produced to TIA standards. Full bill of materials before kit leaves the depot.',
  },
  {
    n: '03',
    t: 'Deployment',
    d: 'Structured cabling, WiFi, CCTV, data centre and point-to-point links installed and certified within your event build window.',
  },
  {
    n: '04',
    t: 'Live Support',
    d: 'On-site engineers plus a 24/7 NOC monitor every link during the event. Post-event de-rig and performance report included.',
  },
]

function HowItWorks() {
  return (
    <section className="py-20 md:py-24 px-6" style={{ background: '#F4F6FA' }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-14 reveal">
          <div className="section-eyebrow">Process</div>
          <h2 className="text-[#0B1A46] text-3xl md:text-5xl font-bold leading-tight">How It Works</h2>
          <p className="text-[#4B5563] mt-4 max-w-xl mx-auto">Four steps from kick-off to encore.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connecting line — desktop only */}
          <div
            className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, #E87722 0%, rgba(232,119,34,0.25) 100%)',
            }}
          />

          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <div key={step.n} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <StepCard step={step} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StepCard({ step }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="bg-white rounded-2xl p-8 h-full text-center"
      style={{
        borderTop: '3px solid #E87722',
        borderRadius: '16px',
        boxShadow: hovered
          ? '0 16px 48px rgba(10,26,70,0.26)'
          : '0 8px 32px rgba(10,26,70,0.18)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
        style={{ background: '#E87722', color: '#fff', fontWeight: 700, fontSize: '15px' }}
      >
        {step.n}
      </div>
      <h3 className="text-[#0B1A46] text-lg font-bold mb-3">{step.t}</h3>
      <p className="text-[#4B5563] text-sm leading-relaxed">{step.d}</p>
    </div>
  )
}

/* ============ 5. CAPABILITY STATS (keep on navy) ============ */
function CapabilityStats() {
  return (
    <section
      className="py-20 px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0B1A46 0%, #0F245F 50%, #1E3A8A 100%)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(232,119,34,0.04) 50%, transparent 100%)',
          }}
        />
      </div>
      <div className="max-w-[1200px] mx-auto relative">
        <div className="text-center mb-10 reveal">
          <div className="section-eyebrow">Capability</div>
          <h2 className="text-white text-3xl md:text-4xl font-bold">Engineered at Event Scale</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {capabilityStats.map((t, i) => (
            <div
              key={t.l}
              className="glass-card p-7 text-center reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="text-4xl md:text-5xl font-bold text-[#E87722] tracking-tight">{t.n}</div>
              <div className="text-white/60 text-xs md:text-sm mt-2 uppercase tracking-wider mono">
                {t.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ 6. TECHNOLOGY WE DEPLOY (keep on navy) ============ */
function Technology() {
  return (
    <section
      className="py-16 px-6"
      style={{ background: 'linear-gradient(135deg, #0B1A46 0%, #081434 100%)' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10 reveal">
          <div className="section-eyebrow">
            Technology Partners
          </div>
          <h2 className="text-white text-2xl md:text-3xl font-bold">Technology We Deploy</h2>
          <p className="body-text mt-3 max-w-xl mx-auto text-sm">
            Certified across the platforms that power modern events.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 reveal">
          {partners.map((p, i) => (
            <TechPill key={p.name} name={p.name} delay={i * 50} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TechPill({ name, delay }) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      className="inline-block px-5 py-2.5 text-sm font-semibold cursor-default"
      style={{
        background: hovered ? '#E87722' : '#FFFFFF',
        color: hovered ? '#fff' : '#0B1A46',
        border: '1px solid #E87722',
        borderRadius: '30px',
        transition: 'background 0.2s ease, color 0.2s ease',
        transitionDelay: `${delay}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {name}
    </span>
  )
}

/* ============ 7. CTA STRIP ============ */
function CTAStrip() {
  return (
    <section
      className="py-20 px-6"
      style={{
        background: '#1E3A8A',
        borderTop: '3px solid #E87722',
      }}
    >
      <div className="max-w-[1200px] mx-auto reveal">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="md:col-span-2 text-center">
            <div className="section-eyebrow">
              Book Your Event
            </div>
            <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-4">
              Ready to Power Your Next Event?
            </h2>
            <p className="body-text mb-8">
              From kick-off to encore, IP Care keeps the network on. Get a tailored event IT
              proposal, fast.
            </p>
            <CTAPhoneButtons />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============ PAGE ROOT ============ */
export default function EventITClient() {
  useReveal()
  return (
    <main>
      <Hero />
      <EventsPortfolio />
      <Services />
      <HowItWorks />
      <CapabilityStats />
      <Technology />
      <CTAStrip />
    </main>
  )
}
