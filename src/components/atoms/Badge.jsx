const Badge = ({ children, style = {} }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: '5px',
    padding: '4px 10px', borderRadius: '20px',
    backgroundColor: '#fff', border: '1px solid var(--color-border)',
    fontSize: '11px', fontWeight: '600', color: 'var(--color-text-secondary)',
    boxShadow: 'var(--shadow-sm)',
    ...style,
  }}>
    {children}
  </span>
)

export default Badge
