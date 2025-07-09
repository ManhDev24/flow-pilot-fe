import type { ReactNode } from 'react'

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div>AuthLayout</div>
      {children}
    </>
  )
}

export default AuthLayout
