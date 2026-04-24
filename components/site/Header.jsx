'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
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
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [eventITOpen, setEventITOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services', mega: true },
    { label: 'Cyber Advisory', href: '/cybersecurity-advisory' },
    { label: 'Event IT', href: '/event-it', dropdown: true },
    { label: 'Rental Hub', href: '/rental' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ]

  const eventITLinks = [
    { label: 'Major Events Portfolio', href: '/event-it/portfolio' },
    { label: 'High-Density Event WiFi', href: '/event-it/event-wifi' },
    { label: 'Temporary Data Centres', href: '/event-it/temporary-data-centres' },
    { label: 'Event CCTV & Security', href: '/event-it/event-cctv' },
    { label: 'Plan Your Event IT', href: '/contact', accent: true },
  ]

  const categories = Object.entries(serviceCategories)

  return (
    <>
      {/* Top info strip — slim blue band */}
      <div className="hidden md:block w-full text-[12.5px] text-white/85 border-b border-white/10" style={{ background: 'rgba(21,47,127,0.55)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-[1400px] mx-auto px-6 h-9 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><UAEFlag /><a href="tel:+97126766935" className="hover:text-white">+971 2 676 6935</a></span>
            <span className="flex items-center gap-1.5"><CanadaFlag /><a href="tel:+14167860782" className="hover:text-white">+1 416 786 0782</a></span>
            <span className="flex items-center gap-1.5"><Mail size={13}/><a href="mailto:info@ipcare.ae" className="hover:text-white">info@ipcare.ae</a></span>
          </div>
          <div className="flex items-center gap-3">
            <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/75 hover:text-white transition-colors"><FaFacebookF size={20}/></a>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/75 hover:text-white transition-colors"><FaLinkedinIn size={20}/></a>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/75 hover:text-white transition-colors"><FaInstagram size={20}/></a>
          </div>
        </div>
      </div>

      {/* Main nav — DARK / TRANSPARENT GLASS (matches site dark theme) */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-[0_4px_20px_-6px_rgba(0,0,0,0.35)]' : ''}`}
        style={{ background: 'rgba(11,26,70,0.72)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" aria-label="IP Care Technologies home" className="flex items-center overflow-hidden">
            <Logo size={36} />
          </Link>

          <ul className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((l) => (
              <li 
                key={l.label} 
                className="relative" 
                onMouseEnter={() => {
                  if (l.mega) setServicesOpen(true)
                  if (l.dropdown) setEventITOpen(true)
                }} 
                onMouseLeave={() => {
                  if (l.mega) setServicesOpen(false)
                  if (l.dropdown) setEventITOpen(false)
                }}
              >
                <Link 
                  href={l.href} 
                  className={`px-3.5 py-2 text-[14px] font-medium transition-colors flex items-center gap-1 ${
                    l.label === 'Cyber Advisory' 
                      ? 'text-[#F97316] hover:text-[#E87722] font-semibold' 
                      : 'text-white/85 hover:text-[#F97316]'
                  }`}
                >
                  {l.label}
                  {(l.mega || l.dropdown) && <ChevronDown size={12} className="opacity-60" />}
                </Link>
                
                {/* Services Mega Menu — DARK GLASS */}
                {l.mega && servicesOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[1100px] p-7 rounded-xl" style={{ background: 'rgba(15,23,52,0.92)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.10)', boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6)', maxHeight: '85vh', overflowY: 'auto' }}>
                    <div className="grid grid-cols-3 gap-6">
                      {categories.map(([slug, cat]) => {
                        const Ic = iconMap[cat.icon] || Server
                        const categoryLabel = navLabels[slug]?._category || cat.name
                        return (
                          <div key={slug} className="space-y-2">
                            <Link href={`/services/${slug}`} className="flex gap-2.5 p-2.5 rounded-lg hover:bg-[#E87722]/10 transition-colors group">
                              <Ic className="text-[#E87722] mt-0.5 flex-shrink-0" size={18}/>
                              <div>
                                <div className="text-white text-[13.5px] font-semibold group-hover:text-[#E87722] transition-colors">{categoryLabel}</div>
                                <div className="text-white/60 text-[11.5px]">{cat.short}</div>
                              </div>
                            </Link>
                            {cat.subpages && Object.keys(cat.subpages).length > 0 && (
                              <ul className="ml-7 space-y-1.5 border-l pl-3" style={{ borderColor: 'rgba(255,255,255,0.10)' }}>
                                {Object.entries(cat.subpages).map(([subSlug, sub]) => {
                                  const displayLabel = navLabels[slug]?.[subSlug] || sub.h1
                                  return (
                                    <li key={subSlug}>
                                      <Link 
                                        href={`/services/${slug}/${subSlug}`} 
                                        className="text-white/75 text-[12px] hover:text-[#E87722] transition-colors block"
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
                    </div>
                    <Link href="/services" className="flex gap-2 p-3 rounded-lg hover:bg-[#E87722]/10 text-center justify-center items-center border mt-5 transition-colors" style={{ borderColor: 'rgba(232,119,34,0.35)' }}>
                      <span className="text-[#E87722] font-semibold text-sm">View All Services <ArrowRight size={14} className="inline"/></span>
                    </Link>
                  </div>
                )}
                
                {/* Event IT Dropdown — DARK GLASS */}
                {l.dropdown && eventITOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[420px] p-7 rounded-xl" style={{ background: 'rgba(15,23,52,0.92)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.10)', boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6)' }}>
                    <div className="space-y-2">
                      <div className="flex gap-2.5 p-2.5 rounded-lg">
                        <Calendar className="text-[#E87722] mt-0.5 flex-shrink-0" size={18}/>
                        <div>
                          <div className="text-white text-[13.5px] font-semibold">Event IT Infrastructure</div>
                          <div className="text-white/60 text-[11.5px]">Mission-critical IT infrastructure for world-class events</div>
                        </div>
                      </div>
                      <ul className="ml-7 space-y-1.5 border-l pl-3" style={{ borderColor: 'rgba(255,255,255,0.10)' }}>
                        <li>
                          <Link 
                            href="/event-it/portfolio" 
                            className="text-white/75 text-[12px] hover:text-[#E87722] transition-colors block"
                          >
                            Major Events Portfolio
                          </Link>
                        </li>
                        <li>
                          <Link 
                            href="/event-it/event-wifi" 
                            className="text-white/75 text-[12px] hover:text-[#E87722] transition-colors block"
                          >
                            High-Density Event WiFi
                          </Link>
                        </li>
                        <li>
                          <Link 
                            href="/event-it/temporary-data-centres" 
                            className="text-white/75 text-[12px] hover:text-[#E87722] transition-colors block"
                          >
                            Temporary Data Centres
                          </Link>
                        </li>
                        <li>
                          <Link 
                            href="/event-it/event-cctv" 
                            className="text-white/75 text-[12px] hover:text-[#E87722] transition-colors block"
                          >
                            Event CCTV & Security
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <Link href="/contact" className="flex gap-2 p-3 rounded-lg hover:bg-[#E87722]/10 text-center justify-center items-center border mt-5 transition-colors" style={{ borderColor: 'rgba(232,119,34,0.35)' }}>
                      <span className="text-[#E87722] font-semibold text-sm">Plan Your Event IT <ArrowRight size={14} className="inline"/></span>
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact" className="btn-primary text-[14px]" style={{ padding: '10px 20px' }}>Contact Us <ArrowRight size={16}/></Link>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <button className="text-white/90" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu size={26} />
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col" style={{ background: 'rgba(7,16,42,0.98)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}>
          <div className="flex items-center justify-between px-6 h-[72px] border-b overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.10)' }}>
            <Logo size={36}/>
            <button onClick={() => setMobileOpen(false)} className="text-white/90" aria-label="Close menu"><X size={26}/></button>
          </div>
          <ul className="flex-1 flex flex-col items-center justify-center gap-6 px-6 overflow-auto">
            {navLinks.map((l) => (
              <li key={l.label}><Link href={l.href} onClick={() => setMobileOpen(false)} className="text-white text-2xl font-semibold hover:text-[#E87722]">{l.label}</Link></li>
            ))}
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-primary mt-4">Contact Us <ArrowRight size={16}/></Link>
            <div className="flex items-center gap-4 mt-6">
              <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/80 hover:text-[#E87722]"><FaFacebookF size={22}/></a>
              <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/80 hover:text-[#E87722]"><FaLinkedinIn size={22}/></a>
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/80 hover:text-[#E87722]"><FaInstagram size={22}/></a>
            </div>
          </ul>
        </div>
      )}
    </>
  )
}
