'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import PackAddToCart from '@/components/PackAddToCart'

const packs = [
  {
    id: 1,
    name: '6 Pack',
    subtitle: 'Pick Your Flavor',
    cans: 6,
    pricePerCan: 3.99,
    price: 23.94,
    compareAt: null,
    badge: null,
    description: 'Six cans of your favorite flavor. Perfect for the week.',
    image: '/mixed-berry.png',
    glowColor: '107, 92, 165',
    gradient: 'from-[#6B5CA5] to-[#8B7EC8]',
    accentHex: '#6B5CA5',
    flavors: ['Mixed Berry', 'Cola', 'Memo Nade', 'Mango Pineapple'],
    tags: ['6 Cans', 'Single Flavor'],
  },
  {
    id: 2,
    name: 'Variety Pack',
    subtitle: 'Try All Flavors',
    cans: 12,
    pricePerCan: 3.49,
    price: 41.88,
    compareAt: 47.88,
    badge: 'Most Popular',
    description: 'Three cans of each flavor. Discover your favorite.',
    image: '/cola.png',
    glowColor: '235, 41, 13',
    gradient: 'from-kliq-vermilion to-kliq-vermilion-deep',
    accentHex: '#EB290D',
    flavors: ['Mixed Berry', 'Cola', 'Memo Nade', 'Mango Pineapple'],
    tags: ['12 Cans', 'All 4 Flavors', 'Save 12%'],
  },
  {
    id: 3,
    name: '24 Pack',
    subtitle: 'Bulk & Save',
    cans: 24,
    pricePerCan: 2.99,
    price: 71.76,
    compareAt: 95.76,
    badge: 'Best Value',
    description: 'Stock up and save big. Never run out of your edge.',
    image: '/mango-pineapple.png',
    glowColor: '249, 168, 37',
    gradient: 'from-[#F9A825] to-[#F57F17]',
    accentHex: '#F9A825',
    flavors: ['Choose any flavor or mix'],
    tags: ['24 Cans', 'Mix & Match', 'Save 25%'],
  },
]

const Packs = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-white overflow-hidden"
      aria-labelledby="packs-heading"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] rounded-full bg-kliq-vermilion/5 blur-[40px] sm:blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12 sm:mb-16 text-center">
          <span
            className="inline-block font-body text-xs tracking-[0.3em] text-kliq-vermilion uppercase mb-4"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            Bundle & Save
          </span>
          <h2
            id="packs-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black leading-[0.9]"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 100ms',
            }}
          >
            STOCK YOUR{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kliq-vermilion to-kliq-vermilion-light">
              ARSENAL
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {packs.map((pack, i) => (
            <div
              key={pack.id}
              className="relative group flex flex-col bg-kliq-asphalt rounded-2xl sm:rounded-3xl border border-white/[0.06] hover:border-white/[0.14] overflow-hidden transition-all duration-500 hover:-translate-y-1"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                opacity: isVisible ? 1 : 0,
                transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${200 + i * 120}ms`,
              }}
            >
              {pack.badge && (
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 px-3 py-1 bg-kliq-vermilion text-white font-body text-[10px] font-semibold tracking-widest uppercase rounded-full">
                  {pack.badge}
                </div>
              )}

              <div className="relative h-40 sm:h-52 flex items-center justify-center overflow-hidden bg-black/30">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: `radial-gradient(circle at 50% 60%, rgba(${pack.glowColor}, 0.2) 0%, transparent 70%)` }}
                />
                <div className="relative flex items-end justify-center gap-1.5 sm:gap-2">
                  {Array.from({ length: Math.min(pack.cans, 4) }).map((_, j) => (
                    <Image
                      key={j}
                      src={pack.image}
                      alt={`${pack.name} can ${j + 1}`}
                      width={60}
                      height={120}
                      className="w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                      style={{
                        height: j % 2 === 0 ? '90px' : '75px',
                        marginBottom: j % 2 === 0 ? '0' : '10px',
                        filter: `drop-shadow(0 10px 20px rgba(${pack.glowColor},0.3))`,
                        transitionDelay: `${j * 40}ms`,
                      }}
                      sizes="60px"
                    />
                  ))}
                  {pack.cans > 4 && (
                    <div
                      className="absolute bottom-2 right-2 w-8 sm:w-9 h-8 sm:h-9 rounded-full flex items-center justify-center font-display text-xs sm:text-sm text-white border border-white/20"
                      style={{ background: `rgba(${pack.glowColor}, 0.25)` }}
                    >
                      +{pack.cans - 4}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col flex-1 p-4 sm:p-6 gap-3 sm:gap-4">
                <div>
                  <p className="font-body text-[10px] tracking-[0.3em] text-white/70 uppercase mb-1">{pack.subtitle}</p>
                  <h3 className="font-display text-2xl sm:text-3xl text-white">{pack.name}</h3>
                </div>

                <p className="font-body text-xs sm:text-sm text-white/70 leading-relaxed">{pack.description}</p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {pack.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 sm:px-3 py-1 rounded-full font-body text-[9px] sm:text-[10px] tracking-wide border border-white/10 text-white/75"
                      style={{ background: `rgba(${pack.glowColor}, 0.08)` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="w-full h-px bg-white/[0.06]" />

                <div className="flex items-end justify-between mt-auto">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-2xl sm:text-3xl text-white">${pack.price.toFixed(2)}</span>
                      {pack.compareAt && (
                        <span className="font-body text-xs sm:text-sm text-white/60 line-through">${pack.compareAt.toFixed(2)}</span>
                      )}
                    </div>
                    <span className="font-body text-[10px] sm:text-xs text-white/70">${pack.pricePerCan.toFixed(2)} / can</span>
                  </div>
                  <PackAddToCart packName={pack.name} glowColor={pack.glowColor} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-8 sm:mt-12 text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 700ms',
          }}
        >
          <p className="font-body text-xs sm:text-sm text-black/65">
            Free shipping on all orders over $50 · Satisfaction guaranteed
          </p>
        </div>
      </div>
    </section>
  )
}

export default Packs
