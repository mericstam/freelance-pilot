import Navigation from '@/app/components/Navigation'

export default function ReportsPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
            <p className="text-gray-600">Analytics and insights for your freelance business</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-500">Reports and analytics coming soon...</p>
          </div>
        </div>
      </main>
    </>
  )
}