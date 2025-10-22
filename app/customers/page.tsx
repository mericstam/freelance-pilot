import Navigation from '@/app/components/Navigation'
import CustomersContent from '@/app/components/CustomersContent'

export default function CustomersPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CustomersContent />
      </main>
    </>
  )
}