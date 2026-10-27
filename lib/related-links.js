// Hand-picked contextual links for blog and knowledge-base articles. Search Console had
// ~40 of these pages as "Crawled - currently not indexed" (2026-10-27) with a median of 1-4
// internal links each, so each entry points an article at the product, service or sibling
// article it is actually about. Every href must be a live route (checked against the sitemap).
const L = (href, label) => ({ href, label })

export const BLOG_LINKS = {
  'event-wifi-pricing-reality': [
    L('/rental/event-wifi', 'Event WiFi access point rental'),
    L('/event-it/event-wifi', 'Event WiFi: how we deliver it'),
    L('/rental/event-wifi/aruba-ap-635-wifi6e', 'Aruba AP-635 WiFi 6E rental'),
  ],
  'laptop-rental-vs-buy': [
    L('/rental/laptops-desktops', 'Laptop and desktop rental'),
    L('/rental/macbooks', 'MacBook and iMac rental'),
    L('/rental/laptops-desktops/dell-latitude-5450', 'Dell Latitude 5450 rental'),
  ],
  'malaffi-integration-playbook': [
    L('/industries/healthcare', 'IT for healthcare providers'),
    L('/services/cybersecurity/compliance', 'Cybersecurity compliance services'),
    L('/services/managed-it', 'Managed IT services'),
  ],
  'ipcare-nba-toronto': [
    L('/event-it/nba-abu-dhabi-games', 'NBA Abu Dhabi Games: event IT delivery'),
    L('/event-it/portfolio', 'Event IT portfolio'),
  ],
  'xsiam-vs-legacy-siem': [
    L('/cybersecurity-advisory/security-automation', 'Security automation advisory'),
    L('/cybersecurity-advisory/knowledge-base/palo-alto-xsiam-automation-playbooks', 'XSIAM automation playbooks'),
    L('/cybersecurity-advisory/knowledge-base/reducing-mttr-with-soar', 'Reducing MTTR with SOAR'),
  ],
  'inside-a-nesa-audit': [
    L('/services/cybersecurity/nesa-compliance', 'NESA compliance services'),
    L('/blog/nesa-compliance-90-days', 'NESA compliance in 90 days'),
    L('/services/cybersecurity/compliance', 'Cybersecurity compliance services'),
  ],
  'nesa-compliance-90-days': [
    L('/services/cybersecurity/nesa-compliance', 'NESA compliance services'),
    L('/blog/inside-a-nesa-audit', 'What happens inside a NESA audit'),
  ],
  'ipad-kiosk-deployment-playbook': [
    L('/rental/tablets-ipads', 'iPad and tablet rental'),
    L('/rental/tablets-ipads/ipad-10th-gen', 'iPad 10th generation rental'),
    L('/rental/tablets-ipads/ipad-pro-13-m4', 'iPad Pro 13" M4 rental'),
  ],
  'choosing-managed-it-provider-uae': [
    L('/services/managed-it', 'Managed IT services'),
    L('/services/managed-it/sla', 'Managed IT SLAs'),
    L('/services/managed-it/abu-dhabi', 'Managed IT in Abu Dhabi'),
  ],
  'wifi-7-real-world': [
    L('/rental/event-wifi/ruckus-r770-wifi7', 'Ruckus R770 WiFi 7 rental'),
    L('/rental/event-wifi', 'Event WiFi access point rental'),
    L('/services/managed-it/network-management', 'Network management services'),
  ],
  'cb-ibr-cloud-azure-uae-north': [
    L('/industries/banking', 'IT for banking and finance'),
    L('/services/cloud/migration', 'Cloud migration services'),
    L('/services/cloud/abu-dhabi', 'Cloud services in Abu Dhabi'),
  ],
  'finops-azure-cut-spend': [
    L('/services/cloud', 'Cloud services'),
    L('/services/cloud/migration', 'Cloud migration services'),
    L('/services/it-consulting/technology-strategy', 'Technology strategy consulting'),
  ],
  'elv-converged-security': [
    L('/services/elv', 'ELV and security systems'),
    L('/services/elv/cctv-systems', 'CCTV systems'),
    L('/services/elv/access-control', 'Access control systems'),
  ],
  'stadium-wifi-72-hours': [
    L('/event-it/event-wifi', 'Event WiFi: how we deliver it'),
    L('/event-it/fifa-club-world-cup', 'FIFA Club World Cup: event IT delivery'),
    L('/rental/event-wifi', 'Event WiFi access point rental'),
  ],
  'why-vendor-continuity-wins-event-it': [
    L('/event-it/portfolio', 'Event IT portfolio'),
    L('/event-it/euroleague-final-four-2025', 'EuroLeague Final Four 2025: event IT delivery'),
    L('/event-it', 'Event IT infrastructure'),
  ],
  'league-standards-vs-improvised-builds': [
    L('/event-it/euroleague-supercup-2026', 'EuroLeague SuperCup 2026: event IT delivery'),
    L('/event-it/temporary-data-centres', 'Temporary data centres for events'),
  ],
  'planning-it-for-international-awards-event': [
    L('/event-it/iifa-awards', 'IIFA Awards: event IT delivery'),
    L('/event-it/event-wifi', 'Event WiFi: how we deliver it'),
  ],
  'fusion-splicer-rental-uae': [
    L('/rental/testing-equipment/fiber-splicing-machine', 'Fibre splicing machine rental'),
    L('/services/elv/structured-cabling', 'Structured cabling services'),
  ],
  'fluke-dsx-5000-rental-uae': [
    L('/rental/testing-equipment/fluke-dsx-5000', 'Fluke DSX-5000 rental'),
    L('/rental/bundles/network-testing-kit', 'Network testing kit rental'),
  ],
  'afl-noyes-m210-otdr-rental-uae': [
    L('/rental/testing-equipment/afl-noyes-m210-otdr', 'AFL Noyes M210 OTDR rental'),
    L('/rental/testing-equipment', 'Testing equipment rental'),
  ],
  'vcount-ultima-ai-people-counter-rental-uae': [
    L('/rental/cctv/vcount-ultima-ai', 'VCount Ultima AI people counter rental'),
    L('/services/elv/cctv-systems', 'CCTV systems'),
  ],
}

export const KB_LINKS = {
  'palo-alto-xsiam-automation-playbooks': [
    L('/cybersecurity-advisory/security-automation', 'Security automation advisory'),
    L('/blog/xsiam-vs-legacy-siem', 'XSIAM vs legacy SIEM'),
  ],
  'ztna-vs-vpn-when-to-migrate': [
    L('/cybersecurity-advisory/zero-trust', 'Zero trust advisory'),
    L('/blog/ztna-vs-vpn-remote-access', 'ZTNA vs VPN for remote access'),
  ],
  'cloudguard-cnapp-implementation': [
    L('/cybersecurity-advisory/cloud-security', 'Cloud security advisory'),
    L('/services/cloud', 'Cloud services'),
  ],
  'reducing-mttr-with-soar': [
    L('/cybersecurity-advisory/security-automation', 'Security automation advisory'),
    L('/services/cybersecurity/incident-response', 'Incident response services'),
  ],
  'fortianalyzer-fortisiem-integration': [
    L('/cybersecurity-advisory/security-automation', 'Security automation advisory'),
    L('/services/managed-it/network-management', 'Network management services'),
  ],
  'multi-vendor-sase-strategy': [
    L('/cybersecurity-advisory/sase', 'SASE advisory'),
    L('/blog/sase-vendor-evaluation', 'SASE vendor evaluation'),
  ],
  'prisma-access-ha-design-patterns': [
    L('/cybersecurity-advisory/sase', 'SASE advisory'),
    L('/blog/ztna-vs-vpn-remote-access', 'ZTNA vs VPN for remote access'),
  ],
}

// Items after the current one, wrapping round to the start, so every article is linked from
// `count` others. Taking the first few for every page left the same three articles linked
// from everywhere and the rest from their index pages only.
export const rotateFrom = (list, slug, count) => {
  const i = list.findIndex((x) => x.slug === slug)
  const others = [...list.slice(i + 1), ...list.slice(0, Math.max(i, 0))]
  return others.slice(0, count)
}
