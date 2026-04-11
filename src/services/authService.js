import api from './api'
import { mockLogin, mockRegister, mockLogout } from '../mock/mockService'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export const login = async (email, password) => {
  if (USE_MOCK) {
    const data = await mockLogin({ email, password })
    if (data?.token) {
      localStorage.setItem('token', data.token)
    }
    return data
  }
  const res = await api.post('/auth/login', { email, password })
  const token = res.data?.data?.token || res.data?.token
  if (token) {
    localStorage.setItem('token', token)
  }
  return res.data
}

export const register = async (payload) => {
  if (USE_MOCK) {
    const data = await mockRegister(payload)
    if (data?.token) {
      localStorage.setItem('token', data.token)
    }
    return data
  }
  const res = await api.post('/auth/register', payload)
  const token = res.data?.data?.token || res.data?.token
  if (token) {
    localStorage.setItem('token', token)
  }
  return res.data
}

export const logout = async () => {
  try {
    if (USE_MOCK) {
      return await mockLogout()
    }
    const res = await api.post('/auth/logout')
    return res.data
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    localStorage.removeItem('token')
  }
}
