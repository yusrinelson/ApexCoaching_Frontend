import apiClient from "../../services/apiClient";

export const getOrders = async () => {
    const response = await apiClient.get('/orders')

    return response.data
}

export const getOrderById = async (orderId) => {
    const response = await apiClient.get(`/orders/${orderId}`)

    return response.data
}

export const createOrder = async () => {
    const response = await apiClient.post('/orders')

    return response.data
}

export const cancelOrder = async (orderId) => {
  const response = await apiClient.patch(
    `/orders/${orderId}/cancel`
  )

  return response.data
}
