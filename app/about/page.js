import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import AboutClient from './AboutClient'

export const metadata = {
  title: 'About IP Care | Enterprise IT Partner, UAE & Canada',
  description:
    'Enterprise IT infrastructure, cybersecurity and managed services across UAE and Canada since 2003. 500+ projects, 200+ enterprise clients.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About IP Care | Enterprise IT Partner, UAE & Canada',
    description:
      'Enterprise IT infrastructure, cybersecurity and managed services across UAE and Canada since 2003. 500+ projects, 200+ enterprise clients.',
    url: '/about',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'About IP Care Technologies, enterprise IT since 2003' }],
  },
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutClient />
      <Footer />
    </>
  )
}
