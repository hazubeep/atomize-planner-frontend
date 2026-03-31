import api from './api'

export const getWeeklySummary = async (week_offset = 0) => {
  const res = await api.get('/history/summary', { params: { week_offset } })
  return res.data
}

export const getCompletedTasksHistory = async ({ page = 1, limit = 10, category } = {}) => {
  const params = { page, limit }
  if (category) params.category = category
  const res = await api.get('/history/completed-tasks', { params })
  return res.data
}
