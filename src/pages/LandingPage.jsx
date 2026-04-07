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
  <div className="relative w-full md:max-w-[clamp(820px,66vw,1320px)]">
    <img src={heroImg} alt="app preview" className="block w-full rounded-[20px]" />
    <div className="absolute bottom-[4%] left-[3%] flex items-center gap-2 rounded-[14px] border border-border bg-white p-[2%_3%] shadow-md">
      <span className="text-[clamp(12px,1.4vw,20px)]">⚡</span>
      <div>
        <p className="text-[clamp(8px,0.9vw,12px)] font-extrabold uppercase tracking-wide text-text-muted">
          Focus Level
        </p>
        <p className="text-[clamp(11px,1.2vw,18px)] font-extrabold text-accent">98% Peak</p>
      </div>
    </div>
  </div>
)

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen w-full flex-col bg-bg">
      <LandingNavbar />

      <div id="top" />

      <div className="flex-1 bg-[radial-gradient(ellipse_at_top_right,#BFEBE433_0%,transparent_55%)]">
        <Section className="pt-20 pb-6 md:pt-24 md:pb-10" innerClassName="h-full">
          <div className="flex flex-col items-center gap-6 md:grid md:grid-cols-[0.85fr_1.15fr] md:items-start">
            <div className="relative z-[2] w-full font-['Manrope',sans-serif] text-center md:text-left order-1 md:order-1 md:row-start-1">
              <h1 className="mb-[clamp(12px,1.6vw,22px)] font-['Manrope',sans-serif] text-[clamp(40px,4.8vw,74px)] font-extrabold leading-[1] text-text-primary">
                Transform
                <br />
                Overwhelm
                <br />
                <span className="text-accent">into Action</span>
              </h1>
              <p className="mb-[clamp(14px,1.8vw,24px)] w-full max-w-[560px] mx-auto md:mx-0 text-[clamp(14px,1.05vw,18px)] leading-[1.65] text-text-secondary font-['Manrope',sans-serif]">
                The AI-powered sanctuary for breaking down complex tasks into micro-steps. Reclaim your focus without the
                digital noise.
              </p>
              <div className="hidden md:flex md:justify-start">
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="cursor-pointer rounded-xl border-none bg-accent px-[clamp(22px,2.5vw,40px)] py-[clamp(12px,1.3vw,16px)] text-[clamp(14px,1.25vw,20px)] font-bold text-white"
                >
                  Get Started Free
                </button>
              </div>
            </div>
            <div className="relative z-[1] flex w-full justify-center pointer-events-none order-2 md:order-2 md:justify-end">
              <HeroMockup />
            </div>
            <div className="flex justify-center order-3 md:hidden">
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="cursor-pointer rounded-xl border-none bg-accent px-[clamp(22px,2.5vw,40px)] py-[clamp(12px,1.3vw,16px)] text-[clamp(14px,1.25vw,20px)] font-bold text-white"
              >
                Get Started Free
              </button>
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