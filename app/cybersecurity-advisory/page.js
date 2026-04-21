import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import AdvisoryClient from './AdvisoryClient'

export const metadata = {
  title: 'Cybersecurity Advisory Canada & UAE — Zero Trust, SASE, Palo Alto | The Cyber Adviser',
  description: 'Premium cybersecurity advisory across Canada and UAE. Zero Trust architecture, SASE transformation, cloud security and Palo Alto Networks consulting from 15+ year experts.',
  alternates: { canonical: '/cybersecurity-advisory' },
  openGraph: {
    title: 'Cybersecurity Advisory — The Cyber Adviser × IP Care Technologies',
    description: 'Enterprise cybersecurity advisory: Zero Trust, SASE, cloud security, security automation. Canada & UAE.',
    url: '/cybersecurity-advisory',
    type: 'website',
  },
}

const advisoryService = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'The Cyber Adviser — Cybersecurity Advisory',
  description: 'Enterprise cybersecurity advisory: Zero Trust architecture, SASE transformation, cloud security, executive advisory and security automation.',
  provider: {
    '@type': 'Organization',
    name: 'IP Care Technologies L.L.C.',
    url: process.env.NEXT_PUBLIC_BASE_URL,
  },
  areaServed: [
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'United Arab Emirates' },
  ],
  serviceType: [
    'Zero Trust Architecture',
    'SASE Transformation',
    'Cloud Security',
    'Executive Cybersecurity Advisory',
    'Security Automation',
  ],
}

export default function CybersecurityAdvisoryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(advisoryService) }} />
      <Header />
      <AdvisoryClient />
      <Footer />
    </>
  )
}
