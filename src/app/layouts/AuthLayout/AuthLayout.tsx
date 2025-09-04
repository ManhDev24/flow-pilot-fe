import type { ReactNode } from 'react'

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className='min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300'
    >
      {children}
    </div>
  )
}

export default AuthLayout
