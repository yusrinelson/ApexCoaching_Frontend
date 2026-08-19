<script setup>
const stats = [
  {
    value: '500+',
    label: 'Players Coached',
  },
  {
    value: '12',
    label: 'Years Coaching',
  },
  {
    value: '4,500+',
    label: 'Sessions Delivered',
  },
  {
    value: '92%',
    label: 'Success Rate',
  },
]
</script>

<template>
  <section class="border-y border-[var(--color-border)] bg-[var(--color-background-secondary)]">
    <AppContainer>
      <div class="grid grid-cols-2 md:grid-cols-4">

        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="
            border-[var(--color-border)]
            px-6
            py-10
            text-center
            md:py-12
          "
          :class="{
            'border-r': index !== stats.length - 1,
          }"
        >

          <div
            class="
              heading-display
              text-3xl
              sm:text-4xl
              lg:text-5xl
            "
          >
            {{ stat.value }}
          </div>

          <div
            class="
              mt-3
              font-mono
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-[var(--color-text-muted)]
              sm:text-xs
            "
          >
            {{ stat.label }}
          </div>

        </div>

      </div>
    </AppContainer>
  </section>
</template>