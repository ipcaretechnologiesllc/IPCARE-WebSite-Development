import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import BlogClient from './BlogClient'

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'

export const metadata = {
  title: 'IT Knowledge Base & Insights — IP Care Technologies Blog',
  description: 'Expert articles on cybersecurity, managed IT services, networking, cloud, and enterprise IT. Field-tested insights from IP Care engineers based in UAE and Canada.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'IT Knowledge Base & Insights — IP Care Technologies Blog',
    description: 'Expert articles on cybersecurity, managed IT services, networking, cloud, and enterprise IT. Field-tested insights from IP Care engineers based in UAE and Canada.',
    url: `${BASE}/blog`,
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'IP Care Knowledge Base — IT insights and articles' }],
  },
}

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'IP Care Technologies IT Knowledge Base',
  description: 'Expert articles on enterprise IT, cybersecurity, cloud, networking, and managed services.',
  url: `${BASE}/blog`,
  publisher: {
    '@type': 'Organization',
    name: 'IP Care Technologies L.L.C.',
    url: BASE,
  },
}

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <Header />
      <BlogClient />
      <Footer />
    </>
  )
}
