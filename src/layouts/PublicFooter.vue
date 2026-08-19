<script setup>
import PublicNavbar from '../components/layout/PublicNavbar.vue'
</script>

<template>
  <div class="min-h-screen bg-(--color-background) text-(--color-text-primary)">
    <PublicNavbar />

    <main>
      <RouterView />
    </main>
  </div>
</template>