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

// Focus Sessions
let activeFocusSession = null
let nextFocusSessionId = 1

export const mockStartFocusSession = async ({ task_id, step_id, duration_minutes = 25, session_notes = '' }) => {
  await delay(500)
  if (activeFocusSession && activeFocusSession.status === 'active') {
    throw { response: { data: { message: 'SESSION_ALREADY_ACTIVE' } } }
  }

  const task = tasks.find((t) => String(t.id) === String(task_id))
  const step = task?.micro_steps?.find((s) => String(s.id) === String(step_id))

  if (!task || !step) {
    throw { response: { data: { message: 'NOT_FOUND' } } }
  }

  activeFocusSession = {
    session_id: nextFocusSessionId++,
    task_id: task.id,
    step_id: step.id,
    objective: step.title,
    duration_minutes,
    session_notes,
    status: 'active',
    deep_focus_active: true,
    started_at: new Date().toISOString(),
    ends_at: new Date(Date.now() + duration_minutes * 60000).toISOString(),
  }

  return { success: true, data: activeFocusSession }
}

export const mockGetActiveFocusSession = async () => {
  await delay(250)
  if (!activeFocusSession || activeFocusSession.status !== 'active') {
    return { success: true, data: null }
  }
  return { success: true, data: activeFocusSession }
}

export const mockCompleteFocusSession = async (sessionId) => {
  await delay(400)
  if (!activeFocusSession || activeFocusSession.session_id !== Number(sessionId)) {
    throw { response: { data: { message: 'SESSION_NOT_FOUND' } } }
  }
  if (activeFocusSession.status !== 'active') {
    throw { response: { data: { message: 'SESSION_ALREADY_ENDED' } } }
  }

  activeFocusSession = { ...activeFocusSession, status: 'completed', deep_focus_active: false }

  const task = tasks.find((t) => String(t.id) === String(activeFocusSession.task_id))
  let actualDuration = activeFocusSession.duration_minutes
  if (task) {
    task.micro_steps = task.micro_steps.map((step) =>
      String(step.id) === String(activeFocusSession.step_id)
        ? { ...step, status: 'completed', is_completed: true, updated_at: new Date().toISOString() }
        : step
    )
    const done = task.micro_steps.filter((s) => s.is_completed).length
    task.progress_percentage = task.micro_steps.length ? Math.round((done / task.micro_steps.length) * 100) : 0
  }

  return {
    success: true,
    message: 'Focus session completed. Step marked as done.',
    data: {
      session_id: activeFocusSession.session_id,
      step_id: activeFocusSession.step_id,
      step_status: 'completed',
      task_progress_percentage: task?.progress_percentage ?? 0,
      completed_at: new Date().toISOString(),
      actual_duration_minutes: Math.max(1, actualDuration),
    },
  }
}

export const mockCancelFocusSession = async (sessionId, payload = {}) => {
  await delay(300)
  if (!activeFocusSession || activeFocusSession.session_id !== Number(sessionId)) {
    throw { response: { data: { message: 'SESSION_NOT_FOUND' } } }
  }
  activeFocusSession = { ...activeFocusSession, status: 'cancelled', deep_focus_active: false, cancelled_reason: payload.reason || null }
  return { success: true, message: 'Focus session cancelled successfully' }
}

export const mockUpdateFocusSessionSettings = async (sessionId, payload) => {
  await delay(300)
  if (!activeFocusSession || activeFocusSession.session_id !== Number(sessionId)) {
    throw { response: { data: { message: 'SESSION_NOT_FOUND' } } }
  }
  activeFocusSession = {
    ...activeFocusSession,
    ...payload,
    ends_at: payload.duration_minutes
      ? new Date(Date.now() + payload.duration_minutes * 60000).toISOString()
      : activeFocusSession.ends_at,
  }
  return { success: true, data: activeFocusSession }
}

