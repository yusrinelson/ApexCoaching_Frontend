import { defineStore } from 'pinia'
import * as authApi from './auth.api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: null,
    loading: false,
    initialized: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async login(credentials) {
      this.loading = true

      try {
        const response = await authApi.login(credentials)

        this.user = response.data.user
        this.accessToken = response.data.accessToken

        return response
      } finally {
        this.loading = false
      }
    },

    async register(userData) {
      this.loading = true

      try {
        const response = await authApi.register(userData)

        return response
      } finally {
        this.loading = false
      }
    },

    async getCurrentUser() {
      try {
        const response = await authApi.getMe()

        this.user = response.data

        return this.user
      } catch (error) {
        this.user = null
        this.accessToken = null

        throw error
      } finally {
        this.initialized = true
      }
    },

    async refreshAccessToken() {
      const response = await authApi.refreshToken()

      this.accessToken = response.data.accessToken

      return response
    },

    async logout() {
      try {
        await authApi.logout()
      } finally {
        this.user = null
      }
    },

    async initialize() {
      if (this.initialized) return

      try {
        await this.refreshAccessToken()
        await this.getCurrentUser()
      } catch {
        this.user = null
        this.accessToken = null
      } finally {
        this.initialized = true
      }
    },
  },
})

//auth flow
//          Browser
//             │
//             ▼
//     Pinia Auth Store
//             │
//             ▼
//        auth.api.js
//             │
//             ▼
//       apiClient.js
//             │
//             ▼
//    APEX Express Backend
//             │
//             ▼
//         MongoDB
