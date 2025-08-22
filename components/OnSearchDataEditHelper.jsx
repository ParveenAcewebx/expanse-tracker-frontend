import api from '@/lib/api'
import BudgetScopeService from '@/services/BudgetBook/Budget-scope-api'
import CompaniesServices, { CompanyTypeServices } from '@/services/Crm/company'
import LeadsServices from '@/services/Leads/lead'
import PipelineStatusServices, {
  PipelineGroupServices
} from '@/services/Pipeline/pipeline'
import DepartmentServices from '@/services/Settings/department'
import LeadsSettingServices from '@/services/Settings/LeadSetting'
import { TemplateServices } from '@/services/Settings/TemplateServices'

// Fetch a single  ID to ensure the selected value
export const fetchProjectById = async id => {
  try {
    const res = await api.get(`/budget-books/${id}`)
    const item = res?.data?.data

    return {
      label: item?.name,
      value: String(item?.id)
    }
  } catch (e) {
    console.error('Failed to fetch budget book by ID', e)
  }
}

export const fetchCompanyById = async id => {
  try {
    const res = await CompaniesServices.getCompaniesById(id)
    const item = res?.data?.data

    return {
      label: item?.name,
      value: String(item?.id)
    }
  } catch (e) {
    console.error('Failed to fetch budget book by ID', e)
  }
}

export const fetchCategoryById = async id => {
  try {
    const res = await BudgetScopeService.GetCategoryBYId(id)
    const item = res?.data?.data
    return {
      label: item?.name,
      value: String(item?.id)
    }
  } catch (e) {
    console.error('Failed to fetch budget book by ID', e)
  }
}

export const fetchEngineeryById = async id => {
  try {
    const res = await api.get(`/engineers/${id}`)
    const item = res?.data?.data

    return {
      label: item?.name,
      value: String(item?.id)
    }
  } catch (e) {
    console.error('Failed to fetch budget book by ID', e)
  }
}

export const fetchPipelinebyId = async id => {
  try {
    const res = await PipelineStatusServices.getPipelineStatusBYId(id)
    const item = res?.data?.data
    return {
      label: item?.name,
      value: String(item?.id)
    }
  } catch (e) {
    console.error('Failed to fetch budget book by ID', e)
  }
}

export const fetchDepartmentById = async id => {
  try {
    const res = await DepartmentServices.getDepartment(id)
    const item = res?.data?.data
    return {
      label: item?.name,
      value: String(item?.id)
    }
  } catch (e) {
    console.error('Failed to fetch budget book by ID', e)
  }
}

export const fetchLeadById = async id => {
  try {
    const res = await LeadsServices.getleadById(id)
    const item = res?.data?.data
    return {
      label: item?.name,
      value: String(item?.id)
    }
  } catch (e) {
    console.error('Failed to fetch budget book by ID', e)
  }
}

export const fetchCompanyTypeById = async id => {
  try {
    const res = await CompanyTypeServices.getCompaniesTypeById(id)
    const item = res?.data?.data
    return {
      label: item?.name,
      value: String(item?.id)
    }
  } catch (e) {
    console.error('Failed to fetch budget book by ID', e)
  }
}

export const fetchPipelineGroupSearch = async id => {
  try {
    const res = await PipelineGroupServices.getPipelineGroupBYId(id)
    const item = res?.data?.data?.data
    return {
      label: item?.name,
      value: String(item?.id)
    }
  } catch (e) {
    console.error('Failed to fetch budget book by ID', e)
  }
}

export const fetchStatusById = async (id, ruleType) => {
  try {
    let item

    if (ruleType === 'status') {
      const res = await LeadsSettingServices.GetLeadStatusBYId(id)
      item = res?.data?.data
    } else if (ruleType === 'template') {
      const res = await TemplateServices.getTemplateById(id)
      item = res?.data?.data
    } else if (ruleType === 'tag') {
      const res = await LeadsSettingServices.GetTagBYId(id)
      item = res?.data?.data
    }

    return {
      label: item?.name || item?.title || `Value ${id}`,
      value: String(item?.id ?? id)
    }
  } catch (e) {
    console.error('Failed to fetch value by ID', e)
    return { label: `Value ${id}`, value: id }
  }
}
