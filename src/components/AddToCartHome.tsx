'use client'

import { useState } from 'react'
import { ShoppingCart, Check, Loader2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { mockProducts } from '@/lib/mockProducts'

/**
 * Resolves the first variant ID from mock data by product handle,
 * then adds to cart on click. Used in the homepage Products & Packs sections
 * where we don't have Shopify data at render time.
 */
export default function AddToCartHome({ handle }: { handle: string }) {
  const { addItem, isLoading } = useCart()
  const [added, setAdded] = useState(false)

  const product = mockProducts.find((p) => p.handle === handle)
  const variantId = product?.variants.edges[0]?.node.id

  const handleAdd = async () => {
    if (!variantId || isLoading || added) return
    await addItem(variantId, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAdd}
      disabled={isLoading || added || !variantId}
      className={`group flex items-center gap-2.5 px-6 py-3 rounded-full font-body font-semibold text-xs transition-all duration-300 hover:scale-105 shrink-0 w-fit ${
        added
          ? 'bg-green-500 text-white'
          : 'bg-white text-black hover:bg-white/90'
      } ${isLoading ? 'opacity-80 cursor-wait' : ''}`}
      aria-label={added ? 'Added to cart' : 'Add to cart'}
    >
      {isLoading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : added ? (
        <Check className="w-3.5 h-3.5" />
      ) : (
        <ShoppingCart className="w-3.5 h-3.5" />
      )}
      {isLoading ? 'Adding...' : added ? 'Added!' : 'Add to Cart'}
    </button>
  )
}
