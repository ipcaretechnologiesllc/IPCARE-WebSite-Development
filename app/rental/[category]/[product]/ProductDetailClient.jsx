'use client'

import { useState } from 'react'
import * as Icons from 'lucide-react'
import AddToQuoteButton from '@/components/rental/AddToQuoteButton'

const DURATIONS = [
  { key: 'daily', label: 'Daily', sub: '24 hours' },
  { key: 'weekly', label: 'Weekly', sub: '7 days' },
  { key: 'monthly', label: 'Monthly', sub: '30 days' },
]

export default function ProductDetailClient({ product, categorySlug }) {
  const [duration, setDuration] = useState('weekly')
  const [qty, setQty] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const images = [`${product.image}?w=1200&q=85`, `${product.image}?w=1200&q=85&sat=-20`, `${product.image}?w=1200&q=85&sharp=20`]

  return (
    <section className="py-10 md:py-14 px-6">
      <div className="max-w-[1300px] mx-auto grid lg:grid-cols-5 gap-10">
        {/* Gallery */}
        <div className="lg:col-span-3">
          <div className="glass-card overflow-hidden aspect-[4/3] relative mb-4">
            <img src={images[activeImage]} alt={`${product.brand} ${product.model}`} className="w-full h-full object-cover"/>
            <span className="absolute top-4 left-4 mono text-[11px] uppercase tracking-widest px-2.5 py-1 rounded" style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}>{product.brand}</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImage(i)} className={`aspect-[4/3] rounded-lg overflow-hidden transition ${activeImage === i ? 'ring-2 ring-[#E87722]' : 'opacity-70 hover:opacity-100'}`}>
                <img src={img} alt="" className="w-full h-full object-cover"/>
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2">
          <div className="mono text-xs text-white/60 uppercase tracking-widest mb-2">{product.brand}</div>
          <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight">{product.model}</h1>
          <ul className="mt-5 space-y-2">
            {product.specs.map((s, i) => (
              <li key={i} className="body-text text-sm flex items-start gap-2"><Icons.Check size={14} className="text-[#E87722] mt-0.5 flex-shrink-0"/>{s}</li>
            ))}
          </ul>

          {/* Duration selector */}
          <div className="mt-8">
            <div className="mono text-[11px] text-white/70 uppercase tracking-widest mb-3">Rental Duration</div>
            <div className="grid grid-cols-3 gap-2">
              {DURATIONS.map((d) => (
                <button key={d.key} onClick={() => setDuration(d.key)} className={`px-3 py-3 rounded-lg text-center transition ${duration === d.key ? 'bg-[#E87722] border-[#E87722] text-white' : 'text-white/80'}`} style={duration === d.key ? {} : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <div className="text-sm font-semibold">{d.label}</div>
                  <div className="mono text-[10px] opacity-75">{d.sub}</div>
                </button>
              ))}
            </div>
            <details className="mt-3">
              <summary className="mono text-[11px] text-[#E87722] cursor-pointer uppercase tracking-widest hover:underline">Custom date range ↗</summary>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <input type="date" className="px-3 py-2 rounded-lg text-white text-sm" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)' }}/>
                <input type="date" className="px-3 py-2 rounded-lg text-white text-sm" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)' }}/>
              </div>
            </details>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <div className="mono text-[11px] text-white/70 uppercase tracking-widest mb-3">Quantity</div>
            <div className="flex items-center gap-3">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)' }}><Icons.Minus size={14}/></button>
              <div className="min-w-[60px] text-center text-white font-semibold text-xl mono">{qty}</div>
              <button onClick={() => setQty(qty + 1)} className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)' }}><Icons.Plus size={14}/></button>
            </div>
          </div>

          {/* Add to quote */}
          <div className="mt-8">
            <AddToQuoteButton product={{ ...product, categorySlug }} duration={duration} quantity={qty} size="md"/>
          </div>

          {/* Delivery note */}
          <div className="mt-6 p-4 rounded-xl space-y-2" style={{ background: 'rgba(232,119,34,0.06)', border: '1px solid rgba(232,119,34,0.25)' }}>
            <div className="text-white/90 text-sm flex items-start gap-2"><Icons.Truck size={14} className="text-[#E87722] mt-0.5"/>Available <strong>UAE &amp; Canada</strong></div>
            <div className="text-white/90 text-sm flex items-start gap-2"><Icons.Wrench size={14} className="text-[#E87722] mt-0.5"/><strong>Delivery &amp; Setup</strong> included</div>
            <div className="text-white/90 text-sm flex items-start gap-2"><Icons.Headphones size={14} className="text-[#E87722] mt-0.5"/><strong>Technical Support</strong> during rental</div>
          </div>
        </div>
      </div>

      {/* Specs table */}
      <div className="max-w-[1300px] mx-auto mt-14">
        <div className="glass-card p-7 md:p-9">
          <h2 className="text-white text-2xl font-bold mb-6">Full Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
            {Object.entries(product.fullSpecs).map(([k, v]) => (
              <div key={k} className="flex items-start justify-between py-2 border-b border-white/5 gap-4">
                <span className="mono text-[11px] text-white/60 uppercase tracking-wider">{k.replace(/_/g, ' ')}</span>
                <span className="text-white text-sm text-right">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
