import Link from 'next/link'

// Server component on purpose: the hub's client bundle (AdvisoryClient) is already large and
// this block is static text. The same ADVISORY_FAQS array feeds the visible list below and the
// FAQPage JSON-LD in page.js, so the markup can never describe content that isn't on the page.
//
// 2026-11-15, Search Console (17 Oct-13 Nov): the hub took ~660 impressions at position ~27 for
// generic searches ("cyber security services in dubai" 21.9, "cyber security solutions" 19.9,
// "cyber security advisory services" 27.3, "virtual ciso services uae" 67.5) with 0 clicks, while
// /services/cybersecurity/dubai, the page meant to own the commercial searches, ranked ~78 for
// the same terms. The hub is an advisory page, so it now says what advisory is, how it differs
// from managed services, and links down to the services pages.
export const ADVISORY_FAQS = [
  {
    q: 'What is cybersecurity advisory?',
    a: 'Cybersecurity advisory is expert guidance on how to design, sequence and prove your security programme, rather than a product or a monitoring service. IP Care\'s advisory practice covers Zero Trust architecture, SASE transformation, cloud security, executive advisory and security automation, delivered by practitioners who also do the implementation work.',
  },
  {
    q: 'What is the difference between cybersecurity advisory and managed security services?',
    a: 'Advisory decides what to build and in what order: the architecture, the roadmap, the vendor choices and the migration plan. Managed security services run the day-to-day monitoring and response once it is built. IP Care does both, so the design and the operation are not handed between two suppliers.',
  },
  {
    q: 'Do you provide Zero Trust and ZTNA services in Dubai and the UAE?',
    a: 'Yes. Zero Trust architecture and ZTNA are a core part of the advisory practice, covering identity, device posture, application access and a phased migration away from the remote-access VPN. For the detail, see our Zero Trust advisory page and the guide to ZTNA versus VPN.',
  },
  {
    q: 'Which security platforms do you work with?',
    a: 'Palo Alto Networks, Check Point, Fortinet, Microsoft security (Defender, Sentinel, Entra ID, Purview), AWS, Google Cloud, Zscaler, CrowdStrike and Netskope. Advice is vendor-neutral where the choice is open, and platform-specific where you have already committed.',
  },
  {
    q: 'Do you offer virtual CISO or executive cybersecurity advisory?',
    a: 'Our executive advisory service provides board-level cybersecurity strategy, risk and regulatory guidance for CISOs and CIOs. If you are looking for virtual CISO support, describe what you need and we will scope it with you.',
  },
  {
    q: 'Where do you deliver cybersecurity services?',
    a: 'IP Care\'s team is based in Abu Dhabi and delivers advisory and implementation across Abu Dhabi, Dubai and the rest of the UAE.',
  },
]

const SERVICE_LINKS = [
  { href: '/services/cybersecurity/dubai', label: 'Cybersecurity services in Dubai', note: 'Managed security, monitoring and compliance' },
  { href: '/services/cybersecurity/abu-dhabi', label: 'Cybersecurity services in Abu Dhabi', note: 'Managed security, monitoring and compliance' },
  { href: '/services/cybersecurity', label: 'All cybersecurity services', note: 'The full managed security portfolio' },
]

export default function AdvisoryFaq() {
  return (
    <section className="px-6 py-14 md:py-16" style={{ background: '#FFFFFF' }} aria-labelledby="advisory-faq">
      <div className="max-w-[900px] mx-auto">
        <div className="mb-12 p-6 md:p-7 rounded-2xl" style={{ background: '#F4F6FA', border: '1px solid #E1E8F0', borderLeft: '4px solid #E87722' }}>
          <h2 id="looking-for-cyber-security-services-in-dubai-or-abu-dhabi" className="font-bold mb-2" style={{ color: '#0B1A46', fontSize: '1.4rem', lineHeight: 1.3 }}>
            Looking for cyber security services in Dubai or Abu Dhabi?
          </h2>
          <p className="mb-5 leading-relaxed" style={{ color: '#374151' }}>
            This section is our advisory practice: architecture, roadmap and migration. For managed security services, 24/7 monitoring and compliance, go to our cybersecurity services pages.
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            {SERVICE_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="block p-4 rounded-xl bg-white hover:shadow-md transition" style={{ border: '1px solid #E1E8F0' }}>
                <div className="font-semibold" style={{ color: '#0B1A46' }}>{l.label}</div>
                <div className="text-sm mt-1" style={{ color: '#6B7280' }}>{l.note}</div>
              </Link>
            ))}
          </div>
        </div>

        <h2 id="advisory-faq" className="font-bold mb-6" style={{ color: '#0B1A46', fontSize: '1.7rem', lineHeight: 1.25 }}>
          Cybersecurity advisory: frequently asked questions
        </h2>
        <div className="space-y-4">
          {ADVISORY_FAQS.map(({ q, a }) => (
            <div key={q} className="rounded-xl p-5" style={{ background: '#F4F6FA', border: '1px solid #E1E8F0' }}>
              <h3 className="font-semibold text-base md:text-lg mb-2" style={{ color: '#0B1A46' }}>{q}</h3>
              <p className="text-base leading-[1.7]" style={{ color: '#374151' }}>{a}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm" style={{ color: '#6B7280' }}>
          Related reading:{' '}
          <Link href="/cybersecurity-advisory/zero-trust" className="underline hover:text-[#E87722]">Zero Trust advisory</Link>,{' '}
          <Link href="/blog/ztna-vs-vpn-remote-access" className="underline hover:text-[#E87722]">ZTNA vs VPN</Link>,{' '}
          <Link href="/cybersecurity-advisory/sase" className="underline hover:text-[#E87722]">SASE advisory</Link> and{' '}
          <Link href="/cybersecurity-advisory/executive-advisory" className="underline hover:text-[#E87722]">executive advisory</Link>.
        </p>
      </div>
    </section>
  )
}
