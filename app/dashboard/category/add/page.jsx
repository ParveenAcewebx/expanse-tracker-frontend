'use client'
import AddCategoryForm from '@/components/CategoryForm/AddCategoryForm'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import CategoryServices from '@/services/Category/category'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

export default function AddCategory() {
  useDocumentTitle('Add Category')
  const router = useRouter()
  const form = useForm()

  // handle to submit team form
  const handleCategorySubmit = async data => {
    try {
      const formData = new FormData()

      formData.append('name', data.name || '')
      formData.append('contact', JSON.stringify(data.contact) || [])
      formData.append('status', data.status || '')

      const response = await CategoryServices.AddCategory(formData)
      if (response.status === 200) {
        successMessage({ description: response?.data?.message })
        router.push('/dashboard/expense-tracker')
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description:
          error?.response?.data?.message ||
          'Submission failed. Please try again.'
      })
    }
  }

  const handleBackButton = () => {
    router.back()
  }
  return (
    <>
      <div className='flex justify-between'>
        <LayoutHeader pageTitle={'Add Category'} />
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleCategorySubmit)}>
          <AddCategoryForm form={form} />
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
