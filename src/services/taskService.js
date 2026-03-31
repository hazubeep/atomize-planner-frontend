import api from './api'
import { mockGetTasks, mockAddTaskAtomize, mockDeleteTask } from '../mock/mockService'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export const getTasks = async (status) => {
  if (USE_MOCK) return mockGetTasks()
  const params = status ? { status } : {}
  const res = await api.get('/tasks', { params })
  return res.data
}

export const atomizeTask = async (title) => {
  if (USE_MOCK) return mockAddTaskAtomize(title)
  const res = await api.post('/tasks/atomize', { title })
  return res.data
}

// compatibility alias
export const addTaskAtomize = atomizeTask

export const getTaskDetail = async (taskId) => {
  const res = await api.get(`/tasks/${taskId}`)
  return res.data
}

export const updateTask = async (taskId, payload) => {
  const res = await api.patch(`/tasks/${taskId}`, payload)
  return res.data
}

export const deleteTask = async (taskId) => {
  if (USE_MOCK) return mockDeleteTask(taskId)
  const res = await api.delete(`/tasks/${taskId}`)
  return res.data
}

export const addTaskStep = async (taskId, payload) => {
  const res = await api.post(`/tasks/${taskId}/steps`, payload)
  return res.data
}

export const toggleTaskStep = async (taskId, stepId, is_completed) => {
  const body = is_completed !== undefined ? { is_completed } : {}
  const res = await api.patch(`/tasks/${taskId}/steps/${stepId}/toggle`, body)
  return res.data
}

export const markStepWorking = async (taskId, stepId) => {
  const res = await api.post(`/tasks/${taskId}/steps/${stepId}/mark-working`)
  return res.data
}

export const reAtomizeStep = async (taskId, stepId, context_hint) => {
  const body = context_hint ? { context_hint } : {}
  const res = await api.post(`/tasks/${taskId}/steps/${stepId}/re-atomize`, body)
  return res.data
}

