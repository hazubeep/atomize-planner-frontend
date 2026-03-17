import axios from "axios";

const api = axios.create({
  baseURL: "https://api.atomizeplanner.test/v1",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    const errors = error.response?.data?.errors || null;
    return Promise.reject({ message, errors, status: error.response?.status });
  }
);

export default api;
