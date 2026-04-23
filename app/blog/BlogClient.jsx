'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { articles } from '@/lib/blog-data'

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
  const cats = ['All', 'Cybersecurity', 'Managed IT', 'Networking', 'Event IT', 'Rentals', 'News']
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((a, i) => (
              <Link key={a.slug} href={`/blog/${a.slug}`} className="glass-card overflow-hidden reveal group block" style={{ transitionDelay: `${(i%6) * 50}ms` }}>
                <div className="relative h-48 overflow-hidden">
                  <img src={`${a.img}?w=800&q=75`} alt={a.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                  <span className="absolute top-3 left-3 mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded" style={{ background: '#E87722', color: '#fff' }}>{a.category}</span>
                </div>
                <div className="p-6">
                  <h2 className="text-white font-semibold text-lg leading-snug mb-3 group-hover:text-[#E87722] transition-colors">{a.title}</h2>
                  <p className="body-text text-sm mb-5 line-clamp-2">{a.excerpt}</p>
                  <div className="flex items-center justify-between mono text-[11px] text-white/50 uppercase tracking-wider">
                    <span>{a.author} \u2022 {a.date}</span>
                    <span className="flex items-center gap-1"><Icons.Clock size={11}/>{a.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Strip */}
      <NewsletterStrip />
    </main>
  )
}

function NewsletterStrip() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [err, setErr] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setErr('')
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) { setErr('Please enter a valid email address.'); return }
    setSubmitting(true)
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'blog_page' }),
      })
      if (!res.ok) throw new Error('failed')
      setSubmitted(true)
    } catch {
      setErr('Subscription failed, please try again.')
    }
    setSubmitting(false)
  }

  return (
    <section
      className="w-full px-6 reveal"
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255,255,255,0.10)',
        borderBottom: '1px solid rgba(255,255,255,0.10)',
        paddingTop: '72px',
        paddingBottom: '72px',
      }}
    >
      <div className="max-w-[640px] mx-auto text-center">
        <div className="uppercase" style={{ color: '#E87722', fontSize: '12px', letterSpacing: '2px', marginBottom: '12px' }}>Stay Informed</div>
        <h2 className="text-white font-bold mb-4" style={{ fontSize: '32px', fontWeight: 700, lineHeight: 1.25 }}>Monthly Insights from IP Care Engineers</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.55, marginBottom: '28px' }}>Zero spam. One monthly email with our best articles on cybersecurity, cloud, and enterprise IT. Unsubscribe anytime.</p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-lg mx-auto" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.4)', color: '#4ade80' }}>
            <Icons.Check size={18}/>
            <span className="text-sm font-medium">You&apos;re subscribed. Welcome aboard.</span>
          </div>
        ) : (
          <>
            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row mx-auto" style={{ gap: '8px', maxWidth: '520px' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@company.com"
                required
                disabled={submitting}
                className="flex-1 text-white text-sm focus:outline-none focus:border-[#E87722]"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', height: '48px', borderRadius: '8px', padding: '0 16px' }}
              />
              <button
                type="submit"
                disabled={submitting}
                className="text-white text-sm font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-60 transition-opacity"
                style={{ background: '#E87722', height: '48px', borderRadius: '8px', padding: '0 28px', border: 'none', cursor: 'pointer' }}
              >
                {submitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {err && <div className="text-red-400 text-xs mt-3">{err}</div>}
          </>
        )}
      </div>
    </section>
  )
}
