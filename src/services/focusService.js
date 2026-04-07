import api from './api';
import {
  mockStartFocusSession,
  mockGetActiveFocusSession,
  mockCompleteFocusSession,
  mockCancelFocusSession,
  mockUpdateFocusSessionSettings,
} from '../mock/mockService';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// POST /focus/sessions
export const startFocusSession = async (payload) => {
  if (USE_MOCK) return mockStartFocusSession(payload);
  const res = await api.post('/focus/sessions', payload);
  return res.data; // { success, data: FocusSession }
};

// GET /focus/sessions/active
export const getActiveFocusSession = async () => {
  if (USE_MOCK) return mockGetActiveFocusSession();
  const res = await api.get('/focus/sessions/active');
  return res.data; // { success, data: FocusSession | null }
};

// POST /focus/sessions/:sessionId/complete
export const completeFocusSession = async (sessionId) => {
  if (USE_MOCK) return mockCompleteFocusSession(sessionId);
  const res = await api.post(`/focus/sessions/${sessionId}/complete`);
  return res.data; // { success, message, data: FocusSessionComplete }
};

// POST /focus/sessions/:sessionId/cancel
export const cancelFocusSession = async (sessionId, reason) => {
  if (USE_MOCK) return mockCancelFocusSession(sessionId, { reason });
  const res = await api.post(`/focus/sessions/${sessionId}/cancel`, reason ? { reason } : {});
  return res.data; // { success, message }
};

// PATCH /focus/sessions/:sessionId/settings
export const updateFocusSessionSettings = async (sessionId, payload) => {
  if (USE_MOCK) return mockUpdateFocusSessionSettings(sessionId, payload);
  const res = await api.patch(`/focus/sessions/${sessionId}/settings`, payload);
  return res.data; // { success, data: FocusSession }
};
