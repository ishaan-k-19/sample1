'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Truck, RotateCcw, ShieldCheck, Lock, ArrowRight } from 'lucide-react'

const trustBadges = [
  { icon: Truck,       label: 'Free Shipping',      sub: 'On orders over $50'      },
  { icon: RotateCcw,   label: '30-Day Returns',      sub: 'No questions asked'      },
  { icon: ShieldCheck, label: 'Quality Guaranteed',  sub: 'Lab-tested formula'      },
  { icon: Lock,        label: 'Secure Checkout',     sub: 'SSL encrypted payments'  },
]

const CTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden"
      aria-label="Newsletter signup and trust badges"
    >
      <div className="relative border-b border-white/[0.06]">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-kliq-vermilion/10 blur-[30px] sm:blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-kliq-vermilion/6 blur-[25px] sm:blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <div
            style={{
              transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <span className="inline-block font-body text-xs tracking-[0.3em] text-kliq-vermilion uppercase mb-4 sm:mb-5">
              Join the KLIQ Crew
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[0.9] mb-4 sm:mb-6">
              GET{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-kliq-vermilion to-kliq-vermilion-light">
                10% OFF
              </span>
              <br />YOUR FIRST ORDER
            </h2>
            <p className="font-body text-white/70 text-base sm:text-lg leading-relaxed max-w-md mb-2 sm:mb-3">
              Subscribe for early access to new flavors, exclusive drops, and member-only deals.
            </p>
            <p className="font-body text-white/65 text-xs sm:text-sm">
              No spam. Unsubscribe any time.
            </p>
          </div>

          <div
            style={{
              transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 150ms',
            }}
          >
            {submitted ? (
              <div className="flex flex-col gap-4 p-8 sm:p-10 bg-white/[0.04] border border-white/10 rounded-2xl sm:rounded-3xl text-center">
                <div className="w-14 h-14 bg-kliq-vermilion/10 rounded-full flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-7 h-7 text-kliq-vermilion" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-white">YOU&apos;RE IN!</h3>
                <p className="font-body text-sm text-white/65">
                  Check your inbox for your 10% off discount code. Welcome to the crew.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-kliq-vermilion text-white rounded-full font-body font-semibold hover:bg-kliq-vermilion-deep transition-all duration-300 hover:scale-105"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 sm:p-10 bg-white/[0.04] border border-white/10 rounded-2xl sm:rounded-3xl">
                <div>
                  <label htmlFor="cta-email" className="font-body text-xs text-white/75 uppercase tracking-widest block mb-2">
                    Email Address
                  </label>
                  <input
                    id="cta-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 font-body text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-kliq-vermilion/60 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 bg-kliq-vermilion text-white rounded-full font-body font-semibold hover:bg-kliq-vermilion-deep transition-all duration-300 hover:scale-[1.02]"
                >
                  Claim My 10% Off
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="font-body text-[10px] sm:text-[11px] text-white/60 text-center leading-relaxed">
                  By subscribing you agree to receive marketing emails from KLIQ Energy.
                  View our <Link href="/privacy" className="underline hover:text-white/60">Privacy Policy</Link>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.8s ease 400ms',
        }}
      >
        {trustBadges.map((badge, i) => {
          const Icon = badge.icon
          return (
            <div
              key={i}
              className="flex items-center gap-3 sm:gap-4"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                opacity: isVisible ? 1 : 0,
                transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${300 + i * 80}ms`,
              }}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-kliq-vermilion flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <p className="font-body text-xs sm:text-sm font-semibold text-white">{badge.label}</p>
                <p className="font-body text-[10px] sm:text-xs text-white/65">{badge.sub}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default CTA
