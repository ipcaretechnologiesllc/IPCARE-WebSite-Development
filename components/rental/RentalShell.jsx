'use client'

import { CartProvider } from './CartContext'
import CartDrawer from './CartDrawer'
import WhatsAppButton from '@/components/global/WhatsAppButton'
import CallNowButton from '@/components/global/CallNowButton'

export default function RentalShell({ children }) {
  return (
    <CartProvider>
      {children}
      <CallNowButton />
      <WhatsAppButton />
      <CartDrawer />
    </CartProvider>
  )
}
