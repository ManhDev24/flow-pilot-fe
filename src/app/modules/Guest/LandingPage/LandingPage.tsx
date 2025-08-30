import AboutSection from './partials/AboutSection/AboutSection'
import FeaturesSection from './partials/FeaturesSection/FeaturesSection'
import Footer from './partials/Footer/Footer'
import Header from './partials/Header/Header'
import HeroSection from './partials/HeroSection/HeroSection'
import MobileSection from './partials/MobileSection/MobileSection'
import PricingSection from './partials/PricingSection/PricingSection'
import VideoDemoSection from './partials/VideoDemoSection/VideoDemoSection'

function LandingPage() {
  return (
    <div className='bg-no-repeat bg-cover bg-center' >
        <Header />
        {/* banner chính */}
        <HeroSection />
        {/* video demo */}
        <VideoDemoSection />
        {/* liệt kê tính năng/sản phẩm */}
        <FeaturesSection />
        {/* phần dành cho thiết bị di động */}
        <MobileSection />
        {/* giới thiệu ngắn */}
        <AboutSection />
        {/* bảng giá */}
        <PricingSection />
        <Footer />
    </div>
  )
}

export default LandingPage
