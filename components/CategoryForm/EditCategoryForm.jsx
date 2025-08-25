'use client'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { useExpenseContext } from '@/contexts/UserContext'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import AddCategoryForm from './AddCategoryForm'

const EditCategoryForm = ({ editId }) => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || editId
  const { category, setCategory } = useExpenseContext()
  const form = useForm({
    defaultValues: {
      name: '',
      type: '',
      parent: ''
    }
  })
  useDocumentTitle('Edit Expense')
  const router = useRouter()

  //set value in the edit  form
  useEffect(() => {
    const cat = category.find(c => c.id === id)
    if (cat) {
      console.log('categoryyyyy', cat.type)
      // Reset all values including type
      form.reset({
        name: cat.name,
        parent: cat.parent || '',
        type: cat.type || '',

      })
    } else {
      errorMessage({ description: 'Category not found!' })
      router.push('/dashboard/category')
    }
  }, [id, category, form, router])

  // handle to update team form
  const handleExpenseUpdate = async data => {
    try {
      setCategory(prev => prev.map(cat => (cat.id === data.id ? data : cat)))
      // const formData = new FormData()
      // formData.append('_method', 'PUT')
      // formData.append('id', id || '')
      // formData.append('name', data.name || '')
      // formData.append('contact', JSON.stringify(data.contact) || [])
      // formData.append('status', data.status || '')

      // const responseEdit = await CategoryServices.updateCategoryById(id, formData)
      // if (responseEdit?.status === 200) {
      form.reset()
      successMessage({ description: 'Category updated successfully' })
      router.push('/dashboard/category')
      // }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  const handleBackButton = () => {
    router.back()
  }

  return (
    <>
      <div className='flex justify-between'>
        <LayoutHeader pageTitle={'Edit Category'} />
      </div>

      <div className=''>
        <FormProvider {...form}>
          <form className='' onSubmit={form.handleSubmit(handleExpenseUpdate)}>
            <AddCategoryForm form={form} />
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

export default EditCategoryForm
