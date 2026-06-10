'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { partners } from '@/lib/partners-data'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) } }), { threshold: 0.1 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function PartnersClient() {
  useReveal()
  const [filter, setFilter] = useState('All')
  const cats = ['All', 'Cybersecurity', 'Networking', 'Cloud']
  const filtered = filter === 'All' ? partners : partners.filter(p => p.category === filter)
  return (
    <main>
      <section className="py-20 md:py-24 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-4 reveal">Partnerships</div>
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-[1.08] reveal">Technology &amp; Channel Partners</h1>
          <p className="body-text mt-5 text-lg max-w-2xl mx-auto reveal">Certified partnerships with the world’s leading technology vendors. The foundation of every IP Care solution.</p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-center gap-2 flex-wrap mb-10 reveal">
            {cats.map(c => <button key={c} onClick={() => setFilter(c)} className={`glass-pill ${filter === c ? 'active' : ''}`}>{c}</button>)}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <div key={p.slug} className="glass-card p-7 reveal" style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="mono text-2xl font-bold tracking-tight" style={{ color: p.color }}>{p.name}</div>
                </div>
                <div className="text-[#E87722] mono text-xs uppercase tracking-widest mb-3">{p.category}</div>
                <p className="body-text text-sm leading-relaxed">{p.short}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-[1100px] mx-auto rounded-2xl p-10 md:p-14 text-center reveal" style={{ background: 'rgba(232,119,34,0.07)', border: '1px solid rgba(232,119,34,0.28)' }}>
          <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Partnership Opportunities</div>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Partner with IP Care Technologies</h2>
          <p className="body-text max-w-xl mx-auto mb-8">We are always open to conversations with technology vendors, channel partners and systems integrators looking to serve UAE and Canadian enterprise markets.</p>
          <Link href="/contact" className="btn-primary">Discuss a Partnership <Icons.ArrowRight size={16}/></Link>
        </div>
      </section>
    </main>
  )
}
