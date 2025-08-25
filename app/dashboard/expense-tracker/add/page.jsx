'use client'
import AddExpenseForm from '@/components/ExpenseForm/AddExpenseForm'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { useExpenseContext } from '@/contexts/UserContext'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'


export default function AddExpense() {
  useDocumentTitle('Add Expense')
  const router = useRouter()
  const { setExpenses } = useExpenseContext() 

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

  // Handle form submit
  const handleExpenseSubmit = data => {
    try {
      const newExpense = {
        id: uuidv4(),
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
  
      setExpenses(prev => [...prev, newExpense])
      successMessage({ description: 'Expense added successfully!' })
      router.push('/dashboard/expense-tracker')
    } catch (error) {
      console.log('error', error)
      errorMessage({ description: 'Submission failed. Please try again.' })
    }
  }
  

  const handleBackButton = () => {
    router.back()
  }

  return (
    <>
      <div className='flex justify-between'>
        <LayoutHeader pageTitle={'Add Expense'} />
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleExpenseSubmit)}>
          <AddExpenseForm form={form} />
          <div className='mt-4 flex justify-end gap-4'>
            <Button
              onClick={handleBackButton}
              type='button'
              className='site-button bg-white'
            >
              Back
            </Button>
            <Button type='submit' className='site-button'>
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}
