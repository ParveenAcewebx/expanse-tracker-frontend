'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import {
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYesterday
} from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { useController } from 'react-hook-form'

const shortcuts = [
  {
    label: 'Today',
    getRange: () => ({ from: startOfToday(), to: startOfToday() })
  },
  {
    label: 'Yesterday',
    getRange: () => ({ from: startOfYesterday(), to: startOfYesterday() })
  },
  {
    label: 'This Week',
    getRange: () => ({
      from: startOfWeek(new Date()),
      to: endOfWeek(new Date())
    })
  },
  {
    label: 'Last Week',
    getRange: () => {
      const start =
        startOfWeek(new Date(), { weekStartsOn: 1 }) - 7 * 24 * 60 * 60 * 1000
      const end =
        endOfWeek(new Date(), { weekStartsOn: 1 }) - 7 * 24 * 60 * 60 * 1000
      return { from: new Date(start), to: new Date(end) }
    }
  },
  {
    label: 'This Month',
    getRange: () => ({
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date())
    })
  },
  {
    label: 'Last Month',
    getRange: () => {
      const firstDayLastMonth = startOfMonth(
        new Date(new Date().setMonth(new Date().getMonth() - 1))
      )
      const lastDayLastMonth = endOfMonth(firstDayLastMonth)
      return { from: firstDayLastMonth, to: lastDayLastMonth }
    }
  }
]

export default function DateRangePicker({ name, from, label, disabled }) {
  const { field, fieldState } = useController({
    name,
    from,
    defaultValue: { from: null, to: null }
  })

  const [localDate, setLocalDate] = React.useState(field.value)
  const [shortcut, setShortcut] = React.useState(null)
  const [open, setOpen] = React.useState(false)

  const apply = () => {
    field.onChange(localDate)
    setOpen(false)
  }

  const selectShortcut = (s, range) => {
    setShortcut(s)
    setLocalDate(range)
  }

  return (
    <FormItem>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              onClick={() => setOpen(true)}
              disabled={disabled}
              className={cn(
                'flex w-[300px] items-center justify-start gap-2 text-left',
                !localDate && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className='h-4 w-4' />
              {localDate?.from
                ? localDate.to
                  ? `${format(localDate.from, 'LLL dd, y')} - ${format(localDate.to, 'LLL dd, y')}`
                  : format(localDate.from, 'LLL dd, y')
                : 'Pick a date'}
            </Button>
          </PopoverTrigger>

          <PopoverContent className='date-range-picker flex gap-4 p-4'>
            {/* Shortcuts */}
            <div className='w-1/4 space-y-2 border-r pr-4'>
              {shortcuts.map(s => (
                <Button
                  key={s.label}
                  variant={shortcut === s.label ? 'default' : 'ghost'}
                  size='sm'
                  className='w-full justify-start'
                  onClick={() => selectShortcut(s.label, s.getRange())}
                >
                  {s.label}
                </Button>
              ))}
            </div>

            {/* Calendar */}
            <div className='w-3/4'>
              <Calendar
                mode='range'
                defaultMonth={localDate?.from}
                selected={localDate}
                onSelect={range => {
                  setLocalDate(range)
                  setShortcut(null)
                }}
                numberOfMonths={2}
              />
              <div className='flex justify-end gap-2 pt-4'>
                <Button variant='ghost' onClick={() => setOpen(false)}>
                  Close
                </Button>
                <Button onClick={apply}>OK</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </FormControl>
      <FormMessage>{fieldState.error?.message}</FormMessage>
    </FormItem>
  )
}
