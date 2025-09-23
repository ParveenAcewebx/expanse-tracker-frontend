'use client'
import { DataTable } from '@/components/Table'
import { successMessage } from '@/components/ToasterMessage'
import DialogBox from '@/components/modal/DialogBox'
import { useExpenseContext } from '@/contexts/UserContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ExpenseColumns } from './Expense-columns'
import LayoutHeader from '@/components/layoutHeader'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const AllExpenseList = () => {
  const router = useRouter()
  const { expenses, setExpenses } = useExpenseContext()
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)

  const handleDeleteExpense = row => {
    setDeleteOpenModal(true)
    setDeleteIndex(row.original.id)
  }

  const onDelete = () => {
    setExpenses(prev => prev.filter(exp => exp.id !== deleteIndex))
    successMessage({ description: 'Deleted Successfully' })
    setDeleteOpenModal(false)
  }

  const handleEditExpense = row => {
    router.push(`/dashboard/expense-tracker/edit?id=${row.original.id}`)
  }

  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='Expenses List' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/expense-tracker/add`)}
        >
          <Plus />
          Add Expense
        </Button>
      </div>
      <DataTable
        data={expenses}
        columns={ExpenseColumns(handleDeleteExpense, handleEditExpense)}
      />

      <DialogBox
        onDelete={onDelete}
        deleteOpenModal={deleteOpenModal}
        deleteHandleModalClose={() => setDeleteOpenModal(false)}
      />
    </>
  )
}

export default AllExpenseList
