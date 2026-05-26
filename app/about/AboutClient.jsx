'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Phone, Mail, Globe, MapPin, Clock } from 'lucide-react'

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
function Eyebrow({ children, dark = false }) {
  return (
    <p style={{
      fontSize: '11px',
      fontWeight: 700,
      color: '#E87722',
      letterSpacing: '3px',
      textTransform: 'uppercase',
      marginBottom: '14px',
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
    <section style={{
      background: '#0B1A46',
      borderBottom: '3px solid #E87722',
      position: 'relative',
      overflow: 'hidden',
      padding: '110px 24px 88px',
    }}>
      {/* Subtle grid texture */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage:
          'linear-gradient(rgba(232,119,34,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(232,119,34,0.045) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 85%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 85%)',
      }} />
      <div
        className="reveal"
        style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        <Eyebrow>Our Story</Eyebrow>
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 62px)',
          fontWeight: 800,
          color: '#FFFFFF',
          lineHeight: 1.1,
          marginBottom: '22px',
        }}>
          About IP Care Technologies
        </h1>
        <p style={{
          fontSize: 'clamp(16px, 2vw, 20px)',
          color: 'rgba(255,255,255,0.78)',
          lineHeight: 1.75,
          maxWidth: '680px',
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
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: 700,
            color: '#0B1A46',
            lineHeight: 1.2,
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
        <div className="reveal" style={{ transitionDelay: '100ms' }}>
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
            {/* Est. 2003 badge */}
            <div style={{
              position: 'absolute', bottom: '20px', left: '20px',
              background: '#0B1A46', borderRadius: '10px', overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(10,26,70,0.4)',
              display: 'flex', alignItems: 'stretch',
            }}>
              <div style={{ width: '4px', background: '#E87722', flexShrink: 0 }} aria-hidden="true" />
              <div style={{ padding: '12px 20px' }}>
                <div style={{ color: '#E87722', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                  Est. 2003
                </div>
                <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12px', marginTop: '3px', letterSpacing: '0.5px' }}>
                  Abu Dhabi, UAE
                </div>
              </div>
            </div>
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
    <section style={{ background: '#0B1A46', borderTop: '3px solid #E87722', padding: '64px 24px' }}>
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
          <h2 style={{ color: '#0B1A46', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
            From 2003 to Today
          </h2>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Vertical center line — desktop only */}
          {!isMobile && (
            <div aria-hidden="true" style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '3px',
              background: 'linear-gradient(to bottom, #E87722, rgba(232,119,34,0.15))',
              transform: 'translateX(-50%)',
              borderRadius: '3px',
            }} />
          )}

          {MILESTONES.map((m, i) => {
            const isLeft = i % 2 === 0
            return (
              <div
                key={m.year}
                className="reveal"
                style={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: isMobile ? 'flex-start' : (isLeft ? 'flex-start' : 'flex-end'),
                  marginBottom: '36px',
                  transitionDelay: `${i * 70}ms`,
                }}
              >
                {/* Center dot */}
                {!isMobile && (
                  <div aria-hidden="true" style={{
                    position: 'absolute',
                    left: '50%',
                    top: '26px',
                    transform: 'translateX(-50%)',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: '#E87722',
                    border: '3px solid #F3F4F6',
                    boxShadow: '0 0 0 4px rgba(232,119,34,0.25)',
                    zIndex: 2,
                  }} />
                )}

                {/* Card */}
                <div
                  style={{
                    width: isMobile ? '100%' : 'calc(50% - 52px)',
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
                  <div style={{
                    color: '#E87722',
                    fontWeight: 700,
                    fontSize: '13px',
                    letterSpacing: '1.5px',
                    marginBottom: '6px',
                  }}>
                    {m.year}
                  </div>
                  <h3 style={{ color: '#0B1A46', fontWeight: 700, fontSize: '16px', marginBottom: '8px', lineHeight: 1.3 }}>
                    {m.title}
                  </h3>
                  <p style={{ color: '#4B5563', fontSize: '14px', lineHeight: 1.65 }}>
                    {m.desc}
                  </p>
                </div>
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
          <h2 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
            Mission &amp; Vision
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {cards.map((card, i) => (
            <div
              key={card.label}
              className="reveal"
              style={{
                transitionDelay: `${i * 100}ms`,
                background: 'rgba(255,255,255,0.09)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderTop: '3px solid #E87722',
                borderRadius: '16px',
                padding: '40px',
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
              <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '22px', lineHeight: 1.3, marginBottom: '16px' }}>
                {card.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '16px', lineHeight: 1.75 }}>
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
    padding: '36px',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  }
  const rowItem = { display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px', color: '#4B5563', fontSize: '15px' }
  const iconStyle = { color: '#E87722', flexShrink: 0, marginTop: '2px' }

  return (
    <section style={{ background: '#FFFFFF', padding: '96px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <Eyebrow>Where We Operate</Eyebrow>
          <h2 style={{ color: '#0B1A46', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: '16px' }}>
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
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🇦🇪</div>
            <h3 style={{ color: '#0B1A46', fontWeight: 700, fontSize: '20px', marginBottom: '4px' }}>Abu Dhabi</h3>
            <div style={{ color: '#E87722', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>
              Headquarters
            </div>
            <div>
              <div style={rowItem}><MapPin size={15} style={iconStyle} /><span>Hamdan Street, Abu Dhabi, P.O. Box 43830</span></div>
              <div style={rowItem}><Phone size={15} style={iconStyle} /><span>+971 2 6726300</span></div>
              <div style={rowItem}><Mail size={15} style={iconStyle} /><span>shakeel@ipcare.ae</span></div>
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
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🇨🇦</div>
            <h3 style={{ color: '#0B1A46', fontWeight: 700, fontSize: '20px', marginBottom: '4px' }}>Toronto, Canada</h3>
            <div style={{ color: '#E87722', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>
              North America Operations
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
          <h2 style={{ color: '#0B1A46', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
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
          <h2 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: '16px' }}>
            Certified Across the Industry
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', lineHeight: 1.75, maxWidth: '580px', margin: '0 auto' }}>
            Our credentials aren&apos;t decorations. They&apos;re the reason enterprise clients trust us with
            infrastructure that can&apos;t afford to fail.
          </p>
        </div>

        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          {CERTS.map((c, i) => (
            <span
              key={c}
              style={{
                padding: '12px 26px',
                borderRadius: '999px',
                border: '1.5px solid rgba(255,255,255,0.25)',
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.9)',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'default',
                transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#E87722'
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
  { title: 'Excellence', desc: "We don't cut corners. Every deployment gets the same standard regardless of size." },
  { title: 'Partnership', desc: 'We succeed when clients succeed. Our average client relationship runs 7+ years.' },
  { title: 'Integrity', desc: 'We tell you what you need to hear, not what you want to hear.' },
  { title: 'Innovation', desc: 'Knowing which new tools actually move the needle — and which are noise.' },
  { title: 'People-First', desc: 'IT that frees your team to do their best work, not fight their tools.' },
  { title: 'Global Mindset', desc: 'UAE roots. Canadian reach. GCC expertise. Great IT ignores borders.' },
]

function OurValues() {
  return (
    <section style={{ background: '#FFFFFF', padding: '96px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <Eyebrow>How We Work</Eyebrow>
          <h2 style={{ color: '#0B1A46', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
            Our Values
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className="reveal"
              style={{
                background: '#FFFFFF',
                borderTop: '3px solid #E87722',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(10,26,70,0.18)',
                padding: '28px',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                transitionDelay: `${i * 60}ms`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(10,26,70,0.26)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(10,26,70,0.18)' }}
            >
              <h3 style={{ color: '#0B1A46', fontWeight: 700, fontSize: '18px', marginBottom: '10px' }}>
                {v.title}
              </h3>
              <p style={{ color: '#4B5563', fontSize: '15px', lineHeight: 1.7 }}>
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
        <h2 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: '16px' }}>
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
          display: 'flex', flexWrap: 'wrap', gap: '20px',
          justifyContent: 'center', fontSize: '14px',
        }}>
          {[
            { href: 'tel:+971506828290', icon: Phone, label: '+971 50 6828290' },
            { href: 'mailto:shakeel@ipcare.ae', icon: Mail, label: 'shakeel@ipcare.ae' },
            { href: 'https://www.ipcare.ae', icon: Globe, label: 'www.ipcare.ae', external: true },
          ].map(({ href, icon: Icon, label, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              style={{ color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
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
