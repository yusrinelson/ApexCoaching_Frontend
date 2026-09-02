<script setup>
import { useAuthStore } from '../features/auth/auth.store'
import AppContainer from '../components/common/AppContainer.vue'
import BaseButton from '../components/ui/BaseButton.vue'

const authStore = useAuthStore()

const handleLogout = async () => {
  try {
    await authStore.logout()
  } catch (error) {
    console.error('LOGOUT failed:', error)
  }
}
</script>

<template>
  <div class="min-h-screen bg-(--color-background) text-(--color-text-primary)">
    <header class="border-b border-(--color-border) bg-(--color-surface)">
      <AppContainer>
        <div class="flex items-center justify-between h-20">
          <RouterLink to="/" class="inline-flex items-center gap-2">
            <span
              class="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-primary) font-bold text-black"
            >
              A
            </span>

            <span class="text-xl font-bold font-display">
              APEX <span class="text-(--color-primary) -ml-1">.</span>
            </span>
          </RouterLink>

          <div class="flex items-center gap-4">
            <div class="hidden text-right sm:block">
              <p class="text-xs font-bold uppercase text-white font-mono">
                {{ authStore.user?.firstName }}
                {{ authStore.user?.lastName }}
              </p>
              <p class="text-xs text-(--color-text-secondary)">
                {{ authStore.user?.email }}
              </p>
            </div>
            <button
              type="button"
              @click="handleLogout"
              class="font-mono text-xs font-bold uppercase text-(--color-text-secondary) transition hover:text-(--color-error)"
            >
              Logout
            </button>
          </div>
        </div>
      </AppContainer>
    </header>

    <div class="lg:grid lg:grid-cols-[240px_1fr]">
      <!-- sidebar -->
      <aside
        class="hidden min-h-[clac(100vh-5rem)] border-r border-(--color-border) bg-(--color-surface) lg:block"
      >
        <nav class="p-6">
          <p
            class="font-mono mb-4 text-[10px] font-boldmb-4 tracking-[0.2em] font-bold uppercase text-(--color-text-muted)"
          >
            Account
          </p>

          <div class="space-x-1">
            <RouterLink
              to="/dashboard"
              class="block px-3 py-3 font-mono text-xs font-bold uppercase tracking-wide text-(--color-text-secondary) transition hover:bg-(--color-background-secondary) hover:text-(--color-primary)"
              active-class="bg-(--color-background-secondary) text-(--color-primary)"
            >
              Dashboard
            </RouterLink>

            <RouterLink
              to="/dashboard/profile"
              class="block px-3 py-3 font-mono text-xs font-bold uppercase tracking-wide text-(--color-text-secondary) transition hover:bg-(--color-background-secondary) hover:text-(--color-primary)"
              active-class="bg-(--color-background-secondary) text-(--color-primary)"
            >
              Profile
            </RouterLink>

            <RouterLink
              to="/dashboard/orders"
              class="block px-3 py-3 font-mono text-xs font-bold uppercase tracking-wide text-(--color-text-secondary) transition hover:bg-(--color-background-secondary) hover:text-(--color-primary)"
              active-class="bg-(--color-background-secondary) text-(--color-primary)"
            >
              Orders
            </RouterLink>
          </div>
          <div v-if="authStore.user?.role === 'admin'">
          <p
            class="font-mono mb-4 text-[10px] font-boldmb-4 tracking-[0.2em] font-bold uppercase text-(--color-text-muted)"
          >
            Administration
          </p>
          <RouterLink
              to="/admin"
              class="block px-3 py-3 font-mono text-xs font-bold uppercase tracking-wide text-(--color-text-secondary) transition hover:bg-(--color-background-secondary) hover:text-(--color-primary)"
              active-class="bg-(--color-background-secondary) text-(--color-primary)"
            >
              Admin Dashboard
            </RouterLink>
            </div>
        </nav>
        
      </aside>

      <main class="min-w-0">
        <AppContainer>
          <div class="py-10 lg:py-12">
            <RouterView />
          </div>
        </AppContainer>
      </main>
    </div>
  </div>
</template>
