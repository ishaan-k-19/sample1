'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'

const navLinks = [
  { name: 'Shop',    href: '/shop'    },
  { name: 'Story',   href: '/about'   },
  { name: 'FAQ',     href: '/faq'     },
  { name: 'Contact', href: '/contact' },
]

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { totalQuantity } = useCart()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${isScrolled ? 'pt-3' : 'pt-4'}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className={`
            flex items-center justify-between gap-4
            bg-white/95 backdrop-blur-xl border border-black/[0.06] rounded-full
            transition-all duration-500 ease-[cubic-bezier(0.16,_1,_0.3,_1)]
            ${isScrolled
              ? 'w-[calc(100%-2rem)] max-w-3xl px-4 sm:px-5 py-2.5 shadow-xl'
              : 'w-[calc(100%-2rem)] max-w-5xl px-4 sm:px-6 py-3 sm:py-3.5 shadow-md'
            }
          `}
        >
          <Link href="/" className="shrink-0" aria-label="KLIQ Energy home">
            <img
              src="/Website Logos/BLACK(1).png"
              alt="KLIQ Energy"
              className="h-7 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`
                    relative font-body text-sm font-medium tracking-wide
                    transition-colors duration-200 group
                    ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                  <span className={`
                    absolute -bottom-0.5 left-0 h-0.5 bg-kliq-vermilion
                    transition-all duration-300
                    ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
                  `} />
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="relative w-9 h-9 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition-colors duration-200"
              aria-label={`Cart${totalQuantity > 0 ? `, ${totalQuantity} items` : ''}`}
            >
              <ShoppingCart className="w-4 h-4" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-kliq-vermilion text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                  {totalQuantity > 9 ? '9+' : totalQuantity}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-black/5 text-black hover:bg-black/10 transition-colors duration-200"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-black flex flex-col items-center justify-center transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        aria-hidden={!isMenuOpen}
      >
        <Link href="/" onClick={closeMenu} className="mb-10" aria-label="KLIQ Energy home">
          <img
            src="/Website Logos/WHITE.png"
            alt="KLIQ Energy"
            className="h-10 w-auto"
          />
        </Link>

        <nav className="flex flex-col items-center gap-6" aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className="font-display text-4xl sm:text-5xl text-white hover:text-kliq-vermilion transition-colors duration-300"
              style={{
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMenuOpen ? 1 : 0,
                transition: `transform 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 70 + 100}ms, opacity 0.4s ease ${i * 70 + 100}ms`,
              }}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default Navigation
