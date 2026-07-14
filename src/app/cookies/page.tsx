import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { APP_URL, APP_NAME } from '@/lib/constants'

const cookieTypes = [
  { name: 'Essential Cookies', purpose: 'These cookies are necessary for the website to function properly.', examples: ['Session token', 'CSRF token', 'Authentication cookie'], duration: 'Session / 24 hours' },
  { name: 'Analytics Cookies', purpose: 'These cookies help us understand how users interact with our website.', examples: ['_ga (Google Analytics)', '_gid (Google Analytics)', '_gat (Google Analytics)'], duration: 'Up to 2 years' },
  { name: 'Preference Cookies', purpose: 'These cookies remember your preferences and settings.', examples: ['theme preference', 'language setting', 'video quality preference'], duration: 'Up to 1 year' },
  { name: 'Marketing Cookies', purpose: 'These cookies are used to deliver relevant advertisements.', examples: ['_fbp (Facebook Pixel)', '_gcl_au (Google Ads)'], duration: 'Up to 90 days' },
  { name: 'Functional Cookies', purpose: 'These cookies enable additional functionality.', examples: ['recent downloads', 'platform preference', 'UI state'], duration: 'Up to 30 days' },
]

export default function CookiesPage() {
  return (
    <div>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: APP_URL }, { name: 'Cookie Policy', url: APP_URL + '/cookies' }])} />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Cookie Policy</h1>
          <p className="mt-4 text-gray-400">Last updated: January 1, 2025</p>
        </div>
        <div className="space-y-6">
          <div className="glass rounded-xl p-6">
            <p className="text-sm leading-relaxed text-gray-400">
              This Cookie Policy explains how {APP_NAME} uses cookies and similar tracking technologies when you visit our website. By using our service, you consent to the use of cookies as described in this policy.
            </p>
          </div>
          <div className="glass rounded-xl p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">What Are Cookies?</h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, analyze site traffic, and provide personalized experiences.
            </p>
          </div>
          {cookieTypes.map((cookie, i) => (
            <div key={i} className="glass rounded-xl p-6">
              <h3 className="mb-2 text-lg font-semibold text-white">{cookie.name}</h3>
              <p className="mb-3 text-sm leading-relaxed text-gray-400">{cookie.purpose}</p>
              <div className="mb-2">
                <span className="text-xs font-medium text-gray-500">Examples:</span>
                <ul className="ml-4 mt-1 list-disc text-sm text-gray-400">
                  {cookie.examples.map((ex, j) => <li key={j}>{ex}</li>)}
                </ul>
              </div>
              <span className="text-xs text-gray-500">Duration: {cookie.duration}</span>
            </div>
          ))}
          <div className="glass rounded-xl p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">Managing Cookies</h2>
            <p className="text-sm leading-relaxed text-gray-400">
              You can control and manage cookies through your browser settings. Most browsers allow you to block or delete cookies. However, disabling certain cookies may affect the functionality of our website.
            </p>
          </div>
          <div className="glass rounded-xl p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">Contact Us</h2>
            <p className="text-sm leading-relaxed text-gray-400">
              If you have questions about our use of cookies, please <Link href="/contact" className="text-brand-400 hover:underline">contact us</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
