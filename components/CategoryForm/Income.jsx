'use client'
import FormDatePicker from '../share/form/datePicker'
import FormInputField from '../share/form/FormInputField'
const Income = () => {
  return (
    <>
      <div className='grid grid-cols-2 gap-4 space-x-2'>
      <FormDatePicker label='Date' name='date' placeholder="Select Date" />
      <FormInputField label='Amount' name='amount' type='number' placeholder="Enter Amount" />
      <FormInputField label='Catgeory' name='catgeory' type='text'   placeholder="Enter Catgeory"/>
      <FormInputField label='Account' name='account' type='number'  placeholder="Enter Account"/>
      <FormInputField label='Note' name='note' type='text' placeholder="Enter Note" />
      </div>
  
    </>
  )
}

export default Income
