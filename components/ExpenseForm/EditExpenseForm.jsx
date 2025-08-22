'use client'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import ExpenseServices from '@/services/ExpenseTracker/expense'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import AddExpenseForm from './AddExpenseForm'

const EditExpenseForm = ({ editId }) => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || editId
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      amount: '',
      category: '',
      account: '',
      note: '',
      description: '',
      date: '',
      image: null
    }
  })

  useDocumentTitle('Edit Expense')

  // ✅ Fetch expense by ID
  const fetchExpenseById = async () => {
    try {
      const response = await ExpenseServices.getExpenseById(id)
      if (response?.status === 200) {
        const expenseData = response?.data
        form.reset(expenseData) // populate form with API response
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message || 'Failed to load expense'
      })
    }
  }

  useEffect(() => {
    if (id) {
      fetchExpenseById()
    }
  }, [id])

  // ✅ Handle update
  const handleExpenseUpdate = async data => {
    try {
      const responseEdit = await ExpenseServices.updateExpenseById(id, data)
      if (responseEdit?.status === 200) {
        form.reset()
        successMessage({ description: 'Expense updated successfully!' })
        router.push('/dashboard/expense-tracker')
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message || 'Update failed'
      })
    }
  }

  const handleBackButton = () => {
    router.back()
  }

  return (
    <>
      <div className='flex justify-between'>
        <LayoutHeader pageTitle={'Edit Expense'} />
      </div>

      <div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleExpenseUpdate)}>
            <AddExpenseForm form={form} editData />
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
