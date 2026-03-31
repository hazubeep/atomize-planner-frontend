import { useNavigate } from 'react-router-dom'
import Section from '../atoms/Section'

const CtaSection = () => {
  const navigate = useNavigate()
  return (
    <div className="py-24 pb-30">
      <Section>
        <div className="relative overflow-hidden rounded-[24px] bg-[#3C6660] px-10 py-19.5 text-center">
          {/* Quarter-circle ornaments: white @ 90% transparency (10% opacity) */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-white/10"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 rounded-tr-full bg-white/10"
            aria-hidden
          />

          <div className="relative z-1">
            <h2 className="mb-4.5 font-display text-5xl font-normal leading-[1.15] text-[#DCFFF8]">
              Start Your First
              <br />
              Atomized Task Today
            </h2>
            <p className="mb-9 text-sm text-[#DCFFF8]">
              Join 15,000+ deep thinkers who have reclaimed their peace of mind and productivity.
            </p>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="cursor-pointer rounded-full border-none bg-[#DCFFF8] px-9 py-3.5 text-[15px] font-semibold text-[#3C6660] transition-opacity hover:opacity-90"
            >
              Get Started Free
            </button>
            <p className="mt-3.5 text-xs text-[#DCFFF8]">No credit card required. Focus guaranteed.</p>
          </div>
        </div>
      </Section>
    </div>
  )
}

export default CtaSection
