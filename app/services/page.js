import { preload } from 'react-dom'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ServicesClient from './ServicesClient'

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'

/* ── Service ItemList JSON-LD (Step 8) ── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'IP Care Technologies IT Services',
  url: `${BASE}/services`,
  itemListElement: [
    {
      '@type': 'ListItem', position: 1,
      item: {
        '@type': 'Service',
        name: 'IT Consulting',
        description: 'Strategy, assessments, and digital transformation for enterprise clients across UAE and Canada.',
        provider: { '@type': 'Organization', name: 'IP Care Technologies LLC' },
      },
    },
    {
      '@type': 'ListItem', position: 2,
      item: {
        '@type': 'Service',
        name: 'Infrastructure Services',
        description: 'Data centre design, virtualization, hyper-converged infrastructure, and hardware procurement.',
        provider: { '@type': 'Organization', name: 'IP Care Technologies LLC' },
      },
    },
    {
      '@type': 'ListItem', position: 3,
      item: {
        '@type': 'Service',
        name: 'ELV & Physical Security',
        description: 'CCTV, access control, structured cabling, gate barriers, public address, and intercom systems.',
        provider: { '@type': 'Organization', name: 'IP Care Technologies LLC' },
      },
    },
    {
      '@type': 'ListItem', position: 4,
      item: {
        '@type': 'Service',
        name: 'Managed IT Services',
        description: '24/7 monitoring, SLA-backed support, network management, and server operations.',
        provider: { '@type': 'Organization', name: 'IP Care Technologies LLC' },
      },
    },
    {
      '@type': 'ListItem', position: 5,
      item: {
        '@type': 'Service',
        name: 'Cloud Services',
        description: 'Cloud migration, Microsoft 365, AWS, Azure, and backup and disaster recovery.',
        provider: { '@type': 'Organization', name: 'IP Care Technologies LLC' },
      },
    },
    {
      '@type': 'ListItem', position: 6,
      item: {
        '@type': 'Service',
        name: 'Cybersecurity Services',
        description: 'SOC, Zero Trust architecture, compliance, endpoint protection, and privileged access management.',
        provider: { '@type': 'Organization', name: 'IP Care Technologies LLC' },
      },
    },
    {
      '@type': 'ListItem', position: 7,
      item: {
        '@type': 'Service',
        name: 'Email Solutions',
        description: 'Google Workspace, Microsoft 365, professional email hosting, and hybrid email deployments.',
        provider: { '@type': 'Organization', name: 'IP Care Technologies LLC' },
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE}/services` },
  ],
}

export const metadata = {
  title: 'IT Services UAE: Managed IT, Cloud & Cybersecurity',
  description: 'Enterprise IT services across UAE and Canada: managed IT, cloud, cybersecurity, infrastructure, ELV, and email solutions. SLA-backed support since 2003.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'IT Services UAE: Managed IT, Cloud & Cybersecurity',
    description: 'Enterprise IT services across UAE and Canada: managed IT, cloud, cybersecurity, infrastructure, ELV, and email solutions. SLA-backed support since 2003.',
    url: '/services',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Enterprise IT services, IP Care Technologies' }],
  },
}

export default function ServicesHub() {
  preload('/images/pages/services-bg.webp', { as: 'image', fetchPriority: 'high' })
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <ServicesClient />
      <Footer />
    </>
  )
}
