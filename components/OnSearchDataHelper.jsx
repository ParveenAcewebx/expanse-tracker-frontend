'use client'
import { GetAllContact } from '@/services/BudgetBook/budget-book-api'
import BudgetBooksServices from '@/services/BudgetBook/budgetBook'
import { GetAllEngineers } from '@/services/BudgetBook/customer-api'
import CompaniesServices, { CompanyTypeServices } from '@/services/Crm/company'
import TeamServices from '@/services/Crm/team'
import LeadsServices from '@/services/Leads/lead'
import { PipelineGroupServices } from '@/services/Pipeline/pipeline'
import DepartmentServices from '@/services/Settings/department'
import LeadsSettingServices from '@/services/Settings/LeadSetting'
import { errorMessage } from './ToasterMessage'

export const handleProjectSearch = async searchValue => {
  try {
    const res = await BudgetBooksServices.budgetBooks(
      undefined,
      undefined,
      searchValue
    )
    if (res.status === 200) {
      return res?.data?.data?.map(item => ({
        label: item?.name,
        value: String(item?.id)
      }))
    }
  } catch (error) {
    console.error('Project search error', error)
    return []
  }
}

export const handleCompanySearch = async searchValue => {
  try {
    const res = await CompaniesServices.companies(
      undefined,
      undefined,
      searchValue
    )
    if (res?.status === 200) {
      return res.data.data.map(item => ({
        label: `#${String(item.id)} ${item.name}`,
        value: String(item.id)
      }))
    }
    return []
  } catch (error) {
    console.error('Company search error', error)
    return []
  }
}

export const handleEngineerSearch = async searchValue => {
  try {
    const res = await GetAllEngineers.GetEngineersList({
      search: searchValue,
      take_all: 'all'
    })
    if (res?.status === 200) {
      return res.data.data.map(item => ({
        label: item.name,
        value: String(item.id)
      }))
    }
    return []
  } catch (error) {
    console.error('Engineer search error', error)
    return []
  }
}

export const handleLeadStatusSearch = async searchValue => {
  try {
    const res = await LeadsSettingServices.getLeadsStatus(
      undefined,
      undefined,
      searchValue
    )
    if (res?.status === 200) {
      return res.data.data.map(item => ({
        label: item.title,
        value: String(item.id)
      }))
    }
  } catch (error) {
    console.error('Lead Status search error', error)
    return []
  }
}

export const handleContactSearch = async searchValue => {
  try {
    const res = await GetAllContact.GetContact({
      search: searchValue,
      take_all: 'all'
    })
    if (res?.status === 200) {
      return res.data.data.map(item => ({
        label: item.name,
        value: String(item.id)
      }))
    }
    return []
  } catch (error) {
    console.error('Contact search error', error)
    return []
  }
}

export const handleSearchteam = async searchValue => {
  try {
    const response = await TeamServices.getAllTeam(
      undefined,
      undefined,
      searchValue
    )
    if (response.status === 200) {
      return response?.data?.data?.data
    }
  } catch (error) {
    console.log(error)
    errorMessage({
      description: error?.response?.data?.message || 'Something went wrong.'
    })
  }
}

export const handleSearchCompanyType = async searchValue => {
  try {
    const response = await CompanyTypeServices.allCompaniesType(
      undefined,
      undefined,
      searchValue
    )
    if (response?.status === 200) {
      return response?.data?.data?.map(item => ({
        label: item.name,
        value: String(item.id)
      }))
    }
  } catch (error) {
    errorMessage({
      description: error?.response?.data?.message || 'Something went wrong.'
    })
  }
}

export const handleSearchLeadProject = async searchValue => {
  try {
    const response = await LeadsServices.getleads(
      undefined,
      undefined,
      searchValue
    )
    if (response?.status === 200) {
      return response?.data?.data.map(item => ({
        label: item?.project?.name,
        value: String(item.id)
      }))
    }
  } catch (error) {
    errorMessage({
      description: error?.response?.data?.message || 'Something went wrong.'
    })
  }
}

export const handleSearchgetCategory = async searchValue => {
  try {
    const response = await BudgetBooksServices.getAllCategory(
      undefined,
      undefined,
      searchValue
    )
    if (response.status === 200) {
      return response?.data?.data.map(item => ({
        label: item?.name,
        value: String(item.id)
      }))
    }
  } catch (error) {
    console.log('error', error)

    errorMessage({
      description: error?.response?.data?.message || 'Something went wrong.'
    })
  }
}

export const handleSearchDepartment = async searchValue => {
  try {
    const response = await DepartmentServices.AllDepartment(1, 100, searchValue)
    if (response.status === 200) {
      return response?.data?.data?.data?.map(item => ({
        label: item?.name,
        value: String(item.id)
      }))
    }
  } catch (error) {
    console.log('error', error)

    errorMessage({
      description: error?.response?.data?.message || 'Something went wrong.'
    })
  }
}

export const handlePipelineGroupSearch = async searchValue => {
  try {
    const response = await PipelineGroupServices.getPipelineGroup(
      undefined,
      undefined,
      searchValue
    )

    if (response.status === 200) {
      return response?.data?.data?.data?.map(item => ({
        label: item?.name,
        value: String(item.id)
      }))
    }
  } catch (error) {
    console.log('error', error)

    errorMessage({
      description: error?.response?.data?.message || 'Something went wrong.'
    })
  }
}

export const handleStatusSearch = async (searchValue, ruleType) => {
  try {
    let response;

    if (ruleType === 'status') {
      response = await LeadsSettingServices.getLeadsStatus();
      return response?.data?.data?.map(item => ({
        label: item?.name,
        value: String(item?.id)
      }));

    } else if (ruleType === 'template') {
      response = await TemplateServices.GetAllTaskTemplate();
      return response?.data?.data?.map(item => ({
        label: item?.title, // adjust if API returns "name" instead
        value: String(item?.id)
      }));

    } else if (ruleType === 'tag') {
      response = await LeadsSettingServices.getTags();
      return response?.data?.data?.map(item => ({
        label: item?.name,
        value: String(item?.id)
      }));
    }

    return [];

  } catch (error) {
    console.error('Error fetching options', error);
    errorMessage({
      description: error?.response?.data?.message || 'Something went wrong.'
    });
    return [];
  }
};
