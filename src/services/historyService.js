import api from './api';
import { mockGetWeeklySummary, mockGetCompletedTasksHistory } from '../mock/mockService';

const USE_MOCK = true;

// GET /history/summary?week_offset=0
export const getWeeklySummary = async (week_offset = 0) => {
  if (USE_MOCK) return mockGetWeeklySummary(week_offset);
  const res = await api.get('/history/summary', { params: { week_offset } });
  return res.data; // { success, data: WeeklySummary }
};

// GET /history/completed-tasks?page=1&limit=10&category=
export const getCompletedTasksHistory = async (params = {}) => {
  if (USE_MOCK) return mockGetCompletedTasksHistory(params);
  const res = await api.get('/history/completed-tasks', { params });
  return res.data; // { success, data: { items, pagination } }
};
