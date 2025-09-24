'use client'
import AddExpenseForm from '@/components/ExpenseForm/AddExpenseForm'
import { ExpenseFormValidation } from '@/components/form-validations/ExpenseFormValidation'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { useExpenseContext } from '@/contexts/UserContext'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { yupResolver } from '@hookform/resolvers/yup'

export default function AddExpense() {
  useDocumentTitle('Add Expense')
  const router = useRouter()
  const { setExpenses } = useExpenseContext()
   // image :
    const [imageUpload, setImageUpload] = useState(null)
    const [updateImage, setUpdateImage] = useState([])
    const [deletedOldImages, setDeletedOldImages] = useState([])
    const [files, setFiles] = useState([])
    console.log('files', files);
    
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
    },
    resolver: yupResolver(ExpenseFormValidation)
  })

  // Handle form submit
 // Handle form submit
const handleExpenseSubmit = (data) => {
  console.log("Form Data:", data);

  const formData = new FormData();

  // Append uploaded files (if any)
  if (Array.isArray(files)) {
    files.forEach((file, index) => {
      if (file instanceof File) {
        formData.append(`expense.image${index}`, file);
      }
    });
  }

  // Append other form fields
  Object.entries(data).forEach(([key, value]) => {
    if (key === "expense.date" || key === "income.date") {
      formData.append(key, moment(value).format("YYYY-MM-DD"));
    } else {
      formData.append(key, value);
    }
  });

  try {
    const newExpense = {
      id: uuidv4(),
      expense: {
        ...data.expense,
        date:
          data.expense?.date instanceof Date
            ? data.expense.date.toISOString().split("T")[0]
            : data.expense?.date || "",
      },
      income: {
        ...data.income,
        date:
          data.income?.date instanceof Date
            ? data.income.date.toISOString().split("T")[0]
            : data.income?.date || "",
      },
    };


    console.log("newExpense",newExpense);
    
    setExpenses((prev) => [...prev, newExpense]);
    successMessage({ description: "Expense added successfully!" });
    // router.push("/dashboard/expenses")
  } catch (error) {
    console.error("Form submission error:", error);
    errorMessage({ description: "Submission failed. Please try again." });
  }
};


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
          <AddExpenseForm
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
