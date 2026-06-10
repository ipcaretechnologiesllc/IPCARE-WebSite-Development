'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, ExternalLink, Globe,
  Lock, Globe2, Cloud, Briefcase, Bot,
  Calculator, BarChart3, ArrowRightLeft,
  CalendarDays, Shield, Users, ArrowUpRight,
} from 'lucide-react'
import * as Icons from 'lucide-react'
import { platforms, services, trackRecord, tools, kbArticles, caseStudies } from '@/lib/cyber-advisory-data'
import CTAPhoneButtons from '@/components/site/CTAPhoneButtons'

const Ic = ({ name, ...rest }) => {
  const C = Icons[name] || Icons.Shield
  return <C {...rest} />
}

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

/* ── Eyebrow label ── */
function Eyebrow({ children }) {
  return (
    <p style={{
      fontSize: '13px', fontWeight: 700, color: '#E87722',
      letterSpacing: '4px', textTransform: 'uppercase',
      display: 'block', marginBottom: '16px',
    }}>
      {children}
    </p>
  )
}

/* ── Shared white card base ── */
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

const hoverOn  = (e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(10,26,70,0.26)' }
const hoverOff = (e) => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.boxShadow = '0 8px 32px rgba(10,26,70,0.18)' }

/* ── Green "Active Practice" badge ── */
const ActiveBadge = () => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: '5px',
    fontSize: '10px', fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.08em', padding: '3px 10px', borderRadius: '20px',
    background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.35)',
    color: '#16a34a', flexShrink: 0,
  }}>
    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
    Active Practice
  </span>
)

/* ═══════════════════════════════════════════
   1. HERO , navy, grid texture, orange glow
═══════════════════════════════════════════ */
function Hero() {
  return (
    <section style={{
      background: '#0B1A46',
      borderBottom: '3px solid #E87722',
      position: 'relative',
      overflow: 'hidden',
      padding: '120px 24px 80px',
    }}>
      {/* Hero photo — subject RIGHT, dark zone LEFT carries H1 */}
      <img
        src="/images/pages/cyber-advisory-hero.webp"
        alt="Cybersecurity advisory Abu Dhabi"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right', zIndex: 0 }}
      />
      {/* Navy radial scrim — weighted left where the H1 sits, clear over the rest of the image */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 90% at 20% 50%, rgba(11,26,70,0.62) 0%, rgba(11,26,70,0.30) 55%, rgba(11,26,70,0.15) 100%)', zIndex: 10 }} />
      {/* Grid texture overlay */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(232,119,34,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(232,119,34,0.06) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 85%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 85%)',
        zIndex: 11,
      }} />
      {/* Orange radial glow — left */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-80px', left: '-120px',
        width: '560px', height: '560px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,119,34,0.18) 0%, transparent 65%)',
        pointerEvents: 'none',
        zIndex: 11,
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 20 }}>
        {/* H1 copy — left-aligned on desktop, centred on mobile */}
        <div className="reveal w-full md:max-w-[50%] text-center md:text-left" style={{ marginBottom: '60px' }}>
          <Eyebrow>Cyber Advisory</Eyebrow>
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
            fontWeight: 800, color: '#FFFFFF',
            lineHeight: 1.15, margin: '0 0 22px',
            width: '100%',
          }}>
            Zero Trust. SASE. Cloud Security. <span className="text-[#E87722]">Done by Practitioners.</span>
          </h1>
          <p style={{
            fontSize: '1.15rem', color: 'rgba(255,255,255,0.78)',
            lineHeight: 1.75, margin: '0 0 36px',
          }}>
            Zero Trust architecture, SASE transformation, and cloud security, delivered by
            practitioners who have protected 100K+ users at Fortune 500 scale.
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Link href="/contact" className="btn-primary">
              Schedule Consultation <ArrowRight size={16} />
            </Link>
            <a href="#platforms" className="btn-secondary-pill">View Expertise</a>
          </div>
        </div>

        {/* Advisor cards — white cards inside navy hero */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          maxWidth: '900px',
          margin: '0 auto',
          alignItems: 'stretch',
        }}>

          {/* Attique Bhatti */}
          <div
            className="reveal"
            style={{ ...cardBase, boxShadow: '0 8px 40px rgba(10,26,70,0.32)', textAlign: 'center' }}
            onMouseEnter={hoverOn} onMouseLeave={hoverOff}
          >
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: '#0B1A46', border: '3px solid #E87722',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px', fontSize: '24px', fontWeight: 800, color: '#FFFFFF',
            }}>AB</div>
            <h3 style={{ color: '#0B1A46', fontWeight: 700, fontSize: '20px', marginBottom: '4px' }}>
              Attique Bhatti
            </h3>
            <div style={{ color: '#E87722', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '4px' }}>
              Enterprise Security Consultant
            </div>
            <div style={{ color: '#1E3A8A', fontSize: '13px', fontWeight: 600, marginBottom: '16px' }}>
              The Cyber Adviser
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', color: '#4A5878', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', fontWeight: 600 }}>Certifications</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                {['PCNSE', 'CISSP', 'AWS Security', 'Azure Security', 'GIAC GCFA'].map((c) => (
                  <span key={c} style={{
                    fontSize: '11px', padding: '3px 8px', borderRadius: '6px', fontWeight: 600,
                    background: 'rgba(30,58,138,0.08)', color: '#1E3A8A',
                    border: '1px solid rgba(30,58,138,0.18)',
                  }}>{c}</span>
                ))}
              </div>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px',
              borderTop: '1px solid #E8EDF5', paddingTop: '20px', marginTop: 'auto',
            }}>
              {[
                { n: '15+', l: 'Years' },
                { n: '100K+', l: 'Users Protected' },
                { n: '50+', l: 'Engagements' },
              ].map((s) => (
                <div key={s.l}>
                  <div style={{ color: '#0B1A46', fontWeight: 700, fontSize: '15px' }}>{s.n}</div>
                  <div style={{ color: '#4B5563', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '3px' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tanveer Ahmed */}
          <div
            className="reveal"
            style={{ ...cardBase, boxShadow: '0 8px 40px rgba(10,26,70,0.32)', textAlign: 'center', transitionDelay: '60ms' }}
            onMouseEnter={hoverOn} onMouseLeave={hoverOff}
          >
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: '#0B1A46', border: '3px solid #E87722',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px', fontSize: '24px', fontWeight: 800, color: '#FFFFFF',
            }}>TA</div>
            <h3 style={{ color: '#0B1A46', fontWeight: 700, fontSize: '20px', marginBottom: '4px' }}>
              Tanveer Ahmed
            </h3>
            <div style={{ color: '#E87722', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '4px' }}>
              Independent Network Security Consultant
            </div>
            <div style={{ color: '#4A5878', fontSize: '12px', marginBottom: '16px' }}>
              Prisma Access &amp; SASE Specialist, Milton, Ontario, Canada
            </div>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '11px', color: '#4A5878', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', fontWeight: 600 }}>Specialisations</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                {['SASE', 'ZTNA', 'CASB', 'DLP', 'SWG', 'Prisma Access'].map((s) => (
                  <span key={s} style={{
                    fontSize: '11px', padding: '3px 8px', borderRadius: '6px', fontWeight: 600,
                    background: 'rgba(232,119,34,0.1)', color: '#E87722',
                    border: '1px solid rgba(232,119,34,0.25)',
                  }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', color: '#4A5878', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', fontWeight: 600 }}>Certifications</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                {['PCNSE', 'PCCSA', 'CNSS', 'AlgoSec'].map((c) => (
                  <span key={c} style={{
                    fontSize: '11px', padding: '3px 8px', borderRadius: '6px', fontWeight: 600,
                    background: 'rgba(30,58,138,0.08)', color: '#1E3A8A',
                    border: '1px solid rgba(30,58,138,0.18)',
                  }}>{c}</span>
                ))}
              </div>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px',
              borderTop: '1px solid #E8EDF5', paddingTop: '20px', marginTop: 'auto',
            }}>
              {[
                { n: '25+', l: 'Years' },
                { n: 'CCIE', l: 'Certified' },
                { n: 'Prisma', l: 'Access SME' },
              ].map((s) => (
                <div key={s.l}>
                  <div style={{ color: '#0B1A46', fontWeight: 700, fontSize: '15px' }}>{s.n}</div>
                  <div style={{ color: '#4B5563', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '3px' }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #E8EDF5' }}>
              <a
                href="https://www.linkedin.com/in/tanveer-bhatti-sase-ztna-casb-dlp-swg-rbi-pab-79a01718/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  color: '#0A66C2', fontSize: '13px', fontWeight: 600, textDecoration: 'none',
                }}
              >
                <Icons.Linkedin size={15} /> LinkedIn Profile
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   2. PLATFORMS, white cards on #F4F6FA
═══════════════════════════════════════════ */
function Platforms() {
  return (
    <section id="platforms" style={{ background: '#F4F6FA', padding: '96px 24px' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <Eyebrow>Platform Expertise</Eyebrow>
          <h2 style={{
            color: '#0B1A46', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)',
            letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '16px',
          }}>
            Advisory Depth Across Enterprise Platforms
          </h2>
          <p style={{ color: '#4A5878', fontSize: '17px', lineHeight: 1.75, maxWidth: '640px', margin: '0 auto' }}>
            Certified, hands-on expertise across the vendors that power modern enterprise security and cloud.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          alignItems: 'stretch',
        }}>
          {platforms.map((p, i) => (
            <div
              key={p.name}
              className="reveal"
              style={{ ...cardBase, transitionDelay: `${i * 50}ms` }}
              onMouseEnter={hoverOn} onMouseLeave={hoverOff}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                {p.vendor ? (
                  <span style={{ fontSize: '20px', fontWeight: 800, color: p.color, letterSpacing: '-0.02em' }}>
                    {p.vendor}
                  </span>
                ) : (
                  <span style={{
                    fontSize: '12px', fontWeight: 700, color: '#0B1A46',
                    textTransform: 'uppercase', letterSpacing: '1px',
                    padding: '3px 10px', borderRadius: '8px',
                    background: 'rgba(11,26,70,0.07)',
                  }}>
                    {p.name}
                  </span>
                )}
                <ActiveBadge />
              </div>
              <h3 style={{ color: '#0B1A46', fontWeight: 700, fontSize: '16px', marginBottom: '8px', lineHeight: 1.3, flex: '1 1 auto' }}>
                {p.vendor ? p.name : ''}
              </h3>
              <p style={{ color: '#4A5878', fontSize: '13px', lineHeight: 1.65, margin: 0 }}>
                {p.sub || p.spec}
              </p>
              {p.advisor && (
                <div style={{ marginTop: '12px', fontSize: '11px', color: '#E87722', fontWeight: 600 }}>
                  Lead: {p.advisor}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Responsive: 2-col at tablet, 1-col at mobile */}
        <style>{`
          @media (max-width: 1024px) {
            #platforms .adv-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 640px) {
            #platforms .adv-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   3. SERVICES, white cards on #FFFFFF
═══════════════════════════════════════════ */
function ServicesGrid() {
  return (
    <section style={{ background: '#FFFFFF', padding: '96px 24px' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <Eyebrow>Strategic Practice</Eyebrow>
          <h2 style={{
            color: '#0B1A46', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)',
            letterSpacing: '-0.02em', lineHeight: 1.15,
          }}>
            Strategic Security Expertise
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '24px',
          alignItems: 'stretch',
        }}>
          {services.map((s, i) => (
            <Link
              key={s.slug}
              href={`/cybersecurity-advisory/${s.slug}`}
              className="reveal"
              style={{
                ...cardBase,
                textDecoration: 'none',
                transitionDelay: `${i * 70}ms`,
              }}
              onMouseEnter={hoverOn} onMouseLeave={hoverOff}
            >
              {/* Icon */}
              <div style={{
                width: '48px', height: '48px',
                background: 'rgba(232,119,34,0.12)',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px', flexShrink: 0,
              }}>
                <Ic name={s.icon} size={22} color="#E87722" />
              </div>
              <h3 style={{ color: '#0B1A46', fontWeight: 700, fontSize: '15px', marginBottom: '10px', lineHeight: 1.3 }}>
                {s.name}
              </h3>
              <p style={{ color: '#4A5878', fontSize: '13px', lineHeight: 1.7, flex: '1 1 auto', margin: 0 }}>
                {s.short}
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  color: '#E87722', fontWeight: 600, fontSize: '13px',
                }}>
                  Explore <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <style>{`
          @media (max-width: 1200px) { .svc-grid { grid-template-columns: repeat(3, 1fr) !important; } }
          @media (max-width: 768px)  { .svc-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 480px)  { .svc-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   4. TRACK RECORD, KEEP ON NAVY
═══════════════════════════════════════════ */
function TrackRecord() {
  return (
    <section style={{ background: '#0B1A46', padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(232,119,34,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(232,119,34,0.05) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', alignItems: 'stretch' }}>
          {trackRecord.map((t, i) => (
            <div
              key={t.l}
              className="reveal"
              style={{
                textAlign: 'center', padding: '40px 24px',
                borderTop: '3px solid rgba(232,119,34,0.4)',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.04)',
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div style={{ fontSize: 'clamp(2.4rem, 4vw, 3rem)', fontWeight: 800, color: '#E87722', letterSpacing: '-0.02em', lineHeight: 1 }}>
                {t.n}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>
                {t.l}
              </div>
            </div>
          ))}
        </div>
        <style>{`@media (max-width: 640px) { .track-grid { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   5. PHILOSOPHY, KEEP ON NAVY/BLUE
═══════════════════════════════════════════ */
function Philosophy() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #0B1A46 0%, #1E3A8A 100%)',
      padding: '96px 24px',
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Eyebrow>Philosophy</Eyebrow>
          <h2 style={{
            color: '#FFFFFF', fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            letterSpacing: '-0.02em', lineHeight: 1.15,
          }}>
            Security as a Strategic Enabler
          </h2>
        </div>

        <blockquote className="reveal" style={{ position: 'relative', margin: 0, padding: '0 0 0 48px' }}>
          <div style={{
            position: 'absolute', top: '-16px', left: 0,
            color: '#E87722', fontSize: '80px', fontFamily: 'Georgia, serif',
            lineHeight: 1, opacity: 0.8, userSelect: 'none',
          }}>&ldquo;</div>
          <p style={{
            color: '#FFFFFF', fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            fontWeight: 500, lineHeight: 1.45, letterSpacing: '-0.01em', margin: 0,
          }}>
            Security architecture is not about building walls. It&apos;s about enabling secure
            access to the right resources, for the right people, at the right time.
          </p>
          <footer style={{
            marginTop: '20px', color: '#E87722',
            fontSize: '13px', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '3px',
          }}>
           , Attique Bhatti
          </footer>
        </blockquote>

        <div className="reveal" style={{ marginTop: '48px' }}>
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '20px' }}>
            For two decades, cybersecurity has been framed as a cost of doing business, an expensive,
            reactive layer bolted onto the network perimeter. That framing is obsolete. In a cloud-native,
            identity-driven world, security is the foundation that makes modern business possible.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '1.05rem', lineHeight: 1.8 }}>
            Our Zero Trust approach puts identity and context at the centre of every access decision.
            We design architectures where users, devices, workloads and data are continuously verified ,
            not trusted by virtue of network location. The result is a security posture that is both
            stronger and more flexible, enabling rather than constraining the business.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   6. TOOLS, white cards on #F4F6FA
═══════════════════════════════════════════ */
function Tools() {
  return (
    <section style={{ background: '#F4F6FA', padding: '96px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <Eyebrow>Interactive Tools</Eyebrow>
          <h2 style={{
            color: '#0B1A46', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)',
            letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '16px',
          }}>
            Engineering-Grade Calculators
          </h2>
          <p style={{ color: '#4A5878', fontSize: '17px', lineHeight: 1.75, maxWidth: '580px', margin: '0 auto' }}>
            Free tools used by security architects worldwide, hosted on thecyberadviser.com.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', alignItems: 'stretch' }}>
          {tools.map((t, i) => (
            <a
              key={t.name}
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal"
              style={{
                ...cardBase,
                textDecoration: 'none',
                transitionDelay: `${i * 80}ms`,
              }}
              onMouseEnter={hoverOn} onMouseLeave={hoverOff}
            >
              {/* Icon row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{
                  width: '48px', height: '48px', background: 'rgba(232,119,34,0.12)',
                  borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Ic name={t.icon} size={22} color="#E87722" />
                </div>
                <ExternalLink size={14} color="#9CA3AF" />
              </div>
              <h3 style={{ color: '#0B1A46', fontWeight: 700, fontSize: '17px', marginBottom: '12px', lineHeight: 1.3 }}>
                {t.name}
              </h3>
              <p style={{ color: '#4A5878', fontSize: '14px', lineHeight: 1.7, flex: '1 1 auto', margin: 0 }}>
                {t.desc}
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  color: '#E87722', fontWeight: 700, fontSize: '13px',
                  textTransform: 'uppercase', letterSpacing: '1px',
                }}>
                  Launch Tool <ArrowUpRight size={14} />
                </span>
              </div>
            </a>
          ))}
        </div>

        <style>{`@media (max-width: 768px) { .tools-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   7. KNOWLEDGE BASE, white cards on #FFFFFF
═══════════════════════════════════════════ */
function KnowledgeBase() {
  const [filter, setFilter] = useState('All')
  const cats = ['All', 'Palo Alto', 'Check Point', 'Fortinet', 'Architecture']
  const filtered = filter === 'All' ? kbArticles.slice(0, 6) : kbArticles.filter((a) => a.category === filter).slice(0, 6)

  return (
    <section style={{ background: '#FFFFFF', padding: '96px 24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Eyebrow>Knowledge Base</Eyebrow>
          <h2 style={{
            color: '#0B1A46', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)',
            letterSpacing: '-0.02em', lineHeight: 1.15,
          }}>
            Field-Tested Insights
          </h2>
        </div>

        {/* Filter pills */}
        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '48px' }}>
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              style={{
                padding: '7px 18px', borderRadius: '20px', fontSize: '12px',
                fontWeight: 600, cursor: 'pointer', letterSpacing: '0.5px',
                background: filter === c ? '#E87722' : 'transparent',
                color: filter === c ? '#FFFFFF' : '#4A5878',
                border: filter === c ? '1px solid #E87722' : '1px solid #D1D5DB',
                transition: 'all 0.2s ease',
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', alignItems: 'stretch' }}>
          {filtered.map((a, i) => (
            <article
              key={a.title}
              className="reveal"
              style={{ ...cardBase, transitionDelay: `${i * 60}ms`, cursor: 'pointer' }}
              onMouseEnter={hoverOn} onMouseLeave={hoverOff}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{
                  fontSize: '10px', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '1px', padding: '3px 10px', borderRadius: '20px',
                  background: 'rgba(232,119,34,0.1)', color: '#E87722',
                  border: '1px solid rgba(232,119,34,0.3)',
                }}>{a.category}</span>
                <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600 }}>{a.readTime}</span>
              </div>
              <h3 style={{
                color: '#0B1A46', fontWeight: 700, fontSize: '15px',
                lineHeight: 1.45, flex: '1 1 auto', marginBottom: '20px',
              }}>
                {a.title}
              </h3>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderTop: '1px solid #E8EDF5', paddingTop: '16px', marginTop: 'auto',
              }}>
                <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{a.date}</span>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  color: '#E87722', fontWeight: 700, fontSize: '12px',
                }}>
                  Read <ArrowRight size={12} />
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="reveal" style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link
            href="/cybersecurity-advisory/knowledge-base"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              color: '#E87722', fontWeight: 700, fontSize: '14px',
              padding: '10px 24px', borderRadius: '24px',
              border: '2px solid rgba(232,119,34,0.5)',
              background: 'rgba(232,119,34,0.05)',
              textDecoration: 'none', transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#E87722'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(232,119,34,0.05)'; e.currentTarget.style.color = '#E87722' }}
          >
            Browse Full Knowledge Base <ArrowRight size={15} />
          </Link>
        </div>

        <style>{`@media (max-width: 900px) { .kb-grid { grid-template-columns: repeat(2,1fr) !important; } } @media (max-width: 600px) { .kb-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   8. CASE STUDIES, white cards on #F4F6FA
═══════════════════════════════════════════ */
function CaseStudies() {
  const [filter, setFilter] = useState('All')
  const cats = ['All', 'Prisma Access', 'Prisma SD-WAN', 'Cortex Operations', 'Network Security']
  const filtered = filter === 'All' ? caseStudies : caseStudies.filter((c) => c.tag === filter)

  return (
    <section style={{ background: '#F4F6FA', padding: '96px 24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Eyebrow>Case Studies</Eyebrow>
          <h2 style={{
            color: '#0B1A46', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)',
            letterSpacing: '-0.02em', lineHeight: 1.15,
          }}>
            Proven at Enterprise Scale
          </h2>
        </div>

        {/* Filter pills */}
        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '48px' }}>
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              style={{
                padding: '7px 18px', borderRadius: '20px', fontSize: '12px',
                fontWeight: 600, cursor: 'pointer', letterSpacing: '0.5px',
                background: filter === c ? '#E87722' : 'transparent',
                color: filter === c ? '#FFFFFF' : '#4A5878',
                border: filter === c ? '1px solid #E87722' : '1px solid #D1D5DB',
                transition: 'all 0.2s ease',
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', alignItems: 'stretch' }}>
          {filtered.map((c, i) => (
            <div
              key={c.title}
              className="reveal"
              style={{
                background: '#FFFFFF',
                borderTop: '3px solid #E87722',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(10,26,70,0.18)',
                overflow: 'hidden',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                transitionDelay: `${i * 80}ms`,
              }}
              onMouseEnter={hoverOn} onMouseLeave={hoverOff}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden', flexShrink: 0 }}>
                <img
                  src={c.img}
                  alt={`${c.title}, case study`}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(11,26,70,0.6) 100%)' }} />
                <span style={{
                  position: 'absolute', top: '16px', left: '16px',
                  fontSize: '10px', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '1px', padding: '4px 10px', borderRadius: '20px',
                  background: '#E87722', color: '#fff',
                }}>{c.tag}</span>
                <div style={{
                  position: 'absolute', bottom: '12px', right: '16px',
                  display: 'flex', gap: '12px', fontSize: '11px', color: 'rgba(255,255,255,0.85)',
                  fontWeight: 600,
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={12} /> {c.users}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Globe size={12} /> {c.region}
                  </span>
                </div>
              </div>
              {/* Body */}
              <div style={{ padding: '28px 28px 32px', flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: '#0B1A46', fontWeight: 700, fontSize: '18px', marginBottom: '10px', lineHeight: 1.3 }}>
                  {c.title}
                </h3>
                <p style={{ color: '#4A5878', fontSize: '14px', lineHeight: 1.7, margin: 0, flex: '1 1 auto' }}>
                  {c.outcome}
                </p>
              </div>
            </div>
          ))}
        </div>

        <style>{`@media (max-width: 768px) { .cs-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   9. BOTTOM CTA, navy→blue gradient
═══════════════════════════════════════════ */
function BottomCTA() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #0B1A46 0%, #1E3A8A 100%)',
      borderTop: '3px solid #E87722',
      padding: '96px 24px',
    }}>
      <div className="reveal" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <Eyebrow>Next Step</Eyebrow>
        <h2 style={{
          color: '#FFFFFF', fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '16px',
        }}>
          Schedule a Confidential Consultation
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '17px', lineHeight: 1.75, maxWidth: '580px', margin: '0 auto 40px' }}>
          Thirty minutes with a senior advisor. No sales pitch, no obligation. Just direct,
          candid guidance on your most pressing security challenges.
        </p>

        {/* Booking widget */}
        <div className="reveal" style={{
          background: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '16px',
          padding: '40px',
          maxWidth: '560px',
          margin: '0 auto 40px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '28px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: 'rgba(232,119,34,0.15)', border: '1px solid rgba(232,119,34,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <CalendarDays size={22} color="#E87722" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '16px' }}>30-minute consultation</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', marginTop: '2px' }}>Google Meet · Mutual NDA available</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '24px' }}>
            {['Tue 3:00 PM', 'Wed 10:00 AM', 'Thu 2:30 PM'].map((slot) => (
              <div key={slot} style={{
                padding: '10px 6px', borderRadius: '10px', textAlign: 'center',
                fontSize: '12px', color: 'rgba(255,255,255,0.75)', fontWeight: 600,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
              }}>{slot}</div>
            ))}
          </div>
          <Link href="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Book a Call <ArrowRight size={16} />
          </Link>
        </div>

        {/* Trust chips */}
        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginBottom: '40px' }}>
          {[
            { icon: Shield, label: 'NDA Available' },
            { icon: Icons.Lock, label: 'Confidential' },
            { icon: Globe, label: 'Canada & UAE' },
          ].map(({ icon: Icon, label }) => (
            <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '7px', color: 'rgba(255,255,255,0.65)', fontSize: '13px', fontWeight: 600 }}>
              <Icon size={14} color="rgba(255,255,255,0.5)" /> {label}
            </span>
          ))}
        </div>

        <CTAPhoneButtons />
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   ROOT EXPORT
═══════════════════════════════════════════ */
export default function AdvisoryClient() {
  useReveal()
  return (
    <main>
      <Hero />
      <Platforms />
      <ServicesGrid />
      <TrackRecord />
      <Philosophy />
      <Tools />
      <KnowledgeBase />
      <CaseStudies />
      <BottomCTA />
    </main>
  )
}
