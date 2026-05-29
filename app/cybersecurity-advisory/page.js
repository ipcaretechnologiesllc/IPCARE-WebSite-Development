import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import AdvisoryClient from './AdvisoryClient'

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'

export const metadata = {
  title: 'Cyber Advisory UAE — Zero Trust, SASE & Security',
  description: 'Cybersecurity advisory across UAE and Canada: Zero Trust, SASE, cloud security and executive advisory. Vendor-certified: Palo Alto, Fortinet, Check Point.',
  alternates: { canonical: '/cybersecurity-advisory' },
  openGraph: {
    title: 'Cyber Advisory UAE — Zero Trust, SASE & Security',
    description: 'Cybersecurity advisory across UAE and Canada: Zero Trust, SASE, cloud security and executive advisory. Vendor-certified: Palo Alto, Fortinet, Check Point.',
    url: '/cybersecurity-advisory',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Cyber advisory — Zero Trust, SASE and security architecture by IP Care' }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',            item: `${BASE}/` },
    { '@type': 'ListItem', position: 2, name: 'Cyber Advisory',  item: `${BASE}/cybersecurity-advisory` },
  ],
}

const advisorySchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'The Cyber Adviser — Cybersecurity Advisory',
  description: 'Enterprise cybersecurity advisory: Zero Trust architecture, SASE transformation, cloud security, executive advisory and security automation.',
  provider: {
    '@type': 'Organization',
    name: 'IP Care Technologies LLC',
    url: BASE,
  },
  areaServed: [
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Canada' },
  ],
  serviceType: [
    'Zero Trust Architecture',
    'SASE Transformation',
    'Cloud Security',
    'Executive Cybersecurity Advisory',
    'Security Automation',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Platform Expertise',
    itemListElement: [
      'Palo Alto Networks — Prisma Access, Cortex, Strata, XSIAM',
      'Check Point — Quantum, Harmony, CloudGuard, Infinity',
      'Fortinet — FortiGate, FortiEDR, FortiSASE, FortiAnalyzer',
      'Microsoft Azure — Defender, Sentinel, Entra ID, Purview',
      'AWS — GuardDuty, Security Hub, WAF, IAM Identity Center',
      'Google Cloud — Chronicle, SCC, BeyondCorp, Mandiant',
      'Zscaler — ZIA, ZPA, ZDX, ZTNA',
      'CrowdStrike — Falcon, Insight XDR, Identity, Cloud',
      'Netskope — SSE, CASB, SWG, ZTNA Next',
    ].map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s } })),
  },
}

export default function CybersecurityAdvisoryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(advisorySchema) }} />
      <Header />
      <AdvisoryClient />
      <Footer />
    </>
  )
}
