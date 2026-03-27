import { NavLink, useLocation } from 'react-router-dom'
import homeIcon from '../assets/home.svg'
import focusIcon from '../assets/kotak.svg'
import statsIcon from '../assets/stats.svg'

const HomeIcon = ({ active }) => (
  <img
    src={homeIcon}
    alt="home"
    style={{
      width: '15px',
      height: '15px',
      opacity: active ? 1 : 0.5,
      filter: active ? 'none' : 'grayscale(100%)',
    }}
  />
)

const FocusIcon = ({ active }) => (
  <img
    src={focusIcon}
    alt="focus"
    style={{
      width: '15px',
      height: '15px',
      opacity: active ? 1 : 0.5,
      filter: active ? 'none' : 'grayscale(100%)',
    }}
  />
)

const StatsIcon = ({ active }) => (
  <img
    src={statsIcon}
    alt="stats"
    style={{
      width: '15px',
      height: '15px',
      opacity: active ? 1 : 0.5,
      filter: active ? 'none' : 'grayscale(100%)',
    }}
  />
)

const AvatarIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.8">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round"/>
  </svg>
)

const BOTTOM_NAV = [
  { path: '/home',  label: 'Home',       Icon: HomeIcon  },
  { path: '/focus', label: 'Focus Mode', Icon: FocusIcon },
  { path: '/stats', label: 'Stats',      Icon: StatsIcon },
]

const TOP_LINKS = [
  { path: '/history', label: 'History' },
  { path: '/goals',   label: 'Goals'   },
  { path: '/profile', label: 'Profile' },
]

const NavItem = ({ path, label, Icon, isActive }) => {
  return (
    <NavLink to={path} style={{ textDecoration:'none' }}>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'3px' }}>
        
        <div style={{
          padding:'5px 16px',
          borderRadius:'10px',
          backgroundColor: isActive ? 'var(--color-teal-light)' : 'transparent',
          transition:'all 0.2s',
        }}>
          <Icon active={isActive} />
        </div>

        <span style={{
          fontSize:'10px',
          fontWeight: isActive ? '600' : '400',
          color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
        }}>
          {label}
        </span>

      </div>
    </NavLink>
  )
}

const MainLayout = ({ children }) => {
  const location = useLocation()

  return (
    <div style={{ width:'100%', minHeight:'100vh', backgroundColor:'#FAF9F6', backgroundImage:'radial-gradient(ellipse at top right, #BFEBE433 0%, transparent 55%)', display:'flex', flexDirection:'column' }}>
      <div style={{ width:'100%', minHeight:'100vh', display:'flex', flexDirection:'column' }}>

        {/* TOP NAV */}
        <header style={{
          position:'sticky', top:0, zIndex:40,
          backgroundColor:'rgba(255,255,255,0.85)',
          backdropFilter:'blur(12px)',
          borderBottom:'1px solid var(--color-border)',
          padding:'0 40px', height:'52px',
          display:'flex', alignItems:'center', justifyContent:'space-between',
        }}>
          <NavLink to="/home" style={{ textDecoration:'none' }}>
            <span style={{ fontFamily:'var(--font-display)', fontSize:'15px', color:'var(--color-text-primary)' }}>
              AtomizePlanner
            </span>
          </NavLink>

          <nav style={{ display:'flex', gap:'20px' }}>
            {TOP_LINKS.map(({ path, label }) => (
              <NavLink key={path} to={path}
                style={({ isActive }) => ({
                  fontSize:'13px',
                  fontWeight: isActive ? '600' : '400',
                  color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                  textDecoration: 'none',
                  borderBottom: isActive ? '1.5px solid var(--color-accent)' : 'none',
                  paddingBottom: '2px',
                })}>
                {label}
              </NavLink>
            ))}
          </nav>

          <div style={{
            width:'32px', height:'32px', borderRadius:'50%',
            backgroundColor:'var(--color-teal-light)',
            border:'1.5px solid var(--color-teal-border)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <AvatarIcon />
          </div>
        </header>

        {/* CONTENT */}
        <main style={{ flex:1, paddingBottom:'76px', display:'flex', justifyContent:'center' }}>
          <div style={{ width:'100%', maxWidth:'720px' }}>
            {children}
          </div>
        </main>

        {/* BOTTOM NAV */}
        <nav style={{
          position:'fixed', bottom:0, left:0, right:0, zIndex:40,
          backgroundColor:'rgba(255,255,255,0.95)',
          backdropFilter:'blur(12px)',
          borderTop:'1px solid var(--color-border)',
          display:'flex', alignItems:'center', justifyContent:'space-around',
          padding:'8px 8px 12px',
        }}>
          {BOTTOM_NAV.map(({ path, label, Icon }) => {
            const isActive = location.pathname === path || (path === '/home' && location.pathname === '/')
            return (
              <NavItem
                key={path}
                path={path}
                label={label}
                Icon={Icon}
                isActive={isActive}
              />
            )
          })}
        </nav>

      </div>
    </div>
  )
}

export default MainLayout