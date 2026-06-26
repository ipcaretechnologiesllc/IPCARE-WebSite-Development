'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { serviceCategories } from '@/lib/services-data'
import CTAPhoneButtons from '@/components/site/CTAPhoneButtons'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) }
      }),
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

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

const Ic = ({ name, ...rest }) => {
  const C = Icons[name] || Icons.Code2
  return <C {...rest} />
}

function Hero() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #0B1A46 0%, #0F245F 50%, #1E3A8A 100%)',
      borderBottom: '3px solid #E87722',
      position: 'relative',
      overflow: 'hidden',
      padding: '140px 24px 100px',
      minHeight: '560px',
      display: 'flex',
      alignItems: 'center',
    }}>
      <img
        src="/images/services/digital-solutions-hero.webp"
        alt="Open-plan digital studio with screens showing web, app, and AI work"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ zIndex: 0 }}
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0" style={{ zIndex: 1, background: 'radial-gradient(ellipse 65% 75% at 50% 45%, rgba(11,26,70,0.62) 0%, rgba(11,26,70,0.30) 55%, rgba(11,26,70,0.15) 100%)' }} />
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        zIndex: 2,
        backgroundImage:
          'linear-gradient(rgba(232,119,34,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(232,119,34,0.06) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 85%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 85%)',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-80px', left: '-120px',
        width: '560px', height: '560px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,119,34,0.18) 0%, transparent 65%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      <div
        className="reveal"
        style={{
          maxWidth: '820px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          zIndex: 20,
        }}
      >
        <Eyebrow>Digital Solutions</Eyebrow>
        <h1 style={{
          fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)',
          fontWeight: 800,
          color: '#FFFFFF',
          lineHeight: 1.15,
          margin: '0 auto 22px',
          maxWidth: '900px',
          width: '100%',
          textAlign: 'center',
        }}>
          Custom Software, Web, and <span className="text-[#E87722]">AI Solutions</span> Built to Order
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'rgba(255,255,255,0.78)',
          lineHeight: 1.75,
          maxWidth: '640px',
          margin: '0 auto 36px',
        }}>
          From websites and web apps to custom software and AI-driven automation, our in-house team builds digital products that fit how your business actually works.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          <Link href="/contact" className="btn-primary">
            Start a Project <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

function DigitalSolutionsGrid() {
  const cats = Object.entries(serviceCategories).filter(([, c]) => c.menuGroup === 'digital-solutions')

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
        <p style={{
          fontSize: '1.1rem',
          color: '#333F50',
          lineHeight: 1.8,
          maxWidth: '820px',
          margin: '0 auto 56px',
          textAlign: 'center',
        }}>
          We build the digital products that sit alongside your IT infrastructure: websites, web applications, custom software, and AI-driven tools. Our in-house team works in modern frameworks like React, Next.js, Node.js, .NET, and Flutter, and we structure every build around your actual workflow rather than a generic template. Whether you need a customer-facing website, an internal tool that replaces manual work, or an AI assistant that handles routine queries, the same team designs, builds, tests, and supports it. Based in Abu Dhabi and serving clients across the UAE and Canada.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            alignItems: 'stretch',
          }}
          className="ds-grid"
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
                    aria-label={`${c.name} icon`}
                  />
                </div>

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

                <p style={{
                  color: '#4A5878',
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  marginBottom: '20px',
                }}>
                  {c.short}
                </p>

                {nonLocationSubpages.length > 0 && (
                  <ul style={{
                    padding: 0,
                    listStyle: 'none',
                    marginBottom: '24px',
                    flex: '1 1 auto',
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

      <style>{`
        @media (max-width: 1024px) { .ds-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .ds-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

function CTAStrip() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #0B1A46 0%, #1E3A8A 100%)',
      borderTop: '3px solid #E87722',
      padding: '96px 24px',
    }}>
      <div
        className="reveal"
        style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}
      >
        <h2 style={{
          color: '#FFFFFF',
          fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          marginBottom: '16px',
        }}>
          Have an Idea You Want to Build?
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.78)',
          fontSize: '17px',
          lineHeight: 1.75,
          maxWidth: '580px',
          margin: '0 auto 36px',
        }}>
          Tell us what you&apos;re trying to build or fix. We&apos;ll come back with a clear plan, no obligation.
        </p>

        <CTAPhoneButtons />
      </div>
    </section>
  )
}

export default function DigitalSolutionsClient() {
  useReveal()
  return (
    <main>
      <Hero />
      <DigitalSolutionsGrid />
      <CTAStrip />
    </main>
  )
}
