import ProgressBar from './ProgressBar'

// interpolate antara #BFEBE4 (0%) dan #3C6660 (100%)
const interpolateColor = (progress) => {
  const t = Math.min(100, Math.max(0, progress)) / 100
  const r = Math.round(0xBF + (0x3C - 0xBF) * t)
  const g = Math.round(0xEB + (0x66 - 0xEB) * t)
  const b = Math.round(0xE4 + (0x60 - 0xE4) * t)
  return `rgb(${r},${g},${b})`
}

const ProgressSection = ({ progress, done, total }) => {
  return (
    <div className="mb-[26px] rounded-[16px] border border-[#E5E7EB] bg-[#F3F4F6] p-4">
      <p className="mb-1.5 text-[11px] text-text-muted">Overall Progress</p>
      <div className="mb-3 flex items-baseline justify-between">
        <p className="text-[20px] font-bold" style={{ color: interpolateColor(progress) }}>
          {progress}% Completed
        </p>
        <p className="text-[10px] font-semibold text-text-muted">
          {done} OF {total} STEPS
        </p>
      </div>
      <ProgressBar value={progress} />
    </div>
  )
}

export default ProgressSection
