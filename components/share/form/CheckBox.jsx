import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const FormCheckBox = ({ name, form, items = [], label, className }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const isArrayField = Array.isArray(form.watch(name))

        return (
          <FormItem>
            {label && (
              <div className='mb-2'>
                <FormLabel className='text-base'>{label}</FormLabel>
              </div>
            )}
            <div className={className}>
              {items.map(item => {
                const itemValue = item.value

                if (isArrayField) {
                  const selectedValues = form.watch(name) || []
                  const isChecked = selectedValues.includes(itemValue)

                  return (
                    <FormItem
                      key={item.id || itemValue}
                      className='flex flex-row items-center space-x-3 space-y-0'
                    >
                      <label className='flex cursor-pointer flex-row items-center space-x-3'>
                        <FormControl>
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={checked => {
                              const current = Array.isArray(
                                form.getValues(name)
                              )
                                ? form.getValues(name)
                                : []

                              const updated = checked
                                ? [...current, itemValue]
                                : current.filter(val => val !== itemValue)

                              form.setValue(name, updated)
                            }}
                          />
                        </FormControl>
                        <span className='text-sm font-normal'>
                          {item.label}
                        </span>
                      </label>
                    </FormItem>
                  )
                } else {
                  const isChecked =
                    field.value === true || field.value === 'true'
                  return (
                    <FormItem
                      key={item.id || itemValue}
                      className='flex flex-row items-center space-x-3 space-y-0'
                    >
                      <label className='flex cursor-pointer flex-row items-center space-x-3'>
                        <FormControl>
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={checked =>
                              field.onChange(checked ? 'true' : 'false')
                            }
                          />
                        </FormControl>
                        <span className='text-sm font-normal'>
                          {item.label}
                        </span>
                      </label>
                    </FormItem>
                  )
                }
              })}
            </div>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default FormCheckBox
