import { useEffect, useMemo, useState, useCallback } from 'react'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Edit, Trash2, Check } from 'lucide-react'
// dropdown/menu and icons were removed in favor of inline action buttons
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/app/components/ui/table'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/app/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import DeleteUserDialog from './partials/DeleteUserDialog'
import CreateUserDialog from './partials/CreateUserDialog'
import EditUserDialog from './partials/EditUserDialog'
import { deleteUser as apiDeleteUser, activateUser as apiActivateUser } from '@/app/apis/AUTH/user.api'
import { getAllUsers } from '@/app/apis/AUTH/user.api'
import { toast } from 'react-toastify'
import type { User, UserListResponse } from './models/UserManagementInterface'

const PAGE_SIZE = 10

function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(PAGE_SIZE)
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')
  const [selectedRole, setSelectedRole] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // derived role labels for display in the select trigger
  const roleLabels = useMemo(() => Array.from(new Set(users.map((u) => u.role?.role ?? '').filter(Boolean))), [users])
  const selectedRoleLabel = selectedRole === 'all' ? 'All Roles' : (roleLabels.find((r) => r.toLowerCase() === selectedRole) ?? selectedRole)

  // Extracted loader so we can reload after delete
  const loadUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const resp: UserListResponse = await getAllUsers({ page, limit })
      if (resp?.data) {
        setUsers(resp.data.items || [])
        setTotal(resp.data.total || 0)
      } else {
        setUsers([])
        setTotal(0)
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }, [page, limit])

  useEffect(() => {
    // call loadUsers on mount / when dependencies update
    loadUsers()
  }, [loadUsers])

  const openDeleteDialog = (user: User) => {
    setUserToDelete(user)
  }

  const closeDeleteDialog = () => {
    setUserToDelete(null)
  }

  const confirmDelete = async () => {
    if (!userToDelete) return
    setDeleteLoading(true)
    try {
      const resp = await apiDeleteUser(userToDelete.id)
      if (resp?.success) {
        // refresh list, ensure page still valid
        await loadUsers()
        closeDeleteDialog()
        toast.success('User deactivated successfully')
      } else {
        setError(resp?.message || 'Failed to deactivate user')
        toast.error(resp?.message || 'Failed to deactivate user')
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to deactivate user')
      toast.error(err?.message || 'Failed to deactivate user')
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleActivate = async (u: User) => {
    try {
      const resp = await apiActivateUser(u.id)
      if (resp?.success) {
        toast.success('User activated successfully')
        await loadUsers()
      } else {
        toast.error(resp?.message || 'Failed to activate user')
      }
    } catch (err: any) {
      toast.error(err?.message || 'Failed to activate user')
    }
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return users.filter((u) => {
      const textMatch = !q || [u.name, u.email, u.role?.role, u.workspace?.name].join(' ').toLowerCase().includes(q)
      const roleMatch = selectedRole === 'all' || (u.role?.role ?? '').toLowerCase() === selectedRole
      const statusMatch = selectedStatus === 'all' || (u.status ?? '').toLowerCase() === selectedStatus
      return textMatch && roleMatch && statusMatch
    })
  }, [users, search, selectedRole, selectedStatus])

  // sorting state: key can be 'role' | 'status' or null; dir: 1 asc, -1 desc
  const [sortKey, setSortKey] = useState<'role' | 'status' | null>(null)
  const [sortDir, setSortDir] = useState<1 | -1>(1)

  const sorted = useMemo(() => {
    if (!sortKey) return filtered
    const arr = [...filtered]
    arr.sort((a, b) => {
      const A = (sortKey === 'role' ? (a.role?.role ?? '') : (a.status ?? '')).toLowerCase()
      const B = (sortKey === 'role' ? (b.role?.role ?? '') : (b.status ?? '')).toLowerCase()
      if (A < B) return -1 * sortDir
      if (A > B) return 1 * sortDir
      return 0
    })
    return arr
  }, [filtered, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(total / limit))

  const handleAddUser = () => setCreateOpen(true)
  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setEditOpen(true)
  }
  const handleCreateSuccess = () => loadUsers()
  const handleEditSuccess = () => loadUsers()

  return (
    <div className='flex flex-col min-h-screen gap-6'>
      <h1 className='text-4xl font-semibold'>User Management</h1>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div className='flex items-center gap-4 w-full md:max-w-2xl'>
          <div className='relative w-full'>
            <Input
              placeholder='Search users by name or email...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='pr-12'
            />
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v)}>
            <SelectTrigger size='default' className='min-w-[150px]'>
              <SelectValue>{selectedRoleLabel}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Roles</SelectItem>
              {/* generate role list from users (unique) */}
              {Array.from(new Set(users.map((u) => u.role?.role ?? ''))).filter(Boolean).map((r) => (
                <SelectItem key={r} value={r.toLowerCase()}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={(v) => setSelectedStatus(v)}>
            <SelectTrigger size='default' className='min-w-[150px]'>
              <SelectValue>{selectedStatus === 'all' ? 'All Statuses' : (selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1))}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Statuses</SelectItem>
              <SelectItem value='active'>Active</SelectItem>
              <SelectItem value='inactive'>Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant='default'
            size='default'
            onClick={handleAddUser}
            className='bg-purple-500 hover:bg-purple-600 text-white'
          >
            + Add New User
          </Button>
        </div>
      </div>

      <section className='rounded-md border bg-background p-4 shadow-sm'>
        {error && <div className='text-destructive mb-2'>{error}</div>}

        <div>
          <Table>
            <TableHeader>
              <tr>
                <TableHead>User</TableHead>
                <TableHead
                  className='cursor-pointer'
                  onClick={() => {
                    if (sortKey !== 'role') {
                      setSortKey('role')
                      setSortDir(1)
                    } else {
                      setSortDir((d) => (d === 1 ? -1 : 1))
                    }
                  }}
                >
                  Role {sortKey === 'role' ? (sortDir === 1 ? '▲' : '▼') : ''}
                </TableHead>
                <TableHead
                  className='cursor-pointer'
                  onClick={() => {
                    if (sortKey !== 'status') {
                      setSortKey('status')
                      setSortDir(1)
                    } else {
                      setSortDir((d) => (d === 1 ? -1 : 1))
                    }
                  }}
                >
                  Status {sortKey === 'status' ? (sortDir === 1 ? '▲' : '▼') : ''}
                </TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Workspaces</TableHead>
                <TableHead>Actions</TableHead>
              </tr>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className='p-8 text-center'>
                    Loading users...
                  </TableCell>
                </TableRow>
              ) : sorted.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className='p-8 text-center'>
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                sorted.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className='flex items-center gap-3'>
                      <Avatar>
                        {u.avatar_url ? (
                          <AvatarImage src={u.avatar_url} alt={u.name} />
                        ) : (
                          <AvatarFallback>{u.name?.charAt(0) ?? '?'}</AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <div className='font-medium'>{u.name}</div>
                        <div className='text-muted-foreground text-sm'>{u.email}</div>
                      </div>
                    </TableCell>

                    <TableCell>{u.role?.role ?? '-'}</TableCell>

                    <TableCell>
                        <Badge
                          variant={u.status === 'Active' || u.status === 'active' ? 'default' : 'destructive'}
                          className={u.status === 'Active' || u.status === 'active' ? 'bg-green-100 text-green-800 border-transparent' : 'bg-red-100 text-red-800 border-transparent'}
                        >
                          {u.status.toUpperCase()}
                        </Badge>
                    </TableCell>

                    <TableCell className='text-sm text-muted-foreground'>
                      {u.created_at ? new Date(u.created_at).toLocaleDateString('en-GB') : '-'}
                    </TableCell>

                    <TableCell className='text-sm'>{u.workspace?.name ?? '-'}</TableCell>

                    <TableCell>
                      <div className='flex items-center justify-start gap-2'>
                        {/* Icon-only action buttons */}
                        <Button
                          variant='ghost'
                          size='icon'
                          aria-label={`Edit ${u.name}`}
                          onClick={() => handleEditUser(u)}
                        >
                          <Edit className='size-4' />
                        </Button>

                        {u.status === 'Active' || u.status === 'active' ? (
                          <Button
                            variant='destructive'
                            size='icon'
                            aria-label={`Delete ${u.name}`}
                            onClick={() => openDeleteDialog(u)}
                          >
                            <Trash2 className='size-4' />
                          </Button>
                        ) : (
                          <Button
                            variant='default'
                            size='icon'
                            aria-label={`Activate ${u.name}`}
                            onClick={() => {
                              handleActivate(u)
                            }}
                            className='bg-green-800 hover:bg-green-900 text-white'
                          >
                            <Check className='size-4' />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            <TableFooter>
              <tr>
                <td colSpan={6} className='px-2 py-3'>
                  <div className='flex items-center justify-between'>
                    <div className='text-sm text-muted-foreground'>
                      Showing {Math.min((page - 1) * limit + 1, total)} - {Math.min(page * limit, total)} of {total}
                    </div>
                    <div className='flex items-center gap-2'>
                      <Button
                        size='sm'
                        variant='ghost'
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                      >
                        Prev
                      </Button>
                      <div className='text-sm'>
                        Page {page} / {totalPages}
                      </div>
                      <Button
                        size='sm'
                        variant='ghost'
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page >= totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>
            </TableFooter>
          </Table>
        </div>
        <DeleteUserDialog
          open={Boolean(userToDelete)}
          user={userToDelete}
          loading={deleteLoading}
          onClose={closeDeleteDialog}
          onConfirm={confirmDelete}
        />
        {/* Create User Dialog */}
        <CreateUserDialog open={createOpen} onClose={() => setCreateOpen(false)} onSuccess={handleCreateSuccess} />
        {/* Edit User Dialog */}
        <EditUserDialog
          open={editOpen}
          user={selectedUser}
          onClose={() => setEditOpen(false)}
          onSuccess={handleEditSuccess}
        />
      </section>
    </div>
  )
}

export default UserManagement
