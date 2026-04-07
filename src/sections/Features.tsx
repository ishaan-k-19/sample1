'use client'

import { useEffect, useRef, useState } from 'react'
import { Zap, Leaf, Droplets, Battery, Shield, Flame } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: '20g Protein',
    description: 'Packed with 20 grams of high-quality protein in every 355ml can. Fuel your body right.',
  },
  {
    icon: Zap,
    title: 'No Added Caffeine',
    description: 'Clean energy from protein, not stimulants. No jitters, no crash, just sustained power.',
  },
  {
    icon: Leaf,
    title: '0 Sugar',
    description: 'Zero sugar means zero guilt. All the taste without the crash or empty calories.',
  },
  {
    icon: Flame,
    title: '0 Carbs',
    description: 'Perfect for keto, low-carb, or any lifestyle that demands zero compromise.',
  },
  {
    icon: Droplets,
    title: '0 Fats',
    description: 'Lean, clean, and mean. Every sip is pure protein without the fat.',
  },
  {
    icon: Battery,
    title: '5 Bold Flavors',
    description: 'Mixed Berry, Cola, Memo Nade, Mango Pineapple, and Lemonade.',
  },
]

const Features = () => {
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
      aria-labelledby="features-heading"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-kliq-vermilion/10 rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-kliq-vermilion/5 rounded-full blur-2xl sm:blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-20">
          <span
            className="inline-block font-body text-xs sm:text-sm tracking-widest text-kliq-vermilion mb-3 sm:mb-4"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            WHY KLIQ?
          </span>
          <h2
            id="features-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black mb-4 sm:mb-6"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 100ms',
            }}
          >
            ENGINEERED FOR{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kliq-vermilion to-kliq-vermilion-deep">
              PERFORMANCE
            </span>
          </h2>
          <p
            className="font-body text-base sm:text-lg text-black/75 max-w-2xl mx-auto"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 200ms',
            }}
          >
            Clean over loud. System over chaos. Function over hype.
            Every can delivers what your body actually needs.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative p-5 sm:p-8 bg-black/5 border border-black/10 rounded-xl sm:rounded-2xl overflow-hidden hover:border-black/20 transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2"
                style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
                  opacity: isVisible ? 1 : 0,
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${300 + index * 100}ms`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-kliq-vermilion to-kliq-vermilion-deep opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-kliq-vermilion/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-black" />
                </div>

                <h3 className="font-display text-base sm:text-xl text-black mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-black/75 leading-relaxed">
                  {feature.description}
                </p>

                <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-gradient-to-br from-kliq-vermilion to-kliq-vermilion-deep opacity-0 group-hover:opacity-20 rounded-full blur-xl transition-opacity duration-500" aria-hidden="true" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features
