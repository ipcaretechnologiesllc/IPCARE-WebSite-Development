import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import KBClient from './KBClient'

export const metadata = {
  title: 'Cybersecurity Knowledge Base: Palo Alto, Check Point, Fortinet | The Cyber Adviser',
  description: 'Field-tested cybersecurity articles: Palo Alto, Check Point, Fortinet, Zero Trust architecture, SASE, and security automation insights from senior practitioners.',
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
