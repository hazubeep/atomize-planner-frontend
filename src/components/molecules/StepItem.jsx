import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { cn } from '../../utils'
import Button from '../Atoms/Button'
import Badge from '../Atoms/Badge'

const StatusIcon = ({ status }) => {
  if (status === 'completed') {
    return (
      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    )
  }
  if (status === 'in_progress') {
    return (
      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-accent">
        <span className="h-2 w-2 rounded-full bg-accent" />
      </span>
    )
  }
  return (
    <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-[var(--color-border)]" />
  )
}

const StepItem = ({ step, taskId, onMarkWorking, onReatomize, index }) => {
  const [loadingWorking, setLoadingWorking] = useState(false)
  const [loadingReatomize, setLoadingReatomize] = useState(false)
  const navigate = useNavigate();

  const stepId = step.id ?? step._id
  const isCompleted  = step.status === 'completed'
  const isInProgress = step.status === 'in_progress'
  const isCurrent    = isInProgress

  const handleMarkWorking = async () => {
    setLoadingWorking(true)
    try {
      await onMarkWorking?.(stepId)
      navigate('/DeepFocus', { state: { taskId, stepId } })
    } finally {
      setLoadingWorking(false)
    }
  }

  const handleReatomize = async () => {
    setLoadingReatomize(true)
    try { await onReatomize?.(stepId) } finally { setLoadingReatomize(false) }
  }

  return (
    <div
      className={cn(
        'rounded-md border transition-all duration-200 animate-fade-in',
        isCurrent ? 'border-border bg-surface shadow-md' : 'border-transparent bg-transparent',
        isCompleted && 'opacity-60'
      )}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start gap-3 p-3">
        <div className="mt-0.5">
          <StatusIcon status={step.status} />
        </div>

        <div className="flex-1 min-w-0">
          {isCurrent && (
            <Badge variant="active" className="mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
              CURRENT FOCUS
            </Badge>
          )}

          <p
            className={cn(
              'text-sm leading-snug',
              isCompleted
                ? 'text-text-muted line-through'
                : isCurrent
                  ? 'font-semibold text-text-primary'
                  : 'text-text-secondary'
            )}
          >
            {step.title ?? step.description ?? step.name}
          </p>

          {/* Always show description when available */}
          {step.description && step.description !== step.title && (
            <p className="mt-1 text-xs leading-relaxed text-text-muted">
              {step.description}
            </p>
          )}

          {/* Action buttons for current step */}
          {isCurrent && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <Button
                size="sm"
                variant="secondary"
                loading={loadingWorking}
                onClick={handleMarkWorking}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                Mark Working
              </Button>
              <Button
                size="sm"
                variant="outline"
                loading={loadingReatomize}
                onClick={handleReatomize}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 4v6h6M23 20v-6h-6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Re-Atomize
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StepItem
