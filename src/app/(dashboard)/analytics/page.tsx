'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { Card } from '@/components/ui/Card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'

const dailyData = [
  { date: 'Mon', downloads: 45 },
  { date: 'Tue', downloads: 52 },
  { date: 'Wed', downloads: 38 },
  { date: 'Thu', downloads: 65 },
  { date: 'Fri', downloads: 71 },
  { date: 'Sat', downloads: 89 },
  { date: 'Sun', downloads: 56 },
]

const platformData = [
  { name: 'TikTok', value: 35, color: '#8b5cf6' },
  { name: 'YouTube', value: 28, color: '#ef4444' },
  { name: 'Instagram', value: 20, color: '#f59e0b' },
  { name: 'Facebook', value: 10, color: '#3b82f6' },
  { name: 'Twitter', value: 7, color: '#6b7280' },
]

const topMedia = [
  { rank: 1, title: 'Viral TikTok Compilation', platform: 'tiktok', downloads: 342 },
  { rank: 2, title: 'YouTube Music Video 4K', platform: 'youtube', downloads: 251 },
  { rank: 3, title: 'Instagram Reel Dance', platform: 'instagram', downloads: 189 },
  { rank: 4, title: 'Facebook Live Stream', platform: 'facebook', downloads: 156 },
  { rank: 5, title: 'Twitter News Clip', platform: 'twitter', downloads: 98 },
]

const COLORS = ['#8b5cf6', '#ef4444', '#f59e0b', '#3b82f6', '#6b7280']

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Analytics</h1>
        <p className="mt-1 text-gray-400">Track your download patterns and trends</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card variant="glass" className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Downloads Over Time</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(10,10,26,0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="downloads" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Platform Breakdown</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'rgba(10,10,26,0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {platformData.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-gray-400">
                  {item.name} ({item.value}%)
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card variant="glass" className="p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Top Downloaded Media</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead className="text-right">Downloads</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topMedia.map(item => (
              <TableRow key={item.rank}>
                <TableCell className="text-gray-400">{item.rank}</TableCell>
                <TableCell className="font-medium text-white">{item.title}</TableCell>
                <TableCell>
                  <Badge variant={item.platform === 'youtube' ? 'danger' : 'default'}>
                    {item.platform}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-gray-300">
                  {item.downloads.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
