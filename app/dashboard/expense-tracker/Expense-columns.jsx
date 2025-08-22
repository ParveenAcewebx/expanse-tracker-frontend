'use client'

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Edit, Trash2 } from "lucide-react"

export const ExpenseColumns = (handleDeleteExpense, handleEditExpense) => [
  // {
  //   accessorKey: 'action',
  //   header: 'Actions',
  //   cell: ({ row }) => {
  //     return (
  //       <>
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant='ghost' className='h-8 w-8 p-0'>
  //               <EllipsisVertical className='h-5 w-5' />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align='end'>
  //             <DropdownMenuItem
  //               onClick={() => handleEditExpense(row)}
  //               className='cursor-pointer hover:!bg-gray-200 hover:!text-indigo-600'
  //             >
  //               <Edit className='mr-2 h-4 w-4' />
  //               Edit
  //             </DropdownMenuItem>
  //             <DropdownMenuItem
  //               onClick={() => handleDeleteExpense(row)}
  //               className='cursor-pointer hover:!bg-gray-200 hover:!text-indigo-600'
  //             >
  //               <Trash2 className='mr-2 h-4 w-4' />
  //               Delete
  //             </DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       </>
  //     )
  //   }
  // },
  {
    id: 'date',
    header: 'Date',
    cell: ({ row }) => row?.original?.date ||"-"
  },

  {
    id: 'amount',
    header: 'Amount',
    cell: ({ row }) => row?.original?.amount
  },
  {
    id: 'category',
    header: 'Category',
    cell: ({ row }) => row?.original?.category
  },
  {
    id: 'account',
    header: 'Account',
    cell: ({ row }) => row?.original?.account
  },
  {
    accessorKey: 'note',
    header: 'Note',
    cell: ({ row }) => row?.original?.note ||""
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
