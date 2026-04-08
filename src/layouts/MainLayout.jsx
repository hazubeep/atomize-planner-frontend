import { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { cn } from '../utils'
import { logout } from '../services/authService'
import { getProfile } from '../services/profileService'

const NAV_LINKS = [
  { path: '/home', label: 'Hub' },
  { path: '/goals', label: 'Goals' },
  { path: '/history', label: 'History' },
]

const MainLayout = ({ children }) => {
  const navigate = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [userName, setUserName] = useState('')
  const desktopProfileRef = useRef(null)
  const mobileProfileRef = useRef(null)

  // fetch avatar dari profile
  useEffect(() => {
    getProfile()
      .then((res) => {
        const data = res?.data ?? res
        setAvatarUrl(data?.avatar_url ?? null)
        setUserName(data?.name ?? '')
      })
      .catch(() => {})
  }, [])

  // close profile dropdown on outside click
  useEffect(() => {
    if (!profileOpen) return
    const onMouseDown = (e) => {
      const clickedDesktop = desktopProfileRef.current?.contains(e.target)
      const clickedMobile = mobileProfileRef.current?.contains(e.target)
      if (!clickedDesktop && !clickedMobile) setProfileOpen(false)
    }
    const onKeyDown = (e) => { if (e.key === 'Escape') setProfileOpen(false) }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [profileOpen])

  // close drawer on Escape
  useEffect(() => {
    if (!drawerOpen) return
    const onKeyDown = (e) => { if (e.key === 'Escape') setDrawerOpen(false) }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [drawerOpen])

  const handleLogout = async () => {
    try { await logout() } catch (err) { console.error('Logout error', err) } finally {
      setProfileOpen(false)
      setDrawerOpen(false)
      navigate('/login', { replace: true })
    }
  }

  const AvatarButton = ({ ref: refProp, size = 'h-8 w-8' }) => (
    <button
      ref={refProp}
      type="button"
      aria-label="Profile"
      aria-haspopup="menu"
      aria-expanded={profileOpen}
      onClick={() => setProfileOpen((v) => !v)}
      className={`${size} flex shrink-0 items-center justify-center overflow-hidden rounded-full border-[1.5px] border-teal-border bg-teal-light`}
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt={userName} className="h-full w-full object-cover" />
      ) : (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className="text-accent" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
        </svg>
      )}
    </button>
  )

  const ProfileDropdown = ({ className = '' }) => (
    <div
      role="menu"
      className={`w-48 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-lg ${className}`}
    >
      {/* user info */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-teal-border bg-teal-light">
          {avatarUrl ? (
            <img src={avatarUrl} alt={userName} className="h-full w-full object-cover" />
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className="m-auto mt-1.5 text-accent" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
            </svg>
          )}
        </div>
        <span className="truncate text-sm font-semibold text-text-primary">{userName || 'User'}</span>
      </div>
      <button type="button" role="menuitem" className="w-full px-4 py-3 text-left text-sm font-medium text-text-primary hover:bg-bg" onClick={() => { setProfileOpen(false); navigate('/profile') }}>
        Profile
      </button>
      <button type="button" role="menuitem" className="w-full px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )

  return (
    <div className="flex min-h-dvh w-full flex-col bg-bg bg-[radial-gradient(ellipse_at_top_right,#BFEBE433_0%,transparent_55%)]">
      <div className="flex min-h-dvh w-full flex-col">

        {/* ── Desktop top navbar ── */}
        <header className="sticky top-0 z-40 hidden h-[52px] shrink-0 items-center justify-between border-b border-border bg-white/85 px-5 backdrop-blur-md sm:flex sm:px-10">
          <NavLink to="/home" className="no-underline">
            <span className="font-display text-[15px] text-text-primary">AtomizePlanner</span>
          </NavLink>

          <nav className="flex gap-4 sm:gap-5">
            {NAV_LINKS.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  cn(
                    "pb-0.5 text-[12px] no-underline sm:text-[13px]",
                    isActive
                      ? "border-b-[1.5px] border-accent font-semibold text-text-primary"
                      : "font-normal text-text-muted",
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="relative" ref={desktopProfileRef}>
            <AvatarButton refProp={desktopProfileRef} size="h-8 w-8" />
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2">
                <ProfileDropdown />
              </div>
            )}
          </div>
        </header>

        {/* ── Main content ── */}
        <main className="flex min-h-0 flex-1 justify-center overflow-y-auto px-5 pb-20 sm:pb-0 sm:px-8">
          <div className="w-full max-w-auto">
            {children}
          </div>
        </main>

        {/* ── Mobile bottom navbar ── */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-t border-border bg-white/90 px-8 backdrop-blur-md sm:hidden">
          {/* Hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-text-secondary hover:bg-bg"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Profile button mobile */}
          <div ref={mobileProfileRef} className="relative">
            <AvatarButton refProp={mobileProfileRef} size="h-10 w-10" />
            {profileOpen && (
              <div className="absolute bottom-full right-0 mb-2">
                <ProfileDropdown />
              </div>
            )}
          </div>
        </nav>

        {/* ── Mobile drawer ── */}
        {drawerOpen && (
          <div className="fixed inset-0 z-50 sm:hidden" onClick={() => setDrawerOpen(false)}>
            <div className="absolute inset-0 bg-black/40" />
            <div
              className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white px-6 pb-8 pt-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-gray-200" />
              <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Menu</p>
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map(({ path, label }) => (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setDrawerOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'rounded-xl px-4 py-3 text-sm font-medium no-underline transition',
                        isActive ? 'bg-teal-light font-semibold text-accent' : 'text-text-primary hover:bg-bg'
                      )
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MainLayout;
