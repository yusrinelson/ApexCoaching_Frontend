<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import { useAuthStore } from '../../features/auth/auth.store'

import AppContainer from '../common/AppContainer.vue'
import BaseButton from '../ui/BaseButton.vue'
import CartButton from '../common/CartButton.vue'
import UserMenu from '../common/user-menu.vue'

const authStore = useAuthStore()

const mobileMenuOpen = ref(false)
const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
    <AppContainer>
      <nav class="flex h-20 items-center justify-between">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2" @click="closeMobileMenu">
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
        <div class="hidden items-center gap-8 md:flex tracking-wider">
          <RouterLink to="/" class="font-mono text-sm text-white/70 transition hover:text-white">
            Home
          </RouterLink>

          <RouterLink
            to="/programs"
            class="font-mono text-sm text-white/70 transition hover:text-white"
          >
            Programs
          </RouterLink>

          <RouterLink
            to="/about"
            class="font-mono text-sm text-white/70 transition hover:text-white"
          >
            About
          </RouterLink>

          <RouterLink
            to="/shop"
            class="font-mono text-sm text-white/70 transition hover:text-white"
          >
            Shop
          </RouterLink>
        </div>

        <!-- Desktop actions -->
        <div class="hidden items-center gap-3 md:flex">
          <CartButton />

          <RouterLink
            v-if="!authStore.isAuthenticated"
            to="/login"
            class="font-mono px-4 py-2 text-sm text-white/80 transition hover:text-white"
          >
            Sign In
          </RouterLink>

          <UserMenu v-else class="ml-2" />

          <BaseButton> Book Training </BaseButton>
        </div>

        <!-- Mobile button -->
        <!-- <button
          type="button"
          class="text-white md:hidden"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <span class="text-2xl">
            {{ mobileMenuOpen ? '×' : '☰' }}
          </span>
        </button> -->
        <!-- Mobile actions -->
        <div class="flex items-center gap-2 lg:hidden">
          <CartButton />

          <UserMenu v-if="authStore.isAuthenticated" />

          <button
            type="button"
            aria-label="Toggle menu"
            class="flex h-10 w-10 items-center justify-center text-white"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <span class="font-mono text-xl">
              {{ mobileMenuOpen ? '×' : '☰' }}
            </span>
          </button>
        </div>
      </nav>

      <!-- Mobile navigation -->
      <div v-if="mobileMenuOpen" class="border-t border-white/10 py-5 md:hidden">
        <div class="flex flex-col gap-4">
          <RouterLink to="/" @click="mobileMenuOpen = false"> Home </RouterLink>

          <RouterLink to="/programs" @click="mobileMenuOpen = false"> Programs </RouterLink>

          <RouterLink to="/about" @click="mobileMenuOpen = false"> About </RouterLink>

          <RouterLink to="/shop" @click="mobileMenuOpen = false"> Shop </RouterLink>

          <RouterLink
            v-if="!authStore.isAuthenticated"
            to="/login"
            class="mt-5 block rounded-full bg-(--color-primary) px-5 py-3 text-center font-mono text-xs font-bold uppercase text-black"
            @click="closeMobileMenu"
          >
            Sign In
          </RouterLink>

          <BaseButton> Book Training </BaseButton>
        </div>
      </div>
    </AppContainer>
  </header>
</template>
