<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../../features/auth/auth.store'


const props = defineProps({
  closeSignal: {
    type: Number,
    default: 0,
  },
})

const authStore = useAuthStore()

const isOpen = ref(false)
const menuRef = ref(null)
const emit = defineEmits(['toggle'])

const toggleMenu = () => {
  isOpen.value = !isOpen.value

  emit('toggle', isOpen.value)
}
const closeMenu = () => {
  isOpen.value = false
}


watch(
  () => props.closeSignal,
  () => {
    closeMenu()
  },
)



const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    closeMenu()
  }
}

const handleLogout = async () => {
  closeMenu()

  try {
    await authStore.logout()
  } finally {
    window.location.href = '/'
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="menuRef" class="relative">
    <!-- User button -->
    <button
      type="button"
      aria-label="Open account menu"
      :aria-expanded="isOpen"
      class="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) font-mono text-xs font-bold uppercase text-(--color-primary) transition hover:border-(--color-primary)"
      @click="toggleMenu"
    >
      <span aria-hidden="true">{{ authStore.user?.firstName?.charAt(0) || 'U' }}</span>
    </button>

    <!-- Dropdown -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 translate-y-1 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-1 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 top-12 z-50 w-56 overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl"
      >
        <!-- User information -->
        <div class="border-b border-[var(--color-border)] px-4 py-4">
          <p class="font-mono text-xs font-bold uppercase text-white">
            {{ authStore.user?.firstName }}
            {{ authStore.user?.lastName }}
          </p>

          <p class="mt-1 truncate text-xs text-[var(--color-text-muted)]">
            {{ authStore.user?.email }}
          </p>
        </div>

        <!-- Navigation -->
        <div class="p-2">
          <RouterLink
            to="/dashboard"
            class="block px-3 py-2.5 font-mono text-xs font-semibold uppercase text-white/70 transition hover:bg-white/5 hover:text-[var(--color-primary)]"
            @click="closeMenu"
          >
            Dashboard
          </RouterLink>

          <RouterLink
            to="/dashboard/profile"
            class="block px-3 py-2.5 font-mono text-xs font-semibold uppercase text-white/70 transition hover:bg-white/5 hover:text-[var(--color-primary)]"
            @click="closeMenu"
          >
            Profile
          </RouterLink>

          <RouterLink
            to="/dashboard/orders"
            class="block px-3 py-2.5 font-mono text-xs font-semibold uppercase text-white/70 transition hover:bg-white/5 hover:text-[var(--color-primary)]"
            @click="closeMenu"
          >
            Orders
          </RouterLink>
        </div>

        <!-- Logout -->
        <div class="border-t border-[var(--color-border)] p-2">
          <button
            type="button"
            class="w-full px-3 py-2.5 text-left font-mono text-xs font-semibold uppercase text-red-400 transition hover:bg-red-400/5"
            @click="handleLogout"
          >
            Logout
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
