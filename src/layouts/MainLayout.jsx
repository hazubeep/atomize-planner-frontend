import { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { cn } from '../utils'
import { logout } from '../services/authService'

const AvatarIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className="text-accent" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
  </svg>
)

const TOP_LINKS = [
  { path: '/home', label: 'Home' },
  { path: '/goals', label: 'Goals' },
  { path: '/history', label: 'History' },
  { path: '/stats', label: 'Stats' },
]

const MainLayout = ({ children }) => {
  const navigate = useNavigate()

  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)

  useEffect(() => {
    if (!profileOpen) return

    const onMouseDown = (e) => {
      const el = profileRef.current
      if (!el) return
      if (el.contains(e.target)) return
      setProfileOpen(false)
    }

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setProfileOpen(false)
    }

    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [profileOpen])

  const handleLogout = () => {
    logout()
    setProfileOpen(false)
    navigate('/register', { replace: true })
  }

  return (
    <div className="flex min-h-dvh w-full flex-col bg-bg bg-[radial-gradient(ellipse_at_top_right,#BFEBE433_0%,transparent_55%)]">
      <div className="flex min-h-dvh w-full flex-col">
        <header className="sticky top-0 z-40 flex h-[52px] shrink-0 items-center justify-between border-b border-border bg-white/85 px-5 backdrop-blur-md sm:px-10">
          <NavLink to="/home" className="no-underline">
            <span className="font-display text-[15px] text-text-primary">AtomizePlanner</span>
          </NavLink>

          <nav className="flex gap-4 sm:gap-5">
            {TOP_LINKS.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  cn(
                    'pb-0.5 text-[12px] no-underline sm:text-[13px]',
                    isActive
                      ? 'border-b-[1.5px] border-accent font-semibold text-text-primary'
                      : 'font-normal text-text-muted'
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="relative" ref={profileRef}>
            <button
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[1.5px] border-teal-border bg-teal-light"
              aria-label="Profile"
              aria-haspopup="menu"
              aria-expanded={profileOpen}
              onClick={() => setProfileOpen((v) => !v)}
            >
              <AvatarIcon />
            </button>

            {profileOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-lg"
              >
                <button
                  type="button"
                  role="menuitem"
                  className="w-full px-4 py-3 text-left text-sm font-medium text-text-primary hover:bg-bg"
                  onClick={() => {
                    setProfileOpen(false)
                    navigate('/profile')
                  }}
                >
                  Profile
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className="w-full px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="flex min-h-0 flex-1 justify-center overflow-y-auto px-5 sm:px-8">
          <div className="w-full max-w-[760px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout
