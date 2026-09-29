import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import KBClient from './KBClient'

export const revalidate = 3600

export const metadata = {
  title: 'Cybersecurity Knowledge Base: Palo Alto, Check Point | IP Care',
  description: 'Field-tested cybersecurity guides on Palo Alto, Check Point, Fortinet, Zero Trust, SASE and security automation, written by senior practitioners.',
  alternates: { canonical: '/cybersecurity-advisory/knowledge-base' },
  openGraph: {
    title: 'Cybersecurity Knowledge Base: The Cyber Adviser',
    description: 'Field-tested articles on enterprise security architecture and vendor-specific engineering.',
    url: '/cybersecurity-advisory/knowledge-base',
  },
}

export default function KnowledgeBasePage() {
  return (
    <>
      <Header />
      <KBClient />
      <Footer />
    </>
  )
}
