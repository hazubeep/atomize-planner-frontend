import { cn } from '../../utils'

const variants = {
  primary: 'bg-accent text-white hover:bg-accent-hover shadow-sm',
  secondary: 'bg-surface-2 text-text-primary hover:bg-border',
  ghost: 'bg-transparent text-text-secondary hover:bg-surface-2',
  teal: 'bg-teal text-white hover:opacity-90',
  danger: 'bg-red-50 text-red-600 hover:bg-red-100',
  outline: 'border border-border bg-transparent text-text-primary hover:bg-surface-2',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs font-medium',
  md: 'px-4 py-2 text-sm font-medium',
  lg: 'px-6 py-2.5 text-sm font-semibold',
  icon: 'p-2',
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'inline-flex cursor-pointer select-none items-center justify-center gap-2 rounded-sm transition-all duration-150',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  )
}

export default Button
