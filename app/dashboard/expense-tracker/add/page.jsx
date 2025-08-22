'use client'
import AddExpenseForm from '@/components/ExpenseForm/AddExpenseForm'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

export default function AddExpense() {
  useDocumentTitle('Add Expense')
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      expense: {
        date: '',
        amount: '',
        category: '',
        account: '',
        note: ''
      },
      income: {
        date: '',
        amount: '',
        category: '',
        account: '',
        note: ''
      }
    }
    // resolver: yupResolver(TeamSchema)
  })

  // handle to submit team form
  // const handleExpenseSubmit = async (data) => {
  //   // try {
  //     await fetch("/api/expenses", {
  //       method: "POST",
  //       body: JSON.stringify({ title, amount }),
  //     })
  //     fetchExpenses()
  //   //   const response = await ExpenseServices.AddExpense(data);
  //   //   console.log("responseadd", response);

  //   //   if (response.status === 200 || response.status === 201) {
  //   //     successMessage({ description: "Expense added successfully!" });
  //   //     router.push("/dashboard/expense-tracker"); // goes back to listing
  //   //   }
  //   // } catch (error) {
  //   //   console.log("error", error);
  //   //   errorMessage({
  //   //     description: error?.response?.data?.message || "Submission failed. Please try again.",
  //   //   });
  //   // }
  // };

  // In AddExpense component
  const handleExpenseSubmit = async data => {
    console.log('data-expense', data)
    try {
      // const res = await fetch('/api/expenses', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // }).then(r => r.json())

      successMessage({ description: 'Expense added successfully!' })
      router.push('/dashboard/expense-tracker') // goes back to listing

      // Push new expense to listing state if you have it in context
      // e.g., using router.push or global store
    } catch (error) {
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
