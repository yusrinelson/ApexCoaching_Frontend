<script setup>
import BaseButton from './BaseButton.vue'

defineProps({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: '',
  },

  price: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    default: '',
  },

  badge: {
    type: String,
    default: '',
  },

  available: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <article
    class="group overflow-hidden border border-(--color-border) bg-(--color-surface) transition duration-300 hover:border-(--color-primary)"
  >
    <!-- Product image -->
    <RouterLink
      to="#"
      class="relative block aspect-square overflow-hidden bg-(--color-background-secondary)"
    >
      <img
        v-if="image"
        :src="image"
        :alt="name"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div v-else class="flex h-full items-center justify-center">
        <span class="font-display text-6xl uppercase text-white/[0.04]"> APEX </span>
      </div>

      <!-- Badge -->
      <span
        v-if="badge"
        class="absolute left-4 top-4 border border-(--color-primary) bg-(--color-background) px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-(--color-primary)"
      >
        {{ badge }}
      </span>
    </RouterLink>

    <!-- Product content -->
    <div class="p-5">
      <div class="flex items-start justify-between gap-4">
        <h3 class="font-display text-xl uppercase leading-none text-white">
          {{ name }}
        </h3>

        <span class="shrink-0 font-mono text-sm font-bold text-white">
          {{ price }}
        </span>
      </div>

      <p v-if="description" class="mt-3 text-sm leading-6 text-(--color-text-secondary)">
        {{ description }}
      </p>

      <BaseButton class="mt-6 w-full" :disabled="!available">
        {{ available ? 'Add to Cart' : 'Out of Stock' }}
      </BaseButton>
    </div>
  </article>
</template>
