'use client'

import { signIn } from 'next-auth/react'
import { Chrome, Github } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function OAuthButtons() {
  return (
    <div className="flex flex-col gap-3">
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
      >
        <Chrome className="h-5 w-5" />
        Continue with Google
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
      >
        <Github className="h-5 w-5" />
        Continue with GitHub
      </Button>
    </div>
  )
}
