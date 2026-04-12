import { cn } from '../../utils'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const LandingNavbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navBtn = (active) =>
    cn(
      'cursor-pointer border-none bg-transparent px-2 py-1.5 text-[13px] leading-tight border-b-2',
      active
        ? 'font-bold border-[#064E3B] text-[#064E3B]'
        : 'border-transparent font-medium text-text-secondary'
    )

  const scrollToId = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const goToFeatures = () => {
    setMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => scrollToId('features'), 0)
      return
    }
    scrollToId('features')
  }

  const goToTop = () => {
    setMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      return
    }
    scrollToId('top')
  }

  const goToMethodology = () => {
    setMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => scrollToId('methodology'), 0)
      return
    }
    scrollToId('methodology')
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-[1000] border-b border-border bg-[rgba(250,249,246,0.9)] backdrop-blur-md">
      <div className="relative flex h-14 w-full items-center px-6 lg:px-16">

        {/* Logo */}
        <div className="flex flex-1 items-center">
          <button
            type="button"
            onClick={goToTop}
            className="cursor-pointer border-none bg-transparent p-0 font-display text-base text-text-primary"
          >
            AtomizePlanner
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 justify-center gap-[18px]">
          <button
            type="button"
            onClick={goToFeatures}
            className={navBtn(location.pathname === '/')}
          >
            Features
          </button>

          <button
            type="button"
            onClick={goToMethodology}
            className={navBtn(location.pathname === '/')}
          >
            Methodology
          </button>
        </nav>

        {/* Right side */}
        <div className="flex flex-1 items-center justify-end gap-3">
          {/* Desktop button */}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="hidden md:block cursor-pointer rounded-lg border-none bg-accent px-[18px] py-[7px] text-xs font-semibold text-white"
          >
            Get Started
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute top-14 left-0 right-0 md:hidden bg-[rgba(250,249,246,0.98)] border-b border-border flex flex-col px-6 py-4 gap-3">
            <button onClick={goToFeatures} className="text-sm text-left">
              Features
            </button>

            <button onClick={goToMethodology} className="text-sm text-left">
              Methodology
            </button>

            <button
              onClick={() => {
                navigate('/login')
                setMenuOpen(false)
              }}
              className="text-sm text-left font-semibold text-accent"
            >
              Get Started
            </button>
          </div>
        )}

      </div>
    </header>
  )
}

export default LandingNavbar