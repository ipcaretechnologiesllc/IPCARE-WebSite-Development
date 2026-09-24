import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import AboutClient from './AboutClient'
import { uaeFocus } from '@/lib/seo-region'

export const revalidate = 3600

export const metadata = {
  title: uaeFocus('About IP Care | Enterprise IT Partner, UAE & Canada'),
  description:
    uaeFocus('Enterprise IT infrastructure, cybersecurity and managed services across UAE and Canada since 2003. 500+ projects, 200+ enterprise clients.'),
  alternates: { canonical: '/about' },
  openGraph: {
    title: uaeFocus('About IP Care | Enterprise IT Partner, UAE & Canada'),
    description:
      uaeFocus('Enterprise IT infrastructure, cybersecurity and managed services across UAE and Canada since 2003. 500+ projects, 200+ enterprise clients.'),
    url: '/about',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'About IP Care Technologies, enterprise IT since 2003' }],
  },
}

export default function AboutPage() {
  return (
    <>
      {/* No hero preload here: React preloads the hero <img> (fetchPriority="high")
          in this page's HTML itself. Don't add react-dom preload() — it also rides in
          Next's link-prefetch payload, so every page linking here downloaded this hero. */}
      <Header />
      <AboutClient />
      <Footer />
    </>
  )
}
