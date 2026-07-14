'use client'

import Link from 'next/link'
import { Download } from 'lucide-react'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { JsonLd } from '@/components/seo/JsonLd'
import { APP_NAME, APP_URL } from '@/lib/constants'

export default function RegisterPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `Sign Up - ${APP_NAME}`,
          url: `${APP_URL}/register`,
        }}
      />
      <div className="flex min-h-screen items-center justify-center bg-gradient-premium px-4">
        <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />
        <div className="relative w-full max-w-md">
          <div className="glass rounded-2xl border border-white/10 p-8 shadow-2xl">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-accent shadow-lg shadow-brand-500/25">
                <Download className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">Create Account</h1>
              <p className="mt-1 text-sm text-gray-400">
                Join {APP_NAME} and start downloading
              </p>
            </div>

            <RegisterForm />

            <p className="mt-6 text-center text-xs text-gray-500">
              By continuing, you agree to our{' '}
              <Link href="/terms" className="text-brand-400 hover:text-brand-300">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-brand-400 hover:text-brand-300">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
