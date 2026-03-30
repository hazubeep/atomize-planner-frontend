import { useNavigate } from 'react-router-dom'
import Section from '../components/atoms/Section'
import ProcessSection from '../components/organisms/ProcessSection'
import FeaturesSection from '../components/organisms/FeaturesSection'
import TestimonialSection from '../components/organisms/TestimonialSection'
import CtaSection from '../components/organisms/CtaSection'
import LandingNavbar from '../components/organisms/LandingNavbar'
import LandingFooter from '../components/organisms/LandingFooter'
import heroImg from '../assets/tampilan_chat.png'

const HeroMockup = () => (
  <div className="relative w-full max-w-[clamp(820px,66vw,1320px)]">
    <img src={heroImg} alt="app preview" className="block w-full rounded-[20px]" />
    <div className="absolute bottom-[clamp(18px,2.2vw,32px)] left-[clamp(14px,1.6vw,24px)] flex items-center gap-2 rounded-[14px] border border-border bg-white p-[clamp(8px,1vw,12px)_clamp(12px,1.2vw,18px)] shadow-md">
      <span className="text-[clamp(16px,1.4vw,20px)]">⚡</span>
      <div>
        <p className="text-[clamp(10px,0.9vw,12px)] font-extrabold uppercase tracking-wide text-text-muted">
          Focus Level
        </p>
        <p className="text-[clamp(14px,1.2vw,18px)] font-extrabold text-accent">98% Peak</p>
      </div>
    </div>
  </div>
)

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen w-full flex-col bg-bg">
      <LandingNavbar />

      <div className="h-14" />

      <div id="top" />

      <div
        className="min-h-[calc(100dvh-56px)] flex-1 bg-[radial-gradient(ellipse_at_top_right,#BFEBE433_0%,transparent_55%)]"
      >
        <Section className="min-h-[calc(100dvh-56px)] py-10" innerClassName="h-full">
          <div className="grid min-h-[calc(100dvh-56px-80px)] items-center gap-[clamp(28px,4.4vw,72px)] [grid-template-columns:0.85fr_1.15fr]">
            <div className="relative z-[2] font-['Manrope',sans-serif]">
              <h1 className="mb-[clamp(12px,1.6vw,22px)] font-['Manrope',sans-serif] text-[clamp(40px,4.8vw,74px)] font-extrabold leading-[1] text-text-primary">
                Transform
                <br />
                Overwhelm
                <br />
                <span className="text-accent">into Action</span>
              </h1>
              <p className="mb-[clamp(18px,2.2vw,30px)] max-w-[clamp(360px,36vw,560px)] text-[clamp(14px,1.05vw,18px)] leading-[1.65] text-text-secondary font-['Manrope',sans-serif]">
                The AI-powered sanctuary for breaking down complex tasks into micro-steps. Reclaim your focus without the
                digital noise.
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/home')}
                  className="cursor-pointer rounded-xl border-none bg-accent px-[clamp(22px,2.5vw,40px)] py-[clamp(12px,1.3vw,16px)] text-[clamp(14px,1.25vw,20px)] font-bold text-white"
                >
                  Get Started Free
                </button>
              </div>
            </div>
            <div className="relative z-[1] flex justify-end pointer-events-none">
              <HeroMockup />
            </div>
          </div>
        </Section>
      </div>

      <ProcessSection />
      <FeaturesSection />
      <TestimonialSection />
      <CtaSection />
      <LandingFooter />
    </div>
  )
}

export default LandingPage
