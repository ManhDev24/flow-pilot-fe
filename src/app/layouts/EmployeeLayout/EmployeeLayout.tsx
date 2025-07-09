import type { ReactNode } from 'react'

function EmployeeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div>EmployeeLayout</div>
      {children}
    </>
  )
}

export default EmployeeLayout

/**
 * NOTE
 * Chia 2 cái side bar cho 2 role Teamleader - Staff
 */
