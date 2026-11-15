import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import AdvisoryClient from './AdvisoryClient'
import AdvisoryFaq, { ADVISORY_FAQS } from './AdvisoryFaq'
import { uaeFocus } from '@/lib/seo-region'
import { serviceCountries } from '@/lib/schema'

export const revalidate = 3600

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'

// Search Console, UAE, 28 days to 2026-10-21: the page shows for "zero trust dubai" (11.6),
// "zero trust uae" (7.0) and "ztna dubai" but had 0 clicks from 143 impressions, so the
// title leads with Zero Trust and the city.
// 2026-11-15: the generic searches reaching this page ("cyber security services in dubai",
// "cyber security advisory services") never matched a title that opened with "Zero Trust". The
// title now leads with "Cybersecurity Advisory", matching the H1, and keeps Zero Trust, SASE and
// Dubai so "zero trust dubai" (pos 9.6) is not lost.
const TITLE = 'Cybersecurity Advisory Dubai: Zero Trust & SASE | IP Care'
const DESCRIPTION = uaeFocus('Zero Trust, ZTNA and SASE advisory in Dubai and across UAE and Canada from Palo Alto, Fortinet and Check Point certified engineers. Architecture, roadmap, migration.')

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/cybersecurity-advisory' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/cybersecurity-advisory',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Cyber advisory, Zero Trust, SASE and security architecture by IP Care' }],
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
  name: 'The Cyber Adviser: Cybersecurity Advisory',
  description: 'Enterprise cybersecurity advisory: Zero Trust architecture, SASE transformation, cloud security, executive advisory and security automation.',
  provider: { '@id': 'https://www.ipcare.ae#org' },
  areaServed: serviceCountries(),
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
      'Palo Alto Networks, Prisma Access, Cortex, Strata, XSIAM',
      'Check Point, Quantum, Harmony, CloudGuard, Infinity',
      'Fortinet, FortiGate, FortiEDR, FortiSASE, FortiAnalyzer',
      'Microsoft Azure, Defender, Sentinel, Entra ID, Purview',
      'AWS, GuardDuty, Security Hub, WAF, IAM Identity Center',
      'Google Cloud, Chronicle, SCC, BeyondCorp, Mandiant',
      'Zscaler, ZIA, ZPA, ZDX, ZTNA',
      'CrowdStrike, Falcon, Insight XDR, Identity, Cloud',
      'Netskope, SSE, CASB, SWG, ZTNA Next',
    ].map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s } })),
  },
}

// Built from the same ADVISORY_FAQS array the page renders.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: ADVISORY_FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function CybersecurityAdvisoryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(advisorySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <AdvisoryClient />
      <AdvisoryFaq />
      <Footer />
    </>
  )
}
