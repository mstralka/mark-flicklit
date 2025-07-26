import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  UsersIcon, 
  BookOpenIcon, 
  UserGroupIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'
import { adminApi, AdminStatsResponse } from '../../api/admin'
import { LoadingSpinner } from '../../components/ui'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'increase' | 'decrease' | 'neutral'
  icon: React.ComponentType<{ className?: string }>
  href?: string
}

function StatCard({ title, value, change, changeType, icon: Icon, href }: StatCardProps) {
  const card = (
    <div className="relative overflow-hidden rounded-lg bg-white p-6 shadow">
      <div>
        <div className="absolute p-3">
          <Icon className="h-8 w-8 text-gray-400" />
        </div>
        <p className="ml-16 truncate text-sm font-medium text-gray-500">{title}</p>
        <p className="ml-16 text-3xl font-semibold text-gray-900">{typeof value === 'number' ? value.toLocaleString() : value}</p>
      </div>
      {change && (
        <div className="ml-16 flex items-baseline">
          <p className={`text-sm font-semibold ${
            changeType === 'increase' ? 'text-green-600' : 
            changeType === 'decrease' ? 'text-red-600' : 'text-gray-500'
          }`}>
            {change}
          </p>
          <p className="ml-2 text-sm text-gray-500">from last week</p>
        </div>
      )}
    </div>
  )

  return href ? (
    <Link to={href} className="block hover:bg-gray-50 transition-colors">
      {card}
    </Link>
  ) : card
}

export function DashboardPage() {
  const [stats, setStats] = useState<AdminStatsResponse['data'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const response = await adminApi.getStats()
        setStats(response.data)
      } catch (err) {
        console.error('Error fetching stats:', err)
        setError('Failed to load dashboard statistics')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-sm text-red-700">{error}</div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="text-center text-gray-500">
        No statistics available
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700">
          Overview of your FlickLit application data and recent activity
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Authors"
          value={stats.totals.authors}
          change={`+${stats.recent.authors} this week`}
          changeType={stats.recent.authors > 0 ? 'increase' : 'neutral'}
          icon={UsersIcon}
          href="/admin/authors"
        />
        <StatCard
          title="Total Works"
          value={stats.totals.works}
          change={`+${stats.recent.works} this week`}
          changeType={stats.recent.works > 0 ? 'increase' : 'neutral'}
          icon={BookOpenIcon}
          href="/admin/works"
        />
        <StatCard
          title="Total Users"
          value={stats.totals.users}
          icon={UserGroupIcon}
          href="/admin/users"
        />
      </div>

      {/* Quick actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/admin/authors"
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <UsersIcon className="mx-auto h-8 w-8 text-gray-400" />
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Manage Authors
              </span>
              <span className="mt-1 block text-sm text-gray-500">
                View, search, and manage author records
              </span>
            </Link>

            <Link
              to="/admin/works"
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <BookOpenIcon className="mx-auto h-8 w-8 text-gray-400" />
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Manage Works
              </span>
              <span className="mt-1 block text-sm text-gray-500">
                View and manage book/work records
              </span>
            </Link>

            <Link
              to="/admin/analytics"
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <ArrowTrendingUpIcon className="mx-auto h-8 w-8 text-gray-400" />
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Analytics
              </span>
              <span className="mt-1 block text-sm text-gray-500">
                View detailed analytics and trends
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent activity placeholder */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="text-sm text-gray-500">
            Recent activity tracking will be implemented in future updates.
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage