import { Search, Filter, Plus, ExternalLink, Trash2 } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar'
import { Badge } from '@/app/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table'
import { useState } from 'react'
import type { UserManagement } from '../models/UserManagementInterface'
import { AddUserModal } from './AddUserModal'
import { EditUserModal } from './EditUserModal'
import { DeleteUserModal } from './DeleteUserModal'

export function UserDirectory() {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false)
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserManagement | null>(null)
  const users = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      avatar: 'AJ',
      avatarColor: 'bg-cyan-600', // Changed from bg-cyan-500 to bg-cyan-600 for better contrast
      role: 'Super Admin',
      status: 'Active',
      lastLogin: '2023-10-28',
      workspace: 'Global Admin'
    },
    {
      id: 2,
      name: 'Bob Williams',
      email: 'bob.williams@example.com',
      avatar: 'BW',
      avatarColor: 'bg-orange-600', // Changed from bg-orange-500 to bg-orange-600 for better contrast
      role: 'Admin Workspace',
      status: 'Active',
      lastLogin: '2023-10-25',
      workspace: 'Alpha Corp, Beta Solutions'
    },
    {
      id: 3,
      name: 'Charlie Davis',
      email: 'charlie.davis@example.com',
      avatar: 'CD',
      avatarColor: 'bg-gray-600',
      role: 'Employee',
      status: 'Inactive',
      lastLogin: '2023-10-20',
      workspace: 'Gamma Inc'
    },
    {
      id: 4,
      name: 'Diana Miller',
      email: 'diana.miller@example.com',
      avatar: 'DM',
      avatarColor: 'bg-gray-700',
      role: 'Employee',
      status: 'Active',
      lastLogin: '2023-10-26',
      workspace: 'Delta Systems'
    },
    {
      id: 5,
      name: 'Eve Brown',
      email: 'eve.brown@example.com',
      avatar: 'EB',
      avatarColor: 'bg-gray-500',
      role: 'Team Leader',
      status: 'Pending',
      lastLogin: '2023-10-22',
      workspace: 'Epsilon Innovations'
    },
    {
      id: 6,
      name: 'Frank White',
      email: 'frank.white@example.com',
      avatar: 'FW',
      avatarColor: 'bg-cyan-700', // Changed from bg-cyan-400 to bg-cyan-700 for better contrast with white text
      role: 'Employee',
      status: 'Active',
      lastLogin: '2023-10-24',
      workspace: 'Zeta Group'
    },
    {
      id: 7,
      name: 'Grace Green',
      email: 'grace.green@example.com',
      avatar: 'GG',
      avatarColor: 'bg-gray-600',
      role: 'Super Admin',
      status: 'Active',
      lastLogin: '2023-10-26',
      workspace: 'Global Admin'
    },
    {
      id: 8,
      name: 'Henry King',
      email: 'henry.king@example.com',
      avatar: 'HK',
      avatarColor: 'bg-green-500',
      role: 'Member',
      status: 'Inactive',
      lastLogin: '2023-10-18',
      workspace: 'Eta Solutions'
    },
    {
      id: 9,
      name: 'Ivy Lee',
      email: 'ivy.lee@example.com',
      avatar: 'IL',
      avatarColor: 'bg-gray-800',
      role: 'Admin Workspace',
      status: 'Active',
      lastLogin: '2023-10-25',
      workspace: 'Theta Systems'
    },
    {
      id: 10,
      name: 'Jack Taylor',
      email: 'jack.taylor@example.com',
      avatar: 'JT',
      avatarColor: 'bg-orange-600', // Changed from bg-orange-400 to bg-orange-600 for better contrast
      role: 'Team Leader',
      status: 'Active',
      lastLogin: '2023-10-26',
      workspace: 'Iota Corp'
    },
    {
      id: 11,
      name: 'Kelly Hall',
      email: 'kelly.hall@example.com',
      avatar: 'KH',
      avatarColor: 'bg-green-700', // Changed from bg-green-400 to bg-green-700 for better contrast with white text
      role: 'Employee',
      status: 'Pending',
      lastLogin: '2023-10-23',
      workspace: 'Kappa Group'
    },
    {
      id: 12,
      name: 'Liam Clark',
      email: 'liam.clark@example.com',
      avatar: 'LC',
      avatarColor: 'bg-cyan-600', // Changed from bg-cyan-500 to bg-cyan-600 for better contrast
      role: 'Employee',
      status: 'Active',
      lastLogin: '2023-10-26',
      workspace: 'Global Admin'
    }
  ]

  const handleEditUser = (user: UserManagement) => {
    setSelectedUser(user)
    setIsEditUserModalOpen(true)
  }

  const handleDeleteUser = (user: UserManagement) => {
    setSelectedUser(user)
    setIsDeleteUserModalOpen(true)
  }
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className='bg-green-100 text-green-800 hover:bg-green-100'>Active</Badge>
      case 'Inactive':
        return <Badge className='bg-red-100 text-red-800 hover:bg-red-100'>Inactive</Badge>
      case 'Pending':
        return <Badge className='bg-yellow-100 text-yellow-800 hover:bg-yellow-100'>Pending</Badge>
      default:
        return <Badge variant='secondary'>{status}</Badge>
    }
  }

  return (
    <div className='bg-white rounded-lg border border-gray-200'>
      <div className='p-6 border-b border-gray-200'>
        <div className='flex items-center justify-between space-x-4'>
          <div className='relative flex-1 max-w-md'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
            <Input placeholder='Search users by name or email...' className='pl-10 border-gray-300' />
          </div>
          <div className='flex items- justify-center space-x-3'>
            <Select defaultValue='all-roles'>
              <SelectTrigger className='w-40 border-gray-300'>
                <Filter className='w-4 h-4 mr-2 text-gray-400' />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all-roles'>All Roles</SelectItem>
                <SelectItem value='super-admin'>Super Admin</SelectItem>
                <SelectItem value='admin'>Admin</SelectItem>
                <SelectItem value='employee'>Employee</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue='all-statuses'>
              <SelectTrigger className='w-40 border-gray-300'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all-statuses'>All Statuses</SelectItem>
                <SelectItem value='active'>Active</SelectItem>
                <SelectItem value='inactive'>Inactive</SelectItem>
                <SelectItem value='pending'>Pending</SelectItem>
              </SelectContent>
            </Select>
            <div className='flex  justify-between items-center'>
              <Button className='bg-blue-600 hover:bg-blue-700 text-white' onClick={() => setIsAddUserModalOpen(true)}>
                <Plus className='w-4 h-4 mr-2' />
                Add New User
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow className='border-gray-200'>
              <TableHead className='text-gray-600 font-medium'>User</TableHead>
              <TableHead className='text-gray-600 font-medium'>Role</TableHead>
              <TableHead className='text-gray-600 font-medium'>Status</TableHead>
              <TableHead className='text-gray-600 font-medium'>Last Login</TableHead>
              <TableHead className='text-gray-600 font-medium'>Workspaces</TableHead>
              <TableHead className='text-gray-600 font-medium'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className='border-gray-200'>
                <TableCell>
                  <div className='flex items-center space-x-3'>
                    <Avatar className='w-10 h-10'>
                      <AvatarFallback className={`${user.avatarColor} text-white font-medium`}>
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='font-medium text-gray-900'>{user.name}</p>
                      <p className='text-sm text-gray-500'>{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className='text-gray-900'>{user.role}</span>
                </TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>
                  <span className='text-gray-600'>{user.lastLogin}</span>
                </TableCell>
                <TableCell>
                  <span className='text-gray-600'>{user.workspace}</span>
                </TableCell>
                <TableCell>
                  <div className='flex items-center space-x-2'>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='text-gray-400 hover:text-blue-600'
                      onClick={() => handleEditUser(user)}
                    >
                      <ExternalLink className='w-4 h-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='text-gray-400 hover:text-red-600'
                      onClick={() => handleDeleteUser(user)}
                    >
                      <Trash2 className='w-4 h-4' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddUserModal open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen} />
      <EditUserModal open={isEditUserModalOpen} onOpenChange={setIsEditUserModalOpen} user={selectedUser} />
      <DeleteUserModal open={isDeleteUserModalOpen} onOpenChange={setIsDeleteUserModalOpen} user={selectedUser} />
    </div>
  )
}
