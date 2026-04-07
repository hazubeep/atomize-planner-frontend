import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ── Request interceptor: attach auth token ──────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ── Response interceptor: normalise errors ───────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    if (status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    const message =
      error.response?.data?.message ||
      error.message ||
      'Terjadi kesalahan. Silakan coba lagi.'
    const customError = new Error(message)
    if (error.response?.data?.errors) {
      customError.errors = error.response.data.errors
    }

    return Promise.reject(customError)
  }
)

export default api
