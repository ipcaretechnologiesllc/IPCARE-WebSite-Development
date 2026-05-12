import Link from 'next/link'
import { notFound } from 'next/navigation'
import * as Icons from 'lucide-react'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import { articles, getArticle, getAllArticleSlugs } from '@/lib/blog-data'

export async function generateStaticParams() {
  return getAllArticleSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }) {
  const a = getArticle(params.slug)
  if (!a) return {}
  return {
    title: `${a.title} | IP Care Technologies Blog`,
    description: a.excerpt,
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: { title: a.title, description: a.excerpt, url: `/blog/${params.slug}`, images: [`${a.img}?w=1200&q=85`], type: 'article', publishedTime: a.date, authors: [a.author] },
  }
}

export default function ArticlePage({ params }) {
  const a = getArticle(params.slug)
  if (!a) notFound()
  const related = articles.filter(x => x.slug !== params.slug).slice(0, 3)

  const articleSchema = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: a.title, image: [`${a.img}?w=1200&q=85`], datePublished: a.date, author: { '@type': 'Person', name: a.author },
    publisher: { '@type': 'Organization', name: 'IP Care Technologies L.L.C.', url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://ipcare.ae') },
    description: a.excerpt,
  }
  const breadcrumb = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://ipcare.ae') + '/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://ipcare.ae') + '/blog' },
      { '@type': 'ListItem', position: 3, name: a.title, item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://ipcare.ae') + `/blog/${params.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Header />
      <main>
        <div className="max-w-[1200px] mx-auto px-6 pt-6">
          <nav className="text-xs text-white/50 flex items-center gap-1.5">
            <Link href="/" className="hover:text-white">Home</Link><Icons.ChevronRight size={12}/>
            <Link href="/blog" className="hover:text-white">Blog</Link><Icons.ChevronRight size={12}/>
            <span className="text-white/80 truncate">{a.title}</span>
          </nav>
        </div>

        <section className="py-12 md:py-16 px-6">
          <div className="max-w-[850px] mx-auto">
            <span className="mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded inline-block mb-5" style={{ background: '#E87722', color: '#fff' }}>{a.category}</span>
            <h1 className="text-white text-3xl md:text-5xl font-bold leading-[1.1] mb-6">{a.title}</h1>
            <div className="flex items-center gap-4 text-white/60 text-sm mono mb-8">
              <span>{a.author}</span>
              <span>\u2022</span>
              <span>{a.date}</span>
              <span>\u2022</span>
              <span className="flex items-center gap-1"><Icons.Clock size={13}/>{a.readTime}</span>
            </div>
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10">
              <img src={`${a.img}?w=1600&q=85`} alt={a.title} className="absolute inset-0 w-full h-full object-cover"/>
            </div>

            <article className="space-y-5">
              {a.body.map((b, i) => {
                if (b.h2) return <h2 key={i} className="text-white text-2xl md:text-3xl font-bold mt-10 mb-2">{b.h2}</h2>
                if (b.cta) return (
                  <Link key={i} href={b.cta.href} className="block mt-8 p-5 rounded-xl group" style={{ background: 'rgba(232,119,34,0.07)', border: '1px solid rgba(232,119,34,0.28)' }}>
                    {b.cta.label && <div className="mono text-[10px] uppercase tracking-widest text-[#E87722] mb-1.5">{b.cta.label}</div>}
                    <div className="text-white text-base md:text-lg font-semibold group-hover:text-[#E87722] transition">{b.cta.text}</div>
                  </Link>
                )
                return <p key={i} className="body-text text-base md:text-lg leading-[1.75]">{b.p}</p>
              })}
            </article>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="mono text-xs text-white/50 uppercase tracking-widest">Share</span>
                {[{ I: Icons.Linkedin, href: '#' }, { I: Icons.Twitter, href: '#' }, { I: Icons.Facebook, href: '#' }, { I: Icons.Link, href: '#' }].map(({ I, href }, i) => (
                  <a key={i} href={href} className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-[#E87722] transition" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}><I size={14}/></a>
                ))}
              </div>
            </div>

            {/* Author bio */}
            <div className="mt-10 glass-card p-6 flex gap-4 items-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold mono text-xl flex-shrink-0" style={{ background: 'linear-gradient(135deg, #E87722 0%, #0D2B55 100%)' }}>{a.author.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
              <div>
                <div className="text-white font-semibold">{a.author}</div>
                <p className="body-text text-xs mt-1">Senior contributor to the IP Care Knowledge Base.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 px-6" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
          <div className="max-w-[800px] mx-auto rounded-2xl p-10 text-center" style={{ background: 'rgba(232,119,34,0.07)', border: '1px solid rgba(232,119,34,0.28)' }}>
            <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Newsletter</div>
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-3">Monthly insights, zero spam.</h2>
            <p className="body-text mb-6">Enterprise IT analysis delivered to your inbox once a month.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-3 rounded-full text-white text-sm" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)' }}/>
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>
        </section>

        {/* Related */}
        <section className="py-16 px-6">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map(r => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="glass-card overflow-hidden group block">
                  <div className="relative h-40 overflow-hidden">
                    <img src={`${r.img}?w=600&q=75`} alt={r.title} className="w-full h-full object-cover"/>
                    <span className="absolute top-3 left-3 mono text-[9px] uppercase tracking-widest px-2 py-1 rounded" style={{ background: '#E87722', color: '#fff' }}>{r.category}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-white font-semibold text-base leading-snug group-hover:text-[#E87722]">{r.title}</h3>
                    <div className="mt-3 mono text-[10px] text-white/50 uppercase tracking-wider">{r.date} \u2022 {r.readTime}</div>
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
