import { cn } from '../../utils'

const ProgressBar = ({ value = 0, className = '' }) => {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={cn('w-full', className)}>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#BFEBE4]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#3C6660] to-[#BFEBE4] transition-all duration-500 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
