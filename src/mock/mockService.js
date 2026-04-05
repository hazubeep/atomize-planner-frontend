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
  return { success: true, message: "Task deleted successfully." };
};

export const mockGetTaskDetail = async (taskId) => {
  await delay();
  const task = tasks.find((t) => String(t.id) === String(taskId));
  if (!task) {
    const error = new Error('Task not found');
    error.response = { status: 404, data: { message: 'Task not found' } };
    throw error;
  }
  return { success: true, data: task };
};

export const mockUpdateTask = async (taskId, payload) => {
  await delay();
  let updatedTask = null;
  tasks = tasks.map((task) => {
    if (String(task.id) !== String(taskId)) return task;
    updatedTask = {
      ...task,
      ...payload,
      updated_at: new Date().toISOString(),
    };
    return updatedTask;
  });
  if (!updatedTask) {
    const error = new Error('Task not found');
    error.response = { status: 404, data: { message: 'Task not found' } };
    throw error;
  }
  return { success: true, data: updatedTask };
};

export const mockAddTaskStep = async (taskId, payload) => {
  await delay();
  const task = tasks.find((t) => String(t.id) === String(taskId));
  if (!task) {
    const error = new Error('Task not found');
    error.response = { status: 404, data: { message: 'Task not found' } };
    throw error;
  }

  const stepId = nextMicroStepId++;
  const step = {
    id: stepId,
    task_id: task.id,
    parent_step_id: null,
    title: payload.title,
    description: payload.description || null,
    status: 'pending',
    is_completed: false,
    is_current_focus: false,
    estimated_duration: payload.estimated_duration || null,
    order: payload.order || (task.task_steps.length + 1),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  task.task_steps.push(step);
  task.total_steps = task.task_steps.length;
  task.completed_steps = task.task_steps.filter((s) => s.is_completed).length;
  task.progress_percentage = task.total_steps
    ? Math.round((task.completed_steps / task.total_steps) * 100)
    : 0;
  task.updated_at = new Date().toISOString();

  return { success: true, data: step };
};

export const mockUpdateTaskStep = async (taskId, stepId, payload) => {
  await delay();
  const task = tasks.find((t) => String(t.id) === String(taskId));
  if (!task) {
    const error = new Error('Task not found');
    error.response = { status: 404, data: { message: 'Task not found' } };
    throw error;
  }

  let updatedStep = null;
  task.task_steps = task.task_steps.map((step) => {
    if (String(step.id) !== String(stepId)) return step;
    updatedStep = { ...step, ...payload, updated_at: new Date().toISOString() };
    return updatedStep;
  });

  if (!updatedStep) {
     throw { response: { status: 404, data: { message: 'Step not found' } } };
  }

  task.updated_at = new Date().toISOString();

  return { success: true, data: updatedStep };
};

export const mockToggleTaskStep = async (taskId, stepId, is_completed) => {
  await delay();
  const task = tasks.find((t) => String(t.id) === String(taskId));
  if (!task) throw { response: { status: 404, data: { message: 'Task not found' } } };

  let updatedStep = null;
  task.task_steps = task.task_steps.map((step) => {
    if (String(step.id) !== String(stepId)) return step;
    const newStatus = is_completed === undefined ? !step.is_completed : is_completed;
    updatedStep = {
      ...step,
      is_completed: newStatus,
      status: newStatus ? 'completed' : 'pending',
      updated_at: new Date().toISOString(),
    };
    return updatedStep;
  });

  if (!updatedStep) throw { response: { status: 404, data: { message: 'Step not found' } } };

  task.completed_steps = task.task_steps.filter((s) => s.is_completed).length;
  task.total_steps = task.task_steps.length;
  task.progress_percentage = task.total_steps ? Math.round((task.completed_steps / task.total_steps) * 100) : 0;
  task.updated_at = new Date().toISOString();

  return { success: true, data: updatedStep };
};

export const mockMarkStepWorking = async (taskId, stepId) => {
  await delay();
  const task = tasks.find((t) => String(t.id) === String(taskId));
  if (!task) throw { response: { status: 404, data: { message: 'Task not found' } } };

  task.task_steps = task.task_steps.map((step) => ({
    ...step,
    status: String(step.id) === String(stepId) ? 'in_progress' : step.is_completed ? 'completed' : 'pending',
    is_current_focus: String(step.id) === String(stepId),
    updated_at: String(step.id) === String(stepId) ? new Date().toISOString() : step.updated_at,
  }));

  task.updated_at = new Date().toISOString();

  const step = task.task_steps.find((s) => String(s.id) === String(stepId));
  return { success: true, data: step };
};

export const mockReAtomizeStep = async (taskId, stepId, context_hint) => {
  await delay(600);
  const task = tasks.find((t) => String(t.id) === String(taskId));
  if (!task) throw { response: { status: 404, data: { message: 'Task not found' } } };

  const step = task.task_steps.find((s) => String(s.id) === String(stepId));
  if (!step) throw { response: { status: 404, data: { message: 'Step not found' } } };

  const hintText = context_hint ? ` (${context_hint})` : ''

  // Create 3 sub-steps
  const newSteps = [
    { title: `${step.title} - Part 1`, description: `Sub-step 1 for ${step.title}${hintText}` },
    { title: `${step.title} - Part 2`, description: `Sub-step 2 for ${step.title}${hintText}` },
    { title: `${step.title} - Part 3`, description: `Sub-step 3 for ${step.title}${hintText}` },
  ].map((base, i) => ({
    id: nextMicroStepId++,
    task_id: task.id,
    parent_step_id: step.id,
    title: base.title,
    description: base.description,
    status: 'pending',
    is_completed: false,
    is_current_focus: false,
    estimated_duration: 15,
    order: step.order + i + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));

  // Replace step with children
  task.task_steps = task.task_steps.reduce((acc, s) => {
    if (String(s.id) === String(stepId)) {
      return acc.concat(newSteps);
    }
    return acc.concat(s);
  }, []);

  task.total_steps = task.task_steps.length;
  task.completed_steps = task.task_steps.filter((s) => s.is_completed).length;
  task.progress_percentage = task.total_steps ? Math.round((task.completed_steps / task.total_steps) * 100) : 0;
  task.updated_at = new Date().toISOString();

  return {
    success: true,
    message: 'Step successfully re-atomized into sub-steps.',
    data: { original_step_id: step.id, new_steps: newSteps },
  };
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

// Profile
export const mockGetProfile = async () => {
  await delay();
  return { success: true, data: mockUser };
};

export const mockUpdateProfile = async (payload) => {
  await delay();
  const updated = { ...mockUser, ...payload, updated_at: new Date().toISOString() };
  return { success: true, data: updated };
};

export const mockDeleteAccount = async ({ current_password }) => {
  await delay();
  if (current_password !== 'securepassword123') {
    throw { response: { status: 403, data: { error: { code: 'INVALID_CURRENT_PASSWORD', message: 'The current password you entered is incorrect.' } } } };
  }
  return { success: true, message: 'Account deleted successfully.' };
};

export const mockUploadAvatar = async (formData) => {
  await delay();
  const avatarKey = formData?.get?.('avatar') ? 'custom' : 'default';
  // Emulate avatar upload by using a placeholder URL
  const url = `https://cdn.atomizeplanner.com/avatars/1-${avatarKey}.jpg`;
  mockUser.avatar_url = url;
  return { success: true, data: { avatar_url: url } };
};

export const mockRemoveAvatar = async () => {
  await delay();
  return { success: true, data: { avatar_url: null } };
};

export const mockChangePassword = async ({ current_password, new_password, confirm_new_password }) => {
  await delay();
  if (current_password !== 'securepassword123') {
    throw { response: { status: 403, data: { error: { code: 'INVALID_CURRENT_PASSWORD', message: 'The current password you entered is incorrect.' } } } };
  }
  if (new_password !== confirm_new_password) {
    throw { response: { status: 400, data: { error: { code: 'PASSWORD_MISMATCH', message: 'New password and confirmation password do not match.' } } } };
  }
  return { success: true, message: 'Password changed successfully. Please log in again.' };
};

// History
export const mockGetWeeklySummary = async (week_offset = 0) => {
  await delay();
  const today = new Date();
  const weekOffsetMs = week_offset * 7 * 24 * 60 * 60 * 1000;
  const targetDate = new Date(today.getTime() - weekOffsetMs);
  const start = new Date(targetDate);
  start.setDate(targetDate.getDate() - targetDate.getDay());
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const week_label = `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${start.getFullYear()}`;

  return {
    success: true,
    data: {
      week_label,
      total_steps_completed: 78,
      daily_breakdown: [
        { day: 'Mon', count: 8 },
        { day: 'Tue', count: 14 },
        { day: 'Wed', count: 12 },
        { day: 'Thu', count: 15 },
        { day: 'Fri', count: 20 },
        { day: 'Sat', count: 5 },
        { day: 'Sun', count: 4 },
      ],
      achievements: {
        tasks_completed: 3,
        completion_percentage: 75,
      },
    },
  };
};

export const mockGetCompletedTasksHistory = async ({ page = 1, limit = 10, category } = {}) => {
  await delay();
  let completedTasks = tasks
    .filter((t) => t.status === 'completed')
    .map((t) => ({
      id: t.id,
      task_id: t.id,
      title: t.title,
      description: t.description,
      category: t.category ?? 'OTHER',
      steps_count: t.total_steps ?? (t.task_steps ? t.task_steps.length : 0),
      completed_at: t.updated_at,
    }));

  if (category) {
    completedTasks = completedTasks.filter((t) => String(t.category).toUpperCase() === String(category).toUpperCase());
  }

  const total_items = completedTasks.length;
  const total_pages = Math.max(1, Math.ceil(total_items / limit));
  const items = completedTasks.slice((page - 1) * limit, page * limit);

  return {
    success: true,
    data: {
      items,
      pagination: {
        current_page: page,
        total_pages,
        total_items,
        has_next_page: page < total_pages,
      },
    },
  };
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

