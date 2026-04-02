import api from './api';
import {
  mockGetTasks,
  mockAddTaskAtomize,
  mockGetTaskDetail,
  mockUpdateTask,
  mockDeleteTask,
  mockAddTaskStep,
  mockToggleTaskStep,
  mockMarkStepWorking,
  mockReAtomizeStep,
} from '../mock/mockService';

const USE_MOCK = true;

// GET /tasks
export const getTasks = async (status) => {
  if (USE_MOCK) return mockGetTasks();
  const res = await api.get('/tasks', { params: status ? { status } : {} });
  return res.data; // { success, data: Task[] }
};

// POST /tasks/atomize
export const atomizeTask = async (title) => {
  if (USE_MOCK) return mockAddTaskAtomize(title);
  const res = await api.post('/tasks/atomize', { title });
  return res.data; // { success, data: Task }
};

export const addTaskAtomize = atomizeTask; // alias

// GET /tasks/:taskId
export const getTaskDetail = async (taskId) => {
  if (USE_MOCK) return mockGetTaskDetail(taskId);
  const res = await api.get(`/tasks/${taskId}`);
  return res.data; // { success, data: Task }
};

// PATCH /tasks/:taskId
export const updateTask = async (taskId, payload) => {
  if (USE_MOCK) return mockUpdateTask(taskId, payload);
  const res = await api.patch(`/tasks/${taskId}`, payload);
  return res.data; // { success, data: Task }
};

// DELETE /tasks/:taskId
export const deleteTask = async (taskId) => {
  if (USE_MOCK) return mockDeleteTask(taskId);
  const res = await api.delete(`/tasks/${taskId}`);
  return res.data; // { success, message }
};

// POST /tasks/:taskId/steps
export const addTaskStep = async (taskId, payload) => {
  if (USE_MOCK) return mockAddTaskStep(taskId, payload);
  const res = await api.post(`/tasks/${taskId}/steps`, payload);
  return res.data; // { success, data: TaskStep }
};

// PATCH /tasks/:taskId/steps/:stepId/toggle
export const toggleTaskStep = async (taskId, stepId, is_completed) => {
  if (USE_MOCK) return mockToggleTaskStep(taskId, stepId, is_completed);
  const res = await api.patch(`/tasks/${taskId}/steps/${stepId}/toggle`, is_completed !== undefined ? { is_completed } : {});
  return res.data; // { success, data: TaskStep }
};

// POST /tasks/:taskId/steps/:stepId/mark-working
export const markStepWorking = async (taskId, stepId) => {
  if (USE_MOCK) return mockMarkStepWorking(taskId, stepId);
  const res = await api.post(`/tasks/${taskId}/steps/${stepId}/mark-working`);
  return res.data; // { success, data: TaskStep }
};

// POST /tasks/:taskId/steps/:stepId/re-atomize
export const reAtomizeStep = async (taskId, stepId, context_hint) => {
  if (USE_MOCK) return mockReAtomizeStep(taskId, stepId, context_hint);
  const res = await api.post(`/tasks/${taskId}/steps/${stepId}/re-atomize`, context_hint ? { context_hint } : {});
  return res.data; // { success, message, data: { original_step_id, new_steps } }
};
