import api from './api'

export const getProfile = async () => {
  const res = await api.get('/profile')
  return res.data
}

export const updateProfile = async (payload) => {
  const res = await api.patch('/profile', payload)
  return res.data
}

export const deleteAccount = async (payload) => {
  const res = await api.delete('/profile', { data: payload })
  return res.data
}

export const uploadAvatar = async (formData) => {
  const res = await api.post('/profile/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

export const removeAvatar = async () => {
  const res = await api.delete('/profile/avatar')
  return res.data
}

export const changePassword = async (payload) => {
  const res = await api.post('/profile/change-password', payload)
  return res.data
}
