import env from '@/lib/env'
import axios from 'axios'
import { getSession, signOut } from 'next-auth/react'
import { useLoadingStore } from './loadingStore'

export const baseURL = `${env.NEXT_PUBLIC_API_URL}`

const api = axios.create({ baseURL })

//  By using Zustand
let requestCount = 0

const startLoading = () => {
  requestCount++
  useLoadingStore.getState().setLoading(true)
}

const stopLoading = () => {
  requestCount = Math.max(0, requestCount - 1)
  if (requestCount === 0) {
    useLoadingStore.getState().setLoading(false)
  }
}

// By using Context

// api.interceptors.request.use(
//   async config => {
//     try {
//       startLoading()
//       // loaderProxy.startLoading()
//       const session = await getSession()

//       if (session?.user?.token) {
//         config.headers['Authorization'] = 'Bearer ' + session?.user?.token
//       }

//       return config
//     } catch (error) {
//       stopLoading()
//       // loaderProxy.stopLoading()
//       console.error('Error fetching session:', error)
//       return Promise.reject(error)
//     }
//   },
//   error => {
//     // loaderProxy.stopLoading()
//     stopLoading()
//     console.error('Request interceptor error:', error)
//     return Promise.reject(error)
//   }
// )

api.interceptors.request.use(
  async config => {
    startLoading()
    const session = await getSession()

    // only add token if not hitting localhost mock server
    if (!baseURL.includes("localhost:5000") && session?.user?.token) {
      config.headers['Authorization'] = 'Bearer ' + session.user.token
    }

    return config
  },
  error => {
    stopLoading()
    return Promise.reject(error)
  }
)


api.interceptors.response.use(
  response => {
    // loaderProxy.stopLoading()
    stopLoading()
    if (response.data.errorCode === 601) {
      signOut()
    }

    return response
  },
  error => {
    // loaderProxy.stopLoading()
    stopLoading()
    return Promise.reject(error)
  }
)

export default api
