<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../auth.store'

import BaseButton from '../../../components/ui/BaseButton.vue'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''

  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    })

    const redirect = route.query.redirect || '/'

    router.push(redirect)
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || 'Unable to login. Please check your details'
  }
}
</script>

<template>
  <main
    class="min-h-screen bg-(--color-background) text-(--color-text-primary) lg:grid lg:grid-cols-2"
  >
    <!-- LEFT -->
    <section
      class="relative hidden min-h-screen overflow-hidden border-r border-(--color-border) bg-(--color-background-secondary) lg:flex lg:flex-col lg:justify-between"
    >
      <!-- Decorative APEX text -->
      <div
        class="pointer-events-none absolute -bottom-16 -right-16 font-display text-[12rem] uppercase leading-none text-white/[0.025] xl:text-[16rem]"
      >
        APEX
      </div>

      <!-- Logo -->
      <RouterLink to="/" class="relative z-10 flex items-center p-8 gap-2">
        <span
          class="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-primary) font-bold text-black"
        >
          A
        </span>

        <span class="text-xl font-display font-bold tracking-tight">
          APEX <span class="text-(--color-primary) -ml-1">.</span>
        </span>
      </RouterLink>

      <!-- Brand content -->
      <div class="relative z-10 px-10 pb-20 xl:px-16">
        <span
          class="inline-flex border border-(--color-primary) px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)"
        >
          Apex Coaching
        </span>

        <h1
          class="mt-6 max-w-xl font-display text-5xl uppercase leading-[0.95] text-white xl:text-7xl"
        >
          Train Smarter.
          <br />
          <span class="text-(--color-primary)"> Play Better. </span>
        </h1>

        <p class="mt-6 max-w-md text-sm leading-7 text-(--color-text-secondary)">
          Your Apex account keeps your training plan, session bookings and coaching library in one
          place.
        </p>
      </div>
    </section>

    <!-- RIGHT  -->
    <section
      class="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10 lg:px-12 xl:px-20"
    >
      <div class="w-full max-w-md">
        <div class="mb-10 flex items-center justify-between">
          <RouterLink
            to="/"
            class="font-mono text-xs font-semibold uppercase tracking-wide text-(--color-text-secondary) transition hover:text-(--color-primary)"
          >
            ← Back to site
          </RouterLink>

          <span
            class="border border-(--color-border) bg-(--color-surface) px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-(--color-text-secondary)"
          >
            Member Account
          </span>
        </div>

        <div class="mb-8">
          <p
            class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)"
          >
            Welcome back
          </p>

          <h2 class="mt-3 font-display text-4xl uppercase leading-none text-white sm:text-5xl">
            Welcome Back
            <br />
            To Apex.
          </h2>

          <p class="mt-5 text-sm leading-6 text-(--color-text-secondary)">
            Sign in to view your upcoming sessions, training plans and coaching resources.
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label
              for="email"
              class="mb-2 block font-mono text-[10px] font-bold uppercase tracking-wide text-white"
            >
              Email Address
            </label>

            <input
              id="email"
              v-model="email"
              type="email"
              autocomplete="email"
              required
              placeholder="you@example.com"
              class="w-full border border-(--color-border) bg-(--color-surface) px-4 py-3 text-sm text-white outline-none placeholder:text-(--color-text-muted) transition focus:border-(--color-primary)"
            />
          </div>

          <div>
            <label
              for="password"
              class="mb-2 block font-mono text-[10px] font-bold uppercase tracking-wide text-white"
            >
              Password
            </label>

            <input
              id="password"
              v-model="password"
              type="password"
              autocomplete="current-password"
              required
              placeholder="••••••••"
              class="w-full border border-(--color-border) bg-(--color-surface) px-4 py-3 text-sm text-white outline-none placeholder:text-(--color-text-muted) transition focus:border-(--color-primary)"
            />
          </div>

          <!-- Error -->
          <p
            v-if="errorMessage"
            class="border border-(--color-danger)/30 bg-(--color-danger)/10 px-4 py-3 font-mono text-xs text-(--color-danger)"
          >
            {{ errorMessage }}
          </p>

          <div class="flex items-center justify-between gap-4">
            <label
              class="flex items-center gap-2 font-mono text-[10px] uppercase text-(--color-text-secondary)"
            >
              <input type="checkbox" class="accent-(--color-primary)" />

              Remember me
            </label>

            <a
              href="#"
              class="font-mono text-[10px] font-bold uppercase text-(--color-primary) hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <BaseButton type="submit" :disabled="authStore.loading" class="w-full">
            {{ authStore.loading ? 'Signing in...' : 'Sign In' }}
          </BaseButton>

          <p class="pt-3 text-center text-xs text-(--color-text-secondary)">
            Don't have an account?

            <RouterLink
              to="/register"
              class="ml-1 font-mono font-bold uppercase text-(--color-primary) hover:underline"
            >
              Create One
            </RouterLink>
          </p>
        </form>
      </div>
    </section>
  </main>
</template>
