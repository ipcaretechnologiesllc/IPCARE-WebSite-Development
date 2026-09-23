import { preload } from 'react-dom'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import AboutClient from './AboutClient'
import { srcSetFor } from '@/lib/responsive-image'
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
  preload('/images/pages/about-bg.webp', { as: 'image', fetchPriority: 'high', imageSrcSet: srcSetFor('/images/pages/about-bg.webp'), imageSizes: '100vw' })
  return (
    <>
      <Header />
      <AboutClient />
      <Footer />
    </>
  )
}
