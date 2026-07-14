'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Globe } from 'lucide-react'

const languages = [
  { code: 'id', label: 'Indonesia' },
  { code: 'en', label: 'English' },
]

interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState('id')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChange = (code: string) => {
    setCurrent(code)
    setOpen(false)
    // In a real app with next-intl, use:
    // import { useRouter, usePathname } from 'next/navigation'
    // const router = useRouter()
    // const pathname = usePathname()
    // router.push(pathname, { locale: code })
  }

  const activeLang = languages.find((l) => l.code === current)

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 transition-all hover:border-white/20 hover:text-white"
      >
        <Globe className="h-4 w-4" />
        <span className="font-medium uppercase">{current}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#12122a] shadow-2xl">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleChange(lang.code)}
              className={cn(
                'flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-colors',
                lang.code === current
                  ? 'bg-brand-500/20 text-brand-400'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              )}
            >
              <span className="font-medium uppercase">{lang.code}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
