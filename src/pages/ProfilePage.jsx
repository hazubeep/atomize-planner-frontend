import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProfile, updateProfile, deleteAccount, uploadAvatar, changePassword } from '../services/profileService'
import AvatarCard from '../components/Profile/AvatarCard'
import AccountDetailsForm from '../components/Profile/AccountDetailsForm'
import SecuritySettings from '../components/Profile/SecuritySettings'
import DeleteAccountModal from '../components/Profile/DeleteAccountModal'

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

  const handleUploadAvatar = async (file) => {
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
    if (newPassword && !currentPassword) {
      showFeedback('Current password harus diisi untuk mengubah password.', true)
      return
    }
    if (newPassword && newPassword !== confirmPassword) {
      showFeedback('New password dan confirm password tidak cocok.', true)
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

  const handleDeleteAccount = async (password) => {
    if (!password) {
      setDeleteError('Masukkan password untuk menghapus akun.')
      return
    }
    setDeleting(true)
    setDeleteError('')
    try {
      await deleteAccount({ current_password: password })
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
    setDeleteError('')
  }

  if (loading) {
    return <div className="flex min-h-[calc(100dvh-52px)] items-center justify-center p-8 text-text-primary">Loading profile...</div>
  }

  return (
    <div className="pb-24 pt-6">
      <h1 className="text-2xl font-semibold text-text-primary">Profile Setting</h1>
      <p className="mt-2 text-sm text-text-secondary">Adjust your personal preferences and account security.</p>

      {(alert || error) && (
        <div className={`mt-4 rounded-lg px-4 py-3 text-sm ${alert ? 'bg-teal-light text-teal' : 'bg-red-100 text-red-700'}`}>
          {alert || error}
        </div>
      )}

      <div className="mt-8 grid gap-12 lg:grid-cols-[340px_1fr]">
        {/* Avatar Card */}
        <AvatarCard profile={profile} onUpload={handleUploadAvatar} saving={saving} />

        <div className="space-y-6">
          <AccountDetailsForm
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
          />

          <SecuritySettings
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={saving}
              className="w-full rounded-lg bg-[#3C6660] px-5 py-2 text-sm font-semibold text-[#DCFFF8] transition hover:brightness-90 disabled:opacity-60 sm:w-auto"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => setDeleteModalOpen(true)}
              className="w-full rounded-lg border border-red-400 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 sm:w-auto"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      <DeleteAccountModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteAccount}
        deleting={deleting}
        error={deleteError}
      />
    </div>
  )
}

export default ProfilePage
