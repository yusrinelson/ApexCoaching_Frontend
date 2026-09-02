<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../features/auth/auth.store'
import { getOrders } from '../features/orders/orders.api'
import { format } from '../utils/helper'

import BaseButton from '../components/ui/BaseButton.vue'
// import SectionHeading from '../components/common/SectionHeading.vue'

const authStore = useAuthStore()

const userName = computed(() => {
  return authStore.user?.firstName || 'Player'
})

const orders = ref([])
const isLoadingOrders = ref(false)
const ordersError = ref('')

const paidOrders = computed(() => {
  return orders.value.filter((order) => order.status === 'paid')
})

const recentOrders = computed(() => {
  return orders.value.slice(0, 3)
})

const loadOrders = async () => {
  try {
    isLoadingOrders.value = true
    ordersError.value = ''

    const response = await getOrders()

    if (response.success) {
      orders.value = response.data
    }
  } catch (error) {
    console.error('DASHBOARD ORDERS ERROR:', error)

    ordersError.value =
      error.response?.data?.message || 'Unable to load your orders. Please try again.'
  } finally {
    isLoadingOrders.value = false
  }
}

onMounted(() => {
  loadOrders()
})
</script>

<template>
  <div class="space-y-10">
    <section>
      <p class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)">
        Apex Member Area
      </p>

      <div class="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <h1
            class="font-display text-4xl uppercase leading-none text-white sm:text-5xl lg:text-6xl"
          >
            Welcome Back,
            <br />
            {{ userName }}.
          </h1>

          <p class="mt-5 max-w-xl text-sm leading-6 text-(--color-text-secondary)">
            Manage your training, bookings, orders and Apex account from one place.
          </p>
        </div>

        <BaseButton> Book Training </BaseButton>
      </div>
    </section>

    <section class="grid gap-px border border-(--color-border) bg-(--color-border) sm:grid-cols-3">
      <!-- Training -->
      <div class="bg-(--color-surface) p-6">
        <p
          class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
        >
          Upcoming Training
        </p>

        <p class="mt-4 font-display text-4xl text-white">0</p>

        <p class="mt-2 text-xs text-(--color-text-secondary)">No upcoming sessions</p>
      </div>

      <!-- Orders -->
      <div class="bg-(--color-surface) p-6">
        <p
          class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
        >
          Orders
        </p>

        <p class="mt-4 font-display text-4xl text-white">{{ orders.length }}</p>

        <p class="mt-2 text-xs text-(--color-text-secondary)">
          {{ orders.length === 1 ? '1 order' : `${orders.length} orders` }}
        </p>
      </div>

      <!-- Account -->
      <div class="bg-(--color-surface) p-6">
        <p
          class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
        >
          Account
        </p>

        <p class="mt-4 font-display text-4xl uppercase text-(--color-primary)">Active</p>

        <p class="mt-2 text-xs text-(--color-text-secondary)">Your Apex account is ready</p>
      </div>
    </section>

    <!-- DASHBOARD CONTENT -->
    <section class="grid gap-6 lg:grid-cols-2">
      <!-- UPCOMING TRAINING -->
      <div class="border border-(--color-border) bg-(--color-surface)">
        <div class="flex items-center justify-between border-b border-(--color-border) px-6 py-5">
          <div>
            <p
              class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-primary)"
            >
              Training
            </p>

            <h2 class="mt-2 font-display text-2xl uppercase text-white">Upcoming Sessions</h2>
          </div>

          <RouterLink
            to="/programs"
            class="font-mono text-[10px] font-bold uppercase tracking-wide text-(--color-text-secondary) transition hover:text-(--color-primary)"
          >
            View Programmes →
          </RouterLink>
        </div>

        <div class="flex min-h-56 items-center justify-center px-6 py-10">
          <div class="text-center">
            <div
              class="mx-auto flex h-14 w-14 items-center justify-center border border-(--color-border) font-display text-xl text-(--color-text-muted)"
            >
              —
            </div>

            <h3 class="mt-5 font-mono text-xs font-bold uppercase text-white">
              No upcoming sessions
            </h3>

            <p class="mx-auto mt-2 max-w-xs text-xs leading-5 text-(--color-text-secondary)">
              Book your next training session and start working towards your Apex.
            </p>

            <RouterLink
              to="/programs"
              class="mt-5 inline-block font-mono text-[10px] font-bold uppercase tracking-wide text-(--color-primary) hover:underline"
            >
              Explore Training →
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- RECENT ORDERS -->
      <div class="border border-(--color-border) bg-(--color-surface)">
        <div class="flex items-center justify-between border-b border-(--color-border) px-6 py-5">
          <div>
            <p
              class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-primary)"
            >
              Shop
            </p>

            <h2 class="mt-2 font-display text-2xl uppercase text-white">Recent Orders</h2>
          </div>

          <RouterLink
            to="/dashboard/orders"
            class="font-mono text-[10px] font-bold uppercase tracking-wide text-(--color-text-secondary) transition hover:text-(--color-primary)"
          >
            View Orders →
          </RouterLink>
        </div>

        <!-- Loading -->
        <div v-if="isLoadingOrders" class="flex min-h-56 items-center justify-center px-6 py-10">
          <p class="font-mono text-xs font-bold uppercase tracking-[0.15em] text-(--color-primary)">
            Loading Orders...
          </p>
        </div>

        <!-- Error -->
        <div v-else-if="ordersError" class="flex min-h-56 items-center justify-center px-6 py-10">
          <p class="text-center text-xs text-(--color-danger)">
            {{ ordersError }}
          </p>
        </div>

        <!-- Orders -->
        <div v-else-if="recentOrders.length" class="divide-y divide-(--color-border)">
          <div v-for="order in recentOrders" :key="order._id" class="px-6 py-5">
            <div class="flex items-start justify-between gap-4">
              <div class="min-w-0">
                <p
                  class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-(--color-text-muted)"
                >
                  {{ format.date(order.createdAt) }}
                </p>

                <p class="mt-2 truncate font-mono text-xs font-bold text-white">
                  #{{ order.paymentReference }}
                </p>

                <p class="mt-2 text-xs text-(--color-text-secondary)">
                  {{ order.items.length }}
                  {{ order.items.length === 1 ? 'product' : 'products' }}
                </p>
              </div>

              <div class="shrink-0 text-right">
                <span
                  class="border px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-widest"
                  :class="
                    order.status === 'paid'
                      ? 'border-(--color-primary) text-(--color-primary)'
                      : order.status === 'pending'
                        ? 'border-yellow-500/40 text-yellow-400'
                        : 'border-red-500/40 text-red-400'
                  "
                >
                  {{ format.status(order.status) }}
                </span>

                <p class="mt-3 font-mono text-xs font-bold text-white">
                  {{ format.price(order.totalAmount) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty -->
        <div v-else class="flex min-h-56 items-center justify-center px-6 py-10">
          <div class="text-center">
            <div
              class="mx-auto flex h-14 w-14 items-center justify-center border border-(--color-border) font-display text-xl text-(--color-text-muted)"
            >
              —
            </div>

            <h3 class="mt-5 font-mono text-xs font-bold uppercase text-white">No orders yet</h3>

            <p class="mx-auto mt-2 max-w-xs text-xs leading-5 text-(--color-text-secondary)">
              Your Apex purchases will appear here once you place an order.
            </p>

            <RouterLink
              to="/shop"
              class="mt-5 inline-block font-mono text-[10px] font-bold uppercase tracking-wide text-(--color-primary) hover:underline"
            >
              Visit Shop →
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ACCOUNT CTA -->
    <section
      class="relative overflow-hidden border border-(--color-border) bg-(--color-surface) p-8 sm:p-10"
    >
      <div
        class="pointer-events-none absolute -right-10 -top-12 font-display text-8xl uppercase leading-none text-white/[0.025] sm:text-[10rem]"
      >
        APEX
      </div>

      <div class="relative z-10 max-w-2xl">
        <p
          class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)"
        >
          Your Account
        </p>

        <h2 class="mt-3 font-display text-3xl uppercase leading-none text-white sm:text-4xl">
          Keep Building.
          <br />
          Keep Improving.
        </h2>

        <p class="mt-4 max-w-lg text-sm leading-6 text-(--color-text-secondary)">
          Keep your Apex profile up to date so your training and account information stays accurate.
        </p>

        <RouterLink to="/dashboard/profile">
          <BaseButton class="mt-6"> Manage Profile </BaseButton>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
