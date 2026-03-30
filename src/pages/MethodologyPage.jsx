import LandingNavbar from '../components/organisms/LandingNavbar'
import LandingFooter from '../components/organisms/LandingFooter'

const MethodologyPage = () => {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <LandingNavbar />
      <div className="h-14" />

      <div className="flex flex-1 items-center justify-center px-16 py-24">
        <div className="mx-auto w-full max-w-[1120px]">
          <h1 className="mb-3 font-display text-[44px] font-normal text-text-primary">The Atomization Process</h1>
          <p className="text-base text-text-secondary">Belum diisi.</p>
        </div>
      </div>
      <LandingFooter />
    </div>
  )
}

export default MethodologyPage
