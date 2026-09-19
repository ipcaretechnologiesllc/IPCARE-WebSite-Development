import { notFound } from 'next/navigation'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import CaseStudyNarrative from '@/components/site/CaseStudyNarrative'
import { getNarrativeCaseStudy, getNarrativeCaseStudyParams } from '@/lib/case-studies-data'
import { isUaeOnlyServiceSubpage, isCaRequest } from '@/lib/seo-region'

// Fourth level under /services. This depth exists ONLY for narrative case
// studies hung off a parent service subpage — dynamicParams = false means the
// whitelist in lib/case-studies-data.js is the entire route space, so no other
// /services/a/b/c URL resolves.

export const revalidate = 3600
export const dynamicParams = false

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'

// app/layout.js anchors the site-wide Organization node to a HARDCODED
// 'https://www.ipcare.ae#org' (its BRAND_URL), not to a host-derived base. Referencing
// that exact id keeps this page's author/publisher pointing at the one real Organization
// entity instead of declaring a second, competing one.
const ORG_ID = 'https://www.ipcare.ae#org'

export async function generateStaticParams() {
  return getNarrativeCaseStudyParams()
}

export async function generateMetadata(props) {
  const params = await props.params
  const study = getNarrativeCaseStudy(params.category, params.slug, params.study)
  if (!study) return {}

  const path = `/services/${params.category}/${params.slug}/${params.study}`
  // Inherit the parent subpage's UAE-only treatment: /services/cybersecurity/
  // incident-response cross-canonicalizes to ipcare.ae, and a child that
  // self-canonicalized on .ca would re-create the duplicate-content split that
  // lib/seo-region.js exists to close.
  const canonical = (isUaeOnlyServiceSubpage(params.category, params.slug) && await isCaRequest())
    ? `https://www.ipcare.ae${path}`
    : path

  return {
    title: study.title,
    description: study.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: study.ogTitle || study.title,
      description: study.ogDescription || study.metaDescription,
      url: `${BASE}${path}`,
      type: 'article',
      images: [{ url: study.ogImage, width: 1200, height: 630, alt: study.ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: study.ogTitle || study.title,
      description: study.ogDescription || study.metaDescription,
      images: [study.ogImage],
    },
  }
}

export default async function CaseStudyPage(props) {
  const params = await props.params
  const study = getNarrativeCaseStudy(params.category, params.slug, params.study)
  if (!study) notFound()

  const path = `/services/${params.category}/${params.slug}/${params.study}`

  // TechArticle rather than Article: this is a forensic write-up, and the
  // type better matches what the page actually is.
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: study.ogTitle || study.h1,
    description: study.metaDescription,
    datePublished: study.datePublished,
    dateModified: study.dateModified || study.datePublished,
    inLanguage: 'en',
    image: `${BASE}${study.ogImage}`,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    about: ['Incident response', 'Digital forensics', 'Infostealer malware', 'Session hijacking'],
    mainEntityOfPage: `${BASE}${path}`,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE}/services` },
      { '@type': 'ListItem', position: 3, name: study.categoryName, item: `${BASE}/services/${study.category}` },
      { '@type': 'ListItem', position: 4, name: study.parentName, item: `${BASE}/services/${study.category}/${study.parent}` },
      { '@type': 'ListItem', position: 5, name: 'Case study', item: `${BASE}${path}` },
    ],
  }

  const faqSchema = study.faq?.items?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: study.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }
    : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <Header />
      <main>
        <CaseStudyNarrative
          study={study}
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: study.categoryName, href: `/services/${study.category}` },
            { label: study.parentName, href: `/services/${study.category}/${study.parent}` },
            { label: 'Case study' },
          ]}
        />
      </main>
      <Footer />
    </>
  )
}
