import { useAuthStore } from '../features/auth/auth.store'
import { createRouter, createWebHistory } from 'vue-router'

import PublicLayout from '../layouts/PublicLayout.vue'

import HomeView from '../views/HomeView.vue'
import LoginView from '../features/auth/views/LoginView.vue'
import RegisterView from '../features/auth/views/RegisterView.vue'
import DashBoardView from '../views/DashBoardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: PublicLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        guestOnly: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        guestOnly: true,
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoardView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  await authStore.initialize()

  // if (!authStore.initialized) {
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

  if (to.meta.requiresAuth && !authStore.isAuthenticated)
    return {
      name: 'login',
      query: {
        redirect: to.fullPath,
      },
    }

  if (to.meta.guestOnly && authStore.user)
    return {
      name: 'dashboard',
    }

  return true
})

export default router
