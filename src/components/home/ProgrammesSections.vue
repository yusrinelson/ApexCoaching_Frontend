<script setup>
import { RouterLink } from 'vue-router'

import AppContainer from '../common/AppContainer.vue'
import BaseButton from '../ui/BaseButton.vue'
import BaseCard from '../ui/BaseCard.vue'
import SectionHeading from '../common/SectionHeading.vue'

const programmes = [
  {
    title: 'Individual Training',
    description:
      'Focused one-on-one football training designed around your weaknesses, strengths and specific development goals.',
    image: '../../../images/programme1.jpeg',
    link: '/programs/private',
    tag: '01',
    price: 'R250 per session',
    time: '90min',
  },
  {
    title: 'Small Group Training',
    description:
      'Train in a competitive environment with focused technical work, decision-making and game-specific exercises.',
    image: '../../../images/programme2.jpeg',
    link: '/programs/group',
    tag: '02',
    price: 'R250 per session',
    time: '90min',
  },
  {
    title: 'Team Training',
    description:
      'Train in a competitive environment with focused technical work, decision-making and game-specific exercises.',
    image: '../../../images/programme3.jpeg',
    link: '/programs/team',
    tag: '03',
    price: 'R250 per session',
    time: '90min',
  },
  {
    title: 'Performance Training',
    description:
      'High-intensity sessions built for players looking to improve their physical performance and match readiness.',
    image: '../../../images/programme4.jpeg',
    link: '/programs/holiday-clinic',
    tag: '04',
    price: 'R250 per session',
    time: '45min',
  },
]
</script>

<template>
  <section class="bg-(--color-background) py-20 sm:py-24 lg:py-32">
    <AppContainer>
      <!-- Section heading -->
      <!-- <div>
        <div>
          <p class="text-label text-(--color-primary)">Programmes</p>

          <h2
            class="heading-section my-2 text-2xl uppercase text-white sm:text-3xl lg:text-4xl italic"
          >
            Train with intent
          </h2>
        </div>

        <p class="max-w-md font-mono text-xs leading-6 text-(--color-text-secondary) sm:text-sm">
          Coaching built around the demands of modern football. Choose the environment that fits
          your development.
        </p>
      </div> -->
      <SectionHeading
        eyebrow="Programmes"
        title="Train with intent"
        description=" Coaching built around the demands of modern football. Choose the environment that fits
          your development."
      />

      <!-- Programme cards -->
      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <BaseCard
          v-for="programme in programmes"
          :key="programme.tag"
          variant="interactive"
          class="group"
        >
          <!-- Image -->
          <div class="relative aspect-4/5 overflow-hidden">
            <img
              :src="programme.image"
              :alt="programme.title"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <!-- Image overlay -->
            <div class="absolute inset-0 bg-linear-to-t from-black via-black/75 to-transparent" />

            <div class="">
              <div
                class="absolute inset-x-0 top-0 h-20 w-full bg-linear-to-b from-black via-black/80"
              />
              <BaseButton
                class="absolute py-1! px-2! right-3 rounded-none! bg- top-3 font-mono text-xs font-bold text-black"
                >{{ programme.time }}</BaseButton
              >

              <span class="absolute left-3 top-3 font-mono text-xs font-bold text-white/70">
                / {{ programme.tag }}
              </span>
            </div>

            <!-- Card content -->
            <div class="absolute inset-x-0 bottom-0 p-5">
              <h6 class="text-xs text-(--color-primary) tracking-wider font-semibold">
                {{ programme.price }}
              </h6>
              <h3 class="font-mono text-lg font-bold uppercase text-white">
                {{ programme.title }}
              </h3>

              <p class="mt-3 text-xs leading-5 text-white/60">
                {{ programme.description }}
              </p>

              <RouterLink
                :to="programme.link"
                class="mt-5 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wide text-(--color-primary)"
              >
                Book Now
                <span class="transition group-hover:translate-x-1"> → </span>
              </RouterLink>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Bottom CTA -->
      <div class="mt-10 flex justify-center">
        <BaseButton variant="outline">
          <RouterLink to="/programs"> View all programmes </RouterLink>
        </BaseButton>
      </div>
    </AppContainer>
  </section>
</template>

<style lang="scss" scoped></style>
