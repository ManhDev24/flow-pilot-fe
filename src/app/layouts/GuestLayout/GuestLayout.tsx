import Footer from '@/app/modules/Guest/LandingPage/partials/Footer/Footer'
import Header from '@/app/modules/Guest/LandingPage/partials/Header/Header'
import type { ReactNode } from 'react'

function GuestLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Guest Layout */}
      <Header />

      {children}
      <Footer />
    </>
  )
}

export default GuestLayout
