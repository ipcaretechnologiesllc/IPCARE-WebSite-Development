'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { articles } from '@/lib/blog-data'
import NewsletterStrip from '@/components/blog/NewsletterStrip'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) } }), { threshold: 0.1 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function BlogClient() {
  useReveal()
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  // Build the category list dynamically from the actual article corpus so the
  // filter buttons stay in sync as new categories are added. Ordering: 'All' first,
  // then categories ranked by article count (most-populated first), with a stable
  // tie-break on the category name.
  const cats = (() => {
    const counts = articles.reduce((acc, a) => {
      acc[a.category] = (acc[a.category] || 0) + 1
      return acc
    }, {})
    const ordered = Object.entries(counts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([c]) => c)
    return ['All', ...ordered]
  })()
  const filtered = articles.filter(a => {
    const fc = filter === 'All' || a.category === filter
    const fq = !query || (a.title + a.excerpt).toLowerCase().includes(query.toLowerCase())
    return fc && fq
  })
  return (
    <main>
      <section className="py-20 md:py-24 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-4 reveal">Knowledge Base</div>
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-[1.08] reveal">IT Knowledge Base &amp; Insights</h1>
          <p className="body-text mt-5 text-lg max-w-2xl mx-auto reveal">Field-tested articles from IP Care engineers and advisors.</p>
          <div className="mt-8 max-w-md mx-auto relative reveal">
            <Icons.Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"/>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search articles..." className="w-full pl-11 pr-4 py-3 rounded-full text-white text-sm" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)' }}/>
          </div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-center gap-2 flex-wrap mb-10 reveal">
            {cats.map(c => <button key={c} onClick={() => setFilter(c)} className={`glass-pill ${filter === c ? 'active' : ''}`}>{c}</button>)}
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-white/60">
              <Icons.SearchX size={32} className="mx-auto mb-4 text-white/40"/>
              <p className="text-sm">No articles match the current filter and search.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/*
                NOTE: deliberately not using the `.reveal` animation class on these cards.
                `.reveal` starts at opacity:0 and is only switched on by an IntersectionObserver
                that runs once at mount. When the filter changes, React renders new DOM nodes
                that the observer never sees, so they would stay invisible. Cards in a
                filter/search UI need to appear immediately when the filter changes.
              */}
              {filtered.map((a, i) => (
                <Link key={a.slug} href={`/blog/${a.slug}`} className="glass-card overflow-hidden group block">
                  <div className="relative h-48 overflow-hidden">
                    <img src={`${a.img}?w=800&q=75`} alt={a.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                    <span className="absolute top-3 left-3 mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded" style={{ background: '#E87722', color: '#fff' }}>{a.category}</span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-white font-semibold text-lg leading-snug mb-3 group-hover:text-[#E87722] transition-colors">{a.title}</h2>
                    <p className="body-text text-sm mb-5 line-clamp-2">{a.excerpt}</p>
                    <div className="flex items-center justify-between mono text-[11px] text-white/50 uppercase tracking-wider">
                      <span>{a.author} {'\u2022'} {a.date}</span>
                      <span className="flex items-center gap-1"><Icons.Clock size={11}/>{a.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Strip */}
      <NewsletterStrip />
    </main>
  )
}
