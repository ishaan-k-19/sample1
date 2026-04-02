import type { Metadata } from 'next'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'

export const metadata: Metadata = {
  title: 'Returns & Refunds | KLIQ Energy',
  description:
    'KLIQ Energy 30-day return policy. Learn how to initiate a return, our refund timeline, and how we handle damaged or incorrect orders.',
}

const returnSteps = [
  {
    step: '01',
    title: 'Check Eligibility',
    desc: 'Confirm your return is within 30 days of delivery and that the product is unopened and in its original condition.',
  },
  {
    step: '02',
    title: 'Contact Us',
    desc: 'Email returns@kliqenergy.com with your order number and the reason for your return. We\'ll respond within 1–2 business days.',
  },
  {
    step: '03',
    title: 'Receive Return Label',
    desc: 'We\'ll email you a prepaid return shipping label. Print it and affix it securely to your package.',
  },
  {
    step: '04',
    title: 'Ship It Back',
    desc: 'Drop off your package at any authorized carrier location (UPS/USPS). We recommend keeping the drop-off receipt.',
  },
  {
    step: '05',
    title: 'Inspection',
    desc: 'Once we receive your return, our team will inspect it within 1–2 business days to confirm it meets our return conditions.',
  },
  {
    step: '06',
    title: 'Refund Issued',
    desc: 'Your refund is processed to your original payment method. Allow 3–5 business days for it to appear on your statement.',
  },
]

export default function ReturnsPage() {
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
            RETURNS &amp; REFUNDS
          </h1>
          <p className="font-body text-white/60 text-sm">Last updated: March 31, 2026</p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* Quick stats */}
      <div className="max-w-3xl mx-auto px-6 mt-10">
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="flex-1 p-6 bg-kliq-vermilion/10 border border-kliq-vermilion/20 rounded-2xl">
            <span className="font-display text-4xl text-kliq-vermilion block mb-1">30</span>
            <span className="font-display text-sm text-white block">Day Return Window</span>
            <span className="font-body text-xs text-white/65 block mt-1">From date of delivery</span>
          </div>
          <div className="flex-1 p-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl">
            <span className="font-display text-4xl text-white block mb-1">3–5</span>
            <span className="font-display text-sm text-white block">Business Days</span>
            <span className="font-body text-xs text-white/65 block mt-1">Refund processing time</span>
          </div>
          <div className="flex-1 p-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl">
            <span className="font-display text-4xl text-white block mb-1">Free</span>
            <span className="font-display text-sm text-white block">Return Shipping</span>
            <span className="font-body text-xs text-white/65 block mt-1">Prepaid label provided</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 pb-24 space-y-12 mt-10">

        <div>
          <h2 className="font-display text-2xl text-white mb-4">RETURN ELIGIBILITY</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            We accept returns within 30 days of the delivery date for items that meet the following conditions:
          </p>
          <ul className="font-body text-sm text-white/75 leading-relaxed space-y-2 mb-6">
            {[
              'The product is unopened and in its original, factory-sealed condition.',
              'The product is in its original packaging with all labels and seals intact.',
              'The return is initiated within 30 days of the delivery date shown in your tracking information.',
              'The product was purchased directly from kliqenergy.com (returns for products purchased through third-party retailers must be directed to that retailer).',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-kliq-vermilion shrink-0 mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl">
            <h3 className="font-display text-base text-white mb-2">NON-RETURNABLE ITEMS</h3>
            <ul className="font-body text-sm text-white/75 leading-relaxed space-y-1">
              {[
                'Opened or partially consumed products (for health and safety reasons).',
                'Products damaged due to misuse, improper storage, or customer error.',
                'Gift cards and promotional credit.',
                'Products marked as Final Sale or Non-Returnable at time of purchase.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-kliq-vermilion/60 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Step-by-step return process */}
        <div>
          <h2 className="font-display text-2xl text-white mb-8">HOW TO RETURN</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[22px] top-4 bottom-4 w-px bg-white/[0.06]" />
            <div className="space-y-6">
              {returnSteps.map((item, i) => (
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
          <h2 className="font-display text-2xl text-white mb-4">REFUND TIMELINE</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            Once we receive and inspect your returned item, we will notify you by email of the status of your refund. If your return is approved, your refund will be processed to your original payment method within 3–5 business days of our inspection confirmation.
          </p>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            Please note that processing times vary by payment method and financial institution:
          </p>
          <ul className="font-body text-sm text-white/75 leading-relaxed space-y-2">
            {[
              'Credit/Debit Card: 3–5 business days to appear on your statement after processing.',
              'Shop Pay / Apple Pay / Google Pay: 3–5 business days.',
              'Store Credit: Applied to your account immediately upon refund approval.',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-kliq-vermilion shrink-0 mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="font-body text-sm text-white/75 leading-relaxed mt-4">
            Original shipping costs are non-refundable unless the return is due to our error (wrong item shipped, defective product). If you received free shipping on your order and return part of the order, you may be charged the applicable shipping fee if your remaining order value falls below the free shipping threshold.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">EXCHANGES</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            We offer product exchanges for different flavors or varieties of the same product within the 30-day return window, provided the item meets our return eligibility conditions. To request an exchange:
          </p>
          <ul className="font-body text-sm text-white/75 leading-relaxed space-y-2">
            {[
              'Email returns@kliqenergy.com with your order number and the item you\'d like to exchange.',
              'Specify which product and flavor you\'d like in exchange.',
              'Ship back the original item using our prepaid return label.',
              'Your exchange order will be dispatched as soon as we receive your return.',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-kliq-vermilion shrink-0 mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="font-body text-sm text-white/75 leading-relaxed mt-4">
            If the item you want to exchange for is out of stock, we will issue a full refund instead. Exchanges are subject to product availability and can only be processed for items of equal or lesser value. If you would like to exchange for a higher-value item, please return the original order for a refund and place a new order.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">DAMAGED OR INCORRECT ORDERS</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            If you receive a product that is damaged, defective, or different from what you ordered, we sincerely apologize. We will make it right immediately — no questions asked.
          </p>
          <div className="p-6 bg-kliq-vermilion/5 border border-kliq-vermilion/20 rounded-2xl mb-4">
            <h3 className="font-display text-lg text-white mb-2">IMMEDIATE REPLACEMENT GUARANTEE</h3>
            <p className="font-body text-sm text-white/60 leading-relaxed">
              For damaged, defective, or incorrect items, we will ship a replacement order at no cost to you as soon as your claim is verified. You do not need to return the damaged product in most cases.
            </p>
          </div>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-2">To report a damaged or incorrect order:</p>
          <ul className="font-body text-sm text-white/75 leading-relaxed space-y-2">
            {[
              'Email support@kliqenergy.com within 7 days of delivery.',
              'Include your order number, a description of the issue, and photos of the damaged or incorrect item and packaging.',
              'Our team will review your claim within 1 business day and arrange a replacement or full refund.',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-kliq-vermilion shrink-0 mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">SUBSCRIPTION ORDERS</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            For subscription orders, you may cancel your subscription at any time before the next billing date through your account dashboard. Returns and refunds for subscription orders follow the same eligibility criteria as standard orders. If you wish to pause, modify, or cancel your subscription, please log in to your account or contact support@kliqenergy.com at least 48 hours before your next scheduled order date.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">FREQUENTLY ASKED QUESTIONS</h2>
          <div className="space-y-4">
            {[
              {
                q: 'I opened the product and didn\'t like the flavor. Can I return it?',
                a: 'Unfortunately, for health and safety reasons we cannot accept returns on opened consumable products. We recommend trying our sample pack before committing to a full case. If the product was defective or you received the wrong flavor, we\'ll replace it immediately.',
              },
              {
                q: 'My 30-day window just passed. Can I still return?',
                a: 'Returns outside the 30-day window are not accepted under our standard policy. If you have a special circumstance, please contact support@kliqenergy.com and we will review your case individually.',
              },
              {
                q: 'I didn\'t receive a return label. What should I do?',
                a: 'Return labels are emailed after you submit your return request. If you haven\'t received it within 2 business days, please check your spam folder or email us at returns@kliqenergy.com.',
              },
              {
                q: 'Can I return a gift?',
                a: 'Yes. If you received a KLIQ product as a gift, you may return it for store credit. Please email returns@kliqenergy.com with the original order number (if known) or the name and email of the purchaser.',
              },
            ].map((item, i) => (
              <div key={i} className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl">
                <h3 className="font-display text-sm text-white mb-2">{item.q}</h3>
                <p className="font-body text-sm text-white/75 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">CONTACT US</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            Our customer support team is here to help. Don&apos;t hesitate to reach out:
          </p>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <div className="p-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl space-y-1">
              <p className="font-display text-sm text-white">RETURNS</p>
              <p className="font-body text-sm">
                <a href="mailto:returns@kliqenergy.com" className="text-kliq-vermilion hover:underline">
                  returns@kliqenergy.com
                </a>
              </p>
              <p className="font-body text-xs text-white/70">For return requests &amp; RMA labels</p>
            </div>
            <div className="p-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl space-y-1">
              <p className="font-display text-sm text-white">GENERAL SUPPORT</p>
              <p className="font-body text-sm">
                <a href="mailto:support@kliqenergy.com" className="text-kliq-vermilion hover:underline">
                  support@kliqenergy.com
                </a>
              </p>
              <p className="font-body text-xs text-white/70">For damaged / incorrect orders</p>
            </div>
          </div>
          <p className="font-body text-xs text-white/70 leading-relaxed mt-4">
            Response time: within 1–2 business days (Monday–Friday, excluding federal holidays).
          </p>
        </div>

      </section>

      <Footer />
    </div>
  )
}
