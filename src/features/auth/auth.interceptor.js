import apiClient from '../../services/apiClient'
import { useAuthStore } from './auth.store'

let isRefreshing = false
let refreshPromise = null

export const setupAuthInterceptor = () => {
  apiClient.interceptors.request.use(
    (config) => {
      const authStore = useAuthStore()

      if (authStore.accessToken) {
        config.headers.Authorization = `Bearer ${authStore.accessToken}`
      }

      return config
    },
    (error) => Promise.reject(error)
  )

  apiClient.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config

      // Don't attempt token refresh for these requests
      if (
        error.response?.status !== 401 ||
        originalRequest?._retry ||
        originalRequest?.url?.includes('/auth/login') ||
        originalRequest?.url?.includes('/auth/register') ||
        originalRequest?.url?.includes('/auth/refresh')
      ) {
        return Promise.reject(error)
      }

      originalRequest._retry = true

      const authStore = useAuthStore()

      try {
        if (!isRefreshing) {
          isRefreshing = true

          refreshPromise = authStore
            .refreshAccessToken()
            .finally(() => {
              isRefreshing = false
              refreshPromise = null
            })
        }

        await refreshPromise

        originalRequest.headers.Authorization =
          `Bearer ${authStore.accessToken}`

        return apiClient(originalRequest)
      } catch (refreshError) {
        authStore.user = null
        authStore.accessToken = null

        return Promise.reject(refreshError)
      }
    }
  )
}