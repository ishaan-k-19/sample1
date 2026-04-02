'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 20, suffix: 'g', label: 'Protein', description: 'Per 355ml can' },
  { value: 0, suffix: 'g', label: 'Sugar', description: 'Zero sugar, zero crash' },
  { value: 0, suffix: 'g', label: 'Carbs', description: 'Clean and lean' },
  { value: 0, suffix: 'g', label: 'Fats', description: 'Pure protein power' },
]

const Stats = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setCounts(stats.map((stat) => Math.round(stat.value * easeOut)))

      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [isVisible])

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-black overflow-hidden"
      aria-labelledby="stats-heading"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,50 L200,50 L250,30 L300,70 L350,50 L1000,50"
            vectorEffect="non-scaling-stroke"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            className="animate-pulse"
            style={{
              strokeDasharray: '1000',
              strokeDashoffset: isVisible ? '0' : '1000',
              transition: 'stroke-dashoffset 2s ease-out',
            }}
          />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-r from-kliq-vermilion/5 via-transparent to-kliq-vermilion/5" />
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
            THE NUMBERS
          </span>
          <h2
            id="stats-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 sm:mb-6"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 100ms',
            }}
          >
            PURE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kliq-vermilion to-kliq-vermilion-light">
              PROTEIN
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative text-center group"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                opacity: isVisible ? 1 : 0,
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${200 + index * 150}ms`,
              }}
            >
              <div className="absolute inset-0 bg-kliq-vermilion/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
              <div className="relative">
                <span className="font-display text-5xl sm:text-7xl md:text-8xl text-white">
                  {counts[index]}
                </span>
                <span className="font-display text-2xl sm:text-4xl text-kliq-vermilion">
                  {stat.suffix}
                </span>
              </div>
              <h3 className="font-display text-lg sm:text-2xl text-white mt-3 sm:mt-4 mb-1 sm:mb-2">
                {stat.label}
              </h3>
              <p className="font-body text-xs sm:text-sm text-white/70">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        <div
          className="text-center mt-12 sm:mt-20"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 800ms',
          }}
        >
          <p className="font-body text-base sm:text-xl text-white/75">
            No caffeine. No sugar. Just clean protein in every can.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Stats
