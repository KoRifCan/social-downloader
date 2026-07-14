'use client'

import { useState } from 'react'
import { GlobalStats } from '@/components/admin/GlobalStats'
import { Button } from '@/components/ui/Button'
import { Download } from 'lucide-react'

export default function AdminStatsPage() {
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Detailed Analytics</h1>
          <p className="text-sm text-gray-400">Comprehensive platform statistics and metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">From:</label>
            <input type="date" className="input-glass w-auto" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">To:</label>
            <input type="date" className="input-glass w-auto" value={dateTo} onChange={e => setDateTo(e.target.value)} />
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>
      <GlobalStats expanded />
    </div>
  )
}
