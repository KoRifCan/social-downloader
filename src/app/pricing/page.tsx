import { PricingCard } from '@/components/pricing/PricingCard'
import { FeatureComparison } from '@/components/pricing/FeatureComparison'
import { JsonLd } from '@/components/seo/JsonLd'
import { productSchema } from '@/lib/schema'
import { APP_URL } from '@/lib/constants'
import { ChevronDown } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'mo',
    features: [
      '720p video quality',
      '5 downloads per day',
      'MP4 format only',
      'Basic support',
      'Ads supported',
    ],
  },
  {
    name: 'Pro',
    price: '$4.99',
    period: 'mo',
    popular: true,
    features: [
      '1080p video quality',
      '60 downloads per day',
      'MP4 & MP3 formats',
      'API access',
      'No ads',
      'Priority email support',
      '1GB cloud storage',
    ],
  },
  {
    name: 'Unlimited',
    price: '$49',
    period: 'one-time',
    features: [
      '4K video quality',
      'Unlimited downloads',
      'All formats (MP4, MP3, WEBM, GIF)',
      'Full API access',
      'No ads, forever',
      'Priority support',
      '10GB cloud storage',
      'Team sharing',
      'Batch download',
    ],
  },
]

const faqs = [
  { q: 'Is there a free trial for paid plans?', a: 'We don\'t offer a free trial, but the Free plan lets you try the service with 5 daily downloads at 720p quality.' },
  { q: 'Can I switch plans anytime?', a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and cryptocurrency payments.' },
  { q: 'Is the Unlimited plan truly one-time payment?', a: 'Yes, the Unlimited plan is a one-time payment with lifetime access to all features. No recurring fees.' },
  { q: 'Do you offer refunds?', a: 'We offer a 14-day money-back guarantee on all paid plans. Contact our support team for assistance.' },
  { q: 'Can I use my plan on multiple devices?', a: 'Yes, your plan works across all your devices. Just log in to your account on any device.' },
]

export default function PricingPage() {
  return (
    <>
      <JsonLd data={productSchema('SocialHD Downloader Pro', 4.99)} />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Choose the plan that fits your needs. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto mb-20">
          {plans.map(plan => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>

        <div className="mb-20">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">Compare Plans</h2>
          <FeatureComparison />
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group glass rounded-xl [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4">
                  <span className="text-sm font-medium text-white">{faq.q}</span>
                  <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-white/5 px-6 py-4">
                  <p className="text-sm text-gray-400">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
