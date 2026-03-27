const ErrorMessage = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-3">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
      </svg>
    </div>
    <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">Terjadi Kesalahan</p>
    <p className="text-xs text-[var(--color-text-muted)] mb-4 max-w-[240px]">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="text-xs font-medium text-[var(--color-accent)] hover:underline"
      >
        Coba lagi
      </button>
    )}
  </div>
)

export default ErrorMessage
