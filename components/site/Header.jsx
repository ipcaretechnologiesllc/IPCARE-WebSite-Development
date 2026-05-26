'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ArrowRight, Menu, X, Mail,
  Server, Lock, Cable, Calendar, Network, Cloud, Briefcase, Code, TrendingUp, AtSign, Shield, ChevronDown
} from 'lucide-react'
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa'
import Logo, { UAEFlag, CanadaFlag } from './Logo'
import { serviceCategories } from '@/lib/services-data'

const iconMap = { Server, Lock, Cable, Calendar, Network, Cloud, Briefcase, Code, TrendingUp, AtSign, Shield }

// Custom display labels for navigation mega-menu (shorter, no location suffix)
const navLabels = {
  'it-consulting': {
    'technology-strategy': 'Technology Strategy',
    'it-assessment': 'IT Assessment & Planning',
    'digital-transformation': 'Digital Transformation',
  },
  'infrastructure': {
    'data-centre-management': 'Data Centre Management',
    'virtualization': 'Virtualization Solutions',
    'hardware-procurement': 'Hardware Procurement',
  },
  'elv': {
    _category: 'ELV & Physical Security',
    'cctv-systems': 'CCTV Systems',
    'access-control': 'Access Control',
    'gate-barriers': 'Gate Barrier Systems',
    'public-address-systems': 'PA Systems',
    'intercom-systems': 'Intercom Systems',
    'structured-cabling': 'Structured Cabling',
  },
  'managed-it': {
    'network-management': 'Network Management',
    'server-management': 'Server Management',
    'it-support-helpdesk': 'IT Support & Help Desk',
    'sla': 'Service Level Agreements',
  },
  'cloud': {
    'migration': 'Cloud Migration',
    'microsoft-365': 'Microsoft 365',
    'backup-recovery': 'Data Backup & Recovery',
  },
  'cybersecurity': {
    'security-assessment': 'Security Assessment',
    'incident-response': 'Incident Response',
    'compliance': 'Compliance Solutions',
    'endpoint-protection': 'Endpoint Protection',
    'pam': 'Privileged Access Management',
    'email-security': 'Email Security & DLP',
    'microsoft-entra-id': 'Microsoft Entra ID',
  },
  'email-solutions': {
    'google-workspace': 'Google Workspace',
    'microsoft-365': 'Microsoft 365 / Exchange',
    'email-hosting': 'Email Hosting',
    'hybrid': 'Hybrid Cloud Mail',
  },
}

const SOCIAL = {
  facebook: 'https://www.facebook.com/ipcareuae',
  linkedin: 'https://www.linkedin.com/company/ip-care-technologies',
  instagram: 'https://www.instagram.com/ipcaretechnologies/',
}

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [servicesOpen,  setServicesOpen]  = useState(false)
  const [eventITOpen,   setEventITOpen]   = useState(false)
  const navRef             = useRef(null)
  const servicesCloseTimer = useRef(null)
  const eventITCloseTimer  = useRef(null)

  // Active when pathname matches the link href.
  // Home ("/") requires exact match. All others: exact OR startsWith(href + '/').
  const isActive = (href) => {
    if (!pathname) return false
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  // ─── Close all menus on every route change ────────────────────────────────
  // App Router keeps Header mounted across navigations. This is a safety-net
  // for cases not caught by the synchronous closeAll() onClick handlers below.
  useEffect(() => {
    setServicesOpen(false)
    setEventITOpen(false)
    setMobileOpen(false)
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
    if (eventITCloseTimer.current)  clearTimeout(eventITCloseTimer.current)
  }, [pathname])

  // ─── Click-outside closes all menus ──────────────────────────────────────
  // The dropdown panels are now INSIDE navRef, so a single contains() check
  // covers both the nav links and the dropdown panels.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
        if (eventITCloseTimer.current)  clearTimeout(eventITCloseTimer.current)
        setServicesOpen(false)
        setEventITOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // ─── Escape key closes all menus ─────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
        if (eventITCloseTimer.current)  clearTimeout(eventITCloseTimer.current)
        setServicesOpen(false)
        setEventITOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // ─── Open / close helpers ─────────────────────────────────────────────────
  // Mutual exclusion: opening one dropdown immediately closes the other.

  const openServices = () => {
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
    if (eventITCloseTimer.current)  clearTimeout(eventITCloseTimer.current)
    setEventITOpen(false)
    setServicesOpen(true)
  }
  const scheduleCloseServices = () => {
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
    servicesCloseTimer.current = setTimeout(() => setServicesOpen(false), 150)
  }

  const openEventIT = () => {
    if (eventITCloseTimer.current)  clearTimeout(eventITCloseTimer.current)
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
    setServicesOpen(false)
    setEventITOpen(true)
  }
  const scheduleCloseEventIT = () => {
    if (eventITCloseTimer.current) clearTimeout(eventITCloseTimer.current)
    eventITCloseTimer.current = setTimeout(() => setEventITOpen(false), 150)
  }

  // Synchronous close — attached to every Link onClick inside the dropdowns so
  // the dropdown disappears before the new page renders (not after first paint).
  const closeAll = () => {
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
    if (eventITCloseTimer.current)  clearTimeout(eventITCloseTimer.current)
    setServicesOpen(false)
    setEventITOpen(false)
  }

  const navLinks = [
    { label: 'Home',             href: '/' },
    { label: 'About',            href: '/about' },
    { label: 'Services',         href: '/services',              mega: true },
    { label: 'Industries',       href: '/industries' },
    { label: 'Cyber Advisory',   href: '/cybersecurity-advisory' },
    { label: 'Event IT',         href: '/event-it',              dropdown: true },
    { label: 'Rental Hub',       href: '/rental' },
    { label: 'Blog',             href: '/blog' },
    { label: 'Contact',          href: '/contact' },
  ]

  // Ordered list for mega-menu grid
  // Row 1: IT / Infra / Managed / Cyber  →  Row 2: Cloud / ELV / Email  + CTA slot
  const servicesOrder = ['it-consulting', 'infrastructure', 'managed-it', 'cybersecurity', 'cloud', 'elv', 'email-solutions']

  return (
    <>
      {/* Top info strip — slim blue band */}
      <div className="hidden md:block w-full text-[12.5px] text-white/85 border-b border-white/10" style={{ background: 'rgba(21,47,127,0.55)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-[1400px] mx-auto px-6 h-9 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><UAEFlag /><a href="tel:+97126766935" className="hover:text-white">+971 2 676 6935</a></span>
            <span className="flex items-center gap-1.5"><CanadaFlag /><a href="tel:+14167860782" className="hover:text-white">+1 416 786 0782</a></span>
            <span className="flex items-center gap-1.5"><Mail size={13}/><a href="mailto:info@ipcare.ae" className="hover:text-white">info@ipcare.ae</a></span>
            <span className="flex items-center gap-1.5"><Mail size={13}/><a href="mailto:info@ipcare.ca" className="hover:text-white">info@ipcare.ca</a></span>
          </div>
          <div className="flex items-center gap-3">
            <a href={SOCIAL.facebook}  target="_blank" rel="noopener noreferrer" aria-label="Facebook"  className="social-brand inline-flex items-center justify-center text-white" style={{ width: '28px', height: '28px', borderRadius: '9999px', background: '#1877F2' }}><FaFacebookF size={14}/></a>
            <a href={SOCIAL.linkedin}  target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"  className="social-brand inline-flex items-center justify-center text-white" style={{ width: '28px', height: '28px', borderRadius: '9999px', background: '#0A66C2' }}><FaLinkedinIn size={14}/></a>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-brand inline-flex items-center justify-center text-white" style={{ width: '28px', height: '28px', borderRadius: '9999px', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}><FaInstagram size={14}/></a>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          Main nav — always white, sticky top-0.

          KEY ARCHITECTURE CHANGE: both dropdown panels now live INSIDE this
          <nav> element as position:absolute children. This means:
            1. No DOM gap — mouse travels from nav-link <li> into the panel
               without leaving the nav element's hover zone.
            2. top:'100%' always equals bottom-of-nav at any scroll position
               (no navBottom state / measurement effect needed).
            3. click-outside uses a single navRef.contains() check that covers
               both nav links and the panel.
      ════════════════════════════════════════════════════════════════════════ */}
      <nav
        ref={navRef}
        className="sticky top-0 z-50"
        style={{
          background:   '#ffffff',
          borderBottom: '1px solid rgba(15,36,95,0.08)',
          boxShadow:    '0 2px 12px rgba(10,26,70,0.08)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" aria-label="IP Care Technologies home" className="flex items-center overflow-hidden">
            <Logo size={36} />
          </Link>

          {/* Desktop nav links.
              items-stretch + h-full: each <li> fills the full 72 px nav height.
              When the mouse moves downward from a link toward the dropdown panel
              it stays inside the <li> hitbox all the way to the nav's bottom
              edge — which is exactly where top:'100%' on the panel starts.
              No gap, no accidental timer fires. */}
          <ul className="hidden lg:flex items-stretch h-full gap-0.5">
            {navLinks.map((l) => (
              <li
                key={l.label}
                className="relative flex items-center"
                onMouseEnter={() => {
                  if      (l.mega)     openServices()
                  else if (l.dropdown) openEventIT()
                  else {
                    // Hovering any non-dropdown link schedules close so the
                    // open dropdown collapses as the cursor moves away.
                    scheduleCloseServices()
                    scheduleCloseEventIT()
                  }
                }}
                onMouseLeave={() => {
                  if      (l.mega)     scheduleCloseServices()
                  else if (l.dropdown) scheduleCloseEventIT()
                }}
              >
                <Link
                  href={l.href}
                  className={`px-3.5 py-2 text-[14px] font-medium transition-colors flex items-center gap-1 ${
                    isActive(l.href)
                      ? 'text-[#E87722] hover:text-[#E87722] font-semibold'
                      : 'text-[#0D2B55] hover:text-[#E87722]'
                  }`}
                >
                  {l.label}
                  {(l.mega || l.dropdown) && <ChevronDown size={12} className="opacity-60" />}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact" className="btn-primary nav-cta text-[14px]" style={{ padding: '10px 20px' }}>Contact Us <ArrowRight size={16}/></Link>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <button className="text-[#0D2B55]" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu size={26} />
            </button>
          </div>
        </div>

        {/* ── Services Mega Menu ─────────────────────────────────────────────
            position:absolute inside sticky nav.
            top:'100%'  → always snaps to the bottom of the nav bar.
            The panel's onMouseEnter cancels the close timer; onMouseLeave
            restarts it.  Every Link carries onClick={closeAll} so the dropdown
            disappears synchronously before the new page's first paint.
        ──────────────────────────────────────────────────────────────────── */}
        {servicesOpen && (
          <div
            className="hidden lg:flex absolute left-0 right-0 z-40 justify-center px-6"
            style={{ top: '100%' }}
            onMouseEnter={() => { if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current) }}
            onMouseLeave={scheduleCloseServices}
          >
            <div
              className="w-full py-10 px-12"
              style={{
                maxWidth: '1280px',
                background: '#ffffff',
                borderLeft:   '1px solid #E5E7EB',
                borderRight:  '1px solid #E5E7EB',
                borderBottom: '1px solid #E5E7EB',
                borderRadius: '0 0 14px 14px',
                boxShadow:    '0 24px 60px -15px rgba(8,20,52,0.25)',
                maxHeight:    'calc(100vh - 120px)',
                overflowY:    'auto',
              }}
            >
              {/* 4-col at xl (1280+), 3-col at lg (1024-1279) */}
              <div className="grid grid-cols-3 xl:grid-cols-4 gap-10">
                {servicesOrder.map((slug) => {
                  const cat = serviceCategories[slug]
                  if (!cat) return null
                  const Ic = iconMap[cat.icon] || Server
                  const categoryLabel = navLabels[slug]?._category || cat.name
                  return (
                    <div key={slug} className="space-y-2.5">
                      <Link
                        href={`/services/${slug}`}
                        onClick={closeAll}
                        className="flex gap-2.5 p-2.5 -ml-2.5 rounded-lg hover:bg-[#E87722]/8 transition-colors group"
                      >
                        <Ic className="text-[#E87722] mt-0.5 flex-shrink-0" size={18}/>
                        <div>
                          <div className="text-[#0D2B55] text-[14px] font-semibold leading-tight group-hover:text-[#E87722] transition-colors">{categoryLabel}</div>
                          <div className="text-[#6B7280] text-[11.5px] mt-0.5">{cat.short}</div>
                        </div>
                      </Link>
                      {cat.subpages && Object.keys(cat.subpages).length > 0 && (
                        <ul className="ml-7 space-y-1.5 border-l pl-3" style={{ borderColor: '#E5E7EB' }}>
                          {Object.entries(cat.subpages).map(([subSlug, sub]) => {
                            const displayLabel = navLabels[slug]?.[subSlug] || sub.h1
                            return (
                              <li key={subSlug}>
                                <Link
                                  href={`/services/${slug}/${subSlug}`}
                                  onClick={closeAll}
                                  className="text-[#4B5563] text-[12px] hover:text-[#E87722] transition-colors block"
                                >
                                  {displayLabel}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </div>
                  )
                })}

                {/* CTA card — 8th cell at xl, spans 2 cols at lg */}
                <div
                  className="col-span-2 xl:col-span-1 p-5 flex flex-col justify-between"
                  style={{
                    background:   'linear-gradient(135deg, #F3F6FC 0%, #EAEFF9 100%)',
                    borderRadius: '10px',
                    border:       '1px solid #E5E7EB',
                  }}
                >
                  <div>
                    <div className="text-[#0D2B55] text-[15px] font-semibold leading-snug">Need a custom solution?</div>
                    <div className="text-[#6B7280] text-[13px] mt-1.5">Talk to our enterprise team.</div>
                  </div>
                  <Link
                    href="/contact"
                    onClick={closeAll}
                    className="inline-flex items-center gap-1.5 text-[#E87722] font-medium text-[13px] mt-3 hover:gap-2 transition-all"
                  >
                    Contact Us <ArrowRight size={14}/>
                  </Link>
                </div>
              </div>

              {/* View All Services — bottom link */}
              <div className="mt-8 pt-5 text-center" style={{ borderTop: '1px solid #E5E7EB' }}>
                <Link
                  href="/services"
                  onClick={closeAll}
                  className="inline-flex items-center gap-1.5 text-[#E87722] font-semibold text-sm px-4 py-1.5 rounded-full border border-[#E87722]/50 bg-[#E87722]/5 hover:bg-[#E87722] hover:text-white hover:border-[#E87722] hover:gap-2.5 transition-all"
                >
                  View All Services <ArrowRight size={13}/>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── Event IT Dropdown ──────────────────────────────────────────────
            Same pattern: absolute inside sticky nav, onClick={closeAll} on
            every Link, mutual exclusion handled in openEventIT().
        ──────────────────────────────────────────────────────────────────── */}
        {eventITOpen && (
          <div
            className="hidden lg:flex absolute left-0 right-0 z-40 justify-center px-6"
            style={{ top: '100%' }}
            onMouseEnter={() => { if (eventITCloseTimer.current) clearTimeout(eventITCloseTimer.current) }}
            onMouseLeave={scheduleCloseEventIT}
          >
            <div
              className="w-full py-8 px-8"
              style={{
                maxWidth:     '440px',
                background:   '#ffffff',
                borderLeft:   '1px solid #E5E7EB',
                borderRight:  '1px solid #E5E7EB',
                borderBottom: '1px solid #E5E7EB',
                borderRadius: '0 0 14px 14px',
                boxShadow:    '0 24px 60px -15px rgba(8,20,52,0.25)',
              }}
            >
              <div className="space-y-2">
                <div className="flex gap-2.5 p-2.5 -ml-2.5 rounded-lg">
                  <Calendar className="text-[#E87722] mt-0.5 flex-shrink-0" size={18}/>
                  <div>
                    <div className="text-[#0D2B55] text-[14px] font-semibold leading-tight">Event IT Infrastructure</div>
                    <div className="text-[#6B7280] text-[11.5px] mt-0.5">Mission-critical IT infrastructure for world-class events</div>
                  </div>
                </div>
                <ul className="ml-7 space-y-1.5 border-l pl-3" style={{ borderColor: '#E5E7EB' }}>
                  <li><Link href="/event-it/portfolio"              onClick={closeAll} className="text-[#4B5563] text-[12px] hover:text-[#E87722] transition-colors block">Major Events Portfolio</Link></li>
                  <li><Link href="/event-it/event-wifi"             onClick={closeAll} className="text-[#4B5563] text-[12px] hover:text-[#E87722] transition-colors block">High-Density Event WiFi</Link></li>
                  <li><Link href="/event-it/temporary-data-centres" onClick={closeAll} className="text-[#4B5563] text-[12px] hover:text-[#E87722] transition-colors block">Temporary Data Centres</Link></li>
                  <li><Link href="/event-it/event-cctv"             onClick={closeAll} className="text-[#4B5563] text-[12px] hover:text-[#E87722] transition-colors block">Event CCTV & Security</Link></li>
                </ul>
              </div>
              <div className="mt-6 pt-4 text-center" style={{ borderTop: '1px solid #E5E7EB' }}>
                <Link
                  href="/contact"
                  onClick={closeAll}
                  className="inline-flex items-center gap-1.5 text-[#E87722] font-semibold text-sm hover:gap-2 transition-all"
                >
                  Plan Your Event IT <ArrowRight size={14}/>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col" style={{ background: '#ffffff' }}>
          <div className="flex items-center justify-between px-6 h-[72px] border-b overflow-hidden" style={{ borderColor: 'rgba(15,36,95,0.1)' }}>
            <Logo size={36}/>
            <button onClick={() => setMobileOpen(false)} className="text-[#0D2B55]" aria-label="Close menu"><X size={26}/></button>
          </div>
          <ul className="flex-1 flex flex-col items-center justify-center gap-6 px-6 overflow-auto">
            {navLinks.map((l) => (
              <li key={l.label}><Link href={l.href} onClick={() => setMobileOpen(false)} className="text-[#0D2B55] text-2xl font-semibold hover:text-[#E87722]">{l.label}</Link></li>
            ))}
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-primary mt-4">Contact Us <ArrowRight size={16}/></Link>
            <div className="flex items-center gap-4 mt-6">
              <a href={SOCIAL.facebook}  target="_blank" rel="noopener noreferrer" aria-label="Facebook"  className="social-brand inline-flex items-center justify-center text-white" style={{ width: '40px', height: '40px', borderRadius: '9999px', background: '#1877F2' }}><FaFacebookF size={20}/></a>
              <a href={SOCIAL.linkedin}  target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"  className="social-brand inline-flex items-center justify-center text-white" style={{ width: '40px', height: '40px', borderRadius: '9999px', background: '#0A66C2' }}><FaLinkedinIn size={20}/></a>
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-brand inline-flex items-center justify-center text-white" style={{ width: '40px', height: '40px', borderRadius: '9999px', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}><FaInstagram size={20}/></a>
            </div>
          </ul>
        </div>
      )}
    </>
  )
}
