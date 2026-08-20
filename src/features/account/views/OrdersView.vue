<script setup>
import { ref, onMounted } from 'vue'
import { getOrders, getOrderById } from '../../orders/orders.api'
import { downloadProduct } from '../../products/product.api'
import { format } from '../../../utils/helper'

const orders = ref([])
const selectedOrder = ref(null)

const isLoading = ref(false)
const isLoadingOrder = ref(false)
// const isDownloading = ref(false)
const downloadingProductId = ref(null)

const errorMessage = ref('')


const isPaid = (order) => order?.status === 'paid'
const loadOrders = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const response = await getOrders()

    if (response.success) {
      orders.value = response.data
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || 'Unable to load your orders. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const viewOrder = async (order) => {
  try {
    isLoadingOrder.value = true
    errorMessage.value = ''

    const response = await getOrderById(order._id)

    if (response.success) {
      selectedOrder.value = response.data
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || 'Unable to load this order. Please try again.'
  } finally {
    isLoadingOrder.value = false
  }
}

const closeOrder = () => {
  selectedOrder.value = null
  errorMessage.value = ''
}

const handleDownload = async (productId) => {
  try {
    downloadingProductId.value = productId
    errorMessage.value = ''

    const response = await downloadProduct(productId)
    if (response.success && response.data?.url) {
      window.location.href = response.data.url
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || 'Unable to download this product. Please try again.'
  } finally {
    downloadingProductId.value = false
  }
}

onMounted(() => {
  loadOrders()
})
</script>

<template>
  <div class="space-y-10">
    <!-- ORDER DETAILS -->
    <section v-if="selectedOrder" class="space-y-6">
      <button
        type="button"
        class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-secondary) transition hover:text-(--color-primary)"
        @click="closeOrder"
      >
        ← Back to Orders
      </button>

      <div class="border border-(--color-border) bg-(--color-surface)">
        <!-- Header -->
        <div
          class="flex flex-col gap-4 border-b border-(--color-border) px-6 py-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p
              class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-primary)"
            >
              Order Details
            </p>

            <h1 class="mt-2 font-display text-sm uppercase text-white">
              #{{ selectedOrder.paymentReference }}
            </h1>
          </div>

          <span
            class="w-fit border px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em]"
            :class="
              isPaid(selectedOrder)
                ? 'border-(--color-primary) text-(--color-primary)'
                : selectedOrder.status === 'pending'
                  ? 'border-yellow-500/40 text-yellow-400'
                  : 'border-red-500/40 text-red-400'
            "
          >
            {{ format.status(selectedOrder.status) }}
          </span>
        </div>

        <!-- Order Information -->
        <div class="grid gap-6 border-b border-(--color-border) p-6 sm:grid-cols-2">
          <div>
            <p
              class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
            >
              Order Date
            </p>

            <p class="mt-2 text-sm text-white">
              {{ format.date(selectedOrder.createdAt) }}
            </p>
          </div>

          <div>
            <p
              class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
            >
              Payment Status
            </p>

            <p
              class="mt-2 font-mono text-xs font-bold uppercase text-(--color-primary)"
              :class="isPaid(selectedOrder) ? 'text-(--color-primary)' : 'text-yellow-400'"
            >
              {{ format.status(selectedOrder.status) }}
            </p>
          </div>
        </div>

        <!-- Items -->
        <div class="p-6">
          <p
            class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-primary)"
          >
            Digital Products
          </p>

          <div class="mt-5 space-y-5">
            <div
              v-for="item in selectedOrder.items"
              :key="item.product?._id"
              class="flex flex-col gap-4 border-b border-(--color-border) pb-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p class="font-mono text-sm font-bold uppercase text-white">
                  {{ item.title }}
                </p>

                <p class="mt-2 text-xs text-(--color-text-secondary)">Quantity: 1</p>
              </div>

              <p class="font-mono text-sm font-bold text-white">{{ format.price(item.price) }}</p>

              <!-- <button
                v-if="isPaid(selectedOrder)"
                type="button"
                class="border border-(--color-primary) px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-(--color-primary) transition hover:bg-(--color-primary) hover:text-black"
                @click="handleDownload(item.product?._id)"
              >
                Download
              </button> -->
              <button
                v-if="isPaid(selectedOrder)"
                type="button"
                :disabled="downloadingProductId === item.product?._id"
                class="border border-(--color-primary) px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-(--color-primary) transition hover:bg-(--color-primary) hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                @click="handleDownload(item.product?._id)"
              >
                {{ downloadingProductId === item.product?._id ? 'Preparing...' : 'Download' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="border-t border-(--color-border) p-6">
          <div class="ml-auto max-w-sm space-y-4">
            <div class="flex justify-between text-xs">
              <span class="text-(--color-text-secondary)"> Subtotal </span>

              <!-- <span class="text-white">
                {{ selectedOrder.subtotal }}
              </span> -->
            </div>

            <div class="flex justify-between border-t border-(--color-border) pt-4">
              <span class="font-mono text-xs font-bold uppercase text-white"> Total </span>

              <span class="font-mono text-sm font-bold text-(--color-primary)">
                R{{ selectedOrder.totalAmount }}
              </span>
            </div>
          </div>
        </div>

        <!-- Digital Access -->
        <div v-if="isPaid(selectedOrder)" class="border-t border-(--color-border) p-6">
          <div class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p
                class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-primary)"
              >
                Digital Access
              </p>

              <p class="mt-2 text-sm text-white">Your digital product is ready to access.</p>

              <p class="mt-2 text-xs leading-5 text-(--color-text-secondary)">
                Access your Apex Playbook securely from your account.
              </p>
            </div>

            <!-- <button
              type="button"
              :disabled="isDownloading"
              class="shrink-0 bg-(--color-primary) px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              @click="handleDownload(selectedOrder.items[0].product?._id)"
            >
              {{ isDownloading ? 'Preparing Download...' : 'Download Book' }}
            </button> -->
          </div>
        </div>
      </div>
    </section>

    <!-- NORMAL ORDERS PAGE -->
    <div v-else class="space-y-10">
      <!-- Header -->
      <section>
        <p
          class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)"
        >
          Apex Account
        </p>

        <div class="mt-3">
          <h1
            class="font-display text-4xl uppercase leading-none text-white sm:text-5xl lg:text-6xl"
          >
            Your Orders
          </h1>

          <p class="mt-5 max-w-xl text-sm leading-6 text-(--color-text-secondary)">
            View your Apex purchases and keep track of your order history.
          </p>
        </div>
      </section>
      <!-- error message -->
      <p
        v-if="errorMessage"
        class="border border-(--color-danger)/30 bg-(--color-danger)/10 px-4 py-3 font-mono text-xs text-(--color-danger)"
      >
        {{ errorMessage }}
      </p>

      <!-- loading state -->
      <div
        v-if="isLoading"
        class="border border-(--color-border) bg-(--color-surface) px-6 py-16 text-center"
      >
        <p class="font-mono text-xs font-bold uppercase tracking-[0.15em] text-(--color-primary)">
          Loading Orders...
        </p>
      </div>
      <!-- Orders -->
      <section v-else-if="orders.length" class="space-y-4">
        <article
          v-for="order in orders"
          :key="order._id"
          class="border border-(--color-border) bg-(--color-surface)"
        >
          <!-- Order Header -->
          <div
            class="flex flex-col gap-4 border-b border-(--color-border) px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p
                class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
              >
                Order
              </p>

              <p class="mt-2 font-mono text-sm font-bold uppercase text-white">
                #{{ order.paymentReference }}
              </p>
            </div>

            <span
              class="w-fit border px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em]"
              :class="
                isPaid(order)
                  ? 'border-(--color-primary) text-(--color-primary)'
                  : order.status === 'pending'
                    ? 'border-yellow-500/40 text-yellow-400'
                    : 'border-red-500/40 text-red-400'
              "
            >
              {{ format.status(order.status) }}
            </span>
          </div>

          <!-- Items -->
          <div class="space-y-5 p-6">
            <div
              v-for="item in order.items"
              :key="item.title"
              class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p class="font-mono text-sm font-bold uppercase text-white">
                  {{ item.title }}
                </p>

                <p class="mt-2 text-xs text-(--color-text-secondary)">1 × {{ format.price(item.price) }}</p>
              </div>

              <p class="font-mono text-sm font-bold text-white">{{ format.price(item.price) }}</p>
            </div>
          </div>

          <!-- Footer -->
          <div
            class="flex flex-col gap-5 border-t border-(--color-border) px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p
                class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
              >
                Order Date
              </p>

              <p class="mt-2 text-xs text-white">
                {{ format.date(order.createdAt) }}
              </p>
            </div>

            <div class="flex items-center justify-between gap-8 sm:justify-end">
              <div>
                <p
                  class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
                >
                  Total
                </p>

                <p class="mt-2 font-mono text-sm font-bold text-white">{{ format.price(order.totalAmount) }}</p>
              </div>

              <button
                type="button"
                class="border border-(--color-border) px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white transition hover:border-(--color-primary) hover:text-(--color-primary)"
                @click="viewOrder(order)"
              >
                View Order
              </button>
            </div>
          </div>
        </article>
      </section>

      <!-- Empty State -->
      <section
        v-else
        class="border border-(--color-border) bg-(--color-surface) px-6 py-16 text-center sm:px-10"
      >
        <p
          class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)"
        >
          Order History
        </p>

        <h2 class="mt-4 font-display text-3xl uppercase leading-none text-white sm:text-4xl">
          No Orders Yet
        </h2>

        <p class="mx-auto mt-4 max-w-md text-sm leading-6 text-(--color-text-secondary)">
          Your Apex purchases will appear here once you place your first order.
        </p>

        <button
          type="button"
          class="mt-8 bg-(--color-primary) px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-black transition hover:opacity-90"
        >
          Shop Now
        </button>
      </section>
    </div>
  </div>
</template>
