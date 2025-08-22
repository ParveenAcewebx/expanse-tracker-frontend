'use client'

import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

// Load ReactQuill only on the client side
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const TextEditor = ({ name, form, label, className, placeholder }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          {/* don't use FormControl here */}
          <ReactQuill
            value={field.value || ''}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder={placeholder}
            className={`text-editor ${className}`}
            theme='snow'
          />
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default TextEditor
