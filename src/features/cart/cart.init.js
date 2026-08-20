import { useCartStore } from './store/cart.store'

export const initializeCart = async () => {
  const cartStore = useCartStore()

  if (cartStore.initialized) {
    return
  }

  try {
    await cartStore.loadCart()
  } catch (error) {
    console.error('Unable to initialize cart:', error)
  }
}