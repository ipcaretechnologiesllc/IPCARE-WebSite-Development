'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ArrowRight, Menu, X, Mail, Phone,
  Server, Lock, Cable, Calendar, Network, Cloud, Briefcase, Code, Code2, TrendingUp, AtSign, Shield, ChevronDown,
  Terminal, BrainCircuit, Megaphone, Globe, Layers
} from 'lucide-react'
import { AnimatedNavItem } from '@/components/ui/hover-gradient-nav-bar'
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa'
import Logo, { UAEFlag, CanadaFlag } from './Logo'
import { navServiceCategories as serviceCategories, navCyberServices as cyberServices, navDigitalSolutionsCategories as digitalSolutionsCategories } from '@/lib/services-nav-data'
import { SOCIAL_LINKS } from '@/lib/social-links'
import { products } from '@/lib/products-data'

const iconMap = { Server, Lock, Cable, Calendar, Network, Cloud, Briefcase, Code, Code2, TrendingUp, AtSign, Shield, Terminal, BrainCircuit, Megaphone, Globe, Layers }

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
    'email-hosting': 'Email Hosting',
    'hybrid': 'Hybrid Cloud Mail',
  },
}

const SOCIAL = SOCIAL_LINKS

// Per-item gradient glow + accent color for the 3D flip hover animation.
// Only brand orange (#E87722) and brand blue shades are used — no off-palette colours.
const NAV_GRADIENTS = {
  '/':                       { gradient: 'radial-gradient(circle, rgba(46,100,216,0.20) 0%, rgba(30,58,138,0.08) 50%, rgba(15,29,69,0) 100%)',        accentColor: '#2E64D8' },
  '/about':                  { gradient: 'radial-gradient(circle, rgba(232,119,34,0.22) 0%, rgba(208,96,16,0.09) 50%, rgba(180,75,10,0) 100%)',        accentColor: '#E87722' },
  '/services':               { gradient: 'radial-gradient(circle, rgba(26,62,158,0.20) 0%, rgba(21,47,127,0.08) 50%, rgba(15,36,95,0) 100%)',          accentColor: '#1A3E9E' },
  '/portfolio':              { gradient: 'radial-gradient(circle, rgba(232,119,34,0.22) 0%, rgba(208,96,16,0.09) 50%, rgba(180,75,10,0) 100%)',        accentColor: '#E87722' },
  '/services/digital-solutions': { gradient: 'radial-gradient(circle, rgba(46,100,216,0.20) 0%, rgba(30,58,138,0.08) 50%, rgba(15,29,69,0) 100%)',   accentColor: '#2E64D8' },
  '/cybersecurity-advisory': { gradient: 'radial-gradient(circle, rgba(46,100,216,0.20) 0%, rgba(30,58,138,0.08) 50%, rgba(15,29,69,0) 100%)',        accentColor: '#2E64D8' },
  '/event-it':               { gradient: 'radial-gradient(circle, rgba(232,119,34,0.22) 0%, rgba(208,96,16,0.09) 50%, rgba(180,75,10,0) 100%)',        accentColor: '#E87722' },
  '/rental':                 { gradient: 'radial-gradient(circle, rgba(21,47,127,0.22) 0%, rgba(15,36,95,0.09) 50%, rgba(8,20,52,0) 100%)',            accentColor: '#152F7F' },
  '/contact':                { gradient: 'radial-gradient(circle, rgba(46,100,216,0.20) 0%, rgba(30,58,138,0.08) 50%, rgba(15,29,69,0) 100%)',         accentColor: '#2E64D8' },
}

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [portfolioOpen, setPortfolioOpen] = useState(false)
  const [digitalOpen,  setDigitalOpen]  = useState(false)
  const [eventITOpen,  setEventITOpen]  = useState(false)
  const [cyberOpen,    setCyberOpen]    = useState(false)
  const navRef = useRef(null)

  const isActive = (href) => {
    if (!pathname) return false
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  // Slugs whose cluster has menuGroup === 'digital-solutions' (e.g. 'web-development').
  // Derived from the imported nav data so new clusters get the right highlight automatically.
  const digitalSolutionsSlugs = Object.keys(digitalSolutionsCategories)

  // 'Services' is active on /services/* only when the cluster is NOT a digital-solutions cluster.
  const isServicesActive = () => {
    if (!pathname) return false
    if (pathname === '/services') return true
    if (pathname === '/services/digital-solutions') return false
    if (!pathname.startsWith('/services/')) return false
    const clusterSlug = pathname.split('/')[2]
    return !digitalSolutionsSlugs.includes(clusterSlug)
  }

  // 'Digital Solutions' is active when on /services/digital-solutions or any digital-solutions cluster page/subpage.
  const isDigitalSolutionsActive = () => {
    if (!pathname) return false
    if (pathname === '/services/digital-solutions') return true
    const clusterSlug = pathname.split('/')[2]
    return !!clusterSlug && digitalSolutionsSlugs.includes(clusterSlug)
  }

  // ─── Safety net: close everything on route change ─────────────────────────
  // Each page.js renders its own <Header>, so the component remounts on
  // navigation and state already resets. This effect handles the edge case
  // where Next.js reuses the instance (e.g. shallow routing).
  useEffect(() => {
    setServicesOpen(false)
    setPortfolioOpen(false)
    setDigitalOpen(false)
    setEventITOpen(false)
    setCyberOpen(false)
    setMobileOpen(false)
  }, [pathname])

  // ─── Click-outside closes all menus ──────────────────────────────────────
  // Dropdown panels live INSIDE navRef, so one contains() check covers all.
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) closeAll()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // ─── Escape key closes all menus ─────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeAll() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  // ─── Close helpers ────────────────────────────────────────────────────────
  // No timers. The nav's own onMouseLeave is the single reliable close trigger
  // (see the <nav> element below for the architectural explanation).
  const closeAll = () => { setServicesOpen(false); setPortfolioOpen(false); setDigitalOpen(false); setEventITOpen(false); setCyberOpen(false) }

  const navLinks = [
    { label: 'Home',              href: '/' },
    { label: 'About',             href: '/about' },
    { label: 'Services',          href: '/services',               mega: true },
    { label: 'Digital Solutions', href: '/services/digital-solutions', digital: true },
    { label: 'Cyber Advisory',    href: '/cybersecurity-advisory',  cyber: true },
    { label: 'Event IT',          href: '/event-it',               dropdown: true },
    { label: 'Rental Hub',        href: '/rental' },
    { label: 'Portfolio',         href: '/portfolio',              portfolio: true },
    { label: 'Contact',           href: '/contact' },
  ]

  // Ordered list for mega-menu grid
  // Row 1: IT / Infra / Managed / Cyber  →  Row 2: Cloud / ELV / Email  + CTA slot
  const servicesOrder = ['it-consulting', 'infrastructure', 'managed-it', 'cybersecurity', 'cloud', 'elv', 'email-solutions']

  // Products link list for the Digital Solutions mega-menu, data-driven so new
  // products appear automatically without further Header edits.
  const productNavItems = [
    { label: 'All Products', href: '/products' },
    ...Object.entries(products).map(([slug, p]) => ({ label: p.h1Accent || p.h1, href: `/products/${slug}` })),
  ]

  // ─── Mobile submenu chip data ───────────────────────────────────────────
  // Same source data as the desktop mega-menus, condensed to one flat list
  // of chips per top-level nav item (mobile has no room for a 4-column grid).
  const servicesSubItems = servicesOrder
    .filter((slug) => serviceCategories[slug])
    .map((slug) => ({ label: navLabels[slug]?._category || serviceCategories[slug].name, href: `/services/${slug}` }))

  const eventITSubItems = [
    { label: 'Major Events Portfolio',     href: '/event-it/portfolio' },
    { label: 'High-Density Event WiFi',    href: '/event-it/event-wifi' },
    { label: 'Temporary Data Centres',     href: '/event-it/temporary-data-centres' },
    { label: 'Event CCTV & Security',      href: '/event-it/event-cctv' },
  ]

  const cyberSubItems = [
    ...cyberServices.map((s) => ({ label: s.name, href: `/cybersecurity-advisory/${s.slug}` })),
    { label: 'Delivery Track Record', href: '/cybersecurity-advisory/track-record' },
  ]

  const portfolioSubItems = [
    { label: 'Enterprise Projects',   href: '/portfolio?category=enterprise' },
    { label: 'ELV & Security',        href: '/portfolio?service=cctv-access-control' },
    { label: 'Structured Cabling',    href: '/portfolio?service=structured-cabling' },
  ]

  const mobileSubItems = (l) => {
    if (l.mega)      return servicesSubItems
    if (l.digital)   return productNavItems
    if (l.dropdown)  return eventITSubItems
    if (l.cyber)     return cyberSubItems
    if (l.portfolio) return portfolioSubItems
    return null
  }

  return (
    <>
      {/* Top info strip — slim blue band */}
      <div className="hidden md:block w-full text-[12.5px] text-white/85 border-b border-white/10" style={{ background: 'rgba(21,47,127,0.55)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-[1400px] mx-auto px-6 h-9 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1"><UAEFlag /><span className="ml-1">UAE:</span><Phone size={12} className="ml-1.5"/><a href="tel:+97126766935" className="ml-0.5 hover:text-white">+971 2 676 6935</a><span className="mx-1 opacity-50">·</span><Mail size={12}/><a href="mailto:info@ipcare.ae" className="ml-0.5 hover:text-white">info@ipcare.ae</a></span>
            <span className="opacity-40 mx-1">|</span>
            <span className="flex items-center gap-1"><CanadaFlag /><span className="ml-1">Canada:</span><Phone size={12} className="ml-1.5"/><a href="tel:+14167860782" className="ml-0.5 hover:text-white">+1 416 786 0782</a><span className="mx-1 opacity-50">·</span><Mail size={12}/><a href="mailto:info@ipcare.ca" className="ml-0.5 hover:text-white">info@ipcare.ca</a></span>
          </div>
          <div className="flex items-center gap-3">
            <a href={SOCIAL.facebook}  target="_blank" rel="noopener noreferrer" aria-label="Facebook"  className="social-brand inline-flex items-center justify-center text-white" style={{ width: '28px', height: '28px', borderRadius: '9999px', background: '#1877F2' }}><FaFacebookF size={14}/></a>
            <a href={SOCIAL.linkedin}  target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"  className="social-brand inline-flex items-center justify-center text-white" style={{ width: '28px', height: '28px', borderRadius: '9999px', background: '#0A66C2' }}><FaLinkedinIn size={14}/></a>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-brand inline-flex items-center justify-center text-white" style={{ width: '28px', height: '28px', borderRadius: '9999px', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}><FaInstagram size={14}/></a>
            <a href={SOCIAL.youtube}   target="_blank" rel="noopener noreferrer" aria-label="YouTube"   className="social-brand inline-flex items-center justify-center text-white" style={{ width: '28px', height: '28px', borderRadius: '9999px', background: '#FF0000' }}><FaYoutube size={14}/></a>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          Main nav, always white, sticky top-0.

          ARCHITECTURE: Both dropdown panels are position:absolute children
          of this <nav>. Because of this, the browser's native `mouseleave`
          event fires on <nav> ONLY when the cursor exits the entire subtree
          (nav bar + dropdown panel together). Moving between the nav links
          and the panel stays inside the subtree. No event fires, no timers
          needed, no race conditions.

          Open:  onMouseEnter of the specific <li> → immediate setState
          Close: onMouseLeave of the whole <nav>   → immediate closeAll()
                 + click-outside, Escape key, route change (see effects above)
      ═══════════════════════════════════════════════════════════════════ */}
      <nav
        ref={navRef}
        className="sticky top-0 z-50"
        style={{
          background:   '#ffffff',
          borderBottom: '1px solid rgba(15,36,95,0.08)',
          boxShadow:    '0 2px 12px rgba(10,26,70,0.08)',
        }}
        onMouseLeave={closeAll}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" aria-label="IP Care Technologies home" className="flex items-center overflow-hidden">
            <Logo size={36} />
          </Link>

          {/* Desktop nav links.
              items-stretch + h-full: every <li> fills the full 72 px nav
              height, so there is zero gap between a link's hover zone and
              the dropdown panel that starts at top:100% of the nav. */}
          <ul className="hidden lg:flex items-stretch h-full gap-0.5">
            {navLinks.map((l) => {
              const { gradient, accentColor } = NAV_GRADIENTS[l.href] || NAV_GRADIENTS['/services']
              const active = l.mega
                ? isServicesActive()
                : l.digital
                  ? isDigitalSolutionsActive()
                  : isActive(l.href)
              const caret = (l.mega || l.dropdown || l.cyber || l.digital || l.portfolio)
                ? <ChevronDown size={12} className="opacity-60 flex-shrink-0" />
                : null
              return (
                <li
                  key={l.label}
                  className="relative flex items-center"
                  onMouseEnter={() => {
                    if      (l.mega)      { setPortfolioOpen(false); setDigitalOpen(false); setCyberOpen(false); setEventITOpen(false); setServicesOpen(true)  }
                    else if (l.portfolio) { setServicesOpen(false); setDigitalOpen(false); setCyberOpen(false); setEventITOpen(false); setPortfolioOpen(true)  }
                    else if (l.digital)   { setServicesOpen(false); setPortfolioOpen(false); setCyberOpen(false); setEventITOpen(false); setDigitalOpen(true)  }
                    else if (l.dropdown)  { setPortfolioOpen(false); setDigitalOpen(false); setCyberOpen(false); setServicesOpen(false); setEventITOpen(true)  }
                    else if (l.cyber)     { setPortfolioOpen(false); setDigitalOpen(false); setServicesOpen(false); setEventITOpen(false); setCyberOpen(true)  }
                    else                  { setServicesOpen(false); setPortfolioOpen(false); setDigitalOpen(false); setEventITOpen(false); setCyberOpen(false) }
                  }}
                >
                  <AnimatedNavItem
                    gradient={gradient}
                    frontContent={
                      <Link
                        href={l.href}
                        className={`px-3.5 py-2 text-[14px] font-medium flex items-center gap-1 ${
                          active ? 'text-[#E87722] font-semibold' : 'text-[#0D2B55]'
                        }`}
                      >
                        {l.label}{caret}
                      </Link>
                    }
                    backContent={
                      <Link
                        href={l.href}
                        className="px-3.5 py-2 text-[14px] font-semibold flex items-center gap-1"
                        style={{ color: active ? '#E87722' : accentColor }}
                      >
                        {l.label}{caret}
                      </Link>
                    }
                  />
                </li>
              )
            })}
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

        {/* ── Services Mega Menu ───────────────────────────────────────────
            position:absolute inside sticky nav → top:100% always snaps
            to the bottom of the nav bar at any scroll position.
            No hover handlers here. The parent <nav> onMouseLeave handles
            all closing. Every Link has onClick={closeAll} so the dropdown
            vanishes synchronously before the new page renders.
        ─────────────────────────────────────────────────────────────────── */}
        {servicesOpen && (
          <div
            className="hidden lg:flex absolute left-0 right-0 z-40 justify-center px-6"
            style={{ top: '100%' }}
          >
            <div
              className="w-full py-10 px-12"
              style={{
                maxWidth:     '1280px',
                background:   '#ffffff',
                borderLeft:   '1px solid #E5E7EB',
                borderRight:  '1px solid #E5E7EB',
                borderBottom: '1px solid #E5E7EB',
                borderRadius: '0 0 14px 14px',
                boxShadow:    '0 24px 60px -15px rgba(8,20,52,0.25)',
                maxHeight:    'calc(100vh - 120px)',
                overflowY:    'auto',
              }}
            >
              {/* 4-col at xl (1280+), 3-col at lg (1024–1279) */}
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

        {/* ── Digital Solutions Mega Menu ─────────────────────────────────
            Same architecture as Services: absolute inside sticky nav,
            data-driven from navDigitalSolutionsCategories, onClick={closeAll}
            on every Link. Today the panel shows one cluster (Web Development);
            additional clusters appear automatically as their pages are built.
        ─────────────────────────────────────────────────────────────────── */}
        {digitalOpen && (
          <div
            className="hidden lg:flex absolute left-0 right-0 z-40 justify-center px-6"
            style={{ top: '100%' }}
          >
            <div
              className="w-full py-10 px-12"
              style={{
                maxWidth:     '1280px',
                background:   '#ffffff',
                borderLeft:   '1px solid #E5E7EB',
                borderRight:  '1px solid #E5E7EB',
                borderBottom: '1px solid #E5E7EB',
                borderRadius: '0 0 14px 14px',
                boxShadow:    '0 24px 60px -15px rgba(8,20,52,0.25)',
                maxHeight:    'calc(100vh - 120px)',
                overflowY:    'auto',
              }}
            >
              <div className="grid grid-cols-3 xl:grid-cols-4 gap-10">
                {Object.entries(digitalSolutionsCategories).map(([slug, cat]) => {
                  const Ic = iconMap[cat.icon] || Code2
                  return (
                    <div key={slug} className="space-y-2.5">
                      <Link
                        href={`/services/${slug}`}
                        onClick={closeAll}
                        className="flex gap-2.5 p-2.5 -ml-2.5 rounded-lg hover:bg-[#E87722]/8 transition-colors group"
                      >
                        <Ic className="text-[#E87722] mt-0.5 flex-shrink-0" size={18}/>
                        <div>
                          <div className="text-[#0D2B55] text-[14px] font-semibold leading-tight group-hover:text-[#E87722] transition-colors">{cat.name}</div>
                          <div className="text-[#6B7280] text-[11.5px] mt-0.5">{cat.short}</div>
                        </div>
                      </Link>
                      {cat.subpages && Object.keys(cat.subpages).length > 0 && (
                        <ul className="ml-7 space-y-1.5 border-l pl-3" style={{ borderColor: '#E5E7EB' }}>
                          {Object.entries(cat.subpages).map(([subSlug, sub]) => (
                            <li key={subSlug}>
                              <Link
                                href={`/services/${slug}/${subSlug}`}
                                onClick={closeAll}
                                className="text-[#4B5563] text-[12px] hover:text-[#E87722] transition-colors block"
                              >
                                {sub.h1}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                })}

                {/* CTA card — same pattern as Services mega-menu */}
                <div
                  className="col-span-2 xl:col-span-1 p-5 flex flex-col justify-between"
                  style={{
                    background:   'linear-gradient(135deg, #F3F6FC 0%, #EAEFF9 100%)',
                    borderRadius: '10px',
                    border:       '1px solid #E5E7EB',
                  }}
                >
                  <div>
                    <div className="text-[#0D2B55] text-[15px] font-semibold leading-snug">Ready to build something?</div>
                    <div className="text-[#6B7280] text-[13px] mt-1.5">Talk to our development team.</div>
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

              {/* Products — separate row below the cluster columns, keeps the
                  3-column grid + CTA card untouched. Data-driven from
                  lib/products-data.js so new products appear automatically. */}
              <div className="mt-8 pt-6 flex items-center gap-6 flex-wrap" style={{ borderTop: '1px solid #E5E7EB' }}>
                <span className="text-[#0D2B55] text-[14px] font-semibold flex-shrink-0">Products</span>
                <div className="flex items-center gap-5 flex-wrap">
                  {productNavItems.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      onClick={closeAll}
                      className="text-[#4B5563] text-[12.5px] font-medium hover:text-[#E87722] transition-colors"
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Portfolio Dropdown ────────────────────────────────────────────
            Same architecture: absolute inside sticky nav, no panel-level
            hover handlers, onClick={closeAll} on every Link.
        ─────────────────────────────────────────────────────────────────── */}
        {portfolioOpen && (
          <div
            className="hidden lg:flex absolute left-0 right-0 z-40 justify-center px-6"
            style={{ top: '100%' }}
          >
            <div
              className="w-full py-8 px-8"
              style={{
                maxWidth:     '560px',
                background:   '#ffffff',
                borderLeft:   '1px solid #E5E7EB',
                borderRight:  '1px solid #E5E7EB',
                borderBottom: '1px solid #E5E7EB',
                borderRadius: '0 0 14px 14px',
                boxShadow:    '0 24px 60px -15px rgba(8,20,52,0.25)',
              }}
            >
              <Link
                href="/portfolio"
                onClick={closeAll}
                className="flex gap-2.5 p-2.5 -ml-2.5 rounded-lg hover:bg-[#E87722]/10 transition-colors group"
              >
                <Briefcase className="text-[#E87722] mt-0.5 flex-shrink-0" size={18}/>
                <div>
                  <div className="text-[#0D2B55] text-[14px] font-semibold leading-tight group-hover:text-[#E87722] transition-colors">Delivery Portfolio</div>
                  <div className="text-[#6B7280] text-[11.5px] mt-0.5">Enterprise facilities, ELV and installed infrastructure proof</div>
                </div>
              </Link>

              <div
                className="grid grid-cols-2 gap-x-6 gap-y-2 ml-7 mt-2 border-l pl-3"
                style={{ borderColor: '#E5E7EB' }}
              >
                <Link href="/portfolio" onClick={closeAll} className="text-[#4B5563] text-[12px] hover:text-[#E87722] transition-colors block py-0.5">Full Portfolio</Link>
                <Link href="/portfolio?category=enterprise" onClick={closeAll} className="text-[#4B5563] text-[12px] hover:text-[#E87722] transition-colors block py-0.5">Enterprise Projects</Link>
                <Link href="/portfolio?service=cctv-access-control" onClick={closeAll} className="text-[#4B5563] text-[12px] hover:text-[#E87722] transition-colors block py-0.5">ELV &amp; Security</Link>
                <Link href="/portfolio?service=structured-cabling" onClick={closeAll} className="text-[#4B5563] text-[12px] hover:text-[#E87722] transition-colors block py-0.5">Structured Cabling</Link>
              </div>

              <div className="mt-6 pt-4 flex items-center justify-between gap-4" style={{ borderTop: '1px solid #E5E7EB' }}>
                <div className="text-[#6B7280] text-[12px]">Filter proof by service, industry or project type.</div>
                <Link
                  href="/contact"
                  onClick={closeAll}
                  className="inline-flex items-center gap-1.5 text-[#E87722] font-semibold text-sm hover:gap-2 transition-all whitespace-nowrap"
                >
                  Discuss a Project <ArrowRight size={14}/>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Event IT Dropdown */}
        {eventITOpen && (
          <div
            className="hidden lg:flex absolute left-0 right-0 z-40 justify-center px-6"
            style={{ top: '100%' }}
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

        {/* ── Cyber Advisory Dropdown ──────────────────────────────────────
            Same architecture: absolute inside sticky nav, no panel-level
            hover handlers, onClick={closeAll} on every Link.
        ─────────────────────────────────────────────────────────────────── */}
        {cyberOpen && (
          <div
            className="hidden lg:flex absolute left-0 right-0 z-40 justify-center px-6"
            style={{ top: '100%' }}
          >
            <div
              className="w-full py-8 px-8"
              style={{
                maxWidth:     '560px',
                background:   '#ffffff',
                borderLeft:   '1px solid #E5E7EB',
                borderRight:  '1px solid #E5E7EB',
                borderBottom: '1px solid #E5E7EB',
                borderRadius: '0 0 14px 14px',
                boxShadow:    '0 24px 60px -15px rgba(8,20,52,0.25)',
              }}
            >
              {/* Overview — category header link */}
              <Link
                href="/cybersecurity-advisory"
                onClick={closeAll}
                className="flex gap-2.5 p-2.5 -ml-2.5 rounded-lg hover:bg-[#E87722]/8 transition-colors group mb-3"
              >
                <Shield className="text-[#E87722] mt-0.5 flex-shrink-0" size={18}/>
                <div>
                  <div className="text-[#0D2B55] text-[14px] font-semibold leading-tight group-hover:text-[#E87722] transition-colors">Cyber Advisory</div>
                  <div className="text-[#6B7280] text-[11.5px] mt-0.5">Zero Trust, SASE &amp; cloud security, by practitioners</div>
                </div>
              </Link>

              {/* 5 service links — 2-col grid */}
              <div
                className="grid grid-cols-2 gap-x-6 gap-y-1.5 ml-7 border-l pl-3"
                style={{ borderColor: '#E5E7EB' }}
              >
                {cyberServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/cybersecurity-advisory/${s.slug}`}
                    onClick={closeAll}
                    className="text-[#4B5563] text-[12px] hover:text-[#E87722] transition-colors block py-0.5"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>

              {/* Footer separator links */}
              <div className="mt-6 pt-4 flex flex-wrap items-center gap-x-6 gap-y-2" style={{ borderTop: '1px solid #E5E7EB' }}>
                <Link
                  href="/cybersecurity-advisory/track-record"
                  onClick={closeAll}
                  className="inline-flex items-center gap-1.5 text-[#E87722] font-semibold text-sm hover:gap-2 transition-all"
                >
                  Delivery Track Record <ArrowRight size={14}/>
                </Link>
                <Link
                  href="/cybersecurity-advisory/knowledge-base"
                  onClick={closeAll}
                  className="inline-flex items-center gap-1.5 text-[#E87722] font-semibold text-sm hover:gap-2 transition-all"
                >
                  Browse Knowledge Base <ArrowRight size={14}/>
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
          <ul className="flex-1 flex flex-col items-center justify-start gap-6 px-6 pt-10 pb-8 overflow-y-auto">
            {navLinks.map((l) => {
              const subItems = mobileSubItems(l)
              return (
                <li key={l.label} className="flex flex-col items-center w-full">
                  <Link href={l.href} onClick={() => setMobileOpen(false)} className="text-[#0D2B55] text-2xl font-semibold hover:text-[#E87722] inline-block py-2.5">{l.label}</Link>
                  {subItems && subItems.length > 0 && (
                    <div className="flex items-center gap-2.5 -mt-1 mb-2 flex-wrap justify-center max-w-[340px]">
                      {subItems.map((p) => (
                        <Link
                          key={p.href}
                          href={p.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-[#0D2B55] text-[13px] font-semibold px-4 py-2.5 rounded-full border border-[#E87722]/35 bg-[#E87722]/10 active:bg-[#E87722] active:text-white active:border-[#E87722] transition-colors"
                        >
                          {p.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              )
            })}
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-primary mt-4">Contact Us <ArrowRight size={16}/></Link>
            <div className="flex items-center gap-4 mt-6">
              <a href={SOCIAL.facebook}  target="_blank" rel="noopener noreferrer" aria-label="Facebook"  className="social-brand inline-flex items-center justify-center text-white" style={{ width: '40px', height: '40px', borderRadius: '9999px', background: '#1877F2' }}><FaFacebookF size={20}/></a>
              <a href={SOCIAL.linkedin}  target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"  className="social-brand inline-flex items-center justify-center text-white" style={{ width: '40px', height: '40px', borderRadius: '9999px', background: '#0A66C2' }}><FaLinkedinIn size={20}/></a>
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-brand inline-flex items-center justify-center text-white" style={{ width: '40px', height: '40px', borderRadius: '9999px', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}><FaInstagram size={20}/></a>
              <a href={SOCIAL.youtube}   target="_blank" rel="noopener noreferrer" aria-label="YouTube"   className="social-brand inline-flex items-center justify-center text-white" style={{ width: '40px', height: '40px', borderRadius: '9999px', background: '#FF0000' }}><FaYoutube size={20}/></a>
            </div>
          </ul>
        </div>
      )}
    </>
  )
}
