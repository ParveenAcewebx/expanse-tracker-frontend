
'use client'
import { createContext, useContext } from 'react'

const UserContext = createContext()

export const useExpenseContext = () => useContext(UserContext)

export default UserContext
