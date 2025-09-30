import { AdminWsApi } from '@/app/apis/AUTH/Admin-ws.api'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { Checkbox } from '@/app/components/ui/checkbox'
import { Input } from '@/app/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table'
import type { AdminWsItem, AdminWsResponse } from '@/app/modules/AdminWs/MyEmployees/models/AdminwsInterface'
import { BanAccountModal } from '@/app/modules/AdminWs/MyEmployees/partials/Ban-account-modal'
import { InviteEmployeeModal } from '@/app/modules/AdminWs/MyEmployees/partials/Invite-employee-modal'
import { UpdateEmployeeModal } from '@/app/modules/AdminWs/MyEmployees/partials/Update-employee-modal'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { ChevronLeft, ChevronRight, Edit, Eye, Plus, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
// const employees = [...] // removed static data

function MyEmployees() {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<AdminWsItem | null>(null)
  const [isBanModalOpen, setIsBanModalOpen] = useState(false)

  const { data, isLoading, isError, error } = useQuery<AdminWsResponse, AxiosError>({
    queryKey: ['admin-ws-users'],
    queryFn: AdminWsApi.getAllUsers
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error?.message}</div>
  const handleBanEmployee = () => {
    // TODO: ban employee logic
    setIsBanModalOpen(false)
  }

  const handleUpdateEmployee = (employee: AdminWsItem) => {
    // TODO: update employee logic
    setIsUpdateModalOpen(false)
  }

  const handleSelectAll = (checked: boolean) => {
    const apiEmployees = data?.data.items || []
    if (checked) {
      setSelectedEmployees(apiEmployees.map((emp) => emp.id))
    } else {
      setSelectedEmployees([])
    }
  }

  const handleSelectEmployee = (employeeId: string, checked: boolean) => {
    if (checked) {
      setSelectedEmployees([...selectedEmployees, employeeId])
    } else {
      setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId))
    }
  }

  return (
    <div className='flex h-screen bg-white container mx-auto'>
      <div className='flex-1 flex flex-col'>
        <header className='bg-white border-gray-200 px-6 py-4'>
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-extrabold text-gray-900'>Manage Employees</h1>
            <div className='flex items-center gap-4'>
              <Button className='bg-blue-600 hover:bg-blue-700' onClick={() => setIsInviteModalOpen(true)}>
                <Plus className='w-4 h-4 mr-2' />
                Add new
              </Button>
            </div>
          </div>
        </header>

        {/* Filters and Search */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} className='bg-white px-6 py-4 mb-6 mt-3'>
          <div className='flex items-center gap-4'>
            <div className='relative flex-1 max-w-sm'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <Input
                placeholder='Search by name...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-10'
              />
            </div>
            {/* ...other filters unchanged... */}
          </div>
        </div>

        <div className='flex-1 overflow-auto bg-white'>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', overflow: 'hidden' }}>
            <Table>
              <TableHeader>
                <TableRow className='border-b border-gray-200'>
                  <TableHead className='w-12'>
                    <Checkbox
                      checked={selectedEmployees.length === (data?.data.items?.length || 0)}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className='text-gray-500 font-medium'>AVATAR</TableHead>
                  <TableHead className='text-gray-500 font-medium'>NAME</TableHead>
                  <TableHead className='text-gray-500 font-medium'>EMAIL</TableHead>
                  <TableHead className='text-gray-500 font-medium'>ROLE</TableHead>
                  <TableHead className='text-gray-500 font-medium'>STATUS</TableHead>
                  <TableHead className='text-gray-500 font-medium'>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(data?.data.items || []).map((employee: AdminWsItem) => (
                  <TableRow key={employee.id} className='border-b border-gray-100 hover:bg-gray-50'>
                    <TableCell>
                      <Checkbox
                        checked={selectedEmployees.includes(employee.id)}
                        onCheckedChange={(checked) => handleSelectEmployee(employee.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell>
                      <Avatar className='w-8 h-8'>
                        <AvatarImage src={employee.avatar_url || '/placeholder.svg'} />
                        <AvatarFallback>
                          {employee.name
                            .split(' ')
                            .map((n: string) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className='font-medium text-gray-900'>{employee.name}</TableCell>
                    <TableCell className='text-gray-600'>{employee.email}</TableCell>
                    <TableCell className='text-gray-600'>{employee.role_id}</TableCell>
                    <TableCell>
                      <Badge
                        variant={employee.status === 'active' ? 'default' : 'secondary'}
                        className={
                          employee.status === 'active'
                            ? 'bg-green-100 text-green-800 hover:bg-green-100'
                            : 'bg-red-100 text-red-800 hover:bg-red-100'
                        }
                      >
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                          <Eye className='w-4 h-4 text-gray-400' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-8 w-8 p-0'
                          onClick={() => {
                            setSelectedEmployee(employee)
                            setIsUpdateModalOpen(true)
                          }}
                        >
                          <Edit className='w-4 h-4 text-gray-400' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-8 w-8 p-0'
                          onClick={() => {
                            setSelectedEmployee(employee)
                            setIsBanModalOpen(true)
                          }}
                        >
                          <Trash2 className='w-4 h-4 text-gray-400' />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        <div className='bg-white border-t border-gray-200 px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='text-sm text-gray-500'>
              Showing 1 to {data?.data.items?.length || 0} of {data?.data.total || 0} results
            </div>
            <div className='flex items-center gap-2'>
              <Button variant='ghost' size='sm' disabled>
                <ChevronLeft className='w-4 h-4' />
              </Button>
              <Button variant='default' size='sm' className='bg-blue-600 hover:bg-blue-700'>
                1
              </Button>
              <Button variant='ghost' size='sm'>
                2
              </Button>
              <span className='text-gray-400'>...</span>
              <Button variant='ghost' size='sm'>
                100
              </Button>
              <Button variant='ghost' size='sm'>
                <ChevronRight className='w-4 h-4' />
              </Button>
            </div>
          </div>
        </div>

        {/* Modals */}
        <InviteEmployeeModal
          isOpen={isInviteModalOpen}
          onClose={() => setIsInviteModalOpen(false)}
          onInvite={() => {}}
        />
        <UpdateEmployeeModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          employee={selectedEmployee}
          onUpdate={handleUpdateEmployee}
        />
        <BanAccountModal
          isOpen={isBanModalOpen}
          onClose={() => setIsBanModalOpen(false)}
          employeeName={selectedEmployee?.name || ''}
          onConfirm={handleBanEmployee}
        />
      </div>
    </div>
  )
}

export default MyEmployees
