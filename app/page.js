'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ShieldCheck, Server, Lock, Network, Cable, Cloud, Calendar,
  Laptop, Tablet, Wifi, Printer, Wrench, ArrowRight, Phone, Mail,
  MapPin, Clock, CheckCircle2, Building2,
  HeartHandshake, Award, Users, Activity, Headphones
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import { UAEFlag, CanadaFlag } from '@/components/site/Logo'
import { articles } from '@/lib/blog-data'

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

/* ---------------- Hero Service Carousel ---------------- */
const HERO_SLIDES = [
  {
    id: 0,
    service: 'Managed IT Services',
    icon: Server,
    headline: 'End-to-End IT Operations, Monitored 24/7',
    description: 'Proactive Monitoring, Maintenance and SLA-Backed Support.',
    link: '/services/managed-it',
    bg: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=85',
  },
  {
    id: 1,
    service: 'Cybersecurity',
    icon: Lock,
    headline: 'Zero Trust Security and Compliance, Built In',
    description: 'SOC-Grade Protection Aligned to NESA, PCI and ISO 27001.',
    link: '/services/cybersecurity',
    bg: 'https://images.unsplash.com/photo-1585134438520-f71c9af97d5f?w=1920&q=85',
  },
  {
    id: 2,
    service: 'ELV & Physical Security',
    icon: ShieldCheck,
    headline: 'CCTV, Access Control and Structured Cabling',
    description: 'Intelligent Physical Security for Modern Facilities.',
    link: '/services/elv',
    bg: 'https://images.unsplash.com/photo-1496368077930-c1e31b4e5b44?w=1920&q=85',
  },
  {
    id: 3,
    service: 'Event IT Infrastructure',
    icon: Calendar,
    headline: "The IT Backbone for the World's Biggest Events",
    description: 'Temporary Networks and Connectivity at Global Event Scale.',
    link: '/event-it',
    bg: 'https://images.unsplash.com/photo-1705593973313-75de7bf95b56?w=1920&q=85',
  },
  {
    id: 4,
    service: 'Equipment Rental',
    icon: Network,
    headline: 'Laptops, Networks and Event Tech, on Demand',
    description: 'Short and Long-Term Rentals with Nationwide Logistics.',
    link: '/rental',
    bg: 'https://images.pexels.com/photos/7689881/pexels-photo-7689881.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  {
    id: 5,
    service: 'Cloud Services',
    icon: Cloud,
    headline: 'Cloud Design, Migration and Cost Optimization',
    description: 'AWS, Azure and Private Cloud, Engineered for Scale.',
    link: '/services/cloud',
    bg: 'https://images.unsplash.com/photo-1606778303077-3780ea8d5420?w=1920&q=85',
  },
]

function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const touchStartX = useRef(null)
  const intervalRef = useRef(null)

  const goTo = useCallback((idx) => {
    setCurrent(((idx % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length)
  }, [])

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % HERO_SLIDES.length)
  }, [])

  const goPrev = useCallback(() => {
    setCurrent((c) => (c - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }, [])

  /* Auto-advance every 5 s; pause when mouse is over the carousel */
  useEffect(() => {
    if (isHovered) return
    intervalRef.current = setInterval(goNext, 5000)
    return () => clearInterval(intervalRef.current)
  }, [isHovered, goNext])

  /* Keyboard: ArrowLeft / ArrowRight */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goNext()
      else if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  /* Touch / swipe */
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(dx) > 50) { dx > 0 ? goNext() : goPrev() }
    touchStartX.current = null
  }

  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{ height: 'calc(100vh - 108px)', minHeight: '600px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="IP Care Technologies — Services"
    >
      {/* ── Slides (all absolutely stacked; only active is opaque) ── */}
      {HERO_SLIDES.map((slide, i) => {
        const Icon = slide.icon
        const active = i === current
        return (
          <div
            key={slide.id}
            className="absolute inset-0"
            style={{
              opacity: active ? 1 : 0,
              transition: 'opacity 0.6s ease-in-out',
              pointerEvents: active ? 'auto' : 'none',
            }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${HERO_SLIDES.length}: ${slide.service}`}
            aria-hidden={!active}
          >
            {/* Background image */}
            <img
              src={slide.bg}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
            />

            {/* Dark blue overlay — keeps white text readable over any image */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(5,12,30,0.88) 0%, rgba(10,22,58,0.84) 45%, rgba(13,36,90,0.80) 100%)',
              }}
            />

            {/* Slide content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-16 md:py-24 text-center">
              <div className="w-full max-w-[960px] mx-auto">

                {/* Service label pill */}
                <div
                  className="inline-flex items-center gap-2 mb-7 px-4 py-2 rounded-full"
                  style={{
                    background: 'rgba(232,119,34,0.12)',
                    border: '1px solid rgba(232,119,34,0.40)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Icon size={14} style={{ color: '#E87722' }} strokeWidth={2.2} />
                  <span
                    className="uppercase font-semibold tracking-[0.22em]"
                    style={{ fontSize: '11px', color: '#E87722' }}
                  >
                    {slide.service}
                  </span>
                </div>

                {/* Headline */}
                <h1
                  className="text-white font-extrabold leading-tight"
                  style={{ fontSize: 'clamp(28px, 4.6vw, 58px)', lineHeight: 1.14 }}
                  aria-live={active ? 'polite' : undefined}
                >
                  {slide.headline}
                </h1>

                {/* Description */}
                <p
                  className="mt-5 text-white/80 leading-relaxed max-w-2xl mx-auto"
                  style={{ fontSize: 'clamp(15px, 1.8vw, 20px)' }}
                >
                  {slide.description}
                </p>

                {/* CTAs */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="/contact"
                    className="btn-primary w-full sm:w-auto justify-center"
                    style={{ padding: '15px 32px', fontSize: '15px' }}
                  >
                    Get a Free Consultation <ArrowRight size={17} />
                  </a>
                  <a
                    href={slide.link}
                    className="btn-ghost w-full sm:w-auto justify-center"
                    style={{ padding: '14px 28px', fontSize: '15px' }}
                  >
                    Learn More
                  </a>
                </div>

              </div>
            </div>
          </div>
        )
      })}

      {/* ── Dot indicators ── */}
      <div
        className="absolute bottom-7 left-0 right-0 z-20 flex items-center justify-center gap-3"
        role="tablist"
        aria-label="Service slide navigation"
      >
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to ${slide.service}`}
            onClick={() => goTo(i)}
            tabIndex={0}
            className="rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E87722] focus-visible:ring-offset-1"
            style={{
              width: i === current ? 26 : 8,
              height: 8,
              background: i === current ? '#E87722' : 'rgba(255,255,255,0.38)',
              boxShadow: i === current ? '0 0 12px rgba(232,119,34,0.65)' : 'none',
            }}
          />
        ))}
      </div>
    </section>
  )
}

/* ---------------- Trust Marquee ---------------- */
function TrustMarquee() {
  const events = ['FIFA CLUB WORLD CUP', 'EUROLEAGUE FINAL FOUR 2025', 'UFC UAE 2020–25', 'NBA ABU DHABI', 'FINA WORLD SWIMMING', 'WBA WORLD CHAMPIONSHIP', 'WORLD TENNIS LEAGUE', 'MUBADALA ABU DHABI OPEN', 'IIFA AWARDS', 'COLDPLAY', 'SAADIYAT NIGHTS', 'YA SALAM AFTER RACE CONCERT', 'UAE NATIONAL DAY 48TH', 'UAE NATIONAL DAY 49TH', 'USA BASKETBALL 2024', 'ABU DHABI PADEL MASTER']
  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: '80px',
        background: '#0B1A46',
        borderTop: '3px solid #E87722',
        paddingTop: '22px',
        paddingBottom: '22px',
      }}
    >
      {/* Label */}
      <div className="text-center mb-[10px]">
        <p
          className="uppercase"
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#E87722',
            letterSpacing: '3px',
          }}
        >
          TRUSTED BY THE WORLD'S BIGGEST EVENTS
        </p>
      </div>

      {/* Scrolling Strip with Fade Edges */}
      <div className="relative overflow-hidden">
        {/* Left fade gradient */}
        <div
          className="absolute left-0 top-0 bottom-0 pointer-events-none z-10"
          style={{
            width: '80px',
            background: 'linear-gradient(to right, #0b1a46, transparent)',
          }}
        />

        {/* Right fade gradient */}
        <div
          className="absolute right-0 top-0 bottom-0 pointer-events-none z-10"
          style={{
            width: '80px',
            background: 'linear-gradient(to left, #0b1a46, transparent)',
          }}
        />

        {/* Marquee Track */}
        <div className="marquee-track">
          {[...events, ...events, ...events, ...events].map((event, i) => (
            <div key={i} className="flex-shrink-0 flex items-center">
              <span
                className="whitespace-nowrap uppercase"
                style={{
                  fontSize: '17px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '2px',
                }}
              >
                {event}
              </span>
              <span
                style={{
                  color: '#E87722',
                  margin: '0 24px',
                  fontSize: '16px',
                }}
              >
                ◆
              </span>
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
    { icon: Server, name: 'Managed IT Services', d: 'End-to-end IT operations, 24/7 monitoring, proactive maintenance and SLA-backed support.', link: '/services/managed-it' },
    { icon: Lock, name: 'Cybersecurity', d: 'SOC, Zero Trust, firewall management and compliance aligned to NESA, PCI, ISO 27001.', link: '/services/cybersecurity' },
    { icon: Cable, name: 'ELV & Physical Security', d: 'CCTV, access control, structured cabling and intrusion detection for modern facilities.', link: '/services/elv' },
    { icon: Calendar, name: 'Event IT Infrastructure', d: 'Turnkey event networks, temporary WiFi, broadcast connectivity and production LANs.', link: '/event-it' },
    { icon: Network, name: 'Equipment Rental', d: 'Laptops, iPads, routers, switches & printers — short & long-term with logistics.', link: '/rental' },
    { icon: Cloud, name: 'Cloud Services', d: 'AWS, Azure, private cloud design, migration, cost optimisation and FinOps.', link: '/services/cloud' },
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
              <a href={s.link} className="inline-flex items-center gap-1.5 text-[#E87722] font-semibold text-sm px-4 py-1.5 rounded-full border border-[#E87722]/50 bg-[#E87722]/5 hover:bg-[#E87722] hover:text-white hover:border-[#E87722] hover:gap-2.5 transition-all">
                Learn More <ArrowRight size={13}/>
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
    { display: '20+', label: 'Years Experience', icon: Award },
    { display: '500+', label: 'Projects Delivered', icon: CheckCircle2 },
    { display: '200+', label: 'Enterprise Clients', icon: Users },
    { display: '99.9%', label: 'Uptime SLA', icon: Activity },
    { display: '24/7', label: 'Support', icon: Headphones },
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
              <div className="text-[#E87722] text-3xl md:text-4xl font-bold mb-2">{s.display}</div>
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
    { name: 'Laptops', spec: 'Intel i7 / 16GB / SSD', icon: Laptop, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80', href: '/rental/laptops-desktops' },
    { name: 'iPads & Tablets', spec: 'iPad Pro, Samsung Tab', icon: Tablet, img: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&q=80', href: '/rental/tablets-ipads' },
    { name: 'Event WiFi', spec: 'High-density access points', icon: Wifi, img: '/Rental/rental-event-wifi.png', href: '/rental/event-wifi' },
    { name: 'Testing Equipment', spec: 'Fluke DSX 5000, OTDR, Splicer', icon: Wrench, img: '/Rental/category-testing-equipment.jpg', href: '/rental/testing-equipment' },
    { name: 'Printers', spec: 'Mono / Colour / MFP', icon: Printer, img: '/Rental/rental-printers.jpg', href: '/rental/printers' },
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
            <a
              key={it.name}
              href={it.href}
              className="group relative rounded-2xl overflow-hidden reveal block"
              style={{ transitionDelay: `${i * 80}ms`, aspectRatio: '3/4', minHeight: '260px' }}
            >
              {/* Full-bleed image */}
              <img
                src={it.img}
                alt={`${it.name} rental UAE — IP Care Technologies`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Base gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, rgba(7,16,42,0.10) 0%, rgba(7,16,42,0.40) 35%, rgba(7,16,42,0.93) 100%)' }}
              />

              {/* Hover — orange tint bleeds in from top */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(180deg, rgba(232,119,34,0.12) 0%, transparent 55%)' }}
              />

              {/* Orange icon badge — top left */}
              <div
                className="absolute top-3 left-3 p-2 rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: '#E87722', boxShadow: '0 4px 14px rgba(232,119,34,0.50)' }}
              >
                <it.icon size={17} className="text-white" />
              </div>

              {/* Content pinned to bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-white font-bold text-base leading-tight mb-1">{it.name}</h4>
                <p className="text-white/65 text-xs mb-3 leading-snug">{it.spec}</p>
                <button
                  className="w-full text-xs font-semibold py-2 px-3 rounded-lg transition-all duration-300 group-hover:brightness-110"
                  style={{ background: '#E87722', color: '#fff', boxShadow: '0 2px 10px rgba(232,119,34,0.35)' }}
                >
                  Add to Quote
                </button>
              </div>

              {/* Orange sweep line on hover */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                style={{ background: '#E87722' }}
              />
            </a>
          ))}
        </div>
        <div className="text-center mt-10 reveal">
          <a href="/rental" className="btn-ghost">Browse Full Rental Catalogue <ArrowRight size={16}/></a>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Events Portfolio ---------------- */
function EventsPortfolio() {
  const events = [
    { slug: 'fifa-club-world-cup', name: 'FIFA Club World Cup', loc: 'Abu Dhabi, UAE • 2022', region: 'Sports', img: '/events/fifa-club-world-cup.png' },
    { slug: 'ufc-uae', name: 'UFC Events in UAE', loc: 'Yas Island, Abu Dhabi • 2020–2025', region: 'Sports', img: '/events/ufc-uae.jpeg' },
    { slug: 'nba-abu-dhabi-games', name: 'NBA Abu Dhabi Games', loc: 'Etihad Arena • 2022, 2023, 2024, 2025', region: 'Sports', img: '/events/nba-abu-dhabi-games.png' },
    { slug: 'euroleague-final-four-2025', name: 'EuroLeague Final Four 2025', loc: 'Etihad Arena, Abu Dhabi • 23–25 May 2025', region: 'Sports', img: '/events/euroleague-final-four-2025.png' },
    { slug: 'fina-world-swimming-championship', name: 'FINA World Swimming Championship', loc: 'Etihad Arena, Abu Dhabi • 2021', region: 'Sports', img: '/events/fina-world-swimming-championship.png' },
    { slug: 'wba-light-heavyweight-championship', name: 'WBA Light Heavyweight Championship', loc: 'Etihad Arena, Abu Dhabi • 2022', region: 'Sports', img: '/events/wba-light-heavyweight-championship.png' },
    { slug: 'world-tennis-league', name: 'World Tennis League', loc: 'Coca-Cola Arena, Dubai • 2022, 2023', region: 'Sports', img: '/events/world-tennis-league.png' },
    { slug: 'mubadala-abu-dhabi-open', name: 'Mubadala Abu Dhabi Open', loc: 'Zayed Sports City • Annual', region: 'Sports', img: '/events/mubadala-abu-dhabi-open.png' },
    { slug: 'abu-dhabi-padel-master', name: 'Abu Dhabi Padel Master', loc: 'Hudayriat Island • 2023', region: 'Sports', img: '/events/abu-dhabi-padel-master.jpeg' },
    { slug: 'coldplay-world-tour', name: 'Coldplay World Tour', loc: 'Zayed Sports City, Abu Dhabi • 2024', region: 'Concerts', img: '/events/coldplay-world-tour.png' },
    { slug: 'saadiyat-nights', name: 'Saadiyat Nights', loc: 'Saadiyat Island, Abu Dhabi • 2024, 2025', region: 'Concerts', img: '/events/saadiyat-nights.png' },
    { slug: 'iifa-awards', name: 'IIFA Awards', loc: 'Yas Island, Abu Dhabi • 2022, 2023, 2024', region: 'Concerts', img: '/events/iifa-awards.jpg' },
    { slug: 'ya-salam-after-race-concert', name: 'Ya Salam After Race Concert', loc: 'Yas Island, Abu Dhabi • 2019–2024', region: 'Concerts', img: '/events/ya-salam-after-race-concert.png' },
    { slug: 'uae-national-day-48th', name: 'UAE National Day — 48th Edition', loc: 'Zayed Sports City, UAE • Dec 2019', region: 'National', img: '/events/uae-national-day-48th.png' },
    { slug: 'uae-national-day-49th', name: 'UAE National Day — 49th Edition', loc: 'Al Jubail Mangrove Park, Abu Dhabi • Dec 2020', region: 'National', img: '/events/uae-national-day-49th.png' },
    { slug: 'usa-basketball-2024', name: 'USA Basketball Showcase 2024', loc: 'Etihad Arena, Abu Dhabi • 2024', region: 'Sports', img: '/events/usa-basketball-2024.png' },
  ]
  const [filter, setFilter] = useState('All Events')
  const tabs = ['All Events', 'Sports', 'Concerts', 'National']
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
            <a key={ev.slug} href={`/event-it/${ev.slug}`} className="group relative rounded-xl overflow-hidden aspect-[3/4] reveal block" style={{ transitionDelay: `${i * 80}ms` }}>
              <img src={ev.img} alt={`${ev.name} — event IT infrastructure by IP Care`} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(7,16,42,0.0) 0%, rgba(7,16,42,0.15) 45%, rgba(7,16,42,0.75) 100%)' }}/>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-block px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-semibold mb-2" style={{ background: '#E87722', color: '#fff' }}>{ev.region}</span>
                <h3 className="text-white text-lg font-semibold leading-snug">{ev.name}</h3>
                <p className="text-white/70 text-xs mt-1">{ev.loc}</p>
              </div>
            </a>
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
            <a href="/contact" className="btn-primary">Talk to an Expert <ArrowRight size={16}/></a>
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
  // Show the three most recent articles, sorted by date.
  const posts = [...articles]
    .map(a => ({ ...a, _ts: new Date(a.date).getTime() }))
    .sort((a, b) => b._ts - a._ts)
    .slice(0, 3)
  return (
    <section id="blog" className="py-24 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-white text-4xl md:text-5xl font-bold heading-accent">From the Knowledge Base</h2>
          <p className="body-text mt-5">Insights from our engineers and advisors.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {posts.map((p, i) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="glass-card overflow-hidden reveal group block hover:ring-2 hover:ring-[#E87722]/40 transition-all" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="relative h-48 overflow-hidden">
                <img src={`${p.img}?w=800&q=80`} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-semibold" style={{ background: '#E87722', color: '#fff' }}>{p.category}</span>
              </div>
              <div className="p-6">
                <h3 className="text-white font-semibold text-lg leading-snug mb-2 group-hover:text-[#E87722] transition-colors">{p.title}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-white/50 text-xs">{p.date}</span>
                  <span className="inline-flex items-center gap-1.5 text-[#E87722] text-sm font-semibold px-4 py-1.5 rounded-full border border-[#E87722]/50 bg-[#E87722]/5 group-hover:bg-[#E87722] group-hover:text-white group-hover:border-[#E87722] group-hover:gap-2.5 transition-all">Read More <ArrowRight size={13}/></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10 reveal">
          <Link href="/blog" className="btn-ghost">Visit Our Knowledge Base <ArrowRight size={16}/></Link>
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
      <HeroCarousel />
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
