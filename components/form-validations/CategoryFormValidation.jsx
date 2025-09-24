import * as yup from 'yup'

export const CategoryFormValidation = yup.object({
  name: yup.string().required('Name is required'),
  parent: yup.string().required('Parent is required'),
  type: yup.string().required('Type is required')
})
