import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { ChevronLeft, Star, Zap, Droplets, Flame, Leaf, Award, Truck, RotateCcw, Lock } from 'lucide-react'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import ProductCard from '@/components/ProductCard'
import ProductGallery from './ProductGallery'
import ProductForm from './ProductForm'
import {
  getProduct,
  getProducts,
  getProductRecommendations,
  getProductVariants,
  getProductImages,
  getAllProductHandles,
  isShopifyConfigured,
  formatMoney,
  type ShopifyProduct,
} from '@/lib/shopify'
import { mockProducts, getMockProduct, mockProductHandles } from '@/lib/mockProducts'

// ─── Static generation ────────────────────────────────────────────────────────
// Pre-renders a dedicated page for every product in the Shopify store at build time

export async function generateStaticParams() {
  if (!isShopifyConfigured()) {
    return mockProductHandles.map((handle) => ({ handle }))
  }
  const handles = await getAllProductHandles()
  return handles.map((handle) => ({ handle }))
}

export const revalidate = 3600 // re-validate hourly (ISR fallback for new products)
export const dynamicParams = true // allow new products added after build

// ─── Flavor theme ─────────────────────────────────────────────────────────────
// Priority: 1) Shopify metafield (kliq.flavor_color_rgb)
//           2) Keyword match on tags/handle
// Adding a new flavor = set the metafield in Shopify admin, no code changes needed.

type FlavorTheme = {
  rgb: string
  hex: string
  label: string
}

function rgbToHex(rgb: string): string {
  const [r, g, b] = rgb.split(',').map((n) => parseInt(n.trim()))
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')
}

function getFlavorTheme(product: { tags: string[]; flavorColorRgb?: { value: string } | null }): FlavorTheme {
  // 1. Metafield — client sets this in Shopify for any flavor, current or future
  if (product.flavorColorRgb?.value) {
    const rgb = product.flavorColorRgb.value
    const flavorTag = product.tags.find((t) => t.toLowerCase().startsWith('flavor-'))
    const label = flavorTag ? flavorTag.replace('flavor-', '').replace(/-/g, ' ') : 'Energy'
    return { rgb, hex: rgbToHex(rgb), label }
  }

  // 2. Keyword fallback for existing flavors
  const t = product.tags.join(' ').toLowerCase()
  if (t.includes('berry'))                        return { rgb: '107, 92, 165',  hex: '#6B5CA5', label: 'Mixed Berry'    }
  if (t.includes('cola'))                         return { rgb: '235, 41, 13',   hex: '#EB290D', label: 'Cola'           }
  if (t.includes('lemon') || t.includes('memo'))  return { rgb: '124, 179, 66',  hex: '#7CB342', label: 'Lemonade'       }
  if (t.includes('mango'))                        return { rgb: '249, 168, 37',  hex: '#F9A825', label: 'Mango Pineapple'}
  return                                                 { rgb: '235, 41, 13',   hex: '#EB290D', label: 'Energy'         }
}

// ─── Nutrition — read from Shopify tags, fallback to KLIQ brand defaults ──────
// Tag format: "protein-20g", "sugar-0g", "calories-100", "size-355ml"

type NutritionFact = { label: string; value: string; unit: string }

function getNutritionFromTags(tags: string[]): NutritionFact[] {
  const find = (prefix: string, fallback: string) => {
    const tag = tags.find((t) => t.toLowerCase().startsWith(prefix + '-'))
    return tag ? tag.slice(prefix.length + 1) : fallback
  }
  return [
    { label: 'Calories',        value: find('calories', '100'),    unit: 'kcal' },
    { label: 'Protein',         value: find('protein',  '20'),     unit: 'g'    },
    { label: 'Total Fat',       value: find('fats',     '0'),      unit: 'g'    },
    { label: 'Total Carbs',     value: find('carbs',    '0'),      unit: 'g'    },
    { label: 'Sugars',          value: find('sugar',    '0'),      unit: 'g'    },
    { label: 'Added Caffeine',  value: find('caffeine', 'None'),   unit: ''     },
    { label: 'Serving Size',    value: find('size',     '355'),    unit: 'ml'   },
  ]
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ handle: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const product = isShopifyConfigured()
    ? await getProduct(handle)
    : getMockProduct(handle)
  if (!product) return { title: 'Product Not Found' }
  const theme = getFlavorTheme(product)
  return {
    title: product.seo.title ?? `${product.title} — KLIQ Energy`,
    description:
      product.seo.description ??
      `${product.title} by KLIQ Energy. ${product.description || `20g protein, 0 sugar, ${theme.label} flavor.`}`,
    openGraph: {
      images: product.featuredImage ? [{ url: product.featuredImage.url }] : [],
    },
  }
}

// ─── Related products ─────────────────────────────────────────────────────────

async function RelatedProducts({ productId, currentHandle }: { productId: string; currentHandle: string }) {
  let related: ShopifyProduct[]
  if (!isShopifyConfigured()) {
    related = mockProducts.filter((p) => p.handle !== currentHandle).slice(0, 4)
  } else {
    related = await getProductRecommendations(productId)
    if (!related.length) {
      const all = await getProducts(8)
      related = all.filter((p) => p.handle !== currentHandle).slice(0, 4)
    } else {
      related = related.slice(0, 4)
    }
  }
  if (!related.length) return null

  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      <div className="flex items-baseline justify-between mb-10">
        <h2 className="font-display text-5xl text-white">YOU MAY ALSO LIKE</h2>
        <Link href="/shop" className="font-body text-sm text-white/65 hover:text-white transition-colors">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}

// ─── Stat icon helper ─────────────────────────────────────────────────────────

function NutritionIcon({ label }: { label: string }) {
  const l = label.toLowerCase()
  if (l.includes('protein'))  return <Zap className="w-5 h-5" />
  if (l.includes('fat'))      return <Droplets className="w-5 h-5" />
  if (l.includes('calor'))    return <Flame className="w-5 h-5" />
  if (l.includes('sugar') || l.includes('carb')) return <Leaf className="w-5 h-5" />
  return <Award className="w-5 h-5" />
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductPage({ params }: Props) {
  const { handle } = await params

  const product = isShopifyConfigured()
    ? await getProduct(handle)
    : getMockProduct(handle)

  if (!product) notFound()

  const variants  = getProductVariants(product)
  const images    = getProductImages(product)
  const theme     = getFlavorTheme(product)
  const nutrition = getNutritionFromTags(product.tags)
  const price     = product.priceRange.minVariantPrice
  const compareAt = product.compareAtPriceRange?.minVariantPrice
  const hasDiscount = compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount)

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Flavor glow — large ambient orb behind the can */}
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none opacity-20"
          style={{ background: `radial-gradient(circle, rgba(${theme.rgb},0.8), transparent 70%)` }}
        />
        {/* Second subtler glow */}
        <div
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-10"
          style={{ background: `rgba(${theme.rgb}, 1)` }}
        />

        {/* Breadcrumb */}
        <div className="relative z-10 pt-28 pb-0 px-6 max-w-7xl mx-auto w-full">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-body text-sm text-white/70 hover:text-white transition-colors duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
            All Products
          </Link>
        </div>

        {/* Main hero layout */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-12">
          <div className="grid lg:grid-cols-2 gap-8 xl:gap-16 w-full items-start">

            {/* ─ LEFT: Info + form ─ */}
            <div className="flex flex-col order-2 lg:order-1">
              {/* Flavor label from Shopify tags */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: theme.hex }}
                />
                <span
                  className="font-body text-xs tracking-[0.3em] uppercase font-semibold"
                  style={{ color: theme.hex }}
                >
                  {theme.label} Flavor
                </span>
                {hasDiscount && (
                  <span className="px-2.5 py-1 bg-kliq-vermilion text-white text-[10px] font-semibold rounded-full tracking-wide">
                    ON SALE
                  </span>
                )}
              </div>

              {/* Product title from Shopify */}
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[0.9] mb-6">
                {product.title}
              </h1>

              {/* Description from Shopify */}
              {product.description && (
                <p className="font-body text-white/75 text-base leading-relaxed mb-8 max-w-md">
                  {product.description}
                </p>
              )}

              {/* Quick macro strip — from tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['20g Protein', '0 Sugar', '0 Carbs', '0 Fats', 'No Caffeine'].map((stat) => (
                  <span
                    key={stat}
                    className="px-3 py-1 rounded-full font-body text-[11px] text-white/80 border border-white/20 bg-white/[0.06]"
                  >
                    {stat}
                  </span>
                ))}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-display text-4xl text-white">{formatMoney(price)}</span>
                {hasDiscount && compareAt && (
                  <span className="font-body text-xl text-white/70 line-through">{formatMoney(compareAt)}</span>
                )}
              </div>

              {/* Variant + quantity + Add to Cart */}
              <ProductForm variants={variants} flavorHex={theme.hex} flavorRgb={theme.rgb} />

              {/* Trust row */}
              <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-white/[0.06]">
                {[
                  { icon: Truck,      text: 'Free shipping over $50' },
                  { icon: RotateCcw,  text: '30-day returns'         },
                  { icon: Lock,       text: 'Secure checkout'        },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `rgba(${theme.rgb}, 1)` }}
                    >
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="font-body text-xs text-white/75">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ─ RIGHT: Gallery ─ */}
            <div className="order-1 lg:order-2">
              <ProductGallery images={images} title={product.title} flavorRgb={theme.rgb} />
            </div>
          </div>
        </div>
      </section>

      {/* ── NUTRITION FACTS ──────────────────────────────────────────────────── */}
      <section className="relative border-t border-white/[0.06] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ background: `linear-gradient(135deg, rgba(${theme.rgb},1) 0%, transparent 60%)` }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: FDA-style nutrition panel */}
            <div>
              <span
                className="font-body text-xs tracking-[0.3em] uppercase font-semibold block mb-4"
                style={{ color: theme.hex }}
              >
                Nutrition Facts
              </span>
              <h2 className="font-display text-5xl text-white mb-8">WHAT'S IN THE CAN</h2>

              {/* Panel */}
              <div className="border-2 border-white/20 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-white/[0.04] px-6 py-4 border-b-4 border-white/20">
                  <p className="font-display text-2xl text-white">Nutrition Facts</p>
                  <p className="font-body text-sm text-white/70 mt-1">
                    Serving size 1 can (355ml)
                  </p>
                </div>

                {/* Calories row */}
                <div className="px-6 py-4 border-b-4 border-white/20 flex items-end justify-between">
                  <div>
                    <p className="font-body text-xs text-white/75">Amount per serving</p>
                    <p className="font-display text-4xl text-white">
                      {nutrition.find((n) => n.label === 'Calories')?.value ?? '100'}
                    </p>
                    <p className="font-body text-xs text-white/75 mt-0.5">Calories</p>
                  </div>
                </div>

                {/* Macro rows */}
                <div className="divide-y divide-white/[0.06]">
                  {nutrition.filter((n) => n.label !== 'Calories' && n.label !== 'Serving Size').map((fact) => {
                    const isHighlight = fact.label === 'Protein'
                    return (
                      <div
                        key={fact.label}
                        className={`flex items-center justify-between px-6 py-3 ${isHighlight ? 'bg-white/[0.03]' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <span style={{ color: isHighlight ? theme.hex : undefined }} className={isHighlight ? '' : 'text-white/70'}>
                            <NutritionIcon label={fact.label} />
                          </span>
                          <span className={`font-body text-sm ${isHighlight ? 'text-white font-semibold' : 'text-white/80'}`}>
                            {fact.label}
                          </span>
                        </div>
                        <span
                          className={`font-display text-base ${isHighlight ? 'text-white' : 'text-white/80'}`}
                          style={isHighlight ? { color: theme.hex } : undefined}
                        >
                          {fact.value}{fact.unit}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-white/[0.02] border-t border-white/[0.06]">
                  <p className="font-body text-[10px] text-white/65 leading-relaxed">
                    * Percent Daily Values are based on a 2,000 calorie diet. No added caffeine.
                    Contains milk (whey). Allergen info on the can.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Key benefit cards */}
            <div>
              <span
                className="font-body text-xs tracking-[0.3em] uppercase font-semibold block mb-4"
                style={{ color: theme.hex }}
              >
                Why KLIQ
              </span>
              <h2 className="font-display text-5xl text-white mb-8">BUILT DIFFERENT</h2>
              <div className="space-y-4">
                {[
                  {
                    stat: '20g',
                    label: 'Whey Protein Isolate',
                    desc: 'The cleanest, fastest-absorbing protein source — every can delivers a full post-workout dose.',
                  },
                  {
                    stat: '0g',
                    label: 'Sugar, Carbs & Fats',
                    desc: 'Zero sugar crash. Zero empty calories. Just protein and flavor — nothing hidden on the label.',
                  },
                  {
                    stat: '0mg',
                    label: 'Added Caffeine',
                    desc: 'Drink it morning, noon, or night. No artificial stimulants — clean energy from protein alone.',
                  },
                  {
                    stat: '355ml',
                    label: 'Full-Size Can',
                    desc: 'Not a tiny shot. A full 355ml carbonated can — the same size as any premium energy drink.',
                  },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="flex gap-5 p-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl hover:border-white/10 transition-colors duration-300"
                  >
                    <div
                      className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-display text-xl"
                      style={{ background: `rgba(${theme.rgb}, 0.12)`, color: theme.hex }}
                    >
                      {card.stat}
                    </div>
                    <div>
                      <p className="font-display text-base text-white mb-1">{card.label}</p>
                      <p className="font-body text-xs text-white/80 leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT DETAILS (description HTML from Shopify) ──────────────────── */}
      {product.descriptionHtml && product.descriptionHtml.length > 50 && (
        <section className="border-t border-white/[0.06]">
          <div className="max-w-3xl mx-auto px-6 py-20">
            <span
              className="font-body text-xs tracking-[0.3em] uppercase font-semibold block mb-4"
              style={{ color: theme.hex }}
            >
              About This Product
            </span>
            <h2 className="font-display text-5xl text-white mb-8">THE DETAILS</h2>
            <div
              className="font-body text-white/75 leading-relaxed prose-headings:font-display prose-headings:text-white prose-strong:text-white prose-a:text-kliq-vermilion"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>
        </section>
      )}

      {/* ── INGREDIENTS ──────────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Ingredients */}
            <div className="lg:col-span-2 p-8 bg-kliq-asphalt rounded-3xl border border-white/[0.06]">
              <h3 className="font-display text-2xl text-white mb-6">INGREDIENTS</h3>

              {/* Full ingredient list */}
              <p className="font-body text-sm text-white/75 leading-relaxed mb-6">
                Carbonated Water, Whey Protein Isolate, Natural Flavors, Citric Acid,
                Sucralose, Potassium Citrate, Sodium Chloride, Calcium Phosphate,
                Magnesium Chloride, Zinc Gluconate, Vitamin B6 (Pyridoxine Hydrochloride),
                Vitamin B12 (Cyanocobalamin).
              </p>

              {/* Key ingredient callouts */}
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {[
                  {
                    name: 'Whey Protein Isolate',
                    detail: 'Fast-absorbing, high-bioavailability protein with all essential amino acids. The cleanest form of whey — minimal fat and lactose.',
                  },
                  {
                    name: 'Natural Flavors',
                    detail: 'Derived entirely from natural fruit and botanical sources. No artificial dyes, no synthetic additives.',
                  },
                  {
                    name: 'Sucralose',
                    detail: 'Zero-calorie sweetener that delivers bold taste without spiking blood sugar. Safe, extensively studied, FDA-approved.',
                  },
                ].map((item) => (
                  <div key={item.name} className="p-4 bg-white/[0.04] rounded-2xl border border-white/[0.06]">
                    <p className="font-body text-xs font-semibold text-kliq-vermilion uppercase tracking-wide mb-2">{item.name}</p>
                    <p className="font-body text-xs text-white/80 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>

              {/* Allergen + facility notice */}
              <div className="flex flex-col gap-2 pt-5 border-t border-white/[0.06]">
                <p className="font-body text-xs text-white/75">
                  <span className="font-semibold text-white">Contains:</span> Milk (whey protein isolate).
                </p>
                <p className="font-body text-xs text-white/70">
                  Manufactured in a facility that also processes soy, eggs, and tree nuts. Not suitable for individuals with severe dairy allergies.
                </p>
              </div>
            </div>

            {/* Storage */}
            <div className="flex flex-col gap-4">
              <div className="flex-1 p-6 bg-kliq-asphalt rounded-3xl border border-white/[0.06]">
                <h3 className="font-display text-lg text-white mb-2">STORAGE</h3>
                <p className="font-body text-sm text-white/80">
                  Best served chilled. Store in a cool, dry place away from direct sunlight.
                  Consume within 24 hours of opening.
                </p>
              </div>
              <div
                className="p-6 rounded-3xl"
                style={{ background: `rgba(${theme.rgb}, 0.08)`, border: `1px solid rgba(${theme.rgb}, 0.2)` }}
              >
                <p className="font-display text-sm mb-1" style={{ color: theme.hex }}>PRO TIP</p>
                <p className="font-body text-sm text-white/75">
                  Stack with your training for best results. 20g protein pre or post-workout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS PLACEHOLDER ──────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-display text-5xl text-white">REVIEWS</h2>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-body text-sm text-white/80">4.9 · 2,400+ reviews</span>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: 'Jordan M.', rating: 5, flavor: theme.label, text: `The ${theme.label} flavor is insane. Actually tastes like a real drink, not a supplement. 20g protein is a game changer.` },
              { name: 'Alex K.', rating: 5, flavor: theme.label, text: 'Finally a protein drink I can have at work without people asking if I\'m eating chalk. Zero sugar, tastes incredible.' },
              { name: 'Sam R.', rating: 5, flavor: theme.label, text: 'Replaced my afternoon coffee with KLIQ. No caffeine crash, way more protein. My recovery has been noticeably better.' },
            ].map((review, i) => (
              <div
                key={i}
                className="p-6 bg-kliq-asphalt rounded-2xl border border-white/[0.06]"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="font-body text-sm text-white/80 leading-relaxed mb-4">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center font-display text-xs text-white"
                    style={{ background: `rgba(${theme.rgb}, 0.3)` }}
                  >
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-body text-xs text-white font-medium">{review.name}</p>
                    <p className="font-body text-[10px] text-white/60">Verified buyer · {review.flavor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED PRODUCTS ─────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06]">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-6 py-24">
              <div className="h-8 w-64 bg-white/5 rounded animate-pulse mb-10" />
              <div className="grid grid-cols-4 gap-6">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="aspect-square bg-white/5 rounded-3xl animate-pulse" />
                ))}
              </div>
            </div>
          }
        >
          <RelatedProducts productId={product.id} currentHandle={handle} />
        </Suspense>
      </section>

      <Footer />
    </div>
  )
}
