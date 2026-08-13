<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
})
</script>

<template>
  <span
    class="
      inline-flex
      items-center
      rounded-full
      px-3
      py-1
      text-[10px]
      font-semibold
      uppercase
      tracking-[0.15em]
    "
    :class="{
      'bg-green-500/10 text-green-400 border border-green-500/20':
        variant === 'primary',

      'bg-white/10 text-white border border-white/10':
        variant === 'neutral',

      'bg-red-500/10 text-red-400 border border-red-500/20':
        variant === 'danger',

      'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20':
        variant === 'warning',
    }"
  >
    <slot />
  </span>
</template>