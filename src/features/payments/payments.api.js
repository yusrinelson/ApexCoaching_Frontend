import apiClient from '../../services/apiClient'

export const initializePayment = async (orderId) => {
    const response = await apiClient.post(`/payments/initialize/${orderId}`)

    return response.data
}

export const verifyPayment = async (reference) => {
    const response = await apiClient.get(`/payments/verify/${reference}`)

    return response.data
}

export const cancelPayment = async (reference) => {
    const response = await apiClient.patch(`/payments/cancel/${reference}`)

    return response.data
}