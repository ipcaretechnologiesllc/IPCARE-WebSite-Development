'use client'

import Link from 'next/link'
import * as Icons from 'lucide-react'
import AddToQuoteButton from './AddToQuoteButton'

export default function ProductCard({ product, categorySlug }) {
  const p = { ...product, categorySlug }
  return (
    <div className="rental-product-card overflow-hidden group flex flex-col h-full">
      <Link href={`/rental/${categorySlug}/${product.slug}`} className="relative block h-60 overflow-hidden" style={{ background: '#ffffff' }}>
        <img src={product.image.startsWith('http') ? `${product.image}?w=600&q=80` : product.image} alt={`${product.brand} ${product.model}`} loading="lazy" className="absolute inset-0 w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105 p-3"/>
        <div className="absolute top-3 left-3 mono text-[13px] uppercase tracking-widest px-2 py-1 rounded" style={{ background: '#E87722', border: 'none', color: '#ffffff' }}>{product.brand}</div>
      </Link>

      <div className="flex-1 flex flex-col p-5">
        <Link href={`/rental/${categorySlug}/${product.slug}`} className="group/title">
          <h3 className="font-semibold text-base md:text-lg leading-snug mb-3 group-hover/title:text-[#E87722] transition-colors" style={{ color: '#0B1A46' }}>{product.model}</h3>
        </Link>
        <ul className="space-y-1.5 mb-4 flex-1">
          {product.specs.map((s, i) => (
            <li key={i} className="text-xs flex items-start gap-2" style={{ color: '#58595B' }}><Icons.Check size={12} className="text-[#E87722] mt-0.5 flex-shrink-0"/> {s}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {['daily', 'weekly', 'monthly'].map(d => (
            <span key={d} className="rental-spec-pill">{d}</span>
          ))}
        </div>
        <AddToQuoteButton product={p} size="sm"/>
      </div>
    </div>
  )
}
