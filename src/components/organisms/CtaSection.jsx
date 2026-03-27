import { useNavigate } from 'react-router-dom'
import Section from '../atoms/Section'

const CtaSection = () => {
  const navigate = useNavigate()
  return (
    <div style={{ padding: '96px 0 120px' }}>
      <Section>
        <div style={{
          backgroundColor: 'var(--color-accent-dark)',
          borderRadius: '24px',
          padding: '78px 40px',
          textAlign: 'center',
          backgroundImage: 'radial-gradient(ellipse at top right, rgba(0,196,167,0.2) 0%, transparent 60%)',
        }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: '400', color: '#fff', lineHeight: '1.15', marginBottom: '18px' }}>
            Start Your First<br />Atomized Task Today
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '36px' }}>
            Join 15,000+ deep thinkers who have reclaimed their peace of mind and productivity.
          </p>
          <button onClick={() => navigate('/home')} style={{
            padding: '14px 36px', borderRadius: '99px',
            backgroundColor: 'transparent', border: '1.5px solid rgba(255,255,255,0.5)',
            color: '#fff', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
          >
            Get Started Free
          </button>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '14px' }}>
            No credit card required. Focus guaranteed.
          </p>
        </div>
      </Section>
    </div>
  )
}

export default CtaSection
