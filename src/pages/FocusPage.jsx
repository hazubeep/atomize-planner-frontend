import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useTasks from '../hooks/useTasks'
import useTaskDetail from '../hooks/useTaskDetail'
import Spinner from '../components/atoms/Spinner'
import ErrorMessage from '../components/atoms/ErrorMessage'
import AddGoalButton from '../components/molecules/AddGoalButton'
import ProgressSection from '../components/atoms/ProgressSection'
import icon_pensil from '../assets/pensil.svg'

const CircleDone = () => (
  <div style={{ width:22, height:22, borderRadius:'50%', backgroundColor:'var(--color-accent)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2 }}>
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
)

const CircleEmpty = ({ isCurrent }) => (
  <div style={{ width:22, height:22, borderRadius:'50%', border: isCurrent ? '2px solid var(--color-text-secondary)' : '1.5px solid var(--color-border)', backgroundColor:'transparent', flexShrink:0, marginTop:2 }} />
)

const StepRow = ({ step, isCurrent, onToggle, toggling }) => {
  const done = step.is_completed
  return (
    <div style={{
      borderRadius: isCurrent ? '14px' : 0,
      border: isCurrent ? '1px solid var(--color-border)' : 'none',
      borderBottom: !isCurrent ? '1px solid var(--color-border)' : 'none',
      backgroundColor: isCurrent ? '#fff' : 'transparent',
      boxShadow: isCurrent ? '0 2px 12px rgba(0,0,0,0.07)' : 'none',
      padding: isCurrent ? '14px' : '12px 0',
      marginBottom: isCurrent ? '6px' : 0,
      opacity: toggling ? 0.5 : 1,
      transition: 'opacity 0.2s',
    }}>
      <div style={{ display:'flex', alignItems:'flex-start', gap:'12px' }}>
        <button onClick={() => isCurrent ? onToggle(step.id, step.is_completed) : null}
          style={{ background:'none', border:'none', cursor: isCurrent ? 'pointer' : 'default', padding:0, flexShrink:0 }}>
          {done ? <CircleDone /> : <CircleEmpty isCurrent={isCurrent} />}
        </button>

        <div style={{ flex:1 }}>
          {isCurrent && (
            <div style={{ display:'inline-flex', alignItems:'center', gap:'5px', backgroundColor:'var(--color-warning-light)', border:'1px solid var(--color-warning-border)', borderRadius:'20px', padding:'2px 9px', marginBottom:'7px' }}>
              <div style={{ width:6, height:6, borderRadius:'50%', backgroundColor:'var(--color-warning)' }} />
              <span style={{ fontSize:'9px', fontWeight:'700', color:'var(--color-warning)', letterSpacing:'0.6px', textTransform:'uppercase' }}>Current Focus</span>
            </div>
          )}

          <p style={{
            fontSize: isCurrent ? '14px' : '13px',
            fontWeight: isCurrent ? '600' : '400',
            color: done ? 'var(--color-text-muted)' : isCurrent ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            textDecoration: done ? 'line-through' : 'none',
            lineHeight: '1.45',
          }}>
            {step.title}
          </p>

          {isCurrent && (
            <div style={{ display:'flex', gap:'8px', marginTop:'12px' }}>
              <button onClick={() => onToggle(step.id, false)}
                style={{ display:'flex', alignItems:'center', gap:'5px', padding:'6px 13px', backgroundColor:'#3C6660', border:'1px solid var(--color-border)', borderRadius:'8px', fontSize:'12px', fontWeight:'500', color:'#DCFFF8', cursor:'pointer' }}>
                <img src={icon_pensil} alt="icon" width="12" height="12" />
                Mark Working
              </button>
              <button style={{ display:'flex', alignItems:'center', gap:'5px', padding:'6px 13px', backgroundColor:'transparent', border:'1px solid var(--color-border)', borderRadius:'8px', fontSize:'12px', fontWeight:'500', color:'var(--color-text-secondary)', cursor:'pointer' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 4v6h6M23 20v-6h-6" strokeLinecap="round"/>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" strokeLinecap="round"/>
                </svg>
                ↺ Re-Atomize
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const FocusPage = () => {
  const { tasks, setTasks, loading, error, fetchTasks,} = useTasks()
  const [activeTaskId, setActiveTaskId] = useState(null)
  const [toggling, setToggling]   = useState(null)
  const navigate = useNavigate()

  // Pick first task with incomplete step, or first task
  const focusId = activeTaskId
    ?? tasks.find(t => t.micro_steps?.some(s => !s.is_completed))?.id
    ?? tasks[0]?.id
    ?? null

  const { task, toggleStep } = useTaskDetail(String(focusId), tasks, setTasks)

  const steps      = task?.micro_steps ?? []
  const progress   = task?.progress_percentage ?? 0
  const done       = steps.filter(s => s.is_completed).length
  const currentIdx = steps.findIndex(s => !s.is_completed)
  const complexStep = steps.find(s => !s.is_completed && s.estimated_duration >= 30) ?? null

  const handleToggle = async (stepId, currentIsCompleted) => {
    setToggling(stepId)
    try { await toggleStep(stepId, currentIsCompleted) }
    finally { setToggling(null) }
  }

  if (loading) return <div style={{ display:'flex', justifyContent:'center', padding:'80px 0' }}><Spinner size="lg"/></div>
  if (error)   return <ErrorMessage message={error} onRetry={fetchTasks}/>

  return (
    <div style={{ padding:'22px 20px 100px', animation:'fadeIn 0.25s ease' }}>

      {/* Task selector tabs (if multiple tasks) */}
      {tasks.length > 1 && (
        <div style={{ display:'flex', gap:'8px', overflowX:'auto', marginBottom:'20px', paddingBottom:'4px' }}>
          {tasks.map(t => (
            <button key={t.id} onClick={() => setActiveTaskId(t.id)}
              style={{ flexShrink:0, padding:'5px 12px', borderRadius:'20px', border:'1px solid var(--color-border)', backgroundColor: focusId === t.id ? 'var(--color-accent)' : '#fff', color: focusId === t.id ? '#fff' : 'var(--color-text-secondary)', fontSize:'11px', fontWeight:'500', cursor:'pointer', whiteSpace:'nowrap' }}>
              {t.title.slice(0, 24)}{t.title.length > 24 ? '…' : ''}
            </button>
          ))}
        </div>
      )}

      {task ? (
        <>
          {/* CURRENT OBJECTIVE */}
          <p style={{ fontSize:'10px', fontWeight:'600', textTransform:'uppercase', letterSpacing:'1px', color:'var(--color-text-muted)', marginBottom:'6px' }}>
            Current Objective
          </p>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'30px', fontWeight:'400', color:'var(--color-text-primary)', lineHeight:'1.2', marginBottom:'22px' }}>
            {task.title}
          </h1>

          {/* Progress */}
            <ProgressSection
              progress={progress}
              done={done}
              total={steps.length}
            />

          {/* Steps */}
          <div style={{ display:'flex', flexDirection:'column', marginBottom:'28px' }}>
            {steps.map((step, i) => (
              <StepRow
                key={step.id}
                step={step}
                isCurrent={i === currentIdx}
                toggling={toggling === step.id}
                onToggle={handleToggle}
              />
            ))}
          </div>

          {/* Bottom panels */}
          <div style={{ display:'flex', gap:'12px' }}>
            <div style={{ flex:'1 1 0', backgroundColor:'#fff', border:'1px solid var(--color-border)', borderRadius:'16px', padding:'16px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'7px', marginBottom:'8px' }}>
                <span style={{ fontSize:'18px' }}>💡</span>
                <span style={{ fontSize:'12px', fontWeight:'700', color:'var(--color-text-primary)' }}>AI Suggestion</span>
              </div>
              <p style={{ fontSize:'11px', color:'var(--color-text-secondary)', lineHeight:'1.6' }}>
                You've spent 4 hours on research today. AtomizePlanner suggests a 15-minute cognitive break before shifting.
              </p>
            </div>

            {complexStep && (
              <div style={{ flex:'1 1 0', backgroundColor:'var(--color-teal-light)', border:'1px solid var(--color-teal-border)', borderRadius:'16px', padding:'16px' }}>
                <p style={{ fontSize:'10px', fontWeight:'800', textTransform:'uppercase', letterSpacing:'0.6px', color:'var(--color-teal)', marginBottom:'7px' }}>
                  Complexity Alert
                </p>
                <p style={{ fontSize:'11px', color:'var(--color-text-secondary)', lineHeight:'1.6', marginBottom:'12px' }}>
                  Step "{complexStep.title.slice(0, 28)}..." seems broad. Would you like to break it into specific steps?
                </p>
                <button style={{ display:'inline-flex', alignItems:'center', padding:'7px 14px', backgroundColor:'var(--color-teal)', border:'none', borderRadius:'8px', fontSize:'10px', fontWeight:'700', color:'#fff', cursor:'pointer', letterSpacing:'0.5px', textTransform:'uppercase' }}>
                  Deconstruct Now
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Empty state */
        <div style={{ textAlign:'center', padding:'60px 20px' }}>
          <div style={{ fontSize:'40px', marginBottom:'12px' }}>🎯</div>
          <p style={{ fontSize:'14px', fontWeight:'600', color:'var(--color-text-primary)', marginBottom:'6px' }}>No active task</p>
          <p style={{ fontSize:'12px', color:'var(--color-text-muted)', marginBottom:'20px' }}>Create a goal and AI will break it into steps.</p>
          <button onClick={() => navigate('/home')}
            style={{ padding:'10px 20px', backgroundColor:'var(--color-accent)', border:'none', borderRadius:'10px', fontSize:'13px', fontWeight:'500', color:'#fff', cursor:'pointer' }}>
            ✨ New Goal
          </button>
        </div>
      )}

      {/* FAB */}
      <AddGoalButton />
    </div>
  )
}

export default FocusPage
