'use client'

import { useEffect, useState } from 'react'
import * as Icons from 'lucide-react'

const LS = 'ipcare_cookie_v1'

export default function CookieConsent() {
  const [show, setShow] = useState(false)
  const [manage, setManage] = useState(false)
  const [prefs, setPrefs] = useState({ essential: true, analytics: true, marketing: false })

  useEffect(() => {
    try { if (!localStorage.getItem(LS)) setShow(true) } catch {}
  }, [])

  const save = (p) => { try { localStorage.setItem(LS, JSON.stringify({ ...p, ts: Date.now() })) } catch {}; setShow(false) }

  if (!show) return null
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[120] glass-card p-5" style={{ background: 'rgba(11,26,70,0.97)', border: '1px solid rgba(232,119,34,0.3)' }}>
      <div className="flex items-start gap-3 mb-3">
        <Icons.Cookie size={22} className="text-[#E87722] flex-shrink-0 mt-0.5"/>
        <div>
          <div className="text-white font-semibold text-sm mb-1">We use cookies</div>
          <p className="text-white/70 text-xs leading-relaxed">We use essential cookies to run the site, and optional cookies for analytics and personalisation. See our <a href="/cookie-policy" className="text-[#E87722] underline">Cookie Policy</a>.</p>
        </div>
      </div>
      {manage && (
        <div className="space-y-2 mb-3 text-xs text-white/80 pt-2 border-t border-white/10">
          {[{ k: 'essential', l: 'Essential', locked: true },{ k: 'analytics', l: 'Analytics' },{ k: 'marketing', l: 'Marketing' }].map(o => (
            <label key={o.k} className="flex items-center justify-between p-2 rounded" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <span>{o.l}{o.locked && <span className="mono text-[10px] text-white/50 ml-2">always on</span>}</span>
              <input type="checkbox" disabled={o.locked} checked={prefs[o.k]} onChange={(e) => setPrefs(p => ({ ...p, [o.k]: e.target.checked }))} className="accent-[#E87722]"/>
            </label>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => save({ essential: true, analytics: true, marketing: true })} className="btn-primary flex-1 justify-center !text-xs !py-2">Accept All</button>
        <button onClick={() => save({ essential: true, analytics: false, marketing: false })} className="btn-ghost flex-1 justify-center !text-xs !py-2">Reject Non-Essential</button>
      </div>
      {!manage ? (
        <button onClick={() => setManage(true)} className="w-full text-center mono text-[10px] text-[#E87722] uppercase tracking-widest mt-3 hover:underline">Manage Preferences</button>
      ) : (
        <button onClick={() => save(prefs)} className="w-full mono text-[11px] text-white/80 mt-3 py-2 rounded" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>Save Preferences</button>
      )}
    </div>
  )
}
