import api from "./api";
import { mockRegister, mockLogin, mockLogout } from "../mock/mockService";

const USE_MOCK = true;

export const register = async (data) => {
  if (USE_MOCK) return mockRegister(data);
  
  const res = await api.post("/auth/register", data);
  return res.data;
}

export const login = async (data) => {
  if (USE_MOCK) return mockLogin(data);

  const res = await api.post("/auth/login", data);
  return res.data;
}

export const logout = async () => {
  if (USE_MOCK) return mockLogout();

  const res = await api.post("/auth/logout");
  return res.data;
}
