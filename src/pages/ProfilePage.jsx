import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/atoms/Input'
import { getProfile, updateProfile, deleteAccount, uploadAvatar, changePassword } from '../services/profileService'
import accountIcon from '../assets/account_icon.svg'
import securityIcon from '../assets/security_icon.svg'
import pensilIcon from '../assets/pensil.svg'

const parseError = (err) => err?.error?.message || err?.message || 'Terjadi kesalahan.'

const ProfilePage = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const [profile, setProfile] = useState({ name: '', email: '', avatar_url: '' })
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [deletePassword, setDeletePassword] = useState('')
  const [showDeletePassword, setShowDeletePassword] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  const [alert, setAlert] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true)
        const res = await getProfile()
        const data = res?.data ?? res
        setProfile(data)
        setFullName(data?.name || '')
        setEmail(data?.email || '')
      } catch (err) {
        setError(parseError(err))
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [])

  const showFeedback = (msg, isError = false) => {
    setAlert('')
    setError('')
    if (isError) setError(msg)
    else setAlert(msg)
  }

  const handleUploadAvatar = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setSaving(true)
    try {
      const formData = new FormData()
      formData.append('avatar', file)
      const res = await uploadAvatar(formData)
      setProfile((prev) => ({ ...prev, avatar_url: res?.data?.avatar_url ?? null }))
      showFeedback('Foto profil berhasil diubah.')
    } catch (err) {
      showFeedback(parseError(err), true)
    } finally {
      setSaving(false)
    }
  }

  // Single "Save Changes" — update profile + change password if filled
  const handleSaveChanges = async () => {
    if (!fullName.trim() || !email.trim()) {
      showFeedback('Nama lengkap dan email harus diisi.', true)
      return
    }
    if (newPassword && newPassword !== confirmPassword) {
      showFeedback('New password dan confirm password tidak cocok.', true)
      return
    }
    if (newPassword && !currentPassword) {
      showFeedback('Masukkan current password untuk mengganti password.', true)
      return
    }

    setSaving(true)
    try {
      const res = await updateProfile({ name: fullName, email })
      const data = res?.data ?? res
      setProfile((prev) => ({ ...prev, name: data.name, email: data.email }))

      if (newPassword) {
        await changePassword({
          current_password: currentPassword,
          new_password: newPassword,
          confirm_new_password: confirmPassword,
        })
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      }

      showFeedback('Perubahan berhasil disimpan.')
    } catch (err) {
      showFeedback(parseError(err), true)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setDeleteError('Masukkan password untuk menghapus akun.')
      return
    }
    setDeleting(true)
    setDeleteError('')
    try {
      await deleteAccount({ current_password: deletePassword })
      localStorage.removeItem('token')
      navigate('/register')
    } catch (err) {
      setDeleteError(parseError(err))
    } finally {
      setDeleting(false)
    }
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
    setDeletePassword('')
    setDeleteError('')
    setShowDeletePassword(false)
  }

  if (loading) {
    return <div className="flex min-h-[calc(100dvh-52px)] items-center justify-center p-8 text-text-primary">Loading profile...</div>
  }

  return (
    <div className="pb-8 pt-6">
      <h1 className="text-2xl font-semibold text-text-primary">Profile Setting</h1>
      <p className="mt-2 text-sm text-text-secondary">Adjust your personal preferences and account security.</p>

      {(alert || error) && (
        <div className={`mt-4 rounded-lg px-4 py-3 text-sm ${alert ? 'bg-teal-light text-teal' : 'bg-red-100 text-red-700'}`}>
          {alert || error}
        </div>
      )}

      <div className="mt-8 grid gap-12 lg:grid-cols-[340px_1fr]">
        {/* Avatar Card */}
        <div className="h-fit rounded-[18px] bg-[#F4F4F0] p-5">
          <div className="relative mx-auto mb-4 h-28 w-28">
            <img src={profile.avatar_url || '/src/assets/avatar.png'} alt="Avatar" className="h-full w-full rounded-full object-cover" />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border border-white bg-white shadow-sm"
              aria-label="Edit avatar"
            >
              <img src={pensilIcon} alt="edit" className="h-3 w-3" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUploadAvatar} className="hidden" />
          </div>
          <h2 className="text-center text-xl font-semibold text-text-primary">{profile.name || 'User'}</h2>
          <p className="mt-1 text-center text-sm text-text-muted">{profile.email}</p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={saving}
            className="mt-4 w-full rounded-lg bg-[#E0E4DE] px-4 py-2 text-sm font-semibold text-text-primary transition hover:brightness-95 disabled:opacity-60"
          >
            Change Photo
          </button>
        </div>

        <div className="space-y-6">
          {/* Account Details */}
          <div className="rounded-[18px] bg-[#F4F4F0] p-5">
            <div className="mb-5 flex items-center gap-2">
              <img src={accountIcon} alt="account" className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Account Details</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="bg-white border border-[#E0E4DE]" />
              <Input label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white border border-[#E0E4DE]" />
            </div>
          </div>

          {/* Security — Change Password */}
          <div className="rounded-[18px] bg-[#F4F4F0] p-5">
            <div className="mb-5 flex items-center gap-2">
              <img src={securityIcon} alt="security" className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Security</h3>
            </div>
            <p className="mb-4 text-xs text-text-muted">Leave password fields empty if you don't want to change it.</p>
            <div className="space-y-4">
              <div className="relative">
                <Input label="Current Password" type={showCurrentPassword ? 'text' : 'password'} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="bg-white border border-[#E0E4DE] pr-10" />
                <button type="button" onClick={() => setShowCurrentPassword((v) => !v)} className="absolute right-3 top-[38px] text-sm text-text-muted">
                  {showCurrentPassword ? '🙈' : '👁'}
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative">
                  <Input label="New Password" type={showNewPassword ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="bg-white border border-[#E0E4DE] pr-10" />
                  <button type="button" onClick={() => setShowNewPassword((v) => !v)} className="absolute right-3 top-[38px] text-sm text-text-muted">
                    {showNewPassword ? '🙈' : '👁'}
                  </button>
                </div>
                <div className="relative">
                  <Input label="Confirm New Password" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-white border border-[#E0E4DE] pr-10" />
                  <button type="button" onClick={() => setShowConfirmPassword((v) => !v)} className="absolute right-3 top-[38px] text-sm text-text-muted">
                    {showConfirmPassword ? '🙈' : '👁'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setDeleteModalOpen(true)}
              className="rounded-lg border border-red-400 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              Delete Account
            </button>
            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={saving}
              className="rounded-lg bg-[#3C6660] px-5 py-2 text-sm font-semibold text-[#DCFFF8] transition hover:brightness-90 disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="mb-1 text-lg font-semibold text-gray-900">Delete Account</h2>
            <p className="mb-5 text-sm text-gray-500">
              This action is <span className="font-semibold text-red-600">irreversible</span>. Enter your password to confirm.
            </p>

            {deleteError && (
              <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{deleteError}</p>
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
                onClick={closeDeleteModal}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {deleting ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfilePage
