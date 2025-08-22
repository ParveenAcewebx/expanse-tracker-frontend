import { Card } from '@/components/ui/card'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ChevronDown } from 'lucide-react' // arrow icon
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const UserAutocomplete = ({
  name,
  form,
  label,
  users,
  onSelect,
  initialValue = '',
  value,
  placeholder = 'Search Users...',
  NotFound,
  showDropdownButton = false, // new prop to show arrow button
  disabled,
  className
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue)
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 })
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (value && value.label) {
      setSearchTerm(value.label)
    } else {
      setSearchTerm('')
    }
  }, [value])

  const filteredUsers =
    isOpen && searchTerm === ''
      ? users // show all users if dropdown is open and input empty
      : users.filter(user =>
          user.label.toLowerCase().includes(searchTerm.toLowerCase())
        )

  const handleSelect = (user, field) => {
    setSearchTerm(user.label)
    setIsOpen(false)
    field.onChange(user)
    if (onSelect) {
      onSelect(user)
    }
  }

  const openDropdown = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect()
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      })
    }
    setIsOpen(true)
  }

  // Toggle dropdown when arrow button clicked
  const toggleDropdown = () => {
    if (isOpen) {
      setIsOpen(false)
    } else {
      // show all options by clearing searchTerm
      setSearchTerm('')
      openDropdown()
    }
  }

  return (
    <FormField
      control={form?.control}
      name={name || 'usersField'}
      render={({ field, fieldState }) => (
        <FormItem className='relative'>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className='relative flex items-center'>
              <Input
                ref={inputRef}
                placeholder={placeholder}
                value={searchTerm}
                onChange={e => {
                  if (!disabled) {
                    setSearchTerm(e.target.value)
                    openDropdown()
                  }
                }}
                onFocus={() => {
                  if (!disabled) openDropdown()
                }}
                className={`h-[40px] rounded-[10px] ${
                  fieldState.error ? 'border-red-500' : ''
                } pr-10 ${disabled ? 'cursor-not-allowed bg-gray-100 text-gray-500' : 'bg-[#aae8fb2b]'} ${className}`}
                disabled={disabled}
              />

              {showDropdownButton && (
                <button
                  type='button'
                  onClick={() => {
                    if (!disabled) toggleDropdown()
                  }}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 ${
                    disabled
                      ? 'cursor-not-allowed text-gray-400'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  tabIndex={-1}
                  disabled={disabled}
                >
                  <ChevronDown size={16} />
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />

          {isOpen &&
            createPortal(
              <Card
                ref={dropdownRef}
                className='absolute z-50 mt-1 bg-white shadow-lg'
                style={{
                  top: position.top,
                  left: position.left,
                  width: position.width
                }}
              >
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                          <CommandItem
                            key={user.value}
                            onSelect={() => handleSelect(user, field)}
                            className='cursor-pointer px-4 py-2 hover:bg-gray-100'
                          >
                            {user.label}
                          </CommandItem>
                        ))
                      ) : (
                        <CommandItem
                          className='cursor-default px-4 py-2 text-gray-800'
                          disabled
                        >
                          {NotFound ? NotFound : 'Not Found User'}
                        </CommandItem>
                      )}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </Card>,
              document.body
            )}
        </FormItem>
      )}
    />
  )
}

export default UserAutocomplete
