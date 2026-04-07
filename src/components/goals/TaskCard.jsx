const categoryLabel = (category) => category
  ? category.charAt(0) + category.slice(1).toLowerCase().replace('_', ' ')
  : 'General'

const TaskCard = ({ task, onClick }) => {
  const steps = task.task_steps ?? task.micro_steps ?? []
  const total = steps.length
  const done = steps.filter((s) => s.is_completed).length
  const progress = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer flex-col rounded-xl border border-border bg-white p-6 shadow-sm transition hover:shadow-md"
    >
      {/* Category badge */}
      <span className="mb-4 inline-block w-fit rounded-lg bg-[#eff4fc] px-3 py-1 text-[11px] font-semibold text-[#565C63]">
        {categoryLabel(task.category)}
      </span>

      {/* Title */}
      <h3 className="mb-3 text-[17px] font-extrabold leading-snug text-text-primary">
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className="mb-5 line-clamp-2 text-[13px] leading-relaxed text-text-secondary">
          {task.description}
        </p>
      )}

      {/* Progress */}
      <div className="mt-auto">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[11px] font-medium text-text-muted">Overall Progress</span>
          <span className="text-[11px] font-semibold text-text-primary">{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#BFEBE4]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#3C6660] to-[#BFEBE4] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-1.5 text-[11px] text-text-muted">{done} of {total} steps done</p>
      </div>

      {/* Open */}
      <div className="mt-5 flex justify-end">
        <span className="text-[13px] font-bold text-[#3C6660]">Open &rsaquo;</span>
      </div>
    </div>
  )
}

export default TaskCard
