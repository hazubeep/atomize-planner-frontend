import api from "./api";
import { mockGetTasks, mockAddTaskAtomize, mockDeleteTask } from "../mock/mockService";

const USE_MOCK = true;

export const getTasks = async () => {
  if (USE_MOCK) return mockGetTasks();

  const res = await api.get("/tasks");
  return res.data;
}; 

export const addTaskAtomize = async (title) => {
  if (USE_MOCK) return mockAddTaskAtomize(title);

  const res = await api.post("/tasks/atomize", { title });
  return res.data;
}

export const deleteTask = async (id) => {
  if (USE_MOCK) return mockDeleteTask(id);

  const res = await api.delete(`/tasks/${id}`);
  return res.data;
}
