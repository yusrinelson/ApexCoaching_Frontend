<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: '',
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: '',
  },

  align: {
    type: String,
    default: 'left',
  },
})
</script>

<template>
  <div
    :class="{
      'text-left': align === 'left',
      'text-center mx-auto': align === 'center',
      'text-right ml-auto': align === 'right',
    }"
    class="max-w-2xl"
  >
    <p
      v-if="eyebrow"
      class="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]"
    >
      {{ eyebrow }}
    </p>

    <h2
      class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
    >
      {{ title }}
    </h2>

    <p
      v-if="description"
      class="mt-4 text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base"
    >
      {{ description }}
    </p>
  </div>
</template>