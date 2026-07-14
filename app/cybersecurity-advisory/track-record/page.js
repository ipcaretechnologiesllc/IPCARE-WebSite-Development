import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import TrackRecordClient from './TrackRecordClient'
import { cyberProjects, cyberCapabilities, cyberFaqs, cyberPractitioner } from '@/lib/cyber-advisory-data'

export const revalidate = 3600

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'

const capabilityMap = cyberCapabilities.reduce((acc, cap) => {
  acc[cap.id] = cap.label
  return acc
}, {})

export const metadata = {
  title: 'Palo Alto & Prisma Access Delivery in Canada | IP Care',
  description:
    'Anonymized track record of enterprise and government cybersecurity delivery in Canada: Palo Alto firewall deployments and migrations, Prisma Access / SASE, Panorama to Strata Cloud Manager, Prisma AIRS and IT/OT segmentation.',
  alternates: { canonical: '/cybersecurity-advisory/track-record' },
  openGraph: {
    title: 'Palo Alto & Prisma Access Delivery in Canada | IP Care',
    description:
      'Proven Palo Alto, Prisma Access and Strata Cloud Manager delivery for regulated enterprise and government clients across Canada. Anonymized by design.',
    url: '/cybersecurity-advisory/track-record',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Palo Alto & Prisma Access Delivery in Canada | IP Care',
    description: 'Anonymized enterprise & government cybersecurity delivery track record in Canada.',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
    { '@type': 'ListItem', position: 2, name: 'Cyber Advisory', item: `${BASE}/cybersecurity-advisory` },
    { '@type': 'ListItem', position: 3, name: 'Delivery Track Record', item: `${BASE}/cybersecurity-advisory/track-record` },
  ],
}

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${BASE}/cybersecurity-advisory/track-record#webpage`,
  name: 'IP Care Canada Cybersecurity Delivery Track Record',
  description:
    'Anonymized enterprise and government cybersecurity engagements delivered in Canada, covering Palo Alto firewall deployment and migration, Prisma Access / SASE, Panorama to Strata Cloud Manager, Prisma AIRS and IT/OT segmentation.',
  url: `${BASE}/cybersecurity-advisory/track-record`,
  publisher: { '@id': `${BASE}#org` },
  about: 'Cybersecurity delivery in Canada',
  mainEntity: {
    '@type': 'ItemList',
    name: 'Canada cybersecurity delivery engagements',
    itemListElement: cyberProjects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: `${project.descriptor} — ${capabilityMap[project.capabilities[0]] || 'Cybersecurity'}`,
        description: project.featured
          ? `${project.narrative.situation} ${project.narrative.outcome}`
          : project.scope,
        about: [project.industry, ...(project.tech || [])],
        provider: { '@id': `${BASE}#org` },
        locationCreated: { '@type': 'Country', name: 'Canada' },
      },
    })),
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: cyberFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

const practitionerSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: cyberPractitioner.name,
  jobTitle: cyberPractitioner.title,
  description: cyberPractitioner.bio,
  address: { '@type': 'PostalAddress', addressLocality: 'Milton', addressRegion: 'Ontario', addressCountry: 'CA' },
  knowsAbout: ['Palo Alto Networks', 'Prisma Access', 'SASE', 'Strata Cloud Manager', 'Firewall Migration'],
  hasCredential: cyberPractitioner.certifications.map((cert) => ({
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'certification',
    name: cert,
  })),
  worksFor: { '@id': `${BASE}#org` },
}

export default function TrackRecordPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(practitionerSchema) }} />
      <link rel="preload" as="image" href="/images/pages/cyber-advisory-track-record-bg.webp" fetchPriority="high" />
      <Header />
      <TrackRecordClient />
      <Footer />
    </>
  )
}
