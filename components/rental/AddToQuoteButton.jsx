'use client'

import { useState } from 'react'
import * as Icons from 'lucide-react'
import { useCart } from './CartContext'

export default function AddToQuoteButton({ product, duration = 'weekly', quantity = 1, size = 'md', startDate, endDate }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)
  const handle = () => {
    add(product, { duration, quantity, startDate, endDate })
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }
  const padding = size === 'sm' ? 'py-2 px-4 text-xs' : 'py-3 px-5 text-sm'
  return (
    <button onClick={handle} className={`btn-primary w-full justify-center ${padding}`}>
      {added ? <><Icons.Check size={14}/> Added to Quote</> : <><Icons.Plus size={14}/> Add to Quote</>}
    </button>
  )
}
