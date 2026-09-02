<script setup>
import { ref, onMounted } from 'vue'
import { toast } from 'vue-sonner'
import {
  getAdminProducts,
  togglePublish,
  deleteProduct,
  createProduct,
  updateProduct,
} from '../../admin/products/admin-products.api'

import { getCategories } from '../../categories/categories.api'
// import { createProduct } from '../../admin/products/admin-products.api'

const products = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const actionLoading = ref(null) // Loading state for specific actions

const showProductForm = ref(false)
const editingProduct = ref(null)
const categories = ref([])
const isCreating = ref(false)

const form = ref({
  title: '',
  shortDescription: '',
  description: '',
  price: '',
  category: '',
  author: '',
  coverImage: null,
  digitalFile: null,
})

const loadCategories = async () => {
  try {
    const response = await getCategories()

    if (response.success) {
      categories.value = response.data
    }
  } catch (error) {
    console.error('Failed to load categories:', error)

    errorMessage.value =
      error.response?.data?.message || 'Unable to load categories. Please try again.'
  }
}

const loadProducts = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const response = await getAdminProducts()

    if (response.success) {
      products.value = response.data.products
    }
  } catch (error) {
    console.error('Failed to Load admin Products:', error)
  } finally {
    isLoading.value = false
  }
}

const handleCoverImage = (event) => {
  form.value.coverImage = event.target.files[0] || null
}

const handleDigitalFile = (event) => {
  form.value.digitalFile = event.target.files[0] || null
}

const openEditForm = (product) => {
  editingProduct.value = product

  form.value = {
    title: product.title || '',
    shortDescription: product.shortDescription || '',
    description: product.description || '',
    price: product.price || '',
    category: product.category?._id || product.category || '',
    author: product.author || '',
    coverImage: null,
    digitalFile: null,
  }

  showProductForm.value = true
}

const handleSaveProduct = async () => {
  try {
    isCreating.value = true
    errorMessage.value = ''

    const formData = new FormData()

    formData.append('title', form.value.title)
    formData.append('shortDescription', form.value.shortDescription)
    formData.append('description', form.value.description)
    formData.append('price', form.value.price)
    formData.append('category', form.value.category)
    formData.append('author', form.value.author)

    if (form.value.coverImage) {
      formData.append('coverImage', form.value.coverImage)
    }

    if (form.value.digitalFile) {
      formData.append('digitalFile', form.value.digitalFile)
    }

    let response

    if (editingProduct.value) {
      // edit
      response = await updateProduct(editingProduct.value._id, formData)

      if (response.success) {
        const index = products.value.findIndex(
          (product) => product._id === editingProduct.value._id,
        )

        if (index !== -1) {
          products.value[index] = response.data
        }

        toast.success('Product updated successfully.')
      }
    } else {
      // create
      response = await createProduct(formData)

      if (response.success) {
        products.value.unshift(response.data)

        toast.success('Product created successfully.')
      }
    }

    if (response.success) {
      resetForm()
      showProductForm.value = false
    }
  } catch (error) {
    console.error('Failed to save product:', error)

    errorMessage.value =
      error.response?.data?.message || 'Unable to save product. Please try again.'
  } finally {
    isCreating.value = false
  }
}

const toggleProductForm  = () => {
  if (showProductForm.value) {
      showProductForm.value = false
    } else {
      resetForm()
      showProductForm.value = true
    }
}

const resetForm = () => {
  form.value = {
    title: '',
    shortDescription: '',
    description: '',
    price: '',
    category: '',
    author: '',
    coverImage: null,
    digitalFile: null,
  }

  editingProduct.value = null
}

const handleTogglePublish = async (product) => {
  try {
    actionLoading.value = product._id // Set the loading state for the specific product

    const response = await togglePublish(product._id) // Call the API to toggle publish

    if (response.success) {
      const index = products.value.findIndex((item) => item._id === product._id) // Find the index of the product in the products array

      if (index !== -1) {
        products.value[index].isPublished = !products.value[index].isPublished // Toggle the published property of the product
      }

      toast.success('Product published successfully.')
    }
  } catch (error) {
    console.error('Failed to toggle product publish:', error)
    toast.error(error.response?.data?.message || 'Unable to update product. Please try again.')
  } finally {
    actionLoading.value = null
  }
}

const handleDelete = async (product) => {
  const confirmed = window.confirm('Are you sure you want to delete this product?')

  if (!confirmed) return // If the user cancels the deletion, exit the function

  try {
    actionLoading.value = product._id // Set the loading state for the specific product

    const response = await deleteProduct(product._id) // Call the API to delete the product

    if (response.success) {
      products.value = products.value.filter((item) => item._id !== product._id) // Remove the deleted product from the products array
      toast.success('Product deleted successfully.')
    }
  } catch (error) {
    console.error('Failed to delete product:', error)
    toast.error(error.response?.data?.message || 'Unable to delete product. Please try again.')
  } finally {
    actionLoading.value = null
  }
}

onMounted(() => {
  loadProducts()
  loadCategories()
})
</script>

<template>
  <div class="space-y-10">
    <!-- header  -->
    <section>
      <p class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)">
        Apex Admin
      </p>

      <div class="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1
            class="font-display text-4xl uppercase leading-none text-white sm:text-5xl lg:text-6xl"
          >
            Products
          </h1>

          <p class="mt-5 max-w-xl text-sm leading-6 text-(--color-text-secondary)">
            Manage your Apex digital products, pricing and availability.
          </p>
        </div>

        <button
          type="button"
          @click="toggleProductForm "
          class="bg-(--color-primary) px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-black transition hover:opacity-90"
        >
          {{ showProductForm ? '- Close' : '+ Add Product' }}
        </button>
      </div>
    </section>

    <!-- product form  -->
    <section v-if="showProductForm" class="border border-(--color-border) bg-(--color-surface)">
      <div class="border-b border-(--color-border) px-6 py-5">
        <p
          class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-primary)"
        >
          Product Management
        </p>

        <h2 class="mt-2 font-display text-2xl uppercase text-white">
          {{ editingProduct ? 'Edit Product' : 'Add Product' }}
        </h2>
      </div>

      <form class="space-y-6 p-6" @submit.prevent="handleSaveProduct">
        <!-- TITLE -->
        <div>
          <label
            for="title"
            class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
          >
            Title
          </label>

          <input
            v-model="form.title"
            id="title"
            type="text"
            required
            class="mt-2 w-full border border-(--color-border) bg-transparent px-4 py-3 text-sm text-white outline-none focus:border-(--color-primary)"
            placeholder="Apex Playbook"
          />
        </div>

        <!-- SHORT DESCRIPTION -->
        <div>
          <label
            for="shortDescription"
            class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
          >
            Short Description
          </label>

          <input
            v-model="form.shortDescription"
            id="shortDescription"
            type="text"
            maxlength="200"
            class="mt-2 w-full border border-(--color-border) bg-transparent px-4 py-3 text-sm text-white outline-none focus:border-(--color-primary)"
            placeholder="Train with intent."
          />
        </div>

        <!-- DESCRIPTION -->
        <div>
          <label
            for="description"
            class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
          >
            Description
          </label>

          <textarea
            v-model="form.description"
            id="description"
            required
            rows="6"
            class="mt-2 w-full resize-y border border-(--color-border) bg-transparent px-4 py-3 text-sm text-white outline-none focus:border-(--color-primary)"
            placeholder="Describe the product..."
          ></textarea>
        </div>

        <!-- PRICE / AUTHOR -->
        <div class="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              for="price"
              class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
            >
              Price (ZAR)
            </label>

            <input
              v-model="form.price"
              id="price"
              type="number"
              min="0"
              step="0.01"
              required
              class="mt-2 w-full border border-(--color-border) bg-transparent px-4 py-3 text-sm text-white outline-none focus:border-(--color-primary)"
              placeholder="299"
            />
          </div>

          <div>
            <label
              for="author"
              class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
            >
              Author
            </label>

            <input
              v-model="form.author"
              id="author"
              type="text"
              class="mt-2 w-full border border-(--color-border) bg-transparent px-4 py-3 text-sm text-white outline-none focus:border-(--color-primary)"
              placeholder="Apex Coaching"
            />
          </div>
        </div>

        <!-- CATEGORY -->
        <div>
          <label
            for="category"
            class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
          >
            Category
          </label>

          <select
            v-model="form.category"
            id="category"
            required
            class="mt-2 w-full border border-(--color-border) bg-(--color-surface) px-4 py-3 text-sm text-white outline-none focus:border-(--color-primary)"
          >
            <option value="" disabled>Select category</option>

            <option v-for="category in categories" :key="category._id" :value="category._id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- COVER IMAGE -->
        <div>
          <label
            for="coverImage"
            class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
          >
            Cover Image
          </label>

          <input
            type="file"
            id="coverImage"
            accept="image/*"
            :required="!editingProduct"
            class="mt-2 block w-full border border-(--color-border) px-4 py-3 text-xs text-white"
            @change="handleCoverImage"
          />
          <!-- // if in editing mode then show this text instead -->
          <p v-if="!editingProduct" class="mt-2 text-xs text-(--color-text-muted)">
            
          </p>
          <p v-else class="mt-2 text-xs text-(--color-text-muted)">
             Current cover image will be kept unless you select a new image.
          </p>
        </div>

        <!-- DIGITAL FILE -->
        <div>
          <label
            for="digitalFile"
            class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
          >
            Digital File
          </label>

          <input
            id="digitalFile"
            type="file"
            accept="application/pdf"
            :required="!editingProduct"
            class="mt-2 block w-full border border-(--color-border) px-4 py-3 text-xs text-white"
            @change="handleDigitalFile"
          />
           <p v-if="!editingProduct" class="mt-2 text-xs text-(--color-text-muted)">
            
          </p>
          <p v-else class="mt-2 text-xs text-(--color-text-muted)">
             Current digital file will be kept unless you select a new image.
          </p>
        </div>

        <!-- ACTIONS -->
        <div
          class="flex flex-col gap-3 border-t border-(--color-border) pt-6 sm:flex-row sm:justify-end"
        >
          <button
            type="button"
            class="border border-(--color-border) px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white transition hover:border-(--color-primary) hover:text-(--color-primary)"
            @click="resetForm(); showProductForm = false"
          >
            Cancel
          </button>

          <button
            type="submit"
            :disabled="isCreating"
            class="bg-(--color-primary) px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {{ isCreating ? 'Saving..' : editingProduct ? 'Update Product' : 'Add Product' }}
          </button>
        </div>
      </form>
    </section>

    <!-- errorMessage  -->
    <p
      v-if="errorMessage"
      class="border border-(--color-danger)/30 bg-(--color-danger)/10 px-4 py-3 font-mono text-xs text-(--color-danger)"
    >
      {{ errorMessage }}
    </p>

    <!-- loding  -->
    <section
      v-if="isLoading"
      class="border border-(--color-border) bg-(--color-surface) px-6 py-16 text-center"
    >
      <p class="font-mono text-xs font-bold uppercase tracking-[0.15em] text-(--color-primary)">
        Loading products...
      </p>
    </section>

    <section v-else class="border border-(--color-border) bg-(--color-surface)">
      <!-- TABLE HEADER -->
      <div
        class="hidden grid-cols-[2fr_1fr_1fr_1fr_auto] gap-6 border-b border-(--color-border) px-6 py-4 md:grid"
      >
        <p
          class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
        >
          Product
        </p>

        <p
          class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
        >
          Category
        </p>

        <p
          class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
        >
          Price
        </p>

        <p
          class="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-(--color-text-muted)"
        >
          Status
        </p>

        <span></span>
      </div>

      <!-- empty -->
      <div v-if="!products.length" class="px-6 py-16 text-center">
        <p
          class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-primary)"
        >
          Products
        </p>

        <h2 class="mt-4 font-display text-3xl uppercase text-white">No Products</h2>

        <p class="mx-auto mt-3 max-w-md text-sm text-(--color-text-secondary)">
          Create your first Apex digital product.
        </p>
      </div>

      <div
        v-for="product in products"
        :key="product._id"
        class="border-b border-(--color-border) px-6 py-6 last:border-b-0"
      >
        <div class="grid gap-5 md:grid-cols-[2fr_1fr_1fr_1fr_auto] md:items-center">
          <div class="flex gap-4">
            <div class="h-16 w-12 shrink-0 overflow-hidden border border-(--color-border) bg-black">
              <img
                v-if="product.coverImage?.url"
                :src="product.coverImage.url"
                :alt="product.title"
                class="h-full w-full object-cover"
              />

              <div
                v-else
                class="flex h-full items-center justify-center font-mono text-[8px] text-(--color-text-muted)"
              >
                NO IMG
              </div>
            </div>

            <div>
              <p class="font-mono text-sm font-bold uppercase text-white">
                {{ product.title }}
              </p>

              <p class="mt-1 text-xs text-(--color-text-secondary)">
                {{ product.author || 'No author' }}
              </p>
            </div>
          </div>

          <!-- category  -->
          <div>
            <p
              class="mb-1 font-mono text-[9px] uppercase tracking-[0.12em] text-(--color-text-muted) md:hidden"
            >
              Category
            </p>

            <p class="text-xs text-white">
              {{ product.category?.name || 'Uncategorized' }}
            </p>
          </div>
          <!-- Price -->
          <div>
            <p
              class="mb-1 font-mono text-[9px] uppercase tracking-[0.12em] text-(--color-text-muted) md:hidden"
            >
              Price
            </p>

            <p class="font-mono text-sm font-bold text-white">
              R{{ Number(product.price).toFixed(2) }}
            </p>
          </div>
          <!-- STATUS -->
          <div>
            <p
              class="mb-1 font-mono text-[9px] uppercase tracking-[0.12em] text-(--color-text-muted) md:hidden"
            >
              Status
            </p>

            <span
              class="inline-block border px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.12em]"
              :class="
                product.isPublished
                  ? 'border-(--color-primary) text-(--color-primary)'
                  : 'border-yellow-500/40 text-yellow-400'
              "
            >
              {{ product.isPublished ? 'Published' : 'Draft' }}
            </span>
          </div>

          <!-- ACTIONS -->
          <div class="flex flex-wrap gap-2">
            <button
              type="button"
              @click="openEditForm(product)"
              :disabled="actionLoading === product._id"
              class="border border-(--color-border) px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-widest text-white transition hover:border-(--color-primary) hover:text-(--color-primary) disabled:opacity-50"
            >
              Edit
            </button>

            <button
              type="button"
              :disabled="actionLoading === product._id"
              class="border border-(--color-border) px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-widest text-white transition hover:border-(--color-primary) hover:text-(--color-primary) disabled:opacity-50"
              @click="handleTogglePublish(product)"
            >
              {{
                actionLoading === product._id
                  ? '...'
                  : product.isPublished
                    ? 'Unpublish'
                    : 'Publish'
              }}
            </button>

            <button
              type="button"
              :disabled="actionLoading === product._id"
              class="border border-red-500/30 px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-widest text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
              @click="handleDelete(product)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
