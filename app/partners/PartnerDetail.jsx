import Link from 'next/link'

// Server-rendered so the text is in the HTML and does not add to the client bundle.
// Each entry describes work we deliver with that vendor's products and links to the page
// where that work is described. No partner tiers or certifications are claimed here.
const DETAIL = [
  {
    name: 'Palo Alto Networks',
    body: 'We design and deploy Prisma Access for secure remote and branch connectivity, and build XSIAM automation and SOAR playbooks for security operations teams. Firewalls from the PA series are also available on short-term rental for projects and events.',
    links: [
      ['Prisma Access HA design patterns', '/cybersecurity-advisory/knowledge-base/prisma-access-ha-design-patterns'],
      ['XSIAM automation playbooks', '/cybersecurity-advisory/knowledge-base/palo-alto-xsiam-automation-playbooks'],
    ],
  },
  {
    name: 'Check Point',
    body: 'Our Check Point work covers Quantum gateway upgrades, Harmony SASE rollouts, CloudGuard and Infinity architecture. The R82 upgrade and Harmony SASE guides below describe how we plan and run those projects in the UAE.',
    links: [
      ['Check Point R82 upgrade playbook', '/cybersecurity-advisory/knowledge-base/check-point-r82-upgrade-playbook'],
      ['Harmony SASE deployment in the UAE', '/cybersecurity-advisory/knowledge-base/check-point-harmony-sase-uae'],
    ],
  },
  {
    name: 'Fortinet',
    body: 'We deploy FortiGate firewalls, FortiSASE and the wider Security Fabric for enterprise and event networks, and integrate FortiAnalyzer and FortiSIEM for logging and detection. FortiGate units are part of our rental fleet for temporary sites.',
    links: [
      ['FortiAnalyzer and FortiSIEM integration', '/cybersecurity-advisory/knowledge-base/fortianalyzer-fortisiem-integration'],
      ['Networking equipment rental', '/rental/networking'],
    ],
  },
  {
    name: 'Zscaler',
    body: 'We implement Zscaler Internet Access and Private Access as part of zero trust and SASE programmes, including vendor selection, migration from legacy VPN and policy design.',
    links: [
      ['SASE advisory', '/cybersecurity-advisory/sase'],
      ['Zero trust advisory', '/cybersecurity-advisory/zero-trust'],
    ],
  },
  {
    name: 'CrowdStrike',
    body: 'We deploy Falcon endpoint protection across managed estates and connect it to monitoring and response processes, so alerts reach people who act on them.',
    links: [
      ['Endpoint protection services', '/services/cybersecurity/endpoint-protection'],
      ['Cybersecurity services', '/services/cybersecurity'],
    ],
  },
  {
    name: 'HPE',
    body: 'HPE ProLiant servers and Aruba networking appear in both our project work and our rental fleet. Aruba access points carry many of our event WiFi deployments, and DL380 servers are available for proof-of-concept and migration projects.',
    links: [
      ['Event WiFi rental', '/rental/event-wifi'],
      ['Server rental', '/rental/servers'],
    ],
  },
  {
    name: 'Cisco',
    body: 'We design, install and support Cisco Catalyst and Meraki networks within our infrastructure and managed network services.',
    links: [
      ['Infrastructure services', '/services/infrastructure'],
      ['Managed network management', '/services/managed-it/network-management'],
    ],
  },
  {
    name: 'Microsoft',
    body: 'We migrate and run Azure and Microsoft 365 workloads, and cover the security layer around them. Our Azure UAE North work is described in our blog.',
    links: [
      ['Cloud services', '/services/cloud'],
      ['Email and Microsoft 365', '/services/email-solutions'],
    ],
  },
  {
    name: 'Veeam and Acronis',
    body: 'Backup, disaster recovery and endpoint cyber protection built on Veeam and Acronis, designed around recovery targets rather than just backup schedules.',
    links: [
      ['Backup and recovery', '/services/cloud/backup-recovery'],
    ],
  },
]

export default function PartnerDetail() {
  return (
    <section className="pb-20 px-6">
      <div className="max-w-[1100px] mx-auto">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">How we work with each vendor</h2>
        <p className="body-text max-w-3xl mb-10 leading-relaxed">
          IP Care is a systems integrator, not a reseller of a single brand. We choose the platform that fits the requirement, then design, deploy and support it. Where a project is temporary, such as an event or a migration window, the same vendors&rsquo; equipment is also available from our rental fleet. These are the vendors we work with most and what we deliver with each.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {DETAIL.map((d) => (
            <div key={d.name} className="glass-card p-7">
              <h3 className="text-white text-xl font-bold mb-3">{d.name}</h3>
              <p className="body-text text-sm leading-relaxed mb-4">{d.body}</p>
              <ul className="space-y-1.5">
                {d.links.map(([label, href]) => (
                  <li key={href}><Link href={href} className="text-[#E87722] text-sm hover:underline">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
