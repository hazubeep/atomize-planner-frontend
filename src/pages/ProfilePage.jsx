import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/atoms/Input'
import { getProfile, updateProfile, deleteAccount, uploadAvatar } from '../services/profileService'
import accountIcon from '../assets/account_icon.svg'
import securityIcon from '../assets/security_icon.svg'
import pensilIcon from '../assets/pensil.svg'

const ProfilePage = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [profile, setProfile] = useState({ name: '', email: '', avatar_url: '' })

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [alert, setAlert] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true)
        const res = await getProfile()
        const data = res?.data || res
        setProfile(data)
        setFullName(data?.name || '')
        setEmail(data?.email || '')
      } catch (err) {
        console.error(err)
        setError('Gagal memuat profil.')
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [])

  const handleChangePhoto = () => {
    fileInputRef.current?.click()
  }

  const handleUploadAvatar = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      setSaving(true)
      const formData = new FormData()
      formData.append('avatar', file)
      const res = await uploadAvatar(formData)
      const avatar_url = res?.data?.avatar_url || res?.avatar_url
      setProfile((prev) => ({ ...prev, avatar_url }))
      setAlert('Foto profil berhasil diubah.')
    } catch (err) {
      console.error(err)
      setError('Gagal mengunggah foto profil.')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveChanges = async () => {
    if (!fullName.trim() || !email.trim()) {
      setError('Nama lengkap dan email harus diisi.')
      return
    }
    if (newPassword && newPassword !== confirmPassword) {
      setError('New password dan confirm password tidak cocok.')
      return
    }

    setSaving(true)
    setError('')
    setAlert('')

    try {
      const payload = { name: fullName, email }
      await updateProfile(payload)
      setProfile((prev) => ({ ...prev, name: fullName, email }))

      if (newPassword) {
        // optional: implement change password route if tersedia
      }

      setAlert('Perubahan profil berhasil disimpan.')
    } catch (err) {
      console.error(err)
      setError('Gagal menyimpan perubahan profil.')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!currentPassword) {
      setError('Masukkan current password untuk menghapus akun.')
      return
    }

    setDeleting(true)
    setError('')
    setAlert('')

    try {
      await deleteAccount({ current_password: currentPassword })
      navigate('/register')
    } catch (err) {
      console.error(err)
      setError('Hapus akun gagal. Periksa password Anda.')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return <div className="flex min-h-[calc(100dvh-52px)] items-center justify-center p-8 text-text-primary">Loading profile...</div>
  }

  return (
    <div className="pb-8 pt-6">
      <h1 className="text-2xl font-semibold text-text-primary">Profile Setting</h1>
      <p className="mt-2 text-sm text-text-secondary">Adjust your personal preferences and account security to maintain your focus environment.</p>

      {(alert || error) && (
        <div className={`mt-4 rounded-lg px-4 py-3 text-sm ${alert ? 'bg-teal-light text-teal' : 'bg-red-100 text-red-700'}`}>
          {alert || error}
        </div>
      )}

      <div className="mt-8 grid gap-12 lg:grid-cols-[340px_1fr]">
        <div className="h-fit rounded-[18px] bg-[#F4F4F0] p-5">
          <div className="relative mx-auto mb-4 h-28 w-28">
            <img
              src={profile.avatar_url || '/src/assets/avatar.png'}
              alt="Avatar"
              className="h-full w-full rounded-full object-cover"
            />
            <button
              type="button"
              onClick={handleChangePhoto}
              className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border border-white bg-white shadow-sm"
              aria-label="Edit avatar"
            >
              <img src={pensilIcon} alt="edit" className="h-3 w-3" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUploadAvatar}
              className="hidden"
            />
          </div>

          <h2 className="text-center text-xl font-semibold text-text-primary">{profile.name || fullName || 'User'}</h2>
          <p className="mt-1 text-center text-sm text-text-muted">{profile.email || email}</p>

          <button
            type="button"
            onClick={handleChangePhoto}
            disabled={saving}
            className="mt-4 w-full rounded-lg bg-[#E0E4DE] px-4 py-2 text-sm font-semibold text-text-primary transition hover:brightness-95 disabled:opacity-60"
          >
            Change Photo
          </button>
        </div>

        <div className="space-y-6">
          <div className="rounded-[18px] bg-[#F4F4F0] p-5">
            <div className="mb-5 flex items-center gap-2">
              <img src={accountIcon} alt="account" className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Account Details</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-white border border-[#E0E4DE]"
              />
              <Input
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border border-[#E0E4DE]"
              />
            </div>
          </div>

          <div className="rounded-[18px] bg-[#F4F4F0] p-5">
            <div className="mb-5 flex items-center gap-2">
              <img src={securityIcon} alt="security" className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Security</h3>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Input
                  label="Current Password"
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="bg-white border border-[#E0E4DE] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword((v) => !v)}
                  className="absolute right-3 top-[38px] text-sm text-text-muted"
                >
                  {showCurrentPassword ? '🙈' : '👁'}
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative">
                  <Input
                    label="New Password"
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-white border border-[#E0E4DE] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((v) => !v)}
                    className="absolute right-3 top-[38px] text-sm text-text-muted"
                  >
                    {showNewPassword ? '🙈' : '👁'}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-white border border-[#E0E4DE] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-3 top-[38px] text-sm text-text-muted"
                  >
                    {showConfirmPassword ? '🙈' : '👁'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="rounded-lg border border-red-500 bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-red-50 disabled:opacity-60"
            >
              Delete Account
            </button>
            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={saving}
              className="rounded-lg bg-[#3C6660] px-4 py-2 text-sm font-semibold text-[#DCFFF8] transition hover:brightness-90 disabled:opacity-60"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
