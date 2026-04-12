import { cn } from '../../utils'
import Section from './Section'
import pensil from '../../assets/gambar_pensil.png'
import bulat from '../../assets/lima_bulat.png'
import kotak3 from '../../assets/kotak.svg'

const steps = [
  {
    num: '01',
    title: 'Input your big task',
    desc: "Don't filter. Simply express the overwhelming project in natural language. Our AI listens to the context, not just the words.",
    bgClass: 'bg-bg border border-border',
    titleClass: 'text-text-primary',
    descClass: 'text-text-muted',
    numClass: 'text-border',
    img: pensil,
    imgClassName: 'w-full rounded-lg object-cover',
  },
  {
    num: '02',
    title: 'AI breakdown',
    desc: 'Our engine identifies logical micro-steps, estimating energy requirements and identifying dependencies in seconds.',
    bgClass: 'bg-[#3C6660] border-transparent',
    titleClass: 'text-white',
    descClass: 'text-white/90',
    numClass: 'text-white/30',
    img: bulat,
    imgClassName: 'w-full rounded-lg object-cover mt-[80px]',
  },
  {
    num: '03',
    title: 'Focus mode',
    desc: 'One task. One screen. No distractions. The UI adapts to eliminate everything but the current micro-step.',
    bgClass: 'bg-[#E0E4DE] border-transparent',
    titleClass: 'text-text-primary',
    descClass: 'text-text-muted',
    numClass: 'text-border',
    img: kotak3,
    imgClassName: 'h-14 w-14 object-contain mt-[80px]',
    imgAlign: 'flex-end',
  },
]

const ProcessSection = () => (
  <div id="methodology" className="bg-bg py-10">
    <Section>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-text-muted">How it works</p>
      <h2 className="mb-2 font-display text-4xl font-normal text-text-primary">The Atomization Process</h2>
      <p className="mb-12 max-w-[520px] text-[15px] text-text-muted">
        Complexity is the enemy of execution. We dismantle obstacles using our signature three-stage ritual.
      </p>

      <div className="grid gap-3 grid-cols-1 md:[grid-template-columns:4fr_5fr_3fr]">
        {steps.map((s) => (
          <div
            key={s.num}
            className={cn(
              'flex flex-col overflow-hidden rounded-[20px] p-6 px-8',
              s.bgClass
            )}
          >
            <p className={cn('mb-[18px] text-[34px] font-bold', s.numClass)}>
              {s.num}
            </p>
            <p className={cn('mb-3 text-lg font-semibold', s.titleClass)}>
              {s.title}
            </p>
            <p className={cn('text-sm leading-[1.75]', s.descClass)}>
              {s.desc}
            </p>
            <div
              className={cn(
                'mt-auto flex items-end',
                s.imgAlign === 'flex-end' ? 'justify-end' : 'justify-center'
              )}
            >
              {s.img && <img src={s.img} alt="" className={cn(s.imgClassName, 'hidden md:block')} />}
            </div>
          </div>
        ))}
      </div>
    </Section>
  </div>
)

export default ProcessSection
