import { useNavigate } from 'react-router-dom'

const AddGoalButton = () => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate('/home')}
      style={{
        position:'fixed',
        bottom:'82px',
        right:'20px',
        width:'48px',
        height:'48px',
        borderRadius:'50%',
        backgroundColor:'var(--color-accent-dark)',
        border:'none',
        boxShadow:'0 4px 16px rgba(0,0,0,0.25)',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        cursor:'pointer',
        zIndex:20
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
        <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
      </svg>
    </button>
  )
}

export default AddGoalButton