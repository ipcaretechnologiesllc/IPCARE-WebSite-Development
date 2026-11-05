import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import { LegalPage, legalContent } from '../privacy-policy/shared'
import { OG_IMAGES } from '@/lib/og'

export const revalidate = 3600

export const metadata = {
  title: 'Cookie Policy | IP Care Technologies',
  description: 'IP Care Technologies cookie policy: what cookies we use, why, and how you can manage your preferences.',
  alternates: { canonical: '/cookie-policy' },
  openGraph: {
    title: 'Cookie Policy | IP Care Technologies',
    description: 'IP Care Technologies cookie policy: what cookies we use, why, and how you can manage your preferences.',
    url: '/cookie-policy',
    type: 'website',
    images: OG_IMAGES,
  },
}

export default function CookiePage() {
  return (<><Header /><LegalPage title="Cookie Policy" sections={legalContent.cookies}/><Footer /></>)
}
