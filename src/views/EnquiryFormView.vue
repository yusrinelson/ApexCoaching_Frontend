<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import AppContainer from '../components/common/AppContainer.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import {format}  from '../utils/helper'

import { getProgramBySlug } from '../features/programs/programs.api'
import { createEnquiry } from '../features/enquiries/enquiries.api'

const route = useRoute()
const router = useRouter()

const program = ref(null)
const loading = ref(true)
const submitting = ref(false)
const error = ref(null)

const form = ref({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  phone: '',
  message: '',
})

/**
 * Fetches the selected program using the route slug.
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

/**
 * Submits the enquiry and opens WhatsApp with the enquiry details.
 *
 * @returns {Promise<void>} Creates the enquiry and opens WhatsApp.
 */
const submitEnquiry = async () => {
  submitting.value = true
  error.value = null

  try {
    const response = await createEnquiry({
      program: program.value._id,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      dateOfBirth: form.value.dateOfBirth,
      phone: form.value.phone,
      message: form.value.message,
    })

    const enquiry = response.data.data

    //format date of birth
    enquiry.dateOfBirth = format.date(enquiry.dateOfBirth) 

    const whatsappMessage = [
      'Hi Coach, I have submitted a coaching enquiry.',
      '',
      `Program: ${program.value.title}`,
      `Player: ${enquiry.firstName} ${enquiry.lastName}`,
      `Date of Birth: ${enquiry.dateOfBirth}`,
      `Phone: ${enquiry.phone}`,
      '',
      `Message: ${enquiry.message || 'No additional message.'}`,
      '',
      `Enquiry ID: ${enquiry.reference}`,
    ].join('\n')

    const whatsappUrl = `https://wa.me/27797738156?text=${encodeURIComponent(
      whatsappMessage,
    )}`

    window.open(whatsappUrl, '_blank')

    router.push({
      name: 'dashboard',
    })
  } catch (err) {
    console.error('Failed to create enquiry:', err)

    error.value =
      err.response?.data?.error?.message ||
      'Unable to submit your enquiry. Please try again.'
  } finally {
    submitting.value = false
  }
}

onMounted(fetchProgram)
</script>

<template>
  <main>
    <section v-if="loading" class="py-32">
      <AppContainer>
        <div class="border border-(--color-border) bg-(--color-surface) p-10 text-center">
          <p
            class="font-mono text-xs font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
          >
            Loading...
          </p>
        </div>
      </AppContainer>
    </section>

    <section v-else-if="error && !program" class="py-32">
      <AppContainer>
        <div class="border border-(--color-border) bg-(--color-surface) p-10 text-center">
          <p class="font-mono text-xs font-bold uppercase text-red-400">
            {{ error }}
          </p>
        </div>
      </AppContainer>
    </section>

    <section v-else-if="program" class="py-24 sm:py-32">
      <AppContainer>
        <div class="mx-auto max-w-3xl">
          <div class="mb-12">
            <p
              class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)"
            >
              Coaching Enquiry
            </p>

            <h1
              class="mt-4 font-display text-5xl uppercase leading-[0.9] text-white sm:text-6xl"
            >
              {{ program.title }}
            </h1>

            <p class="mt-5 text-sm leading-7 text-(--color-text-secondary)">
              Complete the form below and we'll get back to you to arrange the
              coaching session.
            </p>
          </div>

          <form
            class="space-y-8 border border-(--color-border) bg-(--color-surface) p-6 sm:p-10"
            @submit.prevent="submitEnquiry"
          >
            <div class="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  for="firstName"
                  class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-(--color-text-muted)"
                >
                  Player First Name
                </label>

                <input
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  required
                  class="mt-3 w-full border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm text-white outline-none transition focus:border-(--color-primary)"
                />
              </div>

              <div>
                <label
                  for="lastName"
                  class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-(--color-text-muted)"
                >
                  Player Last Name
                </label>

                <input
                  id="lastName"
                  v-model="form.lastName"
                  type="text"
                  required
                  class="mt-3 w-full border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm text-white outline-none transition focus:border-(--color-primary)"
                />
              </div>
            </div>

            <div>
              <label
                for="dateOfBirth"
                class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-(--color-text-muted)"
              >
                Date of Birth
              </label>

              <input
                id="dateOfBirth"
                v-model="form.dateOfBirth"
                type="date"
                required
                class="mt-3 w-full border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm text-white outline-none transition focus:border-(--color-primary)"
              />
            </div>

            <div>
              <label
                for="phone"
                class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-(--color-text-muted)"
              >
                Phone Number
              </label>

              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                required
                class="mt-3 w-full border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm text-white outline-none transition focus:border-(--color-primary)"
              />
            </div>

            <div>
              <label
                for="message"
                class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-(--color-text-muted)"
              >
                Message
              </label>

              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                placeholder="Tell us anything we should know..."
                class="mt-3 w-full resize-none border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm text-white outline-none transition placeholder:text-(--color-text-muted) focus:border-(--color-primary)"
              ></textarea>
            </div>

            <div
              v-if="error"
              class="border border-red-500/30 bg-red-500/5 p-4"
            >
              <p class="font-mono text-xs text-red-400">
                {{ error }}
              </p>
            </div>

            <div class="flex justify-end">
              <BaseButton type="submit" :disabled="submitting">
                {{ submitting ? 'Submitting...' : 'Submit Enquiry' }}
              </BaseButton>
            </div>
          </form>
        </div>
      </AppContainer>
    </section>
  </main>
</template>