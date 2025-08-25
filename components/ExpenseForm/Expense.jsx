'use client'
import FormDatePicker from '../share/form/datePicker'
import FileUpload from '../share/form/FileUpload'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'

const Expense = () => {
  const categoryData = [
    {
      label: 'Category 1',
      value: '1'
    },
    {
      label: 'Category 2',
      value: 'category2'
    },
    {
      label: 'Category 3',
      value: 'category3'
    },
    {
      label: 'Category 4',
      value: 'category4'
    },
    {
      label: 'Category 5',
      value: 'category5'
    },
    {
      label: 'Category 6',
      value: 'category6'
    }
  ]
  return (
    <>
      <div className='grid grid-cols-2 gap-4 space-x-2'>
        <FormDatePicker label='Date' name='expense.date' placeholder='Select Date' />
        <FormInputField
          label='Amount $'
          name='expense.amount'
          type='number'
          placeholder='Enter Amount'
        />
        <FormSelectField
          label='Category'
          name='expense.category'
          type='text'
          placeholder='Select Category'
          options={categoryData}
        />
        <FormInputField
          label='Account'
          name='expense.account'
          // type='number'
          placeholder='Enter Account'
        />
        <FormInputField
          label='Note'
          name='expense.note'
          type='text'
          placeholder='Enter Note'
        />
        <FormInputField
          label='Description'
          name='expense.description'
          type='text'
          placeholder='Enter Description'
        />
      </div>
      <div className='mt-6'>
        <FileUpload name='expense.image' label='Choose Image' />
      </div>
    </>
  )
}

export default Expense
