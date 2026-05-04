'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { kbArticles } from '@/lib/cyber-advisory-data'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) } })
    }, { threshold: 0.12 })
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
    const matchesQ = !query || a.title.toLowerCase().includes(query.toLowerCase())
    return matchesCat && matchesQ
  })

  return (
    <main className="bg-premium-dark">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 pt-6">
        <nav className="text-xs text-white/50 flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white">Home</Link>
          <Icons.ChevronRight size={12}/>
          <Link href="/cybersecurity-advisory" className="hover:text-white">Cybersecurity Advisory</Link>
          <Icons.ChevronRight size={12}/>
          <span className="text-white/80">Knowledge Base</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative py-20 md:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 premium-grid pointer-events-none"/>
        <div className="max-w-[1200px] mx-auto relative text-center">
          <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-4 reveal">Knowledge Base</div>
          <h1 className="premium-h1 text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight max-w-4xl mx-auto reveal">
            Field-Tested Cybersecurity Insights
          </h1>
          <p className="body-text mt-5 text-base md:text-lg max-w-2xl mx-auto reveal">
            Deep-dive engineering articles from The Cyber Adviser practice. Written by senior architects, reviewed by peers, battle-tested in production.
          </p>

          {/* Search */}
          <div className="mt-10 max-w-xl mx-auto reveal">
            <div className="relative">
              <Icons.Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"/>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-11 pr-4 py-3.5 rounded-full text-white text-sm focus:outline-none focus:border-[#E87722]"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)' }}
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
              <button key={c} onClick={() => setFilter(c)} className={`glass-pill mono !text-[11px] !uppercase !tracking-widest ${filter === c ? 'active' : ''}`}>{c}</button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-white/60">
              <Icons.FileSearch size={40} className="mx-auto mb-4 opacity-50"/>
              No articles match your filters.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((a, i) => (
                <article key={a.title} className="glass-premium p-6 reveal group cursor-pointer" style={{ transitionDelay: `${(i % 6) * 50}ms` }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full" style={{ background: 'rgba(232,119,34,0.1)', border: '1px solid rgba(232,119,34,0.3)', color: '#ffd7b8' }}>{a.category}</span>
                    <span className="mono text-[10px] text-white/50">{a.readTime}</span>
                  </div>
                  <h3 className="text-white font-semibold text-base md:text-lg leading-snug mb-6 group-hover:text-[#E87722] transition-colors">{a.title}</h3>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="mono text-[10px] text-white/50 uppercase tracking-wider">{a.date}</span>
                    <span className="inline-flex items-center gap-1 text-[#E87722] text-xs font-semibold px-2.5 py-1 rounded-md border border-[#E87722]/50 bg-[#E87722]/5 group-hover:bg-[#E87722] group-hover:text-white group-hover:border-[#E87722] group-hover:gap-2 transition-all">Read Article <Icons.ArrowRight size={12}/></span>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-16 glass-premium p-10 md:p-14 text-center max-w-3xl mx-auto reveal">
            <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Consultation</div>
            <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">Need a direct answer?</h2>
            <p className="body-text mb-8">The knowledge base is a great start. For specific architecture decisions, 30 minutes with a senior advisor is often faster — and free.</p>
            <Link href="/#contact" className="btn-primary">Schedule a Consultation <Icons.ArrowRight size={16}/></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
