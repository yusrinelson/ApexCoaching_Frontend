// import { useAuthStore } from './auth.store'

// export const initializeAuth = async () => {
//   const authStore = useAuthStore()

//   try {
//     await authStore.refreshAccessToken()
//     await authStore.getCurrentUser()
//   } catch {
//     authStore.user = null
//     authStore.accessToken = null
//   } finally {
//     authStore.initialized = true
//   }
// }
