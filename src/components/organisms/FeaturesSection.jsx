import Section from '../atoms/Section'
import laptopImg from '../../assets/laptop.png'
import spark from '../../assets/spark.svg'
import kotak from '../../assets/kotak-kotak.svg'
import analisis from '../../assets/logo_analisis.svg'

const features = [
  {
    icon: kotak,
    title: 'Task Deconstruction',
    desc: 'Intelligent recursive breakdown of goals into achievable units of work under 25 minutes each.',
  },
  {
    icon: spark,
    title: 'Minimalist Focus Mode',
    desc: 'A Zen-inspired interface that hides notifications and navigation until the current task is marked complete.',
  },
  {
    icon: analisis,
    title: 'Progress Analytics',
    desc: 'Visualise your momentum through tranquil heatmaps and velocity charts that celebrate flow, not just output.',
  },
]

const FeaturesSection = () => (
  <div id="features" className="bg-bg">
    <Section className="py-10">
      <div className="flex flex-col gap-8 md:grid md:items-center md:grid-cols-[0.9fr_1.1fr] md:gap-[clamp(30px,4vw,60px)]">
        <div className="w-full">
          <h2 className="mb-6 font-display text-[clamp(32px,3.6vw,64px)] font-normal leading-[1.05] text-text-primary md:mb-[clamp(28px,3.2vw,60px)]">
            Core Sanctuary Features
          </h2>
          <div className="flex flex-col gap-5 md:gap-[clamp(16px,1.8vw,26px)]">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-[rgba(6,78,59,0.14)] bg-accent-light md:h-[clamp(38px,2.4vw,52px)] md:w-[clamp(38px,2.4vw,52px)]">
                  <img src={f.icon} alt="" className="h-5 w-5 object-contain md:h-[clamp(18px,1.35vw,26px)] md:w-[clamp(18px,1.35vw,26px)]" />
                </div>
                <div className="flex-1">
                  <p className="mb-1.5 text-[clamp(16px,1.45vw,22px)] font-bold text-text-primary">{f.title}</p>
                  <p className="text-[clamp(13px,1.05vw,16px)] leading-[1.7] text-text-secondary">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden md:flex md:justify-end">
          <img
            src={laptopImg}
            alt="workspace"
            className="block w-[min(980px,58vw)] max-w-full rounded-[clamp(18px,1.8vw,28px)]"
          />
          <div className="absolute top-[clamp(16px,2vw,28px)] right-[clamp(-18px,-1.2vw,-10px)] min-w-[clamp(200px,18vw,280px)] rounded-[14px] border border-[rgba(17,24,39,0.08)] bg-[rgba(255,255,255,0.96)] p-3 px-4 shadow-md">
            <div className="mb-1.5 flex items-center gap-1.75">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-text-muted">Live Momentum</span>
            </div>
            <p className="text-[clamp(12px,1.1vw,16px)] text-text-secondary">
              Weekly Focus: <strong>15h 42m</strong>
            </p>
            <div className="mt-2 h-[5px] overflow-hidden rounded-full bg-border">
              <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-accent to-teal" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  </div>
)

export default FeaturesSection
