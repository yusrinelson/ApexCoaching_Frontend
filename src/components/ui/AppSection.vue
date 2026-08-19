<script setup>
defineProps({
  spacing: {
    type: String,
    default: 'default',
  },
})
</script>

<template>
  <section
    :class="{
      'py-16 sm:py-20 lg:py-24': spacing === 'default',
      'py-10 sm:py-14 lg:py-16': spacing === 'compact',
      'py-20 sm:py-28 lg:py-36': spacing === 'large',
    }"
  >
    <slot />
  </section>
</template>