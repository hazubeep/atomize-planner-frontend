import ProgressBar from './ProgressBar'

const ProgressSection = ({ progress, done, total }) => {
  return (
    <div className="mb-[26px] rounded-[16px] border border-[#E5E7EB] bg-[#F3F4F6] p-4">
      <p className="mb-1.5 text-[11px] text-text-muted">Overall Progress</p>
      <div className="mb-3 flex items-baseline justify-between">
        <p className="text-[20px] font-bold text-text-primary">{progress}% Completed</p>
        <p className="text-[10px] font-semibold text-text-muted">
          {done} OF {total} STEPS
        </p>
      </div>
      <ProgressBar value={progress} />
    </div>
  )
}

export default ProgressSection
