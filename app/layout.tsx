import type { Metadata, Viewport } from 'next'
import { Inter, Anton } from 'next/font/google'
import '../src/index.css'
import { CartProvider } from '@/context/CartContext'
import CartDrawer from '@/components/CartDrawer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-anton',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://kliqenergy.com'),
  title: {
    template: '%s | KLIQ Energy',
    default: 'KLIQ Energy — Protein Energy Drink',
  },
  description:
    'KLIQ Protein Energy Drink. 20g protein, 0 sugar, 0 carbs, 0 fats. No added caffeine. Fuel Your Edge.',
  keywords: [
    'protein energy drink',
    'KLIQ',
    'no sugar energy drink',
    'healthy energy drink',
    'protein drink',
    'zero sugar protein',
    'fitness drink',
  ],
  openGraph: {
    siteName: 'KLIQ Energy',
    type: 'website',
    locale: 'en_US',
    title: 'KLIQ Energy — Protein Energy Drink',
    description:
      'KLIQ Protein Energy Drink. 20g protein, 0 sugar, 0 carbs, 0 fats. No added caffeine. Fuel Your Edge.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KLIQ Energy — Protein Energy Drink',
    description: '20g protein. 0 sugar. 0 carbs. 0 fats. No added caffeine.',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdn.shopify.com" />
        <link rel="dns-prefetch" href="https://cdn.shopify.com" />
        <link rel="preload" href="/realistic_3d_beverage_can.glb" as="fetch" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.gstatic.com" />
      </head>
      <body className="font-body">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}
