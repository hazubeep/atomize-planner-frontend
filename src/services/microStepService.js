import api from "./api";
import { mockToggleMicroStep } from "../mock/mockService";

const USE_MOCK = true;

export const toggleMicroStep = async (id, is_completed) => {
  if (USE_MOCK) return mockToggleMicroStep(id, is_completed);
  
  const res = await api.patch(`/micro-steps/${id}/toggle`, is_completed !== undefined ? { is_completed } : {});
  return res.data;
}