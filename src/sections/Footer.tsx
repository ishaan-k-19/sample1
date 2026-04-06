'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import { Instagram, Twitter, Youtube, Facebook, ArrowUp } from 'lucide-react'

const footerLinks = {
  products: [
    { name: 'Mixed Berry', href: '/shop' },
    { name: 'Cola', href: '/shop' },
    { name: 'Memo Nade', href: '/shop' },
    { name: 'Mango Pineapple', href: '/shop' },
    { name: 'Lemonade', href: '/shop' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ],
  support: [
    { name: 'Shipping Policy', href: '/shipping' },
    { name: 'Returns & Refunds', href: '/returns' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faq' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
}

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter / X' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Facebook, href: '#', label: 'Facebook' },
]

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.05 }
    )
    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} className="relative bg-black overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none" aria-hidden="true">
        <span
          className="font-display text-[15vw] sm:text-[20vw] text-white/[0.03] whitespace-nowrap select-none"
          style={{
            transform: isVisible ? 'translateX(0)' : 'translateX(-100px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 1.5s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          KLIQ
        </span>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-12">
            <div
              className="col-span-2"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <Link href="/" className="flex items-center mb-6" aria-label="KLIQ Energy home">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Website Logos/WHITE.png"
                  alt="KLIQ Energy"
                  className="h-8 sm:h-10 w-auto"
                />
              </Link>
              <p className="font-body text-sm text-white/70 mb-2 max-w-xs leading-relaxed">
                Protein Energy Drink. 20g protein, zero sugar, zero carbs, zero fats.
              </p>
              <p className="font-body text-kliq-vermilion text-sm font-medium mb-6">
                Fuel Your Edge.
              </p>

              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-white/[0.06] rounded-full flex items-center justify-center text-white/65 hover:bg-kliq-vermilion hover:text-white transition-all duration-300"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  )
                })}
              </div>
            </div>

            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <div
                key={category}
                style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                  opacity: isVisible ? 1 : 0,
                  transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${100 + categoryIndex * 100}ms`,
                }}
              >
                <h4 className="font-display text-xs sm:text-sm text-white mb-3 sm:mb-4 uppercase tracking-widest">
                  {category}
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="font-body text-xs sm:text-sm text-white/75 hover:text-white transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-white/70">
              &copy; {new Date().getFullYear()} KLIQ Energy. All rights reserved.
            </p>

            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex gap-3 sm:gap-4">
                <Link href="/privacy" className="font-body text-xs text-white/70 hover:text-white transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="font-body text-xs text-white/70 hover:text-white transition-colors">
                  Terms
                </Link>
                <Link href="/cookies" className="font-body text-xs text-white/70 hover:text-white transition-colors">
                  Cookies
                </Link>
              </div>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/[0.06] rounded-full text-white/75 hover:bg-white/10 hover:text-white transition-all duration-300"
                aria-label="Back to top"
              >
                <ArrowUp className="w-4 h-4" />
                <span className="font-body text-xs">Top</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
