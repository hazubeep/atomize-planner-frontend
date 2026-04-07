import { useNavigate } from 'react-router-dom'
import useTasks from '../hooks/useTasks'
import Spinner from '../components/atoms/Spinner'
import ErrorMessage from '../components/atoms/ErrorMessage'
import calmWorkspace from '../assets/Calm workspace.png'
import TaskCard from '../components/Goals/TaskCard'
import EmptyCard from '../components/Goals/EmptyCard'

const GoalsPage = () => {
  const navigate = useNavigate()
  const { tasks, loading, error, fetchTasks } = useTasks()

  // only active tasks
  const activeTasks = tasks.filter((t) => t.status !== 'completed' && t.status !== 'archived')

  // always show exactly one empty card at the end
  const items = [...activeTasks, null]

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>
  if (error) return <div className="pt-6"><ErrorMessage message={error} onRetry={fetchTasks} /></div>

  return (
    <div className="-mx-5 pb-10 pt-6 sm:-mx-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between px-5 sm:px-8">
        <h1 className="text-2xl font-semibold text-text-primary">Current Goals</h1>
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 rounded-full bg-[#3C6660] py-2 pl-3 pr-4 transition hover:brightness-90"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#DCFFF8]">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke="#3C6660" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="text-sm font-semibold text-[#DCFFF8]">Atomize</span>
        </button>
      </div>

      {/* Task grid — 2 columns */}
      <div className="mb-8 grid grid-cols-1 gap-5 px-5 sm:grid-cols-2 sm:px-8">
        {items.map((task, i) =>
          task ? (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => navigate('/focus', { state: { taskId: task.id } })}
            />
          ) : (
            <EmptyCard key={`empty-${i}`} onClick={() => navigate('/home')} />
          )
        )}
      </div>

      {/* Bottom info card */}
      <div className="mx-5 flex items-center gap-5 overflow-hidden rounded-xl bg-[#F4F4F0] p-6 sm:mx-8">
        <div className="flex-1">
          <h3 className="mb-2 text-[15px] font-bold text-text-primary">The Power of Focus</h3>
          <p className="text-[12px] leading-relaxed text-text-secondary">
            One major goal at a time leads to faster mastery than ten goals pursued simultaneously.
            Choose your primary intent for the week and let the Sanctuary handle the noise.
          </p>
        </div>
        <img
          src={calmWorkspace}
          alt="Calm workspace"
          className="h-20 w-20 shrink-0 rounded-full object-cover"
        />
      </div>
    </div>
  )
}

export default GoalsPage
