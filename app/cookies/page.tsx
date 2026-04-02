import type { Metadata } from 'next'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'

export const metadata: Metadata = {
  title: 'Cookie Policy | KLIQ Energy',
  description:
    'Learn how KLIQ Energy uses cookies and tracking technologies on our website, and how you can manage your preferences.',
}

const cookieTypes = [
  {
    type: 'Essential',
    purpose: 'Required for core site functionality',
    examples: 'Session tokens, shopping cart persistence, security tokens',
    canDisable: false,
    retention: 'Session / up to 1 year',
  },
  {
    type: 'Analytics',
    purpose: 'Understand how visitors interact with the Site',
    examples: 'Google Analytics, page view tracking, heatmaps',
    canDisable: true,
    retention: 'Up to 2 years',
  },
  {
    type: 'Marketing',
    purpose: 'Deliver relevant ads and track campaign performance',
    examples: 'Meta Pixel, Google Ads conversion tracking, retargeting',
    canDisable: true,
    retention: 'Up to 1 year',
  },
  {
    type: 'Preferences',
    purpose: 'Remember your settings and personalization choices',
    examples: 'Language preference, dismissed banners, theme',
    canDisable: true,
    retention: 'Up to 1 year',
  },
]

export default function CookiesPage() {
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
            COOKIE POLICY
          </h1>
          <p className="font-body text-white/70 text-sm">Last updated: March 31, 2026</p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 pb-24 space-y-10 mt-10">

        <div>
          <h2 className="font-display text-2xl text-white mb-4">WHAT ARE COOKIES?</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently, improve the user experience, and provide information to the website operators.
          </p>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            Cookies can be &quot;session cookies&quot; — which are deleted when you close your browser — or &quot;persistent cookies,&quot; which remain on your device for a set period or until you manually delete them. Some cookies are set by us directly (&quot;first-party cookies&quot;), while others are set by third-party services we use (&quot;third-party cookies&quot;).
          </p>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            In addition to cookies, we may use similar technologies such as web beacons (also called &quot;tracking pixels&quot;), local storage, and session storage. These technologies work similarly to cookies and are covered by this policy.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">HOW WE USE COOKIES</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            KLIQ Energy Inc. uses cookies and similar technologies for the following purposes:
          </p>
          <ul className="font-body text-sm text-white/75 leading-relaxed space-y-2">
            {[
              'To keep your shopping cart active between visits so you don\'t lose your selections.',
              'To authenticate your account and maintain a secure session.',
              'To remember your preferences such as language and notification settings.',
              'To analyze how visitors use our Site so we can improve content, layout, and performance.',
              'To measure the effectiveness of our advertising campaigns on platforms such as Meta (Instagram/Facebook) and Google.',
              'To prevent fraudulent activity and protect our users.',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-kliq-vermilion shrink-0 mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-6">TYPES OF COOKIES WE USE</h2>

          {/* Cookie table */}
          <div className="space-y-3">
            {cookieTypes.map((cookie) => (
              <div
                key={cookie.type}
                className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display text-lg text-white">{cookie.type.toUpperCase()}</span>
                  <span
                    className={`font-body text-xs px-3 py-1 rounded-full ${
                      cookie.canDisable
                        ? 'bg-white/[0.06] text-white/75'
                        : 'bg-kliq-vermilion/20 text-kliq-vermilion'
                    }`}
                  >
                    {cookie.canDisable ? 'Optional' : 'Required'}
                  </span>
                </div>
                <p className="font-body text-sm text-white/75 mb-2">
                  <span className="text-white/80">Purpose: </span>
                  {cookie.purpose}
                </p>
                <p className="font-body text-sm text-white/75 mb-2">
                  <span className="text-white/80">Examples: </span>
                  {cookie.examples}
                </p>
                <p className="font-body text-sm text-white/75">
                  <span className="text-white/80">Retention: </span>
                  {cookie.retention}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">THIRD-PARTY COOKIES</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
            Some cookies on our Site are set by third-party service providers. These third parties have their own privacy policies and we encourage you to review them:
          </p>
          <ul className="font-body text-sm text-white/75 leading-relaxed space-y-3">
            {[
              {
                name: 'Google Analytics',
                desc: 'Used to track and report website traffic and user behavior. Google may use this data to personalize ads in the Google Display Network.',
                link: 'https://policies.google.com/privacy',
              },
              {
                name: 'Meta Pixel (Facebook/Instagram)',
                desc: 'Used to measure the effectiveness of our advertising, build audiences for retargeting, and track conversions from our Meta ad campaigns.',
                link: 'https://www.facebook.com/privacy/policy/',
              },
              {
                name: 'Shopify',
                desc: 'Our e-commerce platform sets cookies to manage the shopping cart, checkout session, and fraud prevention.',
                link: 'https://www.shopify.com/legal/privacy',
              },
              {
                name: 'Klaviyo / Email Marketing',
                desc: 'Used to track email campaign engagement, including open rates and click-throughs, and to personalize email content.',
                link: 'https://www.klaviyo.com/legal/privacy-notice',
              },
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-kliq-vermilion shrink-0 mt-0.5">—</span>
                <span>
                  <span className="text-white/70">{item.name}: </span>
                  {item.desc}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">HOW TO CONTROL COOKIES</h2>

          <h3 className="font-display text-lg text-white/80 mb-3">Browser Settings</h3>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-6">
            Most web browsers allow you to manage cookies through their settings. You can set your browser to refuse all cookies, accept only first-party cookies, or notify you when a cookie is set. Please be aware that disabling cookies — especially essential cookies — may affect the functionality of our Site (for example, you may not be able to add items to your cart or complete a purchase).
          </p>
          <p className="font-body text-sm text-white/75 leading-relaxed mb-6">
            For instructions on how to manage cookies in popular browsers:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {['Chrome', 'Firefox', 'Safari', 'Edge'].map((browser) => (
              <div
                key={browser}
                className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center"
              >
                <span className="font-body text-sm text-white/75">{browser}</span>
              </div>
            ))}
          </div>
          <p className="font-body text-xs text-white/70 leading-relaxed mb-6">
            Visit the help documentation of your browser provider for specific instructions on managing cookie preferences.
          </p>

          <h3 className="font-display text-lg text-white/80 mb-3">Opt-Out Tools</h3>
          <ul className="font-body text-sm text-white/75 leading-relaxed space-y-2">
            {[
              'Google Analytics: Install the Google Analytics Opt-out Browser Add-on at tools.google.com/dlpage/gaoptout.',
              'Meta / Facebook: Manage your ad preferences at facebook.com/ads/preferences.',
              'Digital Advertising Alliance: Use the opt-out tool at optout.aboutads.info to opt out of interest-based advertising from participating companies.',
              'Network Advertising Initiative: Use the opt-out tool at optout.networkadvertising.org.',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-kliq-vermilion shrink-0 mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">DO NOT TRACK</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            Some browsers include a &quot;Do Not Track&quot; (DNT) feature that signals to websites that you do not want your online activity tracked. Because there is currently no universally accepted standard for how to respond to DNT signals, our Site does not currently alter its behavior in response to DNT signals. We will update this policy if industry standards for DNT are established.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">UPDATES TO THIS POLICY</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our practices. Any changes will be posted on this page with an updated &quot;Last updated&quot; date. We encourage you to review this page periodically.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white mb-4">CONTACT US</h2>
          <p className="font-body text-sm text-white/75 leading-relaxed">
            If you have questions about our use of cookies or this Cookie Policy, please contact us:
          </p>
          <div className="mt-4 p-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl space-y-1">
            <p className="font-body text-sm text-white/70">KLIQ Energy Inc.</p>
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
