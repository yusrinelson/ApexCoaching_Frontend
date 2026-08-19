import { useAuthStore } from '../features/auth/auth.store'
import { createRouter, createWebHistory } from 'vue-router'

import PublicLayout from '../layouts/PublicLayout.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'

import HomeView from '../views/HomeView.vue'
import LoginView from '../features/auth/views/LoginView.vue'
import RegisterView from '../features/auth/views/RegisterView.vue'
import DashBoardView from '../views/DashboardView.vue'
import ProgramsView from '../views/ProgramsView.vue'
import ShopView from '../views/ShopView.vue'
import AboutView from '../views/AboutView.vue'
import CartView from '../views/CartView.vue'
import ProfileView from '../features/account/views/ProfileView.vue'
import OrdersView from '../features/account/views/OrdersView.vue'

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
        {
          path: 'programs',
          name: 'programs',
          component: ProgramsView,
        },

        {
          path: 'shop',
          name: 'shop',
          component: ShopView,
        },

        {
          path: 'about',
          name: 'about',
          component: AboutView,
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
      component: DashboardLayout,
      meta: {
        requiresAuth: true,
      },

      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashBoardView,
        },
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView,
        },

        {
          path: 'orders',
          name: 'orders',
          component: OrdersView,
        },
      ],
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
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
