import LandingNavbar from '../components/organisms/LandingNavbar'
import LandingFooter from '../components/organisms/LandingFooter'

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-bg">
      <LandingNavbar />
      <div className="h-14" />

      <div className="mx-auto max-w-[1120px] px-16 py-24">
        <h1 className="mb-3 font-display text-[44px] font-normal text-text-primary">Pricing</h1>
        <p className="text-base text-text-secondary">Belum diisi.</p>
      </div>
      <LandingFooter />
    </div>
  )
}

export default PricingPage
