<script setup>
import AppNavbar from '../components/layout/AppNavbar.vue'
import AppFooter from '../components/layout/AppFooter.vue'
import PublicNavbar from '../components/layout/PublicNavbar.vue'
</script>

<template>
  <div class="min-h-screen bg-(--color-background) text-(--color-text-primary)">
    <!-- <PublicNavbar /> -->
    <AppNavbar />

    <main>
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>