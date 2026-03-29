import { cn } from '../../utils'

const Input = ({
  label,
  error,
  className = '',
  containerClassName = '',
  ...props
}) => (
  <div className={cn('flex flex-col gap-1.5', containerClassName)}>
    {label && <label className="text-sm font-medium text-text-primary">{label}</label>}
    <input
      className={cn(
        'w-full rounded-sm border border-border bg-surface px-4 py-2.5 text-sm text-text-primary',
        'placeholder:text-text-muted',
        'focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent',
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
