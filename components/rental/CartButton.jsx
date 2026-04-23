'use client'

import Link from 'next/link'
import * as Icons from 'lucide-react'
import { useCart } from './CartContext'

export default function CartButton({ onLight = false }) {
  const { count, setOpen, hydrated } = useCart()

  const lightStyle = {
    background: 'rgba(15,36,95,0.06)',
    border: '1px solid rgba(15,36,95,0.15)',
  }
  const darkStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
  }

  const textClass = onLight
    ? 'text-[#0F245F]/80 hover:text-[#0F245F]'
    : 'text-white/80 hover:text-white'

  return (
    <button
      onClick={() => setOpen(true)}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${textClass}`}
      style={onLight ? lightStyle : darkStyle}
      aria-label={`Quote cart, ${count} items`}
    >
      <Icons.Briefcase size={18}/>
      {hydrated && count > 0 && (
        <span
          className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
          style={{ background: '#E87722', boxShadow: onLight ? '0 0 0 2px #ffffff' : '0 0 0 2px #040a18' }}
        >
          {count}
        </span>
      )}
    </button>
  )
}
