'use client'

import React, { Component, useState } from 'react'
import * as Icons from 'lucide-react'

// ErrorBoundary class — cannot break the whole page if anything throws
class NewsletterErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(err) {
    try { console.error('[NewsletterStrip] render error:', err?.message || err) } catch {}
  }
  render() {
    if (this.state.hasError) return null // silently hide on any crash; never block the page
    return this.props.children
  }
}

function NewsletterStripInner() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [err, setErr] = useState('')

  async function onSubmit(e) {
    try {
      e.preventDefault()
      setErr('')
      const trimmed = (email || '').trim()
      if (!trimmed || !/^\S+@\S+\.\S+$/.test(trimmed)) {
        setErr('Please enter a valid email address.')
        return
      }
      setSubmitting(true)
      let ok = false
      try {
        const res = await fetch('/api/newsletter/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmed, source: 'blog_page' }),
        })
        if (res && res.ok) ok = true
        else if (res && res.status === 404) {
          setErr("Newsletter signup isn't available right now. Please try again later.")
        } else {
          setErr('Subscription failed, please try again.')
        }
      } catch (networkErr) {
        setErr("Subscription failed, please try again later.")
      }
      if (ok) setSubmitted(true)
    } catch {
      // Absolute last-resort safety net — no throws allowed
      setErr('Something went wrong. Please try again later.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      className="w-full px-6"
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255,255,255,0.10)',
        borderBottom: '1px solid rgba(255,255,255,0.10)',
        paddingTop: '72px',
        paddingBottom: '72px',
      }}
    >
      <div className="max-w-[640px] mx-auto text-center">
        <div
          className="uppercase"
          style={{ color: '#E87722', fontSize: '12px', letterSpacing: '2px', marginBottom: '12px' }}
        >
          Stay Informed
        </div>
        <h2
          className="text-white font-bold mb-4"
          style={{ fontSize: '32px', fontWeight: 700, lineHeight: 1.25 }}
        >
          Monthly Insights from IP Care Engineers
        </h2>
        <p
          style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.55, marginBottom: '28px' }}
        >
          Zero spam. One monthly email with our best articles on cybersecurity, cloud, and enterprise IT. Unsubscribe anytime.
        </p>

        {submitted ? (
          <div
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg mx-auto"
            style={{
              background: 'rgba(34,197,94,0.12)',
              border: '1px solid rgba(34,197,94,0.4)',
              color: '#4ade80',
            }}
          >
            <Icons.Check size={18} />
            <span className="text-sm font-medium">You&apos;re subscribed. Welcome aboard.</span>
          </div>
        ) : (
          <>
            <form
              onSubmit={onSubmit}
              className="flex flex-col sm:flex-row mx-auto"
              style={{ gap: '8px', maxWidth: '520px' }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@company.com"
                required
                disabled={submitting}
                className="flex-1 text-white text-sm focus:outline-none focus:border-[#E87722]"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  height: '48px',
                  borderRadius: '8px',
                  padding: '0 16px',
                }}
              />
              <button
                type="submit"
                disabled={submitting}
                className="text-white text-sm font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-60 transition-opacity"
                style={{
                  background: '#E87722',
                  height: '48px',
                  borderRadius: '8px',
                  padding: '0 28px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {submitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {err && <div className="text-red-400 text-xs mt-3">{err}</div>}
          </>
        )}
      </div>
    </section>
  )
}

export default function NewsletterStrip() {
  return (
    <NewsletterErrorBoundary>
      <NewsletterStripInner />
    </NewsletterErrorBoundary>
  )
}
