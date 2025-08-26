'use client'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import AddExpenseForm from './AddExpenseForm'
import { useExpenseContext } from '@/contexts/UserContext'

const EditExpenseForm = ({ editId }) => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || editId
  const router = useRouter()
  const { expenses, setExpenses } = useExpenseContext()

  const form = useForm({
    defaultValues: {
      expense: {
        date: '',
        amount: '',
        category: '',
        account: '',
        note: '',
        description: ''
      },
      income: {
        date: '',
        amount: '',
        category: '',
        account: '',
        note: ''
      }
    }
  })

  useDocumentTitle('Edit Expense')

  // Pre-fill form with expense from context
  useEffect(() => {
    if (id) {
      const expenseData = expenses.find(exp => exp.id === id)
      if (!expenseData) return
  console.log("expenseData",expenseData)
      form.reset({
        id: expenseData.id,
        expense: {
          date: expenseData.expense.date || "",
          amount: expenseData.expense.amount || "",
          category: expenseData.expense.category || "", 
          account: expenseData.expense.account || "",
          note: expenseData.expense.note || "",
          description: expenseData.expense.description || "",
          image: expenseData.expense.image || undefined
        },
        income: {
          date: expenseData.income?.date || "",
          amount: expenseData.income?.amount || "",
          category: expenseData.income?.category || "",
          account: expenseData.income?.account || "",
          note: expenseData.income?.note || ""
        }
      })
    }
  }, [id, expenses, form])
  
  
  
  

  // Handle form submit
  const handleExpenseUpdate = data => {
    try {
      const updatedExpense = {
        id, // keep the same id
        expense: {
          ...data.expense,
          date: data.expense.date instanceof Date
            ? data.expense.date.toISOString().split('T')[0]
            : data.expense.date
        },
        income: {
          ...data.income,
          date: data.income.date instanceof Date
            ? data.income.date.toISOString().split('T')[0]
            : data.income.date
        }
      }

      setExpenses(prev =>
        prev.map(exp => (exp.id === id ? updatedExpense : exp))
      )

      successMessage({ description: 'Expense updated successfully!' })
      router.push('/dashboard/expense-tracker')
    } catch (error) {
      console.log('error', error)
      errorMessage({ description: 'Update failed' })
    }
  }

  const handleBackButton = () => router.back()

  return (
    <>
      <div className='flex justify-between'>
        <LayoutHeader pageTitle={'Edit Expense'} />
      </div>

      <div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleExpenseUpdate)}>
            <AddExpenseForm form={form}  />
            <div className='mt-4 flex justify-end gap-4'>
              <Button
                onClick={handleBackButton}
                type='button'
                className='site-button bg-cyan-400'
              >
                Back
              </Button>
              <Button type='submit' className='site-button'>
                Update
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}

export default EditExpenseForm
