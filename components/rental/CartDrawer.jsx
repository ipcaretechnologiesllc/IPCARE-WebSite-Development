'use client'

import { useState } from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { useCart } from './CartContext'
import RFQModal from './RFQModal'

const DURATION_LABEL = { daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly' }

export default function CartDrawer() {
  const { items, count, remove, updateQty, clear, open, setOpen } = useCart()
  const [showRFQ, setShowRFQ] = useState(false)
  const [showConfirmClear, setShowConfirmClear] = useState(false)

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)}/>
      <aside className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] z-[95] flex flex-col" style={{ background: 'rgba(7,16,42,0.98)', backdropFilter: 'blur(20px)', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
        <header className="flex items-center justify-between px-6 h-[72px] border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(232,119,34,0.15)' }}>
              <Icons.ShoppingCart size={16} className="text-[#E87722]"/>
            </div>
            <div>
              <div className="text-white font-semibold">Your Quote Cart</div>
              <div className="text-white/60 text-xs mono">{count} item{count !== 1 ? 's' : ''}</div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white" aria-label="Close cart"><Icons.X size={22}/></button>
        </header>

        <div className="flex-1 overflow-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <Icons.Package size={26} className="text-white/60"/>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Your cart is empty</h3>
              <p className="body-text text-sm mb-6">Browse our catalogue and add items to build a tailored quote.</p>
              <Link href="/rental" onClick={() => setOpen(false)} className="btn-primary">Browse Catalogue <Icons.ArrowRight size={14}/></Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(i => (
                <div key={i.key} className="glass-card p-4 flex gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-black/30">
                    <img src={`${i.image}?w=200&q=75`} alt={i.model} className="w-full h-full object-cover"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mono text-[10px] uppercase tracking-widest text-white/50">{i.brand}</div>
                    <h4 className="text-white font-semibold text-sm leading-tight truncate">{i.model}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="mono text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(232,119,34,0.15)', color: '#ffd7b8', border: '1px solid rgba(232,119,34,0.35)' }}>{DURATION_LABEL[i.duration] || i.duration}</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => updateQty(i.key, i.quantity - 1)} className="w-6 h-6 rounded flex items-center justify-center text-white/70 hover:text-white" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}><Icons.Minus size={10}/></button>
                        <span className="text-white text-xs font-semibold min-w-[20px] text-center mono">{i.quantity}</span>
                        <button onClick={() => updateQty(i.key, i.quantity + 1)} className="w-6 h-6 rounded flex items-center justify-center text-white/70 hover:text-white" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}><Icons.Plus size={10}/></button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => remove(i.key)} className="self-start text-white/40 hover:text-red-400" aria-label="Remove item"><Icons.Trash2 size={15}/></button>
                </div>
              ))}
              {showConfirmClear && (
                <div className="glass-card p-4 border-red-500/40" style={{ borderColor: 'rgba(239,68,68,0.3)' }}>
                  <p className="text-white text-sm mb-3">Clear all items from cart?</p>
                  <div className="flex gap-2">
                    <button onClick={() => { clear(); setShowConfirmClear(false) }} className="flex-1 px-3 py-2 rounded text-white text-xs font-semibold" style={{ background: '#dc2626' }}>Yes, clear</button>
                    <button onClick={() => setShowConfirmClear(false)} className="flex-1 px-3 py-2 rounded text-white/80 text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-white/10 px-5 py-4 space-y-2">
            <button onClick={() => setShowRFQ(true)} className="btn-primary w-full justify-center">Submit Quote Request <Icons.ArrowRight size={15}/></button>
            <button onClick={() => setShowConfirmClear(true)} className="w-full text-white/50 hover:text-red-400 text-xs mono uppercase tracking-widest py-2">Clear Cart</button>
            <p className="text-center text-[11px] text-white/40 mono">UAE &amp; Canada · Delivery &amp; Setup · Technical Support</p>
          </footer>
        )}
      </aside>

      {showRFQ && <RFQModal onClose={() => setShowRFQ(false)} onSuccess={() => { clear(); setShowRFQ(false); setOpen(false) }} items={items}/>}
    </>
  )
}
