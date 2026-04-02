'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Minus, Plus, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatMoney } from '@/lib/shopify'

export default function CartDrawer() {
  const { cart, cartLines, isOpen, isLoading, closeCart, removeItem, updateQuantity } = useCart()
  const overlayRef = useRef<HTMLDivElement>(null)

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, closeCart])

  // Lock scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={closeCart}
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-white flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,_1,_0.3,_1)]"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-black" />
            <h2 className="font-display text-xl text-black tracking-wide">
              YOUR CART
            </h2>
            {(cart?.totalQuantity ?? 0) > 0 && (
              <span className="px-2 py-0.5 bg-black text-white text-xs font-body font-semibold rounded-full">
                {cart?.totalQuantity}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-black/[0.06] text-black/60 hover:bg-black/10 hover:text-black transition-all duration-200"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
            <Loader2 className="w-8 h-8 text-black animate-spin" />
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cartLines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <div className="w-20 h-20 rounded-full bg-black/[0.04] flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-black/20" />
              </div>
              <div>
                <p className="font-display text-2xl text-black/60">EMPTY CART</p>
                <p className="font-body text-sm text-black/60 mt-1">Add some KLIQ to fuel your edge</p>
              </div>
              <button
                onClick={closeCart}
                className="mt-4 px-6 py-3 bg-black text-white rounded-full font-body font-semibold text-sm hover:bg-black/80 transition-colors duration-200"
              >
                Shop Now
              </button>
            </div>
          ) : (
            cartLines.map((line) => (
              <div
                key={line.id}
                className="flex gap-4 p-4 bg-black/[0.03] rounded-2xl border border-black/[0.07] group"
              >
                {/* Product image */}
                <div className="w-20 h-20 rounded-xl bg-black/[0.06] overflow-hidden flex items-center justify-center shrink-0">
                  {line.merchandise.image ? (
                    <Image
                      src={line.merchandise.image.url}
                      alt={line.merchandise.image.altText ?? line.merchandise.product.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain p-1"
                    />
                  ) : (
                    <div className="w-full h-full bg-black/[0.04]" />
                  )}
                </div>

                {/* Product info */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/shop/${line.merchandise.product.handle}`}
                    onClick={closeCart}
                    className="font-display text-sm text-black hover:text-black/60 transition-colors leading-tight line-clamp-2 block"
                  >
                    {line.merchandise.product.title}
                  </Link>
                  {line.merchandise.title !== 'Default Title' && (
                    <p className="font-body text-xs text-black/55 mt-0.5">{line.merchandise.title}</p>
                  )}
                  <p className="font-body text-sm font-semibold text-black mt-1">
                    {formatMoney(line.merchandise.price)}
                  </p>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-2 bg-black/[0.06] rounded-full px-1 py-1">
                      <button
                        onClick={() => updateQuantity(line.id, line.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-black/10 text-black/60 hover:text-black transition-all"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-body text-sm text-black font-medium w-6 text-center">
                        {line.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(line.id, line.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-black/10 text-black/60 hover:text-black transition-all"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(line.id)}
                      className="font-body text-xs text-black/60 hover:text-black transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Line total */}
                <div className="text-right shrink-0">
                  <p className="font-body text-sm font-semibold text-black">
                    {formatMoney(line.cost.totalAmount)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartLines.length > 0 && cart && (
          <div className="px-6 py-6 border-t border-black/10 space-y-4">
            {/* Order summary */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-body text-sm text-black/60">Subtotal</span>
                <span className="font-body text-sm text-black">
                  {formatMoney(cart.cost.subtotalAmount)}
                </span>
              </div>
              {cart.cost.totalTaxAmount && (
                <div className="flex justify-between">
                  <span className="font-body text-sm text-black/60">Tax</span>
                  <span className="font-body text-sm text-black">
                    {formatMoney(cart.cost.totalTaxAmount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-black/10">
                <span className="font-display text-base text-black">TOTAL</span>
                <span className="font-display text-base text-black">
                  {formatMoney(cart.cost.totalAmount)}
                </span>
              </div>
            </div>

            {/* Free shipping notice */}
            <p className="font-body text-xs text-black/55 text-center">
              Shipping & taxes calculated at checkout
            </p>

            {/* Checkout button */}
            <a
              href={cart.checkoutUrl}
              className="group flex items-center justify-center gap-2 w-full py-4 bg-black text-white rounded-full font-body font-semibold text-sm hover:bg-black/80 transition-all duration-300 hover:gap-3"
            >
              Checkout
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Continue shopping */}
            <button
              onClick={closeCart}
              className="w-full py-3 bg-black/[0.06] text-black/70 rounded-full font-body text-sm hover:bg-black/10 hover:text-black transition-all duration-200"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
