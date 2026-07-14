'use client'

import { useState } from 'react'
import { Lock, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function PasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  function validate() {
    const errors: Record<string, string> = {}

    if (form.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters'
    }
    if (!/\d/.test(form.newPassword)) {
      errors.newPassword = 'Password must contain at least one number'
    }
    if (form.newPassword !== form.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
    if (!form.currentPassword) {
      errors.currentPassword = 'Current password is required'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')

    if (!validate()) return

    setIsLoading(true)

    try {
      const res = await fetch('/api/user/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update password')
      }

      setMessage('Password updated successfully')
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to update password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm ${
            message.includes('success')
              ? 'border-green-500/20 bg-green-500/10 text-green-400'
              : 'border-red-500/20 bg-red-500/10 text-red-400'
          }`}
        >
          {message}
        </div>
      )}

      <Input
        id="currentPassword"
        label="Current Password"
        type="password"
        placeholder="Enter current password"
        leftIcon={<Lock className="h-4 w-4" />}
        value={form.currentPassword}
        onChange={e => setForm({ ...form, currentPassword: e.target.value })}
        error={fieldErrors.currentPassword}
        required
      />

      <Input
        id="newPassword"
        label="New Password"
        type="password"
        placeholder="At least 8 characters with a number"
        leftIcon={<Lock className="h-4 w-4" />}
        value={form.newPassword}
        onChange={e => setForm({ ...form, newPassword: e.target.value })}
        error={fieldErrors.newPassword}
        required
      />

      <Input
        id="confirmPassword"
        label="Confirm New Password"
        type="password"
        placeholder="Repeat new password"
        leftIcon={<Lock className="h-4 w-4" />}
        value={form.confirmPassword}
        onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
        error={fieldErrors.confirmPassword}
        required
      />

      <Button type="submit" loading={isLoading}>
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Update Password
      </Button>
    </form>
  )
}
