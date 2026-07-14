import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { APP_URL, APP_NAME } from '@/lib/constants'

export default function DMCAPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: APP_URL }, { name: 'DMCA', url: `${APP_URL}/dmca` }])} />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">DMCA Policy</h1>
          <p className="mt-4 text-gray-400">Digital Millennium Copyright Act Notice</p>
        </div>

        <div className="space-y-8">
          <div className="glass rounded-xl p-6">
            <h2 className="mb-3 text-lg font-semibold text-white">Copyright Infringement Notification</h2>
            <p className="text-sm leading-relaxed text-gray-400">
              {APP_NAME} respects the intellectual property rights of others and expects its users to do the same. 
              In accordance with the Digital Millennium Copyright Act (DMCA), we will respond promptly to notices 
              of alleged copyright infringement that are reported to our designated Copyright Agent.
            </p>
          </div>

          <div className="glass rounded-xl p-6">
            <h2 className="mb-3 text-lg font-semibold text-white">Filing a DMCA Notice</h2>
            <p className="text-sm leading-relaxed text-gray-400 mb-4">
              If you believe that your copyrighted work has been used in a way that constitutes copyright infringement, 
              please provide our Copyright Agent with the following information in writing:
            </p>
            <ul className="list-inside list-decimal space-y-2 text-sm text-gray-400">
              <li>A physical or electronic signature of the copyright owner or authorized representative</li>
              <li>Identification of the copyrighted work claimed to have been infringed</li>
              <li>Identification of the material that is claimed to be infringing, with sufficient detail for us to locate it</li>
              <li>Your contact information, including address, telephone number, and email address</li>
              <li>A statement that you have a good faith belief that the use is not authorized by the copyright owner</li>
              <li>A statement that the information in the notification is accurate and, under penalty of perjury, that you are authorized to act on behalf of the copyright owner</li>
            </ul>
          </div>

          <div className="glass rounded-xl p-6">
            <h2 className="mb-3 text-lg font-semibold text-white">Counter-Notification</h2>
            <p className="text-sm leading-relaxed text-gray-400 mb-4">
              If you believe that material you posted was removed or disabled by mistake or misidentification, 
              you may file a counter-notification with our Copyright Agent containing:
            </p>
            <ul className="list-inside list-decimal space-y-2 text-sm text-gray-400">
              <li>Your physical or electronic signature</li>
              <li>Identification of the material that has been removed or disabled</li>
              <li>A statement under penalty of perjury that you have a good faith belief that the material was removed as a result of mistake or misidentification</li>
              <li>Your name, address, telephone number, and email address</li>
              <li>A statement that you consent to the jurisdiction of the federal court in your district</li>
            </ul>
          </div>

          <div className="glass rounded-xl p-6">
            <h2 className="mb-3 text-lg font-semibold text-white">Contact Information</h2>
            <p className="text-sm leading-relaxed text-gray-400">
              All DMCA notices and counter-notifications should be sent to our designated Copyright Agent:
            </p>
            <div className="mt-4 rounded-lg bg-white/5 p-4 text-sm text-gray-300">
              <p>Copyright Agent: Legal Department</p>
              <p>Email: dmca@socialhd.com</p>
              <p>Address: 123 Tech Street, San Francisco, CA 94105</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h2 className="mb-3 text-lg font-semibold text-white">Repeat Infringers</h2>
            <p className="text-sm leading-relaxed text-gray-400">
              It is our policy to terminate, in appropriate circumstances, the accounts of users who are repeat 
              infringers of copyright. We reserve the right to remove content that is alleged to be infringing 
              without prior notice and at our sole discretion.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
