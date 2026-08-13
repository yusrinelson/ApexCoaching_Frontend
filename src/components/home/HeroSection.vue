<script setup>
import { RouterLink } from 'vue-router'

import hero from '../../assets/images/hero.jpeg'
import AppContainer from '../common/AppContainer.vue'
import BaseBadge from '../ui/BaseBadge.vue'
import BaseButton from '../ui/BaseButton.vue'
</script>

<template>
  <section class="relative min-h-screen overflow-hidden pt-20">
    <div class="absolute inset-0">
      <img :src="hero" alt="" class="w-full h-full object-cover object-center" />
      <div class="absolute inset-0 bg-black/25" />
      <div class="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
    </div>

    <AppContainer>
      <div class="relative flex min-h-[calc(100vh-5rem)] items-center py-20">
        <div class="max-w-4xl">
          <BaseBadge> Apex Coaching · Est. 2024 </BaseBadge>

          <h1
            class="mt-6 max-w-4xl font-(--font-display) text-5xl uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl italic font-extrabold"
          >
            Train Like <span class="text-(--color-primary)">the pros.</span>
          </h1>
          <p>
            Academy-grade football coaching, holiday clinics and the books used in over 40 coaching
            environments worldwide. Built for players who refuse to plateau.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <BaseButton size="lg">
              <RouterLink to="/booking"> Book Training </RouterLink>
            </BaseButton>

            <BaseButton variant="outline" size="lg">
              <RouterLink to="/shop"> Shop Books </RouterLink>
            </BaseButton>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style lang="scss" scoped></style>
