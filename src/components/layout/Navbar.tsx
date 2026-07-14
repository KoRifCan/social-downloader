'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X, ChevronDown, LogOut, Settings, User } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { DropdownMenu } from '@/components/ui/DropdownMenu'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled
          ? 'glass border-b border-white/10 shadow-lg shadow-black/10'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="gradient-text text-xl font-bold">SocialHD</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button className="rounded-lg px-2 py-1 text-xs font-medium text-gray-400 transition-colors hover:text-white">
            ID
            <span className="mx-0.5 text-gray-600">/</span>
            EN
          </button>

          {session?.user ? (
            <DropdownMenu
              align="right"
              trigger={
                <button className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-white/5">
                  <Avatar
                    src={session.user.image}
                    name={session.user.name || ''}
                    size="sm"
                  />
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
              }
              items={[
                {
                  label: 'Profile',
                  icon: <User className="h-4 w-4" />,
                  onClick: () => {},
                },
                {
                  label: 'Dashboard',
                  icon: <Settings className="h-4 w-4" />,
                  onClick: () => {},
                },
                {
                  label: 'Sign out',
                  icon: <LogOut className="h-4 w-4" />,
                  onClick: () => signOut(),
                  danger: true,
                },
              ]}
            />
          ) : (
            <Link href="/auth/login">
              <Button variant="primary" size="sm">
                Login
              </Button>
            </Link>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="glass border-t border-white/10 px-4 pb-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'block rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
