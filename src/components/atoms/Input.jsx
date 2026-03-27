import { cn } from '../../utils'

const Input = ({
  label,
  error,
  className = '',
  containerClassName = '',
  ...props
}) => (
  <div className={cn('flex flex-col gap-1.5', containerClassName)}>
    {label && (
      <label className="text-sm font-medium text-[var(--color-text-primary)]">
        {label}
      </label>
    )}
    <input
      className={cn(
        'w-full px-4 py-2.5 rounded-[var(--radius-sm)] border border-[var(--color-border)]',
        'bg-[var(--color-surface)] text-[var(--color-text-primary)] text-sm',
        'placeholder:text-[var(--color-text-muted)]',
        'focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent',
        'transition-all duration-150',
        error && 'border-red-400 focus:ring-red-400',
        className
      )}
      {...props}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
)

export default Input
