import { redirect } from 'next/navigation'
import { ADMIN_LINKS } from '@/lib/constants'
import { getServerSession } from 'next-auth'
import { LayoutDashboard, Users, ShieldAlert, BarChart3, ScrollText } from 'lucide-react'
import Link from 'next/link'

const iconMap: Record<string, React.ReactNode> = {
  'layout-dashboard': <LayoutDashboard className="h-5 w-5" />,
  'users': <Users className="h-5 w-5" />,
  'shield-alert': <ShieldAlert className="h-5 w-5" />,
  'bar-chart-3': <BarChart3 className="h-5 w-5" />,
  'scroll-text': <ScrollText className="h-5 w-5" />,
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()

  if (!session?.user) {
    redirect('/auth/login')
  }

  return (
    <div className="flex min-h-screen">
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-black/40 backdrop-blur-2xl">
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-accent text-sm font-bold text-white">
            A
          </div>
          <span className="text-sm font-semibold text-white">Admin Panel</span>
        </div>
        <nav className="space-y-1 p-4">
          {ADMIN_LINKS.map(link => {
            const isActive = false
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-400 transition-all hover:bg-white/5 hover:text-white"
              >
                {iconMap[link.icon]}
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/5 p-4">
          <p className="text-xs text-gray-500">Admin access</p>
          <p className="text-sm font-medium text-white">{session.user.email}</p>
        </div>
      </aside>
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
