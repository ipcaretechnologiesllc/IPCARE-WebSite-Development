import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import IndustriesClient from './IndustriesClient'

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'

/* ── Industry ItemList JSON-LD — 5 sectors ── */
const industrySchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'IP Care Technologies Industry IT Solutions',
  url: `${BASE}/industries`,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Service',
        name: 'Healthcare IT',
        description: 'DOH and DHA-aligned hospital and clinic IT, Malaffi and NABIDH integration, medical device security, and 24/7 clinical support across the UAE.',
        provider: { '@type': 'Organization', name: 'IP Care Technologies LLC' },
        areaServed: [
          { '@type': 'Country', name: 'United Arab Emirates' },
          { '@type': 'Country', name: 'Canada' },
        ],
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Service',
        name: 'Banking & Financial Services IT',
        description: 'CB IBR-compliant cloud and managed SOC, DFSA and FSRA cyber risk management, payment systems integration for UAE-licensed banks and financial services firms.',
        provider: { '@type': 'Organization', name: 'IP Care Technologies LLC' },
        areaServed: [
          { '@type': 'Country', name: 'United Arab Emirates' },
          { '@type': 'Country', name: 'Canada' },
        ],
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Service',
        name: 'Government & Federal IT',
        description: 'Federal-grade Azure UAE North landing zones, NESA/UAE IAS compliance programmes, and classification-aware operations for UAE federal entities and government-adjacent organisations.',
        provider: { '@type': 'Organization', name: 'IP Care Technologies LLC' },
        areaServed: [
          { '@type': 'Country', name: 'United Arab Emirates' },
        ],
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'Service',
        name: 'Event Management IT',
        description: 'Temporary high-density networks, on-site connectivity, and command-centre support for large-scale events across the UAE — sports finals, concerts, and national-scale events.',
        provider: { '@type': 'Organization', name: 'IP Care Technologies LLC' },
        areaServed: [
          { '@type': 'Country', name: 'United Arab Emirates' },
        ],
      },
    },
    {
      '@type': 'ListItem',
      position: 5,
      item: {
        '@type': 'Service',
        name: 'Construction & Field Services IT',
        description: 'Rugged connectivity across remote sites, mobile workforce management, and field infrastructure for construction and field operations in the UAE and Canada.',
        provider: { '@type': 'Organization', name: 'IP Care Technologies LLC' },
        areaServed: [
          { '@type': 'Country', name: 'United Arab Emirates' },
          { '@type': 'Country', name: 'Canada' },
        ],
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',       item: `${BASE}/` },
    { '@type': 'ListItem', position: 2, name: 'Industries', item: `${BASE}/industries` },
  ],
}

export const metadata = {
  title: 'Industry IT Solutions UAE | Healthcare, Banking, Government, Events & Construction | IP Care',
  description: 'Sector-specific IT across UAE and Canada: healthcare (DOH/DHA/NABIDH), banking (DFSA/FSRA), government (NESA/Azure), event management, and construction IT. Two decades of regulated-industry delivery.',
  alternates: { canonical: '/industries' },
  openGraph: {
    title: 'Industry IT Solutions UAE | Healthcare, Banking, Government, Events & Construction | IP Care',
    description: 'Sector-specific IT across UAE and Canada: healthcare (DOH/DHA/NABIDH), banking (DFSA/FSRA), government (NESA/Azure), event management, and construction IT. Two decades of regulated-industry delivery.',
    url: '/industries',
    type: 'website',
  },
}

export default function IndustriesHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(industrySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <IndustriesClient />
      <Footer />
    </>
  )
}
