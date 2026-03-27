// Reusable section wrapper for landing page sections
const Section = ({ children, style = {}, className = '' }) => (
  <section style={{ width: '100%', ...style }} className={className}>
    <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 clamp(20px, 4vw, 64px)' }}>
      {children}
    </div>
  </section>
)

export default Section
