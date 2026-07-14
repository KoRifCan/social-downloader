'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, User, Gift, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
  })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  function validate() {
    const errors: Record<string, string> = {}

    if (!form.email.includes('@') || !form.email.includes('.')) {
      errors.email = 'Please enter a valid email'
    }
    if (form.password.length < 8) {
      errors.password = 'Password must be at least 8 characters'
    }
    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
    if (!form.name.trim()) {
      errors.name = 'Name is required'
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
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          referralCode: form.referralCode || undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Registration failed')
        return
      }

      router.push('/login?registered=true')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <Input
        id="name"
        label="Full Name"
        type="text"
        placeholder="John Doe"
        leftIcon={<User className="h-4 w-4" />}
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        error={fieldErrors.name}
        required
      />

      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        leftIcon={<Mail className="h-4 w-4" />}
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        error={fieldErrors.email}
        required
      />

      <Input
        id="password"
        label="Password"
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
        label="Confirm Password"
        type="password"
        placeholder="Repeat your password"
        leftIcon={<Lock className="h-4 w-4" />}
        value={form.confirmPassword}
        onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
        error={fieldErrors.confirmPassword}
        required
      />

      <Input
        id="referralCode"
        label="Referral Code (optional)"
        type="text"
        placeholder="Enter referral code"
        leftIcon={<Gift className="h-4 w-4" />}
        value={form.referralCode}
        onChange={e => setForm({ ...form, referralCode: e.target.value })}
      />

      <Button type="submit" loading={isLoading} className="w-full" size="lg">
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
        Create Account
      </Button>

      <p className="text-center text-sm text-gray-400">
        Already have an account?{' '}
        <Link href="/login" className="text-brand-400 hover:text-brand-300 transition-colors">
          Sign in
        </Link>
      </p>
    </form>
  )
}
