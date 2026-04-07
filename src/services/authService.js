import api from './api'
import { mockLogin, mockRegister, mockLogout } from '../mock/mockService'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export const login = async (email, password) => {
  if (USE_MOCK) {
    const data = await mockLogin({ email, password })
    localStorage.setItem('token', data.token)
    return data
  }
  const res = await api.post('/auth/login', { email, password })
  const token = res.data?.data?.token; 
  if (token) {
    localStorage.setItem('token', token)
  }
  return res.data
}

export const register = async (payload) => {
  if (USE_MOCK) return mockRegister()
  const res = await api.post('/auth/register', payload)
  if (res.data?.token) localStorage.setItem('token', res.data.token)
  return res.data
}

export const logout = async () => {
  if (USE_MOCK) {
    const res = await mockLogout()
    localStorage.removeItem('token')
    return res
  }
  const res = await api.post('/auth/logout')
  localStorage.removeItem('token')
  return res.data
}

