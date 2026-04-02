'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Check, Loader2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { mockProducts } from '@/lib/mockProducts'

/**
 * Pack-specific Add to Cart for the homepage Packs section.
 * Resolves pack name → variant ID from mock data.
 *   - "6 Pack"      → 6 Pack variant of first product
 *   - "Variety Pack" → kliq-variety-pack single can (the whole bundle)
 *   - "24 Pack"      → links to /shop (no matching variant)
 */
export default function PackAddToCart({
  packName,
  glowColor,
}: {
  packName: string
  glowColor: string
}) {
  const { addItem, isLoading } = useCart()
  const [added, setAdded] = useState(false)

  // Resolve variant ID based on pack type
  let variantId: string | null = null

  if (packName === 'Variety Pack') {
    const variety = mockProducts.find((p) => p.handle === 'kliq-variety-pack')
    variantId = variety?.variants.edges[0]?.node.id ?? null
  } else if (packName === '6 Pack') {
    // Use the "6 Pack" variant of the first product
    const first = mockProducts[0]
    const sixPackVariant = first?.variants.edges.find((e) => e.node.title === '6 Pack')
    variantId = sixPackVariant?.node.id ?? null
  } else if (packName === '24 Pack') {
    // No matching variant — fall through to link
    variantId = null
  }

  const handleAdd = async () => {
    if (!variantId || isLoading || added) return
    await addItem(variantId, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  // No variant — link to shop
  if (!variantId) {
    return (
      <Link
        href="/shop"
        className="flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
        style={{ background: `rgba(${glowColor}, 0.85)` }}
      >
        <ShoppingCart className="w-3.5 h-3.5" />
        Shop Now
      </Link>
    )
  }

  return (
    <button
      onClick={handleAdd}
      disabled={isLoading || added}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg ${
        added ? 'bg-green-500' : ''
      } ${isLoading ? 'opacity-80 cursor-wait' : ''}`}
      style={!added ? { background: `rgba(${glowColor}, 0.85)` } : undefined}
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
