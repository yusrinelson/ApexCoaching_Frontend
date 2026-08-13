<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../auth.store'

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

    const redirect = route.query.redirect || '/dashboard'

    router.push(redirect)
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || 'Unable to login. Please check your details'
  }
}
</script>

<template>
  <div class="min-h-screen flex bg-gray-900 text-white">
    <!-- Left section -->
    <!-- <div
      class="w-1/2 flex flex-col justify-center items-center bg-gradient-to-r from-gray-800 to-gray-900 p-12"
    >
      <div class="text-left max-w-md">
        <div class="flex items-center mb-6">
          <div
            class="bg-green-500 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center"
          >
            A
          </div>
          <span class="ml-2 font-semibold text-lg">APEX.</span>
        </div>

        <span class="text-green-500 uppercase text-xs tracking-widest font-semibold"
          >Apex Coaching</span
        >

        <h1 class="text-4xl font-bold mt-4">
          Train Smarter.<br />
          <span class="text-green-500">Play Better.</span>
        </h1>

        <p class="text-gray-400 mt-4 text-sm">
          Your Apex account keeps your training plan, session bookings and coaching library in one
          place.
        </p>
      </div>
    </div> -->

    <div class="bg-linear-to-r from-gray-700 to-gray-900 flex flex-col justify-between w-1/2">
      <div class="flex items-center p-6">
        <div
          class="bg-green-500 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center"
        >
          A
        </div>
        <span class="ml-2 font-semibold text-lg">APEX.</span>
      </div>

      <div class="p-16">
        <span
          class="text-green-500 uppercase text-xs tracking-widest font-semibold border border-green-500 rounded-full px-3 py-1"
          >Apex Coaching</span
        >

        <h1 class="text-4xl font-bold mt-4">
          Train Smarter.<br />
          <span class="text-green-500">Play Better.</span>
        </h1>

        <p class="text-gray-400 mt-4 text-sm">
          Your Apex account keeps your training plan, session bookings and coaching library in one
          place.
        </p>
      </div>
    </div>
    <!-- Right section -->
    <div class="w-1/2 flex flex-col justify-center px-16">
      <div class="max-w-md mx-auto">
        <div class="flex items-center mb-6">
          <RouterLink to="/" class="text-gray-400 text-sm hover:text-green-500">← Back to site</RouterLink>
          <span class="ml-auto bg-green-700 text-xs px-3 py-1 rounded-full">USER ACCOUNT</span>
        </div>

        <h2 class="text-3xl font-bold mb-2">Welcome back to Apex</h2>
        <p class="text-gray-400 mb-6 text-sm">
          Sign in to view your upcoming sessions, training plans and coaching resources.
        </p>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-semibold mb-1">Email Address</label>
            <input
              id="email"
              v-model="email"
              type="email"
              autocomplete="email"
              required
              placeholder="you@example.com"
              class="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-semibold mb-1">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              autocomplete="current-password"
              required
              placeholder="••••••••"
              class="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-green-500"
            />
          </div>

          <p v-if="errorMessage" class="rounded-lg bg-red-200 px-4 py-2 text-sm text-red-600">
            {{ errorMessage }}
          </p>

          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center">
              <input type="checkbox" class="accent-green-500 mr-2" />
              Remember me
            </label>
            <a href="#" class="text-green-500 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full bg-green-500 text-black font-semibold py-2 rounded-full mt-4 hover:bg-green-400 transition"
          >
            {{ authStore.loading ? 'Signing in...' : 'Sign in' }}
          </button>

          <p class="text-center text-sm text-gray-400 mt-4">
            Don’t have an account?
            <RouterLink to="/register" class="text-green-500 font-semibold hover:underline"
              >Create one</RouterLink
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
