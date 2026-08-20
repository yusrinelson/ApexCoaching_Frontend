<script setup>
import BaseButton from './BaseButton.vue'

defineProps({
  product: {
    type: Object,
    required: true,
  }
})

const emit = defineEmits(['add-to-cart'])

const handleAddToCart = () => emit('add-to-cart')
</script>

<template>
  <article
    class="group overflow-hidden border border-(--color-border) bg-(--color-surface) transition duration-300 hover:border-(--color-primary)"
  >
    <!-- Product image -->
    <RouterLink
      :to="`/shop/${product.slug}`"
      class="relative block aspect-[4/3] overflow-hidden bg-(--color-background-secondary)"
    >
      <img
        v-if="product.coverImage?.url"
        :src="product.coverImage.url"
        :alt="product.title"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div v-else class="flex h-full items-center justify-center">
        <span class="font-display text-6xl uppercase text-white/[0.04]"> APEX </span>
      </div>

      <!-- Badge -->
      <span
        class="absolute left-4 top-4 border border-(--color-primary) bg-(--color-background) px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-(--color-primary)"
      >
        Digital
      </span>
    </RouterLink>

    <!-- Product content -->
    <div class="p-5">
      <div class="flex items-start justify-between gap-4">
        <h3 class="font-display text-xl uppercase leading-none text-white">
          {{ product.title }}
        </h3>

        <span class="shrink-0 font-mono text-sm font-bold text-white">
           R{{ Number(product.price).toFixed(2) }}
        </span>
      </div>

      <p v-if="product.shortDescription" class="mt-3 text-sm leading-6 text-(--color-text-secondary)">
        {{ product.shortDescription }}
      </p>

      <!-- <BaseButton class="mt-6 w-full" :disabled="!available" @click="handleAddToCart">
        {{ loading ? 'Adding...' : available ? 'Add to Cart' : 'Unavailable' }}
      </BaseButton> -->
      <BaseButton
        class="mt-6 w-full"
        @click="handleAddToCart"
      >
        Add to Cart
      </BaseButton>
    </div>
  </article>
</template>
