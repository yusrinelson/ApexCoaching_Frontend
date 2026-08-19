<script setup>
import { ref, computed } from 'vue'
// import { useRouter } from 'vue-router'
import { useAuthStore } from '../../features/auth/auth.store'

import AppContainer from '../common/AppContainer.vue'
import BaseButton from '../ui/BaseButton.vue'
import CartButton from '../common/CartButton.vue'
import UserMenu from '../common/user-menu.vue'

// const router = useRouter()
const authStore = useAuthStore()

// const isUserMenuOpen = ref(false)
const isMobileMenuOpen = ref(false)
const userMenuCloseSignal = ref(0)

const isAuthenticated = computed(() => {
  return authStore.isAuthenticated
})

const navigation = [
  {
    name: 'Programmes',
    to: '/programs',
  },
  {
    name: 'About',
    to: '/about',
  },
  {
    name: 'Shop',
    to: '/shop',
  },
  {
    name: 'Contact',
    to: '/contact',
  },
]

const closeMenus = () => {
    isMobileMenuOpen.value = false
  userMenuCloseSignal.value++
}

// const toggleUserMenu = () => {
//   isUserMenuOpen.value = !isUserMenuOpen.value
//   // If user menu opens, close mobile menu
//   if (isUserMenuOpen.value) {
//     isMobileMenuOpen.value = false
//   }
// }

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  // If mobile menu opens, close user menu
  if (isMobileMenuOpen.value) {
    userMenuCloseSignal.value++
  }
}

const handleUserMenuToggle = (isOpen) => {
  if (isOpen) {
    isMobileMenuOpen.value = false
  }
}

// const goTo = (path) => {
//   closeMenus()
//   router.push(path)
// }

const handleLogout = async () => {
  closeMenus()

  try {
    await authStore.logout()
    router.push('/')
  } catch (error) {
    console.error('LOGOUT failed:', error)
  }
}
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
    <AppContainer>
      <nav class="flex h-20 items-center justify-between">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2" @click="closeMenus">
          <span
            class="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-primary) font-bold text-black"
          >
            A
          </span>

          <span class="text-xl font-display font-bold tracking-tight">
            APEX <span class="text-(--color-primary) -ml-1">.</span>
          </span>
        </RouterLink>

        <!-- Desktop navigation -->
        <div class="hidden items-center gap-8 lg:flex tracking-wider">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            @click="closeMenus"
            class="font-mono text-sm text-white/70 transition hover:text-white"
          >
            {{ item.name }}
          </RouterLink>
        </div>

        <!-- Desktop actions -->
        <div class="hidden items-center gap-3 lg:flex">
          <CartButton />

          <RouterLink
            v-if="!authStore.isAuthenticated"
            to="/login"
            class="font-mono px-4 py-2 text-sm text-white/80 transition hover:text-white"
          >
            Sign In
          </RouterLink>

          <!-- <UserMenu v-else class="ml-2" /> -->

          <!-- Logged In User -->
          <div v-else class="relative">
            <!-- <button
              type="button"
              @click="toggleUserMenu"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) font-mono text-xs font-bold uppercase text-(--color-primary) transition hover:border-(--color-primary)"
            >
              <span aria-hidden="true">{{ authStore.user?.firstName?.charAt(0) || 'U' }}</span>
            </button> -->
            <UserMenu :close-signal="userMenuCloseSignal"/>
            <!-- User Dropdown -->
            
              <div
                v-if="isUserMenuOpen"
                class="absolute right-0 top-14 w-64 border border-(--color-border) bg-(--color-surface) shadow-2xl"
              >
                <!-- User info -->
                <div class="border-b border-(--color-border) px-5 py-4">
                  <p class="font-mono text-xs font-bold uppercase text-white">
                    {{ authStore.user?.firstName }}
                    {{ authStore.user?.lastName }}
                  </p>

                  <p class="mt-1 truncate text-xs text-(--color-text-secondary)">
                    {{ authStore.user?.email }}
                  </p>
                </div>

                <!-- Menu -->
                <div class="p-2">
                  <button
                    type="button"
                    @click="goTo('/dashboard')"
                    class="w-full px-3 py-3 text-left font-mono text-xs font-bold uppercase tracking-wide text-(--color-text-secondary) transition hover:bg-(--color-background-secondary) hover:text-(--color-primary)"
                  >
                    Dashboard
                  </button>

                  <button
                    type="button"
                    @click="goTo('/profile')"
                    class="w-full px-3 py-3 text-left font-mono text-xs font-bold uppercase tracking-wide text-(--color-text-secondary) transition hover:bg-(--color-background-secondary) hover:text-(--color-primary)"
                  >
                    Profile
                  </button>

                  <button
                    type="button"
                    @click="goTo('/orders')"
                    class="w-full px-3 py-3 text-left font-mono text-xs font-bold uppercase tracking-wide text-(--color-text-secondary) transition hover:bg-(--color-background-secondary) hover:text-(--color-primary)"
                  >
                    Orders
                  </button>

                  <div class="my-2 border-t border-(--color-border)" />

                  <button
                    type="button"
                    @click="handleLogout"
                    class="w-full px-3 py-3 text-left font-mono text-xs font-bold uppercase tracking-wide text-(--color-error) transition hover:bg-(--color-background-secondary)"
                  >
                    Logout
                  </button>
                </div>
              </div>
           
          </div>

          <BaseButton> Book Training </BaseButton>
        </div>

        <!-- mobile actions -->
        <div class="flex items-center gap-2 lg:hidden">
          <!-- Mobile Cart -->
          <!-- <RouterLink
          to="/cart"
          @click="closeMenus"
          class="flex h-10 w-10 items-center justify-center border border-(--color-border) text-(--color-text-secondary)"
          aria-label="Shopping cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.7"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L6.75 14.25a2.25 2.25 0 002.18 1.75h6.14a2.25 2.25 0 002.18-1.75l1.43-5.58H5.106m0 0L4.5 6.75m4.5 13.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm8.25 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </RouterLink> -->
          <CartButton />

          <!-- Mobile User -->
          <!-- <button
          v-if="authStore.isAuthenticated"
          type="button"
          @click="toggleUserMenu"
          class="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) font-mono text-xs font-bold text-(--color-primary)"
        >
          {{ authStore.user?.firstName?.charAt(0) || 'U' }}
        </button> -->
         <UserMenu
  v-if="authStore.isAuthenticated"
  :close-signal="userMenuCloseSignal"
  @toggle="handleUserMenuToggle"
/>

          <!-- Mobile Menu Button -->
          <button
            type="button"
            @click="toggleMobileMenu"
            class="flex h-10 w-10 items-center justify-center border border-(--color-border) text-white"
            aria-label="Toggle navigation"
          >
            <svg
              v-if="!isMobileMenuOpen"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.7"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.7"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </nav>

      <!-- mobile navigation -->
      
        <div
          v-if="isMobileMenuOpen"
          class="border-t border-(--color-border) bg-(--color-background) lg:hidden"
        >
          <div class="space-y-1 px-6 py-5">
            <RouterLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.to"
              @click="closeMenus"
              class="block border-b border-(--color-border) py-4 font-mono text-xs font-bold uppercase tracking-wider text-(--color-text-secondary) transition hover:text-(--color-primary)"
              active-class="text-(--color-primary)"
            >
              {{ item.name }}
            </RouterLink>

            <RouterLink
              v-if="!isAuthenticated"
              to="/login"
              @click="closeMenus"
              class="mt-4 block rounded-full bg-(--color-primary) py-3 text-center font-mono text-xs font-bold uppercase tracking-wide text-black"
            >
              Sign In
            </RouterLink>

            <BaseButton class="w-full mt-4"> Book Training </BaseButton>
            <!-- <template v-else>
            <button
              type="button"
              @click="goTo('/dashboard')"
              class="block w-full border-b border-(--color-border) py-4 text-left font-mono text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)"
            >
              Dashboard
            </button>

            <button
              type="button"
              @click="goTo('/profile')"
              class="block w-full border-b border-(--color-border) py-4 text-left font-mono text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)"
            >
              Profile
            </button>

            <button
              type="button"
              @click="goTo('/orders')"
              class="block w-full border-b border-(--color-border) py-4 text-left font-mono text-xs font-bold uppercase tracking-wider text-(--color-text-secondary)"
            >
              Orders
            </button>

            <button
              type="button"
              @click="handleLogout"
              class="mt-4 block w-full py-3 text-left font-mono text-xs font-bold uppercase tracking-wider text-(--color-error)"
            >
              Logout
            </button>
          </template> -->
          </div>
        </div>
      

      <!-- Desktop dropdown overlay -->
      <!-- <div
      v-if="isUserMenuOpen"
      class="fixed inset-0 -z-10 hidden lg:block"
      @click="isUserMenuOpen = false"
    /> -->
    </AppContainer>
  </header>
</template>
