<script setup>
import { RouterLink } from 'vue-router'

import AppContainer from '../common/AppContainer.vue'
import BaseButton from '../ui/BaseButton.vue'
</script>

<template>
  <section class="relative overflow-hidden bg-(--color-primary) py-20 sm:py-24 lg:py-32">
    <!-- Decorative typography -->
    <marquee
      class="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 font-display text-[14rem] uppercase leading-none text-black/5 lg:block"
    >
      APEX COACHING
    </marquee>

    <AppContainer>
      <div class="relative z-10 max-w-4xl">
        <p class="text-label text-black/60">Your next level starts here</p>

        <h2 class="heading-display text-5xl uppercase text-black sm:text-6xl lg:text-8xl">
          Train.
          <br />
          Develop.
          <br />
          Perform.
        </h2>

        <p class="mt-7 max-w-xl text-sm leading-7 text-black/70 sm:text-base">
          Ready to take your game seriously? Start your Apex journey and train with intent.
        </p>

        <div class="mt-9 flex flex-wrap gap-4">
          <BaseButton variant="dark" size="lg">
            <RouterLink to="/register"> Start Training </RouterLink>
          </BaseButton>

          <RouterLink
            to="/programs"
            class="inline-flex items-center font-mono text-xs font-bold uppercase tracking-wide text-black transition hover:opacity-60"
          >
            Explore programmes
            <span class="ml-2"> → </span>
          </RouterLink>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
