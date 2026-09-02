<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

import AppContainer from '../../../components/common/AppContainer.vue'
import BaseButton from '../../../components/ui/BaseButton.vue'

import { verifyPayment } from '../payments.api'
import { useCartStore } from '../../cart/store/cart.store'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const isLoading = ref(true)
const isSuccessful = ref(false)
const errorMessage = ref('')

const order = ref(null)

const verify = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const reference = route.query.reference

    if (!reference) {
      throw new Error('Payment reference is missing.')
    }

    const response = await verifyPayment(reference)

    if (!response.success) {
      throw new Error(
        response.message || 'Unable to verify payment.'
      )
    }

    order.value = response.data
    isSuccessful.value = true

    // Backend has already cleared the cart.
    // Sync Pinia with the backend.
    cartStore.reset()

    toast.success('Payment successful.')
  } catch (error) {
    console.error('PAYMENT VERIFICATION ERROR:', error)

    errorMessage.value =
      error.response?.data?.message ||
      error.message ||
      'We could not verify your payment.'

    isSuccessful.value = false
  } finally {
    isLoading.value = false
  }
}

const goToShop = () => {
  router.push('/shop')
}

const goToOrders = () => {
  router.push('/dashboard/orders')
}

onMounted(() => {
  verify()
})
</script>

<template>
  <main class="min-h-screen bg-(--color-background) pt-20">
    <AppContainer>
      <div class="flex min-h-[70vh] items-center justify-center py-20">

        <!-- Loading -->
        <section
          v-if="isLoading"
          class="w-full max-w-2xl border border-(--color-border) bg-(--color-surface) px-6 py-16 text-center sm:px-10"
        >
          <p
            class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)"
          >
            Apex Checkout
          </p>

          <h1
            class="mt-4 font-display text-4xl uppercase leading-none text-white sm:text-5xl"
          >
            Verifying Payment
          </h1>

          <p
            class="mx-auto mt-5 max-w-md text-sm leading-6 text-(--color-text-secondary)"
          >
            We're confirming your payment with Paystack. Please don't close this page.
          </p>
        </section>

        <!-- Success -->
        <section
          v-else-if="isSuccessful"
          class="w-full max-w-2xl border border-(--color-border) bg-(--color-surface) px-6 py-16 text-center sm:px-10"
        >
          <p
            class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)"
          >
            Payment Complete
          </p>

          <h1
            class="mt-4 font-display text-4xl uppercase leading-none text-white sm:text-5xl"
          >
            You're In.
          </h1>

          <p
            class="mx-auto mt-5 max-w-md text-sm leading-6 text-(--color-text-secondary)"
          >
            Your payment was successful. Your digital products are now available.
          </p>

          <div
            v-if="order"
            class="mx-auto mt-8 max-w-md border border-(--color-border) bg-(--color-background) p-5 text-left"
          >
            <div class="flex justify-between gap-4">
              <span class="font-mono text-[10px] uppercase text-(--color-text-muted)">
                Order
              </span>

              <span class="font-mono text-xs text-white">
                #{{ order._id.slice(-8).toUpperCase() }}
              </span>
            </div>

            <div class="mt-4 flex justify-between gap-4">
              <span class="font-mono text-[10px] uppercase text-(--color-text-muted)">
                Status
              </span>

              <span class="font-mono text-xs font-bold uppercase text-(--color-primary)">
                {{ order.status }}
              </span>
            </div>
          </div>

          <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <BaseButton @click="goToOrders">
              View Orders
            </BaseButton>

            <button
              type="button"
              class="border border-(--color-border) px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white transition hover:border-(--color-primary) hover:text-(--color-primary)"
              @click="goToShop"
            >
              Continue Shopping
            </button>
          </div>
        </section>

        <!-- Failure -->
        <section
          v-else
          class="w-full max-w-2xl border border-(--color-danger)/30 bg-(--color-surface) px-6 py-16 text-center sm:px-10"
        >
          <p
            class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-danger)"
          >
            Payment Verification
          </p>

          <h1
            class="mt-4 font-display text-4xl uppercase leading-none text-white sm:text-5xl"
          >
            Payment Could Not Be Confirmed
          </h1>

          <p
            class="mx-auto mt-5 max-w-md text-sm leading-6 text-(--color-text-secondary)"
          >
            {{ errorMessage }}
          </p>

          <div class="mt-8">
            <button
              type="button"
              class="bg-(--color-primary) px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-black transition hover:opacity-90"
              @click="goToShop"
            >
              Return to Shop
            </button>
          </div>
        </section>

      </div>
    </AppContainer>
  </main>
</template>