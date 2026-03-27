import { useNavigate } from 'react-router-dom'
import Section from '../components/atoms/Section'
import ProcessSection from '../components/organisms/ProcessSection'
import FeaturesSection from '../components/organisms/FeaturesSection'
import TestimonialSection from '../components/organisms/TestimonialSection'
import CtaSection from '../components/organisms/CtaSection'
import LandingNavbar from '../components/organisms/LandingNavbar'
import LandingFooter from '../components/organisms/LandingFooter'
import heroImg from '../assets/tampilan_chat.png'

const HeroMockup = () => (
  <div style={{ position: 'relative', width: '100%', maxWidth: 'clamp(520px, 52vw, 920px)' }}>
    <img src={heroImg} alt="app preview" style={{ width: '100%', display: 'block', borderRadius: '20px' }} />
    <div style={{
      position: 'absolute', bottom: 'clamp(18px, 2.2vw, 32px)', left: 'clamp(14px, 1.6vw, 24px)',
      backgroundColor: '#fff', borderRadius: '14px', padding: 'clamp(8px, 1vw, 12px) clamp(12px, 1.2vw, 18px)',
      boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)',
      display: 'flex', alignItems: 'center', gap: '8px',
    }}>
      <span style={{ fontSize: 'clamp(16px, 1.4vw, 20px)' }}>⚡</span>
      <div>
        <p style={{ fontSize: 'clamp(10px, 0.9vw, 12px)', fontWeight: '800', color: 'var(--color-text-muted)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>Focus Level</p>
        <p style={{ fontSize: 'clamp(14px, 1.2vw, 18px)', fontWeight: '800', color: 'var(--color-accent)' }}>98% Peak</p>
      </div>
    </div>
  </div>
)

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div
      style={{
        backgroundColor: '#FAF9F6',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <LandingNavbar />

      {/* spacer for fixed navbar */}
      <div style={{ height: '56px' }} />

      <div id="top" />

      {/* HERO */}
      <div
        style={{
          backgroundImage: 'radial-gradient(ellipse at top right, #BFEBE433 0%, transparent 55%)',
          // Tinggi layar dikurangi tinggi header (56px) supaya hero "mengisi" viewport.
          minHeight: 'calc(100vh - 56px)',
          flex: 1,
        }}
      >
        <Section style={{ padding: 'clamp(84px, 8.5vw, 140px) 0 clamp(96px, 9vw, 160px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 'clamp(40px, 6vw, 90px)', alignItems: 'center' }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(54px, 6.2vw, 104px)', fontWeight: '400', lineHeight: '0.98', color: 'var(--color-text-primary)', marginBottom: 'clamp(16px, 2.2vw, 28px)' }}>
                Transform<br />Overwhelm<br />
                <span style={{ color: 'var(--color-accent)' }}>into Action</span>
              </h1>
              <p style={{ fontSize: 'clamp(16px, 1.55vw, 22px)', color: 'var(--color-text-secondary)', lineHeight: '1.7', marginBottom: 'clamp(22px, 3vw, 44px)', maxWidth: 'clamp(420px, 44vw, 680px)' }}>
                The AI-powered sanctuary for breaking down complex tasks into micro-steps. Reclaim your focus without the digital noise.
              </p>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button onClick={() => navigate('/home')} style={{
                  padding: 'clamp(12px, 1.3vw, 16px) clamp(22px, 2.5vw, 40px)', borderRadius: '12px',
                  backgroundColor: 'var(--color-accent)', border: 'none',
                  color: '#fff', fontSize: 'clamp(14px, 1.25vw, 20px)', fontWeight: '700', cursor: 'pointer',
                }}>
                  Get Started Free
                </button>
                <button style={{
                  padding: 'clamp(12px, 1.3vw, 16px) clamp(22px, 2.5vw, 40px)', borderRadius: '12px',
                  backgroundColor: 'transparent', border: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)', fontSize: 'clamp(14px, 1.25vw, 20px)', fontWeight: '600', cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
                  onClick={() => navigate('/methodology')}
                >
                  Watch Methodology
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
              <HeroMockup />
            </div>
          </div>
        </Section>
      </div>

      <ProcessSection />
      <FeaturesSection />
      <TestimonialSection />
      <CtaSection />
      <LandingFooter />
    </div>
  )
}

export default LandingPage
