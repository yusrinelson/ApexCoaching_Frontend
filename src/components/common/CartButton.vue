<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '../../features/cart/store/cart.store'

const cartStore = useCartStore()
</script>

<template>
  <RouterLink
    to="/cart"
    aria-label="Shopping cart"
    class="relative flex h-10 w-10 items-center justify-center text-white transition hover:text-(--color-primary) border border-(--color-border)"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.7"
      stroke="currentColor"
      class="h-5 w-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.434m0 0L6.75 13.5h10.5l2.25-7.5H5.106ZM6.75 13.5l-.75 3h12.75M9 19.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm9 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
      />
    </svg>
    <span
    v-if="cartStore.totalItems > 0"
    class="absolute -right-3 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-(--color-primary) px-1.5 font-mono text-[9px] font-bold text-black"
  >
      {{cartStore.totalItems}}
    </span>
  </RouterLink>
</template>
