'use client'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import Expense from './Expense'
import Income from './Income'

export default function AddExpenseForm({ form, editData }) {
  const [userData, setUserData] = useState([])

  return (
    <>
      <Tabs defaultValue='expense'>
        <TabsList className='custom-tabs mb-3 w-full justify-start gap-2 rounded-none border-b bg-white p-0'>
          <TabsTrigger
            value='expense'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            Expense
          </TabsTrigger>
          <TabsTrigger
            value='income'
            className='rounded-none px-4 py-2 !shadow-none'
          >
            Income
          </TabsTrigger>
        </TabsList>

        <TabsContent value='expense'>
          <Expense />
        </TabsContent>

        <TabsContent value='income'>
          <Income />
        </TabsContent>
      </Tabs>

    </>
  )
}
