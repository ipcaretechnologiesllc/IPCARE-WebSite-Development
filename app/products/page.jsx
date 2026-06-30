import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import { products } from '@/lib/products-data'

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'

export const revalidate = 3600

export const metadata = {
  title: 'Products | IP Care Technologies',
  description: 'Software products built by IP Care Technologies, including CrewForce360, our field workforce operations platform with GPS-verified attendance.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Products | IP Care Technologies',
    description: 'Software products built by IP Care Technologies, including CrewForce360, our field workforce operations platform with GPS-verified attendance.',
    url: '/products',
    type: 'website',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',     item: `${BASE}/` },
    { '@type': 'ListItem', position: 2, name: 'Products', item: `${BASE}/products` },
  ],
}

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Products | IP Care Technologies',
  url: `${BASE}/products`,
}

function renderH1(h1, accent) {
  if (!accent || !h1.includes(accent)) return h1
  const i = h1.indexOf(accent)
  return (
    <>
      {h1.slice(0, i)}
      <span style={{ color: '#E87722' }}>{accent}</span>
      {h1.slice(i + accent.length)}
    </>
  )
}

export default function ProductsHubPage() {
  const entries = Object.entries(products)
  const h1 = 'Products Built by IP Care'
  const h1Accent = 'Products'

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <Header />
      <main>
        {/* Breadcrumb */}
        <div style={{ background: '#1E3A8A' }}>
          <div className="max-w-[1400px] mx-auto px-6 pt-5">
            <nav className="text-xs text-white/50 flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span className="text-white/80">Products</span>
            </nav>
          </div>
        </div>

        {/* Hero + grid, continuous dark navy gradient */}
        <section
          className="relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0B1A46 0%, #0F245F 50%, #1E3A8A 100%)',
            borderBottom: '3px solid #E87722',
          }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div
              className="absolute -top-32 left-1/4 w-[600px] h-[500px] rounded-full blur-3xl opacity-20"
              style={{ background: 'radial-gradient(circle, #E87722 0%, transparent 70%)' }}
            />
          </div>
          <div className="pointer-events-none absolute inset-0 premium-grid opacity-60" aria-hidden="true" />

          <div className="relative max-w-[1400px] mx-auto px-6" style={{ paddingTop: '80px', paddingBottom: '96px' }}>
            <div className="max-w-[840px] mx-auto text-center">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.35)' }}
              >
                <span className="text-[#E87722] text-xs font-semibold uppercase tracking-wider">Our Products</span>
              </div>

              <h1 className="text-white font-bold leading-[1.1] tracking-tight" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.25rem)' }}>
                {renderH1(h1, h1Accent)}
              </h1>

              <p
                className="mt-5 mx-auto"
                style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: '680px' }}
              >
                Software products built by IP Care Technologies for real operational problems.
              </p>
            </div>

            {/* Product cards */}
            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
              {entries.map(([slug, p]) => (
                <Link
                  key={slug}
                  href={`/products/${slug}`}
                  className="group rounded-2xl overflow-hidden flex flex-col"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {p.heroImage && (
                    <div className="w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
                      <img
                        src={p.heroImage}
                        alt={p.heroImageAlt || p.h1Accent || p.h1}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="text-white font-bold text-lg mb-2">{p.h1Accent || p.h1}</h2>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.75)' }}>
                      {p.tagline}
                    </p>
                    <span
                      className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
                      style={{ color: '#E87722' }}
                    >
                      Learn More <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
