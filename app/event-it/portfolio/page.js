'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import * as Icons from 'lucide-react'

export default function EventPortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const categories = ['All', 'Sports', 'Concerts', 'National', 'WiFi Deployments', 'CCTV & Security']

  const events = [
    { id: 1, name: 'FIFA Club World Cup 2022', location: 'Abu Dhabi, UAE', year: '2022', services: 'High-density WiFi, Temporary data centre, Tournament SOC', tech: 'HPE Aruba, Cisco', category: ['Sports', 'WiFi Deployments', 'CCTV & Security'], img: '/events/fifa-club-world-cup.png' },
    { id: 2, name: 'UFC Events in UAE (2020–2025)', location: 'Yas Island, Abu Dhabi', year: '2020–2025', services: 'Arena WiFi, Production LAN, Live streaming', tech: 'Cisco Meraki, Palo Alto', category: ['Sports', 'WiFi Deployments'], img: '/events/ufc-uae.jpeg' },
    { id: 3, name: 'FINA World Swimming Championship', location: 'Etihad Arena, Abu Dhabi', year: '2021', services: 'Aquatic-venue WiFi, Broadcast LAN', tech: 'HPE Aruba, Cisco', category: ['Sports', 'WiFi Deployments'], img: '/events/fina-world-swimming-championship.png' },
    { id: 4, name: 'NBA Abu Dhabi Games (2022–2025)', location: 'Etihad Arena, Abu Dhabi', year: '2022, 2023, 2024, 2025', services: 'Arena WiFi 6E, NOC operations', tech: 'HPE Aruba, Ruckus', category: ['Sports', 'WiFi Deployments'], img: '/events/nba-abu-dhabi-games.png' },
    { id: 15, name: 'Turkish Airlines EuroLeague Final Four 2025', location: 'Etihad Arena, Abu Dhabi', year: '23–25 May 2025', services: 'EuroLeague broadcast LAN, multi-language commentary, timing & statistics integration', tech: 'HPE Aruba, Cisco Catalyst, Palo Alto', category: ['Sports', 'WiFi Deployments'], img: '/events/euroleague-final-four-2025.png' },
    { id: 5, name: 'WBA Light Heavyweight World Championship', location: 'Etihad Arena, Abu Dhabi', year: '2022', services: 'Arena WiFi, Broadcast uplinks', tech: 'HPE Aruba, Cisco', category: ['Sports', 'WiFi Deployments'], img: '/events/wba-light-heavyweight-championship.png' },
    { id: 6, name: 'World Tennis League (2022, 2023)', location: 'Coca-Cola Arena, Dubai', year: '2022, 2023', services: 'Arena WiFi, Hawk-Eye integration', tech: 'Cisco Meraki, HPE Aruba', category: ['Sports', 'WiFi Deployments'], img: '/events/world-tennis-league.png' },
    { id: 7, name: 'Mubadala Abu Dhabi Open', location: 'Zayed Sports City', year: 'Annual', services: 'Outdoor venue WiFi, Timing-system network', tech: 'HPE Aruba, Fluke', category: ['Sports', 'WiFi Deployments'], img: '/events/mubadala-abu-dhabi-open.png' },
    { id: 8, name: 'Abu Dhabi Padel Master', location: 'Hudayriat Island, Abu Dhabi', year: '2023', services: 'Multi-court WiFi, Broadcast LAN, Court-side connectivity, Ball-tracking integration', tech: 'HPE Aruba, Cisco', category: ['Sports', 'WiFi Deployments'], img: '/events/abu-dhabi-padel-master.jpeg' },
    { id: 9, name: 'UAE Official National Day — 48th & 49th', location: 'Zayed Sports City + national venues', year: '2019, 2020', services: 'Multi-venue WiFi, Federal CCTV, Command-centre integration', tech: 'HPE Aruba, Hikvision, Cisco', category: ['National', 'WiFi Deployments', 'CCTV & Security'], img: '/events/uae-national-day.png' },
    { id: 10, name: 'Ya Salam After Race Concert (2019–2024)', location: 'Yas Island, Abu Dhabi', year: '2019–2024', services: 'Outdoor festival WiFi, PtP backhaul, RFID', tech: 'HPE Aruba, Ruckus', category: ['Concerts', 'WiFi Deployments'], img: '/events/ya-salam-after-race-concert.png' },
    { id: 11, name: 'IIFA Awards (2022–2024)', location: 'Yas Island, Abu Dhabi', year: '2022, 2023, 2024', services: 'Arena WiFi, Broadcast LAN, Press centre', tech: 'HPE Aruba, Cisco', category: ['Concerts', 'WiFi Deployments'], img: '/events/iifa-awards.jpg' },
    { id: 12, name: 'Eid Al Fitr Concert 2023', location: 'Yas Bay, Abu Dhabi', year: '2023', services: 'Outdoor concert WiFi, Live stream uplink', tech: 'HPE Aruba, Cisco', category: ['Concerts', 'WiFi Deployments'] },
    { id: 13, name: 'Saadiyat Nights (2024, 2025)', location: 'Saadiyat Island, Abu Dhabi', year: '2024, 2025', services: 'Open-air WiFi, PtP microwave, CCTV', tech: 'HPE Aruba, Hikvision', category: ['Concerts', 'WiFi Deployments', 'CCTV & Security'], img: '/events/saadiyat-nights.png' },
    { id: 14, name: 'Coldplay World Tour', location: 'Zayed Sports City, Abu Dhabi', year: '2024', services: 'Outdoor 60K-attendee WiFi, RFID backhaul', tech: 'HPE Aruba, Fluke', category: ['Concerts', 'WiFi Deployments'], img: '/events/coldplay-world-tour.png' },
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
                    <div className="h-48 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(232,119,34,0.15) 0%, rgba(27,108,168,0.15) 100%)' }}>
                      {event.img ? (
                        <img src={event.img} alt={event.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icons.Play size={64} className="text-white/20"/>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,16,42,0.95)] to-transparent opacity-80 pointer-events-none"/>
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
                      <span className="inline-flex items-center gap-1.5 text-[#E87722] text-sm font-semibold px-4 py-2 rounded-lg border border-[#E87722]/50 bg-[#E87722]/5 group-hover:bg-[#E87722] group-hover:text-white group-hover:border-[#E87722] group-hover:gap-2.5 transition-all">
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
