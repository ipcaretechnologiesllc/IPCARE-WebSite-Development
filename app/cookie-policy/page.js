import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import { LegalPage, legalContent } from '../privacy-policy/shared'

export const metadata = {
  title: 'Cookie Policy | IP Care Technologies',
  description: 'IP Care Technologies cookie policy: what cookies we use, why, and how you can manage your preferences.',
  alternates: { canonical: '/cookie-policy' },
}

export default function CookiePage() {
  return (<><Header /><LegalPage title="Cookie Policy" sections={legalContent.cookies}/><Footer /></>)
}
