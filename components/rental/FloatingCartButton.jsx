'use client'

import * as Icons from 'lucide-react'
import { useCart } from './CartContext'

export default function FloatingCartButton() {
  const { count, setOpen, hydrated } = useCart()

  return (
    <button
      onClick={() => setOpen(true)}
      aria-label={`Open quote cart, ${count} item${count === 1 ? '' : 's'}`}
      className="group fixed transition-all floating-btn"
      style={{
        bottom: 'calc(24px + var(--cookie-offset, 0px))',
        right: '24px',
        zIndex: 9999,
        width: '56px',
        height: '56px',
        borderRadius: '9999px',
        background: '#E87722',
        boxShadow: '0 10px 25px rgba(232,119,34,0.35), 0 4px 10px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)'
        e.currentTarget.style.boxShadow = '0 15px 35px rgba(232,119,34,0.5), 0 6px 15px rgba(0,0,0,0.25)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(232,119,34,0.35), 0 4px 10px rgba(0,0,0,0.2)'
      }}
    >
      <Icons.Briefcase size={24} color="#ffffff" strokeWidth={2} />
      {hydrated && count > 0 && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            minWidth: '20px',
            height: '20px',
            padding: '0 5px',
            borderRadius: '9999px',
            background: '#DC2626',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #040a18',
            lineHeight: 1,
          }}
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  )
}
