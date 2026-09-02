<script setup>
import { ref, computed, onMounted } from 'vue'
import { getAdminOrders } from '../../orders/admin-orders.api'
import { format } from '../../../utils/helper'

const orders = ref([])
const isLoading = ref(false)
const errorMessage = ref('')

const totalOrders = computed(() => {
  return orders.value.length
})

const paidOrders = computed(() => {
  return orders.value.filter((order) => order.status === 'paid')
})

const pendingOrders = computed(() => {
  return orders.value.filter((order) => order.status === 'pending')
})

const cancelledOrders = computed(() => {
  return orders.value.filter((order) => order.status === 'cancelled')
})

const revenue = computed(() => {
  return paidOrders.value.reduce((total, order) => total + order.totalAmount, 0)
})

const recentOrders = computed(() => {
  return orders.value.slice(0, 5)
})

const loadOrders = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const response = await getAdminOrders()

    if (response.success) {
      orders.value = response.data
    }
  } catch (error) {
    console.error('ADMIN DASHBOARD ERROR:', error)
    errorMessage.value = error.response?.data?.message || 'Unable to load admin orders.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadOrders()
})
</script>
<template>
  <div class="space-y-10">
    <!-- HEADER -->
    <section>
      <p class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)">
        Apex Administration
      </p>

      <h1
        class="mt-3 font-display text-4xl uppercase leading-none text-white sm:text-5xl lg:text-6xl"
      >
        Dashboard
      </h1>

      <p class="mt-5 max-w-xl text-sm leading-6 text-(--color-text-secondary)">
        Monitor your Apex store, orders and customer activity.
      </p>
    </section>

    <!-- ERROR -->
    <p
      v-if="errorMessage"
      class="border border-(--color-danger)/30 bg-(--color-danger)/10 px-4 py-3 font-mono text-xs text-(--color-danger)"
    >
      {{ errorMessage }}
    </p>

    <!-- LOADING -->
    <div
      v-if="isLoading"
      class="border border-(--color-border) bg-(--color-surface) px-6 py-16 text-center"
    >
      <p class="font-mono text-xs font-bold uppercase tracking-[0.15em] text-(--color-primary)">
        Loading Dashboard...
      </p>
    </div>

    <main v-else>
      <!-- stats -->
      <section
        class="grid gap-px border border-(--color-border) bg-(color-border) sm:grid-cols-2 lg:grid-cols-5"
      >
        <div class="bg-(--color-surface) p-6">
          <p
            class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
          >
            Total Orders
          </p>

          <p class="mt-4 font-display text-4xl text-white">
            {{ totalOrders }}
          </p>
        </div>

        <!-- Paid -->
        <div class="bg-(--color-surface) p-6">
          <p
            class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
          >
            Paid
          </p>

          <p class="mt-4 font-display text-4xl text-(--color-primary)">
            {{ paidOrders.length }}
          </p>
        </div>

        <!-- Pending -->
        <div class="bg-(--color-surface) p-6">
          <p
            class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
          >
            Pending
          </p>

          <p class="mt-4 font-display text-4xl text-yellow-400">
            {{ pendingOrders.length }}
          </p>
        </div>

        <!-- Cancelled -->
        <div class="bg-(--color-surface) p-6">
          <p
            class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
          >
            Cancelled
          </p>

          <p class="mt-4 font-display text-4xl text-red-400">
            {{ cancelledOrders.length }}
          </p>
        </div>

        <!-- Revenue -->
        <div class="bg-(--color-surface) p-6">
          <p
            class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
          >
            Revenue
          </p>

          <p class="mt-4 font-mono text-xl font-bold text-white">
            {{ format.price(revenue) }}
          </p>
        </div>
      </section>

      <!-- recent Orders -->
      <section class="border border-(--color-border) bg-(--color-surface)">
        <div
          class="flex flex-col gap-4 border-b border-(--color-border) px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p
              class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-primary)"
            >
              Store
            </p>

            <h2 class="mt-2 font-display text-2xl uppercase text-white">Recent Orders</h2>
          </div>

          <RouterLink
            to="/admin/orders"
            class="font-mono text-[10px] font-bold uppercase tracking-wide text-(--color-text-secondary) transition hover:text-(--color-primary)"
          >
            View All Orders →
          </RouterLink>
        </div>

        <div v-if="recentOrders.length" class="divide-y divide-(--color-border)">
          <div
            v-for="order in recentOrders"
            :key="order._id"
            class="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p class="font-mono text-xs font-bold text-white">#{{ order.paymentReference }}</p>

              <p class="mt-2 text-xs text-(--color-text-secondary)">
                {{ order.user?.firstName }}
                {{ order.user?.lastName }}
                ·
                {{ order.user?.email }}
              </p>

              <p class="mt-2 font-mono text-[10px] text-(--color-text-muted)">
                {{ format.date(order.createdAt) }}
              </p>
            </div>

            <div class="flex items-center gap-6">
              <span
                class="border px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em]"
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

              <span class="font-mono text-sm font-bold text-white">
                {{ format.price(order.totalAmount) }}
              </span>
            </div>
          </div>
        </div>

        <div v-else class="px-6 py-16 text-center">
          <p class="font-mono text-xs uppercase tracking-[0.15em] text-(--color-text-muted)">
            No orders yet
          </p>
        </div>
      </section>
    </main>
  </div>
</template>
