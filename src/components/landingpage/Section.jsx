import { cn } from '../../utils'

const Section = ({ children, className = '', innerClassName = '' }) => (
  <section className={cn('w-full', className)}>
    <div className={cn('mx-auto max-w-[1120px] px-[clamp(20px,4vw,64px)]', innerClassName)}>{children}</div>
  </section>
)

export default Section
