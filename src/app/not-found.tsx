'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a1a] via-[#0f0f2e] to-[#0a0a1a]">
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />

      <div className="relative z-10 text-center px-4">
        <div className="mx-auto mb-8 flex items-center justify-center">
          <div className="relative animate-float">
            <div className="h-48 w-48 rounded-full bg-gradient-to-br from-brand-500/20 to-purple-500/20 blur-3xl absolute -inset-10 animate-pulse" />
            <svg
              className="relative h-48 w-48 text-white/10"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="50" cy="30" r="12" stroke="currentColor" strokeWidth="1" fill="rgba(255,255,255,0.05)" />
              <circle cx="50" cy="30" r="4" fill="currentColor" className="text-white/20" />
              <ellipse cx="50" cy="58" rx="18" ry="14" stroke="currentColor" strokeWidth="1" fill="rgba(255,255,255,0.03)" />
              <path d="M38 62 C42 72 58 72 62 62" stroke="currentColor" strokeWidth="0.8" fill="none" />
              <circle cx="35" cy="24" r="2" fill="currentColor" className="text-white/10" />
              <circle cx="65" cy="24" r="2" fill="currentColor" className="text-white/10" />
              <circle cx="20" cy="40" r="1.5" fill="currentColor" className="text-white/5" />
              <circle cx="80" cy="40" r="1.5" fill="currentColor" className="text-white/5" />
              <circle cx="15" cy="55" r="1" fill="currentColor" className="text-white/5" />
              <circle cx="85" cy="55" r="1" fill="currentColor" className="text-white/5" />
              <circle cx="30" cy="15" r="1" fill="currentColor" className="text-white/5" />
              <circle cx="70" cy="15" r="1" fill="currentColor" className="text-white/5" />
              <circle cx="10" cy="30" r="1.2" fill="currentColor" className="text-white/5" />
              <circle cx="90" cy="30" r="1.2" fill="currentColor" className="text-white/5" />
            </svg>
          </div>
        </div>

        <h1 className="gradient-text text-8xl font-bold sm:text-9xl">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
          Lost in Space
        </h2>
        <p className="mt-4 mx-auto max-w-md text-gray-400">
          The page you&apos;re looking for has drifted off into the cosmos. Let&apos;s get you back to Earth.
        </p>

        <Link href="/">
          <Button size="lg" className="mt-8">
            Go Home
          </Button>
        </Link>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
