<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import AppContainer from '../components/common/AppContainer.vue'
import BaseButton from '../components/ui/BaseButton.vue'

import { getProgramBySlug } from '../features/programs/programs.api'

const route = useRoute()
const router = useRouter()

const program = ref(null)
const loading = ref(true)
const error = ref(null)

/**
 * Fetches the program using the slug from the current route.
 *
 * @returns {Promise<void>} Loads the program into the component state.
 */
const fetchProgram = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await getProgramBySlug(route.params.slug)

    program.value = response.data.data
  } catch (err) {
    console.error('Failed to load program:', err)
    error.value = 'Unable to load this program. Please try again.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchProgram)
</script>

<template>
  <main>
    <!-- Loading -->
    <section v-if="loading" class="py-32">
      <AppContainer>
        <div class="border border-(--color-border) bg-(--color-surface) p-10 text-center">
          <p
            class="font-mono text-xs font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
          >
            Loading program...
          </p>
        </div>
      </AppContainer>
    </section>

    <!-- Error -->
    <section v-else-if="error" class="py-32">
      <AppContainer>
        <div class="border border-(--color-border) bg-(--color-surface) p-10 text-center">
          <p class="font-mono text-xs font-bold uppercase tracking-[0.15em] text-red-400">
            {{ error }}
          </p>
        </div>
      </AppContainer>
    </section>

    <!-- Program -->
    <section v-else-if="program" class="py-24 sm:py-32">
      <AppContainer>
        <div class="grid gap-12 lg:grid-cols-2 lg:items-start">
          <!-- Image -->
          <div
            v-if="program.coverImage?.url"
            class="overflow-hidden border border-(--color-border)"
          >
            <img
              :src="program.coverImage.url"
              :alt="program.title"
              class="h-full w-full object-cover"
            />
          </div>

          <!-- Content -->
          <div>
            <p
              class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)"
            >
              {{ program.skillLevel }}
            </p>

            <h1
              class="mt-4 font-display text-5xl uppercase leading-[0.9] text-white sm:text-6xl lg:text-7xl"
            >
              {{ program.title }}
            </h1>

            <p
              v-if="program.shortDescription"
              class="mt-6 text-base leading-7 text-(--color-text-secondary)"
            >
              {{ program.shortDescription }}
            </p>

            <!-- Program details -->
            <div class="mt-8 grid border border-(--color-border) sm:grid-cols-3">
              <div class="border-b border-(--color-border) p-5 sm:border-b-0 sm:border-r">
                <p
                  class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-(--color-text-muted)"
                >
                  Price
                </p>

                <p class="mt-2 font-mono text-lg font-bold text-white">R{{ program.price }}</p>
              </div>

              <div class="border-b border-(--color-border) p-5 sm:border-b-0 sm:border-r">
                <p
                  class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-(--color-text-muted)"
                >
                  Duration
                </p>

                <p class="mt-2 font-mono text-sm font-bold text-white">
                  {{ program.sessionDuration || '—' }}
                </p>
              </div>

              <div class="p-5">
                <p
                  class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-(--color-text-muted)"
                >
                  Age Group
                </p>

                <p class="mt-2 font-mono text-sm font-bold text-white">
                  {{ program.ageGroup || '—' }}
                </p>
              </div>
            </div>

            <!-- Description -->
            <div class="mt-10">
              <h2 class="font-display text-2xl uppercase text-white">About the program</h2>

              <p class="mt-4 text-sm leading-7 text-(--color-text-secondary)">
                {{ program.description }}
              </p>
            </div>

            <!-- Features -->
            <div v-if="program.features?.length" class="mt-10">
              <h2 class="font-display text-2xl uppercase text-white">What's included</h2>

              <ul class="mt-5 space-y-3">
                <li
                  v-for="feature in program.features"
                  :key="feature"
                  class="flex items-center gap-3 text-sm text-(--color-text-secondary)"
                >
                  <span class="text-(--color-primary)">+</span>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <!-- CTA -->
            <div class="mt-10">
              <BaseButton
                @click="
                  router.push({
                    name: 'program-enquiry',
                    params: { slug: program.slug },
                  })
                "
              >
                Enquire About This Program
              </BaseButton>
            </div>
          </div>
        </div>
      </AppContainer>
    </section>
  </main>
</template>
