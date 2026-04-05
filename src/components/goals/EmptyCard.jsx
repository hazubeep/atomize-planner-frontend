import circlePlus from '../../assets/circle plus.svg'

const EmptyCard = ({ onClick }) => (
  <div
    onClick={onClick}
    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#AFB3AE] bg-[#F4F4F0] p-10 transition hover:brightness-95"
  >
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-[#E0E4DE]">
      <img src={circlePlus} alt="add" className="h-8 w-8 object-contain" />
    </div>
    <p className="mb-1.5 text-sm font-bold text-text-primary">Dream something new</p>
    <p className="text-center text-[12px] text-text-secondary">Define a major objective to atomize</p>
  </div>
)

export default EmptyCard
