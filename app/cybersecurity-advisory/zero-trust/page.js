import { notFound } from 'next/navigation'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ServicePageTemplate from '@/components/site/ServicePageTemplate'
import Link from 'next/link'
import * as Icons from 'lucide-react'

export const metadata = {
  title: 'Zero Trust Architecture Consulting UAE & Canada | IP Care Technologies',
  description: 'Zero Trust architecture consulting in UAE and Canada. Never trust always verify, micro-segmentation, identity-driven access with Palo Alto Prisma and NESA compliance.',
  alternates: { canonical: '/cybersecurity-advisory/zero-trust' },
  openGraph: {
    title: 'Zero Trust Architecture Consulting UAE & Canada | IP Care Technologies',
    description: 'Zero Trust architecture consulting in UAE and Canada. Never trust always verify, micro-segmentation, identity-driven access with Palo Alto Prisma.',
    url: '/cybersecurity-advisory/zero-trust',
    type: 'website',
  },
}

const pageData = {
  h1: 'Zero Trust Architecture Consulting UAE & Canada',
  h1Accent: 'Zero Trust Architecture',
  icon: 'Shield',
  hero: 'Never trust, always verify, implement Zero Trust architecture for modern enterprise security.',
  overview: [
    'Zero Trust is not a product, it is an architecture philosophy: assume breach, verify explicitly, enforce least-privilege access, and segment your network down to the workload level.',
    'IP Care, powered by The Cyber Adviser, designs and delivers complete Zero Trust architectures aligned to NIST 800-207, Forrester ZTX frameworks and UAE NESA requirements. We cover identity, devices, applications, data and infrastructure with unified policy enforcement.',
    'Our Zero Trust engagements span strategy, architecture, implementation and operations, typically delivered over 6-18 months depending on your starting point and maturity goals.',
  ],
  features: [
    { icon: 'UserCheck', title: 'Identity-Driven Access', desc: 'Every access decision starts with verifying the user identity through MFA, risk scoring and continuous authentication.' },
    { icon: 'Network', title: 'Micro-Segmentation', desc: 'Segment networks to workload-level granularity using Palo Alto Prisma Access or on-prem firewalls with application-layer rules.' },
    { icon: 'Eye', title: 'Continuous Monitoring', desc: 'Real-time visibility and anomaly detection across users, devices, applications and data flows.' },
    { icon: 'Shield', title: 'Least-Privilege Enforcement', desc: 'Just-in-time access, time-limited privileges and automated de-provisioning to minimize attack surface.' },
    { icon: 'Cloud', title: 'SASE Integration', desc: 'Zero Trust delivered as cloud service with Prisma Access, Zscaler or Netskope for remote and branch users.' },
    { icon: 'FileCheck', title: 'NESA & Compliance', desc: 'Zero Trust design aligned to UAE NESA, Canadian privacy laws, ISO 27001 and SOC 2 requirements.' },
  ],
  benefits: [
    { icon: 'ShieldCheck', t: 'Reduced breach impact', d: 'Micro-segmentation limits lateral movement, containing breaches to single workloads.' },
    { icon: 'Zap', t: 'Faster secure access', d: 'Identity-driven policies eliminate VPN bottlenecks for remote and cloud workloads.' },
    { icon: 'Eye', t: 'Full visibility', d: 'Unified logging and monitoring across all access decisions for security and compliance.' },
    { icon: 'TrendingDown', t: 'Lower long-term cost', d: 'Cloud-delivered Zero Trust eliminates hardware refresh cycles and simplifies operations.' },
  ],
  process: [
    { n: '01', t: 'Assess', d: 'Current architecture, identity systems, network topology and risk profile analysis.' },
    { n: '02', t: 'Design', d: 'Zero Trust architecture blueprint with phased roadmap, technology selection and policy framework.' },
    { n: '03', t: 'Implement', d: 'Pilot deployment, policy tuning, user enablement and production rollout across waves.' },
    { n: '04', t: 'Operate', d: 'Managed Zero Trust operations with continuous policy optimization and threat response.' },
  ],
  industries: ['Banking', 'Government', 'Energy', 'Healthcare', 'Technology', 'Critical Infrastructure'],
  faqs: [
    { q: 'How long does a Zero Trust implementation take?', a: 'Typical engagements run 6-18 months depending on your starting maturity, organization size and chosen technology stack. We deliver in phased waves with immediate value in early pilots.' },
    { q: 'Do we need to replace all our existing security tools?', a: 'No. Zero Trust is an architecture, not a rip-and-replace. We integrate with your existing identity (Active Directory, Entra ID), firewalls and endpoint tools to build unified policy enforcement.' },
    { q: 'Is Zero Trust compliant with UAE NESA requirements?', a: 'Yes. Zero Trust principles align strongly with NESA controls around identity assurance, access control and network segmentation. We design implementations that meet NESA IAS and critical infrastructure requirements.' },
    { q: 'Can Zero Trust work for on-premise and cloud workloads?', a: 'Absolutely. Modern Zero Trust architectures are hybrid by default, covering on-prem data centres, multi-cloud (AWS, Azure, GCP) and SaaS applications with consistent policy enforcement.' },
  ],
}

export default function ZeroTrustPage() {
  const breadcrumb = [
    { label: 'Cybersecurity Advisory', href: '/cybersecurity-advisory' },
    { label: pageData.h1 },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (pageData.faqs || []).map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + '/' },
      { '@type': 'ListItem', position: 2, name: 'Cybersecurity Advisory', item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + '/cybersecurity-advisory' },
      { '@type': 'ListItem', position: 3, name: pageData.h1, item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + '/cybersecurity-advisory/zero-trust' },
    ],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: pageData.h1,
    description: pageData.hero,
    serviceType: 'Cybersecurity Advisory',
    provider: {
      '@type': 'Organization',
      name: 'IP Care Technologies L.L.C.',
      url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'),
    },
    areaServed: [{ '@type': 'Country', name: 'United Arab Emirates' }, { '@type': 'Country', name: 'Canada' }],
    url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + '/cybersecurity-advisory/zero-trust',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Header />
      <main>
        <ServicePageTemplate
          data={pageData}
          related={[]}
          breadcrumb={breadcrumb}
        />
      </main>
      <Footer />
    </>
  )
}
