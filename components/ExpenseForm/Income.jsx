'use client'
import FormDatePicker from '../share/form/datePicker'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
const Income = () => {
  const categoryData = [
    {
      label: 'Category 1',
      value: 'category1'
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
      <FormDatePicker label='Date' name='income.date' placeholder="Select Date" />
      <FormInputField label='Amount' name='income.amount' type='number' placeholder="Enter Amount" />
      <FormSelectField
          label='Catgeory'
          name='income.catgeory'
          type='text'
          placeholder='Select Catgeory'
          options={categoryData}
        />
      <FormInputField label='Account' name='income.account' type='number'  placeholder="Enter Account"/>
      <FormInputField label='Note' name='income.note' type='text' placeholder="Enter Note" />
      </div>
  
    </>
  )
}

export default Income
git 