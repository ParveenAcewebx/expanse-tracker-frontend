'use client'
import AddCategoryForm from '@/components/CategoryForm/AddCategoryForm'
import { CategoryFormValidation } from '@/components/form-validations/CategoryFormValidation'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { useExpenseContext } from '@/contexts/UserContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

export default function AddCategory() {
  useDocumentTitle('Add Category')
  const router = useRouter()

  // image :
  const [imageUpload, setImageUpload] = useState(null)
  const [updateImage, setUpdateImage] = useState([])
  const [deletedOldImages, setDeletedOldImages] = useState([])
  const [files, setFiles] = useState([])

  const form = useForm({
    defaultValues: {
      name: '',
      type: '',
      parent: ''
    },
   resolver: yupResolver(CategoryFormValidation)
    
  })
  const { setCategory } = useExpenseContext()

  // handle to submit team form
  const handleCategorySubmit = async data => {
    try {
      const newCategory = {
        id: uuidv4(),
        ...data
      }

      setCategory(prev => [...prev, newCategory])

      successMessage({ description: 'Category added successfully!' })
      router.push('/dashboard/categories')
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
          <AddCategoryForm
            form={form}
            setImageUpload={setImageUpload}
            updateImage={updateImage}
            setDeletedOldImages={setDeletedOldImages}
            setFiles={setFiles}
            files={files}
          />
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
