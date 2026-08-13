<script setup>
import { RouterLink } from 'vue-router'

import AppContainer from '../common/AppContainer.vue'
</script>

<template>
  <footer class="border-t border-[var(--color-border)] bg-black">
    <AppContainer>
      <div class="grid gap-12 py-16 md:grid-cols-4">

        <!-- Brand -->
        <div class="md:col-span-2">
          <RouterLink
            to="/"
            class="inline-flex items-center gap-2"
          >
            <span
              class="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)] font-bold text-black"
            >
              A
            </span>

            <span class="text-xl font-bold">
              APEX.
            </span>
          </RouterLink>

          <p class="mt-5 max-w-md text-sm leading-7 text-[var(--color-text-secondary)]">
            Apex Coaching delivers academy-grade football training
            and coaching resources for ambitious players, parents and clubs.
          </p>
        </div>


        <!-- Train -->
        <div>
          <h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Train
          </h3>

          <div class="mt-5 flex flex-col gap-3 text-sm text-[var(--color-text-secondary)]">
            <RouterLink
              to="/programs/private"
              class="transition hover:text-[var(--color-primary)]"
            >
              Private Coaching
            </RouterLink>

            <RouterLink
              to="/programs/group"
              class="transition hover:text-[var(--color-primary)]"
            >
              Small Group
            </RouterLink>

            <RouterLink
              to="/programs/team"
              class="transition hover:text-[var(--color-primary)]"
            >
              Team Coaching
            </RouterLink>

            <RouterLink
              to="/programs/holiday-clinic"
              class="transition hover:text-[var(--color-primary)]"
            >
              Holiday Clinic
            </RouterLink>
          </div>
        </div>


        <!-- Company -->
        <div>
          <h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Company
          </h3>

          <div class="mt-5 flex flex-col gap-3 text-sm text-[var(--color-text-secondary)]">
            <RouterLink
              to="/about"
              class="transition hover:text-[var(--color-primary)]"
            >
              About
            </RouterLink>

            <RouterLink
              to="/shop"
              class="transition hover:text-[var(--color-primary)]"
            >
              Shop Books
            </RouterLink>

            <RouterLink
              to="/testimonials"
              class="transition hover:text-[var(--color-primary)]"
            >
              Testimonials
            </RouterLink>

            <RouterLink
              to="/contact"
              class="transition hover:text-[var(--color-primary)]"
            >
              Contact
            </RouterLink>
          </div>
        </div>

      </div>


      <!-- Bottom -->
      <div
        class="
          flex
          flex-col
          gap-4
          border-t
          border-[var(--color-border)]
          py-6
          text-xs
          text-[var(--color-text-muted)]
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <p>
          © {{ new Date().getFullYear() }} Apex Coaching. All rights reserved.
        </p>

        <div class="flex gap-5">
          <a href="#" class="hover:text-white">Instagram</a>
          <a href="#" class="hover:text-white">YouTube</a>
          <a href="#" class="hover:text-white">TikTok</a>
        </div>
      </div>
    </AppContainer>
  </footer>
</template>