'use client'

import Link from 'next/link'
import * as Icons from 'lucide-react'
import { useCart } from './CartContext'

export default function CartButton() {
  const { count, setOpen, hydrated } = useCart()
  return (
    <button
      onClick={() => setOpen(true)}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg text-white/80 hover:text-white transition-colors"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
      aria-label={`Quote cart, ${count} items`}
    >
      <Icons.ShoppingCart size={18}/>
      {hydrated && count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: '#E87722', boxShadow: '0 0 0 2px #040a18' }}>
          {count}
        </span>
      )}
    </button>
  )
}
