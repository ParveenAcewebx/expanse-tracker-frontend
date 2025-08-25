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

const FormSelectField = ({ name, form, label, options, placeholder = 'Select an option', disabled }) => {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select
            value={field.value || ""}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger className="h-12 rounded border !bg-white">
              <SelectValue placeholder={placeholder}>
                {/* Explicitly show label */}
                {options.find(opt => opt.value === field.value)?.label || ""}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {options.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormSelectField
