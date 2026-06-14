'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ShieldCheck, Server, Lock, Network, Cable, Cloud, Calendar,
  Laptop, Tablet, Wifi, Printer, Wrench, ArrowRight, Phone, Mail,
  MapPin, Clock, CheckCircle2, Building2,
  HeartHandshake, Award, Users, Activity, Headphones,
  ChevronLeft, ChevronRight, Globe
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import CertificationsBand from '@/components/site/CertificationsBand'
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

/* ---------------- Hero Carousel (7 slides) ---------------- */
const HERO_SLIDES = [
  {
    id: 0,
    service: "Trusted by the World's Biggest Events",
    icon: ShieldCheck,
    headline: 'The Technology Force Behind ',
    headlineAccent: 'High Stakes Events & Growth Driven Enterprises',
    description: 'Managed IT, Cybersecurity, Cloud, Event Infrastructure & Equipment Rental trusted by leading organisations since 2003.',
    bg: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=85',
    mobileBg: '/images/hero-mobile/hero-m-overall.webp',
    cta: { primary: { label: 'Get a Free Consultation', href: '/contact' }, secondary: { label: 'View Our Services', href: '/services' } },
  },
  {
    id: 1,
    service: 'Managed IT Services',
    icon: Server,
    headline: '',
    headlineAccent: 'Managed IT Services',
    headlineSuffix: ' That Never Sleep',
    description: 'Proactive monitoring, server and network management, help desk support, and SLA-backed response, so your team stays focused on the work that matters.',
    bg: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=85',
    mobileBg: '/images/hero-mobile/hero-m-managed-it.webp',
    cta: { primary: { label: 'Explore Managed IT', href: '/services/managed-it' }, secondary: { label: 'Request an SLA Quote', href: '/contact' } },
  },
  {
    id: 2,
    service: 'Cybersecurity',
    icon: Lock,
    headline: 'Enterprise ',
    headlineAccent: 'Cybersecurity',
    headlineSuffix: ' You Can Rely On',
    description: 'SOC monitoring, Zero Trust architecture, and compliance advisory aligned to NESA, PCI DSS, and ISO 27001, delivered by certified security engineers with 20+ years of experience.',
    bg: 'https://images.unsplash.com/photo-1585134438520-f71c9af97d5f?w=1920&q=85',
    mobileBg: '/images/hero-mobile/hero-m-cyber.webp',
    cta: { primary: { label: 'View Cyber Services', href: '/services/cybersecurity' }, secondary: { label: 'Book a Security Review', href: '/contact' } },
  },
  {
    id: 3,
    service: 'ELV & Physical Security',
    icon: ShieldCheck,
    headline: 'Physical ',
    headlineAccent: 'Security and Infrastructure',
    headlineSuffix: ' Done Right',
    description: 'CCTV, access control, structured cabling, and ELV systems, designed, installed, and maintained by certified engineers with 20+ years on-site experience.',
    bg: 'https://images.unsplash.com/photo-1496368077930-c1e31b4e5b44?w=1920&q=85',
    mobileBg: '/images/hero-mobile/hero-m-elv.webp',
    cta: { primary: { label: 'Explore ELV & Security', href: '/services/elv' }, secondary: { label: 'Request a Survey', href: '/contact' } },
  },
  {
    id: 4,
    service: 'Event IT Infrastructure',
    icon: Calendar,
    headline: "The IT Backbone for the World's ",
    headlineAccent: 'Biggest Events',
    description: 'High-density WiFi, temporary networks, and on-site IT infrastructure, deployed at FIFA, UFC, NBA, and Coldplay scale.',
    bg: 'https://images.unsplash.com/photo-1705593973313-75de7bf95b56?w=1920&q=85',
    mobileBg: '/images/hero-mobile/hero-m-eventit.webp',
    cta: { primary: { label: 'See Event IT Services', href: '/event-it' }, secondary: { label: 'Plan Your Event', href: '/contact' } },
  },
  {
    id: 5,
    service: 'Equipment Rental',
    icon: Network,
    headline: 'Enterprise ',
    headlineAccent: 'IT Equipment',
    headlineSuffix: ', Ready When You Are',
    description: 'Laptops, networking gear, event WiFi, CCTV, and testing equipment, short or long-term, delivered and set up by our engineers.',
    bg: 'https://images.pexels.com/photos/7689881/pexels-photo-7689881.jpeg?auto=compress&cs=tinysrgb&w=1920',
    mobileBg: '/images/hero-mobile/hero-m-rental.webp',
    cta: { primary: { label: 'Browse Equipment', href: '/rental' }, secondary: { label: 'Get a Rental Quote', href: '/contact' } },
  },
  {
    id: 6,
    service: 'Cloud Services',
    icon: Cloud,
    headline: 'Move to the Cloud ',
    headlineAccent: 'Without the Guesswork',
    description: 'Cloud strategy, migration, and cost optimisation across AWS, Azure, and private cloud, planned and delivered by engineers who have done it at enterprise scale.',
    bg: 'https://images.unsplash.com/photo-1606778303077-3780ea8d5420?w=1920&q=85',
    mobileBg: '/images/hero-mobile/hero-m-cloud.webp',
    cta: { primary: { label: 'Explore Cloud Services', href: '/services/cloud' }, secondary: { label: 'Book a Cloud Review', href: '/contact' } },
  },
]

function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const touchStartX = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(motionQuery.matches)
    const onMotionChange = (e) => setReducedMotion(e.matches)
    motionQuery.addEventListener('change', onMotionChange)

    return () => {
      window.removeEventListener('resize', checkMobile)
      motionQuery.removeEventListener('change', onMotionChange)
    }
  }, [])

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
      className="relative overflow-hidden hero-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="IP Care Technologies, Services"
    >
      {/* Preload the mobile LCP hero image so the browser preloader can fetch it
          before hydration runs (the <video>/<img> swap below depends on JS-detected isMobile) */}
      <link
        rel="preload"
        as="image"
        href="/images/hero-mobile/hero-m-overall.webp"
        media="(max-width: 768px)"
        fetchPriority="high"
      />
      {/* Preload the desktop hero video poster — it's the LCP element until the
          <video> has enough data to paint a frame, and is also used directly
          when reduced-motion is active on desktop. */}
      <link
        rel="preload"
        as="image"
        href="/images/hero-poster.webp"
        media="(min-width: 769px)"
        fetchPriority="high"
      />
      {/* ── Persistent background: video on desktop, rotating images on mobile/reduced-motion ── */}
      <div className="absolute inset-0 z-0">
        {!isMobile && !reducedMotion ? (
          <video
            className="absolute inset-0 object-cover"
            style={{ width: '100%', height: '100%', maxWidth: '100%' }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero-poster.webp"
          >
            <source src="/Video/hero.webm" type="video/webm" media="(min-width: 769px)" />
            <source src="/Video/hero.mp4" type="video/mp4" media="(min-width: 769px)" />
          </video>
        ) : !isMobile ? (
          <img
            src="/images/hero-poster.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 object-cover"
            style={{ width: '100%', height: '100%', maxWidth: '100%' }}
          />
        ) : reducedMotion ? (
          <img
            src="/images/hero-mobile/hero-m-overall.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 object-cover"
            style={{ width: '100%', height: '100%', maxWidth: '100%' }}
          />
        ) : (
          HERO_SLIDES.map((slide, i) => {
            const len = HERO_SLIDES.length
            const isAdjacent = i === current || i === (current + 1) % len || i === (current - 1 + len) % len
            if (!isAdjacent) return null
            return (
              <img
                key={slide.id}
                src={slide.mobileBg}
                alt=""
                aria-hidden="true"
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'auto'}
                className="absolute inset-0 object-cover"
                style={{
                  width: '100%',
                  height: '100%',
                  maxWidth: '100%',
                  opacity: i === current ? 1 : 0,
                  transition: 'opacity 0.7s ease-in-out',
                }}
              />
            )
          })
        )}
      </div>

      {/* Navy scrim — keeps white text readable while video stays visible */}
      <div className="absolute inset-0 z-10 bg-[#0B1A46]/45" />

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
            {/* Slide content */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 py-16 md:py-14 text-center">
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

                {/* Headline — H1 on the brand slide only; service slides use H2 (visual size identical via className) */}
                {(() => {
                  const HeadingTag = slide.id === 0 ? 'h1' : 'h2'
                  return (
                    <HeadingTag
                      className="text-white font-extrabold leading-tight"
                      style={{ fontSize: 'clamp(28px, 4.6vw, 58px)', lineHeight: 1.14 }}
                      aria-live={active ? 'polite' : undefined}
                    >
                      {slide.headlineAccent ? (
                        <>{slide.headline}{slide.headlineSuffix === undefined ? ' ' : ''}<span style={{ color: '#E87722' }}>{slide.headlineAccent}</span>{slide.headlineSuffix || ''}</>
                      ) : (
                        slide.headline
                      )}
                    </HeadingTag>
                  )
                })()}

                {/* Description */}
                <p
                  className="mt-5 text-white/80 leading-relaxed max-w-2xl mx-auto"
                  style={{ fontSize: 'clamp(15px, 1.8vw, 20px)' }}
                >
                  {slide.description}
                </p>

                {/* CTAs — per-slide, defined in HERO_SLIDES */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={slide.cta.primary.href}
                    className="btn-primary w-full sm:w-auto justify-center"
                    style={{ padding: '15px 32px', fontSize: '15px' }}
                  >
                    {slide.cta.primary.label} <ArrowRight size={17} />
                  </a>
                  <a
                    href={slide.cta.secondary.href}
                    className="btn-secondary-pill w-full sm:w-auto justify-center"
                    style={{ padding: '15px 32px', fontSize: '15px' }}
                  >
                    {slide.cta.secondary.label}
                  </a>
                </div>

              </div>
            </div>
          </div>
        )
      })}

      {/* ── Dot indicators ── */}
      <div
        className="absolute bottom-7 left-0 right-0 z-30 flex items-center justify-center gap-3"
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
  const events = ['FIFA CLUB WORLD CUP', 'EUROLEAGUE FINAL FOUR 2025', 'USA BASKETBALL 2024', 'UFC UAE 2020-25', 'NBA ABU DHABI', 'FINA WORLD SWIMMING', 'WBA WORLD CHAMPIONSHIP', 'WORLD TENNIS LEAGUE', 'MUBADALA ABU DHABI OPEN', 'IIFA AWARDS', 'COLDPLAY', 'SAADIYAT NIGHTS', 'YA SALAM AFTER RACE CONCERT', 'UAE NATIONAL DAY 48TH', 'UAE NATIONAL DAY 49TH', 'ABU DHABI PADEL MASTER']
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
    { icon: Network, name: 'Equipment Rental', d: 'Laptops, iPads, routers, switches & printers, short & long-term with logistics.', link: '/rental' },
    { icon: Cloud, name: 'Cloud Services', d: 'AWS, Azure, private cloud design, migration, cost optimisation and FinOps.', link: '/services/cloud' },
  ]
  return (
    <section id="services" className="relative overflow-hidden py-24 md:py-28 px-6">
      {/* Background image */}
      <img
        src="/images/pages/services-bg.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ zIndex: 0 }}
        loading="lazy"
      />
      {/* Navy overlay */}
      <div className="absolute inset-0 bg-[#0B1A46]/70" style={{ zIndex: 10 }} />
      {/* Section content */}
      <div className="relative max-w-[1400px] mx-auto" style={{ zIndex: 20 }}>
        <div className="text-center mb-14 reveal">
          <h2 className="text-white text-4xl md:text-5xl font-bold heading-accent">Our Core Services</h2>
          <p className="body-text mt-5 max-w-2xl mx-auto text-base md:text-lg">Full-stack IT capability delivered across enterprise, government and event clients in UAE & Canada.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div key={s.name} className="service-card p-7 reveal group" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="service-card__icon w-12 h-12 flex items-center justify-center mb-5">
                <s.icon size={24} className="text-[#E87722]" strokeWidth={2}/>
              </div>
              <h3 className="service-card__title text-xl mb-2">{s.name}</h3>
              <p className="service-card__desc text-sm leading-relaxed mb-5">{s.d}</p>
              <a href={s.link} className="service-card__cta inline-flex items-center gap-1.5 font-semibold text-sm px-4 py-2">
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
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 50% 0%, rgba(59,123,255,0.10) 0%, transparent 60%), #1E3A8A',
      }}
    >
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-14 reveal">
          <h2 className="text-white text-3xl md:text-4xl font-bold">Enterprise IT Services We Deliver</h2>
          <p className="mt-3" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)' }}>
            Real numbers from two decades of live enterprise delivery.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 md:gap-6">
          {stats.map((s, i) => (
            <div key={s.label} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div
                className="relative text-center h-full"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '14px',
                  boxShadow: '0 4px 22px rgba(0,0,0,0.28)',
                  padding: '32px 20px 28px',
                  overflow: 'hidden',
                  transition: 'transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'
                  e.currentTarget.style.boxShadow = '0 10px 36px rgba(0,0,0,0.38)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.boxShadow = '0 4px 22px rgba(0,0,0,0.28)'
                }}
              >
                {/* Orange top accent line */}
                <div
                  className="absolute top-0 left-0 right-0"
                  style={{ height: '3px', background: '#E87722', borderRadius: '14px 14px 0 0' }}
                />
                {/* Icon */}
                <s.icon
                  className="mx-auto mb-4 text-[#E87722]"
                  size={26}
                  strokeWidth={1.8}
                />
                {/* Big number */}
                <div
                  className="text-[#E87722] font-bold leading-none"
                  style={{ fontSize: 'clamp(34px, 3.2vw, 46px)' }}
                >
                  {s.display}
                </div>
                {/* Label */}
                <div
                  className="mt-3 uppercase tracking-wider font-medium"
                  style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em' }}
                >
                  {s.label}
                </div>
              </div>
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
    { n: '100K+', l: 'Users Protected' },
    { n: '50+', l: 'Enterprise Engagements' },
    { n: '99.9%', l: 'Deployment Success' },
  ]
  // Force the two-column layout via inline styles — external CSS / Tailwind
  // arbitrary utilities have failed to apply on this wrapper twice, so we
  // bypass external rules entirely. Inline styles outrank any class-based CSS.
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto relative">
        <div
          id="cyber-grid"
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1.2fr) minmax(0, 1fr)',
            gap: isMobile ? '32px' : '48px',
            alignItems: 'center',
          }}
        >
          {/* Left column 55% */}
          <div>
            <div className="flex items-center gap-2 text-[#E87722] font-semibold text-sm uppercase tracking-[0.2em] mb-4">
              <Lock size={16}/> Powered by The Cyber Adviser
            </div>
            <h2 className="text-white text-3xl md:text-[42px] font-bold leading-tight mb-4">
              15+ Years of Cybersecurity Practice, <span className="text-[#E87722]">The Cyber Adviser</span>
            </h2>
            <p className="body-text md:text-lg mb-8">We&apos;ve spent 15+ years building security programs that hold. Zero Trust rollouts, SOC maturity, firewall architecture, across banks, government entities and enterprises that can&apos;t afford to get it wrong.</p>

            <div className="flex flex-wrap gap-3 mb-10">
              {vendors.map((v) => (
                <span
                  key={v}
                  className="px-4 py-2 text-sm font-medium"
                  style={{ background: '#FFFFFF', color: '#0B1A46', border: '1px solid #E87722', borderRadius: '30px' }}
                >
                  {v}
                </span>
              ))}
            </div>

            <a href="/cybersecurity-advisory" className="btn-primary">Explore Cybersecurity Advisory <ArrowRight size={16}/></a>
          </div>

          {/* Right column 45% — 2x2 stats */}
          <div>
            <div className="grid grid-cols-2 gap-5">
              {stats.map((s) => (
                <div key={s.l} className="cyber-stat-card p-5">
                  <div className="text-2xl md:text-3xl font-bold text-[#E87722]">{s.n}</div>
                  <div className="text-xs md:text-sm mt-1 uppercase tracking-wider" style={{ color: '#4B5563' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
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
    { name: 'Event WiFi', spec: 'High-density access points', icon: Wifi, img: '/Rental/rental-event-wifi.webp', href: '/rental/event-wifi' },
    { name: 'Testing Equipment', spec: 'Fluke DSX 5000, OTDR, Splicer', icon: Wrench, img: '/Rental/category-testing-equipment.webp', href: '/rental/testing-equipment' },
    { name: 'Printers', spec: 'Mono / Colour / MFP', icon: Printer, img: '/Rental/rental-printers.jpg', href: '/rental/printers' },
  ]
  return (
    <section id="rental" className="py-24 px-6" style={{ background: '#F4F6FA' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-4xl md:text-5xl font-bold heading-accent" style={{ color: '#0B1A46' }}>IT Equipment Rental, UAE & Canada</h2>
          <p className="mt-5 max-w-2xl mx-auto" style={{ color: '#58595B' }}>Short-term or long-term, UAE and Canada, delivered, configured and collected. No procurement headaches, no hidden costs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 gap-5">
          {items.map((it, i) => (
            <a
              key={it.name}
              href={it.href}
              className={`group relative rounded-2xl overflow-hidden reveal block rental-card flex flex-col md:col-span-2 lg:col-span-1${i === 3 ? ' md:col-start-2 lg:col-start-auto' : ''}${i === 4 ? ' md:col-start-4 lg:col-start-auto' : ''}`}
              style={{ transitionDelay: `${i * 80}ms`, background: '#FFFFFF', boxShadow: '0 8px 32px rgba(10,26,70,0.18)' }}
            >
              {/* Image */}
              <div className="relative" style={{ aspectRatio: '4/3' }}>
                <img
                  src={it.img}
                  alt={`${it.name} rental UAE, IP Care Technologies`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Orange icon badge — top left */}
                <div className="rental-card__badge p-2 rounded-xl">
                  <it.icon size={17} className="text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h4 className="font-bold text-base leading-tight mb-2" style={{ color: '#0B1A46' }}>{it.name}</h4>
                <p className="text-xs mb-4 leading-snug" style={{ color: '#58595B' }}>{it.spec}</p>
                <button
                  className="w-full text-xs font-semibold py-2 px-3 transition-all duration-300 group-hover:brightness-110 mt-auto"
                  style={{ background: '#E87722', color: '#fff', boxShadow: '0 2px 10px rgba(232,119,34,0.35)', borderRadius: '10px' }}
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
          <a href="/rental" className="btn-primary">Browse Full Rental Catalogue <ArrowRight size={16}/></a>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Events Portfolio ---------------- */
function EventsPortfolio() {
  const events = [
    { slug: 'fifa-club-world-cup', name: 'FIFA Club World Cup', loc: 'Abu Dhabi, UAE • 2022', region: 'Sports', img: '/events/fifa-club-world-cup.webp' },
    { slug: 'ufc-uae', name: 'UFC Events in UAE', loc: 'Yas Island, Abu Dhabi • 2020-2025', region: 'Sports', img: '/events/ufc-uae.webp' },
    { slug: 'nba-abu-dhabi-games', name: 'NBA Abu Dhabi Games', loc: 'Etihad Arena • 2022, 2023, 2024, 2025', region: 'Sports', img: '/events/nba-abu-dhabi-games.webp' },
    { slug: 'euroleague-final-four-2025', name: 'EuroLeague Final Four 2025', loc: 'Etihad Arena, Abu Dhabi • 23-25 May 2025', region: 'Sports', img: '/events/euroleague-final-four-2025.webp' },
    { slug: 'usa-basketball-2024', name: 'USA Basketball Showcase 2024', loc: 'Etihad Arena, Abu Dhabi • 2024', region: 'Sports', img: '/events/usa-basketball-2024.webp' },
    { slug: 'fina-world-swimming-championship', name: 'FINA World Swimming Championship', loc: 'Etihad Arena, Abu Dhabi • 2021', region: 'Sports', img: '/events/fina-world-swimming-championship.webp' },
    { slug: 'wba-light-heavyweight-championship', name: 'WBA Light Heavyweight Championship', loc: 'Etihad Arena, Abu Dhabi • 2022', region: 'Sports', img: '/events/wba-light-heavyweight-championship.webp' },
    { slug: 'world-tennis-league', name: 'World Tennis League', loc: 'Coca-Cola Arena, Dubai • 2022, 2023', region: 'Sports', img: '/events/world-tennis-league.webp' },
    { slug: 'mubadala-abu-dhabi-open', name: 'Mubadala Abu Dhabi Open', loc: 'Zayed Sports City • Annual', region: 'Sports', img: '/events/mubadala-abu-dhabi-open.webp' },
    { slug: 'abu-dhabi-padel-master', name: 'Abu Dhabi Padel Master', loc: 'Hudayriat Island • 2023', region: 'Sports', img: '/events/abu-dhabi-padel-master.webp' },
    { slug: 'coldplay-world-tour', name: 'Coldplay World Tour', loc: 'Zayed Sports City, Abu Dhabi • 2024', region: 'Concerts', img: '/events/coldplay-world-tour.webp' },
    { slug: 'saadiyat-nights', name: 'Saadiyat Nights', loc: 'Saadiyat Island, Abu Dhabi • 2024, 2025', region: 'Concerts', img: '/events/saadiyat-nights.webp' },
    { slug: 'iifa-awards', name: 'IIFA Awards', loc: 'Yas Island, Abu Dhabi • 2022, 2023, 2024', region: 'Concerts', img: '/events/iifa-awards.webp' },
    { slug: 'ya-salam-after-race-concert', name: 'Ya Salam After Race Concert', loc: 'Yas Island, Abu Dhabi • 2019-2024', region: 'Concerts', img: '/events/ya-salam-after-race-concert.webp' },
    { slug: 'uae-national-day-48th', name: 'UAE National Day: 48th Edition', loc: 'Zayed Sports City, UAE • Dec 2019', region: 'National', img: '/events/uae-national-day-48th.webp' },
    { slug: 'uae-national-day-49th', name: 'UAE National Day: 49th Edition', loc: 'Al Jubail Mangrove Park, Abu Dhabi • Dec 2020', region: 'National', img: '/events/uae-national-day-49th.webp' },
  ]
  const [filter, setFilter] = useState('All Events')
  const tabs = ['All Events', 'Sports', 'Concerts', 'National']
  const filtered = filter === 'All Events' ? events : events.filter(e => e.region === filter)
  const categoryFor = (region) => {
    const r = (region || '').toLowerCase()
    if (r.includes('concert')) return 'concerts'
    if (r === 'national') return 'national'
    return 'sports'
  }
  return (
    <section id="events" className="py-24 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10 reveal">
          <h2 className="text-white text-4xl md:text-5xl font-bold heading-accent">Major Events Powered</h2>
          <p className="body-text mt-5 max-w-2xl mx-auto">From world finals to global tours. We deliver the IT backbone that keeps the show on.</p>
        </div>
        <div className="flex justify-center gap-2.5 mb-10 flex-wrap reveal">
          {tabs.map((t) => (
            <button key={t} onClick={() => setFilter(t)} className={`glass-pill ${filter === t ? 'active' : ''}`}>{t}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-4">
          {filtered.map((ev, i) => (
            <a key={ev.slug} href={`/event-it/${ev.slug}`} data-category={categoryFor(ev.region)} className="group relative rounded-xl overflow-hidden aspect-[3/4] block" style={{ transition: 'opacity 0.3s ease' }}>
              <img src={ev.img} alt={`${ev.name}, event IT infrastructure by IP Care`} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(7,16,42,0.0) 0%, rgba(7,16,42,0.15) 45%, rgba(7,16,42,0.75) 100%)' }}/>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-block px-2.5 py-1 rounded text-[13px] uppercase tracking-wider font-semibold mb-2" style={{ background: '#E87722', color: '#fff' }}>{ev.region}</span>
                <h3 className="text-white text-lg font-semibold leading-snug">{ev.name}</h3>
                <p className="text-white/70 text-xs mt-1">{ev.loc}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="text-center mt-10 reveal">
          <a href="/event-it/portfolio" className="btn-primary">View Full Portfolio <ArrowRight size={16}/></a>
        </div>
      </div>
    </section>
  )
}

/* ---------------- About (LIGHT SECTION) ---------------- */
function About() {
  return (
    <section id="about" className="py-24 px-6" style={{ background: '#FFFFFF' }}>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-10 md:gap-[60px] items-center">
        <div className="reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ background: 'rgba(232,119,34,0.1)', color: '#E87722' }}>
            <Building2 size={14}/> ABOUT IP CARE TECHNOLOGIES
          </div>
          <h2 className="text-[32px] md:text-[44px] font-bold leading-tight" style={{ color: '#0B1A46' }}>
            Two Decades of Enterprise IT Excellence
          </h2>
          <p className="mt-5 text-base md:text-lg" style={{ color: '#333F50' }}>
            Founded in 2003, IP Care Technologies delivers managed IT, cybersecurity, event infrastructure and equipment rental across the UAE and Canada. From government institutions to global event organisers. We design, deploy and operate mission-critical technology that can&apos;t go down.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-5">
            {[
              { icon: Award, t: 'Since 2003', d: '20+ years of enterprise delivery' },
              { icon: MapPin, t: 'UAE & Canada', d: 'Two-region operations' },
            ].map((f) => (
              <div key={f.t} className="flex gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(232,119,34,0.12)' }}>
                  <f.icon size={18} className="text-[#E87722]"/>
                </div>
                <div>
                  <div className="font-semibold" style={{ color: '#0B1A46' }}>{f.t}</div>
                  <div className="text-sm" style={{ color: '#333F50' }}>{f.d}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 mt-6">
            <a href="/contact" className="btn-primary">Talk to Our Team <ArrowRight size={16}/></a>
            <Link href="/about" className="btn-ghost-light">Our Story <ArrowRight size={16}/></Link>
          </div>
        </div>
        <div className="reveal">
          <div
            className="relative overflow-hidden"
            style={{ borderRadius: '16px', boxShadow: '0 20px 60px rgba(10, 26, 70, 0.15)', aspectRatio: '4 / 5' }}
          >
            <img
              src="/images/about/about-feature.webp"
              alt="Enterprise IT infrastructure, IP Care Technologies"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute bottom-4 left-4 flex items-stretch"
              style={{ background: '#0B1A46', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(10, 26, 70, 0.35)' }}
            >
              <div style={{ width: '4px', background: '#E87722' }} aria-hidden="true" />
              <div className="px-5 py-3">
                <div className="text-3xl font-bold text-white leading-none">20+</div>
                <div className="text-[11px] uppercase tracking-wider text-white/85 mt-1">Years Protecting Business</div>
              </div>
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
    {
      q: "IP Care delivered steady, dependable event IT for a global broadcast across 10 straight days of live coverage. When you're live in front of millions, that's the only result that matters.",
      who: 'Director of Operations',
      meta: 'Global Broadcasting Client • Abu Dhabi, UAE',
    },
    {
      q: 'Their cybersecurity advisory transformed our Zero Trust roadmap. Deployment was ahead of schedule and under budget, not something we expected from a first engagement.',
      who: 'CISO',
      meta: 'Enterprise Technology Firm • Toronto, Canada',
    },
    {
      q: "24/7 managed IT that actually responds in minutes. The best SLA partner we've had in ten years.",
      who: 'VP Technology',
      meta: 'Managed IT Services Client • Dubai, UAE',
    },
  ]

  const trackRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const goTo = useCallback((idx) => {
    const total = quotes.length
    const next = ((idx % total) + total) % total
    const track = trackRef.current
    if (track) {
      const card = track.children[next]
      if (card) track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' })
    }
    setCurrent(next)
  }, [quotes.length])

  useEffect(() => {
    if (isHovered) return
    const t = setInterval(() => goTo(current + 1), 6000)
    return () => clearInterval(t)
  }, [isHovered, current, goTo])

  return (
    <section className="py-24 px-6" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-white text-4xl md:text-5xl font-bold heading-accent">What Clients Say</h2>
        </div>

        <div
          className="relative reveal"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-2"
          >
            {quotes.map((t, i) => (
              <div
                key={i}
                className="testimonial-card snap-start flex-shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
              >
                <div className="testimonial-card__quote-mark">&ldquo;</div>
                <p className="testimonial-card__quote">{t.q}</p>
                <div className="testimonial-card__divider" />
                <div className="testimonial-card__name">{t.who}</div>
                <div className="testimonial-card__meta">{t.meta}</div>
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => goTo(current - 1)}
            className="testimonial-nav testimonial-nav--prev"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => goTo(current + 1)}
            className="testimonial-nav testimonial-nav--next"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {quotes.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => goTo(i)}
              className={`testimonial-dot${current === i ? ' testimonial-dot--active' : ''}`}
            />
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
    <section id="blog" className="py-24 px-6" style={{ background: '#F4F6FA' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-4xl md:text-5xl font-bold heading-accent" style={{ color: '#0B1A46' }}>From the Knowledge Base</h2>
          <p className="mt-5" style={{ color: '#58595B' }}>Insights from our engineers and advisors.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {posts.map((p, i) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="article-card reveal group" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="article-card__media">
                <img src={`${p.img}?w=800&q=80`} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded text-[13px] uppercase tracking-wider font-semibold" style={{ background: '#E87722', color: '#fff' }}>{p.category}</span>
                <div className="article-card__media-fade" />
              </div>
              <div className="article-card__body">
                <h3 className="article-card__title">{p.title}</h3>
                <div className="article-card__date">{p.date}</div>
                <span className="article-card__cta">Read More <ArrowRight size={14}/></span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10 reveal">
          <Link href="/blog" className="btn-primary">Visit Our Knowledge Base <ArrowRight size={16}/></Link>
        </div>
      </div>
    </section>
  )
}

/* ---------------- FAQ ---------------- */
const FAQS = [
  {
    q: 'What does IP Care Technologies do?',
    a: "IP Care Technologies is an enterprise IT company founded in 2003, providing managed IT services, cybersecurity, ELV & physical security, cloud services (AWS, Azure), event IT infrastructure, and IT equipment rental across the UAE and Canada.",
  },
  {
    q: 'Where does IP Care Technologies operate?',
    a: 'IP Care Technologies operates from offices in Abu Dhabi, UAE and Toronto, Canada, serving enterprise and government clients across Abu Dhabi, Dubai, Sharjah, Al Ain, and the wider UAE, as well as Canada.',
  },
  {
    q: 'Does IP Care Technologies provide event IT infrastructure?',
    a: 'Yes. IP Care has delivered high-density WiFi, temporary networks, and on-site IT infrastructure for major events including the FIFA Club World Cup, UFC, NBA Abu Dhabi Games, EuroLeague Final Four, and Coldplay world tour stops.',
  },
  {
    q: 'Can I rent IT equipment from IP Care Technologies?',
    a: 'Yes. IP Care offers short and long-term rental of laptops, tablets, networking gear, event WiFi equipment, CCTV, printers, servers, and testing equipment, delivered, configured, and collected in the UAE and Canada.',
  },
  {
    q: 'Is IP Care Technologies experienced in cybersecurity compliance?',
    a: 'Yes. IP Care has 15+ years of dedicated cybersecurity practice, delivering SOC monitoring, Zero Trust architecture, and compliance advisory aligned to NESA, PCI DSS, and ISO 27001.',
  },
]

function FAQ() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  return (
    <section className="py-24 px-6" style={{ background: '#FFFFFF' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-4xl md:text-5xl font-bold heading-accent" style={{ color: '#0B1A46' }}>Frequently Asked Questions</h2>
        </div>
        <div className="space-y-5 reveal">
          {FAQS.map((f) => (
            <div key={f.q} className="p-6 rounded-2xl" style={{ background: '#F4F6FA', border: '1px solid #E1E8F0' }}>
              <h3 className="font-semibold text-lg mb-2" style={{ color: '#0B1A46' }}>{f.q}</h3>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: '#374151' }}>{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Global Offices CTA ---------------- */
function OfficesCTA() {
  return (
    <section id="contact" className="py-16 px-6" style={{ borderTop: '3px solid #E87722' }}>
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[35fr_35fr_30fr] gap-10 items-center reveal">
          <div>
            <div className="flex items-center gap-2 text-[#E87722] font-semibold text-sm mb-3"><UAEFlag/> UNITED ARAB EMIRATES</div>
            <h3 className="text-white text-xl font-bold mb-2">Abu Dhabi</h3>
            <div className="space-y-1.5 text-white/85 text-sm">
              <div className="flex items-center gap-2"><Phone size={14} className="text-[#E87722] flex-shrink-0"/><span>+971 2 676 6935</span></div>
              <div className="flex items-center gap-2"><Mail size={14} className="text-[#E87722] flex-shrink-0"/><span>info@ipcare.ae</span></div>
              <div className="flex items-center gap-2"><Globe size={14} className="text-[#E87722] flex-shrink-0"/><a href="https://www.ipcare.ae" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">www.ipcare.ae</a></div>
              <div className="flex items-start gap-2"><MapPin size={14} className="text-[#E87722] mt-0.5 flex-shrink-0"/><span>Salam Street, P.O. Box 53209, Abu Dhabi, UAE</span></div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-[#E87722] font-semibold text-sm mb-3"><CanadaFlag/> CANADA</div>
            <h3 className="text-white text-xl font-bold mb-2">Toronto</h3>
            <div className="space-y-1.5 text-white/85 text-sm">
              <div className="flex items-center gap-2"><Phone size={14} className="text-[#E87722] flex-shrink-0"/><span>+1 416 786 0782</span></div>
              <div className="flex items-center gap-2"><Mail size={14} className="text-[#E87722] flex-shrink-0"/><span>info@ipcare.ca</span></div>
              <div className="flex items-center gap-2"><Globe size={14} className="text-[#E87722] flex-shrink-0"/><a href="https://www.ipcare.ca" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">www.ipcare.ca</a></div>
              <div className="flex items-start gap-2"><MapPin size={14} className="text-[#E87722] mt-0.5 flex-shrink-0"/><span>1 Concorde Gate, North York, ON, Canada</span></div>
            </div>
          </div>
          <div className="text-center md:text-right md:border-l md:border-white/15 md:pl-10">
            <h3 className="text-white text-2xl font-bold mb-2">Let&apos;s Build Something<br/>Enterprise-Grade.</h3>
            <a href="mailto:info@ipcare.ae" className="btn-primary mt-4">Get in Touch <ArrowRight size={16}/></a>
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
      <Stats />
      <CertificationsBand />
      <Services />
      <CyberAdvisory />
      <RentalTeaser />
      <EventsPortfolio />
      <About />
      <Testimonials />
      <BlogTeaser />
      <FAQ />
      <OfficesCTA />
      <Footer />
    </main>
  )
}

export default App
