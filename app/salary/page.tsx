import Navigation from '@/app/components/Navigation'
import SalaryContent from '@/app/components/SalaryContent'

export default function SalaryPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SalaryContent />
      </main>
    </>
  )
}