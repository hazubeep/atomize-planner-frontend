const EmptyState = ({ title = 'Belum ada data', description = '', action }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
    <div className="w-16 h-16 rounded-2xl bg-[var(--color-surface-2)] flex items-center justify-center mb-4">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M9 9h6M9 12h4" strokeLinecap="round" />
      </svg>
    </div>
    <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">{title}</p>
    {description && <p className="text-xs text-[var(--color-text-muted)] max-w-[220px]">{description}</p>}
    {action && <div className="mt-4">{action}</div>}
  </div>
)

export default EmptyState
