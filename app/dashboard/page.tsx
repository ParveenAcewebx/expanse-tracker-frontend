'use client'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import AllExpenseList from './expense-tracker/page'

export default function DashboardPage() {
  useDocumentTitle('Home')
  return <AllExpenseList />
}
