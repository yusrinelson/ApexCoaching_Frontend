<script setup>
import AppContainer from '../common/AppContainer.vue'
// import SectionHeading from '../common/SectionHeading.vue'

const reasons = [
  {
    number: '01',
    title: 'Train With Intent',
    description:
      'Every session has a purpose. We focus on the details that actually move your game forward.',
  },
  {
    number: '02',
    title: 'Real Football',
    description:
      'Training is built around the decisions, pressure and intensity players experience in real matches.',
  },
  {
    number: '03',
    title: 'Individual Development',
    description:
      'Your development is personal. We identify your strengths, weaknesses and the areas that matter most.',
  },
  {
    number: '04',
    title: 'Built To Last',
    description:
      'The goal is not a quick improvement. We build habits, understanding and confidence that stay with you.',
  },
]
</script>

<template>
  <section class="bg-(--color-background) py-20 sm:py-24 lg:py-32">
    <AppContainer>
      <div class="max-w-4xl">
        <p class="text-label text-(--color-primary)">The Apex Difference</p>

        <h2 class="heading-section my-2 text-2xl uppercase text-white sm:text-3xl lg:text-4xl italic">
          Built for serious
          <span class="text-(--color-primary)"> players. </span>
        </h2>

        <p class="max-w-md text-xs leading-6 text-(--color-text-secondary) sm:text-sm">
          Four reasons coaches and parents trust Apex to develop the next generation of players.

        </p>
      </div>
      


      <div class="mt-14 border-t border-(--color-border)">
        <article
          v-for="reason in reasons"
          :key="reason.number"
          class="grid gap-5 border-b border-(--color-border) py-8 sm:grid-cols-[80px_1fr_1.5fr] sm:items-start sm:gap-8 lg:py-10"
        >
          <span class="font-mono text-xs font-bold text-(--color-primary)">
            / {{ reason.number }}
          </span>

          <h3 class="font-mono text-lg font-bold uppercase text-white sm:text-xl">
            {{ reason.title }}
          </h3>

          <p class="max-w-xl text-sm leading-7 text-(--color-text-secondary)">
            {{ reason.description }}
          </p>
        </article>
      </div>
    </AppContainer>
  </section>
</template>
