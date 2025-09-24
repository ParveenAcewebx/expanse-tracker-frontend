import * as yup from 'yup'

export const ExpenseFormValidation = yup.object({
  expense: yup.object({
    date: yup
      .date()
      .typeError("Date is required")
      .required("Expense date is required"),
    //   .min(new Date("2024-12-31"), "Date must be after 2024-12-31"),
    amount: yup
      .number()
      .typeError("Amount must be a number")
      .positive("Amount must be greater than 0")
      .required("Amount is required"),
    category: yup.string().required("Category is required"),
    account: yup.string().required("Account is required"),
    note: yup.string().required("Notes is required"),
    description: yup.string().required("Description is required"),
  }),
  income: yup.object({
    date: yup
      .date()
      .typeError("Date is required")
      .required("Income date is required"),
    amount: yup
      .number()
      .typeError("Amount must be a number")
      .positive("Amount must be greater than 0")
      .required("Amount is required"),
    category: yup.string().required("Category is required"),
    account: yup.string().required("Account is required"),
    note: yup.string().required("Notes is required"),
  }),
})