import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import AboutClient from './AboutClient'

export const metadata = {
  title: 'About IP Care Technologies | Enterprise IT Partner Since 2003 | UAE & Canada',
  description:
    'IP Care Technologies has delivered enterprise IT infrastructure, cybersecurity, and managed services across UAE and Canada since 2003. 500+ projects. 200+ enterprise clients.',
  alternates: { canonical: '/about' },
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
