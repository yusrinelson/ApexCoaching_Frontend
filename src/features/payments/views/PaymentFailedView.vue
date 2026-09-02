<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

import AppContainer from '../../../components/common/AppContainer.vue'
import BaseButton from '../../../components/ui/BaseButton.vue'

import { cancelPayment } from '../payments.api'

const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const isCancelled = ref(false)
const errorMessage = ref('')

const reference = route.query.reference

const cancel = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    if (!reference) {
      throw new Error('Payment reference is missing.')
    }

    const response = await cancelPayment(reference)

    if (!response.success) {
      throw new Error(
        response.message || 'Unable to cancel payment.'
      )
    }

    isCancelled.value = true

    toast.info('Payment cancelled.')

  } catch (error) {
    console.error('PAYMENT CANCELLATION ERROR:', error)

    errorMessage.value =
      error.response?.data?.message ||
      error.message ||
      'We could not update the payment status.'

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
  cancel()
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
            Cancelling Payment
          </h1>

          <p
            class="mx-auto mt-5 max-w-md text-sm leading-6 text-(--color-text-secondary)"
          >
            We're updating your order status. Please wait.
          </p>
        </section>

        <!-- Cancelled -->
        <section
          v-else-if="isCancelled"
          class="w-full max-w-2xl border border-(--color-border) bg-(--color-surface) px-6 py-16 text-center sm:px-10"
        >
          <p
            class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-danger)"
          >
            Payment Cancelled
          </p>

          <h1
            class="mt-4 font-display text-4xl uppercase leading-none text-white sm:text-5xl"
          >
            Payment Was Cancelled
          </h1>

          <p
            class="mx-auto mt-5 max-w-md text-sm leading-6 text-(--color-text-secondary)"
          >
            Your payment was not completed. Your order has been marked as
            cancelled.
          </p>

          <div class="mt-8 border border-(--color-border) bg-(--color-background) p-5">
            <p
              class="font-mono text-[10px] uppercase tracking-[0.15em] text-(--color-text-muted)"
            >
              Payment Reference
            </p>

            <p
              class="mt-2 break-all font-mono text-xs text-white"
            >
              {{ reference }}
            </p>
          </div>

          <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <BaseButton @click="goToShop">
              Continue Shopping
            </BaseButton>

            <button
              type="button"
              class="border border-(--color-border) px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white transition hover:border-(--color-primary) hover:text-(--color-primary)"
              @click="goToOrders"
            >
              View Orders
            </button>
          </div>
        </section>

        <!-- Error -->
        <section
          v-else
          class="w-full max-w-2xl border border-(--color-danger)/30 bg-(--color-surface) px-6 py-16 text-center sm:px-10"
        >
          <p
            class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-danger)"
          >
            Payment Status
          </p>

          <h1
            class="mt-4 font-display text-4xl uppercase leading-none text-white sm:text-5xl"
          >
            Something Went Wrong
          </h1>

          <p
            class="mx-auto mt-5 max-w-md text-sm leading-6 text-(--color-text-secondary)"
          >
            {{ errorMessage }}
          </p>

          <div class="mt-8">
            <BaseButton @click="goToShop">
              Return to Shop
            </BaseButton>
          </div>
        </section>

      </div>
    </AppContainer>
  </main>
</template>