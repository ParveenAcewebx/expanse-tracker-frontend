'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Scrollbar } from '@radix-ui/react-scroll-area'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import React from 'react'
import { Controller } from 'react-hook-form'

function DateTimePicker({ form, name }) {
  const [isOpen, setIsOpen] = React.useState(false)

  const hours = Array.from({ length: 12 }, (_, i) => i + 1)
  const minutes = Array.from({ length: 60 }, (_, i) => i)

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { value, onChange } }) => {
        const handleDateSelect = selectedDate => {
          if (!selectedDate) return

          const baseDate = new Date(selectedDate)
          const safeValue = value instanceof Date ? value : new Date(value)
          const isValid = safeValue instanceof Date && !isNaN(safeValue)

          if (isValid) {
            baseDate.setHours(safeValue.getHours())
            baseDate.setMinutes(safeValue.getMinutes())
          } else {
            // Default time: 12:00 PM if no valid previous value
            baseDate.setHours(12)
            baseDate.setMinutes(0)
          }

          onChange(baseDate)
        }

        const handleTimeChange = (type, inputValue) => {
          if (value) {
            const newDate = new Date(value)
            const parsed = parseInt(inputValue)
            if (type === 'hour') {
              const isPM = newDate.getHours() >= 12
              newDate.setHours((parsed % 12) + (isPM ? 12 : 0))
            } else if (type === 'minute') {
              newDate.setMinutes(parsed)
            } else if (type === 'ampm') {
              const currentHours = newDate.getHours()
              if (inputValue === 'PM' && currentHours < 12) {
                newDate.setHours(currentHours + 12)
              } else if (inputValue === 'AM' && currentHours >= 12) {
                newDate.setHours(currentHours - 12)
              }
            }
            onChange(newDate)
          }
        }
        const safeDate = value instanceof Date ? value : new Date(value)
        const isValidDate = value instanceof Date && !isNaN(value)
        return (
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !value && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {value ? (
                  format(value, 'MM/dd/yyyy hh:mm aa')
                ) : (
                  <span>MM/DD/YYYY hh:mm aa</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <div className='sm:flex'>
                <Calendar
                  mode='single'
                  selected={isValidDate ? safeDate : undefined}
                  onSelect={handleDateSelect}
                  initialFocus
                />

                <div className='flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0'>
                  {/* Hours */}
                  <ScrollArea className='w-64 sm:w-auto'>
                    <div className='flex p-2 sm:flex-col'>
                      {hours.reverse().map(hour => (
                        <Button
                          key={hour}
                          size='icon'
                          variant={
                            isValidDate && value.getHours() % 12 === hour % 12
                              ? 'default'
                              : 'ghost'
                          }
                          className='aspect-square shrink-0 sm:w-full'
                          onClick={() =>
                            handleTimeChange('hour', hour.toString())
                          }
                        >
                          {hour}
                        </Button>
                      ))}
                    </div>
                    <Scrollbar orientation='horizontal' className='sm:hidden' />
                  </ScrollArea>

                  {/* Minutes */}
                  <ScrollArea className='w-64 sm:w-auto'>
                    <div className='flex p-2 sm:flex-col'>
                      {minutes.map(minute => (
                        <Button
                          key={minute}
                          size='icon'
                          variant={
                            isValidDate && safeDate.getMinutes() === minute
                              ? 'default'
                              : 'ghost'
                          }
                          className='aspect-square shrink-0 sm:w-full'
                          onClick={() =>
                            handleTimeChange('minute', minute.toString())
                          }
                        >
                          {minute}
                        </Button>
                      ))}
                    </div>
                    <Scrollbar orientation='horizontal' className='sm:hidden' />
                  </ScrollArea>

                  {/* AM/PM */}
                  <ScrollArea className=''>
                    <div className='flex p-2 sm:flex-col'>
                      {['AM', 'PM'].map(ampm => (
                        <Button
                          key={ampm}
                          size='icon'
                          variant={
                            isValidDate &&
                            ((ampm === 'AM' && safeDate.getHours() < 12) ||
                              (ampm === 'PM' && safeDate.getHours() >= 12))
                              ? 'default'
                              : 'ghost'
                          }
                          className='aspect-square shrink-0 sm:w-full'
                          onClick={() => handleTimeChange('ampm', ampm)}
                        >
                          {ampm}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )
      }}
    />
  )
}

export default DateTimePicker
