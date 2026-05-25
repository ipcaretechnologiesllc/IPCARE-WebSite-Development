'use client'

import { Phone } from 'lucide-react'

export default function CallNowButton() {
  return (
    <a
      href="tel:+971506828290"
      aria-label="Call Us"
      className="group floating-btn"
      style={{
        position: 'fixed',
        right: '24px',
        bottom: 'calc(196px + var(--cookie-offset, 0px))',
        zIndex: 9999,
        width: '56px',
        height: '56px',
        borderRadius: '9999px',
        background: '#E87722',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 14px rgba(232, 119, 34, 0.45)',
        transition: 'transform 200ms ease, box-shadow 200ms ease',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)'
        e.currentTarget.style.boxShadow = '0 8px 22px rgba(232, 119, 34, 0.6)'
        const tip = e.currentTarget.querySelector('.call-tooltip')
        if (tip) tip.style.opacity = '1'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = '0 4px 14px rgba(232, 119, 34, 0.45)'
        const tip = e.currentTarget.querySelector('.call-tooltip')
        if (tip) tip.style.opacity = '0'
      }}
    >
      <Phone size={24} color="#ffffff" strokeWidth={2} />
      <span
        className="call-tooltip"
        style={{
          position: 'absolute',
          right: '68px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#0B1A46',
          color: '#ffffff',
          padding: '6px 12px',
          borderRadius: '8px',
          fontSize: '12px',
          whiteSpace: 'nowrap',
          opacity: 0,
          transition: 'opacity 180ms ease',
          pointerEvents: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        Call Us
      </span>
    </a>
  )
}
