/**
 * Calculate overall progress percentage from steps
 * @param {Array} steps
 * @returns {number} percentage 0-100
 */
export const calcProgress = (steps = []) => {
  if (!steps.length) return 0
  const done = steps.filter((s) => s.status === 'completed').length
  return Math.round((done / steps.length) * 100)
}

/**
 * Format date to readable string
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Truncate text
 */
export const truncate = (str, max = 80) =>
  str?.length > max ? str.slice(0, max) + '…' : str

/**
 * cn — simple classname joiner
 */
export const cn = (...classes) => classes.filter(Boolean).join(' ')

/**
 * Delay utility for async UX
 */
export const delay = (ms) => new Promise((res) => setTimeout(res, ms))
