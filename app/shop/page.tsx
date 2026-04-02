import type { Metadata } from 'next'
import { Suspense } from 'react'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import ProductCard from '@/components/ProductCard'
import { getProducts, isShopifyConfigured } from '@/lib/shopify'
import { mockProducts } from '@/lib/mockProducts'

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Shop all KLIQ Protein Energy Drinks. 20g protein, 0 sugar, 0 carbs, 0 fats. Available in 5 flavors.',
}

// ISR — revalidate every 60 seconds
export const revalidate = 60

async function ProductGrid() {
  const products = isShopifyConfigured()
    ? await getProducts(20)
    : mockProducts

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="font-display text-4xl text-white/60">COMING SOON</p>
        <p className="font-body text-white/65 mt-3">Products are being stocked. Check back soon.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-kliq-asphalt rounded-3xl overflow-hidden border border-white/[0.06] animate-pulse"
        >
          <div className="aspect-square bg-white/5" />
          <div className="p-5 space-y-3">
            <div className="flex gap-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-5 w-16 bg-white/5 rounded-full" />
              ))}
            </div>
            <div className="h-6 bg-white/5 rounded w-3/4" />
            <div className="h-4 bg-white/5 rounded w-full" />
            <div className="h-4 bg-white/5 rounded w-2/3" />
            <div className="flex justify-between items-center pt-2">
              <div className="h-7 w-20 bg-white/5 rounded" />
              <div className="h-9 w-28 bg-white/5 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero banner */}
      <section className="relative pt-36 pb-16 px-6 overflow-hidden">
        {/* Background vermilion glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] bg-kliq-vermilion/10 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col gap-3">
            <span className="font-body text-xs tracking-[0.3em] text-kliq-vermilion uppercase">
              The Arsenal
            </span>
            <h1 className="font-display text-7xl md:text-9xl text-white leading-[0.9]">
              SHOP <span className="text-kliq-vermilion">ALL</span>
            </h1>
            <p className="font-body text-white/75 max-w-md mt-4 leading-relaxed">
              20g protein. 0 sugar. 0 carbs. 0 fats. No added caffeine.
              Five bold flavors — one mission.
            </p>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {[
              ['20g', 'Protein per can'],
              ['0g', 'Sugar'],
              ['0g', 'Carbs'],
              ['0g', 'Fats'],
              ['355ml', 'Can size'],
              ['5', 'Flavors'],
            ].map(([value, label]) => (
              <div key={label} className="flex items-baseline gap-2">
                <span className="font-display text-xl text-kliq-vermilion">{value}</span>
                <span className="font-body text-xs text-white/70 uppercase tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid />
        </Suspense>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-kliq-asphalt border border-white/[0.06] p-12 text-center">
          <div className="absolute inset-0 bg-kliq-vermilion/5 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
              CAN'T DECIDE?
            </h2>
            <p className="font-body text-white/75 mb-8 max-w-md mx-auto">
              Try the variety pack and taste all 5 flavors. Free shipping on orders over $50.
            </p>
            <a
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-kliq-vermilion text-white rounded-full font-body font-semibold hover:bg-kliq-vermilion-deep transition-all duration-300 hover:scale-105"
            >
              Try the Variety Pack
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
