import { useLocation, useNavigate } from 'react-router-dom'

const LandingNavbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const activeColor = '#064E3B'

  const navItemStyle = (active) => ({
    fontSize: '13px',
    fontWeight: active ? '700' : '500',
    color: active ? activeColor : 'var(--color-text-secondary)',
    background: 'transparent',
    border: 'none',
    padding: '6px 8px',
    cursor: 'pointer',
    borderBottom: active ? `2px solid ${activeColor}` : '2px solid transparent',
    lineHeight: 1.2,
  })

  const scrollToId = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const goToFeatures = () => {
    if (location.pathname !== '/') {
      navigate('/')
      // Wait a tick so LandingPage mounts then scroll.
      setTimeout(() => scrollToId('features'), 0)
      return
    }
    scrollToId('features')
  }

  const goToTop = () => {
    if (location.pathname !== '/') {
      navigate('/')
      return
    }
    scrollToId('top')
  }

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      backgroundColor: 'rgba(250,249,246,0.9)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--color-border)',
    }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 64px', height: '56px', display: 'flex', alignItems: 'center' }}>
        {/* Left */}
        <div style={{ minWidth: '180px', display: 'flex', alignItems: 'center' }}>
          <button
            onClick={goToTop}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '16px',
              color: 'var(--color-text-primary)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            AtomizePlanner
          </button>
        </div>

        {/* Center */}
        <nav style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '18px' }}>
          <button onClick={goToFeatures} style={navItemStyle(location.pathname === '/')}>
            Features
          </button>
          <button onClick={() => navigate('/methodology')} style={navItemStyle(location.pathname === '/methodology')}>
            Methodology
          </button>
          <button onClick={() => navigate('/pricing')} style={navItemStyle(location.pathname === '/pricing')}>
            Pricing
          </button>
        </nav>

        {/* Right */}
        <div style={{ minWidth: '180px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <button onClick={() => navigate('/home')} style={{
            padding: '7px 18px', borderRadius: '8px',
            backgroundColor: 'var(--color-accent)', border: 'none',
            color: '#fff', fontSize: '12px', fontWeight: '600', cursor: 'pointer',
          }}>
            Get Started
          </button>
        </div>
      </div>
    </header>
  )
}

export default LandingNavbar

