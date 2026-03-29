import { NavLink, useLocation } from 'react-router-dom'
import { cn } from '../utils'
import homeIcon from '../assets/home.svg'
import focusIcon from '../assets/kotak.svg'
import statsIcon from '../assets/stats.svg'

const HomeIcon = ({ active }) => (
  <img
    src={homeIcon}
    alt="home"
    className={cn('h-[15px] w-[15px]', active ? 'opacity-100' : 'opacity-50 grayscale')}
  />
)

const FocusIcon = ({ active }) => (
  <img
    src={focusIcon}
    alt="focus"
    className={cn('h-[15px] w-[15px]', active ? 'opacity-100' : 'opacity-50 grayscale')}
  />
)

const StatsIcon = ({ active }) => (
  <img
    src={statsIcon}
    alt="stats"
    className={cn('h-[15px] w-[15px]', active ? 'opacity-100' : 'opacity-50 grayscale')}
  />
)

const AvatarIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className="text-accent" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
  </svg>
)

const BOTTOM_NAV = [
  { path: '/home', label: 'Home', Icon: HomeIcon },
  { path: '/focus', label: 'Focus Mode', Icon: FocusIcon },
  { path: '/stats', label: 'Stats', Icon: StatsIcon },
]

const TOP_LINKS = [
  { path: '/history', label: 'History' },
  { path: '/goals', label: 'Goals' },
  { path: '/profile', label: 'Profile' },
]

const NavItem = ({ path, label, Icon, isActive }) => {
  return (
    <NavLink to={path} className="no-underline">
      <div className="flex flex-col items-center gap-0.5">
        <div
          className={cn(
            'rounded-[10px] px-4 py-1.5 transition-all duration-200',
            isActive ? 'bg-teal-light' : 'bg-transparent'
          )}
        >
          <Icon active={isActive} />
        </div>

        <span
          className={cn(
            'text-[10px]',
            isActive ? 'font-semibold text-accent' : 'font-normal text-text-muted'
          )}
        >
          {label}
        </span>
      </div>
    </NavLink>
  )
}

const MainLayout = ({ children }) => {
  const location = useLocation()

  return (
    <div className="flex min-h-screen w-full flex-col bg-bg bg-[radial-gradient(ellipse_at_top_right,#BFEBE433_0%,transparent_55%)]">
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 z-40 flex h-[52px] items-center justify-between border-b border-border bg-white/85 px-10 backdrop-blur-md">
          <NavLink to="/home" className="no-underline">
            <span className="font-display text-[15px] text-text-primary">AtomizePlanner</span>
          </NavLink>

          <nav className="flex gap-5">
            {TOP_LINKS.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  cn(
                    'pb-0.5 text-[13px] no-underline',
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

          <div className="flex h-8 w-8 items-center justify-center rounded-full border-[1.5px] border-teal-border bg-teal-light">
            <AvatarIcon />
          </div>
        </header>

        <main className="flex flex-1 justify-center pb-[76px]">
          <div className="w-full max-w-[720px]">{children}</div>
        </main>

        <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-border bg-white/95 px-2 pb-3 pt-2 backdrop-blur-md">
          {BOTTOM_NAV.map(({ path, label, Icon }) => {
            const isActive = location.pathname === path || (path === '/home' && location.pathname === '/')
            return <NavItem key={path} path={path} label={label} Icon={Icon} isActive={isActive} />
          })}
        </nav>
      </div>
    </div>
  )
}

export default MainLayout
