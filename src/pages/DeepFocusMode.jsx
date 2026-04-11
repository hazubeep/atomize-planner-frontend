import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useTasks from '../hooks/useTasks'
import {
  getActiveFocusSession,
  completeFocusSession,
  cancelFocusSession,
} from '../services/focusService'
import { updateTaskStep } from '../services/taskService'
import Spinner from '../components/atoms/Spinner'

import tandaPanah from '../assets/tanda_panah.svg'
import saveIcon from '../assets/save.svg'
import ceklisIcon from '../assets/ceklis.svg'
import personIcon from '../assets/person.svg'
import kotakFrame from '../assets/kotak_abu_abu.svg'
import pengaturanIcon from '../assets/pengaturan_icon.svg'
import TimerRing from '../components/deepfocus/TimerRing'
import SettingsModal from '../components/deepfocus/SettingsModal'

const LS_WORK = 'deepFocus_workSec'
const LS_BREAK = 'deepFocus_breakSec'

function loadDurations() {
  try {
    const w = parseInt(localStorage.getItem(LS_WORK), 10)
    const b = parseInt(localStorage.getItem(LS_BREAK), 10)
    return {
      work: Number.isFinite(w) && w > 0 ? w : 25 * 60,
      brk: Number.isFinite(b) && b > 0 ? b : 5 * 60,
    }
  } catch {
    return { work: 25 * 60, brk: 5 * 60 }
  }
}

function saveDurations(workSec, breakSec) {
  localStorage.setItem(LS_WORK, String(workSec))
  localStorage.setItem(LS_BREAK, String(breakSec))
}

function splitIntoTwoParagraphs(text) {
  const t = (text || '').trim()
  if (!t) return ['', '']
  const cut = t.indexOf('. ')
  if (cut > 0 && cut < t.length - 2) return [t.slice(0, cut + 1), t.slice(cut + 2)]
  const mid = Math.ceil(t.length / 2)
  const sp = t.lastIndexOf(' ', mid)
  if (sp > 8) return [t.slice(0, sp), t.slice(sp + 1)]
  return [t, '']
}

function formatMmSs(sec) {
  const s = Math.max(0, Math.floor(sec))
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${r.toString().padStart(2, '0')}`
}


function timerReducer(state, action) {
  switch (action.type) {
    case 'tick': {
      const { workSec, breakSec } = action
      if (state.secondsLeft > 1) return { ...state, secondsLeft: state.secondsLeft - 1 }
      if (state.phase === 'work') return { phase: 'break', secondsLeft: breakSec }
      return { phase: 'work', secondsLeft: workSec }
    }
    case 'resetSegment':
      return { ...state, secondsLeft: state.phase === 'work' ? action.workSec : action.breakSec }
    case 'applyDurations':
      return { phase: 'work', secondsLeft: action.workSec }
    default:
      return state
  }
}

const DeepFocusPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { taskId, stepId } = location.state || {}

  const { tasks } = useTasks()

  const [currentSession, setCurrentSession] = useState(null)
  const [sessionLoading, setSessionLoading] = useState(true)
  const [sessionError, setSessionError] = useState(null)
  const [completing, setCompleting] = useState(false)
  const [cancelling, setCancelling] = useState(false)

  useEffect(() => {
    const loadActive = async () => {
      setSessionLoading(true)
      try {
        const res = await getActiveFocusSession()
        setCurrentSession(res?.data ?? null)
      } catch {
        setCurrentSession(null)
      } finally {
        setSessionLoading(false)
      }
    }
    loadActive()
  }, [])

  const initial = loadDurations()
  const [workTotal, setWorkTotal] = useState(initial.work)
  const [breakTotal, setBreakTotal] = useState(initial.brk)
  const workRef = useRef(initial.work)
  const breakRef = useRef(initial.brk)
  useEffect(() => { workRef.current = workTotal }, [workTotal])
  useEffect(() => { breakRef.current = breakTotal }, [breakTotal])

  const [timer, dispatchTimer] = useReducer(timerReducer, { phase: 'work', secondsLeft: initial.work })
  const { phase, secondsLeft } = timer
  const [isRunning, setIsRunning] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [draftWorkMin, setDraftWorkMin] = useState(Math.floor(initial.work / 60))
  const [draftBreakMin, setDraftBreakMin] = useState(Math.floor(initial.brk / 60))

  const task = useMemo(
    () => tasks?.find((t) => String(t.id) === String(taskId)) ?? null,
    [tasks, taskId]
  )

  // use task_steps (API v4) with fallback to micro_steps
  const currentStep = useMemo(() => {
    if (!task || stepId == null) return null
    const steps = task.task_steps ?? task.micro_steps ?? []
    return steps.find((s) => String(s.id) === String(stepId)) ?? null
  }, [task, stepId])

  // session notes: prefer from active session, fallback to step description
  const sessionNotes = currentSession?.session_notes || currentStep?.description || null

  const objectiveRaw = currentSession?.objective || currentStep?.title || 'Focus on your current task.'
  const [p1, p2] = splitIntoTwoParagraphs(objectiveRaw)
  const objectiveOneLine = [p1, p2].filter(Boolean).join(' ')

  const phaseTotal = phase === 'work' ? workTotal : breakTotal
  const progress = phaseTotal > 0 ? secondsLeft / phaseTotal : 0

  useEffect(() => {
    if (!isRunning) return
    const id = setInterval(() => {
      dispatchTimer({ type: 'tick', workSec: workRef.current, breakSec: breakRef.current })
    }, 1000)
    return () => clearInterval(id)
  }, [isRunning])

  const handleReset = async () => {
    setIsRunning(false)
    dispatchTimer({ type: 'resetSegment', workSec: workTotal, breakSec: breakTotal })
    if (currentSession?.session_id) {
      setCancelling(true)
      try {
        await cancelFocusSession(currentSession.session_id, 'Timer reset by user')
        setCurrentSession(null)
      } catch (err) {
        console.error('Cancel session error:', err)
      } finally {
        setCancelling(false)
      }
    }
  }

  const handleCompleteStep = async () => {
    setCompleting(true)
    setSessionError(null)
    try {
      // Selesaikan sesi fokus jika ada, tapi jangan biarkan error sesi
      // mencegah step untuk di-ceklis
      if (currentSession?.session_id) {
        try {
          await completeFocusSession(currentSession.session_id)
        } catch (err) {
          console.error('Complete session error (continuing to mark step):', err)
        }
      }

      // Force set step ke completed (bukan toggle, supaya tidak bisa balik)
      if (taskId != null && stepId != null) {
        await updateTaskStep(taskId, stepId, { is_completed: true, status: 'completed' })
      }

      setCurrentSession(null)
      navigate('/focus', { state: { taskId } })
    } catch (err) {
      const msg = err?.error?.message || err?.message || 'Failed to mark step as done'
      setSessionError(msg)
    } finally {
      setCompleting(false)
    }
  }

  const openSettings = () => {
    setDraftWorkMin(Math.floor(workTotal / 60))
    setDraftBreakMin(Math.floor(breakTotal / 60))
    setSettingsOpen(true)
  }

  const applySettings = async () => {
    const w = Math.max(1, Math.min(180, draftWorkMin)) * 60
    const b = Math.max(1, Math.min(60, draftBreakMin)) * 60
    setWorkTotal(w)
    setBreakTotal(b)
    saveDurations(w, b)
    workRef.current = w
    breakRef.current = b
    dispatchTimer({ type: 'applyDurations', workSec: w })
    setIsRunning(false)
    setSettingsOpen(false)

    // Settings sudah disimpan di localStorage, tidak perlu sync ke API
  }

  if (sessionLoading) {
    return <div className="flex justify-center py-20"><Spinner size="lg" /></div>
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F8F9F8] font-sans text-[#333]">
      <header className="sticky top-0 z-30 flex w-full shrink-0 items-center justify-between border-b border-black/5 bg-[#F8F9F8]/95 py-2.5 pl-3 pr-3 backdrop-blur-sm sm:pl-4 sm:pr-4">
        <button
          type="button"
          onClick={() => navigate('/focus', { state: { taskId } })}
          className="flex shrink-0 items-center gap-1.5 rounded-full border-none bg-transparent py-1 text-left text-xs font-medium text-[#2F3430] hover:opacity-80"
        >
          <img src={tandaPanah} alt="" className="h-5 w-5 shrink-0 object-contain" />
          <span className="max-w-[min(52vw,200px)] truncate sm:max-w-none sm:overflow-visible sm:whitespace-normal">
            Return to dashboard
          </span>
        </button>

        <div
          className="inline-flex max-w-[min(48vw,220px)] shrink-0 items-center gap-1.5 rounded-full border border-black/5 px-2 py-1.5 sm:gap-2 sm:px-2.5 sm:py-1.5"
          style={{ backgroundColor: 'rgba(191, 235, 228, 0.3)' }}
        >
          <img src={saveIcon} alt="" className="h-4 w-4 shrink-0 object-contain sm:h-[18px] sm:w-[18px]" />
          <span className="text-[9px] font-bold uppercase leading-tight tracking-wide text-[#305954] sm:text-[10px]">
            Deep focus active
          </span>
        </div>
      </header>

      <main className="flex w-full flex-1 flex-col items-center px-5 pt-6 sm:px-8 md:pt-8">
        <p className="mb-4 text-center text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: '#6b7280' }}>
          Current Objective
        </p>

        <p className="mb-6 max-w-4xl px-2 text-center text-base font-bold leading-snug text-[#2D3632] sm:mb-8 sm:text-lg md:text-xl lg:text-2xl">
          {objectiveOneLine}
        </p>

        {sessionError && (
          <p className="mb-3 text-center text-sm font-medium text-red-600">{sessionError}</p>
        )}

        <div className="relative mb-6 flex h-[min(85vw,320px)] w-[min(85vw,320px)] shrink-0 items-center justify-center sm:mb-8 sm:h-[min(52vh,340px)] sm:w-[min(52vh,340px)] md:h-[min(48vh,380px)] md:w-[min(48vh,380px)]">
          <img src={kotakFrame} alt="" className="pointer-events-none absolute inset-0 m-auto h-full w-full object-contain opacity-90" />
          <div className="relative z-10 flex h-55 w-[220px] items-center justify-center rounded-full bg-gray-400/20">
            <TimerRing phase={phase} progress={progress} />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-semibold tracking-tight text-[#2D3632] sm:text-6xl">
                {formatMmSs(secondsLeft)}
              </span>
            </div>
          </div>
        </div>

        {phase === 'break' && (
          <p className="mb-4 text-center text-xs font-semibold text-amber-700">Break time — stretch and reset</p>
        )}

        {/* Reset + Start Session + Settings */}
        {/* Desktop: satu baris | Mobile: Reset+Settings atas, Start+Done bawah */}
        <div className="mb-5 hidden items-center justify-center gap-4 sm:flex">
          <button
            type="button"
            onClick={handleReset}
            disabled={cancelling}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:bg-gray-50 disabled:opacity-50"
            aria-label="Reset timer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" strokeLinecap="round" />
              <path d="M3 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setIsRunning((v) => !v)}
            className="flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-[#305954] px-8 py-3.5 shadow-md transition-all hover:bg-[#264643]"
          >
            {isRunning ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#DCFFF8]" aria-hidden>
                <rect x="6" y="5" width="5" height="14" rx="1" />
                <rect x="13" y="5" width="5" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#DCFFF8]" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
            <span className="text-sm font-medium leading-none text-[#DCFFF8]">
              {isRunning ? 'Pause Session' : 'Start Session'}
            </span>
          </button>
          <button
            type="button"
            onClick={openSettings}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-colors hover:bg-gray-50"
            aria-label="Timer settings"
          >
            <img src={pengaturanIcon} alt="settings" className="h-5 w-5 object-contain" />
          </button>
        </div>

        {/* Mobile: Reset + Settings */}
        <div className="mb-4 flex items-center justify-center gap-4 sm:hidden">
          <button
            type="button"
            onClick={handleReset}
            disabled={cancelling}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:bg-gray-50 disabled:opacity-50"
            aria-label="Reset timer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" strokeLinecap="round" />
              <path d="M3 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={openSettings}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-colors hover:bg-gray-50"
            aria-label="Timer settings"
          >
            <img src={pengaturanIcon} alt="settings" className="h-5 w-5 object-contain" />
          </button>
        </div>

        {/* Mobile: Start Session + Mark as Done */}
        <button
          type="button"
          onClick={() => setIsRunning((v) => !v)}
          className="mb-4 flex w-full max-w-xs shrink-0 items-center justify-center gap-2.5 rounded-full bg-[#305954] py-3.5 shadow-md transition-all hover:bg-[#264643] sm:hidden"
        >
          {isRunning ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#DCFFF8]" aria-hidden>
              <rect x="6" y="5" width="5" height="14" rx="1" />
              <rect x="13" y="5" width="5" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#DCFFF8]" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
          <span className="text-sm font-medium leading-none text-[#DCFFF8]">
            {isRunning ? 'Pause Session' : 'Start Session'}
          </span>
        </button>
        <button
          type="button"
          onClick={handleCompleteStep}
          disabled={completing}
          className="mb-8 flex w-full max-w-xs items-center justify-center gap-2 rounded-full border border-gray-200 bg-white py-3.5 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 disabled:opacity-50"
          style={{ color: '#5C605C' }}
        >
          <img src={ceklisIcon} alt="" className="h-5 w-5 object-contain" />
          {completing ? 'Saving...' : 'Mark as Done'}
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center pl-1">
            <div className="relative z-0 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gray-100">
              <img src={personIcon} alt="" className="h-6 w-6 object-contain opacity-70" />
            </div>
            <div className="relative z-[1] -ml-3 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[#1a6b5a]">
              <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" alt="" className="h-full w-full object-cover" />
              <span className="pointer-events-none absolute bottom-0.5 right-0.5 rounded bg-[#1a6b5a] px-1 text-[8px] font-bold leading-none text-white ring-1 ring-white">+12</span>
            </div>
          </div>
          <p className="text-xs font-medium text-gray-500">12 others are focusing right now</p>
        </div>
      </main>

      <footer className="mt-auto border-t border-black/5 bg-[#F8F9F8] py-6 pl-5 pr-5 sm:py-8 sm:pl-10 sm:pr-8 md:pl-16" style={{ color: '#5C605C' }}>
        <h3 className="mb-3 text-left font-['Inter',sans-serif] text-xs font-bold uppercase tracking-wide sm:text-sm">
          SESSION NOTES
        </h3>
        <div className="max-w-4xl space-y-3 text-left font-['Inter',sans-serif] text-sm leading-relaxed sm:text-base">
          {sessionNotes
            ? <p>{sessionNotes}</p>
            : <p className="text-gray-400 italic">No session notes.</p>
          }
        </div>
      </footer>

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onSave={applySettings}
        draftWorkMin={draftWorkMin}
        setDraftWorkMin={setDraftWorkMin}
        draftBreakMin={draftBreakMin}
        setDraftBreakMin={setDraftBreakMin}
      />
    </div>
  )
}

export default DeepFocusPage
