'use client'

import { useSession } from 'next-auth/react'
import { Download, HardDrive, Zap, TrendingUp } from 'lucide-react'
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
import { formatBytes, formatDate } from '@/lib/utils'

const stats = [
  { label: 'Total Downloads', value: '1,234', icon: Download, color: 'from-brand-500 to-blue-500' },
  { label: 'Data Used', value: '12.5 GB', icon: HardDrive, color: 'from-green-500 to-emerald-500' },
  { label: 'Current Plan', value: 'Free', icon: Zap, color: 'from-yellow-500 to-orange-500' },
  { label: "Today's Downloads", value: '18', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
]

const recentDownloads = [
  { id: '1', title: 'Amazing TikTok Video', platform: 'tiktok', quality: '720p', size: 2_500_000, date: new Date() },
  { id: '2', title: 'YouTube Tutorial', platform: 'youtube', quality: '1080p', size: 15_000_000, date: new Date(Date.now() - 3600000) },
  { id: '3', title: 'Instagram Reel', platform: 'instagram', quality: '720p', size: 1_800_000, date: new Date(Date.now() - 7200000) },
  { id: '4', title: 'Facebook Video', platform: 'facebook', quality: '480p', size: 5_200_000, date: new Date(Date.now() - 86400000) },
  { id: '5', title: 'Twitter Clip', platform: 'twitter', quality: '720p', size: 3_100_000, date: new Date(Date.now() - 172800000) },
]

const platformColors: Record<string, string> = {
  tiktok: 'info',
  youtube: 'danger',
  instagram: 'warning',
  facebook: 'default',
  twitter: 'default',
}

export default function DashboardPage() {
  const { data: session } = useSession()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold gradient-text">
          Welcome back, {session?.user?.name || 'User'}
        </h1>
        <p className="mt-1 text-gray-400">Here&apos;s your download activity overview</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} variant="glass" className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <Card variant="glass" className="p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Recent Downloads</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Quality</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentDownloads.map(item => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-white">{item.title}</TableCell>
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
      </Card>
    </div>
  )
}
