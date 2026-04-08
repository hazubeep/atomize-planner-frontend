import { useState } from 'react'
import Input from '../Atoms/Input'

const DeleteAccountModal = ({ isOpen, onClose, onConfirm, deleting, error }) => {
  const [deletePassword, setDeletePassword] = useState('')
  const [showDeletePassword, setShowDeletePassword] = useState(false)

  if (!isOpen) return null

  const handleConfirm = () => onConfirm(deletePassword)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-1 text-lg font-semibold text-gray-900">Delete Account</h2>
        <p className="mb-5 text-sm text-gray-500">
          This action is <span className="font-semibold text-red-600">irreversible</span>. Enter your password to confirm.
        </p>

        {error && (
          <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        )}

        <div className="relative mb-5">
          <Input
            label="Password"
            type={showDeletePassword ? 'text' : 'password'}
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            className="border border-gray-200 pr-10"
          />
          <button type="button" onClick={() => setShowDeletePassword((v) => !v)} className="absolute right-3 top-[38px] text-sm text-text-muted">
            {showDeletePassword ? '🙈' : '👁'}
          </button>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={deleting}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {deleting ? 'Deleting...' : 'Delete Account'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccountModal
