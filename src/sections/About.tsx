'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const highlights = ['20g Protein', '0 Sugar', '0 Carbs', '0 Fats']

const stats = [
  { value: '20g', label: 'Protein per can' },
  { value: '0g',  label: 'Sugar'           },
  { value: '0g',  label: 'Carbs'           },
  { value: '0g',  label: 'Fats'            },
]

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    const st = { trigger: section, start: 'top 75%' }

    gsap.fromTo('.ab-label',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: st },
    )

    gsap.fromTo('.ab-heading',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1, scrollTrigger: st },
    )

    gsap.fromTo('.ab-rule',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'power2.out', delay: 0.3, scrollTrigger: st },
    )

    gsap.fromTo('.ab-body',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.75, ease: 'power2.out', delay: 0.35, scrollTrigger: st },
    )

    gsap.fromTo('.ab-pill',
      { opacity: 0, y: 16, scale: 0.9 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.5, ease: 'back.out(1.4)',
        stagger: 0.07, delay: 0.55,
        scrollTrigger: st,
      },
    )

    gsap.fromTo('.ab-stat',
      { opacity: 0, y: 36, scale: 0.92 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.6, ease: 'power3.out',
        stagger: 0.09, delay: 0.45,
        scrollTrigger: st,
      },
    )

    gsap.fromTo('.ab-tagline',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.7, scrollTrigger: st },
    )
  }, { scope: sectionRef })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{ minHeight: '100dvh' }}
      aria-labelledby="about-heading"
    >
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-kliq-vermilion/8 blur-[80px] pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-kliq-vermilion/6 blur-[60px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 flex flex-col justify-center min-h-[100dvh]">
        <div className="ab-label opacity-0 mb-1">
          <span className="inline-block font-body text-xs tracking-[0.3em] text-kliq-vermilion uppercase">
            The Story
          </span>
        </div>

        <h2 id="about-heading" className="ab-heading font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-black leading-[0.9] mb-4 opacity-0">
          BEYOND{' '}
          <span className="text-kliq-vermilion">CATEGORIES</span>
        </h2>

        <div className="ab-rule w-16 h-[1.5px] bg-gradient-to-r from-kliq-vermilion to-transparent origin-left mb-8 sm:mb-12" />

        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <div className="ab-body opacity-0">
            <p className="font-body text-lg sm:text-xl text-black/85 leading-relaxed mb-4 sm:mb-6">
              Not just energy. Not just protein.{' '}
              <span className="text-kliq-vermilion font-semibold">KLIQ</span> is a
              performance lifestyle beverage built for people who refuse to compromise.
            </p>
            <p className="font-body text-base sm:text-lg text-black/65 leading-relaxed mb-8 sm:mb-10">
              20g of whey protein isolate in every 355ml can — with zero sugar, zero carbs,
              zero fats, and no added caffeine. Clean over loud. Function over hype.
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {highlights.map((item, i) => (
                <span
                  key={i}
                  className="ab-pill opacity-0 px-4 sm:px-5 py-2 sm:py-2.5 bg-black/[0.04] border border-black/10 rounded-full font-body text-xs sm:text-sm font-medium text-kliq-vermilion hover:bg-kliq-vermilion hover:text-white hover:border-kliq-vermilion transition-all duration-300 cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-kliq-vermilion/8 rounded-full blur-[60px] pointer-events-none" aria-hidden="true" />
              <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="ab-stat opacity-0 group p-5 sm:p-7 bg-black/[0.03] border border-black/10 rounded-2xl hover:border-kliq-vermilion/30 hover:bg-kliq-vermilion/[0.03] transition-all duration-500 cursor-default"
                  >
                    <span className="block font-display text-4xl sm:text-5xl text-black group-hover:text-kliq-vermilion transition-colors duration-300 mb-1">
                      {stat.value}
                    </span>
                    <span className="font-body text-xs sm:text-sm text-black/60">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="ab-tagline opacity-0 mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-black/8">
          <p className="font-display text-xl sm:text-2xl md:text-3xl text-black/70">
            &ldquo;Energy without noise.{' '}
            <span className="text-kliq-vermilion">Protein without compromise.&rdquo;</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
