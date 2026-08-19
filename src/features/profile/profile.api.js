import apiClient from '../../services/apiClient'

export const getProfile = async () => {
  const response = await apiClient.get('/profile')

  return response.data
}

export const updateProfile = async (formData) => {
  const response = await apiClient.patch('/profile', formData)

  return response.data
}


export const changePassword = async (currentPassword, newPassword) => {
  const response = await apiClient.patch('/profile/password', { currentPassword, newPassword })

  return response.data
}
