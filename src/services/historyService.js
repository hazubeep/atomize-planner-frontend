import api from './api'
import { mockGetWeeklySummary, mockGetCompletedTasksHistory } from '../mock/mockService'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export const getWeeklySummary = async (week_offset = 0) => {
  if (USE_MOCK) return mockGetWeeklySummary(week_offset)
  const res = await api.get('/history/summary', { params: { week_offset } })
  return res.data
}

export const getCompletedTasksHistory = async ({ page = 1, limit = 10, category } = {}) => {
  if (USE_MOCK) return mockGetCompletedTasksHistory({ page, limit, category })
  const params = { page, limit }
  if (category) params.category = category
  const res = await api.get('/history/completed-tasks', { params })
  return res.data
}
