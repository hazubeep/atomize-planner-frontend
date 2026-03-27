import Section from '../atoms/Section'
import pensil from '../../assets/gambar_pensil.png'
import bulat from '../../assets/lima_bulat.png'
import kotak3 from '../../assets/kotak.svg'


const steps = [
  {
    num: '01',
    title: 'Input your big task',
    desc: "Don't filter. Simply express the overwhelming project in natural language. Our AI listens to the context, not just the words.",
    active: false,
    img: pensil,
    imgStyle: { width: '100%', borderRadius: '8px', objectFit: 'cover' },
  },
  {
    num: '02',
    title: 'AI breakdown',
    desc: 'Our engine identifies logical micro-steps, estimating energy requirements and identifying dependencies in seconds.',
    active: true,
    img: bulat,
  },
  {
    num: '03',
    title: 'Focus mode',
    desc: 'One task. One screen. No distractions. The UI adapts to eliminate everything but the current micro-step.',
    active: false,
    img: kotak3,
    imgStyle: { width: '40px', height: '40px', objectFit: 'contain' },
    imgAlign: 'flex-end',
  },
]

const ProcessSection = () => (
  <div style={{ backgroundColor: '#FAF9F6', padding: '96px 0' }}>
    <Section>
      <p style={{ fontSize: '11px', fontWeight: '600', color: 'var(--color-text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>How it works</p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: '400', color: 'var(--color-text-primary)', marginBottom: '8px' }}>The Atomization Process</h2>
      <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', marginBottom: '48px', maxWidth: '520px' }}>
        Complexity is the enemy of execution. We dismantle obstacles using our signature three-stage ritual.
      </p>

      {/* Grid 4:5:3 ratio */}
      <div style={{ display: 'grid', gridTemplateColumns: '4fr 5fr 3fr', gap: '20px' }}>
        {steps.map((s) => (
          <div key={s.num} style={{
            borderRadius: '20px',
            backgroundColor: s.active ? 'var(--color-accent-dark)' : '#FAF9F6',
            border: `1px solid ${s.active ? 'transparent' : 'var(--color-border)'}`,
            padding: '32px 28px',
            display: 'flex', flexDirection: 'column', minHeight: '320px',
            overflow: 'hidden',
          }}>
            <p style={{ fontSize: '34px', fontWeight: '700', color: s.active ? 'rgba(255,255,255,0.25)' : 'var(--color-border)', marginBottom: '18px' }}>{s.num}</p>
            <p style={{ fontSize: '18px', fontWeight: '600', color: s.active ? '#fff' : 'var(--color-text-primary)', marginBottom: '12px' }}>{s.title}</p>
            <p style={{ fontSize: '14px', color: s.active ? 'rgba(255,255,255,0.65)' : 'var(--color-text-muted)', lineHeight: '1.75' }}>{s.desc}</p>
            <div style={{ marginTop: '56px', display: 'flex', justifyContent: s.imgAlign ?? (s.active ? 'center' : 'flex-start'), alignItems: 'flex-end' }}>
              {s.img && <img src={s.img} alt="" style={s.imgStyle} />}
              {s.icon && s.icon}
            </div>
          </div>
        ))}
      </div>
    </Section>
  </div>
)

export default ProcessSection
