'use client'

import { useEffect, useRef, useState } from 'react'
import * as Icons from 'lucide-react'

const LS_KEY = 'ipcare_cookie_consent'
const LS_PREFS = 'ipcare_cookie_prefs'

export default function CookieBanner() {
  const [show, setShow] = useState(false)
  const [manage, setManage] = useState(false)
  const [prefs, setPrefs] = useState({ essential: true, analytics: true, marketing: false })
  const ref = useRef(null)

  useEffect(() => {
    try {
      const v = localStorage.getItem(LS_KEY)
      if (v !== 'accepted' && v !== 'rejected') setShow(true)
    } catch {}
  }, [])

  // Measure banner height and expose as --cookie-offset CSS variable so floating buttons can shift up
  useEffect(() => {
    if (!show) {
      document.documentElement.style.setProperty('--cookie-offset', '0px')
      return
    }
    const update = () => {
      const h = ref.current?.offsetHeight || 0
      document.documentElement.style.setProperty('--cookie-offset', h ? `${h + 16}px` : '0px')
    }
    update()
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('resize', update)
      document.documentElement.style.setProperty('--cookie-offset', '0px')
    }
  }, [show, manage])

  const commit = (choice, savedPrefs) => {
    try {
      localStorage.setItem(LS_KEY, choice)
      if (savedPrefs) localStorage.setItem(LS_PREFS, JSON.stringify(savedPrefs))
    } catch {}
    setShow(false)
  }

  if (!show) return null

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9998,
        background: 'rgba(7, 16, 42, 0.98)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255,255,255,0.10)',
        padding: '20px 32px',
      }}
    >
      <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start gap-3">
          <Icons.Cookie size={24} color="#E87722" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>We use cookies</div>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.5, maxWidth: '780px' }}>
              We use essential cookies to make the site work, and analytics cookies to improve your experience. Read our{' '}
              <a href="/cookie-policy" style={{ color: '#E87722', textDecoration: 'underline' }}>Cookie Policy</a>.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2" style={{ flexShrink: 0 }}>
          <button
            onClick={() => commit('accepted', { essential: true, analytics: true, marketing: true })}
            style={{ background: '#E87722', color: '#ffffff', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, fontSize: '14px', border: 'none', cursor: 'pointer' }}
          >
            Accept All
          </button>
          <button
            onClick={() => commit('rejected', { essential: true, analytics: false, marketing: false })}
            style={{ background: 'transparent', color: '#ffffff', padding: '10px 20px', borderRadius: '8px', fontWeight: 500, fontSize: '14px', border: '1.5px solid rgba(255,255,255,0.4)', cursor: 'pointer' }}
          >
            Reject
          </button>
          <button
            onClick={() => setManage(true)}
            className="hover:underline"
            style={{ background: 'transparent', color: 'rgba(255,255,255,0.7)', padding: '10px 12px', fontSize: '14px', border: 'none', cursor: 'pointer', textDecoration: 'none' }}
          >
            Manage Preferences
          </button>
        </div>
      </div>

      {manage && (
        <div
          role="dialog"
          aria-label="Cookie preferences"
          onClick={(e) => { if (e.target === e.currentTarget) setManage(false) }}
          style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
        >
          <div style={{ background: 'rgba(11,26,70,0.98)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px', padding: '32px', maxWidth: '480px', width: '100%' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ color: '#ffffff', fontSize: '20px', fontWeight: 700 }}>Cookie Preferences</h3>
              <button onClick={() => setManage(false)} aria-label="Close" style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>
                <Icons.X size={22} />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { k: 'essential', l: 'Essential', d: 'Required for the site to function.', locked: true },
                { k: 'analytics', l: 'Analytics', d: 'Helps us understand how the site is used.' },
                { k: 'marketing', l: 'Marketing', d: 'Used to show you relevant offers.' },
              ].map(o => (
                <label key={o.k} className="flex items-start justify-between gap-4 p-4 rounded-lg cursor-pointer" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div>
                    <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '14px' }}>
                      {o.l}
                      {o.locked && <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginLeft: '8px', fontWeight: 400 }}>always on</span>}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginTop: '2px' }}>{o.d}</div>
                  </div>
                  <input
                    type="checkbox"
                    disabled={o.locked}
                    checked={prefs[o.k]}
                    onChange={(e) => setPrefs(p => ({ ...p, [o.k]: e.target.checked }))}
                    className="accent-[#E87722]"
                    style={{ width: '18px', height: '18px', flexShrink: 0, marginTop: '2px' }}
                  />
                </label>
              ))}
            </div>
            <button
              onClick={() => { commit(prefs.analytics || prefs.marketing ? 'accepted' : 'rejected', prefs); setManage(false) }}
              style={{ marginTop: '20px', width: '100%', background: '#E87722', color: '#ffffff', padding: '12px 20px', borderRadius: '8px', fontWeight: 600, fontSize: '14px', border: 'none', cursor: 'pointer' }}
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
