import api from './api';
import { mockToggleTaskStep } from '../mock/mockService';

const USE_MOCK = true;

// PATCH /tasks/:taskId/steps/:stepId/toggle
// signature (taskId, stepId, is_completed) sesuai kontrak baru
export const toggleMicroStep = async (taskId, stepId, is_completed) => {
  if (USE_MOCK) return mockToggleTaskStep(taskId, stepId, is_completed);
  const res = await api.patch(`/tasks/${taskId}/steps/${stepId}/toggle`, is_completed !== undefined ? { is_completed } : {});
  return res.data; // { success, data: TaskStep }
};
