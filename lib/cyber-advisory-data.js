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
