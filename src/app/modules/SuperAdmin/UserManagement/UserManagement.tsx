import { OverviewCards } from './partials/OverviewCards'
import { UserDirectory } from './partials/UserDirectory'
import { UserManagementHeader } from './partials/UserManagementHeader'

function UserManagement() {
  return (
    <div className='flex flex-col min-h-screen'>
      <UserManagementHeader />
      <main className='flex-1 p-6 bg-gray-50'>
        <div className='max-w-7xl mx-auto space-y-6'>
          <div>
            <h1 className='text-2xl font-semibold text-gray-900 mb-6'>User Management</h1>
            <OverviewCards />
          </div>
          <UserDirectory />
        </div>
      </main>
    </div>
  )
}

export default UserManagement
