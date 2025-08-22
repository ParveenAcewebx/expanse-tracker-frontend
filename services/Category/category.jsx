import api from '@/lib/api'

const CategoryServices = {
  AddCategory: formData => {
    return api.post(`/lead-teams`, formData)
  },
  getCategoryById: editId => {
    return api.get(`/lead-teams/${editId}`)
  },

  updateCategoryById: (editId, values) => {
    return api.post(`/lead-teams/${editId}`, values)
  },
  updateCategoryContactById: (editId, values) => {
    return api.put(`/update-lead-team-members/${editId}`, values)
  },
  deleteCategory: deleteIndex => {
    return api.delete(`/lead-teams/${deleteIndex}`)
  },
  getAllCategory: (page, length, searchValue) => {
    const params = {}

    if (page !== undefined && length !== undefined) {
      params.page = page
      params.per_page = length
    }

    if (searchValue) {
      params.search = searchValue
      params.take_all = 'all'
    }

    return api.get(`/lead-teams`, { params })
  }
}
export default CategoryServices
