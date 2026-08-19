<script setup>
defineProps({
  variant: {
    type: String,
    default: 'default',
  },
})
</script>

<template>
  <article
    :class="[
      'overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]',
      'transition duration-300',
      variant === 'interactive'
        ? 'hover:-translate-y-1 hover:border-[var(--color-primary)]'
        : '',
    ]"
  >
    <slot />
  </article>
</template>