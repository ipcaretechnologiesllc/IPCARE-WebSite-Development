'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { events } from '@/lib/event-it-data'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function PortfolioClient() {
  useReveal()
  const [filter, setFilter] = useState('All Events')
  const [query, setQuery] = useState('')
  const [videoModal, setVideoModal] = useState(null)
  const tabs = ['All Events', 'UAE Events', 'Global Events']
  const filtered = events.filter((e) => {
    const matchesFilter = filter === 'All Events' || e.region === filter
    const matchesQ = !query || (e.name + ' ' + e.location + ' ' + e.tech).toLowerCase().includes(query.toLowerCase())
    return matchesFilter && matchesQ
  })

  return (
    <>
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
      <section className="relative py-20 md:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-25" style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 60%)' }}/>
        </div>
        <div className="relative max-w-[1200px] mx-auto text-center">
          <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-4 reveal">Portfolio</div>
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight max-w-4xl mx-auto reveal">Event IT Case Studies</h1>
          <p className="body-text mt-5 text-base md:text-lg max-w-2xl mx-auto reveal">A decade of event IT delivery — from world football finals to stadium concerts to government summits.</p>
        </div>
      </section>

      {/* Filters + search */}
      <section className="pb-6 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 reveal">
            <div className="flex gap-2 flex-wrap">
              {tabs.map((t) => (
                <button key={t} onClick={() => setFilter(t)} className={`glass-pill ${filter === t ? 'active' : ''}`}>{t}</button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Icons.Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"/>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search events..." className="w-full pl-10 pr-4 py-2.5 rounded-full text-white text-sm focus:outline-none focus:border-[#E87722]" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)' }}/>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed case studies */}
      <section className="pb-24 px-6">
        <div className="max-w-[1200px] mx-auto space-y-8">
          {filtered.length === 0 && (
            <div className="text-center py-20 text-white/60 glass-card p-10">
              <Icons.SearchX size={40} className="mx-auto mb-4 opacity-50"/>
              No events match your filters.
            </div>
          )}
          {filtered.map((ev, i) => (
            <article key={ev.slug} id={ev.slug} className="glass-card overflow-hidden reveal" style={{ transitionDelay: `${i * 60}ms`, scrollMarginTop: '90px' }}>
              <div className="grid lg:grid-cols-5 gap-0">
                <div className="relative lg:col-span-2 aspect-[4/3] lg:aspect-auto overflow-hidden">
                  <img src={ev.img} alt={ev.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover"/>
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(7,16,42,0.2) 0%, rgba(7,16,42,0.65) 100%)' }}/>
                  <span className="absolute top-4 left-4 mono text-[13px] uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: '#E87722', color: '#fff' }}>{ev.region}</span>
                </div>
                <div className="p-8 md:p-10 lg:col-span-3">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="mono text-[11px] text-[#E87722] uppercase tracking-widest">{ev.year}</span>
                    <span className="text-white/40">·</span>
                    <span className="text-white/70 text-sm flex items-center gap-1.5"><Icons.MapPin size={12}/>{ev.location}</span>
                  </div>
                  <h2 className="text-white text-2xl md:text-3xl font-bold mb-4 leading-tight">{ev.name}</h2>
                  <p className="body-text text-sm md:text-base leading-relaxed mb-6">{ev.tech}</p>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {Object.entries(ev.stats).map(([k, v]) => (
                      <div key={k} className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <div className="mono text-[13px] text-white/50 uppercase tracking-wider">{k}</div>
                        <div className="text-white font-semibold text-sm mt-1">{v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link href="/#contact" className="btn-primary !py-2.5 !px-5 text-sm">Discuss a Similar Event <Icons.ArrowRight size={14}/></Link>
                    <Link href="/event-it" className="btn-ghost !py-2.5 !px-5 text-sm">Back to Event IT</Link>
                    {ev.video && (
                      <button
                        onClick={() => setVideoModal({ src: ev.video, label: ev.videoLabel || ev.name })}
                        className="btn-ghost !py-2.5 !px-5 text-sm inline-flex items-center gap-2"
                      >
                        <Icons.Play size={14}/> Watch Video
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6">
        <div className="max-w-[1100px] mx-auto rounded-2xl p-10 md:p-14 text-center reveal" style={{ background: 'rgba(232,119,34,0.07)', border: '1px solid rgba(232,119,34,0.28)' }}>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Your Event Could Be Next.</h2>
          <p className="body-text max-w-xl mx-auto mb-8">Tell us the dates, venue and scope — we&apos;ll get you a costed event IT proposal in 48 hours.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/#contact" className="btn-primary">Get an Event Quote <Icons.ArrowRight size={16}/></Link>
            <Link href="/event-it" className="btn-ghost">Explore Event Services</Link>
          </div>
        </div>
      </section>
    </main>

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
