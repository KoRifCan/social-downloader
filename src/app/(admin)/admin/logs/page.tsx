'use client'

import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Search, Trash2 } from 'lucide-react'

interface LogEntry {
  id: string
  level: 'info' | 'warn' | 'error'
  message: string
  timestamp: string
  source: string
}

const mockLogs: LogEntry[] = Array.from({ length: 50 }, (_, i) => {
  const levels: LogEntry['level'][] = ['info', 'warn', 'error']
  const messages = [
    'User authentication successful',
    'Download request processed',
    'Rate limit exceeded for IP 192.168.1.1',
    'Database connection established',
    'Cache miss for key',
    'API key validation failed',
    'File cleanup completed',
    'Payment webhook received',
    'Unhandled promise rejection',
    'Session expired for user',
  ]
  const sources = ['auth', 'downloader', 'api', 'database', 'cache', 'payment', 'system']
  return {
    id: `log-${i}`,
    level: levels[i % 3],
    message: messages[i % messages.length],
    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    source: sources[i % sources.length],
  }
})

const levelBadge = {
  info: 'default' as const,
  warn: 'warning' as const,
  error: 'danger' as const,
}

export default function AdminLogsPage() {
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState<string>('all')
  const [logs, setLogs] = useState(mockLogs)

  const filtered = useMemo(() => {
    let data = logs
    if (levelFilter !== 'all') data = data.filter(l => l.level === levelFilter)
    if (search) {
      const q = search.toLowerCase()
      data = data.filter(l => l.message.toLowerCase().includes(q))
    }
    return data
  }, [search, levelFilter, logs])

  const clearLogs = () => setLogs([])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">System Logs</h1>
          <p className="text-sm text-gray-400">View and monitor system events</p>
        </div>
        <Button variant="danger" onClick={clearLogs}>
          <Trash2 className="h-4 w-4" />
          Clear Logs
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            className="input-glass w-full pl-10"
            placeholder="Search by message..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          {['all', 'info', 'warn', 'error'].map(level => (
            <button
              key={level}
              onClick={() => setLevelFilter(level)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                levelFilter === level
                  ? 'bg-brand-500/20 text-brand-300'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {level === 'all' ? 'All' : level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-400 ml-auto">{filtered.length} entries</span>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto">
          {filtered.map(log => (
            <div
              key={log.id}
              className="flex items-start gap-4 border-b border-white/5 px-5 py-3 last:border-0 hover:bg-white/[0.02]"
            >
              <Badge variant={levelBadge[log.level]} className="uppercase w-14 justify-center">
                {log.level}
              </Badge>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-200">{log.message}</p>
                <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                  <span>{log.source}</span>
                  <span>{new Date(log.timestamp).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="px-5 py-8 text-center text-sm text-gray-500">No log entries found</div>
          )}
        </div>
      </div>
    </div>
  )
}
