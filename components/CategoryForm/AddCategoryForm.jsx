'use client'
import FileUpload from '../share/form/FileUpload'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'

export default function AddCategoryForm({ form, editData }) {
  const categoryType = [
    { label: 'Expense', value: 'expense' },
    { label: 'Income', value: 'income' }
  ]
  return (
    <>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <FormInputField
          name='name'
          className=''
          label='Name'
          placeholder='Enter Name'
        />

        <FormInputField
          name='parent'
          className=''
          label='Parent'
          placeholder='Enter Parent'
        />

        <FormSelectField
          name='type'
          className=''
          form={form}
          label='Type'
          placeholder='Select type'
          options={categoryType}
          
        />
        <FileUpload name='icon' label='Choose Icon' />
      </div>
    </>
  )
}
