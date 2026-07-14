'use client'

import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Search, MoreHorizontal, Ban, CheckCircle, Trash2 } from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  avatar?: string | null
  plan: 'free' | 'pro' | 'unlimited'
  downloads: number
  status: 'active' | 'banned'
  joined: string
}

const mockUsers: User[] = Array.from({ length: 45 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  plan: ['free', 'pro', 'unlimited'][i % 3] as User['plan'],
  downloads: Math.floor(Math.random() * 500),
  status: i % 7 === 0 ? 'banned' : 'active',
  joined: new Date(Date.now() - Math.random() * 365 * 86400000).toISOString(),
}))

const planColors = {
  free: 'default' as const,
  pro: 'brand' as const,
  unlimited: 'success' as const,
}

const statusColors = {
  active: 'success' as const,
  banned: 'danger' as const,
}

export function UserTable() {
  const [search, setSearch] = useState('')
  const [planFilter, setPlanFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortKey, setSortKey] = useState<string>('joined')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(1)
  const perPage = 10

  const filtered = useMemo(() => {
    let data = mockUsers

    if (search) {
      const q = search.toLowerCase()
      data = data.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
    }
    if (planFilter !== 'all') data = data.filter(u => u.plan === planFilter)
    if (statusFilter !== 'all') data = data.filter(u => u.status === statusFilter)

    data.sort((a, b) => {
      const aVal = a[sortKey as keyof typeof a]
      const bVal = b[sortKey as keyof typeof b]
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }
      return sortDir === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number)
    })

    return data
  }, [search, planFilter, statusFilter, sortKey, sortDir])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const columns = [
    {
      key: 'avatar',
      header: 'Avatar',
      render: (u: User) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-accent text-xs font-semibold text-white">
            {u.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
          </div>
        </div>
      ),
    },
    {
      key: 'name',
      header: 'Name',
      render: (u: User) => (
        <button onClick={() => toggleSort('name')} className="font-medium text-white">
          {u.name}
        </button>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      render: (u: User) => <span className="text-gray-400">{u.email}</span>,
    },
    {
      key: 'plan',
      header: 'Plan',
      render: (u: User) => (
        <Badge variant={planColors[u.plan]} className="capitalize">{u.plan}</Badge>
      ),
    },
    {
      key: 'downloads',
      header: 'Downloads',
      render: (u: User) => (
        <button onClick={() => toggleSort('downloads')} className="text-gray-300">
          {u.downloads.toLocaleString()}
        </button>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (u: User) => (
        <Badge variant={statusColors[u.status]}>{u.status}</Badge>
      ),
    },
    {
      key: 'joined',
      header: 'Joined',
      render: (u: User) => (
        <button onClick={() => toggleSort('joined')} className="text-gray-400">
          {new Date(u.joined).toLocaleDateString()}
        </button>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (u: User) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm">
            {u.status === 'banned' ? <CheckCircle className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4 text-red-400" /></Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            className="input-glass w-full pl-10"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
          />
        </div>
        <select
          className="input-glass w-auto"
          value={planFilter}
          onChange={e => { setPlanFilter(e.target.value); setPage(1) }}
        >
          <option value="all">All Plans</option>
          <option value="free">Free</option>
          <option value="pro">Pro</option>
          <option value="unlimited">Unlimited</option>
        </select>
        <select
          className="input-glass w-auto"
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value); setPage(1) }}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="banned">Banned</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase text-gray-500">
              {columns.map(c => <th key={c.key} className="pb-2 pr-3 last:pr-0">{c.header}</th>)}
            </tr>
          </thead>
          <tbody>
            {paginated.map(u => (
              <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                {columns.map(c => (
                  <td key={c.key} className="py-2 pr-3 last:pr-0">{c.render(u)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">
          Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
        </span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
            Previous
          </Button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const start = Math.max(1, page - 2)
            const p = start + i
            if (p > totalPages) return null
            return (
              <Button
                key={p}
                variant={p === page ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            )
          })}
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
