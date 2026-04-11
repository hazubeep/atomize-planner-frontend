import Input from '../atoms/Input'
import accountIcon from '../../assets/account_icon.svg'

const AccountDetailsForm = ({ fullName, email, setFullName, setEmail }) => {
  return (
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
  )
}

export default AccountDetailsForm
