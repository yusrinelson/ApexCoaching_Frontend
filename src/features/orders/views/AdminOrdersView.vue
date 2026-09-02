<script setup>
import { ref, onMounted } from 'vue'
import { getAdminOrders } from '../admin-orders.api'
import { format } from '../../../utils/helper'

const orders = ref([])
const isLoading = ref(false)
const errorMessage = ref('')

const loadOrders = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const response = await getAdminOrders()

    if (response.success) {
      orders.value = response.data
    }
  } catch (error) {
    console.error('ADMIN ORDERS ERROR:', error)

    errorMessage.value =
      error.response?.data?.message ||
      'Unable to load admin orders.'
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
    <section>
      <p
        class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)"
      >
        Apex Administration
      </p>

      <h1
        class="mt-3 font-display text-4xl uppercase leading-none text-white sm:text-5xl"
      >
        Orders
      </h1>

      <p
        class="mt-5 max-w-xl text-sm leading-6 text-(--color-text-secondary)"
      >
        Manage customer orders and monitor payment status.
      </p>
    </section>

    <p
      v-if="errorMessage"
      class="border border-(--color-danger)/30 bg-(--color-danger)/10 px-4 py-3 font-mono text-xs text-(--color-danger)"
    >
      {{ errorMessage }}
    </p>

    <div
      v-if="isLoading"
      class="border border-(--color-border) bg-(--color-surface) px-6 py-16 text-center"
    >
      <p
        class="font-mono text-xs font-bold uppercase tracking-[0.15em] text-(--color-primary)"
      >
        Loading Orders...
      </p>
    </div>

    <section
      v-else-if="orders.length"
      class="space-y-4"
    >
      <article
        v-for="order in orders"
        :key="order._id"
        class="border border-(--color-border) bg-(--color-surface)"
      >
        <div
          class="flex flex-col gap-4 border-b border-(--color-border) px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p
              class="font-mono text-[10px] uppercase tracking-[0.15em] text-(--color-text-muted)"
            >
              Order
            </p>

            <p class="mt-2 font-mono text-sm font-bold text-white">
              #{{ order.paymentReference }}
            </p>
          </div>

          <span
            class="w-fit border px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em]"
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
        </div>

        <div class="grid gap-6 p-6 sm:grid-cols-3">
          <div>
            <p
              class="font-mono text-[10px] uppercase tracking-[0.15em] text-(--color-text-muted)"
            >
              Customer
            </p>

            <p class="mt-2 text-sm text-white">
              {{ order.user?.firstName }}
              {{ order.user?.lastName }}
            </p>

            <p class="mt-1 text-xs text-(--color-text-secondary)">
              {{ order.user?.email }}
            </p>
          </div>

          <div>
            <p
              class="font-mono text-[10px] uppercase tracking-[0.15em] text-(--color-text-muted)"
            >
              Date
            </p>

            <p class="mt-2 text-sm text-white">
              {{ format.date(order.createdAt) }}
            </p>
          </div>

          <div>
            <p
              class="font-mono text-[10px] uppercase tracking-[0.15em] text-(--color-text-muted)"
            >
              Total
            </p>

            <p class="mt-2 font-mono text-sm font-bold text-white">
              {{ format.price(order.totalAmount) }}
            </p>
          </div>
        </div>

        <div class="border-t border-(--color-border) px-6 py-5">
          <p
            class="font-mono text-[10px] uppercase tracking-[0.15em] text-(--color-text-muted)"
          >
            Products
          </p>

          <div class="mt-3 space-y-2">
            <div
              v-for="item in order.items"
              :key="item.title"
              class="flex justify-between gap-4 text-sm"
            >
              <span class="text-white">
                {{ item.title }}
              </span>

              <span class="font-mono text-xs text-(--color-text-secondary)">
                {{ format.price(item.price) }}
              </span>
            </div>
          </div>
        </div>
      </article>
    </section>

    <section
      v-else
      class="border border-(--color-border) bg-(--color-surface) px-6 py-16 text-center"
    >
      <p
        class="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-primary)"
      >
        Orders
      </p>

      <h2 class="mt-4 font-display text-3xl uppercase text-white">
        No Orders
      </h2>
    </section>
  </div>
</template>