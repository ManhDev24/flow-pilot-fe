import type { ReactNode } from 'react'
import Header from './partials/Header'
import Footer from './partials/Footer'

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
