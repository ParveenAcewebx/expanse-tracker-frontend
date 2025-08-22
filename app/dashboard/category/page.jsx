'use client'
import LayoutHeader from '@/components/layoutHeader'
import DialogBox from '@/components/modal/DialogBox'
import FormSelectField from '@/components/share/form/FormSelect'
import { LengthData } from '@/components/static-Values'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import CategoryServices from '@/services/Category/category'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { CategoryColumns } from './Category-columns'

const AllCategoryList = () => {
  useDocumentTitle('All Category')
  const router = useRouter()
  const [getList, setList] = useState([])
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [length, setLength] = useState(10)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const dummyData = [
    {
      name: "Groceries",
      parent: "Food",
      category: "Essentials",
      type: "Expense",
      Actions: ["Edit", "Delete"]
    },
    {
      name: "Salary",
      parent: "Income",
    category: "Monthly Income",
      type: "Income",
      Actions: ["Edit", "Delete"]
    },
    {
      name: "Electricity",
      parent: "Utilities",
    category: "Bills",
      type: "Expense",
      Actions: ["Edit", "Delete"]
    },
    {
      name: "Freelance",
      parent: "Income",
    category: "Side Income",
      type: "Income",
      Actions: ["Edit", "Delete"]
    },
    {
      name: "Internet",
      parent: "Utilities",
    category: "Bills",
      type: "Expense",
      Actions: ["Edit", "Delete"]
    }
  ];
  

  const methods = useForm({
    defaultValues: {
      length: '10'
    }
  })

  // fetch all team list
  const getListTeam = async () => {
    try {
      setLoading(true)
      const res = await CategoryServices.getAllCategory(page, length)
      if (res?.status === 200) {
        setList(res?.data?.data?.data)
        setTotalRecord(res?.data?.data?.total)
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListTeam()
  }, [page, length])

  // delete row
  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const res = await CategoryServices.deleteCategory(deleteIndex)
        setDeleteOpenModal(false)
        if (res?.status === 200) {
          successMessage({ description: res?.data?.message })
          getListTeam()
        }
      } catch (error) {
        console.log('error', error)
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }
  }
  const handleDeleteCategory = row => {
    setDeleteOpenModal(true)
    setDeleteIndex(row?.original?.id)
  }
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }

  // edit table row
  const handleEditCategory = row => {
    router.push(`/dashboard/category/edit?id=${row?.original?.id}`)
  }

  useEffect(() => {
    const subscription = methods.watch((value, { name }) => {
      if (name === 'length') {
        const val = value.length
        setLength(val === 'all' ? totalRecord || 9999 : Number(val))
        setPage(1)
      }
    })
    return () => subscription.unsubscribe()
  }, [methods, totalRecord])

  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='Category List' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/category/add`)}
        >
          <Plus />
          Add Category
        </Button>
      </div>

      <FormProvider {...methods}>
        <FormSelectField
          name='length'
          className='mb-4 h-10 w-28'
          form={methods}
          options={LengthData}
        />
      </FormProvider>
      <DataTable
        data={dummyData}
        loading={loading}
        columns={CategoryColumns(handleDeleteCategory, handleEditCategory)}
        totalRecord={totalRecord}
        page={page}
        setPage={setPage}
        length={length}
      />

      <DialogBox
        onDelete={onDelete}
        description='Are you certain you want to proceed with this deletion?'
        deleteOpenModal={deleteOpenModal}
        deleteHandleModalClose={deleteHandleModalClose}
      />
    </>
  )
}

export default AllCategoryList
