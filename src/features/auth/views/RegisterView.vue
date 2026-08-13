<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../auth.store'

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

  try{
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
    errorMessage.value = error.response?.data?.message || 'Unable to create your account. Please try again.'
  }
}


</script>

<template>
  <main class="min-h-screen bg-gray-900 text-white flex overflow-hidden">

    <!-- Left section -->
    <section
      class="hidden lg:flex w-1/2 bg-gradient-to-r from-gray-700 to-gray-900 flex-col justify-between h-screen"
    >
      <div class="flex items-center p-6">
        <div
          class="bg-green-500 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center"
        >
          A
        </div>

        <span class="ml-2 font-semibold text-lg">
          APEX.
        </span>
      </div>

      <div class="p-16">
        <span
          class="text-green-500 uppercase text-xs tracking-widest font-semibold border border-green-500 rounded-full px-3 py-1"
        >
          Apex Coaching
        </span>

        <h1 class="text-4xl font-bold mt-4">
          Build Your Game.
          <br />
          <span class="text-green-500">
            Reach Your Apex.
          </span>
        </h1>

        <p class="text-gray-400 mt-4 text-sm max-w-md">
          Create your APEX account and keep your training plans,
          coaching sessions and progress all in one place.
        </p>
      </div>

      <!-- <div class="p-16 pt-0 text-xs text-gray-500">
        APEX Coaching
      </div> -->
    </section>

    <!-- Right section -->
    <section
      class="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 overflow-y-auto h-screen"
    >
      <div class="w-full max-w-md">

        <div class="flex items-center mb-8">
          <RouterLink
            to="/"
            class="text-gray-400 text-sm hover:text-green-500 transition"
          >
            ← Back to site
          </RouterLink>

          <span
            class="ml-auto bg-green-700 text-xs px-3 py-1 rounded-full"
          >
            JOIN APEX
          </span>
        </div>

        <h2 class="text-3xl font-bold mb-2">
          Create your APEX account
        </h2>

        <p class="text-gray-400 mb-8 text-sm">
          Join APEX and take your training to the next level.
        </p>

        <form
          @submit.prevent="handleRegister"
          class="space-y-4"
        >

          <!-- First + Last Name -->
          <div class="grid grid-cols-2 gap-4">

            <div>
              <label
                for="firstName"
                class="block text-sm font-semibold mb-1"
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
                class="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label
                for="lastName"
                class="block text-sm font-semibold mb-1"
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
                class="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-green-500"
              />
            </div>

          </div>

          <!-- Email -->
          <div>
            <label
              for="email"
              class="block text-sm font-semibold mb-1"
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
              class="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-green-500"
            />
          </div>

          <!-- Phone -->
          <div>
            <label
              for="phone"
              class="block text-sm font-semibold mb-1"
            >
              Phone Number
            </label>

            <input
              id="phone"
              v-model="phone"
              type="tel"
              autocomplete="tel"
              placeholder="Optional"
              class="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-green-500"
            />
          </div>

          <!-- Password -->
          <div>
            <label
              for="password"
              class="block text-sm font-semibold mb-1"
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
              class="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-green-500"
            />
          </div>

          <!-- Confirm password -->
          <div>
            <label
              for="confirmPassword"
              class="block text-sm font-semibold mb-1"
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
              class="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-green-500"
            />
          </div>

          <!-- Error -->
          <p
            v-if="errorMessage"
            class="rounded-lg bg-red-200 px-4 py-2 text-sm text-red-700"
          >
            {{ errorMessage }}
          </p>

          <!-- Success -->
          <p
            v-if="successMessage"
            class="rounded-lg bg-green-200 px-4 py-2 text-sm text-green-800"
          >
            {{ successMessage }}
          </p>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full bg-green-500 text-black font-semibold py-2 rounded-full mt-4 hover:bg-green-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{
              authStore.loading
                ? 'Creating account...'
                : 'Create Account'
            }}
          </button>

          <p class="text-center text-sm text-gray-400 mt-4">
            Already have an account?

            <RouterLink
              to="/login"
              class="text-green-500 font-semibold hover:underline"
            >
              Sign in
            </RouterLink>
          </p>

        </form>
      </div>
    </section>

  </main>
</template>