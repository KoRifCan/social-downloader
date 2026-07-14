'use client'

import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Shield, ShieldAlert, ShieldOff } from 'lucide-react'

interface AbuseLog {
  id: string
  ip: string
  user: string | null
  reason: string
  count: number
  severity: 'low' | 'medium' | 'high' | 'critical'
  lastOccurrence: string
}

const mockLogs: AbuseLog[] = Array.from({ length: 30 }, (_, i) => {
  const reasons = ['Rate limit exceeded', 'Invalid API key', 'Spam detection', 'Suspected bot', 'Multiple accounts', 'Abusive content']
  const severities: AbuseLog['severity'][] = ['low', 'medium', 'high', 'critical']
  return {
    id: `abuse-${i + 1}`,
    ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    user: i % 3 === 0 ? `user${i}@example.com` : null,
    reason: reasons[i % reasons.length],
    count: Math.floor(Math.random() * 50) + 1,
    severity: severities[i % severities.length],
    lastOccurrence: new Date(Date.now() - Math.random() * 7 * 86400000).toISOString(),
  }
})

const severityColors = {
  low: 'default' as const,
  medium: 'warning' as const,
  high: 'danger' as const,
  critical: 'danger' as const,
}

export function AbuseMonitor() {
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [reasonFilter, setReasonFilter] = useState('all')

  const filtered = useMemo(() => {
    let data = mockLogs
    if (reasonFilter !== 'all') data = data.filter(l => l.reason === reasonFilter)
    if (dateFrom) data = data.filter(l => new Date(l.lastOccurrence) >= new Date(dateFrom))
    if (dateTo) data = data.filter(l => new Date(l.lastOccurrence) <= new Date(dateTo + 'T23:59:59'))
    return data
  }, [dateFrom, dateTo, reasonFilter])

  const reasons = [...new Set(mockLogs.map(l => l.reason))]

  const columns = [
    {
      key: 'ip',
      header: 'IP Address',
      render: (l: AbuseLog) => (
        <span className="font-mono text-sm text-white">{l.ip}</span>
      ),
    },
    {
      key: 'user',
      header: 'User',
      render: (l: AbuseLog) => (
        <span className={cn('text-sm', l.user ? 'text-gray-300' : 'text-gray-500 italic')}>
          {l.user || 'Guest'}
        </span>
      ),
    },
    {
      key: 'reason',
      header: 'Reason',
      render: (l: AbuseLog) => <span className="text-gray-300">{l.reason}</span>,
    },
    {
      key: 'count',
      header: 'Count',
      render: (l: AbuseLog) => (
        <span className={cn('font-mono text-sm', l.count > 20 ? 'text-red-400' : 'text-gray-300')}>
          {l.count}
        </span>
      ),
    },
    {
      key: 'severity',
      header: 'Severity',
      render: (l: AbuseLog) => (
        <Badge variant={severityColors[l.severity]} className="capitalize">
          {l.severity === 'critical' ? <ShieldAlert className="h-3 w-3" /> : l.severity === 'high' ? <ShieldOff className="h-3 w-3" /> : <Shield className="h-3 w-3" />}
          {l.severity}
        </Badge>
      ),
    },
    {
      key: 'lastOccurrence',
      header: 'Last Occurrence',
      render: (l: AbuseLog) => (
        <span className="text-gray-400 text-sm">
          {new Date(l.lastOccurrence).toLocaleString()}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (l: AbuseLog) => (
        <div className="flex items-center gap-2">
          <Button variant="danger" size="sm">Block IP</Button>
          <Button variant="outline" size="sm">Whitelist</Button>
          <Button variant="ghost" size="sm">Ignore</Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">From:</label>
          <input type="date" className="input-glass w-auto" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">To:</label>
          <input type="date" className="input-glass w-auto" value={dateTo} onChange={e => setDateTo(e.target.value)} />
        </div>
        <select className="input-glass w-auto" value={reasonFilter} onChange={e => setReasonFilter(e.target.value)}>
          <option value="all">All Reasons</option>
          {reasons.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <span className="text-sm text-gray-400 ml-auto">{filtered.length} log{filtered.length !== 1 && 's'}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase text-gray-500">
              {columns.map(c => <th key={c.key} className="pb-2 pr-3 last:pr-0">{c.header}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                {columns.map(c => (
                  <td key={c.key} className="py-2 pr-3 last:pr-0">{c.render(l)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
