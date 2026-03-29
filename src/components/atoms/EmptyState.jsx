const EmptyState = ({ title = 'Belum ada data', description = '', action }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-2">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        className="text-text-muted"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M9 9h6M9 12h4" strokeLinecap="round" />
      </svg>
    </div>
    <p className="mb-1 text-sm font-semibold text-text-primary">{title}</p>
    {description && <p className="max-w-[220px] text-xs text-text-muted">{description}</p>}
    {action && <div className="mt-4">{action}</div>}
  </div>
)

export default EmptyState
