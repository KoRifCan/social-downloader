'use client'

import { useState } from 'react'
import { User, Mail, Link } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    image: '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/user/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, image: form.image || undefined }),
      })

      if (!res.ok) throw new Error('Failed to update')
      setMessage('Profile updated successfully')
    } catch {
      setMessage('Failed to update profile')
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
        id="displayName"
        label="Display Name"
        type="text"
        placeholder="Your name"
        leftIcon={<User className="h-4 w-4" />}
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />

      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="Your email"
        leftIcon={<Mail className="h-4 w-4" />}
        value={form.email}
        disabled
      />

      <Input
        id="avatar"
        label="Avatar URL"
        type="url"
        placeholder="https://example.com/avatar.jpg"
        leftIcon={<Link className="h-4 w-4" />}
        value={form.image}
        onChange={e => setForm({ ...form, image: e.target.value })}
      />

      <Button type="submit" loading={isLoading}>
        Save Changes
      </Button>
    </form>
  )
}
