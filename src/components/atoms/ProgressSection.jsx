import ProgressBar from './ProgressBar'

const ProgressSection = ({ progress, done, total }) => {
  return (
    <div style={{
      marginBottom: '26px',
      backgroundColor: '#F3F4F6',
      borderRadius: '16px',
      padding: '16px',
      border: '1px solid #E5E7EB',
    }}>
      <p style={{
        fontSize: '11px',
        color: 'var(--color-text-muted)',
        marginBottom: '6px'
      }}>
        Overall Progress
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '12px'
      }}>
        <p style={{
          fontSize: '20px',
          fontWeight: '700',
          color: 'var(--color-text-primary)',
        }}>
          {progress}% Completed
        </p>

        <p style={{
          fontSize: '10px',
          fontWeight: '600',
          color: 'var(--color-text-muted)',
        }}>
          {done} OF {total} STEPS
        </p>
      </div>

      <ProgressBar value={progress} />
    </div>
  )
}

export default ProgressSection