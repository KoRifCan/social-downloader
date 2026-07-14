import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { APP_URL, APP_NAME } from '@/lib/constants'

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using ${APP_NAME}, you agree to be bound by these Terms of Service. If you do not agree, please do not use our service. We reserve the right to update these terms at any time without prior notice.`,
  },
  {
    title: '2. Description of Service',
    content: `${APP_NAME} provides a platform that allows users to download media content from various social media platforms. The service is provided "as is" and we make no guarantees regarding availability, accuracy, or reliability.`,
  },
  {
    title: '3. User Accounts',
    content: `You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately of any unauthorized use. You are responsible for all activities that occur under your account.`,
  },
  {
    title: '4. Payments and Subscriptions',
    content: `Paid plans are billed in advance on a monthly or one-time basis. Refunds are provided within 14 days of purchase for eligible plans. We reserve the right to change pricing with 30 days notice. Subscription cancellations take effect at the end of the current billing period.`,
  },
  {
    title: '5. Prohibited Uses',
    content: `You agree not to: (a) Use the service for any illegal purpose; (b) Violate any intellectual property rights; (c) Distribute copyrighted content without permission; (d) Attempt to circumvent rate limits or security measures; (e) Use automated tools to abuse the service; (f) Download content that violates the terms of the source platform.`,
  },
  {
    title: '6. Intellectual Property',
    content: `Users retain all rights to content they download. However, you must ensure you have the legal right to download and use the content. ${APP_NAME} does not claim ownership of any downloaded content.`,
  },
  {
    title: '7. Limitation of Liability',
    content: `${APP_NAME} shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service. Our total liability is limited to the amount paid by you in the past 12 months.`,
  },
  {
    title: '8. Termination',
    content: `We reserve the right to suspend or terminate your access to the service at any time, without prior notice, for conduct that we believe violates these terms or is harmful to other users, third parties, or the service itself.`,
  },
  {
    title: '9. Governing Law',
    content: `These terms shall be governed by and construed in accordance with the laws of the United States. Any disputes shall be resolved through binding arbitration.`,
  },
  {
    title: '10. Contact Information',
    content: `For questions about these Terms of Service, please contact us at legal@socialhd.com or through our contact page.`,
  },
]

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: APP_URL }, { name: 'Terms of Service', url: `${APP_URL}/terms` }])} />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-gray-400">Last updated: January 1, 2025</p>
        </div>

        <div className="space-y-8">
          {sections.map(section => (
            <div key={section.title} className="glass rounded-xl p-6">
              <h2 className="mb-3 text-lg font-semibold text-white">{section.title}</h2>
              <p className="text-sm leading-relaxed text-gray-400">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
