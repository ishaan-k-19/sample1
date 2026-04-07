'use client'

import { useRef, useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { Play, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import Image from 'next/image'

const particleData = [
  { left: 70.985, top: 97.427, duration: 7.2, delay: 3.9 },
  { left: 75.725, top: 84.502, duration: 11.196, delay: 2.33 },
  { left: 18.485, top: 78.889, duration: 6.588, delay: 1.083 },
  { left: 67.037, top: 7.356, duration: 11.27, delay: 3.867 },
  { left: 2.508, top: 12.753, duration: 10.633, delay: 1.81 },
  { left: 55.639, top: 48.691, duration: 10.776, delay: 0.866 },
  { left: 48.25, top: 58.45, duration: 10.556, delay: 0.232 },
  { left: 66.116, top: 68.376, duration: 9.741, delay: 1.067 },
  { left: 11.86, top: 82.686, duration: 7.04, delay: 0.846 },
  { left: 61.867, top: 68.579, duration: 11.723, delay: 0.526 },
  { left: 77.331, top: 78.452, duration: 7.515, delay: 0.077 },
  { left: 3.525, top: 88.348, duration: 10.387, delay: 1.814 },
]

const Hero = () => {
  const heroRef    = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctasRef    = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const mobileCanRef = useRef<HTMLDivElement>(null)

  const [lettersReady, setLettersReady] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setLettersReady(true), 300)
    return () => clearTimeout(t)
  }, [])

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo('.hero-split-white',
      { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
      { clipPath: 'polygon(0 0, 55% 0, 45% 100%, 0 100%)', duration: 0.85, ease: 'power2.inOut' },
      0,
    )
    tl.fromTo('.hero-split-black',
      { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' },
      { clipPath: 'polygon(55% 0, 100% 0, 100% 100%, 45% 100%)', duration: 0.85, ease: 'power2.inOut' },
      0,
    )

    gsap.fromTo(subtitleRef.current,
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 1.25 },
    )

    gsap.fromTo(ctasRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', delay: 1.4 },
    )

    gsap.fromTo(scrollHintRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'none', delay: 2.0 },
    )

    // Mobile can entrance
    if (mobileCanRef.current) {
      gsap.fromTo(mobileCanRef.current,
        { y: 80, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.4 },
      )
    }
  }, { scope: heroRef })

  const titleWords = ['PURE', 'PROTEIN', 'POWER']

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-end md:items-center justify-center overflow-hidden"
      aria-label="KLIQ Energy hero"
    >
      {/* Background split */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Mobile: black-to-white gradient | Desktop: animated split */}
        <div className="md:hidden absolute inset-0 bg-black" />
        <div
          className="hero-split-white hidden md:block absolute inset-0 bg-white"
          style={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
        />
        <div
          className="hero-split-black hidden md:block absolute inset-0 bg-black"
          style={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
        />

        {/* Particles — hidden on mobile */}
        <div
          className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: 'polygon(0 0, 55% 0, 45% 100%, 0 100%)' }}
        >
          {particleData.map((p, i) => (
            <div
              key={`pw-${i}`}
              className="absolute w-1 h-1 bg-black/15 rounded-full"
              style={{
                left: `${p.left}%`, top: `${p.top}%`,
                animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
              }}
            />
          ))}
        </div>

        <div
          className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: 'polygon(55% 0, 100% 0, 100% 100%, 45% 100%)' }}
        >
          {particleData.map((p, i) => (
            <div
              key={`pb-${i}`}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${p.left}%`, top: `${p.top}%`,
                animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Mobile can image — scrolls with hero naturally */}
      <div
        ref={mobileCanRef}
        className="md:hidden absolute top-[15vh] left-[53%] -translate-x-1/2 z-[15] pointer-events-none"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <Image
          src="/full-can.png"
          alt=""
          width={284}
          height={756}
          className="h-[35vh] w-auto object-contain animate-levitate"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-[20] w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-10 md:py-28 mt-auto md:mt-0 md:self-center">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="text-center lg:text-left">
            {/* Title — inline on mobile (1-2 lines), stacked on md+ */}
            <div className="overflow-hidden mb-4 sm:mb-6">
              {/* Mobile: inline flow */}
              <div className="flex flex-wrap justify-center gap-x-3 md:hidden overflow-hidden">
                {titleWords.map((word, wi) => (
                  <span key={wi} className="inline-flex overflow-hidden">
                    {word.split('').map((letter, li) => {
                      const flatIndex = titleWords.slice(0, wi).reduce((a, w) => a + w.length, 0) + li
                      return (
                        <span
                          key={li}
                          className="font-display text-[13vw] inline-block text-white md:text-black leading-[1.1]"
                          style={{
                            transform: lettersReady ? 'translateY(0)' : 'translateY(105%)',
                            opacity: lettersReady ? 1 : 0,
                            transition: `transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${flatIndex * 45 + 600}ms, opacity 0.65s ease ${flatIndex * 45 + 600}ms`,
                          }}
                        >
                          {letter}
                        </span>
                      )
                    })}
                  </span>
                ))}
              </div>
              {/* Desktop: stacked */}
              <div className="hidden md:block">
                {titleWords.map((word, wi) => (
                  <div key={wi} className="flex justify-center lg:justify-start overflow-hidden">
                    {word.split('').map((letter, li) => (
                      <span
                        key={li}
                        className="font-display md:text-7xl lg:text-8xl xl:text-9xl inline-block text-black"
                        style={{
                          transform: lettersReady ? 'translateY(0)' : 'translateY(105%)',
                          opacity: lettersReady ? 1 : 0,
                          transition: `transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${(wi * word.length + li) * 45 + 600}ms, opacity 0.65s ease ${(wi * word.length + li) * 45 + 600}ms`,
                        }}
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="font-body text-lg sm:text-xl md:text-2xl text-white/75 md:text-black/75 mb-6 sm:mb-8"
              style={{ opacity: 0 }}
            >
              20g protein. Zero sugar. Zero carbs.{' '}
              <br className="hidden sm:block" />
              <span className="text-kliq-vermilion font-medium">Built for people who perform.</span>
            </p>

            {/* CTAs */}
            <div
              ref={ctasRef}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
              style={{ opacity: 0 }}
            >
              <a
                href="/shop"
                className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-kliq-vermilion text-white rounded-full font-body font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-glow-vermilion"
              >
                GRAB YOUR CAN
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <button className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-white/30 md:border-black/30 text-white md:text-black rounded-full font-body font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-white/[0.06] md:hover:bg-black/[0.06] hover:border-white/60 md:hover:border-black/60">
                <Play className="w-4 h-4 fill-current" />
                Watch Video
              </button>
            </div>
          </div>

          {/* Right — spacer for PersistentCan overlay */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-36 bg-gradient-to-t from-black to-transparent pointer-events-none" aria-hidden="true" />

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-20 pointer-events-none"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <span className="font-body text-[10px] tracking-[0.3em] text-white/75 uppercase">Scroll</span>
        <div className="relative w-[1px] h-8 sm:h-10 bg-white/30 overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-white/80 to-transparent animate-scroll-line" style={{ height: '40%' }} />
        </div>
      </div>
    </section>
  )
}

export default Hero
