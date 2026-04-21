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
import CartButton from '@/components/rental/CartButton'

const iconMap = { Server, Lock, Cable, Calendar, Network, Cloud, Briefcase, Code, TrendingUp, AtSign, Shield }

const SOCIAL = {
  facebook: 'https://www.facebook.com/ipcareuae',
  linkedin: 'https://www.linkedin.com/company/ip-care-technologies',
  instagram: 'https://www.instagram.com/ipcaretechnologies/',
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

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
    { label: 'Event IT', href: '/event-it' },
    { label: 'Rental Hub', href: '/rental' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
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

      {/* Main nav — WHITE BACKGROUND */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-[0_4px_20px_-6px_rgba(8,20,52,0.18)]' : ''}`}
        style={{ background: '#ffffff', borderBottom: '1px solid rgba(15,36,95,0.08)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" aria-label="IP Care Technologies home" className="flex items-center">
            <Logo size={36} />
          </Link>

          <ul className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((l) => (
              <li key={l.label} className="relative" onMouseEnter={() => l.mega && setServicesOpen(true)} onMouseLeave={() => l.mega && setServicesOpen(false)}>
                <Link href={l.href} className="px-3.5 py-2 text-[14px] font-medium text-[#0F245F] hover:text-[#F97316] transition-colors flex items-center gap-1">
                  {l.label}
                  {l.mega && <ChevronDown size={12} className="opacity-60" />}
                </Link>
                {l.mega && servicesOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[1100px] p-7 rounded-xl" style={{ background: '#ffffff', border: '1px solid rgba(15,36,95,0.1)', boxShadow: '0 20px 50px -15px rgba(8,20,52,0.25)', maxHeight: '85vh', overflowY: 'auto' }}>
                    <div className="grid grid-cols-3 gap-6">
                      {categories.map(([slug, cat]) => {
                        const Ic = iconMap[cat.icon] || Server
                        return (
                          <div key={slug} className="space-y-2">
                            <Link href={`/services/${slug}`} className="flex gap-2.5 p-2.5 rounded-lg hover:bg-[#F97316]/8 transition-colors group">
                              <Ic className="text-[#F97316] mt-0.5 flex-shrink-0" size={18}/>
                              <div>
                                <div className="text-[#0F245F] text-[13.5px] font-bold group-hover:text-[#F97316] transition-colors">{cat.name}</div>
                                <div className="text-[#0F245F]/60 text-[11.5px]">{cat.short}</div>
                              </div>
                            </Link>
                            {cat.subpages && Object.keys(cat.subpages).length > 0 && (
                              <ul className="ml-7 space-y-1.5 border-l border-[#F97316]/20 pl-3">
                                {Object.entries(cat.subpages).map(([subSlug, sub]) => (
                                  <li key={subSlug}>
                                    <Link 
                                      href={`/services/${slug}/${subSlug}`} 
                                      className="text-[#0F245F]/70 text-[12px] hover:text-[#F97316] hover:underline transition-colors block"
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
                    </div>
                    <Link href="/services" className="flex gap-2 p-3 rounded-lg hover:bg-[#F97316]/10 text-center justify-center items-center border border-[#F97316]/30 mt-5">
                      <span className="text-[#F97316] font-semibold text-sm">View All Services <ArrowRight size={14} className="inline"/></span>
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <CartButton onLight />
            <Link href="/contact" className="btn-primary text-[14px]" style={{ padding: '10px 20px' }}>Contact Us <ArrowRight size={16}/></Link>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <CartButton onLight />
            <button className="text-[#0F245F]" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu size={26} />
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col" style={{ background: '#ffffff' }}>
          <div className="flex items-center justify-between px-6 h-[72px] border-b" style={{ borderColor: 'rgba(15,36,95,0.1)' }}>
            <Logo size={32}/>
            <button onClick={() => setMobileOpen(false)} className="text-[#0F245F]" aria-label="Close menu"><X size={26}/></button>
          </div>
          <ul className="flex-1 flex flex-col items-center justify-center gap-6 px-6 overflow-auto">
            {navLinks.map((l) => (
              <li key={l.label}><Link href={l.href} onClick={() => setMobileOpen(false)} className="text-[#0F245F] text-2xl font-semibold hover:text-[#F97316]">{l.label}</Link></li>
            ))}
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-primary mt-4">Contact Us <ArrowRight size={16}/></Link>
            <div className="flex items-center gap-4 mt-6">
              <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[#0F245F] hover:text-[#F97316]"><FaFacebookF size={22}/></a>
              <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#0F245F] hover:text-[#F97316]"><FaLinkedinIn size={22}/></a>
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#0F245F] hover:text-[#F97316]"><FaInstagram size={22}/></a>
            </div>
          </ul>
        </div>
      )}
    </>
  )
}
