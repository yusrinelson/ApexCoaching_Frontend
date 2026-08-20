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

