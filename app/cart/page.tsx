'use client'

import Link from 'next/link'
import { Minus, Plus, X, ShoppingBag, ArrowRight, Loader2, Truck, RotateCcw, ShieldCheck } from 'lucide-react'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import { useCart } from '@/context/CartContext'
import { formatMoney } from '@/lib/shopify'

export default function CartPage() {
  const { cart, cartLines, isLoading, removeItem, updateQuantity } = useCart()

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-10 px-6 border-b border-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="font-body text-xs tracking-[0.3em] text-black/60 uppercase block mb-3">
                Review &amp; Checkout
              </span>
              <h1 className="font-display text-7xl md:text-9xl text-black leading-[0.9]">
                YOUR <span className="text-black/15">CART</span>
              </h1>
            </div>
            {(cart?.totalQuantity ?? 0) > 0 && (
              <span className="font-display text-2xl text-black/50">
                {cart?.totalQuantity} {cart?.totalQuantity === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── MAIN ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        {/* Loading overlay */}
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <Loader2 className="w-10 h-10 text-black animate-spin" />
          </div>
        )}

        {cartLines.length === 0 ? (

          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center py-32 text-center gap-8">
            <div className="w-28 h-28 rounded-full border-2 border-black/10 flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-black/20" />
            </div>
            <div>
              <p className="font-display text-5xl text-black mb-3">NOTHING HERE</p>
              <p className="font-body text-black/60 max-w-sm">
                Your cart is empty. Head to the shop and load up on KLIQ.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-10 py-4 bg-black text-white rounded-full font-body font-semibold hover:bg-black/80 transition-all duration-300 hover:scale-105"
            >
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        ) : (

          /* ── Cart layout ── */
          <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">

            {/* ─ LEFT: Line items ─ */}
            <div className="space-y-0">

              {/* Column headers */}
              <div className="hidden md:grid grid-cols-[1fr_auto_auto] gap-6 pb-4 border-b border-black/10">
                <span className="font-body text-xs tracking-[0.2em] text-black/60 uppercase">Product</span>
                <span className="font-body text-xs tracking-[0.2em] text-black/60 uppercase text-center w-28">Quantity</span>
                <span className="font-body text-xs tracking-[0.2em] text-black/60 uppercase text-right w-20">Total</span>
              </div>

              {/* Items */}
              {cartLines.map((line) => (
                <div
                  key={line.id}
                  className="grid md:grid-cols-[1fr_auto_auto] gap-6 items-center py-7 border-b border-black/[0.07]"
                >
                  {/* Product info */}
                  <div className="flex gap-5 items-center">
                    {/* Image */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-black/[0.04] border border-black/[0.08] overflow-hidden flex items-center justify-center shrink-0">
                      {line.merchandise.image ? (
                        <img
                          src={line.merchandise.image.url}
                          alt={line.merchandise.image.altText ?? line.merchandise.product.title}
                          className="w-full h-full object-contain p-2"
                        />
                      ) : (
                        <ShoppingBag className="w-8 h-8 text-black/20" />
                      )}
                    </div>

                    {/* Details */}
                    <div className="min-w-0">
                      <Link
                        href={`/shop/${line.merchandise.product.handle}`}
                        className="font-display text-xl md:text-2xl text-black hover:text-black/60 transition-colors leading-tight block"
                      >
                        {line.merchandise.product.title}
                      </Link>
                      {line.merchandise.title !== 'Default Title' && (
                        <p className="font-body text-sm text-black/65 mt-1">{line.merchandise.title}</p>
                      )}
                      <p className="font-body text-sm text-black/65 mt-1">
                        {formatMoney(line.merchandise.price)} each
                      </p>

                      {/* Mobile: qty + remove */}
                      <div className="flex items-center gap-4 mt-3 md:hidden">
                        <QuantityControl
                          lineId={line.id}
                          quantity={line.quantity}
                          onUpdate={updateQuantity}
                        />
                        <button
                          onClick={() => removeItem(line.id)}
                          className="font-body text-xs text-black/60 hover:text-black transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Desktop: quantity control */}
                  <div className="hidden md:flex items-center gap-3 justify-center w-28">
                    <QuantityControl
                      lineId={line.id}
                      quantity={line.quantity}
                      onUpdate={updateQuantity}
                    />
                  </div>

                  {/* Desktop: line total + remove */}
                  <div className="hidden md:flex flex-col items-end gap-2 w-20">
                    <span className="font-display text-lg text-black">
                      {formatMoney(line.cost.totalAmount)}
                    </span>
                    <button
                      onClick={() => removeItem(line.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-black/[0.06] text-black/60 hover:bg-black/15 hover:text-black transition-all duration-200"
                      aria-label="Remove item"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Continue shopping */}
              <div className="pt-6">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 font-body text-sm text-black/60 hover:text-black transition-colors duration-200"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* ─ RIGHT: Order summary ─ */}
            <div className="lg:sticky lg:top-28">
              <div className="rounded-3xl border border-black/10 bg-black/[0.02] overflow-hidden">

                {/* Summary header */}
                <div className="px-8 py-6 border-b border-black/10">
                  <h2 className="font-display text-2xl text-black">ORDER SUMMARY</h2>
                </div>

                {/* Line totals */}
                <div className="px-8 py-6 space-y-4 border-b border-black/10">
                  {cartLines.map((line) => (
                    <div key={line.id} className="flex justify-between items-start gap-4">
                      <div className="min-w-0">
                        <p className="font-body text-sm text-black leading-tight truncate">
                          {line.merchandise.product.title}
                        </p>
                        {line.merchandise.title !== 'Default Title' && (
                          <p className="font-body text-xs text-black/60">{line.merchandise.title}</p>
                        )}
                        <p className="font-body text-xs text-black/60 mt-0.5">×{line.quantity}</p>
                      </div>
                      <span className="font-body text-sm text-black shrink-0">
                        {formatMoney(line.cost.totalAmount)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                {cart && (
                  <div className="px-8 py-6 space-y-3 border-b border-black/10">
                    <div className="flex justify-between">
                      <span className="font-body text-sm text-black/55">Subtotal</span>
                      <span className="font-body text-sm text-black">{formatMoney(cart.cost.subtotalAmount)}</span>
                    </div>
                    {cart.cost.totalTaxAmount && (
                      <div className="flex justify-between">
                        <span className="font-body text-sm text-black/55">Tax</span>
                        <span className="font-body text-sm text-black">{formatMoney(cart.cost.totalTaxAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-3 border-t border-black/10">
                      <span className="font-display text-lg text-black">TOTAL</span>
                      <span className="font-display text-lg text-black">{formatMoney(cart.cost.totalAmount)}</span>
                    </div>
                    <p className="font-body text-[11px] text-black/55 text-center pt-1">
                      Shipping calculated at checkout
                    </p>
                  </div>
                )}

                {/* Checkout CTA */}
                <div className="px-8 py-6">
                  {cart && (
                    <a
                      href={cart.checkoutUrl}
                      className="group flex items-center justify-center gap-2 w-full py-4 bg-black text-white rounded-full font-body font-semibold hover:bg-black/80 transition-all duration-300 hover:gap-3"
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  )}
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { icon: Truck,       label: 'Free shipping', sub: 'Over $50'    },
                  { icon: RotateCcw,   label: '30-day returns', sub: 'No questions' },
                  { icon: ShieldCheck, label: 'Secure payment', sub: 'SSL encrypted' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-black/[0.03] border border-black/[0.07] text-center">
                    <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-body text-[11px] font-semibold text-black leading-tight">{label}</p>
                      <p className="font-body text-[10px] text-black/60 leading-tight">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}

// ── Quantity stepper ──────────────────────────────────────────────────────────

function QuantityControl({
  lineId,
  quantity,
  onUpdate,
}: {
  lineId: string
  quantity: number
  onUpdate: (lineId: string, quantity: number) => Promise<void>
}) {
  return (
    <div className="flex items-center gap-1 border border-black/15 rounded-full px-1 py-1">
      <button
        onClick={() => onUpdate(lineId, quantity - 1)}
        className="w-7 h-7 flex items-center justify-center rounded-full text-black/60 hover:bg-black/10 hover:text-black transition-all duration-200"
        aria-label="Decrease quantity"
      >
        <Minus className="w-3 h-3" />
      </button>
      <span className="font-body text-sm text-black font-medium w-7 text-center select-none">
        {quantity}
      </span>
      <button
        onClick={() => onUpdate(lineId, quantity + 1)}
        className="w-7 h-7 flex items-center justify-center rounded-full text-black/60 hover:bg-black/10 hover:text-black transition-all duration-200"
        aria-label="Increase quantity"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  )
}
