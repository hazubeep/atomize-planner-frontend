import { cn } from '../../utils'
import Section from '../atoms/Section'
import pensil from '../../assets/gambar_pensil.png'
import bulat from '../../assets/lima_bulat.png'
import kotak3 from '../../assets/kotak.svg'

const steps = [
  {
    num: '01',
    title: 'Input your big task',
    desc: "Don't filter. Simply express the overwhelming project in natural language. Our AI listens to the context, not just the words.",
    active: false,
    img: pensil,
    imgClassName: 'w-full rounded-lg object-cover',
  },
  {
    num: '02',
    title: 'AI breakdown',
    desc: 'Our engine identifies logical micro-steps, estimating energy requirements and identifying dependencies in seconds.',
    active: true,
    img: bulat,
    imgClassName: 'w-full rounded-lg object-cover',
  },
  {
    num: '03',
    title: 'Focus mode',
    desc: 'One task. One screen. No distractions. The UI adapts to eliminate everything but the current micro-step.',
    active: false,
    img: kotak3,
    imgClassName: 'h-10 w-10 object-contain',
    imgAlign: 'flex-end',
  },
]

const ProcessSection = () => (
  <div className="bg-bg py-24">
    <Section>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-text-muted">How it works</p>
      <h2 className="mb-2 font-display text-4xl font-normal text-text-primary">The Atomization Process</h2>
      <p className="mb-12 max-w-[520px] text-[15px] text-text-muted">
        Complexity is the enemy of execution. We dismantle obstacles using our signature three-stage ritual.
      </p>

      <div className="grid gap-5 [grid-template-columns:4fr_5fr_3fr]">
        {steps.map((s) => (
          <div
            key={s.num}
            className={cn(
              'flex min-h-[320px] flex-col overflow-hidden rounded-[20px] p-8 px-7',
              s.active ? 'border-transparent bg-accent-dark' : 'border border-border bg-bg'
            )}
          >
            <p
              className={cn(
                'mb-[18px] text-[34px] font-bold',
                s.active ? 'text-white/25' : 'text-border'
              )}
            >
              {s.num}
            </p>
            <p
              className={cn('mb-3 text-lg font-semibold', s.active ? 'text-white' : 'text-text-primary')}
            >
              {s.title}
            </p>
            <p
              className={cn(
                'text-sm leading-[1.75]',
                s.active ? 'text-white/65' : 'text-text-muted'
              )}
            >
              {s.desc}
            </p>
            <div
              className={cn(
                'mt-14 flex items-end',
                s.imgAlign === 'flex-end' ? 'justify-end' : s.active ? 'justify-center' : 'justify-start'
              )}
            >
              {s.img && <img src={s.img} alt="" className={s.imgClassName} />}
            </div>
          </div>
        ))}
      </div>
    </Section>
  </div>
)

export default ProcessSection
