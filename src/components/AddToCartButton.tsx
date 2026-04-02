'use client'

import { useState } from 'react'
import { ShoppingCart, Check, Loader2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'

type Props = {
  variantId: string
  availableForSale?: boolean
  quantity?: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export default function AddToCartButton({
  variantId,
  availableForSale = true,
  quantity = 1,
  className = '',
  size = 'md',
  fullWidth = false,
}: Props) {
  const { addItem, isLoading } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = async () => {
    if (!availableForSale || isLoading || added) return
    await addItem(variantId, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5',
  }

  const iconSize = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  if (!availableForSale) {
    return (
      <button
        disabled
        className={`
          ${fullWidth ? 'w-full justify-center' : 'w-fit'}
          flex items-center rounded-full font-body font-semibold
          bg-white/10 text-white/30 cursor-not-allowed
          ${sizeClasses[size]} ${className}
        `}
      >
        Sold Out
      </button>
    )
  }

  return (
    <button
      onClick={handleAdd}
      disabled={isLoading || added}
      className={`
        ${fullWidth ? 'w-full justify-center' : 'w-fit'}
        flex items-center rounded-full font-body font-semibold
        transition-all duration-300 hover:scale-105 active:scale-95
        ${added
          ? 'bg-green-500 text-white'
          : 'bg-kliq-vermilion text-white hover:bg-kliq-vermilion-deep'
        }
        ${isLoading ? 'opacity-80 cursor-wait' : ''}
        ${sizeClasses[size]} ${className}
      `}
      aria-label={added ? 'Added to cart' : 'Add to cart'}
    >
      {isLoading ? (
        <Loader2 className={`${iconSize[size]} animate-spin`} />
      ) : added ? (
        <Check className={iconSize[size]} />
      ) : (
        <ShoppingCart className={iconSize[size]} />
      )}
      <span>{isLoading ? 'Adding...' : added ? 'Added!' : 'Add to Cart'}</span>
    </button>
  )
}
