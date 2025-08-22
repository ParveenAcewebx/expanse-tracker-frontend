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
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ExpenseColumns } from './Expense-columns'

const AllExpenseList = () => {
  const tableData = [
    {
      "id":"01",
      "date": "2025-08-22",
      "amount": 250.00,
      "category": "Groceries",
      "account": "Checking",
      "note": "Weekly grocery shopping",
      "description": "Bought vegetables, fruits, and dairy products"
    },
    {
      "id":"02",
      "date": "2025-08-21",
      "amount": 1200.50,
      "category": "Rent",
      "account": "Bank Transfer",
      "note": "Monthly apartment rent",
      "description": "Rent for August 2025"
    },
    {
      "id":"03",
      "date": "2025-08-20",
      "amount": 60.75,
      "category": "Utilities",
      "account": "Credit Card",
      "note": "Electricity bill",
      "description": "Payment for electricity usage in July"
    },
    {
      "id":"04",
      "date": "2025-08-19",
      "amount": 45.00,
      "category": "Transport",
      "account": "Cash",
      "note": "Taxi fare",
      "description": "Taxi from airport to home"
    },
    {
      "id":"05",
      "date": "2025-08-18",
      "amount": 300.00,
      "category": "Entertainment",
      "account": "Credit Card",
      "note": "Concert tickets",
      "description": "Bought tickets for live concert"
    },
    {
      "id":"06",
      "date": "2025-08-17",
      "amount": 150.00,
      "category": "Health",
      "account": "Checking",
      "note": "Pharmacy purchase",
      "description": "Bought medicines and supplements"
    }
  ]
  

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
      // setLoading(true)
      // const res = await ExpenseServices.getAllExpense()
      // if (res?.status === 200) {
      //   setList(res.data.expenses) // MirageJS returns: { expenses: [...] }
      // }
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
        // const res = await ExpenseServices.deleteExpense(deleteIndex)
        // if (res?.status === 200) {
          successMessage({ description: "Delete Succesfully" })
          //   getListTeam()
          setDeleteOpenModal(false)
        // }
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
        data={tableData}
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
