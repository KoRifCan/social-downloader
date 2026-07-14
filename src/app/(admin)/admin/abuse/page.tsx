import { AbuseMonitor } from '@/components/admin/AbuseMonitor'
import { Button } from '@/components/ui/Button'
import { Download } from 'lucide-react'

export default function AdminAbusePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Abuse Monitor</h1>
          <p className="text-sm text-gray-400">Monitor and manage suspicious activity</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4" />
          Export Logs
        </Button>
      </div>
      <AbuseMonitor />
    </div>
  )
}
