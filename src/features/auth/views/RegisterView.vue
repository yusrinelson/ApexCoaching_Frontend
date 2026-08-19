<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../auth.store'

import BaseButton from '../../../components/ui/BaseButton.vue'

const authStore = useAuthStore()
const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')

const errorMessage = ref('')
const successMessage = ref('')

const handleRegister = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  try {
    await authStore.register({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
    })

    successMessage.value = 'Account created successfully. Redirecting to login...'

    setTimeout(() => {
      router.push('/login')
    }, 1000)
  } catch (error) {
    console.log('REGISTER ERROR:', error)
    console.log('REGISTER RESPONSE:', error.response)
    console.log('REGISTER DATA:', error.response?.data)
    errorMessage.value =
      error.response?.data?.message || 'Unable to create your account. Please try again.'
  }
}
</script>

<template>
  <main
    class="min-h-screen bg-(--color-background) text-(--color-text-primary) lg:grid lg:grid-cols-2"
  >
    <!-- LEFT BRAND PANEL -->
    <section
      class="relative hidden min-h-screen overflow-hidden border-r border-(--color-border) bg-(--color-background-secondary) lg:flex lg:flex-col lg:justify-between"
    >
      <!-- Decorative APEX text -->
      <div
        class="pointer-events-none absolute -bottom-16 -right-16 font-display text-[12rem] uppercase leading-none text-white/2.5 xl:text-[16rem]"
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
          Build Your Game.
          <br />
          <span class="text-(--color-primary)"> Reach Your Apex. </span>
        </h1>

        <p class="mt-6 max-w-md text-sm leading-7 text-(--color-text-secondary)">
          Create your Apex account and keep your training plans, coaching sessions and progress all
          in one place.
        </p>
      </div>
    </section>

    <!-- RIGHT -->
    <section
      class="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10 lg:px-12 xl:px-20 overflow-y-auto h-screen scrollbar-none"
    >
      <div class="w-full max-w-md">
        <!-- Top navigation -->
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
            Join Apex
          </span>
        </div>

        <div class="mb-8">
          <p
            class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)"
          >
            Start your journey
          </p>

          <h2 class="mt-3 font-display text-4xl uppercase leading-none text-white sm:text-5xl">
            Create Your
            <br />
            Apex Account.
          </h2>

          <p class="mt-5 text-sm leading-6 text-(--color-text-secondary)">
            Join Apex and take your training to the next level.
          </p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                for="firstName"
                class="mb-2 block font-mono text-[10px] font-bold uppercase tracking-wide text-white"
              >
                First Name
              </label>

              <input
                id="firstName"
                v-model="firstName"
                type="text"
                autocomplete="given-name"
                required
                placeholder="First name"
                class="w-full border border-(--color-border) bg-(--color-surface) px-4 py-3 text-sm text-white outline-none placeholder:text-(--color-text-muted) transition focus:border-(--color-primary)"
              />
            </div>

            <div>
              <label
                for="lastName"
                class="mb-2 block font-mono text-[10px] font-bold uppercase tracking-wide text-white"
              >
                Last Name
              </label>

              <input
                id="lastName"
                v-model="lastName"
                type="text"
                autocomplete="family-name"
                required
                placeholder="Last name"
                class="w-full border border-(--color-border) bg-(--color-surface) px-4 py-3 text-sm text-white outline-none placeholder:text-(--color-text-muted) transition focus:border-(--color-primary)"
              />
            </div>
          </div>

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
              for="phone"
              class="mb-2 block font-mono text-[10px] font-bold uppercase tracking-wide text-white"
            >
              Phone Number
            </label>

            <input
              id="phone"
              v-model="phone"
              type="tel"
              autocomplete="tel"
              placeholder="Optional"
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
              autocomplete="new-password"
              required
              placeholder="••••••••"
              class="w-full border border-(--color-border) bg-(--color-surface) px-4 py-3 text-sm text-white outline-none placeholder:text-(--color-text-muted) transition focus:border-(--color-primary)"
            />
          </div>

          <div>
            <label
              for="confirmPassword"
              class="mb-2 block font-mono text-[10px] font-bold uppercase tracking-wide text-white"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              autocomplete="new-password"
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

          <!-- Success -->
          <p
            v-if="successMessage"
            class="border border-(--color-primary)/30 bg-(--color-primary)/10 px-4 py-3 font-mono text-xs text-(--color-primary)"
          >
            {{ successMessage }}
          </p>

          <BaseButton type="submit" :disabled="authStore.loading" class="mt-4 w-full">
            {{ authStore.loading ? 'Creating Account...' : 'Create Account' }}
          </BaseButton>

          <p class="pt-3 text-center text-xs text-(--color-text-secondary)">
            Already have an account?

            <RouterLink
              to="/login"
              class="ml-1 font-mono font-bold uppercase text-(--color-primary) hover:underline"
            >
              Sign In
            </RouterLink>
          </p>
        </form>
      </div>
    </section>
  </main>
</template>
