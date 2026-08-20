<script setup>
import { ref, onMounted, computed } from 'vue'
// import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

import AppContainer from '../components/common/AppContainer.vue'
import SectionHeading from '../components/common/SectionHeading.vue'
import ProductCard from '../components/ui/ProductCard.vue'
import BaseButton from '../components/ui/BaseButton.vue'

import { getProducts } from '../features/products/product.api'
import { useCartStore } from '..//features/cart/store/cart.store'
// import { format } from '../utils/helper'

// const router = useRouter()
const cartStore = useCartStore()

const featuredProduct = computed(() => products.value[0] || null)
const products = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const addingProductId = ref(null)

const loadProducts = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const response = await getProducts()
    console.log('PRODUCT RESPONSE:', response)

    if (response.success) {
      products.value = response.data.products
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || 'Unable to load products. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const addToCart = async (productId) => {
  try {
    addingProductId.value = productId

     const response = await cartStore.addProduct(productId)

    console.log('CART AFTER ADD:', cartStore.totalItems)
    console.log('CART RESPONSE:', response.data)

    toast.success('Product added to cart.')
  } catch (error) {

    toast.error(error.response?.data?.message || 'Unable to add product to cart.')
  } finally {
    addingProductId.value = null
  }
}

// const products = [
//   {
//     name: 'The Apex Playbook',
//     description:
//       'The complete Apex guide to purposeful football training, development and performance.',
//     price: 'R299',
//     badge: 'Latest Release',
//   },

//   {
//     name: 'Apex Training Journal',
//     description:
//       'Track your sessions, goals, progress and development throughout your training journey.',
//     price: 'R199',
//     badge: 'Coming Soon',
//     available: false,
//   },

//   {
//     name: 'Apex Player Pack',
//     description: 'Essential Apex training resources designed to keep your development on track.',
//     price: 'R399',
//     badge: 'Coming Soon',
//     available: false,
//   },
// ]

onMounted(() => {
  loadProducts()
})
</script>

<template>
  <main>
    <!-- Hero -->
    <section class="relative overflow-hidden border-b border-(--color-border)">
      <AppContainer>
        <div class="flex min-h-[60vh] items-end py-24 sm:py-32 lg:py-20">
          <div class="max-w-5xl">
            <p
              class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)"
            >
              APEX Store
            </p>

            <h1
              class="mt-5 font-display text-4xl uppercase leading-[0.88] text-white sm:text-5xl lg:text-7xl"
            >
              Built For
              <br />
              The Game.
            </h1>

            <p class="mt-8 max-w-xl text-sm leading-7 text-(--color-text-secondary) sm:text-base">
              Training resources and tools designed to help you take your development further.
            </p>
          </div>
        </div>
      </AppContainer>
    </section>

    <!-- Products -->
    <section class="py-24 sm:py-32">
      <AppContainer>
        <SectionHeading
          eyebrow="The APEX Store"
          title="Tools for your development."
          description="Everything you need to keep your training purposeful, consistent and moving forward."
        />

        <!-- Loading -->
        <div
          v-if="isLoading"
          class="mt-14 border border-(--color-border) bg-(--color-surface) px-6 py-16 text-center"
        >
          <p class="font-mono text-xs font-bold uppercase tracking-[0.15em] text-(--color-primary)">
            Loading Products...
          </p>
        </div>

        <!-- Error -->
        <div
          v-else-if="errorMessage"
          class="mt-14 border border-(--color-danger)/30 bg-(--color-danger)/10 px-6 py-6"
        >
          <p class="font-mono text-xs text-(--color-danger)">
            {{ errorMessage }}
          </p>
        </div>

        <!-- Products -->
        <div v-else-if="products.length" class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProductCard
            v-for="product in products"
            :key="product._id"
            :product="product"
            @add-to-cart="addToCart(product._id)"
          />
        </div>

        <!-- Empty -->
        <div
          v-else
          class="mt-14 border border-(--color-border) bg-(--color-surface) px-6 py-16 text-center"
        >
          <p class="font-mono text-xs font-bold uppercase tracking-[0.15em] text-(--color-primary)">
            Store
          </p>

          <h2 class="mt-3 font-display text-3xl uppercase text-white">No Products Available</h2>
        </div>
      </AppContainer>
    </section>

    <!-- Featured product -->
    <section
      v-if="featuredProduct"
      class="border-y border-(--color-border) bg-(--color-background-secondary) py-24 sm:py-32"
    >
      <AppContainer>
        <div class="grid gap-12 lg:grid-cols-2 lg:items-center">
          <!-- Product image -->
          <RouterLink
            :to="`/shop/${featuredProduct.slug}`"
            class="group relative flex items-center justify-center overflow-hidden border border-(--color-border) bg-(--color-surface)"
          >
            <img
              v-if="featuredProduct.coverImage?.url"
              :src="featuredProduct.coverImage.url"
              :alt="featuredProduct.title"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <div v-else class="flex h-full w-full items-center justify-center">
              <div class="text-center">
                <p
                  class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)"
                >
                  apex
                </p>

                <h2
                  class="mt-4 font-display text-5xl uppercase leading-none text-white sm:text-7xl"
                >
                  {{ featuredProduct.title }}
                </h2>
              </div>
            </div>

            <!-- Badge -->
            <span
              class="absolute left-5 top-5 border border-(--color-primary) bg-(--color-background) px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-(--color-primary)"
            >
              Latest Release
            </span>
          </RouterLink>

          <!-- Content -->
          <div>
            <SectionHeading
              eyebrow="Latest Release"
              :title="featuredProduct.title"
              :description="featuredProduct.description || featuredProduct.shortDescription"
            />

            <div class="mt-8">
              <div class="flex items-center gap-5">
                <span class="font-display text-3xl text-white">
                  R{{ Number(featuredProduct.price).toFixed(2) }}
                </span>

                <span
                  class="font-mono text-[10px] uppercase tracking-wide text-(--color-text-muted)"
                >
                  Digital
                </span>
              </div>

              <div class="mt-6">
                <BaseButton
                  @click="addToCart(featuredProduct._id)"
                  :disabled="addingProductId === featuredProduct._id"
                >
                  {{ addingProductId === featuredProduct._id ? 'Adding...' : 'Add to Cart' }}
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </AppContainer>
    </section>
  </main>
</template>
