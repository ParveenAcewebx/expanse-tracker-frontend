'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Edit, Trash2 } from 'lucide-react'

export const ExpenseColumns = (handleDeleteExpense, handleEditExpense) => [
  {
    id: 'date',
    header: 'Date',
    cell: ({ row }) => row?.original?.expense?.date || ''
  },

  {
    id: 'amount',
    header: 'Amount',
    cell: ({ row }) => row?.original?.expense?.amount || ''
  },
  {
    id: 'category',
    header: 'Category',
    cell: ({ row }) => row?.original?.expense?.category || ''
  },
  {
    id: 'account',
    header: 'Account',
    cell: ({ row }) => row?.original?.expense?.account || ''
  },
  {
    accessorKey: 'note',
    header: 'Note',
    cell: ({ row }) => row?.original?.expense?.note || ''
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => row?.original?.expense?.description || ''
  },
  {
    accessorKey: 'action',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <div className='flex space-x-2'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-green-600 hover:bg-green-50'
                  onClick={() => handleEditExpense(row)}
                >
                  <Edit className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-red-600 hover:bg-red-50'
                  onClick={() => handleDeleteExpense(row)}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      )
    }
  }
]
