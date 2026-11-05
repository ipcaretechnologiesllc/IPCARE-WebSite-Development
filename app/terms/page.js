import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import { LegalPage, legalContent } from '../privacy-policy/shared'
import { OG_IMAGES } from '@/lib/og'

export const revalidate = 3600

export const metadata = {
  title: 'Terms of Service | IP Care Technologies',
  description: 'IP Care Technologies terms of service: website use, intellectual property, liability, and governing law.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service | IP Care Technologies',
    description: 'IP Care Technologies terms of service: website use, intellectual property, liability, and governing law.',
    url: '/terms',
    type: 'website',
    images: OG_IMAGES,
  },
}

export default function TermsPage() {
  return (<><Header /><LegalPage title="Terms of Service" sections={legalContent.terms}/><Footer /></>)
}
