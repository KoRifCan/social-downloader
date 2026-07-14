import { GlobalStats } from '@/components/admin/GlobalStats'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ArrowUpRight, Users, ShieldAlert, Activity, BarChart3 } from 'lucide-react'
import Link from 'next/link'

const recentUsers = Array.from({ length: 10 }, (_, i) => ({
  id: `u-${i}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  plan: ['free', 'pro', 'unlimited'][i % 3] as string,
  status: i % 5 === 0 ? 'banned' : 'active',
  joined: new Date(Date.now() - i * 86400000).toISOString(),
}))

const recentAbuse = Array.from({ length: 5 }, (_, i) => ({
  id: `a-${i}`,
  ip: `192.168.1.${i + 10}`,
  reason: ['Rate limit', 'Spam', 'Bot detected', 'Invalid key', 'Multiple accounts'][i],
  count: Math.floor(Math.random() * 20) + 1,
}))

const quickActions = [
  { label: 'Manage Users', href: '/admin/users', icon: Users, desc: 'View and manage all users' },
  { label: 'Abuse Monitor', href: '/admin/abuse', icon: ShieldAlert, desc: 'Monitor suspicious activity' },
  { label: 'View Stats', href: '/admin/stats', icon: BarChart3, desc: 'Detailed analytics' },
  { label: 'System Logs', href: '/admin/logs', icon: Activity, desc: 'View system logs' },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-sm text-gray-400">Welcome back, Admin</p>
        </div>
      </div>

      <GlobalStats />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="glass rounded-xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-300">Recent Users</h3>
            <Link href="/admin/users">
              <Button variant="ghost" size="sm">View All <ArrowUpRight className="h-3 w-3" /></Button>
            </Link>
          </div>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase text-gray-500">
                <th className="pb-2 pr-4">Name</th>
                <th className="pb-2 pr-4">Plan</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.slice(0, 5).map(u => (
                <tr key={u.id} className="border-b border-white/5">
                  <td className="py-2 pr-4 text-white">{u.name}</td>
                  <td className="py-2 pr-4"><Badge className="capitalize">{u.plan}</Badge></td>
                  <td className="py-2"><Badge variant={u.status === 'banned' ? 'danger' : 'success'}>{u.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass rounded-xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-300">Recent Abuse Logs</h3>
            <Link href="/admin/abuse">
              <Button variant="ghost" size="sm">View All <ArrowUpRight className="h-3 w-3" /></Button>
            </Link>
          </div>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase text-gray-500">
                <th className="pb-2 pr-4">IP</th>
                <th className="pb-2 pr-4">Reason</th>
                <th className="pb-2">Count</th>
              </tr>
            </thead>
            <tbody>
              {recentAbuse.map(l => (
                <tr key={l.id} className="border-b border-white/5">
                  <td className="py-2 pr-4 font-mono text-sm text-white">{l.ip}</td>
                  <td className="py-2 pr-4 text-gray-300">{l.reason}</td>
                  <td className="py-2 text-gray-400">{l.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map(action => (
          <Link key={action.label} href={action.href}>
            <div className="glass rounded-xl p-5 transition-all hover:bg-white/[0.08] hover:scale-[1.02]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/20 text-brand-400">
                  <action.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{action.label}</p>
                  <p className="text-xs text-gray-500">{action.desc}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
