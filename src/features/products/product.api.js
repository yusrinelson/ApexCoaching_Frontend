import apiClient from '../../services/apiClient'

export const getProducts = async () => {
  const response = await apiClient.get('/products')

  return response.data
}

export const getProductBySlug = async (slug) => {
  const response = await apiClient.get(`/products/${slug}`)

  return response.data
}

export const downloadProduct = async (productId) => {
  const response = await apiClient.get(`/products/${productId}/download`)
  return response.data
}

// admin

// export const getAdminProducts = async (params = {}) => {
//   const response = await apiClient.get('/products/admin', {
//     params,
//   })

//   return response.data
// }
// export const createProduct = async (formData) => {
//   const response = await apiClient.post('/products', formData)

//   return response.data
// }

// export const updateProduct = async (productId, formData) => {
//   const response = await apiClient.patch(`/products/${productId}`, formData)

//   return response.data
// }

// export const toggleProductPublish = async (productId) => {
//   const response = await apiClient.patch(`/products/${productId}/publish`)

//   return response.data
// }
// export const deleteProduct = async (productId) => {
//   const response = await apiClient.delete(`/products/${productId}`)

//   return response.data
// }
