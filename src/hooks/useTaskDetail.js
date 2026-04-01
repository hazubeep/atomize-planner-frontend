import { useState, useCallback } from 'react'
import { toggleMicroStep } from '../services/microStepService'
import { getTaskDetail, markStepWorking as markStepWorkingApi, reAtomizeStep as reAtomizeTaskStep } from '../services/taskService'

const useTaskDetail = (taskId, tasks, setTasks) => {
  const [error, setError] = useState(null)

  const task = tasks?.find((t) => String(t.id) === String(taskId)) ?? null

  const refreshTaskInState = useCallback(
    async () => {
      try {
        const detail = await getTaskDetail(taskId)
        const taskData = detail?.data ?? detail
        if (!taskData) return
        setTasks((prev) =>
          prev.map((t) =>
            String(t.id) !== String(taskId)
              ? t
              : {
                  ...t,
                  ...taskData,
                  micro_steps: taskData.micro_steps || taskData.task_steps || [],
                  task_steps: taskData.task_steps || taskData.micro_steps || [],
                }
          )
        )
      } catch {
        // ignore refresh failure; error state already handled by caller
      }
    },    [taskId, setTasks]
  )

  const toggleStep = useCallback(
    async (stepId, currentIsCompleted) => {
      setError(null)
      const newCompleted = !currentIsCompleted
      // Optimistic update
      setTasks((prev) =>
        prev.map((t) => {
          if (String(t.id) !== String(taskId)) return t
          const steps = t.micro_steps || t.task_steps || []
          const updatedSteps = steps.map((s) =>
            String(s.id) === String(stepId) ? { ...s, is_completed: newCompleted } : s
          )
          const done = updatedSteps.filter((s) => s.is_completed).length
          const progress = updatedSteps.length ? Math.round((done / updatedSteps.length) * 100) : 0
          return {
            ...t,
            micro_steps: updatedSteps,
            task_steps: updatedSteps,
            progress_percentage: progress,
          }
        })
      )
      try {
        await toggleMicroStep(taskId, stepId, newCompleted)
        await refreshTaskInState()
      } catch (err) {
        // Revert on error
        setTasks((prev) =>
          prev.map((t) => {
            if (String(t.id) !== String(taskId)) return t
            const steps = t.micro_steps || t.task_steps || []
            const revertedSteps = steps.map((s) =>
              String(s.id) === String(stepId) ? { ...s, is_completed: currentIsCompleted } : s
            )
            const done = revertedSteps.filter((s) => s.is_completed).length
            const progress = revertedSteps.length ? Math.round((done / revertedSteps.length) * 100) : 0
            return {
              ...t,
              micro_steps: revertedSteps,
              task_steps: revertedSteps,
              progress_percentage: progress,
            }
          })
        )
        setError(err.message)
        throw err
      }
    },
    [taskId, setTasks, refreshTaskInState]
  )

  const markStepWorking = useCallback(
    async (stepId) => {
      setError(null)
      try {
        await markStepWorkingApi(taskId, stepId)
        await refreshTaskInState()
      } catch (err) {
        setError(err.message)
        throw err
      }
    },
    [taskId, refreshTaskInState]
  )

  const reAtomizeStep = useCallback(
    async (stepId, context_hint = '') => {
      setError(null)
      try {
        await reAtomizeTaskStep(taskId, stepId, context_hint)
        await refreshTaskInState()
      } catch (err) {
        setError(err.message)
        throw err
      }
    },
    [taskId, refreshTaskInState]
  )

  return { task, error, toggleStep, markStepWorking, reAtomizeStep }
}

export default useTaskDetail
