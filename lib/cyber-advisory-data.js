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
    descriptor: 'North American pharmaceutical company',
    industry: 'Pharmaceutical & Life Sciences',
    region: 'Canada',
    capabilities: ['prisma-access'],
    tech: ['Prisma Access'],
    scope: 'Prisma Access deployment for secure, cloud-delivered access to corporate applications.',
    outcome: 'Consistent secure connectivity for remote and hybrid users without backhauling traffic.',
  },
  {
    id: 'insurance-firewall-hardening',
    descriptor: 'Global specialty insurance group',
    industry: 'Insurance & Financial Services',
    region: 'Canada',
    capabilities: ['firewall-audit'],
    tech: ['Palo Alto'],
    scope: 'Palo Alto firewall security hardening and optimization, plus a full firewall audit and assessment.',
    outcome: 'Reduced attack surface and a clean, well-documented policy baseline.',
  },
  {
    id: 'water-utility-firewall-deploy',
    descriptor: 'Regional water utility',
    industry: 'Utilities & Critical Infrastructure',
    region: 'Canada',
    capabilities: ['firewall-deploy'],
    tech: ['Palo Alto'],
    scope: 'Palo Alto next-generation firewall deployment across the utility environment.',
    outcome: 'A modern, application-aware perimeter protecting critical-infrastructure systems.',
  },
  {
    id: 'asset-mgmt-panorama-strata',
    descriptor: 'Global asset-management firm',
    industry: 'Financial Services',
    region: 'Canada',
    capabilities: ['panorama-strata', 'prisma-access'],
    tech: ['Panorama', 'Prisma Access', 'Strata Cloud Manager'],
    scope: 'Migrated Panorama-managed Prisma Access and managed firewalls to Strata Cloud Manager.',
    outcome: 'Unified cloud-based management across firewalls and SASE in a single console.',
  },
  {
    id: 'fintech-prisma-airs-k8s',
    descriptor: 'Cross-border payments fintech',
    industry: 'Fintech & Payments',
    region: 'Canada',
    capabilities: ['cloud-airs-ot'],
    tech: ['Prisma AIRS', 'Kubernetes'],
    scope: 'Prisma AIRS deployment within a Kubernetes environment.',
    outcome: 'AI-runtime and container security embedded into a modern cloud-native platform.',
  },
  {
    id: 'court-cisco-to-palo-alto',
    descriptor: 'Canadian provincial court system',
    industry: 'Government & Justice',
    region: 'Canada',
    capabilities: ['firewall-deploy', 'panorama-strata'],
    tech: ['Cisco → Palo Alto', 'Strata Cloud Manager', 'GlobalProtect'],
    scope: 'Cisco-to-Palo Alto firewall migration across two data centres; firewalls onboarded to Strata Cloud Manager with a redundant GlobalProtect design.',
    outcome: 'Resilient, centrally managed remote access with data-centre redundancy.',
  },
  {
    id: 'quebec-gov-prisma-access',
    descriptor: 'Quebec provincial government agency',
    industry: 'Government & Public Sector',
    region: 'Canada',
    capabilities: ['prisma-access'],
    tech: ['Prisma Access'],
    scope: 'Prisma Access deployment for a public-sector workforce.',
    outcome: 'Secure, scalable access for government staff across distributed locations.',
  },
  {
    id: 'food-mfg-it-ot-segmentation',
    descriptor: 'Major North American food manufacturer',
    industry: 'Manufacturing',
    region: 'Canada',
    capabilities: ['cloud-airs-ot'],
    tech: ['Palo Alto', 'IT/OT'],
    scope: 'IT/OT segmentation program separating production and operational technology from corporate IT.',
    outcome: 'Contained lateral movement and a clearer security boundary around plant systems.',
  },
  {
    id: 'community-health-panorama-azure',
    descriptor: 'Network of community health centres',
    industry: 'Healthcare',
    region: 'Canada',
    capabilities: ['panorama-strata'],
    tech: ['Panorama', 'Azure'],
    scope: 'Panorama migration from on-premises to Azure cloud.',
    outcome: 'Cloud-hosted, centralized firewall management with reduced on-site footprint.',
  },
  {
    id: 'grocery-prisma-access-swg',
    descriptor: 'National grocery retailer',
    industry: 'Retail',
    region: 'Canada',
    capabilities: ['prisma-access'],
    tech: ['Prisma Access'],
    scope: 'Replaced a legacy web-security platform with Prisma Access.',
    outcome: 'Consolidated secure web gateway and SASE on a single cloud-delivered stack.',
  },
  {
    id: 'payments-network-azure-firewall',
    descriptor: 'National payments network',
    industry: 'Financial Services',
    region: 'Canada',
    capabilities: ['firewall-deploy'],
    tech: ['Palo Alto', 'Azure'],
    scope: 'Palo Alto firewall deployment within an Azure environment.',
    outcome: 'A cloud-native perimeter aligned to the organization’s Azure footprint.',
  },
  {
    id: 'diagnostics-prisma-access-greenfield',
    descriptor: 'Global diagnostics manufacturer',
    industry: 'Healthcare & Diagnostics',
    region: 'Canada',
    capabilities: ['prisma-access'],
    tech: ['Prisma Access'],
    scope: 'Greenfield Prisma Access deployment built from the ground up.',
    outcome: 'A clean SASE foundation delivered without legacy technical debt.',
  },
  {
    id: 'law-firm-firewall-audit',
    descriptor: 'Leading Canadian law firm',
    industry: 'Legal',
    region: 'Canada',
    capabilities: ['firewall-audit'],
    tech: ['Palo Alto'],
    scope: 'Firewall audit and assessment with security hardening and optimization.',
    outcome: 'A hardened policy posture protecting sensitive client matters.',
  },
  {
    id: 'ai-software-firewall-support',
    descriptor: 'Enterprise AI software company',
    industry: 'Technology',
    region: 'Canada',
    capabilities: ['firewall-audit'],
    tech: ['Palo Alto'],
    scope: 'Ongoing Palo Alto firewall support and operational assurance.',
    outcome: 'Sustained firewall health and reliable day-to-day security operations.',
  },
  {
    id: 'energy-firewall-policy-optimization',
    descriptor: 'North American energy-infrastructure company',
    industry: 'Energy',
    region: 'Canada',
    capabilities: ['firewall-audit'],
    tech: ['Palo Alto'],
    scope: 'Firewall security hardening and policy optimization.',
    outcome: 'An optimized, lean rule base with improved performance and auditability.',
  },
]

export const cyberDeliveryStats = [
  { value: '15+', label: 'Canada Engagements' },
  { value: 'PCNSE', label: 'Palo Alto Certified Lead' },
  { value: 'SASE', label: 'Prisma Access & Strata' },
  { value: 'IT/OT', label: 'Segmentation & Zero Trust' },
]

export const caseStudies = [
  {
    title: 'Global Bank Prisma Access Rollout',
    tag: 'Prisma Access',
    users: '85,000 users',
    region: '42 countries',
    outcome: '78% WAN cost reduction, 99.97% availability over 18 months.',
    img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=80',
  },
  {
    title: 'Telco SD-WAN Modernisation',
    tag: 'Prisma SD-WAN',
    users: '1,200 branches',
    region: 'North America',
    outcome: 'Legacy MPLS retired; application performance up 3.4x.',
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=80',
  },
  {
    title: 'Healthcare SOC Automation',
    tag: 'Cortex Operations',
    users: '12,000 endpoints',
    region: 'Canada',
    outcome: 'MTTR reduced from 4.1 hours to 22 minutes with XSOAR playbooks.',
    img: 'https://images.unsplash.com/photo-1548092372-0d1bd40894a3?w=900&q=80',
  },
  {
    title: 'Government Network Security Refresh',
    tag: 'Network Security',
    users: '30,000 users',
    region: 'UAE',
    outcome: 'NGFW + IPS refresh aligned to NESA with 99.99% uptime.',
    img: 'https://images.unsplash.com/photo-1563841930606-67e2bce48b78?w=900&q=80',
  },
]
