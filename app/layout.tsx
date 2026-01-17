import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FreelancePilot - Freelance Management System',
  description: 'Manage time tracking, invoices, and Swedish tax compliance for freelancers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}