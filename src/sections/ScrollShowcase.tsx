'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { canSpinState, canAnimState } from '../components/PersistentCan'

gsap.registerPlugin(ScrollTrigger)

interface StorySlide {
  number: string
  label: string
  title: string
  highlight: string
  description: string
  tags: string[]
  mobileImage: string
  mobileImageW: number
  mobileImageH: number
}

const storySlides: StorySlide[] = [
  {
    number: '01',
    label: 'THE PROTEIN',
    title: '20G',
    highlight: 'PROTEIN',
    description: '20 grams of high-quality protein in every 355ml can. No added caffeine — just clean, sustained power from real nutrition.',
    tags: ['20g Protein', 'No Caffeine'],
    mobileImage: '/20g.png',
    mobileImageW: 284,
    mobileImageH: 452,
  },
  {
    number: '02',
    label: 'THE CLEAN',
    title: 'ZERO',
    highlight: 'SUGAR',
    description: 'Zero sugar, zero carbs, zero fats. We engineered the taste without compromise — bold, refreshing, guilt-free.',
    tags: ['0 Sugar', '0 Carbs', '0 Fats'],
    mobileImage: '/label.png',
    mobileImageW: 650,
    mobileImageH: 456,
  },
  {
    number: '03',
    label: 'THE EDGE',
    title: 'FUEL',
    highlight: 'YOUR EDGE',
    description: 'Not just energy. Not just protein. A performance lifestyle beverage. From the gym to the grind — KLIQ delivers.',
    tags: ['5 Flavors', 'Clean Formula', 'Performance'],
    mobileImage: '/full-can.png',
    mobileImageW: 284,
    mobileImageH: 756,
  },
]

const SLIDE_ANGLES = [
  -(260 * Math.PI / 180),
  -(80 * Math.PI / 180),
  (100 * Math.PI / 180),
]

const NUM_SLIDES = storySlides.length
const TRANSITIONS = NUM_SLIDES - 1

const ScrollShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const progressFillRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const container = containerRef.current
    if (!container) return

    const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[]

    slides.forEach((slide, i) => {
      const label  = slide.querySelector<HTMLElement>('.sl-label')
      const title  = slide.querySelector<HTMLElement>('.sl-title')
      const hl     = slide.querySelector<HTMLElement>('.sl-highlight')
      const line   = slide.querySelector<HTMLElement>('.sl-line')
      const desc   = slide.querySelector<HTMLElement>('.sl-desc')
      const tags   = slide.querySelector<HTMLElement>('.sl-tags')

      if (i === 0) {
        gsap.set(slide, { autoAlpha: 1 })
        gsap.set([label, title, hl, line, desc, tags], { autoAlpha: 1, y: 0, scaleX: 1 })
      } else {
        gsap.set(slide, { autoAlpha: 0 })
        gsap.set([label, title, hl, desc, tags], { autoAlpha: 0, y: 50 })
        gsap.set(line, { autoAlpha: 0, scaleX: 0 })
      }
    })

    gsap.set(canAnimState, { levitate: 1, zoom: 1, offsetY: 0 })

    const mobile = window.innerWidth < 768

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${window.innerHeight * TRANSITIONS}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: mobile ? 0.15 : 0.3,
        snap: {
          snapTo: 1 / TRANSITIONS,
          inertia: false,
          duration: { min: 0.3, max: 0.6 },
          delay: 0.05,
          ease: 'power2.inOut',
        },
        onLeaveBack: () => {
          gsap.to(canSpinState, { spinY: SLIDE_ANGLES[0], duration: 0.5, ease: 'power2.out' })
        },
      },
    })

    for (let i = 0; i < TRANSITIONS; i++) {
      const t = i
      const old = slides[i]
      const next = slides[i + 1]

      const getEls = (s: HTMLDivElement) => [
        s.querySelector<HTMLElement>('.sl-label'),
        s.querySelector<HTMLElement>('.sl-title'),
        s.querySelector<HTMLElement>('.sl-highlight'),
        s.querySelector<HTMLElement>('.sl-desc'),
        s.querySelector<HTMLElement>('.sl-tags'),
      ].filter(Boolean) as HTMLElement[]

      const oldEls  = getEls(old)
      const nextEls = getEls(next)
      const oldLine  = old.querySelector<HTMLElement>('.sl-line')
      const nextLine = next.querySelector<HTMLElement>('.sl-line')

      // Mobile: batch fade (no stagger), skip scaleX line anim
      if (mobile) {
        tl.to(oldEls, {
          autoAlpha: 0, y: -25,
          duration: 0.35, ease: 'power2.in', force3D: true,
        }, t)
        if (oldLine) tl.to(oldLine, { autoAlpha: 0, duration: 0.2 }, t)
        tl.to(old, { autoAlpha: 0, duration: 0.1, ease: 'none' }, t + 0.35)

        tl.set(next, { autoAlpha: 1 }, t + 0.35)
        tl.fromTo(nextEls,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out', force3D: true },
          t + 0.38,
        )
        if (nextLine) tl.set(nextLine, { autoAlpha: 1, scaleX: 1 }, t + 0.38)

        // Mobile image transition
        const oldImg = old.querySelector<HTMLElement>('.sl-mobile-img')
        const nextImg = next.querySelector<HTMLElement>('.sl-mobile-img')
        if (oldImg) tl.to(oldImg, { autoAlpha: 0, duration: 0.3, force3D: true }, t)
        if (nextImg) tl.fromTo(nextImg, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, force3D: true }, t + 0.38)
      } else {
        tl.to(oldEls, {
          autoAlpha: 0, y: -35,
          duration: 0.42, ease: 'power2.in', stagger: 0.04,
        }, t)
        if (oldLine) tl.to(oldLine, { autoAlpha: 0, scaleX: 0, duration: 0.3, ease: 'power2.in' }, t)
        tl.to(old, { autoAlpha: 0, duration: 0.15, ease: 'none' }, t + 0.4)

        tl.set(next, { autoAlpha: 1 }, t + 0.4)
        tl.fromTo(nextEls,
          { autoAlpha: 0, y: 50 },
          { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out', stagger: 0.05 },
          t + 0.42,
        )
        if (nextLine) tl.fromTo(nextLine,
          { autoAlpha: 1, scaleX: 0 },
          { scaleX: 1, duration: 0.5, ease: 'power2.out' },
          t + 0.55,
        )
      }

      tl.to(canSpinState, {
        spinY: SLIDE_ANGLES[i + 1],
        duration: 0.9, ease: 'power2.inOut',
      }, t + 0.05)

      if (i + 1 === 1) {
        tl.to(canAnimState, { zoom: mobile ? 2.6 : 2.4, offsetY: -5, duration: 0.7, ease: 'power2.inOut' }, t + 0.25)
      } else if (i + 1 === 2) {
        tl.to(canAnimState, { levitate: 1, zoom: 1, offsetY: 0, duration: 0.55, ease: 'power2.out' }, t + 0.1)
      }

      if (!mobile && glowRef.current) {
        const opacity = 0.15 + (i + 1) * 0.08
        tl.to(glowRef.current, { opacity, duration: 0.6, ease: 'power1.inOut' }, t + 0.3)
      }

      if (progressFillRef.current) {
        tl.to(progressFillRef.current, {
          scaleY: (i + 2) / NUM_SLIDES,
          duration: 0.5, ease: 'power2.out',
        }, t + 0.25)
      }
    }
  }, { scope: containerRef })

  return (
    <section
      id="scroll-showcase"
      ref={containerRef}
      className="relative h-[100dvh] w-full bg-black overflow-hidden"
      aria-label="Product features showcase"
    >
      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full blur-[40px] sm:blur-[100px] md:blur-[140px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(235,41,13,0.25) 0%, rgba(235,41,13,0.08) 50%, transparent 70%)',
          opacity: 0.15,
        }}
        aria-hidden="true"
      />

      {/* Slide panels */}
      {storySlides.map((slide, i) => (
        <div
          key={i}
          ref={(el) => { slideRefs.current[i] = el }}
          className="absolute inset-0 pointer-events-none will-change-[transform,opacity]"
          style={{ zIndex: i + 1 }}
        >
          {/* Mobile image */}
          <div className="md:hidden absolute top-[20vh] left-1/2 -translate-x-1/2 z-0 pointer-events-none sl-mobile-img">
            <Image
              src={slide.mobileImage}
              alt=""
              width={slide.mobileImageW}
              height={slide.mobileImageH}
              className="h-[35vh] w-auto object-contain"
            />
          </div>

          {/* Text block — full width on mobile, right half on desktop */}
          <div className="absolute top-0 right-0 w-full md:w-1/2 lg:w-[42%] h-full flex items-end md:items-center px-5 sm:px-8 md:px-10 lg:px-14 pb-12 md:pb-0">
            <div className="w-full">
              <span className="sl-label block font-body text-[10px] sm:text-xs md:text-sm tracking-[0.3em] text-white/70 uppercase mb-3 sm:mb-4">
                {slide.label}
              </span>

              <div className="overflow-hidden mb-1">
                <h2 className="sl-title font-display text-[clamp(2.5rem,7vw,7rem)] text-white leading-[0.9]">
                  {slide.title}
                </h2>
              </div>

              <div className="overflow-hidden mb-5 sm:mb-7">
                <h2 className="sl-highlight font-display text-[clamp(2.5rem,7vw,7rem)] leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-kliq-vermilion to-kliq-vermilion-light">
                  {slide.highlight}
                </h2>
              </div>

              <div
                className="sl-line w-10 sm:w-12 h-[1.5px] bg-gradient-to-r from-kliq-vermilion to-transparent mb-4 sm:mb-6 origin-left"
              />

              <p className="sl-desc font-body text-sm sm:text-base md:text-lg text-white/75 leading-relaxed mb-5 sm:mb-7 max-w-sm">
                {slide.description}
              </p>

              <div className="sl-tags flex flex-wrap gap-1.5 sm:gap-2">
                {slide.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="px-3 sm:px-4 py-1 sm:py-1.5 bg-white/[0.08] border border-white/20 rounded-full font-body text-[10px] sm:text-xs text-white/75 tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Progress indicator */}
      <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-30 pointer-events-none" aria-hidden="true">
        <div className="w-[1.5px] h-16 sm:h-20 bg-white/10 rounded-full overflow-hidden">
          <div
            ref={progressFillRef}
            className="w-full h-full bg-gradient-to-b from-kliq-vermilion to-kliq-vermilion-light origin-top"
            style={{ transform: `scaleY(${1 / NUM_SLIDES})` }}
          />
        </div>
        <span className="font-body text-[8px] sm:text-[9px] tracking-widest text-white/60 uppercase">
          Scroll
        </span>
      </div>
    </section>
  )
}

export default ScrollShowcase
