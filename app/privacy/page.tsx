import type { Metadata } from 'next'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | KLIQ Energy',
  description:
    'How KLIQ Energy Inc. collects, uses, and protects your personal information. Your privacy matters to us.',
}

export default function PrivacyPage() {
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
            PRIVACY POLICY
          </h1>
          <p className="font-body text-white/60 text-sm">Last updated: March 31, 2026</p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* Intro */}
      <div className="max-w-3xl mx-auto px-6 mt-10">
        <p className="font-body text-sm text-white/75 leading-relaxed">
          KLIQ Energy Inc. (&quot;KLIQ,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit kliqenergy.com (the &quot;Site&quot;) or make a purchase. Please read this policy carefully. If you disagree with its terms, please discontinue use of the Site.
        </p>
      </div>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 pb-24 space-y-10 mt-10">

        <div>
          <h2 className="font-display text-2xl text-white mb-4">1. INFORMATION WE COLLECT</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            We collect information you voluntarily provide and information collected automatically when you interact with the Site.
          </p>

          <h3 className="font-display text-lg text-white/80 mb-3">Information You Provide</h3>
          <ul className="font-body text-sm text-white/75 leading-relaxed space-y-2 mb-6">
            {[
              'Account registration data: name, email address, password.',
              'Order information: billing address, shipping address, payment details (processed securely — we do not store full card numbers).',
              'Communications: messages sent via contact forms, customer support emails, or survey responses.',
              'Marketing opt-ins: email address if you subscribe to our newsletter or promotional communications.',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-kliq-vermilion shrink-0 mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-display text-lg text-white/80 mb-3">Information Collected Automatically</h3>
          <ul className="font-body text-sm text-white/75 leading-relaxed space-y-2">
            {[
              'Log data: IP address, browser type, operating system, referring URLs, pages viewed, and timestamps.',
              'Device information: device type, screen resolution, and hardware model.',
              'Cookie and tracking data: cookies, web beacons, and pixel tags (see our Cookie Policy for details).',
              'Usage data: clickstream behavior, session duration, and feature interactions.',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-kliq-vermilion shrink-0 mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">2. HOW WE USE YOUR INFORMATION</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            We use the information we collect for the following purposes:
          </p>
          <ul className="font-body text-sm text-white/75 leading-relaxed space-y-2">
            {[
              'Processing and fulfilling your orders, including sending order confirmations, shipping notifications, and customer support.',
              'Managing your account and providing you access to your purchase history and preferences.',
              'Sending transactional communications related to your account or orders.',
              'Sending promotional emails and offers (only if you have opted in; you may unsubscribe at any time).',
              'Analyzing Site usage to improve our website, product offerings, and user experience.',
              'Detecting and preventing fraudulent transactions, unauthorized access, and other illegal activities.',
              'Complying with applicable laws, regulations, and legal obligations.',
              'Responding to your inquiries and providing customer support.',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-kliq-vermilion shrink-0 mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">3. COOKIES AND TRACKING TECHNOLOGIES</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            We use cookies, web beacons, and similar tracking technologies to enhance your experience on our Site, understand traffic patterns, and deliver relevant content. You can control cookie settings through your browser. For a full breakdown of the types of cookies we use and how to manage them, please review our{' '}
            <a href="/cookies" className="text-kliq-vermilion hover:underline">Cookie Policy</a>.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">4. SHARING YOUR INFORMATION</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            We do not sell, rent, or trade your personal information. We may share your data with trusted third parties only as necessary to operate our business:
          </p>
          <ul className="font-body text-sm text-white/75 leading-relaxed space-y-3">
            {[
              { title: 'Shopify', desc: 'Our e-commerce platform provider processes order and payment data on our behalf. Shopify operates under its own privacy policy and is compliant with PCI-DSS standards.' },
              { title: 'Shipping Carriers', desc: 'We share your name and shipping address with carriers (UPS, FedEx, USPS) solely for delivery purposes.' },
              { title: 'Analytics Providers', desc: 'We use Google Analytics and similar tools to understand Site usage. These providers may collect anonymized browsing data. You can opt out via Google\'s opt-out tools.' },
              { title: 'Email Marketing', desc: 'If you subscribe to marketing emails, your email is stored with our email service provider (e.g., Klaviyo or Mailchimp) and used only for authorized communications.' },
              { title: 'Legal Compliance', desc: 'We may disclose your information if required by law, subpoena, court order, or to protect the rights, property, or safety of KLIQ Energy Inc., our customers, or the public.' },
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-kliq-vermilion shrink-0 mt-0.5">—</span>
                <span><span className="text-white/70">{item.title}:</span> {item.desc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">5. DATA RETENTION</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Order records are typically retained for seven (7) years for tax and accounting compliance. You may request deletion of your account and personal data at any time (subject to legal and contractual retention obligations) by contacting us at privacy@kliqenergy.com. We will process deletion requests within 30 days.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">6. DATA SECURITY</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            We implement industry-standard technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. All data transmitted between your browser and our Site is encrypted using TLS/SSL. Payment processing is handled by PCI-DSS compliant processors. However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security, and you transmit data at your own risk.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">7. YOUR RIGHTS — CCPA (CALIFORNIA)</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            If you are a California resident, the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA) grant you the following rights:
          </p>
          <ul className="font-body text-sm text-white/75 leading-relaxed space-y-2">
            {[
              'Right to Know: Request disclosure of the categories and specific pieces of personal information we have collected about you.',
              'Right to Delete: Request deletion of your personal information, subject to certain exceptions.',
              'Right to Correct: Request correction of inaccurate personal information.',
              'Right to Opt-Out: Direct us not to sell or share your personal information (we do not sell personal information).',
              'Right to Non-Discrimination: We will not discriminate against you for exercising your privacy rights.',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-kliq-vermilion shrink-0 mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="font-body text-sm text-white/75 leading-relaxed mt-4">
            To exercise your CCPA rights, email us at privacy@kliqenergy.com with the subject line &quot;California Privacy Rights Request.&quot; We will verify your identity and respond within 45 days.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">8. YOUR RIGHTS — GDPR (EEA/UK)</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            If you are located in the European Economic Area or United Kingdom, you have the following rights under the General Data Protection Regulation (GDPR):
          </p>
          <ul className="font-body text-sm text-white/75 leading-relaxed space-y-2">
            {[
              'Right of Access: Obtain a copy of your personal data.',
              'Right to Rectification: Request correction of inaccurate data.',
              'Right to Erasure ("Right to be Forgotten"): Request deletion of your personal data.',
              'Right to Restrict Processing: Request that we limit how we use your data.',
              'Right to Data Portability: Receive your data in a structured, machine-readable format.',
              'Right to Object: Object to processing based on legitimate interests or for direct marketing purposes.',
              'Right to Withdraw Consent: Where processing is based on consent, withdraw consent at any time without affecting prior processing.',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-kliq-vermilion shrink-0 mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="font-body text-sm text-white/75 leading-relaxed mt-4">
            Our legal bases for processing include: performance of a contract (order fulfillment), legitimate interests (fraud prevention, improving the Site), compliance with legal obligations, and consent (marketing emails). To exercise GDPR rights, contact privacy@kliqenergy.com. You also have the right to lodge a complaint with your local data protection authority.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">9. CHILDREN&apos;S PRIVACY</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            Our Site and products are not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will promptly delete it. If you believe we may have inadvertently collected information from a child, please contact us at privacy@kliqenergy.com.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">10. THIRD-PARTY LINKS</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            Our Site may contain links to third-party websites or services not operated by KLIQ Energy Inc. We have no control over the content or privacy practices of those sites and are not responsible for their privacy policies. We encourage you to review the privacy policy of every website you visit.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">11. CHANGES TO THIS POLICY</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            We reserve the right to update this Privacy Policy at any time. When we make material changes, we will post the updated policy on this page and update the &quot;Last updated&quot; date. Where required by law, we will notify you by email or by displaying a prominent notice on the Site prior to the change becoming effective. Your continued use of the Site after any changes constitutes your acceptance of the revised policy.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">12. CONTACT US</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="mt-4 p-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl space-y-1">
            <p className="font-body text-sm text-white/70">KLIQ Energy Inc.</p>
            <p className="font-body text-sm text-white/70">Privacy &amp; Data Protection</p>
            <p className="font-body text-sm">
              <a href="mailto:privacy@kliqenergy.com" className="text-kliq-vermilion hover:underline">
                privacy@kliqenergy.com
              </a>
            </p>
          </div>
        </div>

      </section>

      <Footer />
    </div>
  )
}
