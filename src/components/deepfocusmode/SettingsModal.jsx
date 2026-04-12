const SettingsModal = ({
  isOpen,
  onClose,
  onSave,
  draftWorkMin,
  setDraftWorkMin,
  draftBreakMin,
  setDraftBreakMin
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-labelledby="deep-focus-settings-title">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 id="deep-focus-settings-title" className="mb-1 text-lg font-semibold text-gray-900">Timer settings</h2>
        <p className="mb-5 text-sm text-gray-500">Adjust focus and break duration.</p>
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-gray-700">Focus (minutes)</span>
            <input type="number" min={1} max={180} value={draftWorkMin} onChange={(e) => setDraftWorkMin(Number(e.target.value))} className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm" />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-gray-700">Break (minutes)</span>
            <input type="number" min={1} max={60} value={draftBreakMin} onChange={(e) => setDraftBreakMin(Number(e.target.value))} className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm" />
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button type="button" onClick={onSave} className="rounded-xl bg-[#305954] px-4 py-2 text-sm font-medium text-white hover:bg-[#264643]">Save</button>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
