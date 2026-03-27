import { cn } from '../../utils'

const ProgressBar = ({ value = 0, className = '' }) => {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={cn('w-full', className)}>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${clamped}%`,
            background: 'linear-gradient(90deg, var(--color-accent), var(--color-teal))',
          }}
        />
      </div>
    </div>
  )
}

export default ProgressBar