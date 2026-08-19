<script setup>
import AppContainer from '../components/common/AppContainer.vue'
import SectionHeading from '../components/common/SectionHeading.vue'
import ProgramCard from '../components/ui/ProgramCard.vue'
import BaseButton from '../components/ui/BaseButton.vue'

const programmes = [
  {
    title: 'Individual Training',
    description:
      'Focused one-on-one football training designed around your weaknesses, strengths and specific development goals.',
    duration: '60 MIN',
    level: 'ALL LEVELS',
    price: 'From R350',
  },

  {
    title: 'Small Group Training',
    description:
      'Train in a competitive environment with focused technical work, decision-making and game-specific exercises.',
    duration: '90 MIN',
    level: 'GROUP',
    price: 'From R250',
  },

  {
    title: 'Performance Training',
    description:
      'High-intensity sessions built for players looking to improve their physical performance and match readiness.',
    duration: '90 MIN',
    level: 'ADVANCED',
    price: 'From R400',
  },
]
</script>

<template>
  <main>
    <section class="relative overflow-hidden border-b border-(--color-border)">
      <AppContainer>
        <div class="flex min-h-[65vh] items-end py-24 sm:py-32 lg:py-40">
          <div class="max-w-5xl">
            <p
              class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)"
            >
              APEX Coaching
            </p>

            <h1
              class="mt-5 font-display text-6xl uppercase leading-[0.88] text-white sm:text-7xl lg:text-9xl"
            >
              Train
              <br />
              With Intent.
            </h1>

            <p class="mt-8 max-w-xl text-sm leading-7 text-(--color-text-secondary) sm:text-base">
              Purposeful football training designed to develop your technical ability,
              decision-making and confidence.
            </p>
          </div>
        </div>
      </AppContainer>
    </section>

    <!-- Programmes -->
    <section class="py-24 sm:py-32">
      <AppContainer>
        <SectionHeading
          eyebrow="Training Programmes"
          title="Built around your game."
          description="Choose a training option that matches where you are now and where you want to go."
        />

        <div class="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProgramCard
            v-for="programme in programmes"
            :key="programme.title"
            :title="programme.title"
            :description="programme.description"
            :duration="programme.duration"
            :level="programme.level"
            :price="programme.price"
          />
        </div>
      </AppContainer>
    </section>

    <!-- Philosophy -->
    <section
      class="border-y border-(--color-border) bg-(--color-background-secondary) py-24 sm:py-32"
    >
      <AppContainer>
        <div class="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="The Apex Method"
            title="Every session has a purpose."
            description="We don't train for the sake of training. Every drill, movement and decision is designed to move your game forward."
          />

          <div
            class="grid gap-px border border-(--color-border) bg-(--color-border) sm:grid-cols-2"
          >
            <div class="bg-(--color-background-secondary) p-6">
              <span class="font-mono text-xs font-bold text-(--color-primary)"> 01 </span>

              <h3 class="mt-8 font-display text-xl uppercase text-white">Intent</h3>

              <p class="mt-3 text-sm leading-6 text-(--color-text-secondary)">
                Know exactly what you're working on and why.
              </p>
            </div>

            <div class="bg-(--color-background-secondary) p-6">
              <span class="font-mono text-xs font-bold text-(--color-primary)"> 02 </span>

              <h3 class="mt-8 font-display text-xl uppercase text-white">Consistency</h3>

              <p class="mt-3 text-sm leading-6 text-(--color-text-secondary)">
                Progress comes from showing up and doing the work.
              </p>
            </div>

            <div class="bg-(--color-background-secondary) p-6">
              <span class="font-mono text-xs font-bold text-(--color-primary)"> 03 </span>

              <h3 class="mt-8 font-display text-xl uppercase text-white">Progress</h3>

              <p class="mt-3 text-sm leading-6 text-(--color-text-secondary)">
                Track your development and keep pushing forward.
              </p>
            </div>

            <div class="bg-(--color-background-secondary) p-6">
              <span class="font-mono text-xs font-bold text-(--color-primary)"> 04 </span>

              <h3 class="mt-8 font-display text-xl uppercase text-white">Performance</h3>

              <p class="mt-3 text-sm leading-6 text-(--color-text-secondary)">
                Turn training into performance when it matters.
              </p>
            </div>
          </div>
        </div>
      </AppContainer>
    </section>

    <!-- CTA -->
    <section class="py-24 sm:py-32">
      <AppContainer>
        <div
          class="relative overflow-hidden border border-(--color-border) bg-(--color-surface) px-6 py-16 text-center sm:px-12 lg:py-24"
        >
          <div
            class="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[10rem] uppercase leading-none text-white/2 sm:text-[16rem]"
          >
            APEX
          </div>

          <div class="relative">
            <p
              class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)"
            >
              Ready?
            </p>

            <h2
              class="mx-auto mt-4 max-w-3xl font-display text-4xl uppercase leading-none text-white sm:text-6xl"
            >
              Take your game to the next level.
            </h2>

            <p class="mx-auto mt-5 max-w-lg text-sm leading-6 text-(--color-text-secondary)">
              Book your next training session and start putting purposeful work into your game.
            </p>

            <div class="mt-8">
              <BaseButton> Book Training </BaseButton>
            </div>
          </div>
        </div>
      </AppContainer>
    </section>
  </main>
</template>
