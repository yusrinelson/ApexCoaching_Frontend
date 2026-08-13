<script setup>
defineProps({
  padding: {
    type: String,
    default: 'md',
  },

  hover: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    class="
      rounded-xl
      border
      border-[var(--color-border)]
      bg-[var(--color-surface)]
    "
    :class="[
      {
        'p-4': padding === 'sm',
        'p-6': padding === 'md',
        'p-8': padding === 'lg',

        'transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-border-light)]':
          hover,
      },
    ]"
  >
    <slot />
  </div>
</template>