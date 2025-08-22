'use client'
import LayoutHeader from '@/components/layoutHeader'
import DialogBox from '@/components/modal/DialogBox'
import FormSelectField from '@/components/share/form/FormSelect'
import { LengthData } from '@/components/static-Values'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import ExpenseServices from '@/services/ExpenseTracker/expense'
import { Plus } from 'lucide-react'
import { createServer } from 'miragejs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ExpenseColumns } from './Expense-columns'



const AllExpenseList = () => {
  useDocumentTitle('All Expenses')
  const router = useRouter()
  const [getList, setList] = useState([])
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [length, setLength] = useState(10)
  const [deleteIndex, setDeleteIndex] = useState(null)

  const methods = useForm({
    defaultValues: {
      length: '10'
    }
  })

  // fetch all team list
  const getListTeam = async () => {
    try {
      setLoading(true)
      const res = await ExpenseServices.getAllExpense()
      if (res?.status === 200) {
        setList(res.data.expenses) // MirageJS returns: { expenses: [...] }
      }
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
        const res = await ExpenseServices.deleteExpense(deleteIndex)
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
  const handleDeleteExpense = row => {
    setDeleteOpenModal(true)
    setDeleteIndex(row?.original?.id)
  }
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }

  // edit table row
  const handleEditExpense = row => {
    router.push(`/dashboard/expense-tracker/edit?id=${row?.original?.id}`)
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
        <LayoutHeader pageTitle='Expenses List' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/expense-tracker/add`)}
        >
          <Plus />
          Add Expense
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
        data={getList}
        loading={loading}
        columns={ExpenseColumns(handleDeleteExpense, handleEditExpense)}
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

export default AllExpenseList
