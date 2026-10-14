import apiClient from "../../services/apiClient";

export const getPrograms = (params = {}) => {
    return apiClient.get('/programs', { params });
}

export const getProgramBySlug = (slug) => {
    return apiClient.get(`/programs/${slug}`)
}

