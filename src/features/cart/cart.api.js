import apiClient from "../../services/apiClient";

export const getCart = async () => {
    const response = await apiClient.get("/cart");

    return response.data;
}

export const addToCart = async (productId) => {
    // const response = await apiClient.post(`/cart/${productId}`);
    const response = await apiClient.post(`/cart`, { productId });

    return response.data;
}

export const removeFromCart = async (productId) => {
    const response = await apiClient.delete(`/cart/${productId}`);

    return response.data;
}

export const clearCart = async () => {
    const response = await apiClient.delete(`/cart`);

    return response.data;
}