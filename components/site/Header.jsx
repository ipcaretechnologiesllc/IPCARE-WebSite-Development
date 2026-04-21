'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Menu, X, Mail, Facebook, Linkedin, Instagram,
  Server, Lock, Cable, Calendar, Network, Cloud, Briefcase, Code, TrendingUp, AtSign, Shield, ChevronDown
} from 'lucide-react'
import Logo, { UAEFlag, CanadaFlag } from './Logo'
import { serviceCategories } from '@/lib/services-data'

const iconMap = { Server, Lock, Cable, Calendar, Network, Cloud, Briefcase, Code, TrendingUp, AtSign, Shield }

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
    { label: 'About', href: '/#about' },
    { label: 'Services', href: '/services', mega: true },
    { label: 'Cyber Advisory', href: '/cybersecurity-advisory' },
    { label: 'Event IT', href: '/#events' },
    { label: 'Rental Hub', href: '/#rental' },
    { label: 'Contact', href: '/#contact' },
  ]

  const categories = Object.entries(serviceCategories)

  return (
    <>
      <div className="hidden md:block w-full text-[12.5px] text-white/70 border-b border-white/5" style={{ background: 'rgba(7,16,42,0.6)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-[1400px] mx-auto px-6 h-9 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><UAEFlag /> <a href="tel:+97126766935" className="hover:text-white">+971 2 676 6935</a></span>
            <span className="flex items-center gap-1.5"><CanadaFlag /> <a href="tel:+14165550199" className="hover:text-white">+1 416 555 0199</a></span>
            <span className="flex items-center gap-1.5"><Mail size={13}/> <a href="mailto:info@ipcare.ae" className="hover:text-white">info@ipcare.ae</a></span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="hover:text-[#E87722]"><Facebook size={14}/></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-[#E87722]"><Linkedin size={14}/></a>
            <a href="#" aria-label="Instagram" className="hover:text-[#E87722]"><Instagram size={14}/></a>
          </div>
        </div>
      </div>

      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" aria-label="IP Care Technologies home"><Logo size={30} /></Link>

          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.label} className="relative" onMouseEnter={() => l.mega && setServicesOpen(true)} onMouseLeave={() => l.mega && setServicesOpen(false)}>
                <Link href={l.href} className="px-4 py-2 text-[14px] text-white/85 hover:text-white transition-colors flex items-center gap-1">
                  {l.label}
                  {l.mega && <ChevronDown size={12} className="opacity-60" />}
                </Link>
                {l.mega && servicesOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[820px] p-6 rounded-xl grid grid-cols-3 gap-3" style={{ background: 'rgba(7,16,42,0.97)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)' }}>
                    {categories.map(([slug, cat]) => {
                      const Ic = iconMap[cat.icon] || Server
                      return (
                        <Link key={slug} href={`/services/${slug}`} className="flex gap-3 p-3 rounded-lg hover:bg-white/5">
                          <Ic className="text-[#E87722] mt-0.5 flex-shrink-0" size={20}/>
                          <div>
                            <div className="text-white text-[13.5px] font-semibold">{cat.name}</div>
                            <div className="text-white/60 text-[12px]">{cat.short}</div>
                          </div>
                        </Link>
                      )
                    })}
                    <Link href="/services" className="flex gap-3 p-3 rounded-lg hover:bg-[#E87722]/20 col-span-3 text-center justify-center items-center border border-[#E87722]/30 mt-2">
                      <span className="text-[#E87722] font-semibold text-sm">View all services <ArrowRight size={14} className="inline"/></span>
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Link href="/#contact" className="btn-primary text-[14px]" style={{ padding: '10px 20px' }}>Contact Us <ArrowRight size={16}/></Link>
          </div>

          <button className="lg:hidden text-white" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col" style={{ background: 'rgba(4,10,24,0.98)', backdropFilter: 'blur(20px)' }}>
          <div className="flex items-center justify-between px-6 h-[72px] border-b border-white/10">
            <Logo size={30}/>
            <button onClick={() => setMobileOpen(false)} className="text-white" aria-label="Close menu"><X size={26}/></button>
          </div>
          <ul className="flex-1 flex flex-col items-center justify-center gap-6 px-6 overflow-auto">
            {navLinks.map((l) => (
              <li key={l.label}><Link href={l.href} onClick={() => setMobileOpen(false)} className="text-white text-2xl font-semibold hover:text-[#E87722]">{l.label}</Link></li>
            ))}
            <Link href="/#contact" onClick={() => setMobileOpen(false)} className="btn-primary mt-4">Contact Us <ArrowRight size={16}/></Link>
          </ul>
        </div>
      )}
    </>
  )
}
