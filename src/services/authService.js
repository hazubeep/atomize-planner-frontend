import api from './api'
import { mockLogin, mockRegister } from '../mock/mockService'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export const login = async (email, password) => {
  if (USE_MOCK) {
    const data = await mockLogin({ email, password })
    localStorage.setItem('token', data.token)
    return data
  }
  const res = await api.post('/auth/login', { email, password })
  if (res.data?.token) localStorage.setItem('token', res.data.token)
  return res.data
}

export const register = async (payload) => {
  if (USE_MOCK) return mockRegister()
  const res = await api.post('/auth/register', payload)
  return res.data
}

export const logout = () => localStorage.removeItem('token')
