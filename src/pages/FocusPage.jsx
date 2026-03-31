import { useNavigate } from 'react-router-dom'
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

const StepRow = ({ step, isCurrent, onToggle, toggling, onStartFocus }) => {
  const done = step.is_completed
  return (
    <div
      role={isCurrent ? 'button' : undefined}
      tabIndex={isCurrent ? 0 : undefined}
      onClick={isCurrent ? onStartFocus : undefined}
      onKeyDown={
        isCurrent
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onStartFocus?.()
              }
            }
          : undefined
      }
      className={cn(
        'transition-opacity duration-200',
        isCurrent ? 'mb-1.5 rounded-[14px] border border-border bg-white p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.07)]' : 'border-b border-border py-3',
        !isCurrent && 'rounded-none border-x-0 border-t-0',
        toggling && 'opacity-50',
        isCurrent && 'cursor-pointer'
      )}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            if (isCurrent) onToggle(step.id, step.is_completed)
          }}
          className={cn(
            'flex-shrink-0 border-none bg-transparent p-0',
            isCurrent ? 'cursor-pointer' : 'cursor-default'
          )}
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

          <p
            className={cn(
              'leading-[1.45]',
              done && 'text-text-muted line-through',
              !done && isCurrent && 'text-sm font-semibold text-text-primary',
              !done && !isCurrent && 'text-[13px] text-text-secondary'
            )}
          >
            {step.title}
          </p>

          {isCurrent && (
            <div className="mt-3 flex gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onStartFocus?.()
                }}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-[#3C6660] px-3 py-1.5 text-xs font-medium text-[#DCFFF8]"
              >
                <img src={icon_pensil} alt="icon" width="12" height="12" />
                Mark Working
              </button>
              <button
                type="button"
                className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-transparent px-3 py-1.5 text-xs font-medium text-text-secondary"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 4v6h6M23 20v-6h-6" strokeLinecap="round" />
                  <path
                    d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"
                    strokeLinecap="round"
                  />
                </svg>
                ↺ Re-Atomize
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const FocusPage = () => {
  const { tasks, setTasks, loading, error, fetchTasks } = useTasks()
  const [activeTaskId, setActiveTaskId] = useState(null)
  const [toggling, setToggling] = useState(null)
  const navigate = useNavigate()

  const handleStartFocus = async (taskId, stepId) => {
    if (!taskId || !stepId) return
    try {
      await startFocusSession({
        task_id: taskId,
        step_id: stepId,
        duration_minutes: 25,
        session_notes: 'Focus session started from Focus page',
      })
      navigate('/DeepFocus', { state: { taskId, stepId } })
    } catch (err) {
      console.error('Start focus session error', err)
      // Could set local state for visible messages if needed
    }
  }

  const focusId =
    activeTaskId ?? tasks.find((t) => t.micro_steps?.some((s) => !s.is_completed))?.id ?? tasks[0]?.id ?? null

  const { task, toggleStep } = useTaskDetail(String(focusId), tasks, setTasks)

  const steps = task?.micro_steps ?? []
  const progress = task?.progress_percentage ?? 0
  const done = steps.filter((s) => s.is_completed).length
  const currentIdx = steps.findIndex((s) => !s.is_completed)
  const complexStep = steps.find((s) => !s.is_completed && s.estimated_duration >= 30) ?? null

  const handleToggle = async (stepId, currentIsCompleted) => {
    setToggling(stepId)
    try {
      await toggleStep(stepId, currentIsCompleted)
    } finally {
      setToggling(null)
    }
  }

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  if (error)
    return (
      <div className="pt-[22px]">
        <ErrorMessage message={error} onRetry={fetchTasks} />
      </div>
    )

  return (
    <>
    <div className="animate-fade-in flex flex-col pb-8 pt-[22px]">
      {tasks.length > 1 && (
        <div className="-mx-1 mb-5 flex gap-2 overflow-x-auto pb-1">
          {tasks.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTaskId(t.id)}
              className={cn(
                'flex-shrink-0 cursor-pointer whitespace-nowrap rounded-full border border-border px-3 py-1.5 text-[11px] font-medium',
                focusId === t.id ? 'bg-accent text-white' : 'bg-white text-text-secondary'
              )}
            >
              {t.title.slice(0, 24)}
              {t.title.length > 24 ? '…' : ''}
            </button>
          ))}
        </div>
      )}

      {task ? (
        <>
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-text-muted">Current Objective</p>
          <h1 className="mb-[22px] font-display text-[30px] font-normal leading-tight text-text-primary">
            {task.title}
          </h1>

          <ProgressSection progress={progress} done={done} total={steps.length} />

          <div className="mb-7 flex flex-col">
            {steps.map((step, i) => (
              <StepRow
                key={step.id}
                step={step}
                isCurrent={i === currentIdx}
                toggling={toggling === step.id}
                onToggle={handleToggle}
                onStartFocus={() => handleStartFocus(focusId, step.id)}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <div className="min-w-0 flex-1 rounded-2xl border border-border bg-white p-4">
              <div className="mb-2 flex items-center gap-[7px]">
                <span className="text-lg">💡</span>
                <span className="text-xs font-bold text-text-primary">AI Suggestion</span>
              </div>
              <p className="text-[11px] leading-relaxed text-text-secondary">
                You&apos;ve spent 4 hours on research today. AtomizePlanner suggests a 15-minute cognitive break before
                shifting.
              </p>
            </div>

            {complexStep && (
              <div className="min-w-0 flex-1 rounded-2xl border border-teal-border bg-teal-light p-4">
                <p className="mb-1.5 text-[10px] font-extrabold uppercase tracking-wide text-teal">Complexity Alert</p>
                <p className="mb-3 text-[11px] leading-relaxed text-text-secondary">
                  Step &quot;{complexStep.title.slice(0, 28)}...&quot; seems broad. Would you like to break it into
                  specific steps?
                </p>
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center rounded-lg border-none bg-teal px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white"
                >
                  Deconstruct Now
                </button>
              </div>
            )}
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
