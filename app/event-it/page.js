'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import * as Icons from 'lucide-react'

export default function EventITPage() {
  const [portfolioFilter, setPortfolioFilter] = useState('All Events')

  const portfolioCategories = ['All Events', 'Sports', 'Concerts', 'National']

  const events = [
    { name: 'FIFA Club World Cup', location: 'Abu Dhabi, UAE', year: '2022', tech: 'High-density WiFi, Temporary data centre, Tournament SOC, CCTV', category: 'Sports' },
    { name: 'UFC Events in UAE', location: 'Yas Island, Abu Dhabi', year: '2020–2025', tech: 'Arena WiFi, Live streaming infrastructure, Production LAN', category: 'Sports' },
    { name: 'NBA Abu Dhabi Games', location: 'Etihad Arena', year: '2022, 2023, 2024, 2025', tech: 'High-density WiFi 6E, NOC operations, Broadcast LAN', category: 'Sports' },
    { name: 'FINA World Swimming Championship', location: 'Etihad Arena, Abu Dhabi', year: '2021', tech: 'Aquatic-venue WiFi, Broadcast LAN, Results integration', category: 'Sports' },
    { name: 'WBA Light Heavyweight World Championship', location: 'Etihad Arena, Abu Dhabi', year: '2022', tech: 'Arena WiFi, Production LAN, Broadcast uplinks', category: 'Sports' },
    { name: 'World Tennis League', location: 'Coca-Cola Arena, Dubai', year: '2022, 2023', tech: 'Arena WiFi, Hawk-Eye integration, Broadcast LAN', category: 'Sports' },
    { name: 'Mubadala Abu Dhabi Open', location: 'Zayed Sports City', year: 'Annual', tech: 'Outdoor venue WiFi, Timing-system network, CCTV', category: 'Sports' },
    { name: 'Abu Dhabi Pedal Master', location: 'Hudayriat Island', year: '2023', tech: 'Course-side WiFi, PtP microwave, Timing network', category: 'Sports' },
    { name: 'Coldplay World Tour', location: 'Zayed Sports City, Abu Dhabi', year: '2024', tech: 'Outdoor 60K WiFi, PtP uplinks, RFID backhaul', category: 'Concerts' },
    { name: 'Saadiyat Nights', location: 'Saadiyat Island, Abu Dhabi', year: '2024, 2025', tech: 'Open-air WiFi, PtP microwave, CCTV', category: 'Concerts' },
    { name: 'IIFA Awards', location: 'Yas Island, Abu Dhabi', year: '2022, 2023, 2024', tech: 'Arena WiFi, Broadcast LAN, Press centre', category: 'Concerts' },
    { name: 'Ya Salam After Race Concert', location: 'Yas Island, Abu Dhabi', year: '2019–2024', tech: 'Festival WiFi, PtP backhaul, RFID', category: 'Concerts' },
    { name: 'Eid Al Fitr Concert', location: 'Yas Bay, Abu Dhabi', year: '2023', tech: 'Outdoor concert WiFi, Live stream uplink', category: 'Concerts' },
    { name: 'UAE Official National Day — 48th & 49th', location: 'Zayed Sports City + national venues', year: '2019, 2020', tech: 'Multi-venue WiFi, Federal CCTV, Government command-centre integration', category: 'National' },
  ]

  const services = [
    {
      title: 'High-Density Event WiFi',
      desc: 'WiFi 6/7, 10,000+ concurrent users supported, HPE Aruba and Cisco Meraki deployment',
      icon: 'Wifi',
    },
    {
      title: 'Temporary Data Centres',
      desc: 'Full NOC setup, rack infrastructure, power and cooling, rapid deployment',
      icon: 'Server',
    },
    {
      title: 'Event CCTV & Security',
      desc: 'IP cameras, live monitoring, NVR recording, PTZ coverage',
      icon: 'Video',
    },
    {
      title: 'Structured Cabling',
      desc: 'Rapid fibre and Cat6A deployment, certified testing, event-ready within 48 hours',
      icon: 'Cable',
    },
    {
      title: 'Point-to-Point Wireless Links',
      desc: 'Long-range wireless bridges, building-to-building connectivity, outdoor rated equipment',
      icon: 'Radio',
    },
    {
      title: 'Network Operations Centre',
      desc: '24/7 real-time monitoring during event, dedicated NOC team on-site, instant fault resolution',
      icon: 'Monitor',
    },
  ]

  const stats = [
    { number: '50+', label: 'Events Delivered' },
    { number: '100,000+', label: 'Concurrent Users Supported' },
    { number: '48hr', label: 'Rapid Deployment' },
    { number: '99.9%', label: 'Uptime During Events' },
  ]

  const partners = ['HPE Aruba', 'Cisco Meraki', 'Ruckus', 'Ubiquiti', 'Fluke Networks', 'Palo Alto']

  const process = [
    { n: '01', t: 'Consultation', d: 'Site survey and requirements gathering' },
    { n: '02', t: 'Design', d: 'Network architecture and equipment plan' },
    { n: '03', t: 'Deployment', d: 'Certified engineers on-site setup' },
    { n: '04', t: 'Live Support', d: '24/7 NOC monitoring during event' },
  ]

  const filteredEvents = portfolioFilter === 'All Events' 
    ? events 
    : events.filter(e => e.category === portfolioFilter)

  const Ic = ({ name, ...rest }) => {
    const Component = Icons[name] || Icons.Check
    return <Component {...rest} />
  }

  return (
    <>
      <Header />
      <main>
        {/* 1. Hero Section */}
        <section className="relative py-20 md:py-32 px-6 overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-3xl opacity-25" style={{ background: 'radial-gradient(circle, #E87722 0%, transparent 70%)' }}/>
          </div>
          <div className="relative max-w-[1200px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.35)' }}>
              <Icons.Tv size={14} className="text-[#E87722]"/>
              <span className="text-[#E87722] text-xs font-semibold uppercase tracking-wider">Event IT Infrastructure</span>
            </div>
            
            <div className="glass-card p-10 md:p-14 max-w-5xl mx-auto">
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
                Mission-Critical IT Infrastructure for the World's Biggest Events
              </h1>
              <p className="body-text text-lg md:text-xl mb-8">
                Trusted on FIFA Club World Cup, UFC UAE, NBA Abu Dhabi Games, FINA World Swimming Championship, IIFA Awards, Coldplay, Saadiyat Nights and the UAE Official National Day events — delivering enterprise-grade event technology since 2003
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact" className="btn-primary">
                  Plan Your Event IT <Icons.ArrowRight size={16}/>
                </Link>
                <Link href="/event-it/portfolio" className="btn-ghost">
                  View Our Portfolio <Icons.FolderOpen size={14}/>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Events Portfolio Grid */}
        <section className="py-16 md:py-20 px-6" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-white text-3xl md:text-4xl font-bold heading-accent mb-4">Major Events Powered</h2>
              <p className="body-text max-w-2xl mx-auto">Delivering enterprise-grade IT infrastructure for world-class events</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {portfolioCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPortfolioFilter(cat)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    portfolioFilter === cat
                      ? 'bg-[#E87722] text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Event Cards */}
            <div className="grid md:grid-cols-3 gap-5">
              {filteredEvents.map((event, i) => (
                <div key={i} className="glass-card overflow-hidden group">
                  <div className="h-48 flex items-center justify-center relative" style={{ background: 'linear-gradient(135deg, rgba(232,119,34,0.15) 0%, rgba(27,108,168,0.15) 100%)' }}>
                    <Icons.Play size={64} className="text-white/20"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,16,42,0.95)] to-transparent opacity-80"/>
                  </div>
                  <div className="p-6">
                    <h3 className="text-white text-lg font-bold mb-2">{event.name}</h3>
                    <div className="flex items-center gap-2 mb-3 text-white/60 text-sm">
                      <Icons.MapPin size={14}/>
                      <span>{event.location}</span>
                      <span>•</span>
                      <span>{event.year}</span>
                    </div>
                    <p className="body-text text-sm mb-4">{event.tech}</p>
                    <span className="inline-flex items-center gap-1.5 text-[#E87722] text-sm font-semibold px-4 py-2 rounded-lg border border-[#E87722]/50 bg-[#E87722]/5 group-hover:bg-[#E87722] group-hover:text-white group-hover:border-[#E87722] group-hover:gap-2.5 transition-all">
                      View Case Study <Icons.ArrowRight size={14}/>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Event Services Grid */}
        <section className="py-16 md:py-20 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-white text-3xl md:text-4xl font-bold heading-accent">End-to-End Event IT Services</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {services.map((service, i) => (
                <div key={i} className="glass-card p-7">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.3)' }}>
                    <Ic name={service.icon} size={22} className="text-[#E87722]"/>
                  </div>
                  <h3 className="text-white text-lg font-bold mb-2">{service.title}</h3>
                  <p className="body-text text-sm leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Capability Stats */}
        <section className="py-16 md:py-20 px-6" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {stats.map((stat, i) => (
                <div key={i} className="glass-card p-8 text-center">
                  <div className="text-[#E87722] text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-white/70 text-sm font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Technology Partners */}
        <section className="py-16 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-white text-3xl md:text-4xl font-bold heading-accent">Technology We Deploy</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {partners.map((partner) => (
                <div key={partner} className="glass-card px-8 py-5">
                  <div className="text-white text-lg font-bold">{partner}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. How We Work */}
        <section className="py-16 md:py-20 px-6" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
          <div className="max-w-[1300px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-white text-3xl md:text-4xl font-bold heading-accent">How It Works</h2>
              <p className="body-text mt-4">From planning to live support — our proven event delivery process</p>
            </div>
            <div className="grid md:grid-cols-4 gap-5 relative">
              <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.5), transparent)' }}/>
              {process.map((s, i) => (
                <div key={i} className="relative">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 text-white font-bold relative z-10" style={{ background: '#E87722', boxShadow: '0 0 0 6px rgba(232,119,34,0.15)' }}>
                    {s.n}
                  </div>
                  <div className="text-center">
                    <h3 className="text-white font-semibold text-lg mb-2">{s.t}</h3>
                    <p className="body-text text-sm">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Bottom CTA */}
        <section className="py-16 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="rounded-2xl p-10 md:p-14 text-center" style={{ background: 'rgba(232,119,34,0.07)', border: '1px solid rgba(232,119,34,0.28)', backdropFilter: 'blur(12px)' }}>
              <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Ready to Power Your Next Event?</h2>
              <p className="body-text max-w-2xl mx-auto mb-8">From intimate corporate gatherings to stadium-scale productions — UAE & Canada</p>
              <Link href="/contact" className="btn-primary text-lg">
                Get an Event Quote <Icons.ArrowRight size={18}/>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
