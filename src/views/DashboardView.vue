<script setup>
//function for temporary logout
import { useAuthStore } from '../features/auth/auth.store'

import PublicLayout from '../layouts/PublicLayout.vue'

const authStore = useAuthStore()

const handlelogout = () => {
  authStore.logout()
}

</script>

<template>
  <PublicLayout/>
  <main class="min-h-screen flex flex-col items-center justify-center">
    <div>
    <h1 class="text-4xl font-bold">
      Dashboard
    </h1>

    </div>
    <div>

      <!-- temporary logout button -->
      <button @click="handlelogout" class="m-8">Logout</button>
    </div>
  </main>
</template>