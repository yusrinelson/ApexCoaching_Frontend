import apiClient from '../../services/apiClient'

export const getAdminOrders = async () => {
    const response = await apiClient.get('/orders/admin')

    return response.data
}

export const getAdminOrderById = async (orderId) => {
    const response = await apiClient.get(`/orders/admin/${orderId}`)

    return response.data
}