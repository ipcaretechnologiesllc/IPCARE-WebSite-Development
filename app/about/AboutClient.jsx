'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Phone, Mail, Globe, MapPin, Clock, Star, Handshake, ShieldCheck, Lightbulb, Users, Globe2 } from 'lucide-react'
import CTAPhoneButtons from '@/components/site/CTAPhoneButtons'

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
    <section className="hero" style={{
      background: 'linear-gradient(135deg, #0B1A46 0%, #0F245F 50%, #1E3A8A 100%)',
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
  { year: '2026 →', title: 'Cloud & AI-Ready Infrastructure Portfolio', desc: 'Expanding our cloud and AI-ready infrastructure offering for enterprise clients across UAE and Canada.' },
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
   6a. TWO REGIONS MAP — inline SVG infographic
═══════════════════════════════════════════════ */
function TwoRegionsMap() {
  const ca = { x: 200, y: 82 }   // Toronto  (lon -79.4 → x≈201, lat 43.7 → y≈72 + label offset)
  const ae = { x: 470, y: 102 }  // Abu Dhabi (lon  54.4 → x≈469, lat 24.5 → y≈102)
  const arcPath = `M ${ca.x},${ca.y} Q 335,18 ${ae.x},${ae.y}`

  return (
    <div className="reveal" style={{ marginBottom: '40px' }}>
      <svg
        viewBox="0 0 720 280"
        style={{ width: '100%', maxWidth: '720px', display: 'block', margin: '0 auto', borderRadius: '16px' }}
        role="img"
        aria-label="World map showing IP Care Technologies offices: Abu Dhabi, UAE (headquarters) and Toronto, Canada (North American operations)"
      >
        {/* Background */}
        <rect width="720" height="280" rx="16" fill="#0B1A46" />

        {/* Lat / lon grid lines */}
        {[62, 124, 187, 249].map(y => (
          <line key={`h${y}`} x1="0" y1={y} x2="720" y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        ))}
        {[120, 240, 360, 480, 600].map(x => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="280" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        ))}

        {/* Simplified continent shapes (stylised equirectangular, not geographically precise) */}
        {/* North America */}
        <path d="M 52,58 L 98,50 L 146,62 L 163,80 L 167,100 L 156,112 L 170,120 L 208,122 L 224,110 L 232,98 L 244,86 L 252,74 L 246,62 L 224,56 L 194,50 L 158,50 L 116,52 L 76,54 Z"
          fill="rgba(42,72,140,0.60)" />
        {/* Greenland */}
        <path d="M 248,40 L 272,34 L 298,38 L 298,54 L 282,62 L 260,58 Z"
          fill="rgba(42,72,140,0.45)" />
        {/* South America */}
        <path d="M 192,136 L 222,131 L 240,146 L 238,168 L 226,196 L 210,210 L 196,200 L 186,178 L 184,156 L 188,140 Z"
          fill="rgba(42,72,140,0.60)" />
        {/* Europe */}
        <path d="M 334,52 L 380,48 L 408,56 L 410,68 L 423,70 L 420,82 L 400,88 L 376,88 L 356,80 L 344,70 L 335,60 Z"
          fill="rgba(42,72,140,0.60)" />
        {/* Africa */}
        <path d="M 353,94 L 418,92 L 440,106 L 446,130 L 434,162 L 413,178 L 390,174 L 367,158 L 356,138 L 351,116 L 354,98 Z"
          fill="rgba(42,72,140,0.60)" />
        {/* Arabian Peninsula */}
        <path d="M 452,100 L 486,97 L 513,103 L 524,118 L 520,130 L 502,134 L 481,128 L 463,117 L 453,107 Z"
          fill="rgba(50,90,156,0.72)" />
        {/* Asia */}
        <path d="M 512,52 L 578,48 L 648,56 L 664,72 L 650,90 L 614,98 L 578,95 L 550,86 L 530,72 L 516,60 Z"
          fill="rgba(42,72,140,0.60)" />
        {/* Australia */}
        <path d="M 574,168 L 622,163 L 648,172 L 650,194 L 635,210 L 608,212 L 584,202 L 572,186 Z"
          fill="rgba(42,72,140,0.45)" />

        {/* Dashed great-circle arc Toronto → Abu Dhabi */}
        <path d={arcPath} fill="none" stroke="#E87722" strokeWidth="1.8"
          strokeDasharray="7,5" strokeLinecap="round" opacity="0.88" />

        {/* Toronto pin */}
        <circle cx={ca.x} cy={ca.y} r="22" fill="rgba(232,119,34,0.12)" />
        <circle cx={ca.x} cy={ca.y} r="13" fill="rgba(232,119,34,0.25)" />
        <circle cx={ca.x} cy={ca.y} r="7"  fill="#E87722" />
        <circle cx={ca.x} cy={ca.y} r="3"  fill="#FFFFFF" />

        {/* Abu Dhabi pin */}
        <circle cx={ae.x} cy={ae.y} r="22" fill="rgba(232,119,34,0.12)" />
        <circle cx={ae.x} cy={ae.y} r="13" fill="rgba(232,119,34,0.25)" />
        <circle cx={ae.x} cy={ae.y} r="7"  fill="#E87722" />
        <circle cx={ae.x} cy={ae.y} r="3"  fill="#FFFFFF" />

        {/* City labels */}
        <text x={ca.x} y={ca.y + 30} textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">Toronto</text>
        <text x={ca.x} y={ca.y + 43} textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Canada</text>
        <text x={ae.x} y={ae.y + 30} textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">Abu Dhabi</text>
        <text x={ae.x} y={ae.y + 43} textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">UAE</text>

        {/* Footer tagline */}
        <text x="360" y="268" textAnchor="middle" fill="rgba(255,255,255,0.38)"
          fontSize="9.5" letterSpacing="2.5" fontWeight="600">
          SAME TEAM · SAME STANDARDS · TWO REGIONS
        </text>
      </svg>
    </div>
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
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 className="section-title" style={{ color: '#0B1A46', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '16px' }}>
            Two Regions. One Standard.
          </h2>
          <p style={{ color: '#4B5563', fontSize: '17px', lineHeight: 1.75, maxWidth: '640px', margin: '0 auto' }}>
            Headquarters in Abu Dhabi. Operations in Toronto. Same response times, same technical standards,
            same team — wherever you are.
          </p>
        </div>

        <TwoRegionsMap />

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
              <div style={rowItem}><MapPin size={15} style={iconStyle} /><span>Salam Street, P.O. Box 53209, Abu Dhabi, UAE</span></div>
              <div style={rowItem}><Phone size={15} style={iconStyle} /><span>+971 2 676 6935</span></div>
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
      role: 'Enterprise Security Consultant',
      subRole: 'The Cyber Adviser',
      certs: 'PCNSE · CISSP · AWS Security · Azure Security · GIAC GCFA',
      bio: 'Enterprise cybersecurity architect with 15+ years advising Fortune 500 and government clients on Zero Trust, SASE, and cloud security transformation across Canada, UAE, and globally.',
      stats: [
        { n: '15+',   l: 'Years' },
        { n: '100K+', l: 'Users Protected' },
        { n: '50+',   l: 'Engagements' },
      ],
    },
    {
      initials: 'TA',
      name: 'Tanveer Ahmed',
      role: 'Independent Network Security Consultant',
      subRole: 'Prisma Access & SASE Specialist — Milton, Ontario, Canada',
      certs: 'PCNSE · PCCSA · CNSS · AlgoSec',
      bio: 'Prisma Access and SASE specialist with 25+ years of network security experience. CCIE-certified practitioner focused on ZTNA, CASB, SWG, and DLP deployments across North America and UAE.',
      specializations: ['SASE', 'ZTNA', 'CASB', 'DLP', 'SWG', 'Prisma Access'],
      stats: [
        { n: '25+',    l: 'Years' },
        { n: 'CCIE',   l: 'Certified' },
        { n: 'Prisma', l: 'Access SME' },
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
              <div style={{ color: '#E87722', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: m.subRole ? '3px' : '6px' }}>
                {m.role}
              </div>
              {m.subRole && (
                <div style={{ color: '#4A5878', fontSize: '12px', marginBottom: '8px' }}>
                  {m.subRole}
                </div>
              )}
              <div style={{ color: '#1E3A8A', fontSize: '13px', fontWeight: 600, marginBottom: '14px' }}>
                {m.certs}
              </div>
              {m.specializations && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center', marginBottom: '14px' }}>
                  {m.specializations.map((s) => (
                    <span key={s} style={{
                      fontSize: '11px', padding: '3px 8px', borderRadius: '6px', fontWeight: 600,
                      background: 'rgba(232,119,34,0.1)', color: '#E87722',
                      border: '1px solid rgba(232,119,34,0.25)',
                    }}>{s}</span>
                  ))}
                </div>
              )}
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

        <CTAPhoneButtons />
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
