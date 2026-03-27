import { cn } from '../../utils'

const variants = {
  primary:   'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] shadow-sm',
  secondary: 'bg-[var(--color-surface-2)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)]',
  ghost:     'bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)]',
  teal:      'bg-[var(--color-teal)] text-white hover:opacity-90',
  danger:    'bg-red-50 text-red-600 hover:bg-red-100',
  outline:   'border border-[var(--color-border)] bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)]',
}

const sizes = {
  sm:  'px-3 py-1.5 text-xs font-medium',
  md:  'px-4 py-2 text-sm font-medium',
  lg:  'px-6 py-2.5 text-sm font-semibold',
  icon:'p-2',
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
        'inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] transition-all duration-150 cursor-pointer select-none',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}

export default Button
