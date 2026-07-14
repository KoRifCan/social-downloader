import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { APP_URL, APP_NAME } from '@/lib/constants'

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly, such as your name and email address when creating an account. We also automatically collect certain information when you use our service, including your IP address, browser type, device information, and usage data.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the collected information to provide and improve our service, process your downloads, send important account notifications, respond to your inquiries, and personalize your experience. We do not sell your personal information to third parties.`,
  },
  {
    title: '3. Cookies and Tracking',
    content: `We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and remember your preferences. You can control cookie settings through your browser. See our Cookie Policy for more details.`,
  },
  {
    title: '4. Third-Party Services',
    content: `We may integrate with third-party services for analytics (Google Analytics), payment processing (Stripe, PayPal), and authentication. These services have their own privacy policies and may collect information as governed by their terms.`,
  },
  {
    title: '5. Data Security',
    content: `We implement industry-standard security measures including encryption in transit (TLS/SSL) and at rest, regular security audits, and access controls. However, no method of transmission over the Internet is 100% secure.`,
  },
  {
    title: '6. Data Retention',
    content: `We retain your account information for as long as your account is active. Download history and usage data are retained for analytics purposes and may be anonymized after 12 months. You can request deletion of your data at any time.`,
  },
  {
    title: '7. Your Rights',
    content: `You have the right to access, correct, or delete your personal data. You may also request a copy of your data, restrict processing, or object to processing. To exercise these rights, contact us at privacy@socialhd.com.`,
  },
  {
    title: "8. Children's Privacy",
    content: `Our service is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will take steps to delete the information promptly.`,
  },
  {
    title: '9. International Data Transfers',
    content: `Your information may be transferred to and processed in servers located in the United States and other countries. By using our service, you consent to such transfers in accordance with this Privacy Policy.`,
  },
  {
    title: '10. Contact Us',
    content: `If you have any questions about this Privacy Policy, please contact us at privacy@socialhd.com or through our contact page. We will respond to your inquiry within 30 days.`,
  },
]

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: APP_URL }, { name: 'Privacy Policy', url: `${APP_URL}/privacy` }])} />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Privacy Policy</h1>
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
