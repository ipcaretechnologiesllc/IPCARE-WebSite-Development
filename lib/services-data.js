// Centralised service content. Categories have full content; sub-pages override key SEO/hero fields and inherit the rest.

export const serviceCategories = {
  'it-consulting': {
    name: 'IT Consulting',
    icon: 'Briefcase',
    short: 'Strategy, assessment, digital transformation',
    keyword: 'IT Consulting UAE',
    title: 'IT Consulting Services UAE — Strategy, Assessment, Transformation | IP Care Technologies',
    metaDescription: 'Expert IT consulting in UAE. Technology strategy, IT assessment, and digital transformation services for enterprise. 20+ years experience. Get a free consultation.',
    h1: 'IT Consulting Services in UAE',
    hero: 'Align technology with business outcomes. From board-level strategy to hands-on assessment, we help UAE enterprises modernise with clarity and confidence.',
    overview: [
      'IP Care Technologies has guided UAE enterprises through two decades of IT change — from on-prem consolidation to cloud-first and AI-enabled operations. Our consulting practice blends deep technical knowledge with commercial discipline.',
      'We work with CIOs, CTOs and business owners to translate strategic ambition into pragmatic, measurable roadmaps. Every engagement starts with listening, followed by rigorous assessment, then an executable plan.',
      'Whether you need a 3-year technology strategy, a due-diligence health check, or a turnaround of a stalled transformation — our certified consultants deliver outcomes, not slideware.',
    ],
    features: [
      { icon: 'Target', title: 'Strategic Roadmaps', desc: '3- to 5-year technology strategies aligned to business goals, budgets and risk appetite.' },
      { icon: 'ClipboardCheck', title: 'Independent Assessment', desc: 'Vendor-neutral audits of infrastructure, applications, security posture and IT operating model.' },
      { icon: 'Rocket', title: 'Transformation Delivery', desc: 'Programme governance, architecture and change management to de-risk execution.' },
    ],
    benefits: [
      { icon: 'TrendingUp', t: 'Reduce IT cost by 20–35%', d: 'Through consolidation, right-sizing and commercial renegotiation.' },
      { icon: 'Gauge', t: 'Faster time-to-market', d: 'Modern platforms cut delivery cycles from months to weeks.' },
      { icon: 'ShieldCheck', t: 'Reduced risk', d: 'Security, compliance and continuity built into every recommendation.' },
      { icon: 'Users', t: 'Stakeholder alignment', d: 'Executive-ready artefacts that build consensus across business and IT.' },
    ],
    process: [
      { n: '01', t: 'Discover', d: 'Stakeholder interviews, data gathering, baseline capture.' },
      { n: '02', t: 'Analyse', d: 'Gap analysis, benchmarking, options appraisal.' },
      { n: '03', t: 'Design', d: 'Target architecture, roadmap, business case.' },
      { n: '04', t: 'Deliver', d: 'Governance, execution oversight, benefits tracking.' },
    ],
    industries: ['Government', 'Banking & Finance', 'Healthcare', 'Oil & Gas', 'Hospitality', 'Education'],
    faqs: [
      { q: 'How long does a typical IT consulting engagement last?', a: 'Strategic engagements run 6–12 weeks. Assessments can be completed in 3–4 weeks. Transformation programmes span 6–24 months depending on scope.' },
      { q: 'Are you vendor-neutral?', a: 'Yes. We hold partnerships with leading vendors but our consulting practice is intentionally vendor-neutral so recommendations are aligned to your outcomes, not quotas.' },
      { q: 'Do you deliver on the recommendations you make?', a: 'We can. Many clients retain IP Care to deliver the roadmap through our Managed IT and Infrastructure practices, but this is optional.' },
    ],
    subpages: {
      'technology-strategy': {
        keyword: 'IT Technology Strategy UAE',
        title: 'IT Technology Strategy UAE — Enterprise IT Roadmap | IP Care Technologies',
        metaDescription: 'Build a future-ready IT technology strategy in UAE. Board-grade roadmaps, target architectures and business cases from 20+ year consulting veterans.',
        h1: 'IT Technology Strategy',
        hero: 'A clear, costed, board-approved IT strategy — delivered in weeks, not quarters.',
        overview: [
          'An IT strategy is only valuable when it survives contact with reality. We build strategies that are specific, costed and owned — not shelfware.',
          'Our UAE-based consultants combine global enterprise architecture experience with deep knowledge of the local regulatory and vendor landscape (NESA, UAE PDPL, TDRA).',
          'Deliverables include a target operating model, 3-year technology roadmap, capability heat-map, business case, and executive-ready narrative.',
        ],
        features: [
          { icon: 'Target', title: 'Target Architecture', desc: 'Reference architectures for cloud, data, security and applications aligned to business goals.' },
          { icon: 'LineChart', title: 'Capability Roadmap', desc: 'Prioritised, time-phased initiatives with dependencies, ownership and measurable outcomes.' },
          { icon: 'Wallet', title: 'Costed Business Case', desc: 'Transparent 5-year TCO model with ROI, NPV and sensitivity analysis.' },
        ],
      },
      'it-assessment': {
        keyword: 'IT Assessment & Planning UAE',
        title: 'IT Assessment & Planning UAE — Infrastructure Health Check | IP Care Technologies',
        metaDescription: 'Independent IT assessment and planning in UAE. Infrastructure, security and operations audits with prioritised remediation roadmaps.',
        h1: 'IT Assessment & Planning Services',
        hero: 'Know exactly where your IT stands — and what to fix first.',
        overview: [
          'An IP Care IT assessment is a 360° health check across infrastructure, applications, security, operations, cost and talent. It gives leadership an honest, benchmarked view.',
          'We use industry frameworks (TOGAF, ITIL 4, NIST CSF) and proprietary diagnostics honed across 500+ engagements.',
          'Output is a prioritised remediation plan with quick wins (0–90 days), strategic moves (3–12 months) and transformation bets (12–36 months).',
        ],
        features: [
          { icon: 'ClipboardCheck', title: 'Infrastructure Audit', desc: 'End-to-end review of network, compute, storage, backup and data centre operations.' },
          { icon: 'ShieldAlert', title: 'Security Posture Review', desc: 'Alignment to NESA, ISO 27001 and NIST CSF with gap analysis and risk register.' },
          { icon: 'Gauge', title: 'Operating Model Scorecard', desc: 'ITIL maturity, service levels, talent, sourcing and cost benchmarking.' },
        ],
      },
      'digital-transformation': {
        keyword: 'Digital Transformation UAE',
        title: 'Digital Transformation UAE — Cloud, Data & Automation | IP Care Technologies',
        metaDescription: 'End-to-end digital transformation in UAE. Cloud, data platforms, process automation and customer experience led by certified consultants.',
        h1: 'Digital Transformation Services',
        hero: 'Turn digital ambition into measurable business results.',
        overview: [
          'Digital transformation is not a project — it is a capability. We help UAE organisations build the operating model, platforms and culture required to sustain continuous digital innovation.',
          'Our accelerators span cloud modernisation, data & AI, process automation, customer experience and workforce enablement.',
          'Engagements are outcome-based with quarterly value reviews and public business-case tracking.',
        ],
        features: [
          { icon: 'Cloud', title: 'Cloud-Native Operations', desc: 'Migration, modernisation and FinOps across AWS, Azure and GCP.' },
          { icon: 'Database', title: 'Data & AI', desc: 'Data platforms, analytics and generative-AI use cases with UAE residency.' },
          { icon: 'Zap', title: 'Process Automation', desc: 'RPA, workflow and low-code platforms to eliminate manual handoffs.' },
        ],
      },
    },
  },

  'infrastructure': {
    name: 'Infrastructure Services',
    icon: 'Server',
    short: 'Data centre, virtualization, procurement',
    keyword: 'IT Infrastructure Services UAE',
    title: 'IT Infrastructure Services UAE — Data Centre, Virtualization | IP Care Technologies',
    metaDescription: 'Design, build and manage resilient IT infrastructure in UAE. Data centre, virtualization, storage and hardware procurement for enterprise workloads.',
    h1: 'IT Infrastructure Services in UAE',
    hero: 'Resilient, high-performance IT foundations engineered for 24/7 enterprise workloads.',
    overview: [
      'Modern business runs on infrastructure that is always-on, secure, observable and cost-efficient. IP Care designs and operates enterprise-grade infrastructure across UAE and Canada.',
      'Our engineers are certified across VMware, Nutanix, HPE, Dell, Cisco, Pure Storage and leading hyperscalers.',
      'From a single-rack edge to multi-site active-active data centres, we cover design, build, migrate and run — with SLAs to match.',
    ],
    features: [
      { icon: 'Server', title: 'Data Centre Design', desc: 'Tier-III ready designs with redundant power, cooling, fire and structured cabling.' },
      { icon: 'Layers', title: 'Virtualization & HCI', desc: 'VMware, Nutanix and Hyper-V with hyperconverged and private cloud options.' },
      { icon: 'ShoppingCart', title: 'Hardware Procurement', desc: 'Vendor-neutral sourcing with commercial optimisation and global logistics.' },
    ],
    benefits: [
      { icon: 'Activity', t: '99.99% availability', d: 'Designs engineered for four-nines with active-active topology.' },
      { icon: 'TrendingUp', t: '30–50% faster workloads', d: 'Modern compute and NVMe storage architectures.' },
      { icon: 'Wallet', t: 'Lower TCO', d: 'Consolidation, right-sizing and hybrid strategies that cut OPEX.' },
      { icon: 'ShieldCheck', t: 'Built-in resilience', d: 'DR, backup and continuity baked into every design.' },
    ],
    process: [
      { n: '01', t: 'Assess', d: 'Workload, capacity and dependency mapping.' },
      { n: '02', t: 'Design', d: 'Target architecture, BoM and migration plan.' },
      { n: '03', t: 'Build', d: 'Procurement, install, commission and test.' },
      { n: '04', t: 'Operate', d: 'Monitoring, patching, capacity and SLA.' },
    ],
    industries: ['Finance', 'Government', 'Telecom', 'Oil & Gas', 'Healthcare', 'Media'],
    faqs: [
      { q: 'Can you support our existing data centre vendor?', a: 'Yes. Our engineers are multi-vendor certified and routinely operate mixed estates — VMware, Nutanix, HPE, Dell, Cisco and more.' },
      { q: 'Do you offer colocation or cloud alternatives?', a: 'Yes. We design hybrid infrastructure combining on-prem, colocation (Khazna, Equinix) and public cloud based on your cost, sovereignty and performance needs.' },
      { q: 'What is your typical SLA for infrastructure services?', a: 'We offer 99.9% to 99.99% availability with 15-minute response for Priority 1 incidents, 24×7.' },
    ],
    subpages: {
      'data-centre-management': {
        keyword: 'Data Centre Management UAE',
        title: 'Data Centre Management UAE — DC Operations & Monitoring | IP Care Technologies',
        metaDescription: 'Professional data centre management services in UAE. 24/7 monitoring, capacity management, DCIM and Tier-III operations for enterprise workloads.',
        h1: 'Data Centre Management Services',
        hero: 'World-class data centre operations — 24×7, SLA-backed, fully transparent.',
        overview: [
          'Your data centre is the beating heart of the business. IP Care delivers full-stack DC operations — from facilities monitoring to application health — across UAE enterprise and government customers.',
          'We combine DCIM platforms (Schneider EcoStruxure, Nlyte) with ITSM workflows to give you one pane of glass for capacity, compliance and cost.',
          'Our engineers hold Uptime Institute ATD certifications and manage estates ranging from 20 kW edge sites to multi-MW Tier-III facilities.',
        ],
      },
      'virtualization': {
        keyword: 'Virtualization Solutions UAE',
        title: 'Virtualization Solutions UAE — VMware, Nutanix, HCI | IP Care Technologies',
        metaDescription: 'Enterprise virtualization and hyperconverged infrastructure in UAE. VMware vSphere, Nutanix AHV and Microsoft Hyper-V design, deploy and support.',
        h1: 'Virtualization Solutions',
        hero: 'Consolidate, simplify and scale with modern virtualization.',
        overview: [
          'Virtualization remains the single highest-ROI infrastructure investment most enterprises make. IP Care has delivered 200+ virtualization projects across the region.',
          'We design and run environments on VMware vSphere/vSAN, Nutanix AHV, and Microsoft Hyper-V/Azure Stack HCI.',
          'Typical outcomes: 60%+ server consolidation, 40% faster provisioning and a clean foundation for private cloud and DR.',
        ],
      },
      'hardware-procurement': {
        keyword: 'Hardware Procurement UAE',
        title: 'IT Hardware Procurement UAE — Vendor-Neutral Sourcing | IP Care Technologies',
        metaDescription: 'Strategic IT hardware procurement in UAE. Servers, storage, networking and end-user compute from HPE, Dell, Cisco, Lenovo with global logistics.',
        h1: 'IT Hardware Procurement',
        hero: 'Right hardware, best price, delivered anywhere — UAE and beyond.',
        overview: [
          'IP Care is an authorised partner of HPE, Dell Technologies, Cisco, Lenovo, Pure Storage and 30+ leading OEMs. Our procurement desk runs structured sourcing events to drive commercial value.',
          'We handle everything from Bill-of-Material engineering to import documentation, customs clearance, asset tagging, staging and delivery.',
          'Clients benefit from consolidated invoicing, warranty management and a single point of accountability across their hardware estate.',
        ],
      },
    },
  },

  'elv': {
    name: 'ELV & Physical Security',
    icon: 'Cable',
    short: 'CCTV, access control, cabling, PA systems',
    keyword: 'ELV Services UAE',
    title: 'ELV Services UAE — CCTV, Access Control, Cabling | IP Care Technologies',
    metaDescription: 'Turnkey ELV services in UAE. CCTV, access control, gate barriers, PA systems, intercoms and structured cabling for enterprise and government facilities.',
    h1: 'ELV Services in UAE',
    hero: 'Turnkey Extra-Low Voltage systems — engineered, integrated and supported end-to-end.',
    overview: [
      'Modern facilities demand ELV systems that are converged, cyber-secure and intelligent. IP Care delivers the full ELV stack — design, supply, install, test and maintain — across UAE commercial, government and event customers.',
      'We are licensed by SIRA (Dubai), Abu Dhabi Police and Monitoring and Control Centre (MCC), with accredited engineers across Hikvision, Axis, HID, Paxton, Suprema, LG and Bosch.',
      'From a single retail store to a city-scale smart-campus, our ELV designs converge onto structured cabling and IP networks for lower cost, simpler operation and richer analytics.',
    ],
    features: [
      { icon: 'Video', title: 'CCTV & Video Analytics', desc: 'IP cameras, NVR/DVR, PTZ, ANPR and AI analytics for security and operations.' },
      { icon: 'KeyRound', title: 'Access Control & Biometrics', desc: 'Card, biometric and facial-recognition systems with visitor and time-attendance.' },
      { icon: 'Cable', title: 'Structured Cabling', desc: 'Cat6/Cat6A/Cat7 copper and single/multi-mode fibre with OTDR certification.' },
    ],
    benefits: [
      { icon: 'ShieldCheck', t: 'Regulatory compliance', d: 'Fully compliant with SIRA, ADP MCC and Civil Defence standards.' },
      { icon: 'Activity', t: 'Converged IP fabric', d: 'Single structured-cabling backbone for all ELV, data and voice.' },
      { icon: 'Eye', title: 'AI-enabled insights', d: 'Video analytics, behaviour detection and dashboards.' },
      { icon: 'Wrench', t: 'Single-vendor AMC', d: '24×7 maintenance across all ELV subsystems with one SLA.' },
    ],
    process: [
      { n: '01', t: 'Survey & Design', d: 'Site survey, risk assessment, SIRA/ADP MCC approvals.' },
      { n: '02', t: 'Supply', d: 'Engineered BoM with tier-1 brands and local stock.' },
      { n: '03', t: 'Install & Commission', d: 'Licensed engineers, pulling, termination, testing.' },
      { n: '04', t: 'Maintain', d: 'Preventive and reactive AMC with response SLAs.' },
    ],
    industries: ['Government', 'Hospitality', 'Retail', 'Healthcare', 'Education', 'Events'],
    faqs: [
      { q: 'Are you SIRA-licensed in Dubai?', a: 'Yes, IP Care holds active SIRA licensing for CCTV design, installation and maintenance in Dubai, plus equivalent approvals from Abu Dhabi Police MCC.' },
      { q: 'Can you integrate with our existing access control system?', a: 'Yes. We integrate HID, Suprema, Paxton, Lenel, Genetec and other platforms, and can unify them under a single VMS/ACS.' },
      { q: 'Do you provide annual maintenance contracts (AMC)?', a: 'Yes — AMC packages range from reactive break-fix to comprehensive 24×7 preventive maintenance with spare-parts inclusion.' },
    ],
    subpages: {
      'cctv-systems': {
        keyword: 'CCTV Installation UAE',
        title: 'CCTV Installation UAE — IP Cameras, NVR, PTZ, Analytics | IP Care Technologies',
        metaDescription: 'Professional CCTV installation in UAE. IP cameras, NVR/DVR recorders, PTZ, ANPR and AI video analytics. SIRA licensed, ADP MCC approved.',
        h1: 'CCTV Installation',
        hero: 'SIRA-licensed CCTV systems with AI analytics — secure, compliant, scalable.',
        overview: [
          'IP Care designs and installs CCTV systems across UAE — from a single retail store to campus-wide surveillance with thousands of IP cameras.',
          'We use tier-1 platforms (Hikvision, Axis, Hanwha, Dahua) and integrate advanced capabilities including 4K IP cameras, NVR/DVR recorders, PTZ, ANPR (Automatic Number Plate Recognition) and AI-powered video analytics.',
          'All installations are fully compliant with SIRA (Dubai) and Abu Dhabi Police Monitoring & Control Centre regulations.',
        ],
        features: [
          { icon: 'Video', title: 'IP Cameras & 4K', desc: 'Tier-1 IP cameras — dome, bullet, fisheye, thermal — up to 4K resolution.' },
          { icon: 'HardDrive', title: 'NVR & DVR Recording', desc: 'Enterprise-grade recorders with RAID storage, failover and remote access.' },
          { icon: 'Eye', title: 'AI Video Analytics', desc: 'ANPR, intrusion detection, loitering, crowd count, object classification.' },
        ],
      },
      'access-control': {
        keyword: 'Access Control Systems UAE',
        title: 'Access Control Systems UAE — Biometric, Facial Recognition | IP Care Technologies',
        metaDescription: 'Enterprise access control systems in UAE. Card, biometric and facial recognition with visitor management and time-attendance integration.',
        h1: 'Access Control Systems',
        hero: 'Frictionless, secure access control — from RFID cards to facial recognition.',
        overview: [
          'Modern access control is about more than locking doors. It is the identity fabric of the physical workplace — governing visitors, contractors, time-attendance and emergency response.',
          'IP Care deploys card, biometric (fingerprint, palm vein) and facial-recognition access control from Suprema, HID, Paxton, ZKTeco and Lenel.',
          'Systems integrate natively with Active Directory, HR systems, visitor management and CCTV for a unified security posture.',
        ],
        features: [
          { icon: 'Fingerprint', title: 'Biometric Readers', desc: 'Fingerprint, palm-vein and iris readers for high-security doors.' },
          { icon: 'ScanFace', title: 'Facial Recognition', desc: 'Touchless entry with liveness detection and anti-spoofing.' },
          { icon: 'UserCheck', title: 'Visitor Management', desc: 'Pre-registration, QR passes, host notifications and audit trails.' },
        ],
      },
      'gate-barriers': {
        keyword: 'Automatic Gate Barrier Systems UAE',
        title: 'Automatic Gate Barrier Systems UAE — Boom Barriers, ANPR | IP Care Technologies',
        metaDescription: 'Automatic gate barrier systems in UAE. Boom barriers, bollards, sliding gates with ANPR, RFID and access control integration for parking and perimeter.',
        h1: 'Automatic Gate Barrier Systems',
        hero: 'Secure perimeters, smart parking — automated vehicle access with ANPR.',
        overview: [
          'IP Care delivers complete vehicle access solutions across UAE — automatic boom barriers, sliding gates, rising bollards and speed gates integrated with ANPR and RFID for fully automated entry.',
          'Our solutions span parking management, gated communities, government compounds, airports and ports.',
          'We integrate with leading barrier OEMs (Nice, FAAC, CAME, Magnetic AutoControl) and ANPR platforms (Genetec, Survision, NDI) for seamless automated access.',
        ],
        features: [
          { icon: 'Car', title: 'ANPR Integration', desc: 'Automatic number plate recognition for touchless, ticketless entry.' },
          { icon: 'RectangleHorizontal', title: 'Boom Barriers', desc: 'High-speed boom barriers rated for commercial and high-security duty cycles.' },
          { icon: 'Fence', title: 'Bollards & Anti-Ram', desc: 'PAS 68 rated bollards and road blockers for hostile-vehicle mitigation.' },
        ],
      },
      'public-address-systems': {
        keyword: 'PA Systems UAE',
        title: 'Public Address (PA) Systems UAE — IP PA & Voice Evacuation | IP Care Technologies',
        metaDescription: 'Enterprise public address and voice evacuation systems in UAE. EN 54 compliant IP PA, background music and emergency paging for commercial facilities.',
        h1: 'Public Address (PA) Systems',
        hero: 'Crystal-clear paging and EN 54 voice evacuation — from retail to stadiums.',
        overview: [
          'PA systems are mission-critical for safety, operations and ambience. IP Care designs IP-based PA and voice evacuation systems that meet UAE Civil Defence requirements.',
          'We deploy EN 54-16 and EN 54-24 certified systems from Bosch, TOA, Honeywell and Atlas IED for commercial towers, hotels, malls, schools, factories and transport hubs.',
          'Solutions include background music zoning, emergency paging, auto-dial emergency messages and integration with fire alarm panels.',
        ],
        features: [
          { icon: 'Megaphone', title: 'IP PA Systems', desc: 'Network-based PA with multi-zone, prioritisation and remote management.' },
          { icon: 'AlertCircle', title: 'Voice Evacuation', desc: 'EN 54 compliant voice alarm with fire-panel integration and supervision.' },
          { icon: 'Music', title: 'BGM & Paging', desc: 'Background music, scheduled announcements and all-call paging.' },
        ],
      },
      'intercom-systems': {
        keyword: 'Audio Video Intercom Systems UAE',
        title: 'Audio Video Intercom Systems UAE — IP Intercom | IP Care Technologies',
        metaDescription: 'IP audio and video intercom systems in UAE for residential, commercial and industrial facilities. Integration with access control and mobile apps.',
        h1: 'Audio & Video Intercom Systems',
        hero: 'Smart intercoms that see, hear and unlock — from apartments to campuses.',
        overview: [
          'Audio and video intercom is the front door to your facility. IP Care deploys IP intercom systems that are secure, mobile-enabled and integrated with access control.',
          'We work with leading OEMs (Commax, Aiphone, 2N, Comelit, Fermax) for residential towers, commercial offices, industrial sites and gated communities.',
          'Mobile integration lets residents answer calls and unlock doors from their smartphones, while SIP integration connects to enterprise telephony.',
        ],
      },
      'structured-cabling': {
        keyword: 'Structured Cabling UAE',
        title: 'Structured Cabling UAE — Cat6, Cat6A, Cat7, Fibre | IP Care Technologies',
        metaDescription: 'Structured cabling services in UAE. Cat6, Cat6A, Cat7 copper and single/multi-mode fibre. OTDR certified with 25-year warranties from Panduit, Commscope, Legrand.',
        h1: 'Structured Cabling Services',
        hero: '25-year warrantied structured cabling — the physical foundation of your enterprise.',
        overview: [
          'Structured cabling is the invisible asset that every other system depends on. Done right, it lasts 25+ years. Done wrong, it becomes a permanent tax on performance.',
          'IP Care designs and installs Category 6, 6A and 7 copper as well as single and multi-mode optical fibre to TIA/ISO standards. We are certified partners with Panduit, Commscope, Legrand and Nexans.',
          'Every installation is tested with calibrated Fluke DSX testers and OTDR for fibre, and backed by 25-year manufacturer warranties.',
        ],
        features: [
          { icon: 'Cable', title: 'Cat6 / Cat6A / Cat7', desc: 'Shielded and UTP copper for 1G, 10G and 25G Ethernet.' },
          { icon: 'Zap', title: 'Fibre Optic', desc: 'OS2 single-mode and OM3/OM4/OM5 multi-mode with LC, SC, MPO termination.' },
          { icon: 'ClipboardCheck', title: 'Fluke & OTDR Testing', desc: 'Full link certification documented in PDF reports per port.' },
        ],
      },
    },
  },

  'managed-it': {
    name: 'Managed IT Services',
    icon: 'Server',
    short: '24/7 monitoring, SLA support, network & server',
    keyword: 'Managed IT Services UAE',
    title: 'Managed IT Services UAE — 24/7 SLA Support | IP Care Technologies',
    metaDescription: 'Managed IT services UAE with 24/7 monitoring, SLA-backed support, proactive maintenance and tiered L1/L2/L3 helpdesk for enterprise.',
    h1: 'Managed IT Services in UAE',
    hero: 'Proactive, SLA-backed IT operations — so your team can focus on the business.',
    overview: [
      'IP Care Managed IT Services gives you an enterprise-grade IT operation without the overhead. We run your infrastructure, applications and helpdesk 24×7 under measurable SLAs.',
      'Our UAE-based NOC and SOC use modern observability stacks (Datadog, SolarWinds, PRTG, Dynatrace) plus AI-enabled event correlation for near-zero mean-time-to-resolution.',
      'Clients range from 50-seat professional services firms to 5,000-seat government entities — all served with the same engineering rigour.',
    ],
    features: [
      { icon: 'Activity', title: '24/7 Monitoring', desc: 'Always-on NOC with infrastructure, application and security monitoring.' },
      { icon: 'Headphones', title: 'Tiered Helpdesk', desc: 'L1/L2/L3 support with first-contact resolution and named engineers.' },
      { icon: 'Wrench', title: 'Proactive Maintenance', desc: 'Patching, health checks, capacity planning and vendor escalations.' },
    ],
    benefits: [
      { icon: 'Clock', t: '15-min P1 response', d: 'Human-on-call for critical incidents, 24×7 in UAE time.' },
      { icon: 'TrendingDown', t: '40% fewer incidents', d: 'Proactive monitoring catches issues before they reach users.' },
      { icon: 'Wallet', t: 'Predictable OPEX', d: 'Flat per-user or per-asset pricing with no surprise invoices.' },
      { icon: 'ShieldCheck', t: 'Audit-ready', d: 'All work logged in ITSM tools with reports for compliance.' },
    ],
    process: [
      { n: '01', t: 'Onboard', d: 'Discovery, CMDB build, runbook creation, handover.' },
      { n: '02', t: 'Stabilise', d: 'Baseline monitoring, patching, quick wins in first 90 days.' },
      { n: '03', t: 'Optimise', d: 'Continuous improvement, automation, cost reduction.' },
      { n: '04', t: 'Report', d: 'Monthly service reviews with SLA reporting and roadmap.' },
    ],
    industries: ['Banking', 'Government', 'Hospitality', 'Legal', 'Retail', 'Manufacturing'],
    faqs: [
      { q: 'What SLA response times do you offer?', a: 'Priority 1 incidents: 15-minute response, 4-hour resolution target. P2: 30 min / 8 hrs. P3: 2 hrs / next business day. All 24×7 for P1/P2.' },
      { q: 'Do you support both on-prem and cloud?', a: 'Yes. Our managed services span on-prem infrastructure, private cloud, Microsoft 365, AWS and Azure — often in a single hybrid estate.' },
      { q: 'Can you augment our in-house IT team?', a: 'Absolutely. Many clients use IP Care as an after-hours or specialist extension of their existing team rather than a full replacement.' },
    ],
    subpages: {
      'network-management': {
        keyword: 'Network Management UAE',
        title: 'Network Management UAE — WiFi 6/7, HPE Aruba, Cisco | IP Care Technologies',
        metaDescription: 'Enterprise network management in UAE. LAN, WAN, SD-WAN, WiFi 6/7 and secure access with HPE Aruba, Cisco and Fortinet. 24/7 NOC-backed.',
        h1: 'Network Management Services',
        hero: 'Always-on enterprise networks — wired, wireless and software-defined.',
        overview: [
          'Your network is the nervous system of the business. IP Care designs, operates and evolves enterprise networks for UAE customers across finance, government, hospitality and industry.',
          'We are certified across HPE Aruba, Cisco, Fortinet and Juniper — covering LAN, WAN, SD-WAN, WiFi 6/7 and secure access (SASE/ZTNA).',
          'Every environment is monitored from our 24×7 NOC with SLA-backed incident management and continuous performance tuning.',
        ],
        features: [
          { icon: 'Wifi', title: 'WiFi 6 & WiFi 7', desc: 'High-density wireless for offices, campuses, hotels and venues.' },
          { icon: 'Network', title: 'SD-WAN', desc: 'Application-aware WAN with MPLS, internet and 5G underlays.' },
          { icon: 'Shield', title: 'Secure Access (SASE)', desc: 'Zero Trust network access integrated with identity and endpoint.' },
        ],
      },
      'server-management': {
        keyword: 'Server Management UAE',
        title: 'Server Management UAE — Windows, Linux, VMware | IP Care Technologies',
        metaDescription: 'Enterprise server management services in UAE. Windows Server, Linux, VMware and hyperconverged platforms with 24/7 patching, monitoring and backup.',
        h1: 'Server Management Services',
        hero: 'Servers that just work — patched, monitored and performant, 24×7.',
        overview: [
          'IP Care runs server estates of every shape — from a single domain controller to multi-thousand-VM private clouds.',
          'We manage Windows Server, Red Hat and Ubuntu Linux, VMware vSphere, Nutanix, Hyper-V and Azure Stack HCI.',
          'Services include OS patching, backup and DR, Active Directory operations, and application hosting for SQL, Exchange, SAP and custom workloads.',
        ],
      },
      'it-support-helpdesk': {
        keyword: 'IT Support Abu Dhabi',
        title: 'IT Support Abu Dhabi — L1/L2/L3 Helpdesk | IP Care Technologies',
        metaDescription: 'Tiered L1/L2/L3 IT support in Abu Dhabi and UAE. Multilingual service desk with 24/7 availability and sub-15-minute P1 response.',
        h1: 'IT Support & Helpdesk',
        hero: 'Real engineers, fast resolution — never a script, never a silo.',
        overview: [
          'Our Abu Dhabi-based service desk delivers tiered L1, L2 and L3 IT support in English and Arabic for enterprise customers.',
          'Every ticket is owned by a named engineer until resolved. We target first-contact resolution above 70% and NPS above 60.',
          'ITIL v4 aligned, with monthly service reviews, CSAT tracking and continuous improvement cycles.',
        ],
      },
      'sla': {
        keyword: 'IT Service Level Agreement UAE',
        title: 'IT SLA UAE — Service Level Agreements | IP Care Technologies',
        metaDescription: 'Transparent IT Service Level Agreements (SLA) in UAE. Priority-based response and resolution targets, uptime guarantees and financial credits.',
        h1: 'IT Service Level Agreements',
        hero: 'Clear, enforceable SLAs — with financial credits when we miss.',
        overview: [
          'A good SLA is more than boilerplate. It is a shared definition of what "good" looks like.',
          'IP Care SLAs are written in plain language with defined priority levels, response and resolution times, uptime targets and service credits for non-performance.',
          'Standard tiers: Silver (business-hours), Gold (24×7 P1/P2), Platinum (24×7 all priorities, on-site, named engineers).',
        ],
      },
      'abu-dhabi': {
        keyword: 'Managed IT Services Abu Dhabi',
        title: 'Managed IT Services Abu Dhabi — 24/7 SLA Support | IP Care Technologies',
        metaDescription: 'SLA-backed managed IT services in Abu Dhabi since 2003. 24/7 NOC, cybersecurity, infrastructure and cloud — trusted by 200+ enterprises across the capital.',
        h1: 'Managed IT Services in Abu Dhabi',
        hero: 'Local engineers, named SLAs, and a team that has been answering the phone in Abu Dhabi since 2003.',
        icon: 'MapPin',
        overview: [
          'Most Abu Dhabi enterprises do not have an IT problem. They have a coverage problem. The engineer who built the system left two years ago. The vendor that promised 24/7 picks up the phone in 24 hours. The compliance audit is in six weeks and nobody can find the asset register.',
          'IP Care is the team Abu Dhabi enterprises call when the existing setup stops scaling. Same office in the capital since 2003. Same engineers on the ground. Same phone number that actually gets answered.',
          'Our managed IT practice covers 24×7 NOC operations, helpdesk, infrastructure, cybersecurity and cloud — delivered under written SLAs with financial credits when we miss them. We support enterprises across government, banking, energy, healthcare and hospitality from a single accountable team.',
        ],
        features: [
          { icon: 'Activity', title: '24×7 NOC in Abu Dhabi', desc: 'Local monitoring and incident response, not an offshore tier-one queue.' },
          { icon: 'Headphones', title: 'Bilingual Service Desk', desc: 'English and Arabic helpdesk, with named engineers owning each ticket end-to-end.' },
          { icon: 'ShieldCheck', title: 'UAE Compliance Built In', desc: 'NESA, ISO 27001 and UAE Personal Data Protection Law alignment — not bolted on later.' },
          { icon: 'Server', title: 'Hybrid Infrastructure', desc: 'On-prem, AWS, Azure or all three — we run them together without finger-pointing.' },
          { icon: 'Lock', title: 'Integrated Cybersecurity', desc: 'SOC, endpoint, identity and network security inside one operations model.' },
          { icon: 'Users', title: 'Augment or Take Over', desc: 'Either keep your internal IT lead and use us as the bench, or hand us the whole function.' },
        ],
        benefits: [
          { icon: 'Clock', t: '15-minute P1 response', d: 'Published monthly. Miss it and you receive service credits — written into every contract.' },
          { icon: 'TrendingUp', t: '99.9% uptime SLA', d: 'Across our managed Abu Dhabi estate, measured per service, reported transparently.' },
          { icon: 'Wallet', t: 'Predictable per-user pricing', d: 'AED 180–450 per user depending on tier and device count. No surprises.' },
          { icon: 'Award', t: '22 years in the capital', d: '500+ projects delivered for government, finance, energy, healthcare and hospitality clients.' },
        ],
        process: [
          { n: '01', t: 'Discovery', d: 'Estate audit, ticket history review, stakeholder interviews.' },
          { n: '02', t: 'Transition', d: 'Documented runbooks, asset register, monitoring and access cutover in 4–6 weeks.' },
          { n: '03', t: 'Steady State', d: '24×7 NOC, helpdesk, change and incident management with monthly service reviews.' },
          { n: '04', t: 'Continuous Improvement', d: 'Quarterly business reviews, capacity planning, security posture uplift.' },
        ],
        industries: ['Government', 'Banking & Finance', 'Energy & Utilities', 'Healthcare', 'Hospitality', 'Education'],
        faqs: [
          { q: 'How fast do you actually respond to a P1 incident?', a: 'Fifteen minutes for P1, two-hour target resolution for the most common patterns. We publish the actual numbers monthly. If we miss the SLA, you get service credits — written into every contract.' },
          { q: 'Do you take over from our existing IT team or augment them?', a: 'Either. About 60% of our Abu Dhabi clients keep an internal IT lead and use us as the bench. The rest hand us the whole function. Both models work — pick the one that fits your team.' },
          { q: 'Can you support hybrid setups — on-prem plus AWS or Azure?', a: 'Yes. Half our infrastructure work is hybrid. We have migrated 40+ workloads to cloud and kept others on-prem because that was the right answer. We do not push cloud-everything as a policy.' },
          { q: 'What does it cost?', a: 'Per-user pricing, typically AED 180–450 per user per month depending on tier (Silver, Gold, Platinum) and device count. Bespoke quotes for regulated industries or unusual scope.' },
          { q: 'How long is the contract?', a: 'Twelve months minimum. We include a 30-day exit clause if we underperform against the SLA for two consecutive months. That keeps us honest.' },
          { q: 'Can you support our Arabic-speaking staff?', a: 'Yes — bilingual helpdesk, Arabic-language ticket handling and Arabic incident reports if you need them. Important for government and family-owned business clients in the capital.' },
        ],
      },
    },
  },

  'cloud': {
    name: 'Cloud Services',
    icon: 'Cloud',
    short: 'Migration, M365, backup & recovery',
    keyword: 'Cloud Services UAE',
    title: 'Cloud Services UAE — AWS, Azure, Microsoft 365 | IP Care Technologies',
    metaDescription: 'Enterprise cloud services in UAE. AWS, Azure and GCP migration, Microsoft 365 and cloud backup. Certified architects, UAE data residency options.',
    h1: 'Cloud Services in UAE',
    hero: 'Cloud done right — secure, cost-optimised and aligned to UAE data sovereignty.',
    overview: [
      'IP Care helps UAE organisations unlock the full value of the cloud — without the cost overruns and security surprises that stall many projects.',
      'Our Cloud Centre of Excellence is certified across AWS (Advanced Tier), Microsoft Azure (Gold) and Google Cloud, with specialisms in FinOps, landing zones and secure migration.',
      'We offer UAE data residency options through AWS Middle East, Azure UAE North and UAE-hosted private cloud partners.',
    ],
    features: [
      { icon: 'Cloud', title: 'Cloud Migration', desc: 'Assessment, landing zone, re-host, re-platform and re-factor across hyperscalers.' },
      { icon: 'Mail', title: 'Microsoft 365', desc: 'Tenant design, migration, security hardening and modern workplace enablement.' },
      { icon: 'HardDriveDownload', title: 'Backup & DR', desc: 'Cloud-native backup, immutable storage and DRaaS with UAE residency.' },
    ],
    benefits: [
      { icon: 'Gauge', t: 'Faster delivery', d: 'Infrastructure in minutes, not months.' },
      { icon: 'Wallet', t: '25–40% cost savings', d: 'FinOps governance and automated right-sizing.' },
      { icon: 'ShieldCheck', t: 'UAE sovereignty', d: 'Residency options aligned to UAE PDPL and NESA.' },
      { icon: 'Layers', t: 'Hybrid-ready', d: 'Seamless on-prem to cloud integration.' },
    ],
    process: [
      { n: '01', t: 'Assess', d: 'Workload discovery, 6R analysis, business case.' },
      { n: '02', t: 'Foundation', d: 'Landing zone, IAM, networking, security guardrails.' },
      { n: '03', t: 'Migrate', d: 'Wave-based migration with testing and cutover.' },
      { n: '04', t: 'Optimise', d: 'FinOps, modernisation, managed services.' },
    ],
    industries: ['Financial Services', 'Public Sector', 'Healthcare', 'Retail', 'Media', 'Education'],
    faqs: [
      { q: 'Which hyperscaler should we choose?', a: 'It depends on your workloads, skills, commercial relationships and sovereignty needs. We help you pick — often with a multi-cloud strategy.' },
      { q: 'Can our data stay in the UAE?', a: 'Yes. AWS Middle East (Bahrain/UAE), Azure UAE North/Central and UAE-based private cloud partners provide in-country residency options.' },
      { q: 'Will cloud really be cheaper?', a: 'For variable or modernised workloads, usually yes. For lift-and-shift of steady-state workloads, not always. We build a transparent business case before recommending.' },
    ],
    subpages: {
      'migration': {
        keyword: 'Cloud Migration UAE',
        title: 'Cloud Migration UAE — AWS, Azure, GCP | IP Care Technologies',
        metaDescription: 'Cloud migration services in UAE across AWS, Azure and GCP. Assessment, landing zone, wave-based migration and modernisation by certified architects.',
        h1: 'Cloud Migration Services',
        hero: 'Migrate to AWS, Azure or GCP — safely, cost-effectively, with zero drama.',
        overview: [
          'Cloud migration done well unlocks speed, resilience and innovation. Done badly, it burns cash and breaks trust.',
          'IP Care uses a proven 6R framework (Rehost, Replatform, Refactor, Repurchase, Retire, Retain) with wave-based delivery and full rollback plans at every cutover.',
          'Our architects hold AWS Solutions Architect Professional, Azure Solutions Architect Expert and Google Professional Cloud Architect certifications.',
        ],
      },
      'microsoft-365': {
        keyword: 'Microsoft 365 UAE',
        title: 'Microsoft 365 UAE — M365 Migration & Managed Services | IP Care Technologies',
        metaDescription: 'Microsoft 365 services in UAE. Tenant design, Exchange/SharePoint/Teams migration, security hardening and managed support from M365 experts.',
        h1: 'Microsoft 365 Services',
        hero: 'Modern workplace on Microsoft 365 — secure, adopted and optimised.',
        overview: [
          'Microsoft 365 is more than email. Done right, it transforms how your people collaborate, automate and protect data.',
          'IP Care designs M365 tenants, migrates mailboxes and files from on-prem or other platforms, and hardens the environment with Conditional Access, MFA, DLP and Defender.',
          'We also drive user adoption — because unused licences are just expensive shelfware.',
        ],
      },
      'backup-recovery': {
        keyword: 'Data Backup Recovery UAE',
        title: 'Data Backup & Recovery UAE — Veeam, Acronis | IP Care Technologies',
        metaDescription: 'Enterprise data backup and disaster recovery in UAE with Veeam, Acronis and cloud DRaaS. Immutable backups and ransomware protection.',
        h1: 'Data Backup & Recovery',
        hero: 'Ransomware-proof backups and tested DR — because restore is a feature.',
        overview: [
          'Backups only matter when you restore. IP Care designs and runs backup and DR platforms that are tested, immutable and ransomware-resistant.',
          'We are certified partners with Veeam (VMCE), Acronis, Commvault and Rubrik, and offer UAE-hosted DRaaS.',
          'Services include 3-2-1-1-0 backup strategies, immutable object storage, air-gapped tape vaulting and quarterly DR drills.',
        ],
      },
    },
  },

  'cybersecurity': {
    name: 'Cybersecurity Services',
    icon: 'Lock',
    short: 'SOC, Zero Trust, compliance, endpoint, PAM',
    keyword: 'Cybersecurity Services UAE',
    title: 'Cybersecurity Services UAE — SOC, Zero Trust, Compliance | IP Care Technologies',
    metaDescription: 'Enterprise cybersecurity services in UAE. SOC, Zero Trust, ISO 27001 and NESA compliance, endpoint protection, PAM and email security.',
    h1: 'Cybersecurity Services in UAE',
    hero: 'Enterprise cybersecurity engineered for the threats of 2026 — and the regulations of the UAE.',
    overview: [
      'Cybersecurity is the foundation of digital trust. IP Care, powered by The Cyber Adviser, has delivered security outcomes for 50+ enterprise clients protecting 100M+ users.',
      'Our practice spans strategy, architecture, engineering and operations — with 24×7 SOC capability and deep vendor expertise (Palo Alto, Check Point, Fortinet, Zscaler, CrowdStrike).',
      'Every engagement is aligned to the UAE threat landscape and regulatory environment — NESA, UAE PDPL, CBUAE, DESC and ADHICS.',
    ],
    features: [
      { icon: 'ShieldAlert', title: 'Security Assessment', desc: 'Red team, pen test, vulnerability, architecture and compliance assessments.' },
      { icon: 'AlertOctagon', title: 'Incident Response', desc: 'IR retainer, digital forensics, ransomware recovery, threat hunting.' },
      { icon: 'BookCheck', title: 'Compliance', desc: 'ISO 27001, NESA, UAE PDPL, SOC 2, PCI DSS readiness and audit support.' },
    ],
    benefits: [
      { icon: 'ShieldCheck', t: 'Reduced breach risk', d: 'Defence-in-depth aligned to MITRE ATT&CK and NIST CSF.' },
      { icon: 'FileCheck', t: 'Audit-ready', d: 'Evidence-based compliance with continuous control monitoring.' },
      { icon: 'Clock', t: 'Faster detection', d: '24×7 SOC with MTTR under 15 minutes for Priority 1 events.' },
      { icon: 'Users', t: 'Human-led', d: 'Certified practitioners (CISSP, OSCP, GIAC) not just tooling.' },
    ],
    process: [
      { n: '01', t: 'Assess', d: 'Threat model, gap analysis, risk register.' },
      { n: '02', t: 'Design', d: 'Control framework, architecture, policies.' },
      { n: '03', t: 'Implement', d: 'Tooling, integration, tuning, playbooks.' },
      { n: '04', t: 'Operate', d: '24×7 SOC, IR retainer, continuous improvement.' },
    ],
    industries: ['Banking', 'Government', 'Energy', 'Healthcare', 'Critical Infrastructure', 'Telecom'],
    faqs: [
      { q: 'Are you certified to audit against NESA / UAE PDPL?', a: 'Yes — our practice holds certifications and has completed 50+ NESA-aligned engagements for UAE critical infrastructure and government entities.' },
      { q: 'Do you operate a 24×7 SOC?', a: 'Yes. Our SOC operates 24×7 with tier-1 to tier-3 analysts, SIEM (QRadar, Sentinel, Splunk) and SOAR for automated response.' },
      { q: 'Can you help after a breach?', a: 'Yes. Our Incident Response team is on retainer for many UAE enterprises and can be engaged within 1 hour for active incidents.' },
    ],
    subpages: {
      'security-assessment': {
        keyword: 'Security Assessment UAE',
        title: 'Security Assessment UAE — Penetration Testing | IP Care Technologies',
        metaDescription: 'Enterprise security assessments in UAE. Penetration testing, vulnerability assessment, red team exercises and security architecture review.',
        h1: 'Security Assessment Services',
        hero: 'Find your weaknesses before attackers do — rigorous, actionable assessments.',
        overview: [
          'You cannot secure what you cannot see. IP Care security assessments give UAE enterprises an honest, actionable view of their cyber posture.',
          'Our OSCP and GIAC-certified offensive team runs external and internal penetration tests, web and mobile application assessments, cloud configuration reviews and full-scope red team exercises.',
          'Every report includes executive summary, technical findings, CVSS scores, prioritised remediation and retest.',
        ],
      },
      'incident-response': {
        keyword: 'Incident Response UAE',
        title: 'Incident Response UAE — 24/7 Cyber IR | IP Care Technologies',
        metaDescription: 'Cyber incident response in UAE. 24/7 IR retainer, ransomware recovery, digital forensics and threat hunting from certified IR practitioners.',
        h1: 'Incident Response Services',
        hero: 'When minutes matter — 24×7 cyber incident response across the UAE.',
        overview: [
          'Every organisation will face a cyber incident. What matters is how quickly and capably you respond.',
          'IP Care offers Incident Response retainers with 1-hour guaranteed engagement, digital forensics, ransomware containment and full post-incident review.',
          'Our IR practitioners hold GCFA, GCIH and GNFA certifications and have led response on nation-state-grade incidents.',
        ],
      },
      'compliance': {
        keyword: 'Cybersecurity Compliance UAE',
        title: 'Cybersecurity Compliance UAE — ISO 27001, NESA, UAE PDPL | IP Care Technologies',
        metaDescription: 'Cybersecurity compliance in UAE. ISO 27001, NESA IAS, UAE PDPL, SOC 2 and PCI DSS readiness, implementation and audit support.',
        h1: 'Cybersecurity Compliance',
        hero: 'Turn compliance from cost centre to competitive advantage.',
        overview: [
          'Regulatory compliance is table stakes in the UAE. IP Care helps organisations achieve and maintain certification against ISO 27001, NESA IAS, UAE PDPL, SOC 2, PCI DSS and sector-specific frameworks (CBUAE, ADHICS, DESC).',
          'Our approach moves beyond check-box compliance. We design control frameworks that reduce real risk while passing audits comfortably.',
          'Typical engagements run 4–9 months from gap analysis to certification, with ongoing managed-compliance options post go-live.',
        ],
      },
      'endpoint-protection': {
        keyword: 'Endpoint Protection UAE',
        title: 'Endpoint Protection UAE — CrowdStrike, Defender | IP Care Technologies',
        metaDescription: 'Enterprise endpoint protection in UAE. EDR/XDR with CrowdStrike Falcon, Microsoft Defender, SentinelOne. Managed detection and response included.',
        h1: 'Endpoint Protection Services',
        hero: 'Next-gen EDR and XDR — stop ransomware at the endpoint.',
        overview: [
          'Endpoints are still the #1 attack vector. IP Care deploys and manages next-gen endpoint protection built on CrowdStrike Falcon, Microsoft Defender for Endpoint and SentinelOne.',
          'Our managed-EDR service includes 24×7 SOC monitoring, threat hunting, automated containment and monthly tuning for your environment.',
          'We go beyond AV — delivering XDR that correlates endpoint, identity, email and cloud signals for higher-fidelity detection.',
        ],
      },
      'pam': {
        keyword: 'Privileged Access Management UAE',
        title: 'Privileged Access Management (PAM) UAE — CyberArk, BeyondTrust | IP Care Technologies',
        metaDescription: 'Privileged access management in UAE. CyberArk and BeyondTrust implementation, vaulting, session recording and JIT access for enterprise.',
        h1: 'Privileged Access Management',
        hero: 'Control privileged access — the #1 predictor of breach severity.',
        overview: [
          'Privileged credentials are the keys to the kingdom. IP Care is a certified implementation partner for CyberArk and BeyondTrust across UAE enterprise and government.',
          'We deliver complete PAM programmes — vaulting, session isolation, session recording, just-in-time elevation and DevOps secrets management.',
          'Outcomes include audit-ready privileged access, reduced lateral movement risk and alignment to NESA and ISO 27001 controls.',
        ],
      },
      'email-security': {
        keyword: 'Email Security UAE',
        title: 'Email Security UAE — Anti-Phishing, DLP | IP Care Technologies',
        metaDescription: 'Enterprise email security in UAE. Anti-phishing, BEC protection, DLP and encryption with Proofpoint, Mimecast and Microsoft Defender for Office 365.',
        h1: 'Email Security Services',
        hero: 'Stop phishing, BEC and data loss — at the email gateway.',
        overview: [
          'Email remains the #1 delivery mechanism for cyberattacks. IP Care deploys enterprise email security with Proofpoint, Mimecast and Microsoft Defender for Office 365.',
          'Services cover anti-phishing, anti-malware, business email compromise (BEC) protection, data loss prevention (DLP) and email encryption.',
          'We also run phishing simulation and security awareness training programmes to build the human firewall.',
        ],
      },
      'microsoft-entra-id': {
        keyword: 'Microsoft Entra ID UAE',
        title: 'Microsoft Entra ID Services UAE — Azure AD Identity & Access | IP Care Technologies',
        metaDescription: 'Microsoft Entra ID (Azure AD) services in UAE. SSO, MFA, Conditional Access, PIM, identity governance and hybrid identity for enterprise security.',
        h1: 'Microsoft Entra ID Services',
        hero: 'Secure every identity, everywhere — with Microsoft Entra ID.',
        overview: [
          'Identity is the new perimeter. Microsoft Entra ID (formerly Azure Active Directory) is the foundation for Zero Trust security across your enterprise.',
          'IP Care is a Microsoft Solutions Partner with deep Entra ID expertise — from basic SSO and MFA to advanced Conditional Access, Privileged Identity Management (PIM) and Identity Governance.',
          'We deliver end-to-end Entra ID implementations including hybrid identity (sync with on-premise AD), B2B/B2C for external users, and integration with M365, Azure and third-party SaaS apps.',
        ],
        features: [
          { icon: 'KeyRound', title: 'Single Sign-On (SSO)', desc: 'One identity across all apps — Microsoft 365, Azure, Salesforce, Workday and 3,000+ pre-integrated SaaS.' },
          { icon: 'ShieldCheck', title: 'MFA & Conditional Access', desc: 'Risk-based authentication and device/location/app policies to enforce Zero Trust.' },
          { icon: 'UserCog', title: 'Identity Governance', desc: 'Access reviews, entitlement management, lifecycle workflows and automated joiner/mover/leaver.' },
          { icon: 'Crown', title: 'Privileged Identity Management', desc: 'Just-in-time privileged access with approval workflows and time-limited elevation.' },
          { icon: 'Shield', title: 'Identity Protection', desc: 'AI-driven risk detection for compromised identities and automated remediation.' },
          { icon: 'Network', title: 'Hybrid Identity', desc: 'Sync on-premise Active Directory to Entra ID with Azure AD Connect for seamless hybrid operations.' },
        ],
        benefits: [
          { icon: 'ShieldCheck', t: 'Zero Trust ready', d: 'Verify explicitly, use least-privilege access and assume breach with identity-first security.' },
          { icon: 'Zap', t: 'Faster onboarding', d: 'Automated provisioning and lifecycle workflows cut IT manual work by 70%.' },
          { icon: 'FileCheck', t: 'Compliance-aligned', d: 'Meet UAE PDPL, NESA, ISO 27001 and GDPR identity requirements.' },
          { icon: 'Users', t: 'Better user experience', d: 'Single sign-on and passwordless authentication eliminate friction.' },
        ],
        process: [
          { n: '01', t: 'Assess', d: 'Current identity posture, directory structure, app inventory and user segmentation.' },
          { n: '02', t: 'Design', d: 'Entra ID tenant architecture, Conditional Access policies, PIM roles and governance workflows.' },
          { n: '03', t: 'Deploy', d: 'Hybrid sync, app SSO integration, MFA rollout and policy enforcement.' },
          { n: '04', t: 'Operate', d: 'Ongoing identity governance, access reviews, security monitoring and user support.' },
        ],
        faqs: [
          { q: 'What is the difference between Azure AD and Microsoft Entra ID?', a: 'They are the same product — Microsoft rebranded Azure Active Directory to Microsoft Entra ID in 2023 as part of the broader Entra security family.' },
          { q: 'Can Entra ID work with our on-premise Active Directory?', a: 'Yes. Azure AD Connect syncs your on-prem AD to Entra ID for seamless hybrid identity across cloud and on-prem applications.' },
          { q: 'Do we need Entra ID P1 or P2 licensing?', a: 'P1 includes Conditional Access, MFA and group-based access. P2 adds Privileged Identity Management, Identity Protection and access reviews. We help right-size based on your security and compliance needs.' },
          { q: 'Is Entra ID compliant with UAE data protection laws?', a: 'Yes. Microsoft Entra ID supports UAE data residency through Azure UAE North and UAE Central regions, and is aligned with UAE PDPL and NESA identity security requirements.' },
        ],
      },
      'nesa-compliance': {
        keyword: 'NESA Compliance Services UAE',
        title: 'NESA Compliance Services UAE — IAS Audit & Remediation | IP Care Technologies',
        metaDescription: 'End-to-end NESA compliance for UAE critical-sector businesses. Gap assessment, IAS audit preparation, remediation and ongoing controls. 20+ years in UAE security.',
        h1: 'NESA Compliance Services in the UAE',
        hero: 'Gap assessment, audit preparation and remediation for the UAE National Electronic Security Authority Information Assurance Standards — delivered by people who have done this before.',
        icon: 'ShieldCheck',
        overview: [
          'NESA is not optional. If you operate in a critical sector in the UAE — energy, government, banking, telecom, transport or healthcare — the National Electronic Security Authority framework applies to you, whether you have started the work or not.',
          'Most of the calls we get start the same way: an audit notice landed, and the internal team has 90 days to close gaps that took three years to open. We can help. But the version of this story where you are not panicking starts twelve months earlier.',
          'IP Care delivers end-to-end NESA programmes — gap assessment, remediation roadmaps, control implementation, IAS audit preparation and ongoing controls operation. Twenty years of UAE security experience across financial services, government and critical infrastructure.',
        ],
        features: [
          { icon: 'ClipboardCheck', title: 'NESA Gap Assessment', desc: 'Full IAS controls audit against your current state. Honest scoring, prioritised remediation list.' },
          { icon: 'Map', title: 'Remediation Roadmap', desc: 'Phased plan with owners, timelines and cost estimates — sequenced so quick wins fund the long-haul work.' },
          { icon: 'ShieldCheck', title: 'Control Implementation', desc: 'Identity, network, endpoint, vulnerability management, SIEM and DLP — built to the IAS requirements.' },
          { icon: 'FileCheck', title: 'IAS Audit Preparation', desc: 'Evidence packs, control narratives and mock audits so the real one is the easy one.' },
          { icon: 'Activity', title: 'Ongoing Controls Operations', desc: 'Continuous monitoring, control testing, exception management and quarterly attestation reports.' },
          { icon: 'Users', title: 'Board & Regulator Reporting', desc: 'Executive-ready dashboards and audit-ready evidence — translated for technical and non-technical audiences.' },
        ],
        benefits: [
          { icon: 'ShieldCheck', t: 'Audit-ready posture', d: 'Move from reactive scrambling to a defendable, evidenced control environment.' },
          { icon: 'TrendingDown', t: 'Lower risk of regulatory action', d: 'Demonstrated compliance reduces the cost of a non-compliance finding to near zero.' },
          { icon: 'Layers', t: 'Coverage of overlapping frameworks', d: 'NESA work also moves you forward on ISO 27001, NIST CSF and UAE Data Protection Law.' },
          { icon: 'Clock', t: 'Predictable programme timeline', d: 'Typical 6–9 month programme for a mid-size enterprise, fully sequenced against your audit window.' },
        ],
        process: [
          { n: '01', t: 'Assess', d: 'Map current controls to NESA IAS. Identify gaps by domain and severity.' },
          { n: '02', t: 'Plan', d: 'Build a costed, sequenced remediation roadmap with owners and milestones.' },
          { n: '03', t: 'Remediate', d: 'Implement controls — technical, procedural and governance — with our team or yours.' },
          { n: '04', t: 'Operate & Attest', d: 'Continuous controls operation, evidence collection and audit support through certification.' },
        ],
        industries: ['Energy & Utilities', 'Government', 'Banking & Finance', 'Telecommunications', 'Transport & Logistics', 'Healthcare'],
        faqs: [
          { q: 'Who has to comply with NESA?', a: 'Organisations operating in UAE critical sectors — energy, government, banking and financial services, telecommunications, transport, healthcare and emergency services. If you fall in one of those and have not formally engaged with NESA, you are likely already in scope.' },
          { q: 'How long does a NESA compliance programme take?', a: 'For a mid-size enterprise starting from a baseline of "we have some controls but no formal NESA mapping", expect 6–9 months. For an organisation with mature controls already aligned to ISO 27001 or NIST CSF, 3–5 months is achievable.' },
          { q: 'What is the IAS audit and how do you prepare for it?', a: 'The Information Assurance Standards audit is the formal NESA assessment of your controls. We prepare clients by running internal mock audits using the same evidence checklist NESA auditors use, closing gaps before the real auditor arrives.' },
          { q: 'How does NESA overlap with ISO 27001 and UAE PDPL?', a: 'Significantly. About 60–70% of ISO 27001 controls map directly to NESA IAS requirements. UAE PDPL covers personal data handling, which overlaps with several NESA data classification and access control requirements. We work all three in parallel where it makes sense.' },
          { q: 'What is the most common gap you find in first assessments?', a: 'Three: incomplete asset and vendor inventories, untested business continuity plans, and weak privileged access controls. All three are slow to fix and disproportionately costly to leave broken. Expect to spend time here.' },
          { q: 'Can you operate the controls for us after implementation?', a: 'Yes. Most clients move into a managed compliance retainer once the initial programme finishes — continuous monitoring, quarterly control testing, evidence collection and audit support through their NESA attestation cycle.' },
        ],
      },
    },
  },

  'email-solutions': {
    name: 'Email Solutions',
    icon: 'AtSign',
    short: 'Workspace, M365, hosting, hybrid',
    keyword: 'Business Email Solutions UAE',
    title: 'Business Email Solutions UAE — Google Workspace, M365 | IP Care Technologies',
    metaDescription: 'Business email solutions in UAE. Google Workspace, Microsoft 365, professional email hosting and hybrid email deployments with migration and support.',
    h1: 'Business Email Solutions in UAE',
    hero: 'Reliable, secure, professional business email — built on the platform that fits you best.',
    overview: [
      'Email is still the operating system of business. IP Care is a certified partner for Google Workspace and Microsoft 365, and operates a UAE-hosted professional email platform for cost-sensitive workloads.',
      'We offer design, migration, security hardening and ongoing managed services for every major business email platform.',
      'Hybrid deployments let enterprises get the best of both worlds — for example, Exchange on-prem for power users and M365 for the broader base.',
    ],
    features: [
      { icon: 'Mail', title: 'Google Workspace', desc: 'Gmail, Drive, Meet, Calendar deployed with Arabic and UAE compliance.' },
      { icon: 'AtSign', title: 'Microsoft 365', desc: 'Exchange Online, Teams, SharePoint, OneDrive with security hardening.' },
      { icon: 'Server', title: 'Hosted Email & Hybrid', desc: 'UAE-hosted email on POP/IMAP with optional hybrid Exchange.' },
    ],
    benefits: [
      { icon: 'Clock', t: 'Zero-downtime migration', d: 'Coexistence strategies keep users productive during cutover.' },
      { icon: 'ShieldCheck', t: 'Enterprise security', d: 'MFA, Conditional Access, DLP, anti-phishing and encryption.' },
      { icon: 'Globe', t: 'Bilingual support', d: 'Arabic and English admin and end-user support.' },
      { icon: 'Wallet', t: 'Commercial optimisation', d: 'Right-size licensing across user tiers and use-cases.' },
    ],
    process: [
      { n: '01', t: 'Assess', d: 'User segmentation, mailbox sizing, licence review.' },
      { n: '02', t: 'Design', d: 'Target platform, migration method, coexistence plan.' },
      { n: '03', t: 'Migrate', d: 'Batched migration with testing and cutover comms.' },
      { n: '04', t: 'Support', d: 'Managed email with 24×7 support and security monitoring.' },
    ],
    industries: ['SME', 'Professional Services', 'Education', 'Healthcare', 'Government', 'Retail'],
    faqs: [
      { q: 'Google Workspace or Microsoft 365 — which should we pick?', a: 'Both are excellent. Microsoft 365 dominates enterprise and regulated sectors; Google Workspace excels in collaborative, cloud-native organisations. We help pick based on your workflows and commercials.' },
      { q: 'Can you migrate from our existing email?', a: 'Yes — from any platform: legacy Exchange, cPanel/POP3, Zimbra, IBM Domino, Rediffmail, other tenants, etc.' },
      { q: 'Do you support hybrid (on-prem + cloud)?', a: 'Yes. We design and operate hybrid Exchange topologies and split-tenant Workspace configurations where required.' },
    ],
    subpages: {
      'google-workspace': {
        keyword: 'Google Workspace UAE',
        title: 'Google Workspace UAE — Gmail, Drive, Meet Partner | IP Care Technologies',
        metaDescription: 'Google Workspace partner in UAE. Deployment, migration, security and managed services for Gmail, Drive, Meet and Calendar.',
        h1: 'Google Workspace Services',
        hero: 'Google Workspace deployed right — licences, migration, security, adoption.',
        overview: [
          'Google Workspace is a phenomenal collaboration platform when configured and adopted properly.',
          'IP Care is an authorised Google Workspace partner in UAE delivering tenant design, migration from legacy platforms, security hardening (2SV, Context-Aware Access, DLP) and user training.',
          'Ongoing managed services include licence right-sizing, admin support and security monitoring.',
        ],
      },
      'microsoft-365': {
        keyword: 'Microsoft 365 Business UAE',
        title: 'Microsoft 365 Business UAE — M365 Deployment Partner | IP Care Technologies',
        metaDescription: 'Microsoft 365 partner in UAE for business email. Exchange Online, Teams, SharePoint and Defender deployment, migration and managed support.',
        h1: 'Microsoft 365 for Business',
        hero: 'Microsoft 365 — the complete productivity, collaboration and security platform.',
        overview: [
          'Microsoft 365 combines best-in-class email (Exchange Online), collaboration (Teams, SharePoint, OneDrive) and security (Defender, Purview, Entra) in one licence.',
          'IP Care designs and migrates M365 tenants for UAE clients of all sizes, with Conditional Access and MFA baked in from day one.',
          'Our managed-M365 service includes 24×7 support, security operations and adoption programmes.',
        ],
      },
      'email-hosting': {
        keyword: 'Professional Email Hosting UAE',
        title: 'Professional Email Hosting UAE — Business Email Server | IP Care Technologies',
        metaDescription: 'Professional business email hosting in UAE. Reliable POP3/IMAP/SMTP with custom domains, spam filtering and UAE data residency.',
        h1: 'Professional Email Hosting',
        hero: 'Reliable, affordable professional email hosted in the UAE.',
        overview: [
          'Not every business needs Microsoft 365. For lean teams and field workers, professional email hosting delivers a robust business email experience at a fraction of the cost.',
          'IP Care operates UAE-hosted professional email with custom domains, POP3/IMAP/SMTP, anti-spam and anti-malware protection and webmail access.',
          'Easy upgrade path to Microsoft 365 or Google Workspace when you are ready.',
        ],
      },
      'hybrid': {
        keyword: 'Hybrid Email UAE',
        title: 'Hybrid Email Solutions UAE — Exchange Hybrid | IP Care Technologies',
        metaDescription: 'Hybrid email deployments in UAE. Exchange hybrid with Microsoft 365, split-domain and coexistence strategies for complex enterprise needs.',
        h1: 'Hybrid Email Solutions',
        hero: 'Best of both worlds — cloud agility with on-prem control.',
        overview: [
          'Many enterprises have valid reasons to keep some mailboxes on-prem — sovereignty, integration, legacy systems — while moving others to cloud.',
          'IP Care designs and operates hybrid Exchange topologies with seamless coexistence, shared namespaces and unified GAL.',
          'Typical patterns include on-prem for executives and regulated teams with M365 for the broader workforce.',
        ],
      },
    },
  },
}

// Helpers
export const getAllCategorySlugs = () => Object.keys(serviceCategories)

export const getAllSubpageParams = () => {
  const out = []
  for (const [catSlug, cat] of Object.entries(serviceCategories)) {
    for (const subSlug of Object.keys(cat.subpages || {})) {
      out.push({ category: catSlug, slug: subSlug })
    }
  }
  return out
}

export const getCategory = (slug) => serviceCategories[slug]

export const getSubpage = (catSlug, subSlug) => {
  const cat = serviceCategories[catSlug]
  if (!cat) return null
  const sub = cat.subpages?.[subSlug]
  if (!sub) return null
  return {
    ...cat,
    ...sub,
    parentName: cat.name,
    parentSlug: catSlug,
    // If sub doesn't override these, inherit from category
    benefits: sub.benefits || cat.benefits,
    process: sub.process || cat.process,
    industries: sub.industries || cat.industries,
    features: sub.features || cat.features,
    faqs: sub.faqs || cat.faqs,
  }
}

export const getRelatedServices = (currentCat, count = 3) => {
  const others = Object.entries(serviceCategories).filter(([s]) => s !== currentCat)
  return others.slice(0, count).map(([slug, c]) => ({ slug, name: c.name, short: c.short, icon: c.icon }))
}
