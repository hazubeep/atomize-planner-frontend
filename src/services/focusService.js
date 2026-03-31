import api from './api'
import {
  mockStartFocusSession,
  mockGetActiveFocusSession,
  mockCompleteFocusSession,
  mockCancelFocusSession,
  mockUpdateFocusSessionSettings,
} from '../mock/mockService'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export const startFocusSession = async (payload) => {
  if (USE_MOCK) return mockStartFocusSession(payload)
  const res = await api.post('/focus/sessions', payload)
  return res.data
}

export const getActiveFocusSession = async () => {
  if (USE_MOCK) return mockGetActiveFocusSession()
  const res = await api.get('/focus/sessions/active')
  return res.data
}

export const completeFocusSession = async (sessionId) => {
  if (USE_MOCK) return mockCompleteFocusSession(sessionId)
  const res = await api.post(`/focus/sessions/${sessionId}/complete`)
  return res.data
}

export const cancelFocusSession = async (sessionId, payload = {}) => {
  if (USE_MOCK) return mockCancelFocusSession(sessionId, payload)
  const res = await api.post(`/focus/sessions/${sessionId}/cancel`, payload)
  return res.data
}

export const updateFocusSessionSettings = async (sessionId, payload) => {
  if (USE_MOCK) return mockUpdateFocusSessionSettings(sessionId, payload)
  const res = await api.patch(`/focus/sessions/${sessionId}/settings`, payload)
  return res.data
}
