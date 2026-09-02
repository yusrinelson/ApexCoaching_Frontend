import { useAuthStore } from '../features/auth/auth.store'
import { createRouter, createWebHistory } from 'vue-router'

import PublicLayout from '../layouts/PublicLayout.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

import HomeView from '../views/HomeView.vue'
import LoginView from '../features/auth/views/LoginView.vue'
import RegisterView from '../features/auth/views/RegisterView.vue'
import DashBoardView from '../views/DashboardView.vue'
import ProgramsView from '../views/ProgramsView.vue'
import ShopView from '../views/ShopView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import CartView from '../features/cart/views/CartView.vue'
import ProfileView from '../features/account/views/ProfileView.vue'
import OrdersView from '../features/account/views/OrdersView.vue'
import PaymentSuccessView from '../features/payments/views/PaymentSuccessView.vue'
import PaymentFailedView from '../features/payments/views/PaymentFailedView.vue'
import AdminOrdersView from '../features/orders/views/AdminOrdersView.vue'
import AdminDashboardView from '../features/orders/views/AdminDashboardView.vue'
import AdminProductsView from '../features/products/views/AdminProductView.vue'
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
        {
          path: 'contact',
          name: 'contact',
          component: ContactView,
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
      path: '/admin',
      component: AdminLayout,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
      children: [
        {
          path: '',
          name: 'admin',
          component: AdminDashboardView,
        },
        {
          path: 'products',
          name: 'admin-products',
          component: AdminProductsView
        },
        {
          path: 'orders',
          name: 'admin-orders',
          component: AdminOrdersView,
        }
      ],
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/payment/success',
      name: 'payment-success',
      component: PaymentSuccessView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/payment/failed',
      name: 'payment-failed',
      component: PaymentFailedView,
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

  if (to.meta.requiresAdmin && authStore.user?.role !== 'admin')
    return {
      name: 'dashboard',
    }

  if (to.meta.guestOnly && authStore.user)
    return {
      name: 'dashboard',
    }

  return true
})

export default router
