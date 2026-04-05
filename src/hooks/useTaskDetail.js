import { useState, useCallback } from 'react'
import { toggleTaskStep, markStepWorking as markStepWorkingApi, reAtomizeStep as reAtomizeStepApi, getTaskDetail, updateTaskStep } from '../services/taskService'

const useTaskDetail = (taskId, tasks, setTasks) => {
  const [error, setError] = useState(null)

  const task = tasks?.find((t) => String(t.id) === String(taskId)) ?? null

  const refreshTaskInState = useCallback(async () => {
    try {
      const res = await getTaskDetail(taskId)
      const taskData = res?.data ?? res
      if (!taskData) return
      setTasks((prev) =>
        prev.map((t) =>
          String(t.id) !== String(taskId) ? t : { ...t, ...taskData, task_steps: taskData.task_steps || [] }
        )
      )
    } catch {
      // ignore refresh failure
    }
  }, [taskId, setTasks])

  const toggleStep = useCallback(
    async (stepId, currentIsCompleted) => {
      setError(null)
      const newCompleted = !currentIsCompleted
      // Optimistic update
      setTasks((prev) =>
        prev.map((t) => {
          if (String(t.id) !== String(taskId)) return t
          const steps = t.task_steps || []
          const updatedSteps = steps.map((s) =>
            String(s.id) === String(stepId) ? { ...s, is_completed: newCompleted, status: newCompleted ? 'completed' : 'pending' } : s
          )
          const done = updatedSteps.filter((s) => s.is_completed).length
          return {
            ...t,
            task_steps: updatedSteps,
            completed_steps: done,
            progress_percentage: updatedSteps.length ? Math.round((done / updatedSteps.length) * 100) : 0,
          }
        })
      )
      try {
        await toggleTaskStep(taskId, stepId, newCompleted)
        await refreshTaskInState()
      } catch (err) {
        // Revert on error
        setTasks((prev) =>
          prev.map((t) => {
            if (String(t.id) !== String(taskId)) return t
            const steps = t.task_steps || []
            const revertedSteps = steps.map((s) =>
              String(s.id) === String(stepId) ? { ...s, is_completed: currentIsCompleted } : s
            )
            const done = revertedSteps.filter((s) => s.is_completed).length
            return {
              ...t,
              task_steps: revertedSteps,
              completed_steps: done,
              progress_percentage: revertedSteps.length ? Math.round((done / revertedSteps.length) * 100) : 0,
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
        await reAtomizeStepApi(taskId, stepId, context_hint)
        await refreshTaskInState()
      } catch (err) {
        setError(err.message)
        throw err
      }
    },
    [taskId, refreshTaskInState]
  )

  const editStep = useCallback(
    async (stepId, payload) => {
      setError(null)
      try {
        await updateTaskStep(taskId, stepId, payload)
        await refreshTaskInState()
      } catch (err) {
        setError(err.message)
        throw err
      }
    },
    [taskId, refreshTaskInState]
  )

  return { task, error, toggleStep, markStepWorking, reAtomizeStep, editStep }
}

export default useTaskDetail
