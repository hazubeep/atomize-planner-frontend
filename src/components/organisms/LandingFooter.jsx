const LandingFooter = () => {
  const linkStyle = {
    color: 'var(--color-text-muted)',
    fontSize: '13px',
    fontWeight: 500,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  }

  return (
    <footer style={{ backgroundColor: '#FAF9F6', borderTop: '1px solid var(--color-border)' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '28px clamp(20px, 4vw, 64px)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '18px', flexWrap: 'wrap' }}>
          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: 'var(--color-text-primary)' }}>
              AtomizePlanner
            </span>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              © 2024 AtomizePlanner. Designed for deep focus.
            </span>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', gap: '18px', alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <a style={linkStyle} href="#privacy">Privacy Policy</a>
            <a style={linkStyle} href="#terms">Terms of Services</a>
            <a style={linkStyle} href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
            <a style={linkStyle} href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            <a style={linkStyle} href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default LandingFooter

