<script setup>
</script>

<template>
  <div class="min-h-screen bg-(--color-background) text-(--color-text-primary)">
    <!-- Header -->
    <header class="border-b border-(--color-border) bg-(--color-surface)">
      <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <RouterLink to="/admin" class="flex items-center gap-2">
          <span
            class="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-primary) font-bold text-black"
          >
            A
          </span>

          <div>
            <p class="font-display text-xl font-bold text-white">
              APEX <span class="text-(--color-primary)">.</span>
            </p>

            <p
              class="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-(--color-text-muted)"
            >
              Administration
            </p>
          </div>
        </RouterLink>

        <RouterLink
          to="/dashboard"
          class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-(--color-text-secondary) transition hover:text-(--color-primary)"
        >
          Customer Dashboard →
        </RouterLink>
      </div>
    </header>

    <!-- Admin Layout -->
    <div class="max-w-7xl lg:grid lg:grid-cols-[220px_1fr]">
      <!-- Sidebar -->
      <aside
        class="hidden min-h-[calc(100vh-5rem)] border-r border-(--color-border) bg-(--color-surface) lg:block"
      >
        <nav class="p-6">
          <p
            class="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-text-muted)"
          >
            Administration
          </p>

          <div class="space-y-1">
            <RouterLink
              to="/admin"
              class="block px-3 py-3 font-mono text-xs font-bold uppercase tracking-wide text-(--color-text-secondary) transition hover:bg-(--color-background-secondary) hover:text-(--color-primary)"
              active-class="bg-(--color-background-secondary) text-(--color-primary)"
            >
              Dashboard
            </RouterLink>

            <RouterLink
              to="/admin/orders"
              class="block px-3 py-3 font-mono text-xs font-bold uppercase tracking-wide text-(--color-text-secondary) transition hover:bg-(--color-background-secondary) hover:text-(--color-primary)"
              active-class="bg-(--color-background-secondary) text-(--color-primary)"
            >
              Customer Orders
            </RouterLink>

            <RouterLink
              to="/admin/products"
              class="block px-3 py-3 font-mono text-xs font-bold uppercase tracking-wide text-(--color-text-secondary) transition hover:bg-(--color-background-secondary) hover:text-(--color-primary)"
              active-class="bg-(--color-background-secondary) text-(--color-primary)"
            >
              Products
            </RouterLink>
          </div>
        </nav>
      </aside>

      <!-- Content -->
      <main class="min-w-0 w px-6 py-10 lg:px-10 lg:py-12">
        <RouterView />
      </main>
    </div>
  </div>
</template>