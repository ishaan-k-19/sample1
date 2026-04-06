'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AddToCartHome from '@/components/AddToCartHome'

gsap.registerPlugin(ScrollTrigger)

interface Product {
  id: number
  name: string
  handle: string
  flavor: string
  color: string
  gradient: string
  glowColor: string
  contentBg: string
  image: string
  description: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'Mixed Berry',
    handle: 'kliq-mixed-berry',
    flavor: 'Mixed Berry',
    color: 'text-flavor-berry',
    gradient: 'from-flavor-berry to-flavor-berry-light',
    glowColor: '107, 92, 165',
    contentBg: '#0d0a1a',
    image: '/mixed-berry.png',
    description:
      '20g protein meets a bold berry blend. Refreshing, clean, and packed with power.',
  },
  {
    id: 2,
    name: 'Cola KLIQ',
    handle: 'kliq-cola',
    flavor: 'Cola',
    color: 'text-kliq-vermilion',
    gradient: 'from-kliq-vermilion to-kliq-vermilion-deep',
    glowColor: '235, 41, 13',
    contentBg: '#1a0808',
    image: '/cola.png',
    description: 'Classic cola taste with 20g protein. Zero sugar, zero compromise.',
  },
  {
    id: 3,
    name: 'Memo Nade',
    handle: 'kliq-memo-nade',
    flavor: 'Lemonade',
    color: 'text-flavor-lemonade',
    gradient: 'from-flavor-lemonade to-flavor-lemonade-dark',
    glowColor: '124, 179, 66',
    contentBg: '#0a1a08',
    image: '/memo-nade.png',
    description: 'Zesty lemonade with a protein punch. Light, crisp, and guilt-free.',
  },
  {
    id: 4,
    name: 'Mango Pineapple',
    handle: 'kliq-mango-pineapple',
    flavor: 'Mango Pineapple',
    color: 'text-flavor-mango',
    gradient: 'from-flavor-mango to-flavor-mango-dark',
    glowColor: '249, 168, 37',
    contentBg: '#1a1508',
    image: '/mango-pineapple.png',
    description: 'Tropical mango and pineapple fused with 20g protein. Pure sunshine in a can.',
  },
]

const Products = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const slidesRef = useRef<(HTMLDivElement | null)[]>([])
  const progressRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[]
      const totalSlides = slides.length
      const numTransitions = totalSlides - 1
      const step = 1 / numTransitions
      let currentSnapSlide = 0
      let lastActiveSlide = 0

      const slideContent = slides.map(s => s.querySelector('.slide-content') as HTMLElement | null)
      const slideImages = slides.map(s => s.querySelector('.slide-image img, .slide-image .product-img-wrap') as HTMLElement | null)

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * numTransitions * 1.2}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        snap: {
          snapTo: (progress, self) => {
            const direction = self?.direction ?? 0
            const normalized = progress / step

            if (direction >= 1) {
              const nextSlide = Math.min(currentSnapSlide + 1, numTransitions)
              if (normalized >= currentSnapSlide + 0.25) currentSnapSlide = nextSlide
            } else if (direction <= -1) {
              const prevSlide = Math.max(currentSnapSlide - 1, 0)
              if (normalized <= currentSnapSlide - 0.25) currentSnapSlide = prevSlide
            }

            return Math.max(0, Math.min(1, currentSnapSlide * step))
          },
          inertia: true,
          duration: { min: 0.5, max: 0.9 },
          delay: 0.1,
          ease: 'power3.inOut',
        },
        onUpdate: (self) => {
          const progress = self.progress
          const segmentSize = 1 / numTransitions

          if (progressRef.current) {
            gsap.set(progressRef.current, { scaleY: progress })
          }

          const currentSlideIndex = Math.min(
            Math.round(progress * numTransitions),
            totalSlides - 1
          )

          for (let index = 1; index < totalSlides; index++) {
            const slide = slides[index]
            const revealStart = (index - 1) * segmentSize
            const revealEnd = index * segmentSize

            let clipPath: string
            if (progress >= revealEnd) {
              clipPath = 'polygon(0% -40%, 50% 0%, 100% -40%, 100% 100%, 0% 100%)'
            } else if (progress > revealStart) {
              const t = (progress - revealStart) / segmentSize
              const sideY = 100 - t * 140
              const tipY = Math.min(sideY + 40, 100)
              clipPath = `polygon(0% ${sideY}%, 50% ${tipY}%, 100% ${sideY}%, 100% 100%, 0% 100%)`
            } else {
              clipPath = 'polygon(0% 100%, 50% 100%, 100% 100%, 100% 100%, 0% 100%)'
            }
            gsap.set(slide, { clipPath })
          }

          if (currentSlideIndex !== lastActiveSlide) {
            // Only animate the outgoing and incoming slides, not all
            const outgoing = lastActiveSlide
            const incoming = currentSlideIndex

            if (slideContent[outgoing]) {
              gsap.to(slideContent[outgoing], {
                opacity: 0, y: 30, scale: 0.97,
                duration: 0.4, ease: 'power2.out', overwrite: true,
              })
            }
            if (slideImages[outgoing]) {
              gsap.to(slideImages[outgoing], {
                scale: 0.9, y: 40,
                duration: 0.4, ease: 'power2.out', overwrite: true,
              })
            }

            if (slideContent[incoming]) {
              gsap.to(slideContent[incoming], {
                opacity: 1, y: 0, scale: 1,
                duration: 0.4, ease: 'power2.out', overwrite: true,
              })
            }
            if (slideImages[incoming]) {
              gsap.to(slideImages[incoming], {
                scale: 1, y: 0,
                duration: 0.4, ease: 'power2.out', overwrite: true,
              })
            }

            lastActiveSlide = currentSlideIndex
          }
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      id="products"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
      aria-label="Product flavors showcase"
    >
      {products.map((product, i) => {
        const [first, last] = product.name.split(' ')
        const isFirst = i === 0

        return (
          <div
            key={product.id}
            ref={(el) => { slidesRef.current[i] = el }}
            className="absolute inset-0 flex h-full w-full"
            style={{
              zIndex: i + 1,
              backgroundColor: product.contentBg,
              clipPath: isFirst ? 'polygon(0% -40%, 50% 0%, 100% -40%, 100% 100%, 0% 100%)' : 'polygon(0% 100%, 50% 100%, 100% 100%, 100% 100%, 0% 100%)',
              willChange: 'clip-path',
            }}
          >
            {/* Left column — content */}
            <div className="relative z-10 w-full md:w-1/2 h-full">
              <div className="slide-content relative h-full flex flex-col justify-end px-6 sm:px-10 lg:px-[6vw] pb-8 sm:pb-16 lg:pb-[8vw]" style={{ opacity: isFirst ? 1 : 0 }}>
                <h2 className="mb-4 sm:mb-[2vw]">
                  <div className="overflow-hidden">
                    <span className="block font-display text-[14vw] sm:text-[12vw] md:text-[11vw] text-white leading-[0.9]">
                      {first}
                    </span>
                  </div>
                  <div className="overflow-hidden" style={{ marginTop: '-0.8vw' }}>
                    <span className={`block font-display text-[14vw] sm:text-[12vw] md:text-[11vw] leading-[0.9] ${product.color}`}>
                      {last}
                    </span>
                  </div>
                </h2>

                <div className="flex flex-col lg:flex-row lg:items-end gap-4 sm:gap-6 lg:gap-10">
                  <div className="flex-1">
                    <p className="font-body text-xs tracking-[0.2em] text-white/80 uppercase mb-2 sm:mb-3">
                      {product.flavor}
                    </p>
                    <div className={`w-10 h-[1.5px] bg-gradient-to-r ${product.gradient} mb-3 sm:mb-4`} />
                    <p className="font-body text-xs sm:text-sm text-white/85 leading-relaxed max-w-xs lg:max-w-[22vw] mb-4 sm:mb-5">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5 lg:mb-0">
                      {['20g Protein', '0 Sugar', '0 Carbs', '0 Fats'].map((tag, j) => (
                        <span
                          key={j}
                          className="px-2.5 sm:px-3 py-1 border border-white/30 rounded-full font-body text-[9px] sm:text-[10px] text-white/80 tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <AddToCartHome handle={product.handle} />
                </div>
              </div>
            </div>

            {/* Right column — image with glow */}
            <div className="slide-image absolute inset-0 md:relative md:w-1/2 overflow-hidden">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full blur-[80px] sm:blur-[120px] pointer-events-none"
                style={{ background: `rgba(${product.glowColor}, 0.15)` }}
              />
              <div className="absolute inset-0 flex items-start pt-[20%] md:items-center md:pt-0 justify-center pl-[20%] pr-[5%] md:pl-0 md:pr-0 product-img-wrap">
                <Image
                  src={product.image}
                  alt={`${product.name} KLIQ Energy Drink`}
                  width={400}
                  height={600}
                  className="h-[50vh] md:h-[70vh] w-auto object-contain max-w-none"
                  style={{
                    filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.5))',
                    transform: isFirst ? 'scale(1)' : 'scale(0.85)',
                  }}
                  sizes="(max-width: 768px) 80vw, 50vw"
                  priority={i === 0}
                />
              </div>
            </div>
          </div>
        )
      })}

      {/* Scroll progress indicator */}
      <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-50 pointer-events-none">
        <div className="w-[2px] h-16 sm:h-24 bg-white/10 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="w-full h-full bg-gradient-to-b from-kliq-vermilion via-flavor-berry to-flavor-mango origin-top"
            style={{ transform: 'scaleY(0)' }}
          />
        </div>
        <span className="font-body text-[9px] sm:text-[10px] tracking-widest text-white/60 uppercase">
          Scroll
        </span>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-50 pointer-events-none">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-6 sm:w-8 h-1 rounded-full transition-all duration-300"
            style={{ backgroundColor: `rgba(${product.glowColor}, 0.3)` }}
          />
        ))}
      </div>
    </section>
  )
}

export default Products
