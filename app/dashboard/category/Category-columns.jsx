'use client'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Edit, Trash2 } from 'lucide-react'

export const CategoryColumns = (handleDeleteCategory, handleEditCategory) => [
  {
    id: 'name',
    header: 'Name',
    cell: ({ row }) => row?.original?.name || '-'
  },

  {
    id: 'parent',
    header: 'Parent',
    cell: ({ row }) => row?.original?.parent || '-'
  },
 
  {
    id: 'type',
    header: 'Type',
    cell: ({ row }) => row?.original?.type || '-'
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
                  onClick={() => handleEditCategory(row)}
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
                  onClick={() => handleDeleteCategory(row)}
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
