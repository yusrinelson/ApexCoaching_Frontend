<template>
  <main class="min-h-screen bg-[var(--color-background)] pt-20">
    <AppContainer>
      <div class="py-24">
        <p class="text-label text-[var(--color-primary)]">
          Your items
        </p>

        <h1 class="heading-display mt-4 text-5xl uppercase text-white">
          Cart
        </h1>
      </div>
    </AppContainer>
  </main>
</template>

<script setup>
import AppContainer from '../components/common/AppContainer.vue'
</script>