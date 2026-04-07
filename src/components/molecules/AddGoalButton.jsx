import { useNavigate } from 'react-router-dom'

/** Floating button inside dashboard pages */
const AddGoalButton = () => {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate('/home')}
      className="fixed bottom-[72px] right-5 z-[45] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-none bg-accent-dark shadow-[0_4px_16px_rgba(0,0,0,0.25)] sm:bottom-6"
      aria-label="Add goal"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
      </svg>
    </button>
  )
}

export default AddGoalButton
