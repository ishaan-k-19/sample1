import type { Metadata } from 'next'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'

export const metadata: Metadata = {
  title: 'Shipping Policy | KLIQ Energy',
  description:
    'KLIQ Energy shipping information — processing times, delivery options, rates, tracking, and more.',
}

const shippingOptions = [
  {
    name: 'Standard',
    time: '5–7 Business Days',
    price: 'Free over $50 / $6.99',
    carrier: 'USPS / UPS',
    best: 'Everyday orders',
  },
  {
    name: 'Express',
    time: '2–3 Business Days',
    price: '$14.99',
    carrier: 'UPS / FedEx',
    best: 'When you need it soon',
  },
  {
    name: 'Overnight',
    time: '1 Business Day',
    price: '$29.99',
    carrier: 'UPS Next Day Air',
    best: 'Can\'t wait',
  },
]

const timeline = [
  { step: '01', title: 'Order Placed', desc: 'You complete checkout. Your order enters our system immediately.' },
  { step: '02', title: 'Processing', desc: 'Our warehouse team picks, packs, and quality-checks your order. This takes 1–2 business days.' },
  { step: '03', title: 'Dispatched', desc: 'Your order is handed to the carrier and a tracking number is emailed to you.' },
  { step: '04', title: 'In Transit', desc: 'Your order is on the move. Use your tracking link to follow it in real time.' },
  { step: '05', title: 'Delivered', desc: 'Your KLIQ arrives. Fuel up.' },
]

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero */}
      <section className="pt-36 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="font-body text-xs tracking-[0.3em] text-kliq-vermilion uppercase block mb-4">
            Legal
          </span>
          <h1 className="font-display text-7xl md:text-9xl text-white leading-[0.9] mb-6">
            SHIPPING POLICY
          </h1>
          <p className="font-body text-white/70 text-sm">Last updated: March 31, 2026</p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 pb-24 space-y-12 mt-10">

        {/* Processing time highlight */}
        <div className="flex gap-6 flex-col sm:flex-row">
          <div className="flex-1 p-6 bg-kliq-vermilion/10 border border-kliq-vermilion/20 rounded-2xl">
            <span className="font-display text-4xl text-kliq-vermilion block mb-1">1–2</span>
            <span className="font-display text-sm text-white block">Business Days</span>
            <span className="font-body text-xs text-white/65 block mt-1">Order Processing Time</span>
          </div>
          <div className="flex-1 p-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl">
            <span className="font-display text-4xl text-white block mb-1">$50+</span>
            <span className="font-display text-sm text-white block">Free Shipping</span>
            <span className="font-body text-xs text-white/65 block mt-1">On all domestic orders</span>
          </div>
          <div className="flex-1 p-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl">
            <span className="font-display text-4xl text-white block mb-1">48</span>
            <span className="font-display text-sm text-white block">States Covered</span>
            <span className="font-body text-xs text-white/65 block mt-1">Continental US</span>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">PROCESSING TIMES</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            All orders are processed within 1–2 business days (Monday through Friday, excluding federal holidays) after payment is confirmed. You will receive an order confirmation email immediately after placing your order, followed by a shipping confirmation email with a tracking number once your order is dispatched.
          </p>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            Orders placed after 2:00 PM EST on business days, or on weekends and holidays, will begin processing on the next available business day. During high-volume periods (product launches, promotions, holiday seasons) processing times may extend to 2–3 business days. We will notify you by email if there is an unusual delay.
          </p>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            Please ensure your shipping address is correct before completing checkout. We are unable to modify the shipping address after an order has been dispatched.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-6">SHIPPING OPTIONS &amp; RATES</h2>
          <div className="space-y-3">
            {shippingOptions.map((option) => (
              <div
                key={option.name}
                className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl hover:border-kliq-vermilion/20 transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <span className="font-display text-xl text-white block mb-1">{option.name.toUpperCase()}</span>
                    <span className="font-body text-xs text-white/70">{option.best}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-display text-xl text-kliq-vermilion block">{option.price}</span>
                    <span className="font-body text-xs text-white/70">{option.carrier}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/[0.06]">
                  <span className="font-body text-sm text-white/70">
                    Estimated Delivery: <span className="text-white/80">{option.time}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="font-body text-xs text-white/70 leading-relaxed mt-3">
            Delivery estimates are in addition to order processing time. Final shipping rates are calculated at checkout based on order weight and destination. Free standard shipping applies to orders of $50 or more (after discounts, before taxes) shipping to the continental United States.
          </p>
        </div>

        {/* Order journey timeline */}
        <div>
          <h2 className="font-display text-2xl text-white mb-8">YOUR ORDER&apos;S JOURNEY</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[22px] top-4 bottom-4 w-px bg-white/[0.06]" />
            <div className="space-y-6">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div className="relative shrink-0 w-11 h-11 rounded-full border border-kliq-vermilion/40 bg-black flex items-center justify-center z-10">
                    <span className="font-display text-xs text-kliq-vermilion">{item.step}</span>
                  </div>
                  <div className="pb-2">
                    <h3 className="font-display text-base text-white mb-1">{item.title.toUpperCase()}</h3>
                    <p className="font-body text-sm text-white/75 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">ORDER TRACKING</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            Once your order ships, you will receive a shipping confirmation email containing your tracking number and a link to track your package in real time. Tracking information may take up to 24 hours to become active after the shipping confirmation email is sent, as carriers sometimes experience delays in updating their systems.
          </p>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            If you have not received your shipping confirmation email within 3 business days of placing your order, please check your spam folder before contacting us. You can also log in to your account at kliqenergy.com to view your order status at any time. For assistance, email us at support@kliqenergy.com with your order number.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">DAMAGED OR LOST PACKAGES</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            If your order arrives damaged, please do not discard the packaging. Take photos of the damaged package and products, then email us at support@kliqenergy.com within 5 business days of delivery. Include your order number, a description of the damage, and your photos. We will send a replacement at no additional cost or issue a full refund at your preference.
          </p>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            If your tracking information shows &quot;Delivered&quot; but you have not received your package, please:
          </p>
          <ul className="font-body text-sm text-white/75 leading-relaxed space-y-2">
            {[
              'Check with neighbors or building management in case the package was left with them.',
              'Wait 24 hours — carriers occasionally scan packages as delivered before actual delivery.',
              'Check all possible delivery locations (front door, side door, garage, mailbox).',
              'Contact your local carrier facility directly with your tracking number.',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-kliq-vermilion shrink-0 mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="font-body text-sm text-white/75 leading-relaxed mt-4">
            If your package is confirmed lost by the carrier after investigation, we will reship your order at no charge. KLIQ Energy Inc. is not responsible for packages confirmed as delivered to the address provided at checkout.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">ADDRESS ACCURACY</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            Please review your shipping address carefully before submitting your order. KLIQ Energy Inc. is not responsible for orders that are undeliverable or returned due to an incorrect or incomplete address provided by the customer. If a package is returned to us due to an address error, we will contact you and reship the order once a corrected address is confirmed. Additional shipping charges may apply for reshipping.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">ALASKA, HAWAII &amp; US TERRITORIES</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            We ship to Alaska, Hawaii, Puerto Rico, and other US territories. Please note that shipping to these locations may incur additional fees and longer transit times than continental US estimates. Free shipping thresholds apply to these destinations. Estimated delivery times to non-continental US locations are typically 7–14 business days via standard shipping.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">INTERNATIONAL SHIPPING</h2>
          <div className="p-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl">
            <span className="font-display text-xl text-white block mb-2">COMING SOON</span>
            <p className="font-body text-sm text-white/75 leading-relaxed">
              We are actively working to expand KLIQ to international markets. International shipping is not yet available. Sign up for our newsletter to be the first to know when we launch in your country.
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">CONTACT US</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            For any shipping questions or concerns, please reach out to our customer support team:
          </p>
          <div className="mt-4 p-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl space-y-1">
            <p className="font-body text-sm text-white/70">KLIQ Energy Inc. — Customer Support</p>
            <p className="font-body text-sm">
              <a href="mailto:support@kliqenergy.com" className="text-kliq-vermilion hover:underline">
                support@kliqenergy.com
              </a>
            </p>
            <p className="font-body text-sm text-white/65">Response time: within 1–2 business days</p>
          </div>
        </div>

      </section>

      <Footer />
    </div>
  )
}
