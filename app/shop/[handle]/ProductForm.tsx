'use client'

import { useState } from 'react'
import { Minus, Plus, AlertCircle } from 'lucide-react'
import AddToCartButton from '@/components/AddToCartButton'
import type { ShopifyVariant } from '@/lib/shopify'
import { formatMoney } from '@/lib/shopify'

type Props = {
  variants: ShopifyVariant[]
  flavorHex: string
  flavorRgb: string
}

export default function ProductForm({ variants, flavorHex, flavorRgb }: Props) {
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id ?? '')
  const [quantity, setQuantity] = useState(1)

  const selectedVariant = variants.find((v) => v.id === selectedVariantId) ?? variants[0]
  const hasMultipleVariants = variants.length > 1 && variants[0]?.title !== 'Default Title'
  const optionName = variants[0]?.selectedOptions[0]?.name ?? 'Option'

  const stockLeft = selectedVariant?.quantityAvailable
  const isLowStock = typeof stockLeft === 'number' && stockLeft > 0 && stockLeft <= 5
  const maxQty = typeof stockLeft === 'number' ? stockLeft : 99

  return (
    <div className="flex flex-col gap-6">
      {/* Variant selector (e.g. size/pack) */}
      {hasMultipleVariants && (
        <div>
          <p className="font-body text-[11px] text-white/60 uppercase tracking-[0.2em] mb-3">
            {optionName}
          </p>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => {
              const isSelected = variant.id === selectedVariantId
              const isAvailable = variant.availableForSale
              return (
                <button
                  key={variant.id}
                  onClick={() => isAvailable && setSelectedVariantId(variant.id)}
                  disabled={!isAvailable}
                  className="relative px-5 py-2.5 rounded-full font-body text-sm font-medium border-2 transition-all duration-200 focus:outline-none"
                  style={
                    isSelected
                      ? {
                          background: `rgba(${flavorRgb}, 0.15)`,
                          borderColor: flavorHex,
                          color: '#fff',
                        }
                      : isAvailable
                        ? { borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }
                        : { borderColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.2)', cursor: 'not-allowed', textDecoration: 'line-through' }
                  }
                  title={!isAvailable ? 'Out of stock' : variant.selectedOptions.map((o) => `${o.name}: ${o.value}`).join(' · ')}
                >
                  {variant.title}
                  {!isAvailable && (
                    <span className="ml-1 text-[10px] opacity-60">(sold out)</span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Selected variant price */}
          {selectedVariant && hasMultipleVariants && (
            <p className="mt-3 font-body text-sm text-white/65">
              {formatMoney(selectedVariant.price)} per unit
            </p>
          )}
        </div>
      )}

      {/* Quantity + Add to cart row */}
      <div className="flex items-stretch gap-3">
        {/* Quantity stepper */}
        <div className="flex items-center rounded-full border-2 border-white/10 bg-white/[0.03] overflow-hidden px-1">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="font-body text-base text-white font-semibold w-9 text-center select-none">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
            disabled={quantity >= maxQty}
            className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Add to cart — spans remaining width */}
        <div className="flex-1">
          <AddToCartButton
            variantId={selectedVariantId}
            availableForSale={selectedVariant?.availableForSale ?? false}
            quantity={quantity}
            size="lg"
            fullWidth
          />
        </div>
      </div>

      {/* Low stock warning */}
      {isLowStock && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-orange-500/30 bg-orange-500/5">
          <AlertCircle className="w-4 h-4 text-orange-400 shrink-0" />
          <p className="font-body text-sm text-orange-300">
            Only {stockLeft} left in stock — order soon!
          </p>
        </div>
      )}

      {/* Sold out notice */}
      {selectedVariant && !selectedVariant.availableForSale && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03]">
          <AlertCircle className="w-4 h-4 text-white/65 shrink-0" />
          <p className="font-body text-sm text-white/65">
            This variant is currently out of stock. Check back soon or{' '}
            <a href="/contact" className="underline hover:text-white transition-colors">
              get notified
            </a>
            .
          </p>
        </div>
      )}
    </div>
  )
}
