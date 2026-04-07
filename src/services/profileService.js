import api from './api';
import {
  mockGetProfile,
  mockUpdateProfile,
  mockDeleteAccount,
  mockUploadAvatar,
  mockRemoveAvatar,
  mockChangePassword,
} from '../mock/mockService';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// GET /profile
export const getProfile = async () => {
  if (USE_MOCK) return mockGetProfile();
  try {
  const res = await api.get('/profile');
  return res.data; // { success, data: User }
  } catch (error) {
    console.error('profile error:', error)
    throw error
  }
};

// PATCH /profile
export const updateProfile = async (payload) => {
  if (USE_MOCK) return mockUpdateProfile(payload);
  const res = await api.patch('/profile', payload);
  return res.data; // { success, data: User }
};

// DELETE /profile
export const deleteAccount = async (payload) => {
  if (USE_MOCK) return mockDeleteAccount(payload);
  const res = await api.delete('/profile', { data: payload });
  return res.data; // { success, message }
};

// POST /profile/avatar
export const uploadAvatar = async (formData) => {
  if (USE_MOCK) return mockUploadAvatar(formData);
  const res = await api.post('/profile/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  return res.data; // { success, message, data: { avatar_url } }
};

// DELETE /profile/avatar
export const removeAvatar = async () => {
  if (USE_MOCK) return mockRemoveAvatar();
  const res = await api.delete('/profile/avatar');
  return res.data; // { success, message, data: { avatar_url } }
};

// POST /profile/change-password
export const changePassword = async (payload) => {
  if (USE_MOCK) return mockChangePassword(payload);
  const res = await api.post('/profile/change-password', payload);
  return res.data; // { success, message }
};
