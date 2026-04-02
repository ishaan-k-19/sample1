import type { Metadata } from 'next'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service | KLIQ Energy',
  description:
    'Read the Terms of Service for KLIQ Energy Inc. Governing the use of our website and the purchase of KLIQ Protein Energy Drink products.',
}

export default function TermsPage() {
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
            TERMS OF SERVICE
          </h1>
          <p className="font-body text-white/60 text-sm">Last updated: March 31, 2026</p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 pb-24 space-y-10 mt-10">

        <div>
          <h2 className="font-display text-2xl text-white mb-4">1. ACCEPTANCE OF TERMS</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            By accessing or using the website located at kliqenergy.com (the &quot;Site&quot;) or purchasing any product offered by KLIQ Energy Inc. (&quot;KLIQ,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to all of these Terms, do not access or use the Site or purchase our products. These Terms constitute a legally binding agreement between you and KLIQ Energy Inc. We reserve the right to modify these Terms at any time. Continued use of the Site after changes are posted constitutes your acceptance of the revised Terms.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">2. USE OF THE WEBSITE</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            You agree to use the Site only for lawful purposes and in a manner that does not infringe the rights of others or restrict or inhibit their use of the Site. Prohibited conduct includes but is not limited to:
          </p>
          <ul className="font-body text-sm text-white/75 leading-relaxed space-y-2 list-none">
            {[
              'Transmitting any material that is unlawful, harmful, threatening, abusive, defamatory, or otherwise objectionable.',
              'Attempting to gain unauthorized access to any part of the Site or related systems.',
              'Using automated bots, scrapers, or crawlers to extract data from the Site without prior written consent.',
              'Engaging in any conduct that could damage, disable, or impair the proper functioning of the Site.',
              'Reproducing, duplicating, copying, selling, or reselling any portion of the Site without our express written permission.',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-kliq-vermilion shrink-0 mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="font-body text-sm text-white/75 leading-relaxed mt-4">
            You must be at least 13 years of age to use this Site. If you are under 18, you may only use the Site with the involvement and consent of a parent or legal guardian.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">3. PRODUCT PURCHASES</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            All purchases made through the Site are subject to availability and our acceptance of your order. We reserve the right to refuse or cancel any order at our sole discretion, including orders that appear to be placed by resellers, dealers, or distributors without prior authorization.
          </p>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            Product descriptions, images, and nutritional information are provided for informational purposes. While we strive for accuracy, KLIQ Energy Inc. does not warrant that product descriptions are complete, reliable, current, or error-free. In the event a product is listed at an incorrect price due to a typographical or system error, we reserve the right to cancel any orders placed at the incorrect price.
          </p>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            KLIQ products are food and beverage items intended for healthy adults. They are not intended to diagnose, treat, cure, or prevent any disease. Consult a healthcare professional before consuming if you are pregnant, nursing, have a medical condition, or are taking prescription medication.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">4. PRICING AND PAYMENT</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            All prices displayed on the Site are in US Dollars (USD) unless otherwise stated. Prices are subject to change without notice. Applicable taxes will be calculated and added at checkout based on the shipping destination.
          </p>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            We accept major credit and debit cards (Visa, Mastercard, American Express, Discover), Apple Pay, Google Pay, and Shop Pay. All payment information is encrypted and processed securely through our payment provider. KLIQ Energy Inc. does not store your full credit card details on our servers.
          </p>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            By placing an order, you represent and warrant that the payment information you provide is accurate, that you are authorized to use the payment method, and that your order will be honored by your card issuer or payment provider. We reserve the right to verify your identity or payment information prior to processing any order.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">5. SHIPPING AND DELIVERY</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            Orders are typically processed within 1–2 business days. Estimated delivery times begin after order processing and are not guaranteed. KLIQ Energy Inc. is not responsible for delays caused by carriers, customs, weather events, or other circumstances beyond our control.
          </p>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            Risk of loss and title for products purchased from the Site passes to you upon delivery to the carrier. For complete shipping details including rates and timelines, please review our <a href="/shipping" className="text-kliq-vermilion hover:underline">Shipping Policy</a>.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">6. RETURNS AND REFUNDS</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            We offer a 30-day return policy for unopened, undamaged products. Opened consumable products cannot be returned for health and safety reasons unless the product was defective or damaged upon receipt. Refunds are issued to the original payment method within 3–5 business days of receiving and inspecting the returned product. For complete details, please review our <a href="/returns" className="text-kliq-vermilion hover:underline">Returns &amp; Refunds Policy</a>.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">7. INTELLECTUAL PROPERTY</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            All content on this Site, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, is the exclusive property of KLIQ Energy Inc. or its content suppliers and is protected by United States and international copyright, trademark, and intellectual property laws.
          </p>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            The KLIQ name, logo, and all related product names, design marks, and slogans are trademarks or registered trademarks of KLIQ Energy Inc. You may not use any KLIQ trademark in any manner that is likely to cause confusion among consumers, disparages or discredits KLIQ, or without our express prior written permission.
          </p>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Site for personal, non-commercial purposes. This license does not include the right to copy, reproduce, distribute, transmit, display, sell, or otherwise exploit any Site content for any commercial purpose.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">8. USER-GENERATED CONTENT</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            If you submit reviews, comments, photos, or other content to the Site or tag KLIQ on social media (&quot;User Content&quot;), you grant KLIQ Energy Inc. a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such User Content worldwide in any media.
          </p>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            You represent and warrant that you own or otherwise control all rights in your User Content, that the content is accurate, and that use of your content does not violate these Terms or any applicable law. KLIQ reserves the right to remove any User Content at its sole discretion.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">9. DISCLAIMERS</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            THE SITE AND ALL PRODUCTS ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
          </p>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            KLIQ Energy Inc. does not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components. We do not warrant that the information provided on this Site is accurate, complete, or current. KLIQ makes no claims about the suitability of the products for any specific individual without prior consultation with a qualified healthcare professional.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">10. LIMITATION OF LIABILITY</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, KLIQ ENERGY INC. AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, SUPPLIERS, AND LICENSORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO YOUR USE OF (OR INABILITY TO USE) THE SITE OR PRODUCTS.
          </p>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            In no event shall KLIQ Energy Inc.&apos;s total aggregate liability to you for all claims arising out of or relating to these Terms or your use of the Site exceed the greater of (a) the total amount paid by you to KLIQ Energy Inc. in the twelve (12) months preceding the claim, or (b) one hundred US dollars ($100.00).
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">11. INDEMNIFICATION</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            You agree to defend, indemnify, and hold harmless KLIQ Energy Inc. and its affiliates, officers, directors, employees, contractors, agents, licensors, and service providers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising out of or relating to your violation of these Terms, your use of the Site, your User Content, or your violation of any third-party rights.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">12. GOVERNING LAW AND DISPUTE RESOLUTION</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States of America, without regard to its conflict of law provisions. You agree that any dispute arising under or relating to these Terms or the Site shall be subject to the exclusive jurisdiction of the state and federal courts located in Delaware, and you consent to the personal jurisdiction of such courts.
          </p>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            Before initiating any formal legal proceeding, you agree to first contact us at legal@kliqenergy.com to attempt to resolve the dispute informally. We will make good-faith efforts to resolve your concern within 30 days of receipt. If the dispute is not resolved informally, either party may pursue claims individually in small claims court if eligible, or in binding arbitration in accordance with the American Arbitration Association Consumer Arbitration Rules.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">13. SEVERABILITY AND WAIVER</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            If any provision of these Terms is held to be invalid or unenforceable, such provision shall be modified to the minimum extent necessary to make it enforceable, and the remaining provisions shall continue in full force and effect. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">14. ENTIRE AGREEMENT</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            These Terms, together with our Privacy Policy, Cookie Policy, Shipping Policy, and Returns &amp; Refunds Policy, constitute the entire agreement between you and KLIQ Energy Inc. with respect to the subject matter hereof and supersede all prior or contemporaneous understandings, agreements, representations, and warranties, whether written or oral.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">15. CONTACT INFORMATION</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            If you have questions, concerns, or requests regarding these Terms of Service, please contact us at:
          </p>
          <div className="mt-4 p-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl space-y-1">
            <p className="font-body text-sm text-white/70">KLIQ Energy Inc.</p>
            <p className="font-body text-sm text-white/70">Legal Department</p>
            <p className="font-body text-sm">
              <a href="mailto:legal@kliqenergy.com" className="text-kliq-vermilion hover:underline">
                legal@kliqenergy.com
              </a>
            </p>
          </div>
        </div>

      </section>

      <Footer />
    </div>
  )
}
