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
  { name: 'Prisma Access', spec: 'SASE cloud delivery — remote access and branch security', badge: 'In Active Practice', advisor: 'Tanveer Ahmed' },
  { name: 'Prisma SD-WAN', spec: 'Software-defined WAN with application-defined policies', badge: 'In Active Practice', advisor: 'Tanveer Ahmed' },
  { name: 'CASB', spec: 'Cloud access security broker for SaaS visibility and data protection', badge: 'In Active Practice', advisor: 'Tanveer Ahmed' },
  { name: 'SWG', spec: 'Secure Web Gateway — web traffic inspection and filtering', badge: 'In Active Practice', advisor: 'Tanveer Ahmed' },
  { name: 'ZTNA', spec: 'Zero Trust Network Access — identity-based application access', badge: 'In Active Practice', advisor: 'Tanveer Ahmed' },
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
    short: 'Converging network and security on a cloud-delivered edge — faster, safer, simpler.',
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

// Sub-pages (use ServicePageTemplate)
export const subpages = {
  'zero-trust': {
    keyword: 'Zero Trust Architecture Canada',
    title: 'Zero Trust Architecture Consulting — Canada & UAE | The Cyber Adviser',
    metaDescription: 'Zero Trust architecture consulting across Canada and UAE. Design and deploy identity-first, least-privilege security across users, workloads and data.',
    h1: 'Zero Trust Architecture Consulting — Canada & UAE',
    hero: 'Design and deploy Zero Trust architectures that actually work — identity-first, least-privilege, enforced everywhere.',
    icon: 'Lock',
    overview: [
      'Zero Trust is the defining security paradigm of the decade — and the most misunderstood. True Zero Trust is not a product you buy; it is an architecture you live.',
      'The Cyber Adviser has led Zero Trust transformations for Fortune 500 banks, telcos and government entities. We translate NIST SP 800-207 and CISA ZTMM into concrete, vendor-aware reference architectures.',
      'Our engagements deliver measurable outcomes: reduced attack surface, simplified network topology, and a security posture that aligns to modern cloud and hybrid workforce realities.',
    ],
    features: [
      { icon: 'Fingerprint', title: 'Identity-First Design', desc: 'Strong identity, MFA, conditional access and device posture as the foundation of all access decisions.' },
      { icon: 'Network', title: 'Micro-Segmentation', desc: 'East-west segmentation across user, workload and data tiers using ZTNA, ZTWA and host isolation.' },
      { icon: 'Eye', title: 'Continuous Verification', desc: 'Real-time risk scoring with revocation, re-authentication and policy enforcement.' },
    ],
    benefits: [
      { icon: 'ShieldCheck', t: 'Reduced blast radius', d: 'Lateral movement contained through granular segmentation.' },
      { icon: 'Gauge', t: 'Faster M&A integration', d: 'Identity-centric access decouples trust from network topology.' },
      { icon: 'Wallet', t: 'VPN retirement', d: 'ZTNA typically saves 30–60% on legacy remote access costs.' },
      { icon: 'ClipboardCheck', t: 'Regulatory alignment', d: 'Maps directly to NIST SP 800-207, CISA ZTMM, NESA and UAE PDPL.' },
    ],
    process: [
      { n: '01', t: 'Maturity Assessment', d: 'Current-state scoring against CISA ZTMM across five pillars.' },
      { n: '02', t: 'Target Architecture', d: 'Reference design, vendor alignment, phasing model.' },
      { n: '03', t: 'Pilot & Prove', d: 'High-value use case deployed end-to-end in 60 days.' },
      { n: '04', t: 'Scale', d: 'Wave-based rollout with governance and measurable KPIs.' },
    ],
    industries: ['Financial Services', 'Government', 'Telecom', 'Healthcare', 'Energy', 'Critical Infrastructure'],
    faqs: [
      { q: 'Is Zero Trust a product or an architecture?', a: 'It is an architecture. Many vendors sell "Zero Trust" products, but true Zero Trust is a holistic design that combines identity, network, device and data controls under a continuous-verification model.' },
      { q: 'How long does a Zero Trust transformation take?', a: 'Typical programs span 18–36 months end-to-end. The first measurable quick wins (e.g., ZTNA pilot, MFA everywhere) are usually achievable within 3–6 months.' },
      { q: 'Do you have vendor preferences?', a: 'We are vendor-neutral. Our advisory practice is intentionally decoupled from resale economics. We recommend Palo Alto, Zscaler, Netskope, Microsoft and others based on fit.' },
    ],
  },
  'sase': {
    keyword: 'SASE Transformation Canada',
    title: 'SASE Transformation Consulting — Canada & UAE | The Cyber Adviser',
    metaDescription: 'SASE transformation consulting in Canada and UAE. Converge network and security on a cloud-delivered edge with Palo Alto, Zscaler, Netskope and Cisco.',
    h1: 'SASE Transformation Consulting',
    hero: 'Converge network and security at the cloud edge — with architecture-first guidance, not vendor-first sales.',
    icon: 'Globe2',
    overview: [
      'Secure Access Service Edge (SASE) is reshaping enterprise networking. Done well, it collapses a decade of point products into a single, cloud-delivered fabric — delivering better performance, stronger security and lower cost.',
      'Done poorly, SASE becomes a multi-year vendor swap with minimal business benefit. The Cyber Adviser helps enterprises avoid that outcome.',
      'We have led full SASE transformations across Palo Alto Prisma Access, Zscaler, Netskope and Cisco Umbrella — with a vendor-neutral lens.',
    ],
    features: [
      { icon: 'Globe2', title: 'Cloud-Delivered Edge', desc: 'SWG, CASB, ZTNA, DLP and FWaaS unified on a single global fabric.' },
      { icon: 'Gauge', title: 'Application Performance', desc: 'Per-app routing, QoS and path optimisation across 100+ PoPs.' },
      { icon: 'ShieldCheck', title: 'Integrated Security', desc: 'Inline inspection of encrypted traffic with unified policy across users and branches.' },
    ],
    benefits: [
      { icon: 'TrendingDown', t: '40–70% WAN cost reduction', d: 'Retire MPLS and stack-of-boxes security architectures.' },
      { icon: 'Rocket', t: 'Faster site turn-up', d: 'Branches online in hours, not weeks.' },
      { icon: 'Users', t: 'Hybrid-workforce ready', d: 'Consistent access experience for office, home and field users.' },
      { icon: 'LineChart', t: 'Observability', desc: 'End-to-end telemetry across network and security in one console.' },
    ],
    process: [
      { n: '01', t: 'Discover', d: 'Traffic baseline, application inventory, site topology.' },
      { n: '02', t: 'Design', d: 'Target SASE architecture, vendor fit, routing strategy.' },
      { n: '03', t: 'Pilot', d: 'Proof-of-value across 5–10 representative sites.' },
      { n: '04', t: 'Roll out', d: 'Wave-based deployment with legacy retirement plan.' },
    ],
    industries: ['Banking', 'Retail', 'Manufacturing', 'Telecom', 'Healthcare', 'Energy'],
    faqs: [
      { q: 'Which SASE vendor is best?', a: 'It depends on your starting point, integrations and priorities. Palo Alto excels in networking + security convergence; Zscaler in SSE depth; Netskope in data protection; Cisco in existing-estate integration.' },
      { q: 'Can SASE fully replace MPLS?', a: 'For most enterprises, yes — particularly when combined with broadband and 5G. A small minority of ultra-low-latency workloads may retain MPLS/private fibre.' },
      { q: 'How do we get started?', a: 'Typically a 4-week SASE readiness assessment followed by a 60–90 day pilot across representative sites.' },
    ],
  },
  'cloud-security': {
    keyword: 'Cloud Security Advisory Multi-Cloud',
    title: 'Cloud Security Advisory — Multi-Cloud (AWS, Azure, GCP) | The Cyber Adviser',
    metaDescription: 'Multi-cloud security advisory across AWS, Azure and GCP. CSPM, CWPP, CNAPP, CIEM and data protection strategy from certified cloud security architects.',
    h1: 'Cloud Security Advisory — Multi-Cloud',
    hero: 'Secure your cloud estate as fast as you build it — across AWS, Azure and GCP.',
    icon: 'Cloud',
    overview: [
      'Cloud security is a different discipline to traditional security. Controls are code, identity is perimeter, and misconfiguration is the #1 risk.',
      'The Cyber Adviser helps enterprises build cloud security programs that scale with the business. Our architects hold AWS Security Specialty, Azure Security Engineer and Google Professional Cloud Security certifications.',
      'We deliver CSPM, CWPP, CNAPP, CIEM and cloud-native data protection strategies — plus the operating model and skills to run them.',
    ],
    features: [
      { icon: 'ShieldAlert', title: 'CSPM / CNAPP', desc: 'Posture management, misconfiguration prevention and unified policy across hyperscalers.' },
      { icon: 'KeyRound', title: 'CIEM & Identity', desc: 'Least-privilege entitlements, just-in-time access and identity threat detection.' },
      { icon: 'Database', title: 'Data Protection', desc: 'Discovery, classification, DLP and sovereignty across object, database and data lake tiers.' },
    ],
    benefits: [
      { icon: 'Activity', t: '90%+ misconfig reduction', d: 'Guardrails-as-code prevent drift at the source.' },
      { icon: 'Eye', t: 'Unified visibility', d: 'One pane across AWS, Azure, GCP and SaaS.' },
      { icon: 'Gauge', t: 'Faster cloud delivery', d: 'Secure landing zones unblock application teams.' },
      { icon: 'Wallet', t: 'FinOps alignment', d: 'Security controls tuned to avoid cost overruns.' },
    ],
    process: [
      { n: '01', t: 'Assess', d: 'Posture scan, privilege audit, data inventory.' },
      { n: '02', t: 'Foundation', d: 'Secure landing zone, guardrails, break-glass.' },
      { n: '03', t: 'Protect', d: 'CNAPP deployment, workload and data controls.' },
      { n: '04', t: 'Operate', d: 'SOC integration, CDR playbooks, quarterly reviews.' },
    ],
    industries: ['SaaS', 'Financial Services', 'Healthcare', 'Media', 'Government', 'Retail'],
    faqs: [
      { q: 'Do we need a CNAPP?', a: 'If you operate production workloads in more than one cloud or account, almost certainly yes. CNAPP consolidates CSPM, CWPP, CIEM and DSPM capabilities into one platform.' },
      { q: 'Which CNAPP vendor do you recommend?', a: 'We work extensively with Palo Alto Prisma Cloud, Check Point CloudGuard, Wiz and Microsoft Defender for Cloud. The right choice depends on your cloud mix, integrations and maturity.' },
      { q: 'Can you support UAE data residency?', a: 'Yes. We design architectures that meet UAE PDPL and NESA requirements using Azure UAE North, AWS Middle East and in-country private cloud partners.' },
    ],
  },
  'executive-advisory': {
    keyword: 'Executive Cybersecurity Advisory',
    title: 'Executive Cybersecurity Advisory — CISO & Board | The Cyber Adviser',
    metaDescription: 'Executive cybersecurity advisory for CISOs, CIOs and boards. Strategy, regulatory guidance, risk quantification and virtual CISO services across Canada and UAE.',
    h1: 'Executive Cybersecurity Advisory',
    hero: 'Board-grade cybersecurity guidance — clear, candid, commercially aware.',
    icon: 'Briefcase',
    overview: [
      'Cybersecurity is now a board-level conversation in every industry. Directors and executives need advisors who speak the language of risk, regulation and return — not just technology.',
      'The Cyber Adviser partners with CISOs, CIOs and boards across Canada and UAE on strategy, governance, and high-stakes decisions.',
      'Engagements include virtual CISO, board advisory, M&A due diligence, regulatory readiness (OSFI B-13, NESA, UAE PDPL) and crisis response.',
    ],
    features: [
      { icon: 'Briefcase', title: 'Virtual CISO', desc: 'Fractional executive leadership for growing organisations or during transitions.' },
      { icon: 'ClipboardList', title: 'Board Reporting', desc: 'Cyber risk quantification and dashboards boards actually understand.' },
      { icon: 'FileCheck', title: 'Regulatory Readiness', desc: 'OSFI B-13, NESA, UAE PDPL, SOC 2 and ISO 27001 guidance.' },
    ],
    benefits: [
      { icon: 'Users', t: 'Trusted counsel', d: 'Independent advice, unaligned to vendor or reseller incentives.' },
      { icon: 'TrendingUp', t: 'Risk in business terms', d: 'FAIR-based quantification tied to revenue, reputation and resilience.' },
      { icon: 'ShieldCheck', t: 'Audit-ready outcomes', d: 'Defensible documentation and executive-ready narratives.' },
      { icon: 'Clock', t: 'On-demand access', d: 'Advisory retainer with response targets set in your written SLA.' },
    ],
    process: [
      { n: '01', t: 'Onboard', d: 'Stakeholder mapping, risk appetite, priority topics.' },
      { n: '02', t: 'Establish', d: 'Cadence, reporting model, governance artefacts.' },
      { n: '03', t: 'Advise', d: 'Ongoing counsel on decisions, incidents, regulators.' },
      { n: '04', t: 'Review', d: 'Quarterly board reviews and annual strategy reset.' },
    ],
    industries: ['Banking', 'Insurance', 'Public Sector', 'Healthcare', 'Energy', 'Private Equity'],
    faqs: [
      { q: 'What is a virtual CISO (vCISO)?', a: 'A fractional senior cybersecurity leader who acts as your CISO for a defined set of hours per month — ideal for organisations not yet ready for a full-time executive or during a leadership transition.' },
      { q: 'Do you support regulators directly?', a: 'Yes — we have led pre-audit prep, on-site remediation and post-incident conversations with OSFI, NESA, and financial regulators on behalf of clients.' },
      { q: 'Is an NDA available for confidential engagements?', a: 'Yes. All executive advisory engagements operate under mutual NDA, and we support additional contractual protections (privilege, escrow) for sensitive matters.' },
    ],
  },
  'security-automation': {
    keyword: 'Security Automation SOAR XSOAR',
    title: 'Security Automation — SOAR, XSOAR & XSIAM Consulting | The Cyber Adviser',
    metaDescription: 'Security automation consulting across SOAR, XSOAR and XSIAM. Reduce MTTR, eliminate alert fatigue and scale SOC operations with automation-first design.',
    h1: 'Security Automation — SOAR, XSOAR & XSIAM',
    hero: 'Stop throwing analysts at alerts. Automate the 80% so your team can focus on what matters.',
    icon: 'Bot',
    overview: [
      'Modern SOCs drown in alerts. The answer is not more people — it is better automation.',
      'The Cyber Adviser designs and implements SOAR, XSOAR and XSIAM programs that reduce MTTR, eliminate repetitive toil and scale SOC output without scaling headcount.',
      'Our practitioners have built playbook libraries for 20+ enterprise SOCs and contributed open-source content to leading SOAR marketplaces.',
    ],
    features: [
      { icon: 'Bot', title: 'Playbook Engineering', desc: 'Purpose-built automations for phishing, malware, credential theft and incident enrichment.' },
      { icon: 'Workflow', title: 'XSIAM Transformation', desc: 'Replace SIEM+SOAR stacks with unified XSIAM for faster detection and response.' },
      { icon: 'GitBranch', title: 'Integration Fabric', desc: 'Bidirectional integrations across EDR, email, identity, ticketing, threat intel.' },
    ],
    benefits: [
      { icon: 'Clock', t: '70–90% MTTR reduction', d: 'Typical customer outcome across tier-1 triage use cases.' },
      { icon: 'Gauge', t: 'Analyst output 3–5x', d: 'Automated enrichment and response frees time for hunting.' },
      { icon: 'TrendingDown', t: 'Alert fatigue', d: 'Auto-closure of benign events with full audit trail.' },
      { icon: 'Wallet', t: 'SIEM cost relief', d: 'XSIAM often reduces TCO by 30–50% vs. legacy SIEM + SOAR.' },
    ],
    process: [
      { n: '01', t: 'Baseline', d: 'Use-case inventory, MTTR baseline, tool integration audit.' },
      { n: '02', t: 'Design', d: 'Playbook architecture, data model, operating model.' },
      { n: '03', t: 'Build', d: 'Agile playbook development and integration testing.' },
      { n: '04', t: 'Measure', d: 'MTTR, analyst NPS and coverage metrics reported monthly.' },
    ],
    industries: ['Banking', 'SaaS', 'Retail', 'Government', 'Managed Security', 'Healthcare'],
    faqs: [
      { q: 'Should we adopt XSIAM?', a: 'If you run Palo Alto Cortex and/or are reviewing your SIEM, XSIAM deserves serious evaluation. It is particularly compelling for SOCs struggling with SIEM cost, performance or SOAR complexity.' },
      { q: 'Do you build custom playbooks?', a: 'Yes — we maintain a library of 200+ reusable playbooks and regularly build custom automations for client-specific use cases.' },
      { q: 'Can automation replace tier-1 analysts?', a: 'It augments them. Automation handles repetitive enrichment and response; analysts focus on higher-value hunting, threat modelling and tier-2/3 response.' },
    ],
  },
}

export const getAdvisorySubpage = (slug) => subpages[slug] || null
export const getAllAdvisorySlugs = () => Object.keys(subpages)
