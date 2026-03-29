import { cn } from '../../utils'
import { useLocation, useNavigate } from 'react-router-dom'

const LandingNavbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

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
    if (location.pathname !== '/') {
      navigate('/')
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
    <header className="fixed left-0 right-0 top-0 z-[1000] border-b border-border bg-[rgba(250,249,246,0.9)] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1120px] items-center px-16">
        <div className="flex min-w-[180px] items-center">
          <button
            type="button"
            onClick={goToTop}
            className="cursor-pointer border-none bg-transparent p-0 font-display text-base text-text-primary"
          >
            AtomizePlanner
          </button>
        </div>

        <nav className="flex flex-1 justify-center gap-[18px]">
          <button type="button" onClick={goToFeatures} className={navBtn(location.pathname === '/')}>
            Features
          </button>
          <button type="button" onClick={() => navigate('/methodology')} className={navBtn(location.pathname === '/methodology')}>
            Methodology
          </button>
          <button type="button" onClick={() => navigate('/pricing')} className={navBtn(location.pathname === '/pricing')}>
            Pricing
          </button>
        </nav>

        <div className="flex min-w-[180px] items-center justify-end">
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="cursor-pointer rounded-lg border-none bg-accent px-[18px] py-[7px] text-xs font-semibold text-white"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  )
}

export default LandingNavbar
