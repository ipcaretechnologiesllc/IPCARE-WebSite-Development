import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import PartnersClient from './PartnersClient'

export const metadata = {
  title: 'Technology & Channel Partners: Microsoft, HPE, Palo Alto | IP Care',
  description: 'IP Care Technologies partnerships across Microsoft, HPE, Palo Alto, Cisco, Fortinet, CrowdStrike, Check Point, Zscaler, Veeam and Acronis.',
  alternates: { canonical: '/partners' },
}

export default function PartnersPage() {
  return (<><Header /><PartnersClient /><Footer /></>)
}
