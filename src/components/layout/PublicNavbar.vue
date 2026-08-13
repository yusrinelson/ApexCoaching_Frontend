<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import AppContainer from '../common/AppContainer.vue'
import BaseButton from '../ui/BaseButton.vue'

const mobileMenuOpen = ref(false)
</script>

<template>
  <header
    class="
      fixed
      inset-x-0
      top-0
      z-50
      border-b
      border-white/10
      bg-black/80
      backdrop-blur-xl
    "
  >
    <AppContainer>
      <nav class="flex h-20 items-center justify-between">

        <!-- Logo -->
        <RouterLink
          to="/"
          class="flex items-center gap-2"
        >
          <span
            class="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-[var(--color-primary)]
              font-bold
              text-black
            "
          >
            A
          </span>

          <span class="text-xl font-bold tracking-tight">
            APEX.
          </span>
        </RouterLink>


        <!-- Desktop navigation -->
        <div class="hidden items-center gap-8 md:flex">

          <RouterLink
            to="/"
            class="text-sm text-white/70 transition hover:text-white"
          >
            Home
          </RouterLink>

          <RouterLink
            to="/programs"
            class="text-sm text-white/70 transition hover:text-white"
          >
            Programs
          </RouterLink>

          <RouterLink
            to="/about"
            class="text-sm text-white/70 transition hover:text-white"
          >
            About
          </RouterLink>

          <RouterLink
            to="/shop"
            class="text-sm text-white/70 transition hover:text-white"
          >
            Shop
          </RouterLink>

        </div>


        <!-- Desktop actions -->
        <div class="hidden items-center gap-3 md:flex">

          <RouterLink
            to="/login"
            class="px-4 py-2 text-sm font-semibold text-white/80 transition hover:text-white"
          >
            Sign In
          </RouterLink>

          <BaseButton>
            Book Training
          </BaseButton>

        </div>


        <!-- Mobile button -->
        <button
          class="text-white md:hidden"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <span class="text-2xl">
            {{ mobileMenuOpen ? '×' : '☰' }}
          </span>
        </button>

      </nav>


      <!-- Mobile navigation -->
      <div
        v-if="mobileMenuOpen"
        class="border-t border-white/10 py-5 md:hidden"
      >
        <div class="flex flex-col gap-4">

          <RouterLink to="/" @click="mobileMenuOpen = false">
            Home
          </RouterLink>

          <RouterLink to="/programs" @click="mobileMenuOpen = false">
            Programs
          </RouterLink>

          <RouterLink to="/about" @click="mobileMenuOpen = false">
            About
          </RouterLink>

          <RouterLink to="/shop" @click="mobileMenuOpen = false">
            Shop
          </RouterLink>

          <RouterLink to="/login" @click="mobileMenuOpen = false">
            Sign In
          </RouterLink>

          <BaseButton>
            Book Training
          </BaseButton>

        </div>
      </div>

    </AppContainer>
  </header>
</template>