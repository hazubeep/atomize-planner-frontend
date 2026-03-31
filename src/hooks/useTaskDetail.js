import { useState, useCallback } from 'react'
import { toggleMicroStep } from '../services/microStepService'

const useTaskDetail = (taskId, tasks, setTasks) => {
  const [error, setError] = useState(null)

  const task = tasks?.find(t => String(t.id) === String(taskId)) ?? null

  const toggleStep = useCallback(async (stepId, currentIsCompleted) => {
    setError(null)
    const newCompleted = !currentIsCompleted
    // Optimistic update
    setTasks(prev => prev.map(t => {
      if (String(t.id) !== String(taskId)) return t
      const updatedSteps = t.micro_steps.map(s =>
        s.id === stepId ? { ...s, is_completed: newCompleted } : s
      )
      const done = updatedSteps.filter(s => s.is_completed).length
      const progress = updatedSteps.length ? Math.round((done / updatedSteps.length) * 100) : 0
      return { ...t, micro_steps: updatedSteps, progress_percentage: progress }
    }))
    try {
      return await toggleMicroStep(taskId, stepId, newCompleted)
    } catch (err) {
      // Revert on error
      setTasks(prev => prev.map(t => {
        if (String(t.id) !== String(taskId)) return t
        const revertedSteps = t.micro_steps.map(s =>
          s.id === stepId ? { ...s, is_completed: currentIsCompleted } : s
        )
        const done = revertedSteps.filter(s => s.is_completed).length
        const progress = revertedSteps.length ? Math.round((done / revertedSteps.length) * 100) : 0
        return { ...t, micro_steps: revertedSteps, progress_percentage: progress }
      }))
      setError(err.message)
      throw err
    }
  }, [taskId, setTasks])

  return { task, error, toggleStep }
}

export default useTaskDetail
