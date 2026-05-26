'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { ArrowRight, Phone, Mail, Globe } from 'lucide-react'
import { serviceCategories } from '@/lib/services-data'

/* ── IntersectionObserver reveal (same as About page) ── */
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

/* ── Reusable eyebrow label (same as About page) ── */
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

/* ── Lucide icon renderer ── */
const Ic = ({ name, ...rest }) => {
  const C = Icons[name] || Icons.Server
  return <C {...rest} />
}

/* ── Human-rewritten card sub-lines (spec Step 5) ── */
const SERVICE_SUBTITLES = {
  'it-consulting':   'Strategy, assessments, and digital transformation that actually ships.',
  'infrastructure':  'Data centre, virtualization, and procurement — built to scale.',
  'elv':             'CCTV, access control, structured cabling, and PA systems.',
  'managed-it':      '24/7 monitoring, SLA-backed support, network and server management.',
  'cloud':           'Migration, Microsoft 365, and backup that survives a bad day.',
  'cybersecurity':   'SOC, Zero Trust, compliance, endpoint, and privileged access.',
  'email-solutions': 'Google Workspace, Microsoft 365, hosting, and hybrid setups.',
}

/* ── Descriptive alt text per service icon ── */
const ICON_LABELS = {
  'it-consulting':   'IT Consulting icon',
  'infrastructure':  'Infrastructure Services icon',
  'elv':             'ELV and Physical Security icon',
  'managed-it':      'Managed IT Services icon',
  'cloud':           'Cloud Services icon',
  'cybersecurity':   'Cybersecurity Services icon',
  'email-solutions': 'Email Solutions icon',
}

/* ════════════════════════════════════════════════
   1. HERO — matches About page hero exactly
═══════════════════════════════════════════════ */
function Hero() {
  return (
    <section style={{
      background: '#0B1A46',
      borderBottom: '3px solid #E87722',
      position: 'relative',
      overflow: 'hidden',
      padding: '140px 24px 100px',
      minHeight: '560px',
      display: 'flex',
      alignItems: 'center',
    }}>
      {/* Grid texture overlay */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage:
          'linear-gradient(rgba(232,119,34,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(232,119,34,0.06) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 85%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 85%)',
      }} />
      {/* Faint orange radial glow — left side */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-80px', left: '-120px',
        width: '560px', height: '560px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,119,34,0.18) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div
        className="reveal"
        style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        <Eyebrow>Our Services</Eyebrow>
        <h1 style={{
          fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)',
          fontWeight: 800,
          color: '#FFFFFF',
          lineHeight: 1.1,
          marginBottom: '22px',
        }}>
          Enterprise IT Solutions &amp; Services &mdash; UAE &amp; Canada
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'rgba(255,255,255,0.78)',
          lineHeight: 1.75,
          maxWidth: '640px',
          margin: '0 auto 36px',
        }}>
          From strategy to implementation to 24/7 operations &mdash; IP Care delivers the
          complete IT stack for enterprise, government, and fast-growth organisations
          across the UAE and Canada.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          <Link href="/contact" className="btn-primary">
            Get a Free Consultation <ArrowRight size={16} />
          </Link>
          <Link href="/about" className="btn-ghost">
            About IP Care
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════
   2. SERVICES GRID — white cards on #F4F6FA bg
═══════════════════════════════════════════════ */
function ServicesGrid() {
  const cats = Object.entries(serviceCategories)

  const cardBase = {
    background: '#FFFFFF',
    borderTop: '3px solid #E87722',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(10,26,70,0.18)',
    padding: '32px',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    display: 'flex',
    flexDirection: 'column',
  }

  return (
    <section style={{ background: '#F4F6FA', padding: '96px 24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}
          className="services-grid"
        >
          {cats.map(([slug, c], i) => {
            const nonLocationSubpages = c.subpages
              ? Object.entries(c.subpages).filter(([k]) => k !== 'dubai' && k !== 'abu-dhabi')
              : []

            return (
              <div
                key={slug}
                className="reveal"
                style={{ ...cardBase, transitionDelay: `${i * 60}ms` }}
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
                  <Ic
                    name={c.icon}
                    size={24}
                    color="#E87722"
                    aria-label={ICON_LABELS[slug] || `${c.name} icon`}
                  />
                </div>

                {/* Card title — h2 for SEO heading hierarchy */}
                <h2 style={{
                  color: '#0B1A46',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  marginBottom: '8px',
                  lineHeight: 1.3,
                }}>
                  <Link
                    href={`/services/${slug}`}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {c.name}
                  </Link>
                </h2>

                {/* Sub-line — sentence case, human rewrite */}
                <p style={{
                  color: '#4A5878',
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  marginBottom: '20px',
                }}>
                  {SERVICE_SUBTITLES[slug] || c.short}
                </p>

                {/* Bullet sub-services list */}
                {nonLocationSubpages.length > 0 && (
                  <ul style={{
                    padding: 0,
                    listStyle: 'none',
                    marginBottom: '24px',
                    flex: 1,
                  }}>
                    {nonLocationSubpages.slice(0, 5).map(([subSlug, sub]) => (
                      <li key={subSlug} style={{ marginBottom: '8px' }}>
                        <Link
                          href={`/services/${slug}/${subSlug}`}
                          style={{
                            display: 'flex', alignItems: 'flex-start', gap: '8px',
                            color: '#0B1A46', fontSize: '0.9rem',
                            textDecoration: 'none',
                            transition: 'color 0.2s ease',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = '#E87722' }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = '#0B1A46' }}
                        >
                          <Icons.ArrowRight
                            size={13}
                            style={{ color: '#E87722', flexShrink: 0, marginTop: '3px' }}
                          />
                          <span>{sub.h1}</span>
                        </Link>
                      </li>
                    ))}
                    {nonLocationSubpages.length > 5 && (
                      <li style={{ fontSize: '0.85rem', color: '#8B9BB4', paddingLeft: '21px', marginTop: '4px' }}>
                        + {nonLocationSubpages.length - 5} more&hellip;
                      </li>
                    )}
                  </ul>
                )}

                {/* View All CTA — solid orange button */}
                <div style={{ marginTop: 'auto' }}>
                  <Link
                    href={`/services/${slug}`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      background: '#E87722', color: '#FFFFFF',
                      borderRadius: '8px', padding: '10px 20px',
                      fontWeight: 600, fontSize: '0.9rem',
                      textDecoration: 'none',
                      transition: 'background 0.2s ease, gap 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#D06010'
                      e.currentTarget.style.gap = '10px'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#E87722'
                      e.currentTarget.style.gap = '6px'
                    }}
                  >
                    View All {c.name} <Icons.ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Responsive grid overrides */}
      <style>{`
        @media (max-width: 1024px) { .services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

/* ════════════════════════════════════════════════
   3. CTA STRIP — matches About page CTAStrip exactly
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
        <h2 style={{
          color: '#FFFFFF',
          fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          marginBottom: '16px',
        }}>
          Not Sure Where to Start?
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.78)',
          fontSize: '17px',
          lineHeight: 1.75,
          maxWidth: '580px',
          margin: '0 auto 36px',
        }}>
          Book a 30-minute discovery call with an IP Care solution architect.
          Free, no obligation — we&apos;ll point you in the right direction.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '36px' }}>
          <Link href="/contact" className="btn-primary">
            Book a Discovery Call <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '36px',
          justifyContent: 'center', fontSize: '0.95rem',
          color: 'rgba(255,255,255,0.8)',
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
              onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
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
export default function ServicesClient() {
  useReveal()
  return (
    <main>
      <Hero />
      <ServicesGrid />
      <CTAStrip />
    </main>
  )
}
