<script setup>
import PublicNavbar from '../components/layout/PublicNavbar.vue'
import PublicFooter from '../components/layout/PublicFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-[var(--color-background)]">
    <PublicNavbar />

    <main>
      <RouterView />
    </main>

    <PublicFooter/>
  </div>
</template>