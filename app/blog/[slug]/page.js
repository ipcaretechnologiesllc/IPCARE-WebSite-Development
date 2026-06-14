import Link from 'next/link'
import { preload } from 'react-dom'
import { notFound } from 'next/navigation'
import * as Icons from 'lucide-react'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import NewsletterStrip from '@/components/blog/NewsletterStrip'
import { articles, getArticle, getAllArticleSlugs, getAuthor, getKeyTakeaways, toISODate } from '@/lib/blog-data'

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'

export async function generateStaticParams() {
  return getAllArticleSlugs().map(slug => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }) {
  const a = getArticle(params.slug)
  if (!a) return {}
  return {
    title: a.seoTitle || `${a.title} | IP Care Technologies Blog`,
    description: a.excerpt,
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: {
      title: a.title,
      description: a.excerpt,
      url: `${BASE}/blog/${params.slug}`,
      images: [`${a.img}?w=1200&q=85`],
      type: 'article',
      publishedTime: toISODate(a.date),
      authors: [a.author],
    },
  }
}

export default function ArticlePage({ params }) {
  const a = getArticle(params.slug)
  if (!a) notFound()

  // Preload the article hero (the LCP element) so it doesn't pop in after first paint.
  preload(`${a.img}?w=1200&fm=webp&q=82`, { as: 'image', fetchPriority: 'high' })

  // Same-category articles first, then fill from others
  const sameCat = articles.filter(x => x.slug !== params.slug && x.category === a.category)
  const others  = articles.filter(x => x.slug !== params.slug && x.category !== a.category)
  const related = [...sameCat, ...others].slice(0, 3)

  const authorInfo = getAuthor(a.author)
  const keyTakeaways = getKeyTakeaways(params.slug)
  // Named experts get Person schema (with jobTitle/worksFor for E-E-A-T); the generic
  // 'IP Care Team' byline falls back to the Organization as author.
  const authorSchema = authorInfo
    ? {
        '@type': 'Person',
        name: authorInfo.name,
        jobTitle: authorInfo.jobTitle,
        worksFor: { '@type': 'Organization', name: 'IP Care Technologies L.L.C.', url: BASE },
        ...(authorInfo.url ? { url: authorInfo.url, sameAs: [authorInfo.url] } : {}),
      }
    : { '@type': 'Organization', name: 'IP Care Technologies L.L.C.', url: BASE }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: a.title,
    image: [`${a.img}?w=1200&q=85`],
    datePublished: toISODate(a.date),
    dateModified: toISODate(a.updatedDate || a.date),
    author: authorSchema,
    publisher: { '@type': 'Organization', name: 'IP Care Technologies L.L.C.', url: BASE },
    description: a.excerpt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/blog/${params.slug}` },
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',  item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog',  item: `${BASE}/blog` },
      { '@type': 'ListItem', position: 3, name: a.title, item: `${BASE}/blog/${params.slug}` },
    ],
  }

  const shareUrl = `${BASE}/blog/${params.slug}`

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Header />
      <main>

        {/* ── HERO — navy + grid + orange border ─────────────────────── */}
        <section style={{ background: 'linear-gradient(160deg, #0B1A46 0%, #1E3A8A 100%)', borderBottom: '3px solid #E87722', position: 'relative', overflow: 'hidden' }}>
          <div className="premium-grid" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
          <div style={{ position: 'absolute', top: '-80px', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(232,119,34,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div className="relative px-6 pt-6 pb-12 md:pb-16 max-w-[900px] mx-auto">
            {/* Breadcrumb */}
            <nav className="text-xs flex items-center gap-1.5 mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Icons.ChevronRight size={12} />
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <Icons.ChevronRight size={12} />
              <span className="truncate max-w-[260px]" style={{ color: 'rgba(255,255,255,0.8)' }}>{a.title}</span>
            </nav>
            <span className="mono text-[13px] uppercase tracking-widest px-2.5 py-1 rounded inline-block mb-5" style={{ background: '#E87722', color: '#fff' }}>{a.category}</span>
            <h1 className="text-white text-3xl md:text-5xl font-bold leading-[1.1] mb-6">{a.title}</h1>
            <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm mono" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <span>{a.author}</span>
              <span>&bull;</span>
              <span>{a.date}</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1"><Icons.Clock size={13} />{a.readTime}</span>
            </div>
          </div>
        </section>

        {/* ── ARTICLE BODY ────────────────────────────────────────────── */}
        <section className="px-6 py-12" style={{ background: '#fff' }}>
          <div className="max-w-[720px] mx-auto">
            {/* Hero image — LCP element; eager + preload hint */}
            <div className="relative rounded-2xl overflow-hidden mb-10" style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #E1E8F0 0%, #F4F6FA 100%)' }}>
              <img
                src={`${a.img}?w=1200&fm=webp&q=82`}
                alt={a.title}
                width={1200}
                height={675}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Key takeaways — answer-ready summary for readers and AI engines */}
            {keyTakeaways?.length > 0 && (
              <aside
                className="mb-10 rounded-2xl p-6 md:p-7"
                style={{ background: '#F4F6FA', border: '1px solid #E1E8F0', borderLeft: '4px solid #E87722' }}
                aria-label="Key takeaways"
              >
                <h2 className="mono text-[13px] uppercase tracking-widest mb-4" style={{ color: '#E87722' }}>Key Takeaways</h2>
                <ul className="space-y-3">
                  {keyTakeaways.map((t, i) => (
                    <li key={i} className="flex gap-3 text-base leading-relaxed" style={{ color: '#374151' }}>
                      <Icons.Check size={18} className="flex-shrink-0 mt-1 text-[#E87722]" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            {/* Body content */}
            <article className="space-y-5">
              {a.body.map((b, i) => {
                if (b.h2) return (
                  <h2 key={i} className="font-bold mt-10 mb-2" style={{ color: '#0B1A46', fontSize: '1.5rem', lineHeight: 1.3 }}>{b.h2}</h2>
                )
                if (b.cta) return (
                  <Link key={i} href={b.cta.href} className="block mt-8 p-5 rounded-xl group" style={{ background: 'rgba(232,119,34,0.06)', border: '1px solid rgba(232,119,34,0.28)' }}>
                    {b.cta.label && <div className="mono text-[13px] uppercase tracking-widest mb-1.5" style={{ color: '#E87722' }}>{b.cta.label}</div>}
                    <div className="text-base md:text-lg font-semibold group-hover:text-[#E87722] transition" style={{ color: '#0B1A46' }}>{b.cta.text}</div>
                  </Link>
                )
                return <p key={i} className="text-base md:text-lg leading-[1.75]" style={{ color: '#374151' }}>{b.p}</p>
              })}
            </article>

            {/* Share bar */}
            <div className="mt-12 pt-8 flex items-center gap-3 flex-wrap" style={{ borderTop: '1px solid #E5E7EB' }}>
              <span className="mono text-xs uppercase tracking-widest" style={{ color: '#9CA3AF' }}>Share</span>
              {[
                { I: Icons.Linkedin, label: 'Share on LinkedIn', href: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(a.title)}` },
                { I: Icons.Twitter,  label: 'Share on Twitter',  href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(a.title)}` },
                { I: Icons.Facebook, label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
              ].map(({ I, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#4B5563] bg-[#F4F6FA] border border-[#E1E8F0] hover:bg-[#E87722] hover:text-white hover:border-[#E87722] transition-all"
                >
                  <I size={14} />
                </a>
              ))}
            </div>

            {/* Author bio */}
            <div className="mt-10 flex gap-4 items-center p-6 rounded-2xl" style={{ background: '#F4F6FA', border: '1px solid #E1E8F0' }}>
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold mono text-lg flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #E87722 0%, #0B1A46 100%)' }}
              >
                {a.author.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div>
                <div className="font-semibold" style={{ color: '#0B1A46' }}>{a.author}</div>
                <p className="text-xs mt-1" style={{ color: '#6B7280' }}>{authorInfo?.bio || (authorInfo?.jobTitle ? `${authorInfo.jobTitle}, IP Care Technologies.` : 'Contributor to the IP Care Knowledge Base.')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED ARTICLES ────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="px-6 py-16" style={{ background: '#F4F6FA' }}>
            <div className="max-w-[1100px] mx-auto">
              <h2 className="font-bold text-2xl md:text-3xl mb-8" style={{ color: '#0B1A46' }}>
                {sameCat.length > 0 ? `More on ${a.category}` : 'Related Articles'}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map(r => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="service-card group flex flex-col overflow-hidden"
                    style={{ padding: 0 }}
                  >
                    <div className="relative overflow-hidden flex-shrink-0" style={{ aspectRatio: '16/10' }}>
                      <img
                        src={`${r.img}?w=600&fm=webp&q=82`}
                        alt={r.title}
                        width={600}
                        height={375}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <span className="absolute top-3 left-3 mono text-[13px] uppercase tracking-widest px-2 py-1 rounded" style={{ background: '#E87722', color: '#fff' }}>{r.category}</span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-semibold text-base leading-snug mb-2 group-hover:text-[#E87722] transition-colors" style={{ color: '#0B1A46' }}>{r.title}</h3>
                      <div className="mt-auto mono text-[13px] uppercase tracking-wider" style={{ color: '#94A3B8' }}>{r.date} &bull; {r.readTime}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── NEWSLETTER ─────────────────────────────────────────────── */}
        <NewsletterStrip />

      </main>
      <Footer />
    </>
  )
}
