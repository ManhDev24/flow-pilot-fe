import type { ReactNode } from "react"

function GuestLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div>GuestLayout</div>
      {children}
    </>
  )
}

export default GuestLayout
