// Centralised data for the Cybersecurity Advisory section (The Cyber Adviser brand).

export const advisor = {
  name: 'Attique Bhatti',
  title: 'Enterprise Security Consultant',
  bio: 'Enterprise cybersecurity architect with 15+ years advising Fortune 500 and government clients on Zero Trust, SASE, and cloud security transformation across Canada, UAE, and globally.',
  credentials: [
    { label: '15+ Years' },
    { label: '100K+ Users Protected' },
    { label: '50+ Enterprise Engagements' },
  ],
  certifications: ['Palo Alto PCNSE', 'AWS Security Specialty', 'Azure Security Engineer', 'CISSP', 'GIAC GCFA'],
}

export const platforms = [
  { name: 'Palo Alto Networks', vendor: 'PANW', sub: 'Prisma Access · Cortex · Strata · XSIAM', color: '#FA582D' },
  { name: 'Check Point', vendor: 'CHKP', sub: 'Quantum · Harmony · CloudGuard · Infinity', color: '#E8252C' },
  { name: 'Fortinet', vendor: 'FTNT', sub: 'FortiGate · FortiEDR · FortiSASE · FortiAnalyzer', color: '#EE3124' },
  { name: 'Microsoft Azure', vendor: 'AZURE', sub: 'Defender · Sentinel · Entra ID · Purview', color: '#0078D4' },
  { name: 'AWS', vendor: 'AWS', sub: 'GuardDuty · Security Hub · WAF · IAM Identity Center', color: '#FF9900' },
  { name: 'Google Cloud', vendor: 'GCP', sub: 'Chronicle · SCC · BeyondCorp · Mandiant', color: '#4285F4' },
  { name: 'Zscaler', vendor: 'ZS', sub: 'ZIA · ZPA · ZDX · ZTNA', color: '#0064D0' },
  { name: 'CrowdStrike', vendor: 'CRWD', sub: 'Falcon · Insight XDR · Identity · Cloud', color: '#E51C25' },
  { name: 'Netskope', vendor: 'NS', sub: 'SSE · CASB · SWG · ZTNA Next', color: '#34C759' },
  { name: 'Prisma Access', spec: 'SASE cloud delivery, remote access and branch security', badge: 'In Active Practice', advisor: 'Tanveer Ahmed' },
  { name: 'Prisma SD-WAN', spec: 'Software-defined WAN with application-defined policies', badge: 'In Active Practice', advisor: 'Tanveer Ahmed' },
  { name: 'CASB', spec: 'Cloud access security broker for SaaS visibility and data protection', badge: 'In Active Practice', advisor: 'Tanveer Ahmed' },
  { name: 'SWG', spec: 'Secure Web Gateway, web traffic inspection and filtering', badge: 'In Active Practice', advisor: 'Tanveer Ahmed' },
  { name: 'ZTNA', spec: 'Zero Trust Network Access, identity-based application access', badge: 'In Active Practice', advisor: 'Tanveer Ahmed' },
  { name: 'AlgoSec', spec: 'Firewall policy management and security change automation', badge: 'In Active Practice', advisor: 'Tanveer Ahmed' },
]

export const services = [
  {
    slug: 'zero-trust',
    name: 'Zero Trust Architecture',
    short: 'Identity-first, least-privilege architectures across user, workload and data planes.',
    icon: 'Lock',
  },
  {
    slug: 'sase',
    name: 'SASE Transformation',
    short: 'Converging network and security on a cloud-delivered edge, faster, safer, simpler.',
    icon: 'Globe2',
  },
  {
    slug: 'cloud-security',
    name: 'Cloud Security',
    short: 'Multi-cloud posture, workload and data protection across AWS, Azure, and GCP.',
    icon: 'Cloud',
  },
  {
    slug: 'executive-advisory',
    name: 'Executive Advisory',
    short: 'Board-level cybersecurity strategy, risk and regulatory guidance for CISOs and CIOs.',
    icon: 'Briefcase',
  },
  {
    slug: 'security-automation',
    name: 'Security Automation',
    short: 'SOAR, XSOAR and XSIAM programs that reduce MTTR and analyst fatigue.',
    icon: 'Bot',
  },
]

export const trackRecord = [
  { n: '99.9%', l: 'Deployment Success' },
  { n: '100K+', l: 'Users Protected' },
  { n: '50+', l: 'Enterprise Engagements' },
  { n: '15+', l: 'Years Experience' },
]

export const tools = [
  {
    name: 'Prisma Access Sizing Calculator',
    desc: 'Size mobile users, remote networks and infrastructure nodes for Palo Alto Prisma Access deployments.',
    href: 'https://thecyberadviser.com/tools/prisma-access-sizing',
    icon: 'Calculator',
  },
  {
    name: 'SIEM Sizing Calculator',
    desc: 'Estimate EPS, log volume and storage for Splunk, Sentinel, QRadar and XSIAM environments.',
    href: 'https://thecyberadviser.com/tools/siem-sizing',
    icon: 'BarChart3',
  },
  {
    name: 'Unified Migration Tool',
    desc: 'Accelerate policy migration across Palo Alto, Check Point, Fortinet and Cisco firewalls.',
    href: 'https://thecyberadviser.com/tools/unified-migration',
    icon: 'ArrowRightLeft',
  },
]

export const kbArticles = [
  { title: 'Prisma Access HA Design Patterns at Scale', category: 'Palo Alto', readTime: '12 min', date: 'Jun 2025' },
  { title: 'Zero Trust Network Access vs. VPN: When to Migrate', category: 'Architecture', readTime: '9 min', date: 'Jun 2025' },
  { title: 'Check Point R81.20 → R82 Upgrade Playbook', category: 'Check Point', readTime: '15 min', date: 'May 2025' },
  { title: 'FortiGate SD-WAN Performance Tuning Guide', category: 'Fortinet', readTime: '11 min', date: 'May 2025' },
  { title: 'Designing a Multi-Vendor SASE Strategy', category: 'Architecture', readTime: '14 min', date: 'Apr 2025' },
  { title: 'Palo Alto XSIAM: Deploying Automation Playbooks', category: 'Palo Alto', readTime: '18 min', date: 'Apr 2025' },
  { title: 'CloudGuard CNAPP Implementation Lessons', category: 'Check Point', readTime: '10 min', date: 'Apr 2025' },
  { title: 'FortiAnalyzer + FortiSIEM Integration Guide', category: 'Fortinet', readTime: '13 min', date: 'Mar 2025' },
  { title: 'Reducing MTTR with SOAR: 6 Proven Patterns', category: 'Architecture', readTime: '11 min', date: 'Mar 2025' },
]

// ─── Canada Delivery Track Record ────────────────────────────────────────────
// Anonymized enterprise & government engagements delivered in Canada. Client
// identities are withheld by design (security-posture work under NDA): projects
// are described by industry descriptor + capability + technology only. Do NOT
// add client names, logos, or hard metrics here.

export const cyberCapabilities = [
  { id: 'prisma-access',  label: 'Prisma Access / SASE',           icon: 'Globe2' },
  { id: 'firewall-deploy', label: 'Firewall Deployment & Migration', icon: 'Server' },
  { id: 'firewall-audit', label: 'Firewall Audit & Hardening',      icon: 'ShieldCheck' },
  { id: 'panorama-strata', label: 'Panorama → Strata Cloud Manager', icon: 'Cloud' },
  { id: 'cloud-airs-ot',  label: 'Cloud / AIRS / OT Segmentation',  icon: 'Network' },
]

export const cyberProjects = [
  {
    id: 'pharma-prisma-access',
    descriptor: 'North American Pharmaceutical Company',
    industry: 'Pharmaceutical & Life Sciences',
    region: 'Canada',
    capabilities: ['prisma-access'],
    tech: ['Prisma Access'],
    scope: 'Prisma Access deployment for secure, cloud-delivered access to corporate applications.',
    outcome: 'Consistent secure connectivity for remote and hybrid users without backhauling traffic.',
  },
  {
    id: 'insurance-firewall-hardening',
    descriptor: 'Global Specialty Insurance Group',
    industry: 'Insurance & Financial Services',
    region: 'Canada',
    capabilities: ['firewall-audit'],
    tech: ['Palo Alto'],
    scope: 'Palo Alto firewall security hardening and optimization, plus a full firewall audit and assessment.',
    outcome: 'Reduced attack surface and a clean, well-documented policy baseline.',
  },
  {
    id: 'water-utility-firewall-deploy',
    descriptor: 'Regional Water Utility',
    industry: 'Utilities & Critical Infrastructure',
    region: 'Canada',
    capabilities: ['firewall-deploy'],
    tech: ['Palo Alto'],
    scope: 'Palo Alto next-generation firewall deployment across the utility environment.',
    outcome: 'A modern, application-aware perimeter protecting critical-infrastructure systems.',
  },
  {
    id: 'asset-mgmt-panorama-strata',
    descriptor: 'Global Asset-Management Firm',
    industry: 'Financial Services',
    region: 'Canada',
    capabilities: ['panorama-strata', 'prisma-access'],
    tech: ['Panorama', 'Prisma Access', 'Strata Cloud Manager'],
    scope: 'Migrated Panorama-managed Prisma Access and managed firewalls to Strata Cloud Manager.',
    outcome: 'Unified cloud-based management across firewalls and SASE in a single console.',
    featured: true,
    narrative: {
      situation: 'A globally distributed asset-management firm was managing Prisma Access and its firewall estate through Panorama, adding operational overhead as its cloud-delivered footprint grew alongside its on-premises infrastructure.',
      approach: 'IP Care planned and executed a phased migration of the Panorama-managed Prisma Access tenant and its associated firewalls onto Strata Cloud Manager, validating policy parity and access continuity at each stage.',
      outcome: 'Firewalls and SASE now sit in a single cloud console, cutting the operational split between on-premises and cloud-delivered security management.',
    },
  },
  {
    id: 'fintech-prisma-airs-k8s',
    descriptor: 'Cross-Border Payments Fintech',
    industry: 'Fintech & Payments',
    region: 'Canada',
    capabilities: ['cloud-airs-ot'],
    tech: ['Prisma AIRS', 'Kubernetes'],
    scope: 'Prisma AIRS deployment within a Kubernetes environment.',
    outcome: 'AI-runtime and container security embedded into a modern cloud-native platform.',
    featured: true,
    narrative: {
      situation: 'A cross-border payments platform running on Kubernetes needed runtime protection for its AI and containerized workloads without slowing down its cloud-native delivery pipeline.',
      approach: 'IP Care deployed Prisma AIRS directly into the Kubernetes environment, integrating runtime security checks into the existing container lifecycle rather than bolting on a separate scanning layer.',
      outcome: 'AI-runtime and container security now run as part of the platform itself, giving the engineering team continuous protection without adding friction to deployment velocity.',
    },
  },
  {
    id: 'court-cisco-to-palo-alto',
    descriptor: 'Canadian Provincial Court System',
    industry: 'Government & Justice',
    region: 'Canada',
    capabilities: ['firewall-deploy', 'panorama-strata'],
    tech: ['Cisco → Palo Alto', 'Strata Cloud Manager', 'GlobalProtect'],
    scope: 'Cisco-to-Palo Alto firewall migration across two data centres; firewalls onboarded to Strata Cloud Manager with a redundant GlobalProtect design.',
    outcome: 'Resilient, centrally managed remote access with data-centre redundancy.',
    featured: true,
    narrative: {
      situation: 'A provincial court system operating across two data centres was running its perimeter on aging Cisco firewalls, with remote access architecture that did not provide true data-centre-level redundancy.',
      approach: 'IP Care migrated both data centres from Cisco to Palo Alto firewalls, onboarded the new estate to Strata Cloud Manager for centralized policy management, and designed a redundant GlobalProtect deployment spanning both sites.',
      outcome: 'Court staff and remote users now connect through a resilient, centrally managed access layer that keeps working even if one data centre is degraded.',
    },
  },
  {
    id: 'quebec-gov-prisma-access',
    descriptor: 'Quebec Provincial Government Agency',
    industry: 'Government & Public Sector',
    region: 'Canada',
    capabilities: ['prisma-access'],
    tech: ['Prisma Access'],
    scope: 'Prisma Access deployment for a public-sector workforce.',
    outcome: 'Secure, scalable access for government staff across distributed locations.',
  },
  {
    id: 'food-mfg-it-ot-segmentation',
    descriptor: 'Major North American Food Manufacturer',
    industry: 'Manufacturing',
    region: 'Canada',
    capabilities: ['cloud-airs-ot'],
    tech: ['Palo Alto', 'IT/OT'],
    scope: 'IT/OT segmentation program separating production and operational technology from corporate IT.',
    outcome: 'Contained lateral movement and a clearer security boundary around plant systems.',
  },
  {
    id: 'community-health-panorama-azure',
    descriptor: 'Network of Community Health Centres',
    industry: 'Healthcare',
    region: 'Canada',
    capabilities: ['panorama-strata'],
    tech: ['Panorama', 'Azure'],
    scope: 'Panorama migration from on-premises to Azure cloud.',
    outcome: 'Cloud-hosted, centralized firewall management with reduced on-site footprint.',
  },
  {
    id: 'grocery-prisma-access-swg',
    descriptor: 'National Grocery Retailer',
    industry: 'Retail',
    region: 'Canada',
    capabilities: ['prisma-access'],
    tech: ['Prisma Access'],
    scope: 'Replaced a legacy web-security platform with Prisma Access.',
    outcome: 'Consolidated secure web gateway and SASE on a single cloud-delivered stack.',
  },
  {
    id: 'payments-network-azure-firewall',
    descriptor: 'National Payments Network',
    industry: 'Financial Services',
    region: 'Canada',
    capabilities: ['firewall-deploy'],
    tech: ['Palo Alto', 'Azure'],
    scope: 'Palo Alto firewall deployment within an Azure environment.',
    outcome: 'A cloud-native perimeter aligned to the organization’s Azure footprint.',
  },
  {
    id: 'diagnostics-prisma-access-greenfield',
    descriptor: 'Global Diagnostics Manufacturer',
    industry: 'Healthcare & Diagnostics',
    region: 'Canada',
    capabilities: ['prisma-access'],
    tech: ['Prisma Access'],
    scope: 'Greenfield Prisma Access deployment built from the ground up.',
    outcome: 'A clean SASE foundation delivered without legacy technical debt.',
  },
  {
    id: 'law-firm-firewall-audit',
    descriptor: 'Leading Canadian Law Firm',
    industry: 'Legal',
    region: 'Canada',
    capabilities: ['firewall-audit'],
    tech: ['Palo Alto'],
    scope: 'Firewall audit and assessment with security hardening and optimization.',
    outcome: 'A hardened policy posture protecting sensitive client matters.',
  },
  {
    id: 'ai-software-firewall-support',
    descriptor: 'Enterprise AI Software Company',
    industry: 'Technology',
    region: 'Canada',
    capabilities: ['firewall-audit'],
    tech: ['Palo Alto'],
    scope: 'Ongoing Palo Alto firewall support and operational assurance.',
    outcome: 'Sustained firewall health and reliable day-to-day security operations.',
  },
  {
    id: 'energy-firewall-policy-optimization',
    descriptor: 'North American Energy-Infrastructure Company',
    industry: 'Energy',
    region: 'Canada',
    capabilities: ['firewall-audit'],
    tech: ['Palo Alto'],
    scope: 'Firewall security hardening and policy optimization.',
    outcome: 'An optimized, lean rule base with improved performance and auditability.',
  },
]

export const cyberDeliveryStats = [
  { value: 'Since 2011', label: 'Operating in Canada' },
  { value: '15+', label: 'Enterprise & Gov Engagements' },
  { value: 'PCNSE', label: 'Palo Alto Certified Lead' },
  { value: 'End-to-End', label: 'Deploy · Migrate · Harden' },
]

export const featuredCyberProjects = cyberProjects.filter((project) => project.featured)

// Named delivery practitioner for this page — reused from the Cyber Advisory
// section's existing published specialist (not a client). Canada-based, adds
// first-hand expertise (E-E-A-T) without touching client anonymity.
export const cyberPractitioner = {
  name: 'Tanveer Ahmed',
  initials: 'TA',
  title: 'Prisma Access & SASE Specialist',
  location: 'Milton, Ontario, Canada',
  certifications: ['PCNSE', 'PCCSA', 'CNSS', 'AlgoSec'],
  bio: 'A Canada-based Palo Alto practitioner leading Prisma Access, SASE and Strata Cloud Manager delivery for enterprise and government clients — the hands-on engineering behind the engagements shown here.',
}

export const cyberFaqs = [
  {
    q: 'Why don’t you name the clients?',
    a: 'Firewall, access and segmentation work exposes sensitive detail about an organization’s defenses. We withhold client names as a matter of professional discipline; verifiable references can be shared under NDA during a scoped conversation.',
  },
  {
    q: 'Do you deliver Palo Alto Prisma Access in Canada?',
    a: 'Yes. Prisma Access and SASE deployments are a core part of our Canada delivery — from greenfield rollouts to replacing legacy web-security platforms — led by PCNSE-certified practitioners.',
  },
  {
    q: 'Can you migrate Panorama-managed firewalls to Strata Cloud Manager?',
    a: 'Yes. We plan and execute phased migrations of Panorama-managed firewalls and Prisma Access tenants onto Strata Cloud Manager, validating policy parity and access continuity at each stage.',
  },
  {
    q: 'Do you handle Cisco-to-Palo Alto firewall migrations?',
    a: 'Yes. We migrate legacy firewall estates, including Cisco, to Palo Alto next-generation firewalls across single and multi–data-centre environments, with redundant GlobalProtect designs for resilient remote access.',
  },
  {
    q: 'Do you do IT/OT segmentation and cloud (Azure) firewall work?',
    a: 'Yes. Our Canada engagements include IT/OT segmentation for manufacturing and critical infrastructure, Prisma AIRS in Kubernetes, and Palo Alto firewall deployments in Azure.',
  },
  {
    q: 'How do we get started and see references?',
    a: 'Start with a scoped conversation through our contact form. We can walk through comparable anonymized engagements and provide verifiable references under NDA.',
  },
]

export const cyberRelatedLinks = [
  { label: 'SASE Transformation', href: '/cybersecurity-advisory/sase' },
  { label: 'Zero Trust Architecture', href: '/cybersecurity-advisory/zero-trust' },
  { label: 'Cloud Security', href: '/cybersecurity-advisory/cloud-security' },
  { label: 'Cybersecurity Services in Toronto', href: '/services/cybersecurity/toronto' },
]

// Illustrative, anonymized examples — not named client engagements. Kept
// qualitative by design (no invented precision), matching the discipline used
// on the Canada Delivery Track Record page.
export const caseStudies = [
  {
    title: 'Global Banking Institution',
    tag: 'Prisma Access',
    users: 'Enterprise-scale global user base',
    region: 'Multi-country deployment',
    outcome: 'Meaningful WAN cost reduction alongside consistently high availability across the rollout.',
    img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=80',
  },
  {
    title: 'North American Telecommunications Carrier',
    tag: 'Prisma SD-WAN',
    users: 'Large multi-branch network',
    region: 'North America',
    outcome: 'Legacy MPLS retired in favor of a modern SD-WAN, improving application performance across branches.',
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=80',
  },
  {
    title: 'Canadian Healthcare Network',
    tag: 'Cortex Operations',
    users: 'Large endpoint estate',
    region: 'Canada',
    outcome: 'Meaningfully faster incident response through automated SOC playbooks.',
    img: 'https://images.unsplash.com/photo-1548092372-0d1bd40894a3?w=900&q=80',
  },
  {
    title: 'UAE Government Agency',
    tag: 'Network Security',
    users: 'Large government workforce',
    region: 'UAE',
    outcome: 'NGFW and IPS refresh aligned to NESA requirements, sustaining high availability.',
    img: 'https://images.unsplash.com/photo-1563841930606-67e2bce48b78?w=900&q=80',
  },
]
