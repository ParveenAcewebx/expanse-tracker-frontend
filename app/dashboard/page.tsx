'use client'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import ExpenseDashboard from './expense-dashboard/page'

export default function DashboardPage() {
  useDocumentTitle('Home')
  return <ExpenseDashboard />
}
