import { useRef } from 'react'
import pensilIcon from '../../assets/pensil.svg'
import defaultAvatar from '../../assets/default-avatar.svg'

const AvatarCard = ({ profile, onUpload, saving }) => {
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      onUpload(file)
    }
  }

  const getImageUrl = (url) => {
    if (!url || typeof url !== "string") {
      return defaultAvatar
    }

    if (url.startsWith("http")) {
      return url
    }

    return `http://127.0.0.1:8000${url}`
  }

  return (
    <div className="h-fit rounded-[18px] bg-[#F4F4F0] p-5">
      <div className="relative mx-auto mb-4 h-28 w-28">
       <img 
        src={getImageUrl(profile.avatar_url)} 
        alt="Avatar" 
        className="h-full w-full rounded-full object-cover" 
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border border-white bg-white shadow-sm"
          aria-label="Edit avatar"
        >
          <img src={pensilIcon} alt="edit" className="h-3 w-3" />
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
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

  )
  
}

export default AvatarCard