'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { kbArticles } from '@/lib/cyber-advisory-data'
import CTAPhoneButtons from '@/components/site/CTAPhoneButtons'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) } })
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function KBClient() {
  useReveal()
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const cats = ['All', 'Palo Alto', 'Check Point', 'Fortinet', 'Architecture']
  const filtered = kbArticles.filter(a => {
    const matchesCat = filter === 'All' || a.category === filter
    const matchesQ = !query || a.title.toLowerCase().includes(query.toLowerCase()) || (a.excerpt || '').toLowerCase().includes(query.toLowerCase())
    return matchesCat && matchesQ
  })

  return (
    <main style={{ background: '#F4F6FA' }}>
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 pt-6">
        <nav className="text-xs flex items-center gap-1.5 flex-wrap" style={{ color: '#8A93A6' }} aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#0B1A46] transition-colors">Home</Link>
          <Icons.ChevronRight size={12} />
          <Link href="/cybersecurity-advisory" className="hover:text-[#0B1A46] transition-colors">Cybersecurity Advisory</Link>
          <Icons.ChevronRight size={12} />
          <span style={{ color: '#0B1A46' }}>Knowledge Base</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative px-6 pt-14 pb-10 md:pt-20 md:pb-12">
        <div className="max-w-[820px] mx-auto text-center">
          <p className="reveal mono text-[13px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: '#E87722' }}>Knowledge Base</p>
          <h1 className="reveal text-4xl md:text-6xl font-extrabold leading-[1.08] tracking-tight" style={{ color: '#0B1A46' }}>
            Field-Tested <span style={{ color: '#E87722' }}>Cybersecurity Insights</span>
          </h1>
          <p className="reveal mt-5 text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#475467' }}>
            Practical engineering guides from the IP Care Cyber Advisory practice — vendor-current architecture, upgrade and operations guidance written for architects and security leads.
          </p>

          {/* Search */}
          <div className="reveal mt-10 max-w-xl mx-auto">
            <div className="relative">
              <Icons.Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#8A93A6' }} />
              <label htmlFor="kb-search" className="sr-only">Search articles</label>
              <input
                id="kb-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-11 pr-4 py-3.5 rounded-full text-[15px] focus:outline-none"
                style={{ background: '#FFFFFF', border: '1px solid #D8DEE9', color: '#0B1A46', boxShadow: '0 2px 10px rgba(10,26,70,0.05)' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#E87722'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(232,119,34,0.15)' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#D8DEE9'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(10,26,70,0.05)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="pb-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-center flex-wrap gap-2 mb-10">
            {cats.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className="rounded-full text-[12px] font-semibold transition-all"
                style={{
                  padding: '8px 18px',
                  cursor: 'pointer',
                  letterSpacing: '0.4px',
                  background: filter === c ? '#E87722' : '#FFFFFF',
                  color: filter === c ? '#FFFFFF' : '#4A5878',
                  border: filter === c ? '1px solid #E87722' : '1px solid #D8DEE9',
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20" style={{ color: '#667085' }}>
              <Icons.FileSearch size={40} className="mx-auto mb-4" style={{ color: '#B0B8C7' }} />
              No articles match your search.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((a, i) => (
                <Link
                  key={a.slug}
                  href={`/cybersecurity-advisory/knowledge-base/${a.slug}`}
                  className="service-card reveal group flex h-full flex-col p-6"
                  style={{ transitionDelay: `${(i % 6) * 50}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center rounded-full border border-[#E87722]/25 bg-[#E87722]/10 px-2.5 py-1 text-[11px] font-semibold text-[#B95812]">{a.category}</span>
                    <span className="text-[11px] font-semibold" style={{ color: '#9CA3AF' }}>{a.readTime}</span>
                  </div>
                  <h3 className="font-bold text-[16px] md:text-[17px] leading-snug mb-3 group-hover:text-[#E87722] transition-colors" style={{ color: '#0B1A46' }}>{a.title}</h3>
                  <p className="text-sm leading-6 mb-6 flex-1" style={{ color: '#667085' }}>{a.excerpt}</p>
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #E8EDF5' }}>
                    <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: '#9CA3AF' }}>{a.date}</span>
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-bold group-hover:gap-2.5 transition-all" style={{ color: '#E87722' }}>Read Article <Icons.ArrowRight size={13} /></span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Consultation CTA — navy band, consistent with article pages */}
          <div className="reveal mt-16 rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto" style={{ background: 'linear-gradient(160deg, #0B1A46 0%, #1E3A8A 100%)' }}>
            <div className="mono text-[13px] uppercase tracking-[0.25em] mb-3" style={{ color: '#E87722' }}>Consultation</div>
            <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">Need a direct answer?</h2>
            <p className="mb-8 mx-auto max-w-xl" style={{ color: 'rgba(255,255,255,0.75)' }}>The knowledge base is a starting point. For a specific architecture, upgrade or migration decision, 30 minutes with a senior advisor is often faster — and free.</p>
            <div className="flex justify-center">
              <CTAPhoneButtons />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
