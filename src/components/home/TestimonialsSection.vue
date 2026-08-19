<script setup>
import AppContainer from '../common/AppContainer.vue'

const testimonials = [
  {
    quote:
      'Apex completely changed the way I approach my training. I understand what I am working on and why I am working on it.',
    name: 'Jordan M.',
    role: 'Academy Player',
  },
  {
    quote:
      'The sessions are intense, but every drill has a purpose. I noticed a difference in my confidence almost immediately.',
    name: 'Liam R.',
    role: 'Youth Player',
  },
  {
    quote:
      'The biggest difference is the attention to detail. Apex does not just train players, they teach players how to think.',
    name: 'Daniel K.',
    role: 'Parent',
  },
]
</script>

<template>
  <section class="bg-(--color-background-secondary) py-20 sm:py-24 lg:py-32">
    <AppContainer>
      <div class="flex flex-col md:flex-col md:items-start md:justify-between">
        <div>
          <p class="text-label text-(--color-primary)">Player Feedback</p>

          <h2 class="heading-section my-2 text-2xl uppercase text-white sm:text-3xl lg:text-4xl italic">
            What Players Say
          </h2>
        </div>

        <p
          class="max-w-md text-xs leading-6 text-(--color-text-secondary) sm:text-sm"
        >
          Development is measured on the pitch. Here's what the players we've worked with have to
          say.
        </p>
      </div>

      <div class="mt-12 grid gap-5 md:grid-cols-3">
        <article
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="flex min-h-72 flex-col justify-between border border-(--color-border) bg-(--color-surface) p-6 transition duration-300 hover:border-(--color-primary) sm:p-8"
        >
          <div>
            <span class="font-display text-4xl leading-none text-(--color-primary)"> " </span>

            <p class="mt-4 text-sm leading-7 text-(--color-text-secondary)">
              {{ testimonial.quote }}
            </p>
          </div>

          <div class="mt-8 border-t border-(--color-border) pt-5">
            <p class="font-mono text-xs font-bold uppercase text-white">
              {{ testimonial.name }}
            </p>

            <p
              class="mt-1 font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)"
            >
              {{ testimonial.role }}
            </p>
          </div>
        </article>
      </div>
    </AppContainer>
  </section>
</template>
