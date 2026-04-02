import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about KLIQ Protein Energy Drink — ingredients, shipping, orders, and more.',
}

const faqs = [
  {
    category: 'Product',
    questions: [
      {
        q: 'What is KLIQ?',
        a: 'KLIQ is a Protein Energy Drink — 20g of whey protein isolate per 355ml can, with 0 sugar, 0 carbs, 0 fats, and no added caffeine. It combines the portability of an energy drink with the nutrition of a protein shake.',
      },
      {
        q: 'Does KLIQ contain caffeine?',
        a: 'No. KLIQ contains no added caffeine. Any natural stimulation comes from the clean protein and light carbonation, not synthetic caffeine. This makes it suitable to drink any time of day.',
      },
      {
        q: 'What protein source does KLIQ use?',
        a: 'KLIQ uses whey protein isolate — one of the cleanest, most bioavailable protein sources available. It\'s rapidly absorbed and delivers all essential amino acids needed for muscle recovery and growth.',
      },
      {
        q: 'Is KLIQ keto-friendly?',
        a: 'Yes. With 0g carbohydrates and 0g sugar, KLIQ is fully compatible with ketogenic, low-carb, and diabetic-friendly diets.',
      },
      {
        q: 'What flavors are available?',
        a: 'KLIQ comes in five bold flavors: Mixed Berry, Cola, Memo Nade, Mango Pineapple, and Lemonade. Each is uniquely formulated to deliver clean taste with zero artificial aftertaste.',
      },
      {
        q: 'How many calories are in a KLIQ can?',
        a: 'Approximately 100 calories per 355ml can — all from protein. No sugar calories, no fat calories, no carb calories.',
      },
      {
        q: 'Is KLIQ gluten-free?',
        a: 'KLIQ is formulated to be gluten-free. Always check the can label for the most current ingredient information.',
      },
    ],
  },
  {
    category: 'Orders & Shipping',
    questions: [
      {
        q: 'Where do you ship?',
        a: 'We currently ship throughout the United States. International shipping is in development — sign up to our newsletter to be notified when it launches.',
      },
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping takes 5–7 business days. Expedited shipping (2–3 business days) is available at checkout. Free standard shipping on orders over $50.',
      },
      {
        q: 'Can I track my order?',
        a: 'Yes. Once your order ships, you\'ll receive an email with a tracking number and link to track your package.',
      },
      {
        q: 'Can I modify or cancel my order?',
        a: 'Orders can be modified or cancelled within 1 hour of placement. Contact us immediately at hello@kliqenergy.com if you need to make changes.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We accept returns of unopened product within 30 days of delivery. For damaged or incorrect orders, contact us within 7 days and we\'ll make it right immediately.',
      },
      {
        q: 'What if my order arrives damaged?',
        a: 'Please contact us at hello@kliqenergy.com with photos of the damage within 7 days of delivery. We\'ll send a replacement at no charge.',
      },
      {
        q: 'How long do refunds take?',
        a: 'Refunds are processed within 3–5 business days after we receive the returned product. Allow an additional 3–5 days for your bank to process the refund.',
      },
    ],
  },
  {
    category: 'Wholesale & Retail',
    questions: [
      {
        q: 'Can I stock KLIQ in my store?',
        a: 'Absolutely. We welcome wholesale partnerships with gyms, health stores, cafes, and retailers. Contact our sales team at wholesale@kliqenergy.com for pricing and minimum order quantities.',
      },
      {
        q: 'Where can I find KLIQ in stores?',
        a: 'Check our Store Locator on the Contact page for locations near you. We\'re rapidly expanding our retail footprint across the US.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero */}
      <section className="pt-36 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="font-body text-xs tracking-[0.3em] text-kliq-vermilion uppercase block mb-4">
            Got Questions
          </span>
          <h1 className="font-display text-7xl md:text-9xl text-white leading-[0.9] mb-6">
            FAQ
          </h1>
          <p className="font-body text-white/75 text-lg max-w-xl">
            Everything you need to know about KLIQ. Can't find what you're looking for?{' '}
            <Link href="/contact" className="text-kliq-vermilion hover:underline">
              Contact us
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ sections */}
      <div className="max-w-3xl mx-auto px-6 pb-24 space-y-16">
        {faqs.map((section) => (
          <div key={section.category}>
            <h2 className="font-display text-3xl text-kliq-vermilion mb-6 pb-4 border-b border-white/[0.06]">
              {section.category.toUpperCase()}
            </h2>
            <div className="space-y-3">
              {section.questions.map((item, i) => (
                <details
                  key={i}
                  className="group bg-kliq-asphalt border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/10 transition-colors"
                >
                  <summary className="flex items-center justify-between px-6 py-5 cursor-pointer select-none list-none">
                    <span className="font-body text-sm md:text-base text-white font-medium pr-4">
                      {item.q}
                    </span>
                    <span className="shrink-0 text-white/65 group-open:text-kliq-vermilion text-xl leading-none transition-all duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5">
                    <div className="w-full h-px bg-white/[0.06] mb-4" />
                    <p className="font-body text-sm text-white/75 leading-relaxed">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="p-10 bg-kliq-asphalt rounded-3xl border border-white/[0.06] text-center">
            <h3 className="font-display text-3xl text-white mb-3">STILL HAVE QUESTIONS?</h3>
            <p className="font-body text-white/75 mb-6">
              Our team is ready to help. Reach out and we'll respond within 24 hours.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-kliq-vermilion text-white rounded-full font-body font-semibold hover:bg-kliq-vermilion-deep transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
