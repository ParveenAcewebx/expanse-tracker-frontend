// services/ExpenseTracker/expense.js
import axios from "axios";

const API_URL = "/api/expenses"; // MirageJS mock server

const ExpenseServices = {
  getAllExpense: () => axios.get(API_URL),
  getExpenseById: (id) => axios.get(`${API_URL}/${id}`),
  AddExpense: (data) => axios.post(API_URL, data),
  updateExpenseById: (id, data) => axios.put(`${API_URL}/${id}`, data),
  deleteExpense: (id) => axios.delete(`${API_URL}/${id}`),
};

export default ExpenseServices;
