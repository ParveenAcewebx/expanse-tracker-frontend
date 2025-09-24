'use client'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
import { MultiImageUploader } from '../share/form/MultiFileUpload'

export default function AddCategoryForm({
  form,
  editData,
  setImageUpload,
  updateImage,
  setDeletedOldImages,
  setFiles,
  files
}) {
  const categoryType = [
    { label: 'Expense', value: 'expense' },
    { label: 'Income', value: 'income' }
  ]
  return (
    <>
      <div className='mt-4 grid grid-cols-3 gap-4'>
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
      </div>
      {/* <div className='mt-4 grid grid-cols-1 gap-4'> */}
      {/* <FileUpload name='icon' label='Choose Icon' /> */}
      {/* </div> */}

      <div className='mb-4 mt-7 grid grid-cols-1 gap-6 md:grid-cols-1'>
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
