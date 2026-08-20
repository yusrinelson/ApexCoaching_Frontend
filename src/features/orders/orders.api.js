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

// export const getAdminOrders = async () => {
//     const response = await apiClient.get('/admin/orders')

//     return response.data
// }

// export const getAdminOrderById = async (id) => {
//     const response = await apiClient.get(`/admin/orders/${id}`)

//     return response.data
// }