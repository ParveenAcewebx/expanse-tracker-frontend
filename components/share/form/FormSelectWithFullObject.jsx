import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const FormSelectWithFullObject = ({
  name,
  form,
  label,
  className,
  placeholder = 'Select an option',
  options,
  disabled,
  onChange,
  defaultValue
}) => {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field, fieldState }) => {
        const selectedOption = options.find(
          option => option.value === field.value?.value
        )

        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <Select
              value={selectedOption?.value || ''}
              onValueChange={value => {
                const selected = options.find(opt => opt.value === value)
                field.onChange(selected)
                onChange?.(selected)
              }}
              defaultValue={defaultValue?.value || selectedOption?.value}
              disabled={disabled}
            >
              <FormControl
                className={`border-color-grey h-12 rounded !bg-white !shadow-none ${
                  fieldState.error ? 'border-red-500' : ''
                } ${className}`}
              >
                <SelectTrigger>
                  <SelectValue placeholder={placeholder}>
                    {selectedOption?.label}
                  </SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options?.map(option => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.icon ? (
                      <>
                        <option.icon className='mr-2 inline h-5 w-5' />
                        {option.label}
                      </>
                    ) : (
                      option.label
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default FormSelectWithFullObject
