import Link from 'next/link'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'

export const metadata = { title: 'Page Not Found (404) | IP Care Technologies' }

export default function NotFound() {
  return (
    <>
      <Header />
      <main style={{ position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', overflow: 'hidden' }}>
        {/* Subtle decorative diagonal stripes */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.08, backgroundImage: 'repeating-linear-gradient(-45deg, #E87722 0, #E87722 2px, transparent 2px, transparent 40px)' }} />

        <div style={{ position: 'relative', maxWidth: '720px', textAlign: 'center' }}>
          <h1 style={{ color: '#E87722', fontSize: 'clamp(96px, 16vw, 160px)', fontWeight: 800, margin: 0, lineHeight: 1, letterSpacing: '-0.02em' }}>404</h1>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 700, marginTop: '12px', marginBottom: '16px' }}>Page Not Found</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.55, maxWidth: '480px', margin: '0 auto 32px auto' }}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
            <Link
              href="/"
              style={{ background: '#E87722', color: '#ffffff', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}
            >
              Back to Home
            </Link>
            <Link
              href="/services"
              style={{ background: 'transparent', color: '#ffffff', padding: '12px 24px', borderRadius: '8px', fontWeight: 500, fontSize: '14px', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.35)' }}
            >
              Browse Services
            </Link>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', marginTop: '28px' }}>
            Need help? Call{' '}
            <a href="tel:+97126766935" style={{ color: '#E87722', textDecoration: 'none' }}>+971 2 676 6935</a>{' '}
            or email{' '}
            <a href="mailto:info@ipcare.ae" style={{ color: '#E87722', textDecoration: 'none' }}>info@ipcare.ae</a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
