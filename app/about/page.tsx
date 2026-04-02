import type { Metadata } from 'next'
import Link from 'next/link'
import { Zap, Dumbbell, FlaskConical, Leaf } from 'lucide-react'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'

export const metadata: Metadata = {
  title: 'About',
  description:
    'The story behind KLIQ — a protein energy drink built for those who refuse to compromise. 20g protein, 0 sugar, 0 carbs.',
}

const timeline = [
  {
    year: '2023',
    title: 'The Problem',
    desc: "Energy drinks loaded with sugar and zero nutrition. Protein shakes that taste like chalk. We asked: why can't it be both?",
  },
  {
    year: '2024',
    title: 'The Formula',
    desc: '18 months of R&D. Dozens of rejected formulas. One mission: 20g clean whey protein in a carbonated can with zero compromise on taste.',
  },
  {
    year: '2025',
    title: 'The Launch',
    desc: 'KLIQ hits shelves. Five bold flavors. One promise — Energy without noise. Protein without compromise.',
  },
  {
    year: '2026',
    title: 'The Movement',
    desc: "Fueling athletes, creators, and everyone in between. KLIQ isn't just a drink — it's a standard.",
  },
]

const values = [
  {
    icon: Zap,
    title: 'No Noise',
    desc: "No sugar crash. No jitters. No empty calories. Just clean energy from protein — the way it should be.",
  },
  {
    icon: Dumbbell,
    title: 'Performance First',
    desc: '20g of whey protein isolate per can. More protein than most post-workout shakes, in a can you actually want to drink.',
  },
  {
    icon: FlaskConical,
    title: 'Science-Backed',
    desc: 'Every formula is validated. Every ingredient serves a purpose. We obsess over nutrition panels so you can obsess over performance.',
  },
  {
    icon: Leaf,
    title: 'Zero Compromise',
    desc: '0 sugar, 0 carbs, 0 fats, 0 added caffeine. Premium taste without the trade-offs. That\'s the KLIQ standard.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[600px] rounded-full blur-[150px] bg-kliq-vermilion/8 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <span className="font-body text-xs tracking-[0.3em] text-kliq-vermilion uppercase block mb-4">
            Our Story
          </span>
          <h1 className="font-display text-7xl md:text-[10vw] text-white leading-[0.9] mb-8">
            FUEL YOUR <span className="text-kliq-vermilion">EDGE.</span>
          </h1>
          <p className="font-body text-xl text-white/75 max-w-2xl leading-relaxed">
            KLIQ was born out of a simple frustration: the performance drink market
            was broken. You either had energy with zero nutrition, or nutrition that
            tasted like a gym locker room. We changed that.
          </p>
        </div>
      </section>

      {/* Mission statement */}
      <section className="px-6 py-16 border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <blockquote className="font-display text-3xl md:text-5xl text-white/90 leading-tight">
            "Energy without noise.{' '}
            <span className="text-kliq-vermilion">Protein without compromise.</span>"
          </blockquote>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-5xl text-white mb-12">THE KLIQ STANDARD</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div
                  key={value.title}
                  className="p-8 bg-kliq-asphalt rounded-3xl border border-white/[0.06] hover:border-kliq-vermilion/30 transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-kliq-vermilion rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-2xl text-white mb-3">{value.title}</h3>
                  <p className="font-body text-white/75 leading-relaxed">{value.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 py-16 bg-kliq-asphalt/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-5xl text-white mb-16">THE JOURNEY</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[72px] top-0 bottom-0 w-px bg-white/10 hidden md:block" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-8 items-start">
                  <div className="shrink-0 w-[72px] text-right">
                    <span className="font-display text-kliq-vermilion text-xl">{item.year}</span>
                  </div>
                  <div className="relative flex-1 pl-8 md:pl-12">
                    <div className="hidden md:block absolute left-0 top-2 w-3 h-3 rounded-full bg-kliq-vermilion border-2 border-black -translate-x-[7px]" />
                    <h3 className="font-display text-2xl text-white mb-2">{item.title}</h3>
                    <p className="font-body text-white/75 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nutrition facts */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-5xl text-white mb-6">BY THE NUMBERS</h2>
              <p className="font-body text-white/75 mb-8 leading-relaxed">
                Every can of KLIQ is engineered to deliver maximum protein with zero
                nutritional compromise. This is what performance looks like.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-kliq-vermilion text-white rounded-full font-body font-semibold hover:bg-kliq-vermilion-deep transition-all duration-300 hover:scale-105"
              >
                Shop KLIQ
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '20g', label: 'Protein', sub: 'per 355ml can' },
                { value: '0g', label: 'Sugar', sub: 'zero compromise' },
                { value: '0g', label: 'Carbs', sub: 'stay in ketosis' },
                { value: '0g', label: 'Fats', sub: 'no hidden calories' },
                { value: '0', label: 'Added Caffeine', sub: 'natural energy only' },
                { value: '5', label: 'Flavors', sub: 'pick your favorite' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 bg-kliq-asphalt rounded-2xl border border-white/[0.06] text-center"
                >
                  <span className="font-display text-4xl text-kliq-vermilion block">{stat.value}</span>
                  <span className="font-display text-sm text-white block mt-1">{stat.label}</span>
                  <span className="font-body text-xs text-white/70 block mt-0.5">{stat.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-kliq-vermilion p-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
            <h2 className="font-display text-6xl text-white mb-4 relative z-10">
              READY TO FUEL YOUR EDGE?
            </h2>
            <p className="font-body text-white/80 mb-8 relative z-10">
              Join thousands who've made the switch to smarter energy.
            </p>
            <Link
              href="/shop"
              className="relative z-10 inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-body font-semibold hover:bg-kliq-champagne transition-all duration-300 hover:scale-105"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
