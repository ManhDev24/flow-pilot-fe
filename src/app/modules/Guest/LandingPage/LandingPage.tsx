import AboutSection from './partials/AboutSection'
import ContactNow from './partials/ContactNow'
import FeatureSection from './partials/FeatureSection'
import HeroSection from './partials/HeroSection'

function LandingPage() {
  return (
    <div className='relative bg-white min-h-screen overflow-hidden'>
      {/* Decorative background blobs - trải dài toàn trang */}
      {/* Blob xanh lá bên trái */}
      <div className='fixed top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-br from-green-300/70 via-teal-300/60 to-transparent rounded-full blur-[120px] opacity-90 pointer-events-none'></div>

      {/* Blob xanh dương bên phải */}
      <div className='fixed top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-300/70 via-cyan-300/60 to-transparent rounded-full blur-[120px] opacity-90 pointer-events-none'></div>

      {/* Blob xanh nhạt ở giữa trên */}
      <div className='fixed -top-20 right-1/4 w-[400px] h-[400px] bg-gradient-to-b from-cyan-300/50 via-blue-200/40 to-transparent rounded-full blur-[100px] opacity-80 pointer-events-none'></div>

      {/* Small dots */}
      <div className='fixed top-8 left-1/4 w-3 h-3 bg-pink-400/70 rounded-full pointer-events-none'></div>
      <div className='fixed top-32 right-1/3 w-2 h-2 bg-purple-400/70 rounded-full pointer-events-none'></div>
      <div className='fixed bottom-1/3 left-1/3 w-2 h-2 bg-pink-400/70 rounded-full pointer-events-none'></div>
      <div className='fixed top-1/2 right-20 w-3 h-3 bg-blue-400/70 rounded-full pointer-events-none'></div>
      <div className='fixed bottom-20 right-1/2 w-2 h-2 bg-pink-400/70 rounded-full pointer-events-none'></div>
      <div className='fixed top-20 right-10 w-3 h-3 bg-cyan-400/70 rounded-full pointer-events-none'></div>

      {/* Content */}
      <div className='relative z-10'>
        <HeroSection />
        <AboutSection />
        <FeatureSection />
        <ContactNow />
      </div>
    </div>
  )
}

export default LandingPage
