'use client'

import { useRef } from 'react'
import Navigation from '../src/sections/Navigation'
import Hero from '../src/sections/Hero'
import ScrollShowcase from '../src/sections/ScrollShowcase'
import About from '../src/sections/About'
import Products from '../src/sections/Products'
import Features from '../src/sections/Features'
import Stats from '../src/sections/Stats'
import Packs from '../src/sections/Packs'
import CTA from '../src/sections/CTA'
import FAQ from '../src/sections/FAQ'
import Footer from '../src/sections/Footer'
import PersistentCan from '../src/components/PersistentCan'
export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <PersistentCan />
      <div ref={mainRef} className="relative min-h-screen bg-black overflow-x-hidden">
        <Navigation />
        <Hero />
        <ScrollShowcase />
        <About />
        <Products />
        <Features />
        <Stats />
        <Packs />
        <CTA />
        <FAQ />
        <Footer />
      </div>
    </>
  )
}
