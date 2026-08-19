<script setup>
import { RouterLink } from 'vue-router'

import AppContainer from '../common/AppContainer.vue'
import BaseButton from '../ui/BaseButton.vue'
</script>

<template>
  <section class="overflow-hidden py-20 sm:py-24 lg:py-32 bg-(--color-background-secondary)">
    <AppContainer>
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <!-- left -->
        <div class="relative flax justify-center lg:justify-start">
          <div
            class="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 bg-(--color-primary) rounded-full opacity-12 blur-3xl"
          />

          <div class="relative w-64 transition duration-500 hover:rotate-[-4deg] sm:w-72 lg:w-80">
            <img
              src="../../assets/images/book_front.jpeg"
              alt="APEX Book"
              class="relative z-10 w-full object-contain drop-shadow-2xl rounded-2xl"
            />
          </div>
        </div>

        <!-- right -->
        <div>
          <p class="tetx-label text-(--color-primary)">Latest Release</p>
          <h2
            class="heading-section mt-4 max-w-xl text-3xl uppercase text-white sm:text-4xl lg:text-5xl"
          >
            Coaches Everyday <span class="text-(--color-primary)">Go-To-Book.</span>
          </h2>

          <p class="mt-6 max-w-xl text-sm leading-7 text-(--color-text-secondary) sm:text-base">
            A practical football development guide built to help players understand the game, train
            with purpose and build habits that translate onto the pitch.
          </p>

          <div class="mt-8 grid gap-4 sm:grid-cols-2">
            <div class="border-l border-(--color-primary) pl-4">
                <p class="font-mono text-xs font-bold uppercase text-white">Technical</p>
                <p class="mt-1 text:xs leading-5 text-(--color-text-muted)">Build the technical foundations that separate good players
                from great ones.</p>
            </div>
            <div class="border-l border-(--color-primary) pl-4">
                <p class="font-mono text-xs font-bold uppercase text-white">Tactical</p>
                <p class="mt-1 text:xs leading-5 text-(--color-text-muted)">Develop your understanding and make better decisions
                under pressure.</p>
            </div>
            <div class="border-l border-(--color-primary) pl-4">
                <p class="font-mono text-xs font-bold uppercase text-white">Mindset</p>
                <p class="mt-1 text:xs leading-5 text-(--color-text-muted)">Develop the mentality required to stay consistent
                throughout your development.</p>
            </div>
            <div class="border-l border-(--color-primary) pl-4">
                <p class="font-mono text-xs font-bold uppercase text-white">Training</p>
                <p class="mt-1 text:xs leading-5 text-(--color-text-muted)">Turn knowledge into structured training you can actually
                apply.</p>
            </div>
          </div>

          <div class="mt-9 flex flex-wrap gap-4">
            <baseButton size="lg">
            <Routerlink to="/shop">
                Shop the Playbook
            </Routerlink>
            </baseButton>
            <RouterLink to="/shop" class="inline-flex items-center font-mono text-xs font-bold uppercase tracking-wide text-white/70 transition hover:text-(--color-primary)">
                Learn More <span class="ml-2">→</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
<style lang="scss" scoped></style>
