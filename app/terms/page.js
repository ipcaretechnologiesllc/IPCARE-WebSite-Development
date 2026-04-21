import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import { LegalPage, legalContent } from '../privacy-policy/shared'

export const metadata = {
  title: 'Terms of Service | IP Care Technologies',
  description: 'IP Care Technologies terms of service: website use, intellectual property, liability, and governing law.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (<><Header /><LegalPage title="Terms of Service" sections={legalContent.terms}/><Footer /></>)
}
