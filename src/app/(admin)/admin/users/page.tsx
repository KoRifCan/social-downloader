import { UserTable } from '@/components/admin/UserTable'

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">User Management</h1>
        <p className="text-sm text-gray-400">Manage all registered users, their plans, and status</p>
      </div>
      <UserTable />
    </div>
  )
}
