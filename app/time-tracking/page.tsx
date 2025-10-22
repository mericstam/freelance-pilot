import Navigation from '@/app/components/Navigation'
import TimeTrackingContent from '@/app/components/TimeTrackingContent'

export default function TimeTrackingPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TimeTrackingContent />
      </main>
    </>
  )
}