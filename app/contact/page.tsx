'use client'

import { useState } from 'react'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import { Mail, MapPin, Instagram, Twitter, Youtube, Send, CheckCircle } from 'lucide-react'

const storeLocations = [
  { city: 'New York, NY', store: 'GNC Midtown', address: '123 5th Ave, New York, NY 10001' },
  { city: 'Los Angeles, CA', store: 'Vitamin Shoppe', address: '456 Sunset Blvd, LA, CA 90028' },
  { city: 'Chicago, IL', store: 'Whole Foods Market', address: '789 Michigan Ave, Chicago, IL 60601' },
  { city: 'Houston, TX', store: 'HEB Plus', address: '321 Westheimer Rd, Houston, TX 77027' },
  { city: 'Miami, FL', store: 'Total Wine & More', address: '654 Brickell Ave, Miami, FL 33131' },
  { city: 'Denver, CO', store: 'Natural Grocers', address: '987 Colfax Ave, Denver, CO 80204' },
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setFormState('success')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero */}
      <section className="pt-36 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <span className="font-body text-xs tracking-[0.3em] text-kliq-vermilion uppercase block mb-4">
            Get In Touch
          </span>
          <h1 className="font-display text-7xl md:text-9xl text-white leading-[0.9]">
            CONTACT <span className="text-kliq-vermilion">US.</span>
          </h1>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-display text-2xl text-white mb-6">REACH OUT</h2>
              <div className="space-y-4">
                <a
                  href="mailto:hello@kliqenergy.com"
                  className="flex items-center gap-4 p-4 bg-kliq-asphalt rounded-2xl border border-white/[0.06] hover:border-kliq-vermilion/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-kliq-vermilion/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-kliq-vermilion/20">
                    <Mail className="w-5 h-5 text-kliq-vermilion" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-white/75 mb-0.5">Email</p>
                    <p className="font-body text-sm text-white">hello@kliqenergy.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-display text-lg text-white mb-4">FOLLOW KLIQ</h3>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, label: 'Instagram', href: '#' },
                  { icon: Twitter, label: 'Twitter', href: '#' },
                  { icon: Youtube, label: 'YouTube', href: '#' },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-11 h-11 bg-kliq-asphalt border border-white/[0.06] rounded-full flex items-center justify-center text-white/65 hover:bg-kliq-vermilion hover:text-white hover:border-kliq-vermilion transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Response time */}
            <div className="p-5 bg-kliq-vermilion/5 border border-kliq-vermilion/20 rounded-2xl">
              <p className="font-display text-sm text-kliq-vermilion mb-1">RESPONSE TIME</p>
              <p className="font-body text-sm text-white/75">
                We typically respond within 24–48 hours on business days.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            {formState === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 gap-4">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-display text-3xl text-white">MESSAGE SENT!</h3>
                <p className="font-body text-white/75 max-w-sm">
                  Thanks for reaching out. We'll get back to you within 24–48 hours.
                </p>
                <button
                  onClick={() => { setFormState('idle'); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  className="mt-4 px-6 py-3 bg-kliq-vermilion text-white rounded-full font-body font-semibold hover:bg-kliq-vermilion-deep transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body text-xs text-white/75 uppercase tracking-widest block mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full bg-kliq-asphalt border border-white/10 rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/40 focus:outline-none focus:border-kliq-vermilion transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-white/75 uppercase tracking-widest block mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-kliq-asphalt border border-white/10 rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/40 focus:outline-none focus:border-kliq-vermilion transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-body text-xs text-white/75 uppercase tracking-widest block mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full bg-kliq-asphalt border border-white/10 rounded-xl px-4 py-3 font-body text-sm text-white focus:outline-none focus:border-kliq-vermilion transition-colors appearance-none"
                  >
                    <option value="" className="bg-kliq-asphalt">Select a topic</option>
                    <option value="order" className="bg-kliq-asphalt">Order / Shipping</option>
                    <option value="product" className="bg-kliq-asphalt">Product Question</option>
                    <option value="wholesale" className="bg-kliq-asphalt">Wholesale / Retail</option>
                    <option value="press" className="bg-kliq-asphalt">Press / Media</option>
                    <option value="other" className="bg-kliq-asphalt">Other</option>
                  </select>
                </div>

                <div>
                  <label className="font-body text-xs text-white/75 uppercase tracking-widest block mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="w-full bg-kliq-asphalt border border-white/10 rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/40 focus:outline-none focus:border-kliq-vermilion transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-kliq-vermilion text-white rounded-full font-body font-semibold hover:bg-kliq-vermilion-deep transition-all duration-300 disabled:opacity-70 disabled:cursor-wait"
                >
                  {formState === 'loading' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Store locator */}
      <section id="store-locator" className="px-6 py-20 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-kliq-vermilion" />
            <span className="font-body text-xs tracking-[0.3em] text-kliq-vermilion uppercase">
              Find Us In-Store
            </span>
          </div>
          <h2 className="font-display text-5xl text-white mb-12">STORE LOCATOR</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {storeLocations.map((loc) => (
              <div
                key={loc.city}
                className="p-5 bg-kliq-asphalt rounded-2xl border border-white/[0.06] hover:border-kliq-vermilion/30 transition-all duration-300"
              >
                <p className="font-display text-base text-white mb-1">{loc.city}</p>
                <p className="font-body text-sm text-kliq-vermilion mb-2">{loc.store}</p>
                <p className="font-body text-xs text-white/75">{loc.address}</p>
              </div>
            ))}
          </div>
          <p className="font-body text-sm text-white/70 mt-6 text-center">
            More locations coming soon. For wholesale inquiries,{' '}
            <a href="mailto:wholesale@kliqenergy.com" className="text-kliq-vermilion hover:underline">
              contact our sales team
            </a>
            .
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
