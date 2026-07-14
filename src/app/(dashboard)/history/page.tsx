'use client'

import { useState } from 'react'
import { Search, Filter, Download, Trash2, X } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table'
import { formatBytes, formatDate } from '@/lib/utils'

const platforms = ['all', 'tiktok', 'instagram', 'youtube', 'facebook', 'twitter']
const platformColors: Record<string, string> = {
  tiktok: 'info',
  youtube: 'danger',
  instagram: 'warning',
  facebook: 'default',
  twitter: 'default',
}

const mockHistory = [
  { id: '1', title: 'Amazing TikTok Video', thumbnail: '/placeholder.jpg', platform: 'tiktok', quality: '720p', size: 2_500_000, date: new Date() },
  { id: '2', title: 'YouTube Tutorial - How to Edit', thumbnail: '/placeholder.jpg', platform: 'youtube', quality: '1080p', size: 15_000_000, date: new Date(Date.now() - 3600000) },
  { id: '3', title: 'Instagram Reel Trends', thumbnail: '/placeholder.jpg', platform: 'instagram', quality: '720p', size: 1_800_000, date: new Date(Date.now() - 7200000) },
  { id: '4', title: 'Facebook Live Stream', thumbnail: '/placeholder.jpg', platform: 'facebook', quality: '480p', size: 5_200_000, date: new Date(Date.now() - 86400000) },
  { id: '5', title: 'Twitter Video Clip', thumbnail: '/placeholder.jpg', platform: 'twitter', quality: '720p', size: 3_100_000, date: new Date(Date.now() - 172800000) },
  { id: '6', title: 'Another TikTok', thumbnail: '/placeholder.jpg', platform: 'tiktok', quality: '1080p', size: 4_200_000, date: new Date(Date.now() - 259200000) },
]

export default function HistoryPage() {
  const [search, setSearch] = useState('')
  const [platform, setPlatform] = useState('all')
  const [history, setHistory] = useState(mockHistory)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const filtered = history.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase())
    const matchesPlatform = platform === 'all' || item.platform === platform
    return matchesSearch && matchesPlatform
  })

  function toggleSelect(id: string) {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  function deleteSelected() {
    setHistory(prev => prev.filter(item => !selectedIds.has(item.id)))
    setSelectedIds(new Set())
  }

  function clearAll() {
    setHistory([])
    setSelectedIds(new Set())
  }

  function exportCSV() {
    const headers = ['Title', 'Platform', 'Quality', 'Size', 'Date']
    const rows = filtered.map(item => [
      item.title,
      item.platform,
      item.quality,
      item.size.toString(),
      item.date.toISOString(),
    ])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'download-history.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  function exportJSON() {
    const data = filtered.map(item => ({
      title: item.title,
      platform: item.platform,
      quality: item.quality,
      size: item.size,
      date: item.date,
    }))
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'download-history.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Download History</h1>
          <p className="mt-1 text-gray-400">View and manage your downloads</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedIds.size > 0 && (
            <>
              <span className="text-sm text-gray-400">{selectedIds.size} selected</span>
              <Button variant="danger" size="sm" onClick={deleteSelected}>
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </>
          )}
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="h-4 w-4" />
            CSV
          </Button>
          <Button variant="outline" size="sm" onClick={exportJSON}>
            <Download className="h-4 w-4" />
            JSON
          </Button>
          {history.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAll}>
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      <Card variant="glass" className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              id="search"
              placeholder="Search by title..."
              leftIcon={<Search className="h-4 w-4" />}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="h-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            {platforms.map(p => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  platform === p
                    ? 'bg-brand-500/20 text-brand-300'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {p === 'all' ? 'All' : p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card variant="glass" className="p-6">
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-400">No downloads found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <input
                    type="checkbox"
                    className="rounded border-white/20 bg-white/5"
                    checked={selectedIds.size === filtered.length && filtered.length > 0}
                    onChange={() => {
                      if (selectedIds.size === filtered.length) {
                        setSelectedIds(new Set())
                      } else {
                        setSelectedIds(new Set(filtered.map(i => i.id)))
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Media</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Quality</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(item => (
                <TableRow key={item.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      className="rounded border-white/20 bg-white/5"
                      checked={selectedIds.has(item.id)}
                      onChange={() => toggleSelect(item.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-white/10 overflow-hidden">
                        <div className="flex h-full items-center justify-center text-xs text-gray-500">
                          HD
                        </div>
                      </div>
                      <span className="font-medium text-white truncate max-w-[200px]">
                        {item.title}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={(platformColors[item.platform] || 'default') as any}>
                      {item.platform}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{item.quality}</TableCell>
                  <TableCell className="text-gray-300">{formatBytes(item.size)}</TableCell>
                  <TableCell className="text-gray-300">{formatDate(item.date)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  )
}
