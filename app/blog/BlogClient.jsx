'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { articles } from '@/lib/blog-data'
import NewsletterStrip from '@/components/blog/NewsletterStrip'
import CTAPhoneButtons from '@/components/site/CTAPhoneButtons'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function BlogClient() {
  useReveal()
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')

  // Build category list dynamically — ranked by article count, stable tie-break by name
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
      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(160deg, #0B1A46 0%, #1E3A8A 100%)', borderBottom: '3px solid #E87722', position: 'relative', overflow: 'hidden' }}>
        <div className="premium-grid" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
        <div style={{ position: 'absolute', top: '-100px', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(232,119,34,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="relative py-20 md:py-28 px-6">
          <div className="max-w-[800px] mx-auto text-center">
            <div className="section-eyebrow reveal">Knowledge Base</div>
            <h1 className="text-white text-4xl md:text-6xl font-bold leading-[1.08] reveal">IT Knowledge Base &amp; Insights</h1>
            <p className="mt-5 text-lg max-w-2xl mx-auto reveal" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Field-tested articles from IP Care engineers and advisors — cybersecurity, cloud, networking, and more.
            </p>
            {/* Search bar */}
            <div className="mt-8 max-w-[480px] mx-auto relative reveal">
              <Icons.Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF', pointerEvents: 'none' }} />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm"
                style={{ background: '#fff', border: '2px solid #E1E8F0', color: '#0B1A46', outline: 'none' }}
                onFocus={e => { e.target.style.borderColor = '#E87722' }}
                onBlur={e => { e.target.style.borderColor = '#E1E8F0' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER TABS + ARTICLE GRID ─────────────────────────────── */}
      <section className="px-6 py-16" style={{ background: '#F4F6FA' }}>
        <div className="max-w-[1300px] mx-auto">
          {/* Filter tabs */}
          <div className="flex justify-center gap-2 flex-wrap mb-10">
            {cats.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className="text-sm font-medium transition-all"
                style={{
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  border: filter === c ? '2px solid #E87722' : '2px solid #D1D9E6',
                  background: filter === c ? '#E87722' : '#fff',
                  color: filter === c ? '#fff' : '#0B1A46',
                  cursor: 'pointer',
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Cards */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Icons.SearchX size={36} className="mx-auto mb-4" style={{ color: '#CBD5E1' }} />
              <p className="text-sm" style={{ color: '#9CA3AF' }}>No articles match the current filter and search.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/*
                NOTE: deliberately NOT using .reveal on these cards.
                .reveal starts at opacity:0 and is only triggered by IntersectionObserver at mount.
                When filter changes, React renders new DOM nodes the observer never sees — they
                would stay invisible. Cards in a filter/search UI must appear immediately.
              */}
              {filtered.map((a, idx) => (
                <ArticleCard key={a.slug} a={a} priority={idx === 0} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER ─────────────────────────────────────────────── */}
      <NewsletterStrip />

      {/* ── CONTACT CTA ────────────────────────────────────────────── */}
      <section style={{
        background:   'linear-gradient(135deg, #0B1A46 0%, #1E3A8A 100%)',
        borderTop:    '3px solid #E87722',
        padding:      '96px 24px',
      }}>
        <div className="reveal" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            color:         '#FFFFFF',
            fontWeight:    800,
            fontSize:      'clamp(2rem, 4vw, 3rem)',
            letterSpacing: '-0.02em',
            lineHeight:    1.15,
            marginBottom:  '16px',
          }}>
            Have a Project in Mind?
          </h2>
          <p style={{
            color:      'rgba(255,255,255,0.78)',
            fontSize:   '17px',
            lineHeight: 1.75,
            maxWidth:   '580px',
            margin:     '0 auto 36px',
          }}>
            Whatever you just read about, we can help you build, secure, or run it.
            Talk to our team in the UAE or Canada.
          </p>
          <CTAPhoneButtons />
        </div>
      </section>
    </main>
  )
}

function ArticleCard({ a, priority = false }) {
  return (
    <Link
      href={`/blog/${a.slug}`}
      className="service-card group flex flex-col overflow-hidden"
      style={{ padding: 0 }}
    >
      {/* Photo — 16:10 aspect, hover zoom */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ aspectRatio: '16/10' }}>
        <img
          src={`${a.img}?w=600&fm=webp&q=82`}
          alt={a.title}
          width={600}
          height={375}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span
          className="absolute top-3 left-3 mono text-[13px] uppercase tracking-widest px-2.5 py-1 rounded"
          style={{ background: '#E87722', color: '#fff' }}
        >
          {a.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h2
          className="font-bold text-lg leading-snug mb-2 group-hover:text-[#E87722] transition-colors"
          style={{
            color: '#0B1A46',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {a.title}
        </h2>
        <p
          className="text-sm leading-relaxed mb-4"
          style={{
            color: '#4B5C7E',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {a.excerpt}
        </p>
        <div
          className="mt-auto flex items-center justify-between mono text-[11px] uppercase tracking-wider"
          style={{ color: '#94A3B8' }}
        >
          <span>{a.author} &bull; {a.date}</span>
          <span className="flex items-center gap-1"><Icons.Clock size={11} />{a.readTime}</span>
        </div>
      </div>
    </Link>
  )
}
