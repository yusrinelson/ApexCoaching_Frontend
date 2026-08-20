import { defineStore } from 'pinia'

import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from '../cart.api'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    totalItems: 0,
    totalPrice: 0,
    isLoading: false,
    initialized: false,
  }),

  getters: {
    itemCount: (state) => state.totalItems,
    total: (state) => state.totalPrice,
  },

  actions: {
    updateCart(cart) {
      this.items = cart.items || []

      this.totalItems = this.items.length

      this.totalPrice = this.items.reduce((total, item) => {
        return total + Number(item.product?.price || 0)
      }, 0)
    },

    async loadCart() {
      this.isLoading = true

      try {
        const response = await getCart()

        if (response.success) {
          this.updateCart(response.data)
        }

        this.initialized = true

        return response
      } finally {
        this.isLoading = false
      }
    },

    async addProduct(productId) {
      const response = await addToCart(productId)

      if (response.success) {
        this.updateCart(response.data)
      }

      return response
    },

    async removeProduct(productId) {
      const response = await removeFromCart(productId)

      if (response.success) {
        this.updateCart(response.data)
      }

      return response
    },

    async clear() {
      const response = await clearCart()

      if (response.success) {
        this.updateCart(response.data)
      }

      return response
    },

    reset() {
      this.items = []
      this.totalItems = 0
      this.totalPrice = 0
      this.initialized = false
    },
  },
})

export const initializeCart = async () => {
  const cartStore = useCartStore()

  if (cartStore.initialized) {
    return
  }

  try {
    await cartStore.loadCart()
  } catch (error) {
    // User may not be logged in yet.
    // Don't break the application if cart loading fails.
    console.error('Cart initialization failed:', error)
  }
}