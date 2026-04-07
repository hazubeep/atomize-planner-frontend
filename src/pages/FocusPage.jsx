import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { cn } from '../utils'
import useTasks from '../hooks/useTasks'
import useTaskDetail from '../hooks/useTaskDetail'
import { startFocusSession } from '../services/focusService'
import Spinner from '../components/atoms/Spinner'
import ErrorMessage from '../components/atoms/ErrorMessage'
import AddGoalButton from '../components/molecules/AddGoalButton'
import ProgressSection from '../components/atoms/ProgressSection'
import icon_pensil from '../assets/pensil.svg'

const CircleDone = () => (
  <div className="mt-0.5 flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full bg-accent">
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
)

const CircleEmpty = ({ isCurrent }) => (
  <div
    className={cn(
      'mt-0.5 h-[22px] w-[22px] flex-shrink-0 rounded-full border bg-transparent',
      isCurrent ? 'border-2 border-text-secondary' : 'border-[1.5px] border-border'
    )}
  />
)

const StepRow = ({ step, isCurrent, toggling, onStartFocus, onEdit, onMarkWorking }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(step.title)
  const [editDesc, setEditDesc] = useState(step.description || '')
  
  const done = step.is_completed

  const handleSave = async (e) => {
    e.stopPropagation()
    if (onEdit) {
      await onEdit(step.id, { title: editTitle, description: editDesc })
    }
    setIsEditing(false)
  }

  const handleCancel = (e) => {
    e.stopPropagation()
    setEditTitle(step.title)
    setEditDesc(step.description || '')
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className={cn(
        'mb-1.5 rounded-[14px] border border-border bg-white p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.07)]',
        toggling && 'opacity-50 pointer-events-none'
      )}>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full rounded border border-border bg-white p-2 text-sm text-text-primary outline-none focus:border-[#3C6660]"
            placeholder="Step title"
          />
          <textarea
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            className="w-full resize-none rounded border border-border bg-white p-2 text-xs text-text-secondary outline-none focus:border-[#3C6660]"
            placeholder="Description (optional)"
            rows={2}
          />
          <div className="mt-1 flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="cursor-pointer rounded bg-transparent px-3 py-1.5 text-xs font-medium text-text-secondary border border-border"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="cursor-pointer rounded bg-[#3C6660] px-3 py-1.5 text-xs font-medium text-white transition hover:brightness-90"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      role={isCurrent ? 'button' : undefined}
      tabIndex={isCurrent ? 0 : undefined}
      onClick={isCurrent ? onStartFocus : undefined}
      onKeyDown={
        isCurrent
          ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onStartFocus?.() } }
          : undefined
      }
      className={cn(
        'transition-opacity duration-200',
        isCurrent ? 'mb-1.5 rounded-[14px] border border-border bg-white p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.07)]' : 'border-b border-border py-3',
        !isCurrent && 'rounded-none border-x-0 border-t-0',
        toggling && 'opacity-50 pointer-events-none',
        isCurrent && 'cursor-pointer'
      )}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); if (isCurrent) onStartFocus?.() }}
          className={cn('flex-shrink-0 border-none bg-transparent p-0', isCurrent ? 'cursor-pointer' : 'cursor-default')}
        >
          {done ? <CircleDone /> : <CircleEmpty isCurrent={isCurrent} />}
        </button>

        <div className="min-w-0 flex-1">
          {isCurrent && (
            <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-warning-border bg-warning-light px-2 py-0.5">
              <div className="h-1.5 w-1.5 rounded-full bg-warning" />
              <span className="text-[9px] font-bold uppercase tracking-wide text-warning">Current Focus</span>
            </div>
          )}
          <p className={cn(
            'leading-[1.45]',
            done && 'text-text-muted line-through',
            !done && isCurrent && 'text-sm font-semibold text-text-primary',
            !done && !isCurrent && 'text-[13px] text-text-secondary'
          )}>
            {step.title}
          </p>
          {step.description && (
            <p className="mt-1 text-xs leading-relaxed text-text-muted">{step.description}</p>
          )}
          {isCurrent && (
            <div className="mt-3 flex gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={async (e) => { e.stopPropagation(); await onMarkWorking?.(); onStartFocus?.() }}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-[#3C6660] px-3 py-1.5 text-xs font-medium text-[#DCFFF8]"
              >
                <img src={icon_pensil} alt="icon" width="12" height="12" />
                Mark Working
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setIsEditing(true) }}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-transparent px-3 py-1.5 text-xs font-medium text-text-secondary"
              >
                <img src={icon_pensil} alt="edit" width="12" height="12" />
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const FocusPage = () => {
  const location = useLocation()
  const { tasks, setTasks, loading, error, fetchTasks } = useTasks()
  const [editingStep, setEditingStep] = useState(null)
  const [working, setWorking] = useState(null)
  const navigate = useNavigate()

  const urlTaskId = location.state?.taskId

  const focusId =
    urlTaskId ??
    tasks.find((t) => t.task_steps?.some((s) => !s.is_completed))?.id ??
    tasks[0]?.id ??
    null

  const { task, markStepWorking, editStep } = useTaskDetail(String(focusId), tasks, setTasks)
  // use task_steps (API v4) with fallback to micro_steps
  const steps = task?.task_steps ?? task?.micro_steps ?? []
  const total = steps.length
  const done = steps.filter((s) => s.is_completed).length
  const progress = total > 0 ? Math.round((done / total) * 100) : 0
  const currentIdx = steps.findIndex((s) => !s.is_completed && s.status !== 'completed')


  const handleStartFocus = async (taskId, stepId) => {
    if (!taskId || !stepId) return
    try {
      await startFocusSession({ task_id: taskId, step_id: stepId, duration_minutes: 25 })
    } catch (err) {
      console.error('Start focus session error (continuing navigation anyway):', err)
    } finally {
      navigate('/DeepFocus', { state: { taskId, stepId } })
    }
  }

  const handleMarkWorking = async (stepId) => {
    setWorking(stepId)
    try { await markStepWorking(stepId) } finally { setWorking(null) }
  }

  const handleEdit = async (stepId, payload) => {
    setEditingStep(stepId)
    try { await editStep(stepId, payload) } finally { setEditingStep(null) }
  }

  if (loading)
    return <div className="flex justify-center py-20"><Spinner size="lg" /></div>
  if (error)
    return <div className="pt-[22px]"><ErrorMessage message={error} onRetry={fetchTasks} /></div>

  return (
    <>
      <div className="animate-fade-in flex flex-col pb-8 pt-[22px]">
        {task ? (
          <>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-text-muted">Current Objective</p>
            <h1 className="mb-[22px] font-display text-[30px] font-normal leading-tight text-text-primary">
              {task.title}
            </h1>

            <ProgressSection progress={progress} done={done} total={total} />

            <div className="mb-7 flex flex-col">
              {steps.map((step, i) => (
                <StepRow
                  key={step.id}
                  step={step}
                  isCurrent={i === currentIdx}
                  toggling={editingStep === step.id || working === step.id}
                  onStartFocus={() => handleStartFocus(focusId, step.id)}
                  onEdit={(stepId, payload) => handleEdit(stepId, payload)}
                  onMarkWorking={() => handleMarkWorking(step.id)}
                />
              ))}
            </div>

            {/* AI Suggestion */}
            <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-white p-4 text-center">
              <div className="mb-2 flex items-center justify-center gap-[7px]">
                <span className="text-lg">💡</span>
                <span className="text-xs font-bold text-text-primary">AI Suggestion</span>
              </div>
              <p className="text-[11px] leading-relaxed text-text-secondary">
                {task.ai_suggestion?.message ?? 'Keep going! You are making great progress.'}
              </p>
            </div>
          </>
        ) : (
          <div className="py-[60px] text-center">
            <div className="mb-3 text-[40px]">🎯</div>
            <p className="mb-1.5 text-sm font-semibold text-text-primary">No active task</p>
            <p className="mb-5 text-xs text-text-muted">Create a goal and AI will break it into steps.</p>
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="cursor-pointer rounded-[10px] border-none bg-accent px-5 py-2.5 text-[13px] font-medium text-white"
            >
              ✨ New Goal
            </button>
          </div>
        )}
      </div>
      <AddGoalButton />
    </>
  )
}

export default FocusPage
