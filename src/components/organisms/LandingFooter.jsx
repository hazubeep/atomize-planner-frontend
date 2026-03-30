const linkClass =
  'whitespace-nowrap text-[13px] font-medium text-text-muted no-underline hover:text-text-secondary'

const LandingFooter = () => {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="w-full px-6 py-7 lg:px-16">
        <div className="flex flex-wrap items-start justify-between gap-[18px]">
          <div className="flex flex-col gap-1.5">
            <span className="font-display text-base text-text-primary">AtomizePlanner</span>
            <span className="text-xs text-text-muted">© 2024 AtomizePlanner. Designed for deep focus.</span>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-[18px]">
            <a className={linkClass} href="#privacy">
              Privacy Policy
            </a>
            <a className={linkClass} href="#terms">
              Terms of Services
            </a>
            <a className={linkClass} href="https://twitter.com" target="_blank" rel="noreferrer">
              Twitter
            </a>
            <a className={linkClass} href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className={linkClass} href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default LandingFooter
