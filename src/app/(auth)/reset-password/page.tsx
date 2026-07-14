'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Download, Lock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { APP_NAME } from '@/lib/constants'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    password: '',
    confirmPassword: '',
  })

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token')
    }
  }, [token])

  function validate() {
    const errors: Record<string, string> = {}

    if (form.password.length < 8) {
      errors.password = 'Password must be at least 8 characters'
    }
    if (!/\d/.test(form.password)) {
      errors.password = 'Password must contain at least one number'
    }
    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!validate()) return

    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: form.password }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to reset password')
      }

      setSuccess(true)
      setTimeout(() => router.push('/login'), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  if (!token && !error) return null

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-premium px-4">
      <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />
      <div className="relative w-full max-w-md">
        <div className="glass rounded-2xl border border-white/10 p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-accent shadow-lg shadow-brand-500/25">
              <Download className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">Set New Password</h1>
            <p className="mt-1 text-sm text-gray-400">
              Enter your new password below
            </p>
          </div>

          {success ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                <CheckCircle2 className="h-8 w-8 text-green-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Password Reset!</h2>
              <p className="mt-2 text-sm text-gray-400">
                Your password has been changed successfully. Redirecting to login...
              </p>
            </div>
          ) : error ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
                <AlertCircle className="h-8 w-8 text-red-400" />
              </div>
              <p className="text-sm text-red-400">{error}</p>
              <Link
                href="/forgot-password"
                className="mt-4 inline-block text-sm text-brand-400 hover:text-brand-300"
              >
                Request a new reset link
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="password"
                label="New Password"
                type="password"
                placeholder="At least 8 characters"
                leftIcon={<Lock className="h-4 w-4" />}
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                error={fieldErrors.password}
                required
              />

              <Input
                id="confirmPassword"
                label="Confirm New Password"
                type="password"
                placeholder="Repeat your password"
                leftIcon={<Lock className="h-4 w-4" />}
                value={form.confirmPassword}
                onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                error={fieldErrors.confirmPassword}
                required
              />

              <Button type="submit" loading={isLoading} className="w-full" size="lg">
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                Reset Password
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
