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
    <section className="py-10 md:py-14 px-6" style={{ background: '#F4F6FA' }}>
      <div className="max-w-[1300px] mx-auto grid lg:grid-cols-5 gap-10">
        {/* Gallery */}
        <div className="lg:col-span-3">
          <div className="overflow-hidden aspect-[4/3] relative mb-4 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid rgba(11,26,70,0.08)', boxShadow: '0 8px 32px rgba(10,26,70,0.10)' }}>
            <img src={images[activeImage]} alt={`${product.brand} ${product.model}`} className="w-full h-full object-cover"/>
            <span className="absolute top-4 left-4 mono text-[11px] uppercase tracking-widest px-2.5 py-1 rounded" style={{ background: '#E87722', color: '#fff' }}>{product.brand}</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImage(i)} className={`aspect-[4/3] rounded-lg overflow-hidden transition ${activeImage === i ? 'ring-2 ring-[#E87722]' : 'opacity-70 hover:opacity-100'}`} style={{ background: '#FFFFFF', border: '1px solid rgba(11,26,70,0.08)' }}>
                <img src={img} alt="" className="w-full h-full object-cover"/>
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2">
          <div className="mono text-xs uppercase tracking-widest mb-2" style={{ color: '#58595B' }}>{product.brand}</div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: '#0B1A46' }}>{product.model}</h1>
          <ul className="mt-5 space-y-2">
            {product.specs.map((s, i) => (
              <li key={i} className="text-sm flex items-start gap-2" style={{ color: '#58595B' }}><Icons.Check size={14} className="text-[#E87722] mt-0.5 flex-shrink-0"/>{s}</li>
            ))}
          </ul>

          {/* Duration selector */}
          <div className="mt-8">
            <div className="mono text-[11px] uppercase tracking-widest mb-3" style={{ color: '#58595B' }}>Rental Duration</div>
            <div className="grid grid-cols-3 gap-2">
              {DURATIONS.map((d) => (
                <button key={d.key} onClick={() => setDuration(d.key)} className={`px-3 py-3 rounded-lg text-center transition ${duration === d.key ? 'bg-[#E87722] border-[#E87722] text-white' : ''}`} style={duration === d.key ? {} : { background: '#FFFFFF', border: '1px solid rgba(11,26,70,0.12)', color: '#0B1A46' }}>
                  <div className="text-sm font-semibold">{d.label}</div>
                  <div className="mono text-[10px] opacity-75">{d.sub}</div>
                </button>
              ))}
            </div>
            <details className="mt-3">
              <summary className="mono text-[11px] text-[#E87722] cursor-pointer uppercase tracking-widest hover:underline">Custom date range ↗</summary>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <input type="date" className="px-3 py-2 rounded-lg text-sm" style={{ background: '#FFFFFF', border: '1px solid rgba(11,26,70,0.12)', color: '#0B1A46' }}/>
                <input type="date" className="px-3 py-2 rounded-lg text-sm" style={{ background: '#FFFFFF', border: '1px solid rgba(11,26,70,0.12)', color: '#0B1A46' }}/>
              </div>
            </details>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <div className="mono text-[11px] uppercase tracking-widest mb-3" style={{ color: '#58595B' }}>Quantity</div>
            <div className="flex items-center gap-3">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#FFFFFF', border: '1px solid rgba(11,26,70,0.12)', color: '#0B1A46' }}><Icons.Minus size={14}/></button>
              <div className="min-w-[60px] text-center font-semibold text-xl mono" style={{ color: '#0B1A46' }}>{qty}</div>
              <button onClick={() => setQty(qty + 1)} className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#FFFFFF', border: '1px solid rgba(11,26,70,0.12)', color: '#0B1A46' }}><Icons.Plus size={14}/></button>
            </div>
          </div>

          {/* Add to quote */}
          <div className="mt-8">
            <AddToQuoteButton product={{ ...product, categorySlug }} duration={duration} quantity={qty} size="md"/>
          </div>

          {/* Delivery note */}
          <div className="mt-6 p-4 rounded-xl space-y-2" style={{ background: '#FFFFFF', border: '1px solid rgba(11,26,70,0.08)', boxShadow: '0 8px 32px rgba(10,26,70,0.08)' }}>
            <div className="text-sm flex items-start gap-2" style={{ color: '#0B1A46' }}><Icons.Truck size={14} className="text-[#E87722] mt-0.5"/>Available <strong>UAE &amp; Canada</strong></div>
            <div className="text-sm flex items-start gap-2" style={{ color: '#0B1A46' }}><Icons.Wrench size={14} className="text-[#E87722] mt-0.5"/><strong>Delivery &amp; Setup</strong> included</div>
            <div className="text-sm flex items-start gap-2" style={{ color: '#0B1A46' }}><Icons.Headphones size={14} className="text-[#E87722] mt-0.5"/><strong>Technical Support</strong> during rental</div>
          </div>
        </div>
      </div>

      {/* Specs table */}
      <div className="max-w-[1300px] mx-auto mt-14">
        <div className="p-7 md:p-9 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid rgba(11,26,70,0.06)', boxShadow: '0 8px 32px rgba(10,26,70,0.10)' }}>
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#0B1A46' }}>Full Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
            {Object.entries(product.fullSpecs).map(([k, v]) => (
              <div key={k} className="flex items-start justify-between py-2 border-b gap-4" style={{ borderColor: 'rgba(11,26,70,0.08)' }}>
                <span className="mono text-[11px] uppercase tracking-wider" style={{ color: '#58595B' }}>{k.replace(/_/g, ' ')}</span>
                <span className="text-sm text-right font-medium" style={{ color: '#0B1A46' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
