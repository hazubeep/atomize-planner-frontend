import LandingNavbar from '../components/organisms/LandingNavbar'
import LandingFooter from '../components/organisms/LandingFooter'

const MethodologyPage = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF9F6' }}>
      <LandingNavbar />
      <div style={{ height: '56px' }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '96px 64px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '44px', fontWeight: 400, color: 'var(--color-text-primary)', marginBottom: '12px' }}>
          Methodology
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)' }}>
          Belum diisi.
        </p>
      </div>
      <LandingFooter />
    </div>
  )
}

export default MethodologyPage

