'use client'

import { useState, useEffect } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay } from 'date-fns'
import { isWorkday, isSwedishHoliday, getSwedishHolidays } from '@/app/lib/swedish-holidays'
import { formatDate } from '@/app/lib/utils'
import { Plus, Edit2, Trash2, Calendar } from 'lucide-react'

interface TimeEntry {
  id: string
  date: Date
  customerId: string
  customer?: { name: string }
  hours: number
  notes?: string
}

interface Customer {
  id: string
  name: string
  hourlyRate: number
}

export default function TimeTrackingContent() {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null)
  const [loading, setLoading] = useState(true)

  // Form state
  const [formDate, setFormDate] = useState(formatDate(new Date()))
  const [formCustomerId, setFormCustomerId] = useState('')
  const [formHours, setFormHours] = useState('')
  const [formNotes, setFormNotes] = useState('')

  useEffect(() => {
    fetchTimeEntries()
    fetchCustomers()
  }, [selectedMonth])

  const fetchTimeEntries = async () => {
    try {
      const start = formatDate(startOfMonth(selectedMonth))
      const end = formatDate(endOfMonth(selectedMonth))
      const response = await fetch(`/api/time-entries?startDate=${start}&endDate=${end}`)
      const data = await response.json()
      setTimeEntries(data.map((entry: any) => ({
        ...entry,
        date: new Date(entry.date)
      })))
    } catch (error) {
      console.error('Error fetching time entries:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers')
      const data = await response.json()
      setCustomers(data)
    } catch (error) {
      console.error('Error fetching customers:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = {
      date: formDate,
      customerId: formCustomerId,
      hours: parseFloat(formHours),
      notes: formNotes,
    }

    try {
      if (editingEntry) {
        await fetch('/api/time-entries', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingEntry.id, ...data }),
        })
      } else {
        await fetch('/api/time-entries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
      }

      fetchTimeEntries()
      resetForm()
    } catch (error) {
      console.error('Error saving time entry:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return

    try {
      await fetch(`/api/time-entries?id=${id}`, {
        method: 'DELETE',
      })
      fetchTimeEntries()
    } catch (error) {
      console.error('Error deleting time entry:', error)
    }
  }

  const resetForm = () => {
    setFormDate(formatDate(new Date()))
    setFormCustomerId('')
    setFormHours('')
    setFormNotes('')
    setEditingEntry(null)
    setShowAddModal(false)
  }

  const getHoursForDay = (date: Date): number => {
    const entry = timeEntries.find((e) => isSameDay(e.date, date))
    return entry?.hours || 0
  }

  const getWorkdayIndicator = (date: Date, hours: number) => {
    if (!isWorkday(date)) {
      return { emoji: '🏖️', class: 'bg-gray-100', label: 'Weekend/Holiday' }
    }

    if (hours === 0) {
      return { emoji: '⚪', class: 'bg-gray-200', label: 'No hours' }
    } else if (hours < 8) {
      return { emoji: '🔴', class: 'bg-red-100', label: `${hours}h - Under 8 hours` }
    } else if (hours === 8) {
      return { emoji: '🟢', class: 'bg-green-100', label: '8h - Perfect!' }
    } else {
      return { emoji: '🟢', class: 'bg-green-100', label: `${hours}h - Overtime` }
    }
  }

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(selectedMonth),
    end: endOfMonth(selectedMonth),
  })

  const holidays = getSwedishHolidays(selectedMonth.getFullYear())
  const monthlyStats = {
    totalHours: timeEntries.reduce((sum, entry) => sum + entry.hours, 0),
    workdaysWorked: timeEntries.filter(e => isWorkday(e.date)).length,
    totalWorkdays: daysInMonth.filter(isWorkday).length,
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Time Tracking</h2>
          <p className="text-gray-600">Track your working hours and monitor productivity</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Hours
        </button>
      </div>

      {/* Monthly Stats */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Hours</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">{monthlyStats.totalHours}h</p>
            <p className="text-sm text-gray-500">
              Average: {monthlyStats.workdaysWorked > 0 ? (monthlyStats.totalHours / monthlyStats.workdaysWorked).toFixed(1) : 0}h/day
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Days Worked</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              {monthlyStats.workdaysWorked}/{monthlyStats.totalWorkdays}
            </p>
            <p className="text-sm text-gray-500">Workdays in month</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Legend</p>
            <div className="mt-1 space-y-1 text-sm">
              <div>🔴 Less than 8 hours</div>
              <div>🟢 8 hours or more</div>
              <div>🏖️ Weekend/Holiday</div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {format(selectedMonth, 'MMMM yyyy')}
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1))}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setSelectedMonth(new Date())}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Today
            </button>
            <button
              onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1))}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-700 py-2">
              {day}
            </div>
          ))}
          {Array.from({ length: getDay(startOfMonth(selectedMonth)) || 7 }, (_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {daysInMonth.map((date) => {
            const hours = getHoursForDay(date)
            const indicator = getWorkdayIndicator(date, hours)
            const holiday = holidays.find(h => isSameDay(h.date, date))
            
            return (
              <div
                key={date.toISOString()}
                className={`p-2 border rounded-md ${indicator.class} cursor-pointer hover:opacity-80`}
                onClick={() => {
                  setFormDate(formatDate(date))
                  setShowAddModal(true)
                }}
                title={indicator.label}
              >
                <div className="text-sm font-medium">{format(date, 'd')}</div>
                <div className="text-2xl text-center">{indicator.emoji}</div>
                {hours > 0 && (
                  <div className="text-xs text-center font-medium">{hours}h</div>
                )}
                {holiday && (
                  <div className="text-xs text-center text-gray-600 truncate">{holiday.name}</div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Entries */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Entries</h3>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hours
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {timeEntries.slice(0, 10).map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(entry.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.customer?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.hours}h
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {entry.notes}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setEditingEntry(entry)
                          setFormDate(formatDate(entry.date))
                          setFormCustomerId(entry.customerId)
                          setFormHours(entry.hours.toString())
                          setFormNotes(entry.notes || '')
                          setShowAddModal(true)
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingEntry ? 'Edit Time Entry' : 'Add Time Entry'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Customer</label>
                  <select
                    value={formCustomerId}
                    onChange={(e) => setFormCustomerId(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  >
                    <option value="">Select a customer</option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hours</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="24"
                    value={formHours}
                    onChange={(e) => setFormHours(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes (optional)</label>
                  <textarea
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  {editingEntry ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}