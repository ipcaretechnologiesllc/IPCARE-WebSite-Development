'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import CTAPhoneButtons from '@/components/site/CTAPhoneButtons'
import * as Icons from 'lucide-react'

export default function EventPortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [videoModal, setVideoModal] = useState(null)

  const categories = ['All', 'Sports', 'Concerts', 'National', 'WiFi Deployments', 'CCTV & Security']

  const events = [
    { id: 1, name: 'FIFA Club World Cup 2022', slug: 'fifa-club-world-cup', location: 'Abu Dhabi, UAE', year: '2022', services: 'High-density WiFi, Temporary data centre, Tournament SOC', tech: 'HPE Aruba, Cisco', category: ['Sports', 'WiFi Deployments', 'CCTV & Security'], img: '/events/fifa-club-world-cup.webp' },
    { id: 2, name: 'UFC Events in UAE (2020–2025)', slug: 'ufc-uae', location: 'Yas Island, Abu Dhabi', year: '2020–2025', services: 'Arena WiFi, Production LAN, Live streaming', tech: 'Cisco Meraki, Palo Alto', category: ['Sports', 'WiFi Deployments'], img: '/events/ufc-uae.webp' },
    { id: 3, name: 'FINA World Swimming Championship', slug: 'fina-world-swimming-championship', location: 'Etihad Arena, Abu Dhabi', year: '2021', services: 'Aquatic-venue WiFi, Broadcast LAN', tech: 'HPE Aruba, Cisco', category: ['Sports', 'WiFi Deployments'], img: '/events/fina-world-swimming-championship.webp' },
    { id: 4, name: 'NBA Abu Dhabi Games (2022–2025)', slug: 'nba-abu-dhabi-games', location: 'Etihad Arena, Abu Dhabi', year: '2022, 2023, 2024, 2025', services: 'Arena WiFi 6E, NOC operations', tech: 'HPE Aruba, Ruckus', category: ['Sports', 'WiFi Deployments'], img: '/events/nba-abu-dhabi-games.webp' },
    { id: 15, name: 'Turkish Airlines EuroLeague Final Four 2025', slug: 'euroleague-final-four-2025', location: 'Etihad Arena, Abu Dhabi', year: '23–25 May 2025', services: 'EuroLeague broadcast LAN, multi-language commentary, timing & statistics integration', tech: 'HPE Aruba, Cisco Catalyst, Palo Alto', category: ['Sports', 'WiFi Deployments'], img: '/events/euroleague-final-four-2025.webp' },
    { id: 5, name: 'WBA Light Heavyweight World Championship', slug: 'wba-light-heavyweight-championship', location: 'Etihad Arena, Abu Dhabi', year: '2022', services: 'Arena WiFi, Broadcast uplinks', tech: 'HPE Aruba, Cisco', category: ['Sports', 'WiFi Deployments'], img: '/events/wba-light-heavyweight-championship.webp' },
    { id: 6, name: 'World Tennis League (2022, 2023)', slug: 'world-tennis-league', location: 'Coca-Cola Arena, Dubai', year: '2022, 2023', services: 'Arena WiFi, Hawk-Eye integration', tech: 'Cisco Meraki, HPE Aruba', category: ['Sports', 'WiFi Deployments'], img: '/events/world-tennis-league.webp' },
    { id: 7, name: 'Mubadala Abu Dhabi Open', slug: 'mubadala-abu-dhabi-open', location: 'Zayed Sports City', year: 'Annual', services: 'Outdoor venue WiFi, Timing-system network', tech: 'HPE Aruba, Fluke', category: ['Sports', 'WiFi Deployments'], img: '/events/mubadala-abu-dhabi-open.webp' },
    { id: 8, name: 'Abu Dhabi Padel Master', slug: 'abu-dhabi-padel-master', location: 'Hudayriat Island, Abu Dhabi', year: '2023', services: 'Multi-court WiFi, Broadcast LAN, Court-side connectivity, Ball-tracking integration', tech: 'HPE Aruba, Cisco', category: ['Sports', 'WiFi Deployments'], img: '/events/abu-dhabi-padel-master.webp' },
    { id: 9, name: 'UAE Official National Day — 48th Edition', slug: 'uae-national-day', location: 'Zayed Sports City + nationwide venues', year: '2019', services: 'Multi-venue WiFi mesh, government-grade CCTV, command-centre integration, federal coordination', tech: 'HPE Aruba, Hikvision, Cisco', category: ['National', 'WiFi Deployments', 'CCTV & Security'], img: '/events/uae-national-day-48th.webp', video: 'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1002301510156090%2F&show_text=false&width=800', videoLabel: 'Watch 48th National Day' },
    { id: 16, name: 'UAE Official National Day — 49th Edition', slug: 'uae-national-day', location: 'Al Jubail Mangrove Park, Abu Dhabi', year: '2020', services: 'Multi-venue WiFi, broadcast LAN, government-grade CCTV, command-centre integration', tech: 'HPE Aruba, Hikvision, Cisco', category: ['National', 'WiFi Deployments', 'CCTV & Security'], img: '/events/uae-national-day-49th.webp', video: 'https://www.youtube.com/embed/3zioTRC9Cc8', videoLabel: 'Watch 49th National Day' },
    { id: 17, name: 'USA Basketball Showcase 2024', location: 'Etihad Arena, Abu Dhabi', year: '2024', services: 'Arena WiFi 6E, broadcast LAN, media-centre connectivity, NOC operations, digital signage', tech: 'HPE Aruba, Cisco, Palo Alto', category: ['Sports', 'WiFi Deployments'], img: '/events/usa-basketball-2024.webp' },
    { id: 10, name: 'Ya Salam After Race Concert (2019–2024)', slug: 'ya-salam-after-race-concert', location: 'Yas Island, Abu Dhabi', year: '2019–2024', services: 'Outdoor festival WiFi, PtP backhaul, RFID', tech: 'HPE Aruba, Ruckus', category: ['Concerts', 'WiFi Deployments'], img: '/events/ya-salam-after-race-concert.webp' },
    { id: 11, name: 'IIFA Awards (2022–2024)', slug: 'iifa-awards', location: 'Yas Island, Abu Dhabi', year: '2022, 2023, 2024', services: 'Arena WiFi, Broadcast LAN, Press centre', tech: 'HPE Aruba, Cisco', category: ['Concerts', 'WiFi Deployments'], img: '/events/iifa-awards.webp' },
    { id: 12, name: 'Eid Al Fitr Concert 2023', location: 'Yas Bay, Abu Dhabi', year: '2023', services: 'Outdoor concert WiFi, Live stream uplink', tech: 'HPE Aruba, Cisco', category: ['Concerts', 'WiFi Deployments'], img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80' },
    { id: 13, name: 'Saadiyat Nights (2024, 2025)', slug: 'saadiyat-nights', location: 'Saadiyat Island, Abu Dhabi', year: '2024, 2025', services: 'Open-air WiFi, PtP microwave, CCTV', tech: 'HPE Aruba, Hikvision', category: ['Concerts', 'WiFi Deployments', 'CCTV & Security'], img: '/events/saadiyat-nights.webp' },
    { id: 14, name: 'Coldplay World Tour', slug: 'coldplay-world-tour', location: 'Zayed Sports City, Abu Dhabi', year: '2024', services: 'Outdoor 60K-attendee WiFi, RFID backhaul', tech: 'HPE Aruba, Fluke', category: ['Concerts', 'WiFi Deployments'], img: '/events/coldplay-world-tour.webp' },
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
        <section className="relative py-20 md:py-28 px-6 overflow-hidden" style={{ background: '#0B1A46' }}>
          {/* Hero photo — full-bleed, edge to edge */}
          <img
            src="/images/event-it/portfolio-hero.webp"
            alt="Event IT portfolio Abu Dhabi"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
          />
          {/* Left-to-right gradient scrim — text legible on left, arena visible on right */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(90deg, rgba(11,26,70,0.75) 0%, rgba(11,26,70,0.45) 45%, rgba(11,26,70,0.10) 100%)', zIndex: 10 }} aria-hidden="true" />
          {/* Orange glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 11 }}>
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, #E87722 0%, transparent 70%)' }}/>
          </div>
          <div className="relative max-w-[1400px] mx-auto" style={{ zIndex: 20 }}>
            <div className="w-full md:max-w-[50%] text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.35)' }}>
                <Icons.FolderOpen size={14} className="text-[#E87722]"/>
                <span className="text-[#E87722] text-xs font-semibold uppercase tracking-wider">Event Portfolio</span>
              </div>
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"><span style={{ color: '#E87722' }}>Major Events</span> IT Portfolio — UAE & Canada</h1>
              <p className="body-text mt-6 text-base md:text-lg max-w-2xl">Delivering enterprise-grade IT infrastructure for world-class events across UAE and Canada</p>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-8 px-6" style={{ background: '#F4F6FA' }}>
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    activeFilter === cat
                      ? 'bg-[#E87722] text-white'
                      : 'bg-white text-[#0B1A46] hover:bg-[#E87722]/10 border border-[#0B1A46]/10'
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
        <section className="py-16 px-6" style={{ background: '#F4F6FA' }}>
          <div className="max-w-[1400px] mx-auto">
            {filteredEvents.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-5">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="overflow-hidden group transition-all"
                    style={{ background: '#FFFFFF', borderTop: '3px solid #E87722', borderRadius: '16px', boxShadow: '0 8px 32px rgba(10,26,70,0.18)' }}
                  >
                    <div className="h-48 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(232,119,34,0.15) 0%, rgba(27,108,168,0.15) 100%)' }}>
                      {event.img ? (
                        <img
                          src={event.img}
                          alt={event.name}
                          width={480}
                          height={192}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icons.Play size={64} className="text-white/20"/>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2" style={{ color: '#0B1A46' }}>{event.name}</h3>
                      <div className="flex items-center gap-2 mb-3 text-sm" style={{ color: '#58595B' }}>
                        <Icons.MapPin size={14}/>
                        <span>{event.location}</span>
                        <span>•</span>
                        <span>{event.year}</span>
                      </div>
                      <p className="text-sm mb-2" style={{ color: '#58595B' }}><strong style={{ color: '#0B1A46' }}>Services:</strong> {event.services}</p>
                      <p className="text-sm mb-4" style={{ color: '#58595B' }}><strong style={{ color: '#0B1A46' }}>Technology:</strong> {event.tech}</p>
                      <div className="flex flex-wrap gap-2">
                        {event.slug && (
                          <Link href={`/event-it/${event.slug}`} className="inline-flex items-center gap-1.5 text-[#E87722] text-sm font-semibold hover:underline transition-all">
                            Read Case Study <Icons.ArrowRight size={13}/>
                          </Link>
                        )}
                        {event.video && (
                          <button
                            onClick={(e) => { e.preventDefault(); setVideoModal({ src: event.video, label: event.videoLabel }) }}
                            className="inline-flex items-center gap-1.5 text-[#E87722] text-sm font-semibold hover:underline transition-all"
                          >
                            <Icons.Play size={13}/> Watch Video
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Icons.Search size={48} className="mx-auto mb-4" style={{ color: '#0B1A46', opacity: 0.2 }}/>
                <p className="text-lg" style={{ color: '#58595B' }}>No events found in this category</p>
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #0B1A46 0%, #1E3A8A 100%)',
          borderTop: '3px solid #E87722',
          padding: '96px 24px',
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}>
              Plan Your Event IT Infrastructure
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.78)',
              fontSize: '17px',
              lineHeight: 1.75,
              maxWidth: '580px',
              margin: '0 auto 36px',
            }}>
              Get a custom quote for your upcoming event with our expert team — temporary
              networks, broadcast LAN, CCTV and command-centre support across UAE and Canada.
            </p>
            <CTAPhoneButtons />
          </div>
        </section>
      </main>
      <Footer />

      {/* Video Modal */}
      {videoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(7,16,42,0.92)', backdropFilter: 'blur(8px)' }}
          onClick={() => setVideoModal(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl overflow-hidden"
            style={{ background: '#0D2B55', border: '1px solid rgba(255,255,255,0.12)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="text-white font-semibold text-sm">{videoModal.label}</span>
              <button onClick={() => setVideoModal(null)} className="text-white/60 hover:text-white transition-colors">
                <Icons.X size={20}/>
              </button>
            </div>
            <div className="relative" style={{ paddingTop: '56.25%' }}>
              <iframe
                src={videoModal.src}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                title={videoModal.label}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
