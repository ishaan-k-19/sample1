'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { type ShopifyProduct, formatMoney, getProductVariants } from '@/lib/shopify'
import AddToCartButton from './AddToCartButton'

const FLAVOR_COLORS: Record<string, string> = {
  'mixed-berry': '107, 92, 165',
  berry: '107, 92, 165',
  cola: '235, 41, 13',
  'memo-nade': '124, 179, 66',
  lemonade: '124, 179, 66',
  mango: '249, 168, 37',
  'mango-pineapple': '249, 168, 37',
}

function getFlavorColor(product: ShopifyProduct): string {
  if (product.flavorColorRgb?.value) return product.flavorColorRgb.value
  const key = Object.keys(FLAVOR_COLORS).find(
    (k) =>
      product.handle.toLowerCase().includes(k) ||
      product.tags.some((t) => t.toLowerCase().includes(k))
  )
  return key ? FLAVOR_COLORS[key] : '235, 41, 13'
}

type Props = {
  product: ShopifyProduct
}

export default function ProductCard({ product }: Props) {
  const [isHovered, setIsHovered] = useState(false)
  const variants = getProductVariants(product)
  const firstVariant = variants[0]
  const glowColor = getFlavorColor(product)

  const imageUrl =
    product.featuredImage?.url ??
    (product.images.edges[0]?.node.url)

  const price = product.priceRange.minVariantPrice
  const compareAt = product.compareAtPriceRange?.minVariantPrice
  const hasDiscount =
    compareAt &&
    parseFloat(compareAt.amount) > parseFloat(price.amount)

  return (
    <article
      className="group relative flex flex-col bg-kliq-asphalt rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500"
        style={{
          background: `rgba(${glowColor}, 0.12)`,
          opacity: isHovered ? 1 : 0,
        }}
        aria-hidden="true"
      />

      <Link href={`/shop/${product.handle}`} className="block relative overflow-hidden bg-black/30">
        <div className="aspect-square flex items-center justify-center p-6 sm:p-8">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.featuredImage?.altText ?? product.title}
              width={400}
              height={400}
              className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full bg-white/5 rounded-2xl flex items-center justify-center">
              <span className="font-display text-2xl text-white/20">{product.title[0]}</span>
            </div>
          )}
        </div>

        {firstVariant && !firstVariant.availableForSale && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-white/10 backdrop-blur-sm text-white/60 text-xs font-body rounded-full border border-white/10">
            Sold Out
          </span>
        )}

        {hasDiscount && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-kliq-vermilion text-white text-xs font-body font-semibold rounded-full">
            SALE
          </span>
        )}
      </Link>

      <div className="relative flex flex-col flex-1 p-4 sm:p-5 gap-2 sm:gap-3">
        <div className="flex gap-1.5 flex-wrap">
          {['20g Protein', '0 Sugar', '0 Carbs'].map((badge) => (
            <span
              key={badge}
              className="px-2 py-0.5 border border-white/[0.15] rounded-full font-body text-[9px] sm:text-[10px] text-white/60 tracking-wide"
            >
              {badge}
            </span>
          ))}
        </div>

        <Link href={`/shop/${product.handle}`}>
          <h3 className="font-display text-lg sm:text-xl text-white leading-tight group-hover:text-kliq-champagne transition-colors duration-300">
            {product.title}
          </h3>
        </Link>

        {product.description && (
          <p className="font-body text-[11px] sm:text-xs text-white/65 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex flex-col">
            <span className="font-body text-base sm:text-lg font-semibold text-white">
              {formatMoney(price)}
            </span>
            {hasDiscount && compareAt && (
              <span className="font-body text-[10px] sm:text-xs text-white/70 line-through">
                {formatMoney(compareAt)}
              </span>
            )}
          </div>

          {firstVariant && (
            <AddToCartButton
              variantId={firstVariant.id}
              availableForSale={firstVariant.availableForSale}
              size="sm"
            />
          )}
        </div>
      </div>
    </article>
  )
}
