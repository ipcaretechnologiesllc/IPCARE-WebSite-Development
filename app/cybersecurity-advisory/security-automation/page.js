import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ServicePageTemplate from '@/components/site/ServicePageTemplate'

export const metadata = {
  title: 'Security Automation SOAR & XSOAR UAE & Canada | IP Care Technologies',
  description: 'Security automation with Cortex XSOAR and XSIAM in UAE and Canada. SOAR, automated playbooks, incident response automation, SOC efficiency and alert triage.',
  alternates: { canonical: '/cybersecurity-advisory/security-automation' },
  openGraph: {
    title: 'Security Automation SOAR & XSOAR UAE & Canada | IP Care Technologies',
    description: 'Security automation with Cortex XSOAR and XSIAM. SOAR, automated playbooks and incident response automation.',
    url: '/cybersecurity-advisory/security-automation',
    type: 'website',
  },
}

const pageData = {
  h1: 'Security Automation SOAR & XSOAR UAE & Canada',
  icon: 'Zap',
  hero: 'Automate security operations â€” from alert to response in seconds.',
  overview: [
    'Security teams are drowning in alerts. The average SOC receives 10,000+ alerts per day with only 5â€“10% being actionable. Manual triage, investigation and response create fatigue, delays and missed threats.',
    'IP Care implements Security Orchestration, Automation and Response (SOAR) platforms to automate repetitive security tasks. We specialize in Palo Alto Cortex XSOAR and XSIAM â€” the industry-leading platforms for alert triage, incident investigation, threat hunting and automated response.',
    'Our SOAR engagements cover playbook development, integration with existing security tools, custom automation and managed SOC operations â€” delivering 70%+ reduction in mean-time-to-respond (MTTR) and freeing analysts to focus on high-value threat hunting.',
  ],
  features: [
    { icon: 'Zap', title: 'Cortex XSOAR Implementation', desc: 'Deploy and configure Cortex XSOAR with pre-built and custom playbooks for automated incident response.' },
    { icon: 'Shield', title: 'XSIAM Integration', desc: 'Extended Security Intelligence and Automation Management for data lake, threat intel and AI-driven detection.' },
    { icon: 'FileCode', title: 'Custom Playbooks', desc: 'Build tailored automation workflows for your unique security tools, processes and compliance requirements.' },
    { icon: 'Network', title: 'Tool Integration', desc: 'Integrate SIEM, EDR, firewall, email security, threat intel and ticketing systems into unified automation.' },
    { icon: 'TrendingUp', title: 'SOC Efficiency', desc: 'Automate tier-1 alert triage, enrichment and containment to reduce analyst workload by 70%+.' },
    { icon: 'Clock', title: 'Faster Response', desc: 'Reduce mean-time-to-respond (MTTR) from hours to minutes with automated investigation and remediation.' },
  ],
  benefits: [
    { icon: 'Zap', t: '70%+ faster response', d: 'Automated playbooks execute investigation and containment steps in seconds vs hours of manual work.' },
    { icon: 'Users', t: 'Reduced analyst burnout', d: 'Automate repetitive tasks so analysts focus on high-value threat hunting and strategic work.' },
    { icon: 'Eye', t: 'Consistent operations', d: 'Playbooks enforce consistent response procedures across all analysts and shifts.' },
    { icon: 'Shield', t: 'Better threat coverage', d: 'Automation scales to handle 10x more alerts without adding headcount.' },
  ],
  process: [
    { n: '01', t: 'Assess', d: 'Current SOC workflows, alert volume, tool landscape and automation maturity.' },
    { n: '02', t: 'Design', d: 'SOAR architecture, playbook prioritization, integration plan and success metrics.' },
    { n: '03', t: 'Implement', d: 'XSOAR deployment, playbook development, tool integrations and analyst training.' },
    { n: '04', t: 'Operate', d: 'Managed SOAR operations with continuous playbook optimization and new use cases.' },
  ],
  industries: ['Financial Services', 'Technology', 'Healthcare', 'Government', 'Energy', 'Telecom'],
  faqs: [
    { q: 'What is the difference between SOAR and SIEM?', a: 'SIEM collects and correlates security logs to detect threats. SOAR takes action on those threats â€” automating investigation, enrichment and response. They work together: SIEM detects, SOAR automates response.' },
    { q: 'How long does a SOAR implementation take?', a: 'Typical engagements run 3â€“6 months from deployment to production with 5â€“10 automated playbooks. We deliver quick wins in first 30 days with high-value use cases like phishing investigation and malware containment.' },
    { q: 'Can XSOAR integrate with our existing security tools?', a: 'Yes. XSOAR has 600+ pre-built integrations with SIEM (Splunk, QRadar, Sentinel), EDR (CrowdStrike, SentinelOne), firewalls (Palo Alto, Check Point), email security and more. We also build custom integrations for proprietary tools.' },
    { q: 'What ROI can we expect from SOAR?', a: 'Organizations typically see 70%+ reduction in mean-time-to-respond (MTTR), 50%+ reduction in analyst workload for tier-1 tasks and ability to handle 3â€“10x more alerts without adding headcount. ROI is usually achieved within 6â€“12 months.' },
  ],
}

export default function SecurityAutomationPage() {
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
      { '@type': 'ListItem', position: 3, name: pageData.h1, item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + '/cybersecurity-advisory/security-automation' },
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
    url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + '/cybersecurity-advisory/security-automation',
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
