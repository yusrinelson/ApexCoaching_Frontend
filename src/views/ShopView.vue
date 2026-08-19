<script setup>
import AppContainer from '../components/common/AppContainer.vue'
import SectionHeading from '../components/common/SectionHeading.vue'
import ProductCard from '../components/ui/ProductCard.vue'
import BaseButton from '../components/ui/BaseButton.vue'

const products = [
  {
    name: 'The Apex Playbook',
    description:
      'The complete Apex guide to purposeful football training, development and performance.',
    price: 'R299',
    badge: 'Latest Release',
  },

  {
    name: 'Apex Training Journal',
    description:
      'Track your sessions, goals, progress and development throughout your training journey.',
    price: 'R199',
    badge: 'Coming Soon',
    available: false,
  },

  {
    name: 'Apex Player Pack',
    description: 'Essential Apex training resources designed to keep your development on track.',
    price: 'R399',
    badge: 'Coming Soon',
    available: false,
  },
]
</script>

<template>
  <main>
    <!-- Hero -->
    <section class="relative overflow-hidden border-b border-(--color-border)">
      <AppContainer>
        <div class="flex min-h-[60vh] items-end py-24 sm:py-32 lg:py-40">
          <div class="max-w-5xl">
            <p
              class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)"
            >
              APEX Store
            </p>

            <h1
              class="mt-5 font-display text-6xl uppercase leading-[0.88] text-white sm:text-7xl lg:text-9xl"
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

        <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProductCard
            v-for="product in products"
            :key="product.name"
            :name="product.name"
            :description="product.description"
            :price="product.price"
            :badge="product.badge"
            :available="product.available ?? true"
            :image="product.image"
          />
        </div>
      </AppContainer>
    </section>

    <!-- Featured product -->
    <section
      class="border-y border-(--color-border) bg-(--color-background-secondary) py-24 sm:py-32"
    >
      <AppContainer>
        <div class="grid gap-12 lg:grid-cols-2 lg:items-center">
          <!-- Book placeholder -->
          <div
            class="flex aspect-[4/5] items-center justify-center border border-(--color-border) bg-(--color-surface)"
          >
            <div class="text-center">
              <p
                class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)"
              >
                APEX
              </p>

              <h2 class="mt-4 font-display text-5xl uppercase leading-none text-white sm:text-7xl">
                The
                <br />
                Playbook.
              </h2>

              <p class="mt-5 font-mono text-xs uppercase tracking-wide text-(--color-text-muted)">
                Football Development
              </p>
            </div>
          </div>

          <!-- Content -->
          <div>
            <SectionHeading
              eyebrow="Latest Release"
              title="The Apex Playbook."
              description="A practical guide built around purposeful football development. Use it alongside your training to understand what to work on, how to work on it and why it matters."
            />

            <div class="mt-8">
              <div class="flex items-center gap-5">
                <span class="font-display text-3xl text-white"> R299 </span>

                <span
                  class="font-mono text-[10px] uppercase tracking-wide text-(--color-text-muted)"
                >
                  Digital
                </span>
              </div>

              <div class="mt-6">
                <BaseButton> Add to Cart </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </AppContainer>
    </section>
  </main>
</template>
