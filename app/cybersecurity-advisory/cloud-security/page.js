import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ServicePageTemplate from '@/components/site/ServicePageTemplate'

export const metadata = {
  title: 'Cloud Security Advisory â€” Multi-Cloud UAE & Canada | IP Care Technologies',
  description: 'Cloud security advisory for AWS, Azure and GCP in UAE and Canada. Cloud workload protection, CSPM, secure landing zones and cloud-native security architecture.',
  alternates: { canonical: '/cybersecurity-advisory/cloud-security' },
  openGraph: {
    title: 'Cloud Security Advisory â€” Multi-Cloud UAE & Canada | IP Care Technologies',
    description: 'Cloud security advisory for AWS, Azure and GCP. Cloud workload protection, CSPM and secure landing zones.',
    url: '/cybersecurity-advisory/cloud-security',
    type: 'website',
  },
}

const pageData = {
  h1: 'Cloud Security Advisory â€” Multi-Cloud UAE & Canada',
  h1Accent: 'Cloud Security Advisory',
  icon: 'Cloud',
  hero: 'Secure your cloud estate â€” from landing zones to workload protection.',
  overview: [
    'Cloud security is fundamentally different from on-premise security. The shared responsibility model, ephemeral workloads, API-driven access and multi-cloud complexity demand a cloud-native security approach.',
    'IP Care, powered by The Cyber Adviser, delivers cloud security advisory across AWS, Azure and Google Cloud. We cover secure landing zone design, cloud security posture management (CSPM), workload protection (CWPP), identity and access management (IAM) and compliance automation.',
    'Our cloud security engagements span architecture, tool selection, implementation and managed security operations â€” aligned to CIS Benchmarks, NIST 800-53, UAE NESA and Canadian privacy regulations.',
  ],
  features: [
    { icon: 'Shield', title: 'Secure Landing Zones', desc: 'Multi-account AWS Organizations, Azure landing zones and GCP resource hierarchies with security guardrails baked in.' },
    { icon: 'Eye', title: 'CSPM & Compliance', desc: 'Continuous posture management with Prisma Cloud, Wiz or native cloud tools to detect misconfigurations.' },
    { icon: 'Server', title: 'Workload Protection', desc: 'Runtime protection for VMs, containers and serverless with vulnerability management and threat detection.' },
    { icon: 'KeyRound', title: 'Identity & Access (IAM)', desc: 'Least-privilege IAM policies, federated identity, service accounts and secrets management.' },
    { icon: 'Network', title: 'Network Security', desc: 'VPC segmentation, security groups, network firewalls and cloud-native inspection architectures.' },
    { icon: 'FileCheck', title: 'Compliance Automation', desc: 'Automated compliance reporting for UAE PDPL, NESA, SOC 2, PCI DSS and ISO 27001.' },
  ],
  benefits: [
    { icon: 'ShieldCheck', t: 'Reduced cloud risk', d: 'Automated detection and remediation of misconfigurations that lead to breaches.' },
    { icon: 'Zap', t: 'Faster secure deployment', d: 'Pre-built secure landing zones let dev teams deploy fast without compromising security.' },
    { icon: 'Eye', t: 'Full visibility', d: 'Unified security monitoring across AWS, Azure, GCP and hybrid environments.' },
    { icon: 'FileCheck', t: 'Audit-ready', d: 'Continuous compliance monitoring with evidence collection for audits.' },
  ],
  process: [
    { n: '01', t: 'Assess', d: 'Cloud security posture review, risk assessment and compliance gap analysis.' },
    { n: '02', t: 'Design', d: 'Secure cloud architecture blueprint, tool selection and policy framework.' },
    { n: '03', t: 'Implement', d: 'Landing zone deployment, CSPM integration, workload protection and IAM hardening.' },
    { n: '04', t: 'Operate', d: 'Managed cloud security operations with continuous optimization and threat response.' },
  ],
  industries: ['Technology', 'Financial Services', 'Healthcare', 'Government', 'Retail', 'Media'],
  faqs: [
    { q: 'What is the difference between CSPM and CWPP?', a: 'CSPM (Cloud Security Posture Management) continuously scans cloud configurations for misconfigurations and compliance violations. CWPP (Cloud Workload Protection Platform) protects running workloads (VMs, containers, serverless) from threats with runtime detection and response.' },
    { q: 'Do we need separate security tools for each cloud provider?', a: 'No. Multi-cloud security platforms like Prisma Cloud and Wiz provide unified posture management and workload protection across AWS, Azure and GCP from a single pane of glass.' },
    { q: 'How do we secure workloads that span on-premise and cloud?', a: 'We design hybrid security architectures that extend identity, network and workload protection across on-prem and multi-cloud using federated identity (Entra ID, Okta) and unified security platforms.' },
    { q: 'Is cloud security compliant with UAE data protection laws?', a: 'Yes. We design cloud security architectures that support UAE data residency requirements through UAE cloud regions (AWS Middle East, Azure UAE North) and align with UAE PDPL and NESA controls.' },
  ],
}

export default function CloudSecurityPage() {
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
      { '@type': 'ListItem', position: 3, name: pageData.h1, item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + '/cybersecurity-advisory/cloud-security' },
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
    url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + '/cybersecurity-advisory/cloud-security',
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
