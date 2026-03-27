import Section from '../atoms/Section'
import laptopImg from '../../assets/laptop.png'
import spark from '../../assets/spark.svg'
import kotak from '../../assets/kotak-kotak.svg'
import analisis from '../../assets/logo_analisis.svg'

const features = [
  { icon: kotak,   title: 'Task Deconstruction',   desc: 'Intelligent recursive breakdown of goals into achievable units of work under 25 minutes each.' },
  { icon: spark,   title: 'Minimalist Focus Mode',  desc: 'A Zen-inspired interface that hides notifications and navigation until the current task is marked complete.' },
  { icon: analisis,title: 'Progress Analytics',     desc: 'Visualise your momentum through tranquil heatmaps and velocity charts that celebrate flow, not just output.' },
]

const FeaturesSection = () => (
  <div id="features" style={{ backgroundColor: '#FAF9F6' }}>
    <Section style={{ padding: 'clamp(96px, 8.5vw, 150px) 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 'clamp(44px, 6vw, 96px)', alignItems: 'center' }}>
        {/* Left */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 3.6vw, 64px)', fontWeight: '400', color: 'var(--color-text-primary)', marginBottom: 'clamp(28px, 3.2vw, 60px)', lineHeight: 1.02 }}>
            Core Sanctuary Features
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 1.8vw, 26px)' }}>
            {features.map((f) => (
              <div key={f.title} style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                <div style={{ width: 'clamp(38px, 2.4vw, 52px)', height: 'clamp(38px, 2.4vw, 52px)', borderRadius: '14px', backgroundColor: 'var(--color-accent-light)', border: '1px solid rgba(6,78,59,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <img src={f.icon} alt="" style={{ width: 'clamp(18px, 1.35vw, 26px)', height: 'clamp(18px, 1.35vw, 26px)', objectFit: 'contain' }} />
                </div>
                <div>
                  <p style={{ fontSize: 'clamp(16px, 1.45vw, 22px)', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>{f.title}</p>
                  <p style={{ fontSize: 'clamp(13px, 1.05vw, 16px)', color: 'var(--color-text-secondary)', lineHeight: '1.7', maxWidth: 'clamp(320px, 30vw, 520px)' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end' }}>
          <img
            src={laptopImg}
            alt="workspace"
            style={{
              width: 'min(980px, 58vw)',
              maxWidth: '100%',
              display: 'block',
              borderRadius: 'clamp(18px, 1.8vw, 28px)',
            }}
          />
          <div style={{
            position: 'absolute', top: 'clamp(16px, 2vw, 28px)', right: 'clamp(-18px, -1.2vw, -10px)',
            backgroundColor: 'rgba(255,255,255,0.96)', borderRadius: '14px', padding: '12px 16px',
            boxShadow: 'var(--shadow-md)', border: '1px solid rgba(17,24,39,0.08)',
            minWidth: 'clamp(200px, 18vw, 280px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
              <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.9px', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Live Momentum</span>
            </div>
            <p style={{ fontSize: 'clamp(12px, 1.1vw, 16px)', color: 'var(--color-text-secondary)' }}>Weekly Focus: <strong>15h 42m</strong></p>
            <div style={{ marginTop: '9px', height: '5px', backgroundColor: 'var(--color-border)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ width: '72%', height: '100%', background: 'var(--gradient-progress)', borderRadius: '99px' }} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  </div>
)

export default FeaturesSection
