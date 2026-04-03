import { useState, useEffect, useCallback } from 'react'
import { getTasks, addTaskAtomize, deleteTask } from '../services/taskService'

const useTasks = () => {
  const [tasks, setTasks]     = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const normalizeTask = (task) => {
    if (task?.task_steps && !task.micro_steps) {
      return { ...task, micro_steps: task.task_steps }
    }
    if (task?.micro_steps && !task.task_steps) {
      return { ...task, task_steps: task.micro_steps }
    }
    return task
  }

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getTasks()
      // Normalise: API may return { data: [...] } or directly [...]
      const list = Array.isArray(data) ? data : data?.data ?? []
      setTasks(list.map((t) => normalizeTask(t)))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const createTask = useCallback(async (title) => {
    setLoading(true)
    setError(null)
    try {
      const newTask = await addTaskAtomize(title)
      await fetchTasks() // refresh list after creation
      return newTask
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [fetchTasks])

  const removeTask = useCallback(async (id) => {
    setError(null)
    try {
      await deleteTask(id)
      setTasks((prev) => prev.filter((t) => t.id !== id && t._id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [])

  return {
    tasks,
    setTasks,
    loading,
    error,
    fetchTasks,
    createTask,
    removeTask,
  }
}

export default useTasks
