'use client'

import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import type { ShopifyImage } from '@/lib/shopify'

type Props = {
  images: ShopifyImage[]
  title: string
  flavorRgb: string
}

export default function ProductGallery({ images, title, flavorRgb }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const imageRef = useRef<HTMLDivElement>(null)

  if (!images.length) {
    return (
      <div className="aspect-square bg-kliq-asphalt rounded-3xl flex items-center justify-center border border-white/[0.06]">
        <span className="font-display text-8xl text-white/5">{title[0]}</span>
      </div>
    )
  }

  const activeImage = images[activeIndex]
  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setActiveIndex((i) => (i + 1) % images.length)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isZoomed) return
    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPos({ x, y })
  }

  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
      {/* Main image */}
      <div
        ref={imageRef}
        className="relative aspect-square bg-kliq-asphalt rounded-3xl overflow-hidden border border-white/[0.06] group cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        {/* Flavor ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500 opacity-20 group-hover:opacity-30"
          style={{ background: `rgba(${flavorRgb}, 1)` }}
        />

        <img
          src={activeImage.url}
          alt={activeImage.altText ?? title}
          className="relative z-10 w-full h-full object-contain p-8 transition-transform duration-300"
          style={{
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            transform: isZoomed ? 'scale(1.8)' : 'scale(1)',
            filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.6))',
          }}
          draggable={false}
        />

        {/* Zoom hint */}
        {!isZoomed && (
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ZoomIn className="w-3 h-3 text-white/60" />
            <span className="font-body text-[10px] text-white/60">Hover to zoom</span>
          </div>
        )}

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70 hover:scale-105"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70 hover:scale-105"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? '24px' : '6px',
                  background: i === activeIndex ? `rgb(${flavorRgb})` : 'rgba(255,255,255,0.3)',
                }}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {images.map((image, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="shrink-0 w-20 h-20 rounded-2xl overflow-hidden transition-all duration-200"
              style={{
                border: `2px solid ${i === activeIndex ? `rgb(${flavorRgb})` : 'transparent'}`,
                opacity: i === activeIndex ? 1 : 0.4,
              }}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={image.url}
                alt={image.altText ?? `${title} ${i + 1}`}
                className="w-full h-full object-contain bg-kliq-asphalt p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
