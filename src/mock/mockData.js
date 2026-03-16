export const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
};

export const mockToken = "mock-token-abc123";

export const mockTasks = [
  {
    id: 1,
    user_id: 1,
    title: "Deep clean the kitchen",
    progress_percentage: 25,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    micro_steps: [
      { id: 1, task_id: 1, title: "Empty the dishwasher", is_completed: true, estimated_duration: 10, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
      { id: 2, task_id: 1, title: "Wipe down the countertops", is_completed: false, estimated_duration: 15, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
      { id: 3, task_id: 1, title: "Clean the stovetop", is_completed: false, estimated_duration: 20, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
      { id: 4, task_id: 1, title: "Mop the floor", is_completed: false, estimated_duration: 15, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    ],
  },
  {
    id: 2,
    user_id: 1,
    title: "Prepare presentation for Monday",
    progress_percentage: 50,
    created_at: "2024-01-02T00:00:00Z",
    updated_at: "2024-01-02T00:00:00Z",
    micro_steps: [
      { id: 5, task_id: 2, title: "Outline the main points", is_completed: true, estimated_duration: 20, created_at: "2024-01-02T00:00:00Z", updated_at: "2024-01-02T00:00:00Z" },
      { id: 6, task_id: 2, title: "Create slide structure", is_completed: true, estimated_duration: 30, created_at: "2024-01-02T00:00:00Z", updated_at: "2024-01-02T00:00:00Z" },
      { id: 7, task_id: 2, title: "Add visuals and charts", is_completed: false, estimated_duration: 45, created_at: "2024-01-02T00:00:00Z", updated_at: "2024-01-02T00:00:00Z" },
      { id: 8, task_id: 2, title: "Rehearse the presentation", is_completed: false, estimated_duration: 30, created_at: "2024-01-02T00:00:00Z", updated_at: "2024-01-02T00:00:00Z" },
    ],
  },
];
