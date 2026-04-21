// Event IT Infrastructure data — events, services, case studies and sub-pages.

export const events = [
  {
    slug: 'fifa-club-world-cup',
    name: 'FIFA Club World Cup',
    year: '2022',
    location: 'Abu Dhabi, UAE',
    region: 'UAE Events',
    tech: 'Temporary data centre, 400+ WiFi APs, 50 Gbps edge uplink, broadcast LAN',
    stats: { users: '50K+ attendees', sites: '6 venues', duration: '10 days' },
    img: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1200&q=85',
  },
  {
    slug: 'ufc-fight-night',
    name: 'UFC Fight Night',
    year: '2023',
    location: 'Yas Island, UAE',
    region: 'UAE Events',
    tech: 'High-density arena WiFi, production LAN, 4K broadcast uplinks, live IPTV',
    stats: { users: '18K spectators', sites: 'Etihad Arena', duration: '3 days' },
    img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=1200&q=85',
  },
  {
    slug: 'nba-global-games',
    name: 'NBA Global Games',
    year: '2024',
    location: 'Toronto, Canada',
    region: 'Global Events',
    tech: 'Arena WiFi 6E refresh, vendor integrations, NOC operations, digital signage',
    stats: { users: '20K fans/night', sites: 'Scotiabank Arena', duration: '5 days' },
    img: 'https://images.unsplash.com/photo-1563841930606-67e2bce48b78?w=1200&q=85',
  },
  {
    slug: 'coldplay-world-tour',
    name: 'Coldplay World Tour',
    year: '2024',
    location: 'Abu Dhabi, UAE',
    region: 'Global Events',
    tech: 'Outdoor 60K-attendee WiFi, PtP microwave uplinks, CCTV, RFID wristband backhaul',
    stats: { users: '60K concurrent', sites: 'Zayed Sports City', duration: '3 nights' },
    img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&q=85',
  },
  {
    slug: 'corporate-summit',
    name: 'Global Corporate Summit',
    year: '2024',
    location: 'Dubai, UAE',
    region: 'UAE Events',
    tech: 'Secure executive WiFi, translation network, press centre LAN, live streaming',
    stats: { users: '2.5K executives', sites: 'Madinat Jumeirah', duration: '4 days' },
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=85',
  },
  {
    slug: 'product-launch',
    name: 'Enterprise Product Launch',
    year: '2025',
    location: 'Toronto, Canada',
    region: 'Global Events',
    tech: 'Hybrid event network, 8K streaming uplinks, AR/VR zones, press WiFi',
    stats: { users: '3K in-person + 40K online', sites: 'Evergreen Brick Works', duration: '2 days' },
    img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=85',
  },
]

export const eventServices = [
  {
    slug: 'event-wifi',
    name: 'High-Density Event WiFi',
    icon: 'Wifi',
    short: 'WiFi 6 / 6E / 7 engineered for 1,000+ concurrent users per AP cluster. RF planning, heat-mapping and on-site tuning.',
  },
  {
    slug: 'temporary-data-centres',
    name: 'Temporary Data Centres',
    icon: 'Server',
    short: 'Full NOC-grade compute, storage and networking deployed to site in portable racks with redundant power and cooling.',
  },
  {
    slug: 'event-cctv',
    name: 'Event CCTV & Security',
    icon: 'Video',
    short: 'IP CCTV, crowd analytics and ANPR integrated with live monitoring and event command centres.',
  },
  {
    slug: 'structured-cabling',
    name: 'Structured Cabling — Rapid Deployment',
    icon: 'Cable',
    short: 'Cat6A and fibre pulled, terminated and certified to TIA standards within 72-hour event build timelines.',
  },
  {
    slug: 'ptp-wireless',
    name: 'Point-to-Point Wireless Links',
    icon: 'Radio',
    short: 'Gigabit PtP microwave and mmWave links between event zones, broadcast compounds and uplink providers.',
  },
  {
    slug: 'noc',
    name: 'Network Operations Centre',
    icon: 'MonitorCheck',
    short: 'On-site or remote 24/7 NOC with dedicated engineers, SLA dashboards and event-day incident runbooks.',
  },
]

export const partners = [
  { name: 'HPE Aruba', sub: 'WiFi 6 / 7 & Switching', color: '#00A796' },
  { name: 'Cisco Meraki', sub: 'Cloud-Managed Fabric', color: '#1BA0D7' },
  { name: 'Ruckus', sub: 'High-Density Wireless', color: '#E31937' },
  { name: 'Ubiquiti', sub: 'Rapid-Deploy Networks', color: '#0559C9' },
  { name: 'Palo Alto Networks', sub: 'Perimeter & SASE', color: '#FA582D' },
  { name: 'Fortinet', sub: 'Edge Security', color: '#EE3124' },
]

export const capabilityStats = [
  { n: '50+', l: 'Events Delivered' },
  { n: '100K+', l: 'Concurrent Users' },
  { n: '48 hr', l: 'Setup Time' },
  { n: '99.9%', l: 'Event-Day Uptime' },
]

// Sub-pages (use ServicePageTemplate)
export const subpages = {
  'event-wifi': {
    keyword: 'High Density Event WiFi UAE',
    title: 'High Density Event WiFi UAE — WiFi 6/7 for Stadiums & Venues | IP Care',
    metaDescription: 'High density event WiFi in UAE. WiFi 6/7 engineered for stadiums, concerts and conferences. 1000+ concurrent users per AP cluster. Rapid deploy.',
    h1: 'High Density Event WiFi in UAE',
    hero: 'WiFi that survives kickoff, the encore and the after-party — engineered for 1,000+ concurrent users per AP cluster.',
    icon: 'Wifi',
    overview: [
      'Event WiFi is the hardest problem in wireless. Thousands of devices, unpredictable usage patterns, hostile RF environments and zero tolerance for failure during the show.',
      'IP Care has deployed high-density WiFi at 50+ major events including FIFA Club World Cup, UFC, NBA and Coldplay. Our approach combines RF site survey, heat-mapping and on-site tuning with enterprise-grade controllers from HPE Aruba, Cisco Meraki and Ruckus.',
      'Every deployment is designed for peak concurrency — typically 3-5× higher density than corporate deployments — with seamless roaming, band steering and dynamic channel optimisation.',
    ],
    features: [
      { icon: 'Wifi', title: 'WiFi 6 / 6E / 7', desc: 'Latest-generation APs with 6 GHz spectrum, OFDMA and MU-MIMO for thousands of simultaneous clients.' },
      { icon: 'Gauge', title: 'Predictive RF Design', desc: 'Ekahau and iBwave heat-mapping with actual crowd density simulations before site deployment.' },
      { icon: 'Activity', title: 'Real-Time Tuning', desc: 'On-site engineers with live RF monitoring — channel, power and load balancing adjusted in real time.' },
    ],
    benefits: [
      { icon: 'Users', t: 'Scales to 60K+ users', d: 'Proven at stadium and outdoor festival scale.' },
      { icon: 'Zap', t: 'Low-latency roaming', d: 'Seamless handoff for video, ticketing and cashless payment apps.' },
      { icon: 'ShieldCheck', t: 'Segmented networks', d: 'Separate VLANs for attendees, press, production and broadcast.' },
      { icon: 'Clock', t: '24–72 hour turn-up', d: 'From kit-on-truck to live network in under three days for typical venues.' },
    ],
    process: [
      { n: '01', t: 'RF Survey', d: 'Venue walkthrough, spectrum analysis, capacity modelling.' },
      { n: '02', t: 'Design', d: 'AP count, placement, backhaul, controller, SSID plan.' },
      { n: '03', t: 'Deploy', d: 'Install, cable, configure, heat-map validation.' },
      { n: '04', t: 'Operate', d: 'Live NOC during event, post-event teardown.' },
    ],
    industries: ['Stadiums', 'Concerts', 'Conferences', 'Sporting Events', 'Trade Shows', 'Corporate Summits'],
    faqs: [
      { q: 'How many APs do you typically deploy for a 20,000-seat arena?', a: 'Between 180 and 260 APs depending on venue geometry, expected device density and required throughput. We run predictive modelling to validate before procurement.' },
      { q: 'Can you deploy WiFi 7 today?', a: 'Yes. We have WiFi 7 access points from HPE Aruba and Cisco certified for UAE TDRA spectrum use. WiFi 7 is particularly valuable for outdoor 60K+ events.' },
      { q: 'Do you provide on-site engineers during the event?', a: 'Always. Every deployment includes a tiered on-site team — typically one senior wireless engineer plus supporting techs — with remote NOC backup.' },
    ],
  },
  'temporary-data-centres': {
    keyword: 'Temporary Data Centre UAE',
    title: 'Temporary Data Centre Rental UAE — Portable NOC for Events | IP Care',
    metaDescription: 'Temporary data centre rental in UAE. Portable NOC-grade compute, storage and networking deployed on-site with redundant power and cooling.',
    h1: 'Temporary Data Centre Rental in UAE',
    hero: 'A full NOC on site — delivered, deployed and operated for the length of your event.',
    icon: 'Server',
    overview: [
      'Some events demand more than WiFi. They need compute, storage and networking capacity on site — for broadcast production, ticketing, accreditation, security, analytics and back-office operations.',
      'IP Care delivers temporary data centres in portable racks: fully redundant power, cooling, firewalls, switches, servers and storage. Deployed in hours, operated 24/7, de-rigged cleanly at event end.',
      'Typical deployments power broadcast LANs, IPTV distribution, accreditation databases, CCTV storage, and private cloud workloads for event management platforms.',
    ],
    features: [
      { icon: 'Server', title: 'Portable Rack Systems', desc: 'Pre-wired, pre-tested rack footprints — 6U, 12U, 24U and 42U formats.' },
      { icon: 'Zap', title: 'Redundant Power & Cooling', desc: 'A+B UPS feeds, generator backup, portable in-row cooling.' },
      { icon: 'ShieldCheck', title: 'Event-Hardened Security', desc: 'Perimeter firewall, segmentation, DDoS scrubbing and real-time monitoring.' },
    ],
    benefits: [
      { icon: 'Clock', t: 'On-site in 24 hours', d: 'Pre-staged kits accelerate build versus field-assembling equipment.' },
      { icon: 'Activity', t: 'Zero single points of failure', d: 'Every tier — power, cooling, network — redundant.' },
      { icon: 'Wallet', t: 'No capex', d: 'Rental model matches cost to event duration.' },
      { icon: 'Gauge', t: 'Broadcast-grade', d: 'Tested with SMPTE 2022 / 2110 and standard production workflows.' },
    ],
    process: [
      { n: '01', t: 'Scope', d: 'Workload inventory, power/cooling needs, connectivity.' },
      { n: '02', t: 'Stage', d: 'Pre-build, test and snapshot racks in our warehouse.' },
      { n: '03', t: 'Deploy', d: 'On-site install, integration, commissioning.' },
      { n: '04', t: 'Operate & Derig', d: 'Event-day NOC, post-event teardown and logistics.' },
    ],
    industries: ['Broadcast', 'Sporting Events', 'Concerts', 'Government Events', 'Trade Shows', 'Exhibitions'],
    faqs: [
      { q: 'What are your typical rental durations?', a: 'Anywhere from 3 days to 6 months. Most event deployments run 7–21 days including setup and teardown.' },
      { q: 'Do you provide uplink connectivity?', a: 'Yes. We coordinate with local ISPs (du, etisalat, Bell, Rogers) and deploy redundant microwave PtP uplinks for critical services.' },
      { q: 'Can you support our existing cloud or vendor stack?', a: 'Absolutely. Our racks integrate with AWS Outposts, Azure Stack, VMware, Nutanix and most broadcast production stacks.' },
    ],
  },
  'event-cctv': {
    keyword: 'Event CCTV Security UAE',
    title: 'Event CCTV & Security UAE — Live Monitoring for Venues | IP Care',
    metaDescription: 'Event CCTV and live security monitoring in UAE. IP cameras, ANPR, crowd analytics and command-centre integration for stadiums and large venues.',
    h1: 'Event CCTV & Live Security Monitoring in UAE',
    hero: 'Eyes everywhere, intelligence at the core — live CCTV and crowd analytics for high-profile events.',
    icon: 'Video',
    overview: [
      'Large events demand security systems that do more than record. They need to detect anomalies in real time, coordinate with venue command, and integrate with police and civil defence protocols.',
      'IP Care deploys portable CCTV solutions with IP cameras, analytics and VMS integrated into a live command centre. Our systems include ANPR for vehicle access, facial recognition for watchlists, and crowd density/flow analytics.',
      'Compliant with SIRA (Dubai) and Abu Dhabi Police MCC requirements, with event-day coordination across security, operations and broadcast teams.',
    ],
    features: [
      { icon: 'Video', title: 'Portable IP CCTV', desc: '4K IP cameras with PTZ, bullet and dome form factors — rapid pole or rigged mount.' },
      { icon: 'Eye', title: 'Analytics-Ready', desc: 'Crowd density, flow direction, loitering, ANPR and watchlist face match.' },
      { icon: 'MonitorCheck', title: 'Live Command Centre', desc: 'Dedicated event VMS room with video-wall, ticketing and radio integration.' },
    ],
    benefits: [
      { icon: 'ShieldAlert', t: 'Real-time detection', d: 'Intrusion, crowd surge and unattended object alerts within seconds.' },
      { icon: 'Users', t: 'Multi-stakeholder ops', d: 'Simultaneous access for venue, police, event promoter, broadcaster.' },
      { icon: 'ClipboardCheck', t: 'Regulatory ready', d: 'SIRA / ADP MCC aligned with retention and export compliance.' },
      { icon: 'Activity', t: '24/7 monitoring', d: 'Dedicated analysts on shift during entire event window.' },
    ],
    process: [
      { n: '01', t: 'Risk Assessment', d: 'Venue walkthrough, crowd flow modelling, camera placement.' },
      { n: '02', t: 'Design', d: 'Camera plan, VMS, storage, command-centre layout.' },
      { n: '03', t: 'Deploy', d: 'Install, test, integrate with event security & broadcast.' },
      { n: '04', t: 'Operate', d: 'Live monitoring, incident logging, post-event handover.' },
    ],
    industries: ['Stadiums', 'Concerts', 'Political Summits', 'VIP Events', 'Racing Circuits', 'Exhibitions'],
    faqs: [
      { q: 'Do you provide on-site analysts during the event?', a: 'Yes — our command centre is staffed 24/7 during the event window by licensed CCTV operators with incident-handling training.' },
      { q: 'Can you integrate with venue or police CCTV?', a: 'Yes. We frequently integrate with existing VMS (Milestone, Genetec, Avigilon) and provide read-only or write access to police/MCC systems on request.' },
      { q: 'How long is CCTV footage retained post-event?', a: 'Standard retention is 30 days, extendable to 90+ days on request. All footage is exported on encrypted drives and handed to the client at event close.' },
    ],
  },
}

export const getAllEventSubSlugs = () => Object.keys(subpages)
export const getEventSubpage = (slug) => subpages[slug] || null
