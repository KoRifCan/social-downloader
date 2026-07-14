'use client'

import Link from 'next/link'
import { Download } from 'lucide-react'
import { LoginForm } from '@/components/auth/LoginForm'
import { OAuthButtons } from '@/components/auth/OAuthButtons'
import { JsonLd } from '@/components/seo/JsonLd'
import { APP_NAME, APP_URL } from '@/lib/constants'

export default function LoginPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `Sign In - ${APP_NAME}`,
          url: `${APP_URL}/login`,
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
              <h1 className="text-2xl font-bold gradient-text">Welcome Back</h1>
              <p className="mt-1 text-sm text-gray-400">Sign in to your {APP_NAME} account</p>
            </div>

            <LoginForm />

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-surface-card px-4 text-gray-500">Or continue with</span>
              </div>
            </div>

            <OAuthButtons />

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
