<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

import {createOrder} from '../../orders/orders.api'
import { initializePayment } from '../../payments/payments.api'
import { useCartStore } from '../store/cart.store'
import { format } from '../../../utils/helper'

import AppContainer from '../../../components/common/AppContainer.vue'

const cartStore = useCartStore()
const router = useRouter()

const isCheckingOut = ref(false)
const removingProductId = ref(null)
const isClearing = ref(false)
const errorMessage = ref('')

const handleCheckout = async () => {
  try{
    isCheckingOut.value = true
    errorMessage.value = ''

    const orderResponse = await createOrder() //create order from cart

    if(!orderResponse.success){
      throw new Error(orderResponse.message || 'Unable to checkout. Please try again.')
    }

    const order = orderResponse.data

    //initialize payment/paystack
    const paymentResponse = await initializePayment(order._id)

    if(!paymentResponse.success){
      throw new Error(paymentResponse.message || 'Unable to initialize payment. Please try again.')
    }

    // redirect to paystck
    window.location.href = paymentResponse.data.authorization_url

  }catch(error){
    console.error('CHECKOUT failed:', error)

    toast.error(error.response?.data?.message || 'Unable to checkout. Please try again.')

    isCheckingOut.value = false
  }
}

const handleRemove = async (productId) => {
  try {
    removingProductId.value = productId
    errorMessage.value = ''

    await cartStore.removeProduct(productId)
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || 'Unable to remove this item. Please try again.'
  } finally {
    removingProductId.value = null
  }
}

const handleClearCart = async () => {
  try {
    isClearing.value = true
    errorMessage.value = ''

    await cartStore.clear()
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || 'Unable to clear your cart. Please try again.'
  } finally {
    isClearing.value = false
  }
}

onMounted(() => {
  cartStore.loadCart()
})
</script>

<template>
  <main class="min-h-screen bg-(--color-background) pt-20">
    <AppContainer>
      <div class="space-y-10">
        <!-- Header -->
        <section>
          <p
            class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)"
          >
            Apex Shop
          </p>

          <div class="mt-3">
            <h1
              class="font-display text-4xl uppercase leading-none text-white sm:text-5xl lg:text-6xl"
            >
              Your Cart
            </h1>

            <p class="mt-5 max-w-xl text-sm leading-6 text-(--color-text-secondary)">
              Review your digital products before continuing to checkout.
            </p>
          </div>
        </section>

        <!-- Error -->
        <p
          v-if="errorMessage"
          class="border border-(--color-danger)/30 bg-(--color-danger)/10 px-4 py-3 font-mono text-xs text-(--color-danger)"
        >
          {{ errorMessage }}
        </p>

        <!-- Loading -->
        <section
          v-if="cartStore.isLoading"
          class="border border-(--color-border) bg-(--color-surface) px-6 py-16 text-center"
        >
          <p class="font-mono text-xs font-bold uppercase tracking-[0.15em] text-(--color-primary)">
            Loading Cart...
          </p>
        </section>

        <!-- Cart -->
        <section v-else-if="cartStore.items.length" class="grid gap-6 lg:grid-cols-[1fr_320px]">
          <!-- Products -->
          <div class="border border-(--color-border) bg-(--color-surface)">
            <!-- Cart header -->
            <div
              class="flex flex-col gap-4 border-b border-(--color-border) px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p
                  class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-primary)"
                >
                  Cart
                </p>

                <h2 class="mt-2 font-display text-2xl uppercase text-white">Digital Products</h2>
              </div>

              <button
                type="button"
                :disabled="isClearing"
                class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-(--color-text-secondary) transition hover:text-(--color-danger) disabled:opacity-50"
                @click="handleClearCart"
              >
                {{ isClearing ? 'Clearing...' : 'Clear Cart' }}
              </button>
            </div>

            <!-- Products -->
            <div class="divide-y divide-(--color-border)">
              <article
                v-for="item in cartStore.items"
                :key="item.product._id"
                class="flex flex-col gap-5 p-6 sm:flex-row sm:items-center"
              >
                <!-- Cover -->
                <div
                  class="h-28 w-20 shrink-0 overflow-hidden border border-(--color-border) bg-(--color-background)"
                >
                  <img
                    v-if="item.product.coverImage?.url"
                    :src="item.product.coverImage.url"
                    :alt="item.product.title"
                    class="h-full w-full object-cover"
                  />

                  <div
                    v-else
                    class="flex h-full w-full items-center justify-center font-mono text-[9px] uppercase text-(--color-text-muted)"
                  >
                    No Image
                  </div>
                </div>

                <!-- Product -->
                <div class="min-w-0 flex-1">
                  <p
                    class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-primary)"
                  >
                    Digital Product
                  </p>

                  <h3 class="mt-2 font-display text-xl uppercase text-white">
                    {{ item.product.title }}
                  </h3>

                  <p v-if="item.product.author" class="mt-2 text-xs text-(--color-text-secondary)">
                    By {{ item.product.author }}
                  </p>

                  <p
                    v-if="item.product.shortDescription"
                    class="mt-3 text-xs text-(--color-text-muted)"
                  >
                    {{ item.product.shortDescription }}
                  </p>

                  <p class="mt-2 text-xs text-(--color-text-muted)">
                    Instant digital access after payment.
                  </p>
                </div>

                <!-- Price / Remove -->
                <div class="flex items-center justify-between gap-6 sm:flex-col sm:items-end">
                  <p class="font-mono text-sm font-bold text-white">
                    {{ format.price(item.product.price) }}
                  </p>

                  <button
                    type="button"
                    :disabled="removingProductId === item.product._id"
                    class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-(--color-text-muted) transition hover:text-(--color-danger) disabled:opacity-50"
                    @click="handleRemove(item.product._id)"
                  >
                    {{ removingProductId === item.product._id ? 'Removing...' : 'Remove' }}
                  </button>
                </div>
              </article>
            </div>
          </div>

          <!-- Summary -->
          <aside class="h-fit border border-(--color-border) bg-(--color-surface)">
            <div class="border-b border-(--color-border) px-6 py-5">
              <p
                class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-primary)"
              >
                Order Summary
              </p>

              <h2 class="mt-2 font-display text-2xl uppercase text-white">Checkout</h2>
            </div>

            <div class="space-y-5 p-6">
              <div class="flex justify-between text-xs">
                <span class="text-(--color-text-secondary)"> Products </span>

                <span class="text-white">
                  {{ cartStore.totalItems }}
                </span>
              </div>

              <div class="flex justify-between text-xs">
                <span class="text-(--color-text-secondary)"> Subtotal </span>

                <span class="text-white">
                  {{ format.price(cartStore.totalPrice) }}
                </span>
              </div>

              <div class="flex justify-between border-t border-(--color-border) pt-5">
                <span class="font-mono text-xs font-bold uppercase text-white"> Total </span>

                <span class="font-mono text-lg font-bold text-(--color-primary)">
                  {{ format.price(cartStore.totalPrice) }}
                </span>
              </div>

              <button
                type="button"
                :disabled="isCheckingOut"
                class="w-full bg-(--color-primary) px-5 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-black transition hover:opacity-90"
                @click="handleCheckout"
              >
                {{isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}}
              </button>

              <p class="text-center text-[11px] leading-5 text-(--color-text-muted)">
                Digital product. No shipping or delivery required.
              </p>
            </div>
          </aside>
        </section>

        <!-- Empty -->
        <section
          v-else
          class="border border-(--color-border) bg-(--color-surface) px-6 py-16 text-center sm:px-10"
        >
          <p
            class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)"
          >
            Apex Shop
          </p>

          <h2 class="mt-4 font-display text-3xl uppercase leading-none text-white sm:text-4xl">
            Your Cart Is Empty
          </h2>

          <p class="mx-auto mt-4 max-w-md text-sm leading-6 text-(--color-text-secondary)">
            Add a digital product to your cart before continuing to checkout.
          </p>

          <RouterLink
            to="/shop"
            class="mt-8 inline-block bg-(--color-primary) px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-black transition hover:opacity-90"
          >
            Shop Now
          </RouterLink>
        </section>
      </div>
    </AppContainer>
  </main>
</template>
