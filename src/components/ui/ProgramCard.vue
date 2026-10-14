<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    default: '',
  },
  level: {
    type: [String, Number],
    default: '',
  },
  price: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  slug: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <article
    class="group overflow-hidden border border-(--color-border) bg-(--color-surface) transition duration-300 hover:border-(--color-primary)"
  >
    <!-- Image -->
    <div v-if="image" class="aspect-16/10 overflow-hidden bg-(--color-background-secondary)">
      <img
        :src="image"
        :alt="title"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Metadata -->
      <div
        class="mb-5 flex flex-wrap items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em]"
      >
        <span v-if="level" class="text-(--color-primary)">
          {{ level }}
        </span>

        <span v-if="duration" class="text-(--color-text-muted)">
          {{ duration }}
        </span>
      </div>

      <!-- Title -->
      <h3 class="font-display text-2xl uppercase leading-none text-white">
        {{ title }}
      </h3>

      <!-- Description -->
      <p class="mt-4 text-sm leading-6 text-(--color-text-secondary)">
        {{ description }}
      </p>

      <!-- Bottom -->
      <div class="mt-6 flex items-center justify-between border-t border-(--color-border) pt-5">
        <span v-if="price" class="font-mono text-sm font-bold text-white">
          R{{ price }}
        </span>

        <RouterLink
        :to="{ name: 'program-detail', params: {slug} }"
          class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-(--color-primary) transition hover:text-white"
        >
          View Program →
        </RouterLink>
      </div>
    </div>
  </article>
</template>
<style lang="scss" scoped></style>
