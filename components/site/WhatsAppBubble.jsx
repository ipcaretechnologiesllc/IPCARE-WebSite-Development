'use client'

import * as Icons from 'lucide-react'

export default function WhatsAppBubble() {
  return (
    <a href="https://wa.me/97126766935?text=Hello%20IP%20Care%2C%20I%27d%20like%20more%20information." target="_blank" rel="noopener" aria-label="Chat on WhatsApp" className="fixed bottom-6 right-6 z-[80] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform" style={{ background: '#25D366' }}>
      <Icons.MessageCircle size={26} className="text-white" strokeWidth={2}/>
      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 animate-pulse"/>
    </a>
  )
}
