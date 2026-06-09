'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Activity, Building2, Landmark, Calendar, HardHat,
} from 'lucide-react'
import CTAPhoneButtons from '@/components/site/CTAPhoneButtons'

/* ── IntersectionObserver reveal (same pattern as About/Services) ── */
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

/* ── Eyebrow label ── */
function Eyebrow({ children }) {
  return (
    <p style={{
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
   CARD DATA
═══════════════════════════════════════════════ */

/* 3 flagship cards — copy kept verbatim from industries-data hero fields */
const FLAGSHIP = [
  {
    slug:      'healthcare',
    name:      'Healthcare IT',
    Icon:      Activity,
    iconLabel: 'Healthcare IT icon',
    body:      'Hospital and clinic IT that does not fail during a shift — aligned with UAE healthcare data regulations, connected to national health information exchanges, with 24/7 operational support that clinical teams can actually call.',
    /* 6-col grid placement */
    gridCol:   '1 / 3',
  },
  {
    slug:      'banking',
    name:      'Banking & Financial Services IT',
    Icon:      Building2,
    iconLabel: 'Banking and Financial Services IT icon',
    body:      'Banking IT that your banking regulator can sign off on — compliance-aligned operations, payment systems integration and a managed SOC that actually catches threats during business hours.',
    gridCol:   '3 / 5',
  },
  {
    slug:      'government',
    name:      'Government & Federal IT',
    Icon:      Landmark,
    iconLabel: 'Government and Federal IT icon',
    body:      'Federal-grade IT delivery for UAE government entities, sovereign and quasi-sovereign organisations — Azure UAE North landing zones, NESA / UAE IAS as standard practice, classification-aware operations and the operating-procedure familiarity that comes with two decades of federal work.',
    gridCol:   '5 / 7',
  },
]

/* 2 new cards — centred in row 2 of the same 6-column grid */
const NEW_CARDS = [
  {
    slug:      'event-management',
    name:      'Event Management IT',
    Icon:      Calendar,
    iconLabel: 'Event Management IT icon',
    body:      "The IT backbone for the UAE's biggest events — temporary high-density networks, on-site connectivity, and command-centre support that holds up under 50,000+ concurrent users. We have powered sports finals, concerts, and national-scale events where failure is not an option.",
    href:      '/event-it',
    linkLabel: 'Explore Event Management IT',
    /* Placed at columns 2–3, centred under card 1 and card 2 */
    gridCol:   '2 / 4',
  },
  {
    slug:      'construction',
    name:      'Construction & Field Services IT',
    Icon:      HardHat,
    iconLabel: 'Construction and Field Services IT icon',
    body:      'Site-ready IT for construction and field operations — rugged connectivity across remote sites, mobile workforce management, and infrastructure that survives dust, distance, and tight deadlines. Built for teams that work where the office network does not reach.',
    href:      '/contact',
    linkLabel: 'Explore Construction & Field Services IT',
    /* Placed at columns 4–5, centred under card 2 and card 3 */
    gridCol:   '4 / 6',
  },
]

/* ── Shared white card shell ── */
const cardBase = {
  background:    '#FFFFFF',
  borderTop:     '3px solid #E87722',
  borderRadius:  '16px',
  boxShadow:     '0 8px 32px rgba(10,26,70,0.18)',
  padding:       '32px',
  transition:    'transform 0.25s ease, box-shadow 0.25s ease',
  display:       'flex',
  flexDirection: 'column',
}

function IndustryCard({ Icon, iconLabel, name, body, href, linkLabel, gridCol, index }) {
  return (
    <div
      className="reveal ind-card"
      style={{ ...cardBase, gridColumn: gridCol, transitionDelay: `${index * 60}ms` }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(10,26,70,0.26)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(10,26,70,0.18)'
      }}
    >
      {/* Icon */}
      <div style={{
        width: '48px', height: '48px',
        background: 'rgba(232,119,34,0.12)',
        borderRadius: '12px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '20px', flexShrink: 0,
      }}>
        <Icon size={24} color="#E87722" aria-label={iconLabel} />
      </div>

      {/* Title — H2 for SEO heading hierarchy */}
      <h2 style={{
        color:        '#0B1A46',
        fontWeight:   700,
        fontSize:     '1.25rem',
        marginBottom: '12px',
        lineHeight:   1.3,
      }}>
        {name}
      </h2>

      {/* Body — grows to fill card */}
      <p style={{
        color:      '#4A5878',
        fontSize:   '0.92rem',
        lineHeight: 1.7,
        flex:       '1 1 auto',
        margin:     0,
      }}>
        {body}
      </p>

      {/* CTA link — pinned to card bottom */}
      <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
        <Link
          href={href}
          style={{
            color:          '#E87722',
            fontWeight:     600,
            fontSize:       '0.9rem',
            textDecoration: 'none',
            display:        'inline-flex',
            alignItems:     'center',
            gap:            '6px',
            transition:     'gap 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.gap = '10px' }}
          onMouseLeave={(e) => { e.currentTarget.style.gap = '6px' }}
        >
          {linkLabel} <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════
   1. HERO
═══════════════════════════════════════════════ */
function Hero() {
  return (
    <section style={{
      background:    '#0B1A46',
      borderBottom:  '3px solid #E87722',
      position:      'relative',
      overflow:      'hidden',
      padding:       '140px 24px 100px',
      minHeight:     '520px',
      display:       'flex',
      alignItems:    'center',
    }}>
      {/* Hero photo — subject RIGHT, dark zone LEFT carries H1 */}
      <img
        src="/images/pages/industries-hero.webp"
        alt="IT services across UAE industries Abu Dhabi"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right', zIndex: 0 }}
      />
      {/* Brand-blue overlay at 60% opacity */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(30,58,138,0.60)', zIndex: 10 }} />
      {/* Grid texture overlay */}
      <div aria-hidden="true" style={{
        position:            'absolute',
        inset:               0,
        pointerEvents:       'none',
        backgroundImage:     'linear-gradient(rgba(232,119,34,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(232,119,34,0.06) 1px, transparent 1px)',
        backgroundSize:      '60px 60px',
        maskImage:           'radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 85%)',
        WebkitMaskImage:     'radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 85%)',
        zIndex:              11,
      }} />
      {/* Faint orange radial glow — left side */}
      <div aria-hidden="true" style={{
        position:      'absolute',
        top:           '-80px',
        left:          '-120px',
        width:         '560px',
        height:        '560px',
        borderRadius:  '50%',
        background:    'radial-gradient(circle, rgba(232,119,34,0.18) 0%, transparent 65%)',
        pointerEvents: 'none',
        zIndex:        11,
      }} />

      <div
        className="reveal w-full md:max-w-[50%] text-center md:text-left"
        style={{ position: 'relative', zIndex: 20 }}
      >
        <Eyebrow>Industries We Serve</Eyebrow>
        <h1 style={{
          fontSize:   'clamp(2.4rem, 5vw, 3.6rem)',
          fontWeight: 800,
          color:      '#FFFFFF',
          lineHeight: 1.15,
          margin:     '0 0 22px',
          width:      '100%',
        }}>
          IT Built for <span className="text-[#E87722]">the Sector</span>, Not the Generic Template
        </h1>
        <p style={{
          fontSize:   '1.15rem',
          color:      'rgba(255,255,255,0.78)',
          lineHeight: 1.75,
          margin:     '0 0 36px',
        }}>
          Healthcare, banking and federal IT each operate against regulatory environments
          that generic enterprise IT does not touch. The work is different. The teams are
          different. The runbooks are different. This page lays out what we deliver in
          each of the core sectors where we have the deepest UAE history.
        </p>
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          <Link href="/contact" className="btn-primary">
            Get a Sector Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════
   2. INDUSTRIES GRID
   Uses a 6-column grid so all 5 cards are the same
   width.  Row 1: cards span cols 1-2, 3-4, 5-6.
   Row 2 (centred): cols 2-3, 4-5.
═══════════════════════════════════════════════ */
function IndustriesGrid() {
  return (
    <section style={{ background: '#F4F6FA', padding: '96px 24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          className="industries-grid"
          style={{
            display:               'grid',
            gridTemplateColumns:   'repeat(6, 1fr)',
            gap:                   '24px',
            alignItems:            'stretch',
          }}
        >
          {FLAGSHIP.map((c, i) => (
            <IndustryCard
              key={c.slug}
              Icon={c.Icon}
              iconLabel={c.iconLabel}
              name={c.name}
              body={c.body}
              href={`/industries/${c.slug}`}
              linkLabel={`Explore ${c.name}`}
              gridCol={c.gridCol}
              index={i}
            />
          ))}
          {NEW_CARDS.map((c, i) => (
            <IndustryCard
              key={c.slug}
              Icon={c.Icon}
              iconLabel={c.iconLabel}
              name={c.name}
              body={c.body}
              href={c.href}
              linkLabel={c.linkLabel}
              gridCol={c.gridCol}
              index={i + 3}
            />
          ))}
        </div>
      </div>

      {/* Responsive overrides */}
      <style>{`
        /* Tablet — 2 per row */
        @media (max-width: 1024px) {
          .industries-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .ind-card        { grid-column: auto / span 2 !important; }
        }
        /* Mobile — 1 per row */
        @media (max-width: 640px) {
          .industries-grid { grid-template-columns: 1fr !important; }
          .ind-card        { grid-column: auto !important; }
        }
      `}</style>
    </section>
  )
}

/* ════════════════════════════════════════════════
   3. CTA STRIP — Other Sectors
═══════════════════════════════════════════════ */
function CTAStrip() {
  return (
    <section style={{
      background:  'linear-gradient(135deg, #0B1A46 0%, #1E3A8A 100%)',
      borderTop:   '3px solid #E87722',
      padding:     '96px 24px',
    }}>
      <div
        className="reveal"
        style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}
      >
        <h2 style={{
          color:         '#FFFFFF',
          fontWeight:    800,
          fontSize:      'clamp(2rem, 4vw, 3rem)',
          letterSpacing: '-0.02em',
          lineHeight:    1.15,
          marginBottom:  '16px',
        }}>
          Other Sectors We Work In
        </h2>
        <p style={{
          color:       'rgba(255,255,255,0.78)',
          fontSize:    '17px',
          lineHeight:  1.75,
          maxWidth:    '580px',
          margin:      '0 auto 36px',
        }}>
          Beyond the five industries above, we deliver across hospitality, retail,
          education, energy, real estate and the broader UAE enterprise market. The sector
          pattern recognition compounds — engagements feed forward and backward across
          the portfolio.
        </p>

        <CTAPhoneButtons />
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════
   ROOT EXPORT
═══════════════════════════════════════════════ */
export default function IndustriesClient() {
  useReveal()
  return (
    <main>
      <Hero />
      <IndustriesGrid />
      <CTAStrip />
    </main>
  )
}
