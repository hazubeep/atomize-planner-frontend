import { useState } from 'react'
import Input from '../Atoms/Input'
import securityIcon from '../../assets/security_icon.svg'
import { Eye, EyeOff } from 'lucide-react'


const SecuritySettings = ({
  currentPassword, setCurrentPassword,
  newPassword, setNewPassword,
  confirmPassword, setConfirmPassword
}) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="rounded-[18px] bg-[#F4F4F0] p-5">
      <div className="mb-5 flex items-center gap-2">
        <img src={securityIcon} alt="security" className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Security</h3>
      </div>
      <p className="mb-4 text-xs text-text-muted">Leave password fields empty if you don't want to change it.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="relative sm:col-span-2">
          <Input label="Current Password" type={showCurrentPassword ? 'text' : 'password'} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="bg-white border border-[#E0E4DE] pr-10" />
          <button type="button" onClick={() => setShowCurrentPassword((v) => !v)} className="absolute right-3 top-[38px] text-sm text-text-muted">
            {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div className="relative">
          <Input label="New Password" type={showNewPassword ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="bg-white border border-[#E0E4DE] pr-10" />
          <button type="button" onClick={() => setShowNewPassword((v) => !v)} className="absolute right-3 top-[38px] text-sm text-text-muted">
            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div className="relative">
          <Input label="Confirm New Password" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-white border border-[#E0E4DE] pr-10" />
          <button type="button" onClick={() => setShowConfirmPassword((v) => !v)} className="absolute right-3 top-[38px] text-sm text-text-muted">
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SecuritySettings
