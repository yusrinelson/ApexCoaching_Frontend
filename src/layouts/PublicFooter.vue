<script setup>
import PublicNavbar from '../components/layout/PublicNavbar.vue'
</script>

<template>
  <div class="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
    <PublicNavbar />

    <main>
      <RouterView />
    </main>
  </div>
</template>