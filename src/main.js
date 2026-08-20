import './assets/main.css'
import 'vue-sonner/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { Toaster } from 'vue-sonner'

import App from './App.vue'
import router from './router'

import { setupAuthInterceptor } from './features/auth/auth.interceptor'
import { initializeCart } from './features/cart/cart.init'
// import { initializeAuth } from './features/auth/auth.init'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// app.component('VueToaster', Toaster)

setupAuthInterceptor()
initializeCart()

app.mount('#app')
