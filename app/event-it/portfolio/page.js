'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import * as Icons from 'lucide-react'

export default function EventPortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const categories = ['All', 'UAE Events', 'Canada Events', 'WiFi Deployments', 'CCTV & Security']

  const events = [
    { id: 1, name: 'FIFA Club World Cup 2021', location: 'Abu Dhabi, UAE', year: '2021', services: 'High-density WiFi, Temporary data centre', tech: 'HPE Aruba, Cisco', category: ['UAE Events', 'WiFi Deployments'] },
    { id: 2, name: 'UFC Fight Night', location: 'UAE', year: '2022', services: 'Event WiFi, Live streaming', tech: 'Cisco Meraki, Palo Alto', category: ['UAE Events', 'WiFi Deployments'] },
    { id: 3, name: 'NBA Global Games', location: 'UAE', year: '2023', services: 'High-density WiFi 6', tech: 'HPE Aruba, Ruckus', category: ['UAE Events', 'WiFi Deployments'] },
    { id: 4, name: 'Coldplay World Tour', location: 'UAE', year: '2023', services: 'Massive WiFi, Structured cabling', tech: 'HPE Aruba, Fluke', category: ['UAE Events', 'WiFi Deployments'] },
    { id: 5, name: 'Corporate Summit', location: 'Toronto, Canada', year: '2023', services: 'Event WiFi, Video conferencing', tech: 'Cisco Meraki', category: ['Canada Events', 'WiFi Deployments'] },
    { id: 6, name: 'Product Launch', location: 'Vancouver, Canada', year: '2024', services: 'WiFi, Streaming, CCTV', tech: 'HPE Aruba, Hikvision', category: ['Canada Events', 'WiFi Deployments', 'CCTV & Security'] },
    { id: 7, name: 'Trade Show UAE', location: 'Dubai, UAE', year: '2023', services: 'CCTV, Access control', tech: 'Hikvision, Suprema', category: ['UAE Events', 'CCTV & Security'] },
    { id: 8, name: 'Government Summit', location: 'Abu Dhabi, UAE', year: '2024', services: 'CCTV surveillance, WiFi', tech: 'Axis, HPE Aruba', category: ['UAE Events', 'CCTV & Security'] },
    { id: 9, name: 'Music Festival', location: 'Canada', year: '2024', services: 'WiFi 7, Point-to-point links', tech: 'Ubiquiti, Ruckus', category: ['Canada Events', 'WiFi Deployments'] },
    { id: 10, name: 'Sports Tournament', location: 'UAE', year: '2024', services: 'WiFi, CCTV, Data centre', tech: 'Cisco, Hikvision', category: ['UAE Events', 'WiFi Deployments', 'CCTV & Security'] },
    { id: 11, name: 'International Conference', location: 'Canada', year: '2023', services: 'Event WiFi, NOC setup', tech: 'HPE Aruba', category: ['Canada Events', 'WiFi Deployments'] },
    { id: 12, name: 'Stadium Opening', location: 'UAE', year: '2022', services: 'CCTV, WiFi, Security', tech: 'Hikvision, Cisco', category: ['UAE Events', 'CCTV & Security'] },
  ]

  const filteredEvents = activeFilter === 'All' 
    ? events 
    : events.filter(e => e.category.includes(activeFilter))

  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="max-w-[1400px] mx-auto px-6 pt-6">
          <nav className="text-xs text-white/50 flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <Icons.ChevronRight size={12}/>
            <Link href="/event-it" className="hover:text-white">Event IT</Link>
            <Icons.ChevronRight size={12}/>
            <span className="text-white/80">Portfolio</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="relative py-20 md:py-28 px-6">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, #E87722 0%, transparent 70%)' }}/>
          </div>
          <div className="relative max-w-[1100px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.35)' }}>
              <Icons.FolderOpen size={14} className="text-[#E87722]"/>
              <span className="text-[#E87722] text-xs font-semibold uppercase tracking-wider">Event Portfolio</span>
            </div>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">Major Events IT Portfolio — UAE & Canada</h1>
            <p className="body-text mt-6 text-base md:text-lg max-w-2xl mx-auto">Delivering enterprise-grade IT infrastructure for world-class events across UAE and Canada</p>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-8 px-6" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    activeFilter === cat
                      ? 'bg-[#E87722] text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {cat}
                  {cat !== 'All' && (
                    <span className="ml-2 text-xs opacity-70">
                      ({events.filter(e => e.category.includes(cat)).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-16 px-6">
          <div className="max-w-[1400px] mx-auto">
            {filteredEvents.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-5">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="glass-card overflow-hidden group hover:border-[#E87722]/40 transition-all">
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
                      <p className="body-text text-sm mb-2"><strong>Services:</strong> {event.services}</p>
                      <p className="body-text text-sm mb-4"><strong>Technology:</strong> {event.tech}</p>
                      <span className="inline-flex items-center gap-1.5 text-[#1B6CA8] text-sm font-semibold group-hover:gap-2.5 transition-all">
                        Read Case Study <Icons.ArrowRight size={14}/>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Icons.Search size={48} className="text-white/20 mx-auto mb-4"/>
                <p className="text-white/60 text-lg">No events found in this category</p>
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 px-6" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
          <div className="max-w-[1200px] mx-auto text-center">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Plan Your Event IT Infrastructure</h2>
            <p className="body-text max-w-2xl mx-auto mb-8">Get a custom quote for your upcoming event with our expert team</p>
            <Link href="/contact" className="btn-primary">
              Get an Event Quote <Icons.ArrowRight size={16}/>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
