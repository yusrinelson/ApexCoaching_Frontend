<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value),
  },

  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },

  type: {
    type: String,
    default: 'button',
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  loading: {
    type: Boolean,
    default: false,
  },
})

const variantClasses = computed(() => {
  return {
    primary: 'bg-[var(--color-primary)] text-black hover:bg-[var(--color-primary-hover)]',

    secondary: 'bg-white text-black hover:bg-neutral-200',

    outline:
      'border border-[var(--color-border-light)] text-white hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]',

    ghost:
      'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-white',

    danger: 'bg-red-500 text-white hover:bg-red-600',
  }[props.variant]
})

const sizeClasses = computed(() => {
  return {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-sm',
  }[props.size]
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="font-mono inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50"
    :class="[variantClasses, sizeClasses]"
  >
    <span
      v-if="loading"
      class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    />

    <slot v-if="!loading" />

    <span v-else> Loading... </span>
  </button>
</template>
