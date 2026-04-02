'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: 'What makes KLIQ different from other protein drinks?',
    answer: 'KLIQ is a protein energy drink with 20g of protein, zero sugar, zero carbs, and zero fats — all with no added caffeine. We built a system for clean performance, not hype. Function over noise.',
  },
  {
    question: 'How much protein is in each can?',
    answer: 'Each 355ml can of KLIQ contains 20g of high-quality protein. That\'s a full protein serving in a refreshing, ready-to-drink format with zero sugar and zero fats.',
  },
  {
    question: 'Does KLIQ contain caffeine?',
    answer: 'No. KLIQ has no added caffeine. Our energy comes from protein and clean ingredients — no jitters, no crash, no stimulants. Just sustained, real energy from nutrition.',
  },
  {
    question: 'What flavors are available?',
    answer: 'KLIQ comes in 5 bold flavors: Mixed Berry, Cola, Memo Nade, Mango Pineapple, and Lemonade. Each flavor carries its own visual energy and distinct taste profile.',
  },
  {
    question: 'Where can I buy KLIQ?',
    answer: 'KLIQ is available at select retailers and directly from our website with free shipping on orders over $50. We\'re expanding to more locations — stay tuned.',
  },
  {
    question: 'Do you offer bulk or subscription discounts?',
    answer: 'Absolutely! We offer subscription plans that save you 15% on every order, plus free shipping. Bulk orders for events, gyms, or offices receive special pricing — contact our team for details.',
  },
]

const FAQ = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-white overflow-hidden"
      aria-labelledby="faq-heading"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-kliq-vermilion/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <span
            className="inline-block font-body text-xs sm:text-sm tracking-widest text-kliq-vermilion mb-3 sm:mb-4"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            GOT QUESTIONS?
          </span>
          <h2
            id="faq-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl text-black mb-4 sm:mb-6"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 100ms',
            }}
          >
            FREQUENTLY{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kliq-vermilion to-kliq-vermilion-deep">
              ASKED
            </span>
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4" role="list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="border border-black/10 rounded-xl sm:rounded-2xl overflow-hidden hover:border-black/20 transition-colors duration-300"
                style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                  opacity: isVisible ? 1 : 0,
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${200 + index * 100}ms`,
                }}
                role="listitem"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black/5 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-kliq-vermilion" />
                    </div>
                    <span className="font-body text-sm sm:text-lg text-black pr-2 sm:pr-4">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-black/70 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-500 ${
                    isOpen ? 'max-h-96' : 'max-h-0'
                  }`}
                  role="region"
                  aria-hidden={!isOpen}
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 pl-14 sm:pl-20">
                    <p className="font-body text-sm sm:text-base text-black/75 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div
          className="mt-8 sm:mt-12 text-center"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 800ms',
          }}
        >
          <p className="font-body text-sm text-black/65 mb-4">
            Still have questions?
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 sm:px-8 py-3 bg-black/10 text-black rounded-full font-body font-semibold text-sm hover:bg-black/20 transition-colors duration-300"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FAQ
