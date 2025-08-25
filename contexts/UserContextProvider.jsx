'use client'
import { createContext, useContext, useState } from 'react'
import UserContext from './UserContext'

const ExpenseContext = createContext()

// Custom hook to use the context
export const useExpenseContext = () => useContext(ExpenseContext)

const UserContextProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([
    {
      id: '01',
      expense: {
        date: '2025-08-22',
        amount: 250.0,
        category: 'category1',
        account: 'Checking',
        note: 'Weekly grocery shopping',
        description: 'Bought vegetables, fruits, and dairy products'
      },
      income: {
        date: '',
        amount: 0,
        category: '',
        account: '',
        note: ''
      }
    },
    {
      id: '02',
      expense: {
        date: '2025-08-21',
        amount: 1200.5,
        category: 'category5',
        account: 'Bank Transfer',
        note: 'Monthly apartment rent',
        description: 'Rent for August 2025'
      },
      income: {
        date: '',
        amount: 0,
        category: '',
        account: '',
        note: ''
      }
    }
  ])

  const [category, setCategory] = useState([
    {
      id: '01',
      name: 'Rent',
      parent: null,
      category: 'Housing',
      type: 'expense'
    },
    {
      id: '02',
      name: 'Electricity Bill',
      parent: 'Rent',
      category: 'Utilities',
      type: 'income'
    },
    {
      id: '03',
      name: 'Internet',
      parent: 'Rent',
      category: 'Utilities',
      type: 'expense'
    },
    {
      id: '04',
      name: 'Salary',
      parent: null,
      category: 'Income',
      type: 'income'
    },
    {
      id: '05',
      name: 'Freelance Project',
      parent: 'Salary',
      category: 'Income',
      type: 'income'
    },
    {
      id: '06',
      name: 'Groceries',
      parent: null,
      category: 'Food',
      type: 'expense'
    }
  ])
  

  return (
    <UserContext.Provider
    value={{
      expenses,
        setExpenses,
        category,
        setCategory
      }}
      >
      {children}
    </UserContext.Provider>
  )
}
export default UserContextProvider
