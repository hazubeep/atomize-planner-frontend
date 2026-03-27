import StepItem from '../molecules/StepItem'
import EmptyState from '../atoms/EmptyState'

const StepList = ({ steps = [], taskId, onMarkWorking, onReatomize, onDeconstruct }) => {
  if (!steps.length) {
    return (
      <EmptyState
        title="Belum ada langkah"
        description="Goal ini belum dipecah menjadi langkah-langkah. Coba atomize ulang."
      />
    )
  }

  return (
    <div className="flex flex-col gap-1">
      {steps.map((step, index) => (
        <StepItem
          key={step.id ?? step._id ?? index}
          step={step}
          taskId={taskId}
          index={index}
          onMarkWorking={onMarkWorking}
          onReatomize={onReatomize}
          onDeconstruct={onDeconstruct}
        />
      ))}
    </div>
  )
}

export default StepList
