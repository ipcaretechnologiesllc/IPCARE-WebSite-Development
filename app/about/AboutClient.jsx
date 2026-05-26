'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Phone, Mail, Globe, MapPin, Clock, Star, Handshake, ShieldCheck, Lightbulb, Users, Globe2 } from 'lucide-react'

/* ── IntersectionObserver reveal ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ── Reusable eyebrow label ── */
function Eyebrow({ children }) {
  return (
    <p className="section-eyebrow" style={{
      fontSize: '13px',
      fontWeight: 700,
      color: '#E87722',
      letterSpacing: '4px',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: '16px',
    }}>
      {children}
    </p>
  )
}

/* ════════════════════════════════════════════════
   1. HERO BANNER
═══════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="about-hero" style={{
      background: '#0B1A46',
      borderBottom: '3px solid #E87722',
      position: 'relative',
      overflow: 'hidden',
      padding: '140px 24px 100px',
      minHeight: '560px',
      display: 'flex',
      alignItems: 'center',
    }}>
      {/* Grid texture */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage:
          'linear-gradient(rgba(232,119,34,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(232,119,34,0.06) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 85%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 85%)',
      }} />
      {/* Radial orange glow — left side */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-80px', left: '-120px',
        width: '560px', height: '560px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,119,34,0.18) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div
        className="reveal hero-inner"
        style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        <Eyebrow>Our Story</Eyebrow>
        <h1 style={{
          fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
          fontWeight: 800,
          color: '#FFFFFF',
          lineHeight: 1.1,
          marginBottom: '22px',
        }}>
          About IP Care Technologies
        </h1>
        <p className="hero-sub" style={{
          fontSize: '1.2rem',
          color: 'rgba(255,255,255,0.75)',
          lineHeight: 1.75,
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          Two decades of enterprise IT across UAE and Canada — 500+ projects, 200+ clients, one unwavering standard.
        </p>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════
   2. STORY / INTRO
═══════════════════════════════════════════════ */
function Story() {
  return (
    <section style={{ background: '#FFFFFF', padding: '96px 24px' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '64px',
        alignItems: 'center',
      }}>
        {/* Text — left column */}
        <div className="reveal">
          <Eyebrow>Powering Business Since 2003</Eyebrow>
          <h2 className="section-title" style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: 800,
            color: '#0B1A46',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            marginBottom: '28px',
          }}>
            We started with a simple promise.
          </h2>
          <div style={{ color: '#4B5563', fontSize: '17px', lineHeight: 1.8 }}>
            <p style={{ marginBottom: '20px' }}>
              We founded IP Care in Abu Dhabi in 2003 with one goal: deliver enterprise IT the right way.
              No shortcuts, no over-promising, and no disappearing after the invoice.
            </p>
            <p style={{ marginBottom: '20px' }}>
              Twenty years in, we carry deep expertise across managed IT, cybersecurity, smart infrastructure,
              ELV systems, and IT equipment rental. Our UAE headquarters and Canadian operations run 24/7 —
              because our clients don&apos;t switch off at 5pm.
            </p>
            <p>
              We&apos;re certified partners of Microsoft, Palo Alto Networks, Cisco, Fortinet, and AWS.
              Behind every engagement is a team of engineers, architects, and advisors who take pride in
              craft, not just contracts.
            </p>
          </div>
        </div>

        {/* Image — right column */}
        <div className="reveal" style={{ transitionDelay: '100ms', position: 'relative', paddingBottom: '24px' }}>
          {/* overflow: hidden clips the image to border-radius; badge lives outside */}
          <div style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(10,26,70,0.18)',
            aspectRatio: '4/5',
          }}>
            <img
              src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=900&q=85"
              alt="IP Care Technologies Abu Dhabi headquarters"
              loading="lazy"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {/* Est. 2003 badge — outside overflow:hidden so it's fully visible */}
          <div style={{
            position: 'absolute',
            bottom: '-16px',
            left: '-16px',
            background: '#E87722',
            color: '#FFFFFF',
            padding: '14px 20px',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(232,119,34,0.4)',
            fontWeight: 700,
            fontSize: '14px',
            whiteSpace: 'nowrap',
            zIndex: 2,
          }}>
            Est. 2003 · Abu Dhabi, UAE
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════
   3. STATS BAND
═══════════════════════════════════════════════ */
function StatsBand() {
  const stats = [
    { n: '20+', l: 'Years' },
    { n: '500+', l: 'Projects' },
    { n: '200+', l: 'Enterprise Clients' },
    { n: '99.9%', l: 'Uptime' },
    { n: '24/7', l: 'Support' },
  ]
  return (
    <section style={{ background: '#0B1A46', borderTop: '3px solid #E87722', padding: '72px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '32px',
        }}>
          {stats.map((s, i) => (
            <div
              key={s.l}
              className="reveal"
              style={{ textAlign: 'center', transitionDelay: `${i * 80}ms` }}
            >
              <div style={{
                color: '#E87722',
                fontWeight: 800,
                fontSize: 'clamp(34px, 4vw, 50px)',
                lineHeight: 1,
              }}>
                {s.n}
              </div>
              <div style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1.8px',
                marginTop: '10px',
              }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════
   4. TIMELINE
═══════════════════════════════════════════════ */
const MILESTONES = [
  { year: '2003', title: 'Founded in Abu Dhabi', desc: 'IP Care Technologies LLC established with a commitment to honest, enterprise-grade IT delivery.' },
  { year: '2007', title: 'First Major Government IT Contract', desc: 'Secured a landmark government IT infrastructure contract — cementing our public sector credentials.' },
  { year: '2010', title: 'Cybersecurity Practice Launched', desc: 'Built a dedicated security team as cyber threats became mission-critical for enterprise clients.' },
  { year: '2014', title: 'ELV & Smart Systems Division Added', desc: 'Expanded into CCTV, access control, and structured cabling for intelligent facilities.' },
  { year: '2017', title: 'Events Technology Services Launched', desc: 'Began delivering temporary IT infrastructure for major international events across the UAE.' },
  { year: '2020', title: 'Canada (Toronto) Operations Opened', desc: 'Established North American operations in Toronto, Ontario — same standards, new timezone.' },
  { year: '2023', title: '20-Year Milestone', desc: '500+ projects and 200+ enterprise clients. Two decades of delivery without compromise.' },
  { year: '2026', title: 'Cloud & AI-Ready Infrastructure Portfolio', desc: 'Launched a next-generation cloud and AI infrastructure portfolio for enterprise transformation.' },
]

function Timeline() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section style={{ background: '#F3F4F6', padding: '96px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '64px' }}>
          <Eyebrow>Our Journey</Eyebrow>
          <h2 className="section-title" style={{ color: '#0B1A46', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            From 2003 to Today
          </h2>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Vertical center line — desktop only, bisects the 48px center column */}
          {!isMobile && (
            <div aria-hidden="true" style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '3px',
              opacity: 1,
              background: 'linear-gradient(to bottom, #E87722, rgba(232,119,34,0.15))',
              transform: 'translateX(-50%)',
              borderRadius: '3px',
            }} />
          )}

          {MILESTONES.map((m, i) => {
            const isLeft = i % 2 === 0

            /* Card markup — identical for both sides */
            const card = (
              <div
                style={{
                  background: '#FFFFFF',
                  borderTop: '3px solid #E87722',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(10,26,70,0.10)',
                  padding: '24px 28px',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(10,26,70,0.16)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(10,26,70,0.10)'
                }}
              >
                <div style={{ color: '#E87722', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '6px' }}>
                  {m.year}
                </div>
                <h3 style={{ color: '#0B1A46', fontWeight: 700, fontSize: '1rem', marginBottom: '6px', lineHeight: 1.3 }}>
                  {m.title}
                </h3>
                <p style={{ color: '#8B9BB4', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  {m.desc}
                </p>
              </div>
            )

            return (
              <div
                key={m.year}
                className="reveal"
                style={{
                  position: 'relative',
                  display: isMobile ? 'block' : 'grid',
                  gridTemplateColumns: isMobile ? undefined : '1fr 48px 1fr',
                  alignItems: 'start',
                  marginBottom: '48px',
                  transitionDelay: `${i * 70}ms`,
                }}
              >
                {isMobile ? card : (
                  <>
                    {/* Left column */}
                    <div>{isLeft ? card : null}</div>
                    {/* Center column — dot */}
                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '22px', position: 'relative', zIndex: 2 }}>
                      <div aria-hidden="true" style={{
                        width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
                        background: '#E87722', border: '3px solid #F3F4F6',
                        boxShadow: '0 0 0 4px rgba(232,119,34,0.25)',
                      }} />
                    </div>
                    {/* Right column */}
                    <div>{!isLeft ? card : null}</div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════
   5. MISSION & VISION
═══════════════════════════════════════════════ */
function MissionVision() {
  const cards = [
    {
      label: 'Mission',
      title: 'We make IT invisible when it works — and fast to fix when it doesn\'t.',
      body: 'We design, deploy, and operate mission-critical IT so our clients can focus on running their business. Technology should be invisible when it works, and fast to fix when it doesn\'t.',
    },
    {
      label: 'Vision',
      title: 'The most trusted enterprise IT partner across UAE and Canada.',
      body: 'To be the most trusted enterprise IT partner across UAE and Canada. Known for technical excellence, honest counsel, and delivery that doesn\'t waver.',
    },
  ]
  return (
    <section style={{ background: '#1E3A8A', padding: '96px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <Eyebrow>What Drives Us</Eyebrow>
          <h2 className="section-title section-title-white" style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Mission &amp; Vision
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {cards.map((card, i) => (
            <div
              key={card.label}
              className="reveal mv-card"
              style={{
                transitionDelay: `${i * 100}ms`,
                background: 'rgba(255,255,255,0.09)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.16)',
                borderTop: '3px solid #E87722',
                borderRadius: '16px',
                padding: '44px 40px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 20px 44px rgba(0,0,0,0.28)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                color: '#E87722',
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                {card.label}
              </div>
              <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.4rem', lineHeight: 1.3, marginBottom: '14px' }}>
                {card.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '1rem', lineHeight: 1.85 }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════
   6. TWO REGIONS
═══════════════════════════════════════════════ */
function TwoRegions() {
  const cardBase = {
    background: '#FFFFFF',
    borderTop: '3px solid #E87722',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(10,26,70,0.18)',
    padding: '40px',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  }
  const rowItem = { display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px', color: '#4A5878', fontSize: '0.92rem' }
  const iconStyle = { color: '#E87722', flexShrink: 0, marginTop: '2px' }

  return (
    <section style={{ background: '#FFFFFF', padding: '96px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <Eyebrow>Where We Operate</Eyebrow>
          <h2 className="section-title" style={{ color: '#0B1A46', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '16px' }}>
            Two Regions. One Standard.
          </h2>
          <p style={{ color: '#4B5563', fontSize: '17px', lineHeight: 1.75, maxWidth: '640px', margin: '0 auto' }}>
            Headquarters in Abu Dhabi. Operations in Toronto. Same response times, same technical standards,
            same team — wherever you are.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* UAE */}
          <div
            className="reveal"
            style={cardBase}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(10,26,70,0.26)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(10,26,70,0.18)' }}
          >
            <div style={{ fontSize: '2.8rem', display: 'block', marginBottom: '18px' }}>🇦🇪</div>
            <div style={{ borderBottom: '1px solid #EEF0F5', paddingBottom: '20px', marginBottom: '20px' }}>
              <h3 style={{ color: '#0B1A46', fontWeight: 800, fontSize: '1.35rem', marginBottom: '6px' }}>Abu Dhabi</h3>
              <div style={{ color: '#E87722', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' }}>
                Headquarters
              </div>
            </div>
            <div>
              <div style={rowItem}><MapPin size={15} style={iconStyle} /><span>Hamdan Street, Abu Dhabi, P.O. Box 43830</span></div>
              <div style={rowItem}><Phone size={15} style={iconStyle} /><span>+971 2 6726300</span></div>
              <div style={rowItem}><Mail size={15} style={iconStyle} /><span>info@ipcare.ae</span></div>
              <div style={rowItem}>
                <Globe size={15} style={iconStyle} />
                <a href="https://www.ipcare.ae" target="_blank" rel="noopener noreferrer" style={{ color: '#1E3A8A', fontWeight: 600 }}>
                  www.ipcare.ae
                </a>
              </div>
              <div style={rowItem}><Clock size={15} style={iconStyle} /><span>Sun–Fri 9AM–6PM</span></div>
            </div>
          </div>

          {/* Canada */}
          <div
            className="reveal"
            style={{ ...cardBase, transitionDelay: '100ms' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(10,26,70,0.26)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(10,26,70,0.18)' }}
          >
            <div style={{ fontSize: '2.8rem', display: 'block', marginBottom: '18px' }}>🇨🇦</div>
            <div style={{ borderBottom: '1px solid #EEF0F5', paddingBottom: '20px', marginBottom: '20px' }}>
              <h3 style={{ color: '#0B1A46', fontWeight: 800, fontSize: '1.35rem', marginBottom: '6px' }}>Toronto, Canada</h3>
              <div style={{ color: '#E87722', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' }}>
                North America Operations
              </div>
            </div>
            <div>
              <div style={rowItem}><MapPin size={15} style={iconStyle} /><span>Consumers Road, North York, ON</span></div>
              <div style={rowItem}><Mail size={15} style={iconStyle} /><span>info@ipcare.ca</span></div>
              <div style={rowItem}>
                <Globe size={15} style={iconStyle} />
                <a href="https://www.ipcare.ca" target="_blank" rel="noopener noreferrer" style={{ color: '#1E3A8A', fontWeight: 600 }}>
                  www.ipcare.ca
                </a>
              </div>
              <div style={rowItem}><Clock size={15} style={iconStyle} /><span>Mon–Fri 9AM–6PM</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════
   7. THE TEAM
═══════════════════════════════════════════════ */
function Team() {
  const members = [
    {
      initials: 'AB',
      name: 'Attique Bhatti',
      role: 'Founder & CEO',
      certs: 'CISSP · PMP · CCIE',
      bio: '20+ years leading enterprise IT, cybersecurity, and infrastructure engagements across UAE, Qatar, and Saudi Arabia.',
      stats: [
        { n: '20+ Yrs', l: 'Experience' },
        { n: '1000+', l: 'Projects' },
        { n: '50+', l: 'Certifications' },
      ],
    },
    {
      initials: 'TA',
      name: 'Tanveer Ahmed',
      role: 'IT Specialist, UAE & Canada',
      certs: 'CCNP · AWS · Prisma',
      bio: 'Cloud migration, network architecture, and managed services across IP Care\'s UAE and Canadian operations.',
      stats: [
        { n: '10+ Yrs', l: 'Experience' },
        { n: 'CCOE', l: 'Cloud Centre' },
        { n: 'UAE/CA', l: 'Regions' },
      ],
    },
  ]

  const cardBase = {
    background: '#FFFFFF',
    borderTop: '3px solid #E87722',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(10,26,70,0.12)',
    padding: '36px',
    textAlign: 'center',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  }

  return (
    <section style={{ background: '#F3F4F6', padding: '96px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <Eyebrow>The People Behind the Work</Eyebrow>
          <h2 className="section-title" style={{ color: '#0B1A46', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            The Team
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {members.map((m, i) => (
            <div
              key={m.name}
              className="reveal"
              style={{ ...cardBase, transitionDelay: `${i * 100}ms` }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(10,26,70,0.18)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(10,26,70,0.12)' }}
            >
              {/* Avatar */}
              <div style={{
                width: '80px', height: '80px',
                borderRadius: '50%',
                background: '#0B1A46',
                border: '3px solid #E87722',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '24px', fontWeight: 800, color: '#FFFFFF',
              }}>
                {m.initials}
              </div>

              <h3 style={{ color: '#0B1A46', fontWeight: 700, fontSize: '20px', marginBottom: '4px' }}>
                {m.name}
              </h3>
              <div style={{ color: '#E87722', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '6px' }}>
                {m.role}
              </div>
              <div style={{ color: '#1E3A8A', fontSize: '13px', fontWeight: 600, marginBottom: '16px' }}>
                {m.certs}
              </div>
              <p style={{ color: '#4B5563', fontSize: '14px', lineHeight: 1.65, marginBottom: '24px' }}>
                {m.bio}
              </p>

              {/* Mini stats */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px',
                borderTop: '1px solid #E8EDF5', paddingTop: '20px',
              }}>
                {m.stats.map((s) => (
                  <div key={s.l}>
                    <div style={{ color: '#0B1A46', fontWeight: 700, fontSize: '15px' }}>{s.n}</div>
                    <div style={{ color: '#4B5563', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '3px' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════
   8. CERTIFICATIONS
═══════════════════════════════════════════════ */
const CERTS = [
  'Microsoft', 'AWS', 'Palo Alto Networks', 'Cisco', 'Fortinet',
  'CommScope', 'Check Point', 'Zscaler', 'Huawei', 'Acronis',
]

function Certifications() {
  return (
    <section style={{ background: '#0B1A46', padding: '96px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Eyebrow>Industry Recognised</Eyebrow>
          <h2 className="section-title section-title-white" style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '16px' }}>
            Certified Across the Industry
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', lineHeight: 1.75, maxWidth: '580px', margin: '0 auto' }}>
            Our credentials aren&apos;t decorations. They&apos;re the reason enterprise clients trust us with
            infrastructure that can&apos;t afford to fail.
          </p>
        </div>

        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
          {CERTS.map((c, i) => (
            <span
              key={c}
              style={{
                padding: '18px 32px',
                borderRadius: '999px',
                border: '2px solid rgba(255,255,255,0.25)',
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.9)',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'default',
                transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(232,119,34,0.12)'
                e.currentTarget.style.borderColor = '#E87722'
                e.currentTarget.style.color = '#FFFFFF'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.9)'
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════
   9. OUR VALUES
═══════════════════════════════════════════════ */
const VALUES = [
  { title: 'Excellence', desc: "We don't cut corners. Every deployment gets the same standard regardless of size.", Icon: Star },
  { title: 'Partnership', desc: 'We succeed when clients succeed. Our average client relationship runs 7+ years.', Icon: Handshake },
  { title: 'Integrity', desc: 'We tell you what you need to hear, not what you want to hear.', Icon: ShieldCheck },
  { title: 'Innovation', desc: 'Knowing which new tools actually move the needle — and which are noise.', Icon: Lightbulb },
  { title: 'People-First', desc: 'IT that frees your team to do their best work, not fight their tools.', Icon: Users },
  { title: 'Global Mindset', desc: 'UAE roots. Canadian reach. GCC expertise. Great IT ignores borders.', Icon: Globe2 },
]

function OurValues() {
  return (
    <section style={{ background: '#FFFFFF', padding: '96px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <Eyebrow>How We Work</Eyebrow>
          <h2 className="section-title" style={{ color: '#0B1A46', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Our Values
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className="reveal"
              style={{
                background: '#FFFFFF',
                borderTop: '3px solid #E87722',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(10,26,70,0.18)',
                padding: '36px',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                transitionDelay: `${i * 60}ms`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(10,26,70,0.26)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(10,26,70,0.18)' }}
            >
              <v.Icon size={32} style={{ color: '#E87722', marginBottom: '20px' }} strokeWidth={1.8} />
              <h3 style={{ color: '#0B1A46', fontWeight: 700, fontSize: '1.1rem', marginBottom: '10px' }}>
                {v.title}
              </h3>
              <p style={{ color: '#4A5878', fontSize: '0.9rem', lineHeight: 1.7 }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════
   10. CTA STRIP
═══════════════════════════════════════════════ */
function CTAStrip() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #0B1A46 0%, #1E3A8A 100%)',
      borderTop: '3px solid #E87722',
      padding: '96px 24px',
    }}>
      <div
        className="reveal"
        style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}
      >
        <h2 className="section-title section-title-white" style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '16px' }}>
          Ready to Work with Us?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '17px', lineHeight: 1.75, marginBottom: '36px' }}>
          Let&apos;s talk about your infrastructure, your challenges, and what a proper enterprise IT
          partnership looks like.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '36px' }}>
          <Link href="/contact" className="btn-primary">
            Contact Us <ArrowRight size={16} />
          </Link>
          <Link href="/services" className="btn-ghost">
            Our Services →
          </Link>
        </div>

        {/* Contact details */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '36px',
          justifyContent: 'center', fontSize: '0.95rem',
          color: 'rgba(255,255,255,0.8)', marginTop: '28px',
        }}>
          {[
            { href: 'tel:+971506828290', icon: Phone, label: '+971 50 6828290' },
            { href: 'mailto:info@ipcare.ae', icon: Mail, label: 'info@ipcare.ae' },
            { href: 'https://www.ipcare.ae', icon: Globe, label: 'www.ipcare.ae', external: true },
          ].map(({ href, icon: Icon, label, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              style={{ color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
            >
              <Icon size={14} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════
   ROOT EXPORT
═══════════════════════════════════════════════ */
export default function AboutClient() {
  useReveal()
  return (
    <main>
      <Hero />
      <Story />
      <StatsBand />
      <Timeline />
      <MissionVision />
      <TwoRegions />
      <Team />
      <Certifications />
      <OurValues />
      <CTAStrip />
    </main>
  )
}
