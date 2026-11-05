import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import PartnersClient from './PartnersClient'
import PartnerDetail from './PartnerDetail'
import { OG_IMAGES } from '@/lib/og'

export const revalidate = 3600

export const metadata = {
  title: 'Technology & Channel Partners: Microsoft, HPE, Palo Alto | IP Care',
  description: 'IP Care Technologies partnerships across Microsoft, HPE, Palo Alto, Cisco, Fortinet, CrowdStrike, Check Point, Zscaler, Veeam and Acronis.',
  alternates: { canonical: '/partners' },
  openGraph: {
    title: 'Technology & Channel Partners: Microsoft, HPE, Palo Alto | IP Care',
    description: 'IP Care Technologies partnerships across Microsoft, HPE, Palo Alto, Cisco, Fortinet, CrowdStrike, Check Point, Zscaler, Veeam and Acronis.',
    url: '/partners',
    type: 'website',
    images: OG_IMAGES,
  },
}

export default function PartnersPage() {
  return (<><Header /><PartnersClient detail={<PartnerDetail />} /><Footer /></>)
}
