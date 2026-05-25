'use client'

import { CartProvider } from './CartContext'
import CartDrawer from './CartDrawer'
import FloatingCartButton from './FloatingCartButton'
import WhatsAppButton from '@/components/global/WhatsAppButton'
import CallNowButton from '@/components/global/CallNowButton'

export default function RentalShell({ children }) {
  return (
    <CartProvider>
      {children}
      <FloatingCartButton />
      <CallNowButton />
      <WhatsAppButton />
      <CartDrawer />
    </CartProvider>
  )
}
