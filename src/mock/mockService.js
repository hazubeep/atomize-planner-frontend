import { mockUser, mockToken, mockTasks } from "./mockData";

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

let tasks = structuredClone(mockTasks);
let nextTaskId = 3;
let nextMicroStepId = 9;

// Auth
export const mockRegister = async () => {
  await delay();
  return { user: mockUser, token: mockToken };
};

export const mockLogin = async ({ email, password }) => {
  await delay();
  if (email !== mockUser.email || password !== "securepassword123")
    throw { response: { data: { message: "Invalid credentials" } } };
  return { user: mockUser, token: mockToken };
};

export const mockLogout = async () => {
  await delay();
  return { message: "Successfully logged out" };
};

// Tasks
export const mockGetTasks = async () => {
  await delay();
  return [...tasks];
};

export const mockAddTaskAtomize = async (title) => {
  await delay(800);
  const micro_steps = [
    { id: nextMicroStepId++, task_id: nextTaskId, title: `Research about: ${title}`, is_completed: false, estimated_duration: 15, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: nextMicroStepId++, task_id: nextTaskId, title: `Plan the steps for: ${title}`, is_completed: false, estimated_duration: 20, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: nextMicroStepId++, task_id: nextTaskId, title: `Execute the first part of: ${title}`, is_completed: false, estimated_duration: 30, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: nextMicroStepId++, task_id: nextTaskId, title: `Review and finalize: ${title}`, is_completed: false, estimated_duration: 15, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ];
  const task = { id: nextTaskId++, user_id: 1, title, progress_percentage: 0, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), micro_steps };
  tasks.push(task);
  return { task, micro_steps };
};

export const mockDeleteTask = async (id) => {
  await delay();
  tasks = tasks.filter((t) => t.id !== id);
  return { message: "Task deleted successfully" };
};

// MicroSteps
export const mockToggleMicroStep = async (id, is_completed) => {
  await delay();
  let updatedStep = null;
  tasks = tasks.map((task) => ({
    ...task,
    micro_steps: task.micro_steps.map((step) => {
      if (String(step.id) !== String(id)) return step;
      updatedStep = { ...step, is_completed: is_completed !== undefined ? is_completed : !step.is_completed, updated_at: new Date().toISOString() };
      return updatedStep;
    }),
  }));
  if (!updatedStep) throw { response: { data: { message: "Micro-step not found" } } };
  return { message: "Status updated", micro_step: updatedStep };
};
