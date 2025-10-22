'use client'

import { useEffect, useState } from 'react'
import { formatCurrency, formatDate } from '@/app/lib/utils'
import { 
  Clock, 
  Users, 
  FileText, 
  DollarSign,
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

interface DashboardData {
  totalHoursThisMonth: number
  totalHoursThisWeek: number
  unpaidInvoices: number
  totalUnpaidAmount: number
  activeCustomers: number
  accountBalance: number
  recentTimeEntries: any[]
  pendingInvoices: any[]
}

export default function DashboardContent() {
  const [data, setData] = useState<DashboardData>({
    totalHoursThisMonth: 0,
    totalHoursThisWeek: 0,
    unpaidInvoices: 0,
    totalUnpaidAmount: 0,
    activeCustomers: 0,
    accountBalance: 0,
    recentTimeEntries: [],
    pendingInvoices: [],
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // For now, we'll use mock data
      // In production, this would fetch from multiple API endpoints
      setData({
        totalHoursThisMonth: 142,
        totalHoursThisWeek: 38,
        unpaidInvoices: 3,
        totalUnpaidAmount: 45000,
        activeCustomers: 5,
        accountBalance: 125000,
        recentTimeEntries: [
          { id: 1, date: new Date(), customer: 'Acme Corp', hours: 8, status: 'complete' },
          { id: 2, date: new Date(Date.now() - 86400000), customer: 'Tech Solutions', hours: 6, status: 'underworked' },
        ],
        pendingInvoices: [
          { id: 1, customer: 'Acme Corp', amount: 15000, dueDate: new Date(Date.now() + 5 * 86400000) },
          { id: 2, customer: 'StartupXYZ', amount: 30000, dueDate: new Date(Date.now() + 10 * 86400000) },
        ],
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    )
  }

  const stats = [
    {
      name: 'Hours This Month',
      value: `${data.totalHoursThisMonth}h`,
      icon: Clock,
      color: 'bg-blue-500',
      description: 'Total tracked hours',
    },
    {
      name: 'Unpaid Invoices',
      value: data.unpaidInvoices.toString(),
      icon: FileText,
      color: 'bg-yellow-500',
      description: formatCurrency(data.totalUnpaidAmount),
    },
    {
      name: 'Active Customers',
      value: data.activeCustomers.toString(),
      icon: Users,
      color: 'bg-green-500',
      description: 'With time entries this month',
    },
    {
      name: 'Account Balance',
      value: formatCurrency(data.accountBalance),
      icon: DollarSign,
      color: 'bg-purple-500',
      description: 'Business account',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Welcome back! Here's an overview of your freelance business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`${stat.color} rounded-md p-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                      </dd>
                      <dd className="text-sm text-gray-500">
                        {stat.description}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Time Entries */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Recent Time Entries</h3>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {data.recentTimeEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium text-gray-900">{entry.customer}</p>
                    <p className="text-sm text-gray-500">{formatDate(entry.date)}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{entry.hours}h</span>
                    {entry.status === 'complete' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Invoices */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Pending Invoices</h3>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {data.pendingInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium text-gray-900">{invoice.customer}</p>
                    <p className="text-sm text-gray-500">Due {formatDate(invoice.dueDate)}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(invoice.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Clock className="h-4 w-4 mr-2" />
              Add Hours
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <FileText className="h-4 w-4 mr-2" />
              New Invoice
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Users className="h-4 w-4 mr-2" />
              Add Customer
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <DollarSign className="h-4 w-4 mr-2" />
              Pay Salary
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}