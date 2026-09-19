// Narrative case studies for non-physical engagements — cybersecurity incident
// response, advisory and consulting work.
//
// Deliberately SEPARATE from lib/portfolio-data.js. That module (and the
// /portfolio hub it drives) is scoped to enterprise facilities, ELV/security,
// structured cabling, fiber and network infrastructure — projects described by
// what was installed: quantities, photos, test results, handover packages. An
// incident-response engagement has none of those. It is described by what
// happened and in what order, so it needs its own shape (timeline, attack
// chain, root cause) and its own template.
//
// Each entry is rendered by components/site/CaseStudyNarrative.jsx and routed
// under its parent service page via app/services/[category]/[slug]/[study].
// Adding a case study is a data entry here plus a `caseStudies` reference on
// the parent subpage in lib/services-data.js — no new route files.

export const narrativeCaseStudies = [
  {
    // ── Routing ────────────────────────────────────────────────────────────
    // The page renders at /services/{category}/{parent}/{slug}. The parent must
    // be a real subpage in lib/services-data.js or the breadcrumb will lie.
    slug: 'case-study-session-theft',
    category: 'cybersecurity',
    parent: 'incident-response',
    parentName: 'Incident Response',
    categoryName: 'Cybersecurity',

    // ── Metadata ───────────────────────────────────────────────────────────
    // Editorial H1, keyword-led title tag. The H1 is what makes the page
    // memorable; the title tag is what makes it findable.
    title: 'Session Hijacking Incident Response Case Study | IP Care UAE',
    metaDescription:
      'How IP Care traced fraudulent advertising spend to a stolen browser session, rebuilt the compromised endpoint and returned a UAE business to safe operation, without the password ever being guessed.',
    h1: 'Stolen in a Session, Not in a Password',
    eyebrow: 'Case study · Cybersecurity incident response',
    ogTitle: 'Stolen in a Session, Not in a Password: An Incident Response Case Study',
    ogDescription:
      'Malware copied a live Facebook session from one administrator’s Mac. The attacker replayed it and spent inside the business’s own ad account without ever needing a password or an MFA code.',
    ogImage: '/images/case-studies/session-theft-og.jpg',
    ogImageAlt:
      'IP Care Technologies case study — infostealer session theft and business ad-account fraud incident response',
    datePublished: '2026-09-19',

    lede:
      'Information-stealing malware on one administrator’s Mac copied a live Facebook session. The attacker replayed it, spent inside the business’s own advertising account, and never needed the password or an MFA code. IP Care found the root cause and rebuilt the endpoint. The business was back on a device it could trust four days later.',

    // ── At-a-glance facts ──────────────────────────────────────────────────
    // Client is anonymized at the client's request and generalized beyond
    // sector: the combination of sector, emirate and ad-spend detail would be
    // identifying in a market this size.
    facts: [
      { label: 'Client', value: 'UAE SME', note: 'Name withheld at the client’s request' },
      { label: 'Exposure', value: 'Business social and advertising accounts' },
      {
        label: 'Services delivered',
        value: 'Digital forensics & incident response, endpoint rebuild, identity hardening',
      },
      { label: 'Engagement', value: 'Ten weeks, exposure to closure' },
    ],

    // ── Headline metrics ───────────────────────────────────────────────────
    // All non-financial by design. No AED figures appear anywhere on this page.
    metrics: [
      { value: '5 stages', label: 'Attack path reconstructed, from delivery to persistence', tone: 'navy' },
      { value: '6', label: 'Unauthorised integrations identified and removed', tone: 'orange' },
      { value: '0', label: 'Threats detected on the full post-rebuild endpoint scan', tone: 'navy' },
      { value: '4 days', label: 'From forensic review to a validated, hardened endpoint', tone: 'blue' },
    ],

    // ── Situation & challenge ──────────────────────────────────────────────
    situation: {
      eyebrow: 'The situation',
      heading: 'A business that runs on its Meta presence',
      body: [
        'The client is a UAE SME that wins a large share of its new business through Facebook and Instagram, managed from a single administrator’s MacBook and supported by an external marketing agency. That one device held the live sessions for the company’s Meta Business portfolio, its Microsoft 365 account and its commercial systems.',
        'The client noticed advertising activity it had not authorised. Within days Meta restricted the advertising account entirely, in the middle of a launch campaign. IP Care was engaged to work out what had happened and get the business back to a state it could trust.',
      ],
    },

    challenge: {
      eyebrow: 'The challenge',
      heading: 'Four problems at once',
      items: [
        {
          lead: 'Unauthorised spend.',
          text: 'A fraudulent campaign ran inside the client’s own advertising account, with the daily spend limit raised by several hundred times in a single change.',
        },
        {
          lead: 'An account behaving as its owner.',
          text: 'Profile data was changed by automated tooling running through fabricated or replayed device profiles, so there were no failed logins to trace.',
        },
        {
          lead: 'Broad third-party access.',
          text: 'Six integrations appeared and were removed inside a single day, while legitimate agency and CRM connections held far more permission than they needed.',
        },
        {
          lead: 'Commercial disruption.',
          text: 'With the advertising account locked, lead generation stopped during the campaign the business had built its quarter around.',
        },
      ],
    },

    // ── Timeline ───────────────────────────────────────────────────────────
    // Relative days rather than calendar dates: the ten-week arc is the
    // teaching point, and nothing here should pin the incident to a date.
    timeline: {
      eyebrow: 'Incident at a glance',
      heading: 'Ten weeks from exposure to controlled rebuild',
      events: [
        {
          when: 'Day 0',
          what: 'Facebook session cookie created in Chrome on the Mac',
          meaning: 'Later copied and reused by the attacker.',
        },
        {
          when: 'Weeks 1–4',
          what: 'Information-stealing malware active on the Mac',
          meaning: 'Credentials and browser sessions exposed.',
        },
        {
          when: 'Day 26',
          what: 'Session replay and logins from attacker infrastructure',
          meaning: 'Unrecognised access and automated profile changes.',
        },
        {
          when: 'Day 33',
          what: 'Endpoint AV removes a crypto-miner and its Launch Agent',
          meaning: 'Persistence gone, but the stolen session data stayed exposed.',
        },
        {
          when: 'Day 39',
          what: 'Fraudulent campaign created and the daily spend limit raised sharply',
          meaning: 'Unauthorised spend begins inside the client’s own account.',
        },
        {
          when: 'Day 58',
          what: 'Meta locks the account',
          meaning: 'Access blocked while identity recovery proceeds.',
        },
        {
          when: 'Days 61–64',
          what: 'Forensic review followed by a controlled Mac rebuild',
          meaning: 'Endpoint remediated and security controls validated.',
        },
      ],
    },

    // ── Approach ───────────────────────────────────────────────────────────
    approach: {
      eyebrow: 'Our approach',
      heading: 'Evidence first, then rebuild',
      lede:
        'Rebuilding a compromised machine destroys the evidence that explains it, so IP Care sequenced the work to deliver both: an account of what happened, and a device the client could use again.',
      steps: [
        {
          title: 'Preserve and investigate',
          text: 'Targeted forensic triage, persistence scans and malware-sample recovery on the Mac, with a full review of Meta login records, portfolio roles, payment activity and integrations — corroborated against threat intelligence.',
        },
        {
          title: 'Contain the exposure',
          text: 'Use of the affected Mac was restricted, key account passwords were reset with MFA enabled, active sessions and trusted devices were reviewed, and excessive third-party access was escalated for removal.',
        },
        {
          title: 'Rebuild under control',
          text: 'The Mac was erased and configured as a new device. No system backup, browser profile, cookies or extensions were restored; only known business documents were carried across, scanned before restoration.',
        },
        {
          title: 'Harden and validate',
          text: 'Full OS patching, automatic updates, FileVault, firewall, disabled sharing and remote access, one managed endpoint-protection product, and a clean full-scan result recorded before any account was reconnected.',
        },
        {
          title: 'Reconnect, monitor, close',
          text: 'Accounts were reconnected in a controlled order behind written release approval, followed by daily checks for seven days, second-daily checks to day 14, and a documented closure package of residual risks and responsibilities.',
        },
      ],
    },

    // ── Findings ───────────────────────────────────────────────────────────
    findings: {
      eyebrow: 'What we found',
      heading: 'The password was never the weak point',
      lede:
        'Reconstructed from the recovered malware sample, endpoint persistence artefacts and the platform’s own login records, the attack runs in five stages. Only the first depends on the user making a mistake.',
      tableCaption: 'Five-stage attack path and why existing controls did not stop it',
      columns: ['Stage', 'What occurred', 'Why controls did not stop it'],
      chain: [
        ['1 · Delivery', 'A ClickFix-style lure led to a command running on the Mac', 'The first click could not be recovered'],
        ['2 · Infection', 'Infostealer malware ran at login via a Launch Agent', 'Endpoint protection was not active'],
        ['3 · Theft', 'Browser cookies, credentials and the live session were copied', 'A live session is an authenticated user'],
        ['4 · Replay', 'The session was loaded on attacker infrastructure', 'No password or MFA code is requested'],
        ['5 · Persistence', 'Password resets did not terminate all sessions', 'The open session survived the resets'],
      ],
      rootCause:
        'Authenticated-session theft from the endpoint, compounded by delayed endpoint protection, incomplete session revocation and broad third-party permissions. Strong passwords and MFA were in place; neither is enough on its own once a live session token leaves the device. This is now a standard route into business advertising accounts: nothing shows up as a failed login and no code is ever requested. The first visible symptom is money already spent.',
    },

    // ── Results ────────────────────────────────────────────────────────────
    results: {
      eyebrow: 'The result',
      heading: 'A device the client can trust again',
      delivered: [
        'A complete, evidenced account of the attack, written before anything was erased.',
        'The unauthorised spend quantified and packaged for the platform dispute.',
        'A rebuilt Mac with managed endpoint protection, encryption, firewall and automatic updates.',
        'Sessions revoked, MFA strengthened and recovery methods verified across Apple, Microsoft 365 and Meta.',
        'A self-service method of procedure the client can follow again without specialist help.',
      ],
      changed: [
        'Every password reset is now paired with a full session revocation.',
        'Phishing-resistant MFA and passkeys where the platform supports them.',
        'One managed endpoint-protection product, always on and centrally visible.',
        'Least privilege for agencies and integrations, reviewed quarterly.',
        'Business-critical accounts accessed only from trusted, fully updated devices.',
      ],
      honesty: {
        heading: 'What we told the client honestly',
        text: 'Reinstatement of the advertising account sits with the platform, not with us, and we said so from the start. The technical engagement could be closed on evidence: the endpoint erased, rebuilt and validated; identities reviewed and reset; unauthorised access removed where technically possible; and residual risks written down and accepted. We were specific about what “clean” meant in this case, and about which part of the problem stayed outside anyone’s control.',
      },
    },

    // ── FAQ ────────────────────────────────────────────────────────────────
    // Must stay distinct from the parent Incident Response page's five FAQs —
    // both emit FAQPage schema and overlapping questions would compete.
    faq: {
      eyebrow: 'Common questions',
      heading: 'Session theft, answered',
      items: [
        {
          q: 'How can an attacker get in without the password or an MFA code?',
          a: 'Once you sign in, the browser stores a session token that proves you already authenticated. Information-stealing malware copies that token along with saved credentials. Replayed on another machine, it presents as an already-authenticated user, so the platform has no reason to ask for a password or a code.',
        },
        {
          q: 'Does changing the password fix it?',
          a: 'Not on its own. A reset that does not terminate existing sessions leaves the stolen one alive — and if the malware is still on the device, it simply captures the replacement session. Resets must be paired with a full session revocation and carried out from a clean device.',
        },
        {
          q: 'Can fraudulent advertising spend be recovered?',
          a: 'That decision belongs to the platform. What an investigation can do is quantify the spend, evidence the unauthorised access behind it and package both for the dispute and appeal. IP Care is explicit about this distinction before the work starts.',
        },
      ],
    },

    // ── Closing ────────────────────────────────────────────────────────────
    cta: {
      heading: 'Seeing activity you did not authorise?',
      text: 'Forensic investigation, endpoint recovery and identity hardening — delivered by IP Care Technologies in Abu Dhabi since 2003, with 15+ years of cybersecurity practice behind it.',
      label: 'Talk to our team',
      href: '/contact',
    },

    related: [
      {
        name: 'Incident Response',
        short: 'Containment, forensics and recovery when something gets through — on retainer or on call.',
        icon: 'ShieldAlert',
        href: '/services/cybersecurity/incident-response',
      },
      {
        name: 'Endpoint Protection',
        short: 'Managed EDR/XDR deployed and monitored, so malware never gets the chance to sit idle on a device.',
        icon: 'Monitor',
        href: '/services/cybersecurity/endpoint-protection',
      },
      {
        name: 'Microsoft Entra ID',
        short: 'Identity hardening, conditional access and phishing-resistant MFA across your business accounts.',
        icon: 'KeyRound',
        href: '/services/cybersecurity/microsoft-entra-id',
      },
      {
        name: 'Managed IT Services',
        short: 'Proactive monitoring, endpoint management and SLA-backed support, so an exposure like this is caught before it costs anything.',
        icon: 'ServerCog',
        href: '/services/managed-it',
      },
    ],

    footnote:
      'Client name withheld at the client’s request. Details are drawn from the engagement’s closeout report; figures that could identify the client or the live platform dispute have been omitted.',

    // ── Index card ─────────────────────────────────────────────────────────
    // How this study presents on /case-studies.
    card: {
      title: 'Stolen in a Session, Not in a Password',
      summary:
        'Infostealer malware copied a live browser session from one administrator’s Mac. The attacker replayed it and spent inside the business’s own advertising account — no password, no MFA code, no failed login to trace.',
      discipline: 'Cybersecurity',
      tag: 'Incident Response',
      sector: 'UAE SME',
    },
  },
]

// Route triples for generateStaticParams. Anything not listed here 404s, so the
// new fourth-level services depth cannot be crawled into.
export const getNarrativeCaseStudyParams = () =>
  narrativeCaseStudies.map(({ category, parent, slug }) => ({ category, slug: parent, study: slug }))

export const getNarrativeCaseStudy = (category, parent, slug) =>
  narrativeCaseStudies.find(
    (study) => study.category === category && study.parent === parent && study.slug === slug
  ) || null

export const caseStudyPath = (study) => `/services/${study.category}/${study.parent}/${study.slug}`

// Case studies belonging to a given parent subpage, for the proof block that
// ServicePageTemplate renders on /services/{category}/{parent}.
export const getCaseStudiesForSubpage = (category, parent) =>
  narrativeCaseStudies.filter((study) => study.category === category && study.parent === parent)

// Every case study under a service category, for the same proof block on the
// category hub at /services/{category}.
export const getCaseStudiesForCategory = (category) =>
  narrativeCaseStudies.filter((study) => study.category === category)

// Shape a study for ServicePageTemplate's `caseStudies` prop.
export const toCaseStudyCard = (study) => ({
  href: caseStudyPath(study),
  tag: study.card.tag,
  title: study.card.title,
  summary: study.card.summary,
})
