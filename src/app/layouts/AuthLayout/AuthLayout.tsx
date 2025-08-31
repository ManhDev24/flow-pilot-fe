import type { ReactNode } from 'react'

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className='min-h-screen flex justify-center items-start'
      style={{
        background: 'linear-gradient(135deg, #7B2FF2 0%, #1A2980 50%, #00C6FB 100%)'
      }}
    >
      {children}
    </div>
  )
}

export default AuthLayout
