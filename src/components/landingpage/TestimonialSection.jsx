import Section from './Section'
import avatarImg from '../../assets/avatar.png'

const TestimonialSection = () => (
  <div className="bg-bg">
    <Section className="py-10">
      <div className="mx-auto max-w-[860px]">
        <div className="rounded-[24px] border border-border bg-white p-[clamp(26px,3vw,44px)] text-center shadow-sm">
          <p className="mb-7 font-[Georgia,serif] text-[clamp(48px,5vw,64px)] leading-none text-border">&quot;</p>
          <p className="mb-9 font-display text-[clamp(20px,2.5vw,28px)] font-normal leading-[1.55] text-text-primary">
            &quot;I used to stare at a blank screen for hours. AtomizePlanner turned my &apos;Write a Book&apos; mountain into
            a series of small, beautiful pebbles. The task paralysis is simply gone.&quot;
          </p>
          <div className="flex items-center justify-center gap-2.5">
            <img src={avatarImg} alt="Elena Thorne" className="h-11 w-11 rounded-full object-cover" />
            <div className="text-left">
              <p className="text-[15px] font-semibold text-text-primary">Elena Thorne</p>
              <p className="text-xs text-text-muted">Independent Researcher & Author</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  </div>
)

export default TestimonialSection
