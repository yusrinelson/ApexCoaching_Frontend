<script setup>
import { Toaster } from 'vue-sonner'
</script>

<template>
<Toaster
  position="top-right"
  :duration="3500"
  :max="3"
  :limit="3"
  theme="light"
  rich-colors
  />

  <RouterView/>
</template>

<style scoped></style>
