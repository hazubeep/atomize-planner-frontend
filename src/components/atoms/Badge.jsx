import { cn } from '../../utils'

const base =
  'inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-semibold text-text-secondary shadow-sm'

const variants = {
  default: '',
  active: 'border-amber-200 bg-amber-50 text-amber-800',
}

const Badge = ({ children, className = '', variant = 'default' }) => (
  <span className={cn(base, variants[variant] ?? variants.default, className)}>{children}</span>
)

export default Badge
