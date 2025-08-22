import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const FileUpload = ({ name, form, label, disable, className }) => {
  const [fileItems, setFileItems] = useState([]) // [{ id, file, url }]

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)

    const newItems = newFiles.map(file => ({
      id: `${file.name}-${Date.now()}`,
      url: URL.createObjectURL(file),
      file
    }))

    const updatedItems = [...fileItems, ...newItems]
    setFileItems(updatedItems)

    form?.setValue(name, updatedItems.map(item => item.file))
  }

  const removeFile = (id) => {
    const updatedItems = fileItems.filter(item => item.id !== id)
    setFileItems(updatedItems)

    form?.setValue(name, updatedItems.map(item => item.file))
  }

  return (
    <FormField
      control={form?.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            <>
              {/* Hidden native input */}
              <Input
                id={name}
                type='file'
                multiple
                disabled={disable}
                className='hidden'
                onChange={handleFileChange}
              />

              {/* Fake input showing filenames + custom Browse button */}
              <div className='flex items-center gap-2'>
                <div className='flex-1'>
                  <input
                    type='text'
                    readOnly
                    value={
                      fileItems.length > 0
                        ? fileItems.map(f => f.file.name).join(', ')
                        : ''
                    }
                    placeholder='No file chosen'
                    className='w-full cursor-default rounded border px-3 py-2 text-sm text-gray-600 bg-gray-100'
                  />
                </div>
                <label htmlFor={name}>
                  <span className='cursor-pointer rounded bg-red-700 px-4 py-2 text-sm text-white hover:bg-red-600'>
                    Browse
                  </span>
                </label>
              </div>

              {/* Image previews */}
              {fileItems.length > 0 && (
                <div className='mt-2 flex flex-wrap gap-2'>
                  {fileItems.map(item => (
                    <div key={item.id} className='relative'>
                      <img
                        src={item.url}
                        alt='Preview'
                        className='max-h-32 w-40 rounded border'
                      />
                      <button
                        type='button'
                        className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white'
                        onClick={() => removeFile(item.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FileUpload
