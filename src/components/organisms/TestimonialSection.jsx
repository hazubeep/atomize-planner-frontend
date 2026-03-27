import Section from '../atoms/Section'
import avatarImg from '../../assets/avatar.png'

const TestimonialSection = () => (
  <div style={{ backgroundColor: '#FAF9F6' }}>
    <Section style={{ padding: '96px 0' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid var(--color-border)',
          borderRadius: '24px',
          boxShadow: 'var(--shadow-sm)',
          padding: 'clamp(26px, 3vw, 44px)',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '64px', color: 'var(--color-border)', fontFamily: 'Georgia, serif', lineHeight: 1, marginBottom: '28px' }}>"</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '400', color: 'var(--color-text-primary)', lineHeight: '1.55', marginBottom: '36px' }}>
            "I used to stare at a blank screen for hours. AtomizePlanner turned my 'Write a Book' mountain into a series of small, beautiful pebbles. The task paralysis is simply gone."
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <img src={avatarImg} alt="Elena Thorne" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-text-primary)' }}>Elena Thorne</p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Independent Researcher & Author</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  </div>
)

export default TestimonialSection
