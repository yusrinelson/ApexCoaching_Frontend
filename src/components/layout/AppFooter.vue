<script setup>
import { RouterLink } from 'vue-router'

import AppContainer from '../common/AppContainer.vue'

const footerLinks = [
  {
    name: 'Programmes',
    to: '/programs',
  },
  {
    name: 'About',
    to: '/about',
  },
  {
    name: 'Shop',
    to: '/shop',
  },
  {
    name: 'Contact',
    to: '/contact',
  },
]
</script>

<template>
  <footer class="border-t border-(--color-border) bg-black">
    <AppContainer>
      <div class="grid gap-10 py-16 md:grid-cols-5">
        <!-- Brand -->
        <div class="md:col-span-2">
          <RouterLink to="/" class="inline-flex items-center gap-2">
            <span
              class="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-primary) font-bold text-black"
            >
              A
            </span>

            <span class="text-xl font-bold font-display">
              APEX <span class="text-(--color-primary) -ml-1">.</span>
            </span>
          </RouterLink>

          <p class="mt-5 max-w-md text-sm leading-7 text-(--color-text-secondary)">
            Apex Coaching delivers academy-grade football training and coaching resources for
            ambitious players, parents and clubs.
          </p>
        </div>

        <!-- Train -->
        <div>
          <h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-white">Train</h3>

          <div class="font-mono mt-5 flex flex-col gap-3 text-xs">
            <RouterLink
              to="/programs/private"
              class="transition hover:text-(--color-primary) (--color-text-secondary)"
            >
              Private Coaching
            </RouterLink>

            <RouterLink to="/programs/group" class="transition hover:text-(--color-primary)">
              Small Group
            </RouterLink>

            <RouterLink to="/programs/team" class="transition hover:text-(--color-primary)">
              Team Coaching
            </RouterLink>

            <RouterLink
              to="/programs/holiday-clinic"
              class="transition hover:text-(--color-primary)"
            >
              Holiday Clinic
            </RouterLink>
          </div>
        </div>

        <!-- explore section -->
        <div>
          <h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-white">Explore</h3>

          <nav class="mt-4 flex flex-col gap-3">
            <RouterLink
              v-for="link in footerLinks"
              :key="link.name"
              :to="link.to"
              class="w-fit font-mono text-xs tracking-wide text-(--color-text-secondary) transition hover:text-(--color-primary)"
            >
              {{ link.name }}
            </RouterLink>
          </nav>
        </div>

        <div>
          <h3 class="text-xs font-bold uppercase tracking-[0.15em] text-white">Get in touch</h3>

          <div class="mt-4 space-y-3">
            <a
              href="mailto:info@apexcoaching.co.za"
              class="block font-mono text-xs text-(--color-text-secondary) transition hover:text-(--color-primary)"
            >
              info@apexcoaching.co.za
            </a>

            <p class="font-mono text-xs text-(--color-text-secondary)">Cape Town, South Africa</p>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div
        class="flex flex-col gap-4 border-t border-(--color-border) py-6 text-xs text-(--color-text-muted) sm:flex-row sm:items-center sm:justify-between"
      >
        <p class="font-mono text-xs text-(--color-text-muted)">
          © {{ new Date().getFullYear() }} Apex Coaching. All rights reserved.
        </p>

        <!-- <div class="flex gap-5">
          <a href="#" class="hover:text-white">Instagram</a>
          <a href="#" class="hover:text-white">YouTube</a>
          <a href="#" class="hover:text-white">TikTok</a>
        </div> -->

        <!-- link to dev github -->
        <a href="https://github.com/yusrinelson" target="_blank" class="hover:text-white">
          Designed & Developed by Yusri Nelson
        </a>
      </div>
    </AppContainer>
  </footer>
</template>
