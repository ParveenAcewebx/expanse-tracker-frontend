'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { TablePagination } from './tabel-pagination'

export function DataTable({
  columns,
  data,
  totalRecord,
  page,
  loading,
  setPage,
  length,
  type,
  rowBgColor
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })
  return (
    <>
      <div className='rounded-6 border-color-grey custom-tabels border border-t-gray-500 bg-white'>
        <Table>
          <TableHeader
            className={
              rowBgColor ? '!font-normal !text-gray-600' : 'theme-bg-light-rgba'
            }
            style={rowBgColor ? { backgroundColor: rowBgColor } : {}}
          >
            {table?.getHeaderGroups().map(headerGroup => (
              <TableRow
                key={headerGroup?.id}
                className={rowBgColor && 'border-none'}
              >
                {headerGroup?.headers.map(header => (
                  <TableHead
                    key={header?.id}
                    className={`border-color-grey px-3 py-4 text-sm ${rowBgColor ? '!font-normal !text-gray-600' : ''}`}
                    style={rowBgColor ? { backgroundColor: rowBgColor } : {}}
                  >
                    {header?.isPlaceholder
                      ? null
                      : flexRender(
                          header?.column?.columnDef?.header,
                          header?.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns?.length + 1}
                  className='h-16 px-2 py-3 text-center'
                >
                  {/* <Spinner
                    size='lg'
                    className='m-auto bg-black dark:bg-white'
                  /> */}
                </TableCell>
              </TableRow>
            ) : data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns?.length + 1}
                  className='h-24 px-2 py-3 text-center text-gray-500'
                >
                  No result found
                </TableCell>
              </TableRow>
            ) : (
              table?.getRowModel()?.rows?.map(row => (
                <TableRow
                  key={row?.id}
                  data-state={row?.getIsSelected() && 'selected'}
                  style={{ backgroundColor: rowBgColor || 'white' }}
                >
                  {row?.getVisibleCells()?.map(cell => (
                    <TableCell
                      key={cell?.id}
                      className='border-color-grey border-b px-4 pb-3'
                    >
                      {flexRender(
                        cell?.column?.columnDef?.cell,
                        cell?.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {totalRecord > 10 ? (
        <TablePagination
          totalRecord={totalRecord}
          page={page}
          setPage={setPage}
          length={length}
          type={type}
        />
      ) : (
        ''
      )}
    </>
  )
}
