import type { ReactNode } from 'react'

function SuperAdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div>SuperAdminLayout</div>
      {children}
    </>
  )
}

export default SuperAdminLayout
