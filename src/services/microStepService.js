import { toggleTaskStep } from './taskService'
import { mockToggleMicroStep } from '../mock/mockService'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

// Legacy helper to keep existing hook/signature compatible while migrating to new API contract.
export const toggleMicroStep = async (taskId, stepId, is_completed) => {
  if (USE_MOCK) return mockToggleMicroStep(stepId, is_completed)
  if (!taskId) throw new Error('taskId is required to toggle a step in the new API')
  return toggleTaskStep(taskId, stepId, is_completed)
}

