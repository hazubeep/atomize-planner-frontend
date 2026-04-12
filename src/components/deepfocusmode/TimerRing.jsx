const RING_R = 86
const RING_C = 2 * Math.PI * RING_R

const TimerRing = ({ phase, progress, gradientId = 'deepFocusRingGrad' }) => {
  const isBreak = phase === 'break'
  const dashOffset = RING_C * (1 - progress)
  const stroke = isBreak ? '#EAB308' : `url(#${gradientId})`

  return (
    <svg width="220" height="220" viewBox="0 0 200 200" className="-rotate-90" aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a6b5a" />
          <stop offset="100%" stopColor="#00c4a7" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r={RING_R} fill="none" stroke="rgba(120,120,120,0.25)" strokeWidth="10" />
      <circle
        cx="100" cy="100" r={RING_R} fill="none" stroke={stroke} strokeWidth="10"
        strokeLinecap="round" strokeDasharray={RING_C} strokeDashoffset={dashOffset}
        className="transition-[stroke-dashoffset] duration-300 ease-linear"
      />
    </svg>
  )
}

export default TimerRing
