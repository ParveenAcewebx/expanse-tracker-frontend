'use client'
import { useState } from 'react'
import FormDatePicker from '../share/form/datePicker'
import FileUpload from '../share/form/FileUpload'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
import { MultiImageUploader } from '../share/form/MultiFileUpload'
import { CloudCog } from 'lucide-react'
import FormTextArea from '../share/form/TextArea'

const Expense = ({form ,setImageUpload , updateImage ,setDeletedOldImages, setFiles, files}) => {
console.log("files->>>>>>>>>>>>>>>>>>>",files);

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
      <div className='grid grid-cols-2 gap-4 '>
        <FormDatePicker  className='!border !rounded' label='Date' name='expense.date' placeholder='Select Date' />
        <FormInputField
          label='Amount $'
          name='expense.amount'
          type='number'
          placeholder='Enter Amount'
        />
        <FormSelectField
        form={form}
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
        <FormTextArea
          label='Note'
          name='expense.note'
          type='text'
          placeholder='Enter Note'
        />
        <FormTextArea
          label='Description'
          name='expense.description'
          type='text'
          placeholder='Enter Description'
        />
      </div>
      {/* <div className='mt-4 grid grid-cols-1 gap-4 space-x-2'>
        <FileUpload name='expense.image' label='Choose Image' />
      </div> */}
      <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-1 mt-7'>
                            <MultiImageUploader
                                setImageUpload={setImageUpload}
                                updateImage={updateImage}
                                setDeletedOldImages={setDeletedOldImages}
                                setFiles={setFiles}
                                files={files}
                            />
                        </div>
    </>
  )
}

export default Expense
