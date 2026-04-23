export function LegalPage({ title, sections }) {
  return (
    <main className="py-20 md:py-24 px-6">
      <div className="max-w-[820px] mx-auto">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-3">{title}</h1>
        <p className="mono text-xs text-white/50 uppercase tracking-widest mb-12">Last Updated: January 2026</p>
        <div className="glass-card p-8 md:p-10 space-y-8">
          {sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-white text-xl md:text-2xl font-bold mb-3">{s.h}</h2>
              {s.p.map((p, j) => <p key={j} className="body-text text-base leading-relaxed mb-3">{p}</p>)}
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}

export const legalContent = {
  privacy: [
    { h: '1. Introduction', p: ['IP Care Technologies L.L.C. ("IP Care", "we", "us") respects your privacy and is committed to protecting your personal data.', 'This policy explains how we collect, use and safeguard personal data in compliance with the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021) and the Canadian Personal Information Protection and Electronic Documents Act (PIPEDA).'] },
    { h: '2. Data We Collect', p: ['We collect personal data you provide to us directly (e.g. via contact forms, quote requests, career applications) and data collected automatically (cookies, analytics, IP address).', 'Categories include: name, email, phone, company, job title, project information, CV/resume (for applicants), and technical/usage data.'] },
    { h: '3. How We Use Data', p: ['We use your data to respond to enquiries, provide services, process rental quotes, recruit staff, improve our website, and meet legal obligations.', 'We do not sell your personal data to third parties.'] },
    { h: '4. Legal Basis', p: ['We process personal data on the basis of consent, contract performance, legitimate interests, and legal obligation — aligned to UAE PDPL and PIPEDA requirements.'] },
    { h: '5. Your Rights', p: ['You have the right to access, rectify, erase, restrict and object to processing of your personal data. To exercise these rights contact privacy@ipcare.ae.'] },
    { h: '6. Data Retention', p: ['We retain personal data only for as long as necessary to fulfil the purposes set out in this policy and to comply with legal obligations.'] },
    { h: '7. Contact', p: ['Questions about this policy: privacy@ipcare.ae | IP Care Technologies L.L.C., Abu Dhabi, UAE.'] },
  ],
  terms: [
    { h: '1. Acceptance', p: ['By accessing this website or engaging IP Care Technologies for services, you agree to these Terms of Service.'] },
    { h: '2. Website Use', p: ['Content on this site is provided for general information. While we take reasonable care, we make no warranties regarding accuracy or completeness.'] },
    { h: '3. Services Agreement', p: ['Where IP Care delivers services under a signed Master Services Agreement or Statement of Work, that agreement takes precedence over these Terms for the scope of that engagement.'] },
    { h: '4. Intellectual Property', p: ['All content, trademarks and branding on this site are the property of IP Care Technologies L.L.C. or its licensors.'] },
    { h: '5. Limitation of Liability', p: ['To the maximum extent permitted by law, IP Care will not be liable for any indirect, incidental or consequential damages arising from use of this site.'] },
    { h: '6. Governing Law', p: ['These Terms are governed by the laws of the United Arab Emirates for UAE customers, and Canadian law for Canadian customers.'] },
    { h: '7. Contact', p: ['Questions about these Terms: legal@ipcare.ae.'] },
  ],
  cookies: [
    { h: '1. What Are Cookies', p: ['Cookies are small text files placed on your device when you visit a website. They help the site remember preferences and improve functionality.'] },
    { h: '2. How We Use Cookies', p: ['We use essential cookies required for the site to function, analytics cookies (to understand usage), and optional marketing cookies. Full list available on request.'] },
    { h: '3. Managing Cookies', p: ['You can manage cookie preferences via our cookie banner or your browser settings. Disabling certain cookies may affect site functionality.'] },
    { h: '4. Third-Party Services', p: ['We use Google Analytics and Google Maps, which may set cookies. See their respective privacy policies for details.'] },
    { h: '5. Contact', p: ['Cookie questions: privacy@ipcare.ae.'] },
  ],
}
