<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../auth/auth.store'
import { getProfile, updateProfile, changePassword } from '../../profile/profile.api'

const authStore = useAuthStore()
const isLoading = ref(false)
const isSaving = ref(false)
const isChangingPassword = ref(false)

const errorMessage = ref('')
const successMessage = ref('')

const profileImagePreview = ref(authStore.user?.profileImage || null)
const selectedProfileImage = ref(null)
const isEditing = ref(false)
const showPasswordForm = ref(false)

const loadProfile = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const response = await getProfile()

    if (response.success) {
      authStore.user = response.data
      populateForm(response.data)
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || 'Unable to load profile. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const saveProfile = async () => {
  try {
    isSaving.value = true
    errorMessage.value = ''
    successMessage.value = ''

    const formData = new FormData()

    formData.append('firstName', form.value.firstName)
    formData.append('lastName', form.value.lastName)
    // formData.append('email', form.value.email)
    formData.append('phone', form.value.phone)

    if (selectedProfileImage.value) {
      formData.append('profileImage', selectedProfileImage.value)
    }
    console.log('Selected image:', selectedProfileImage.value)
    console.log('FormData image:', formData.get('profileImage'))

    const response = await updateProfile(formData)

    if (response.success) {
      authStore.user = response.data
      populateForm(response.data)

      selectedProfileImage.value = null
      isEditing.value = false

      successMessage.value = 'Profile updated successfully'
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Failed to update your profile.'
  } finally {
    isSaving.value = false
  }
}

const savePassword = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (
    !passwordForm.value.currentPassword ||
    !passwordForm.value.newPassword ||
    !passwordForm.value.confirmPassword
  ) {
    errorMessage.value = 'Please complete all password fields.'
    return
  }

  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    errorMessage.value = 'New Passwords do not match'
    return
  }

  try {
    isChangingPassword.value = true

    const response = await changePassword(
      passwordForm.value.currentPassword,
      passwordForm.value.newPassword,
    )

    if (response.success) {
      passwordForm.value = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }

      showPasswordForm.value = false

      successMessage.value = response.message || 'Password changed successfully.'
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Failed to change your password.'
  } finally {
    isChangingPassword.value = false
  }
}

const form = ref({
  firstName: authStore.user?.firstName || '',
  lastName: authStore.user?.lastName || '',
  email: authStore.user?.email || '',
  phone: authStore.user?.phone || '',
})

const populateForm = (user) => {
  form.value = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
  }

  profileImagePreview.value = user?.profileImage || null
}

const startEditing = () => {
  populateForm(authStore.user)
  errorMessage.value = ''
  successMessage.value = ''
  isEditing.value = true
}

const cancelEditing = () => {
  isEditing.value = false
}

const handleImageChange = (event) => {
  const file = event.target.files?.[0]

  if (!file) return

  selectedProfileImage.value = file
  profileImagePreview.value = URL.createObjectURL(file)
}

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const openPasswordForm = () => {
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  }

  showPasswordForm.value = true
}

onMounted(() => {
  loadProfile()
})
</script>

<template>
  <div class="space-y-10">
    <section>
      <p class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)">
        Apex Account
      </p>

      <div class="mt-3">
        <h1 class="font-display text-4xl uppercase leading-none text-white sm:text-5xl lg:text-6xl">
          Your Profile
        </h1>
        <p class="mt-5 max-w-xl text-sm leading-6 text-(--color-text-secondary)">
          Manage your personal information and keep your Apex account up to date.
        </p>
      </div>
    </section>

    <p
      v-if="successMessage"
      class="border border-(--color-success)/30 bg-(--color-success)/10 px-4 py-3 font-mono text-xs text-(--color-success)"
    >
      {{ successMessage }}
    </p>
    <p
      v-if="errorMessage"
      class="border border-(--color-danger)/30 bg-(--color-danger)/10 px-4 py-3 font-mono text-xs text-(--color-danger)"
    >
      {{ errorMessage }}
    </p>

    <section class="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div class="border border-(--color-border) bg-(--color-surface)">
        <div
          class="border-b border-(--color-border) px-6 py-5 gap-2 flex flex-col items-start md:items-center justify-between md:flex-row"
        >
          <div>
            <p
              class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-primary)"
            >
              Account
            </p>

            <h2 class="mt-2 font-display text-2xl uppercase text-white">Personal Information</h2>
          </div>
          <button
            v-if="!isEditing"
            type="button"
            class="px-4 py-2 font-mono border border-(--color-primary) text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-primary]"
            @click="startEditing"
          >
            Edit Profile
          </button>
        </div>

        <!-- view mode -->
        <div v-if="!isEditing" class="grid gap-6 p-6 sm:grid-cols-2">
          <div>
            <p
              class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
            >
              First Name
            </p>

            <p class="mt-2 text-sm text-white">
              {{ authStore.user?.firstName || '—' }}
            </p>
          </div>

          <div>
            <p
              class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
            >
              Last Name
            </p>

            <p class="mt-2 text-sm text-white">
              {{ authStore.user?.lastName || '—' }}
            </p>
          </div>

          <div>
            <p
              class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
            >
              Email
            </p>

            <p class="mt-2 break-all text-sm text-white">
              {{ authStore.user?.email || '—' }}
            </p>
          </div>

          <div>
            <p
              class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
            >
              Phone
            </p>

            <p class="mt-2 text-sm text-white">
              {{ authStore.user?.phone || '—' }}
            </p>
          </div>
        </div>

        <!-- edit mode -->
        <form v-else class="space-y-6 p-6" @submit.prevent="saveProfile">
          <div class="grid gap-6 sm:grid-cols-2">
            <div class="border-b border-(--color-border) pb-6">
              <label
                for="profileImage"
                class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
              >
                Profile Image
              </label>

              <div class="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div
                  class="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-(--color-primary) bg-(--color-background)"
                >
                  <img
                    v-if="profileImagePreview"
                    :src="profileImagePreview"
                    alt="Profile"
                    class="h-full w-full object-cover"
                  />

                  <span v-else class="font-display text-3xl uppercase text-(--color-primary)">
                    {{ authStore.user?.firstName?.charAt(0) || 'U' }}
                  </span>
                </div>

                <div>
                  <label
                    for="profileImage"
                    class="inline-block cursor-pointer border border-(--color-border) px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white transition hover:border-(--color-primary) hover:text-(--color-primary)"
                  >
                    Choose Image
                  </label>

                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleImageChange"
                  />

                  <p class="mt-2 text-[11px] text-(--color-text-muted)">
                    JPG, PNG or WebP. Choose a clear profile image.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label
                for="firstName"
                class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
              >
                First Name
              </label>

              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                class="mt-2 w-full border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm text-white outline-none transition placeholder:text-(--color-text-muted) focus:border-(--color-primary)"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label
                for="lastName"
                class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
              >
                Last Name
              </label>

              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                class="mt-2 w-full border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm text-white outline-none transition placeholder:text-(--color-text-muted) focus:border-(--color-primary)"
                placeholder="Enter your last name"
              />
            </div>
            <div>
              <label
                for="email"
                class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
              >
                Email
              </label>
              <input
                id="email"
                :value="authStore.user?.email || ''"
                type="email"
                disabled
                class="mt-2 w-full cursor-not-allowed border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm text-(--color-text-muted)"
              />
              <p class="mt-2 text-[11px] text-(--color-text-muted)">
                Email address cannot be changed here.
              </p>
            </div>
            <div>
              <label
                for="phone"
                class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
              >
                Phone
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                class="mt-2 w-full border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm text-white outline-none transition placeholder:text-(--color-text-muted) focus:border-(--color-primary)"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div
            class="flex flex-col gap-3 border-t border-(--color-border) pt-6 sm:flex-row sm:justify-end"
          >
            <button
              type="button"
              class="border border-(--color-border) px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-(--color-text-secondary) transition hover:border-white hover:text-white"
              @click="cancelEditing"
            >
              Cancel
            </button>

            <button
              type="submit"
              :disabled="isSaving"
              class="bg-(--color-primary) px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-black transition hover:opacity-90"
            >
              {{ isSaving ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>

      <div class="border border-(--color-border) bg-(--color-surface)">
        <div class="border-b border-(--color-border) px-6 py-5">
          <p
            class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-primary)"
          >
            Apex Member
          </p>

          <h2 class="mt-2 font-display text-2xl uppercase text-white">Account</h2>
        </div>

        <div class="p-6">
          <div
            class="flex h-16 w-16 items-center justify-center rounded-full border border-(--color-primary) bg-(--color-background) font-display text-2xl uppercase text-(--color-primary)"
          >
            <!-- image of user -->
            <div
              class="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-(--color-primary) bg-(--color-background) font-display text-2xl uppercase text-(--color-primary)"
            >
              <img
                v-if="authStore.user?.profileImage"
                :src="authStore.user.profileImage"
                :alt="`${authStore.user?.firstName || ''} ${authStore.user?.lastName || ''}`"
                class="h-full w-full object-cover object-center"
              />

              <span v-else>
                {{ authStore.user?.firstName?.charAt(0) || 'U' }}
              </span>
            </div>
          </div>

          <h3 class="mt-5 font-mono text-sm font-bold uppercase text-white">
            {{ authStore.user?.firstName }}
            {{ authStore.user?.lastName }}
          </h3>

          <p class="mt-2 break-all text-xs leading-5 text-(--color-text-secondary)">
            {{ authStore.user?.email }}
          </p>

          <div class="mt-6 border-t border-(--color-border) pt-5">
            <p
              class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
            >
              Member Status
            </p>

            <p class="mt-2 font-mono text-xs font-bold uppercase text-(--color-primary)">Active</p>
          </div>
        </div>
      </div>
    </section>

    <section class="border border-(--color-border) bg-(--color-surface)">
      <div class="border-b border-(--color-border) px-6 py-5">
        <p
          class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-primary)"
        >
          Security
        </p>

        <h2 class="mt-2 font-display text-2xl uppercase text-white">Account Security</h2>
      </div>

      <!-- Password Summary -->
      <div
        v-if="!showPasswordForm"
        class="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p class="font-mono text-sm font-bold uppercase text-white">Password</p>

          <p class="mt-2 text-sm leading-6 text-(--color-text-secondary)">
            Keep your account secure by using a strong password.
          </p>
        </div>

        <button
          type="button"
          class="shrink-0 border border-(--color-border) px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white transition hover:border-(--color-primary) hover:text-(--color-primary)"
          @click="openPasswordForm"
        >
          Change Password
        </button>
      </div>

      <!-- Password Form -->
      <form v-else class="space-y-6 p-6" @submit.prevent="savePassword">
        <div>
          <label
            for="currentPassword"
            class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
          >
            Current Password
          </label>

          <input
            id="currentPassword"
            v-model="passwordForm.currentPassword"
            type="password"
            autocomplete="current-password"
            class="mt-2 w-full border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm text-white outline-none transition focus:border-(--color-primary)"
            placeholder="Enter your current password"
          />
        </div>

        <div class="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              for="newPassword"
              class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
            >
              New Password
            </label>

            <input
              id="newPassword"
              v-model="passwordForm.newPassword"
              type="password"
              autocomplete="new-password"
              class="mt-2 w-full border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm text-white outline-none transition focus:border-(--color-primary)"
              placeholder="Enter your new password"
            />
          </div>

          <div>
            <label
              for="confirmPassword"
              class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              v-model="passwordForm.confirmPassword"
              type="password"
              autocomplete="new-password"
              class="mt-2 w-full border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm text-white outline-none transition focus:border-(--color-primary)"
              placeholder="Confirm your new password"
            />
          </div>
        </div>

        <div
          class="flex flex-col gap-3 border-t border-(--color-border) pt-6 sm:flex-row sm:justify-end"
        >
          <button
            type="button"
            class="border border-(--color-border) px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-(--color-text-secondary) transition hover:border-white hover:text-white"
            @click="cancelPasswordChange"
          >
            Cancel
          </button>

          <button
            type="submit"
            :disabled="isChangingPassword"
            class="bg-(--color-primary) px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-black transition hover:opacity-90"
          >
            {{ isChangingPassword ? 'Updating Password...' : 'Update Password' }}
          </button>
        </div>
      </form>
    </section>
  </div>
</template>
