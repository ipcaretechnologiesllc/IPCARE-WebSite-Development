import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import { LegalPage, legalContent } from './shared'

export const metadata = {
  title: 'Privacy Policy | IP Care Technologies',
  description: 'IP Care Technologies privacy policy: what data we collect, how we use it, and your rights under UAE PDPL and Canadian PIPEDA.',
  alternates: { canonical: '/privacy-policy' },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (<><Header /><LegalPage title="Privacy Policy" sections={legalContent.privacy}/><Footer /></>)
}
