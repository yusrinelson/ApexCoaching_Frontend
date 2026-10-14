<script setup>
import { computed } from 'vue'
import { Toaster } from 'vue-sonner'
import { useAuthStore } from './features/auth/auth.store'

const authStore = useAuthStore()

const isAppLoading = computed(() => !authStore.initialized)
</script>

<template>
  <Toaster position="top-right" :duration="3500" :max="3" :limit="3" theme="light" rich-colors />

  <!-- startup loader -->
  <Transition name="startup">
    <div
      v-if="isAppLoading"
      class="fixed inset-0 z-9999 flex min-h-screen items-center justify-center bg(--color-background)"
    >
      <div class="w-full max-w-sm px-8 text-center">
        <div class="mb-10">
          <p class="font-display text-5xl font-black tracking-tight text-white">
            APEX<span class="text-(--color-primary)">.</span>
          </p>

          <p
            class="mt-2 font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-(--color-text-muted)"
          >
            Football Performance
          </p>
        </div>

        <div class="mb-5">
          <p
            class="font-mono text-[10px] font-bold uppercase tracking-[0.2] text-(--color-text-secondary)"
          >
            Initializing...
          </p>
          <p
            class="mt-2 font-mono text-[9px] uppercase tracking-[0.15em] text-(--color-text-muted)"
          >
            Preparing your experience...
          </p>
        </div>

        <!-- loading bar -->
        <div class="h-px w-full overflow-hidden bg-(--color-border)">
          <div class="startup-progress h-full bg-(--color-primary)" />
        </div>

        <!-- status -->
        <p
          class="mt-4 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-(--color-text-muted)"
        >
          Connecting
        </p>
      </div>
    </div>
  </Transition>

  <!-- application -->
  <RouterView />
</template>

<style scoped>
.startup-enter-active,
.startup-leave-active {
  transition: opacity 0.5s ease;
}

.startup-enter-from,
.startup-leave-to {
  opacity: 0;
}

.startup-progress {
  width: 40%;
  animation: startup-progress 1.5s ease-in-out infinite;
}

@keyframes startup-progress {
  0% {
    transform: translateX(-120%);
  }

  50% {
    transform: translateX(120%);
  }

  100% {
    transform: translateX(250%);
  }
}
</style>
