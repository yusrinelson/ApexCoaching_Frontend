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
      class="text-label text-(--color-primary)"
    >
      {{ eyebrow }}
    </p>

    <h2
      class="heading-section my-2 text-2xl uppercase text-white sm:text-3xl lg:text-4xl italic"
    >
      {{ title }}
    </h2>

    <p
      v-if="description"
      class="max-w-md text-xs leading-6 text-(--color-text-secondary) sm:text-sm"
    >
      {{ description }}
    </p>
  </div>
</template>