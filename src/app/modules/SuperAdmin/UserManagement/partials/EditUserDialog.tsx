// React is not referenced directly (JSX runtime handles it)
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/app/components/ui/select'
import { Controller, useForm } from 'react-hook-form'
import { RoleAPI } from '@/app/apis/AUTH/role.api'
import { WorkspaceAPI } from '@/app/apis/AUTH/workspace.api'
import { updateUser as apiUpdateUser } from '@/app/apis/AUTH/user.api'
import type { User, UpdateUserRequest } from '../models/UserManagementInterface'
import type { Role } from '@/app/apis/AUTH/role.api'
import type { Workspace } from '@/app/apis/AUTH/workspace.api'
import { toast } from 'react-toastify'

interface Props {
  open: boolean
  user: User | null
  onClose: () => void
  onSuccess: () => void
}

export default function EditUserDialog({ open, user, onClose, onSuccess }: Props) {
  const [roles, setRoles] = useState<Role[]>([])
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [loadingData, setLoadingData] = useState(false)
  const [updating, setUpdating] = useState(false)

  const { control, handleSubmit, reset } = useForm<UpdateUserRequest>({
    defaultValues: {
      name: '',
      email: '',
      role_id: 0,
      workspace_id: '',
    },
  })

  useEffect(() => {
    if (open && user) {
      setLoadingData(true)
      Promise.all([
        RoleAPI.getAllRoles({ page: 1, pageSize: 1000 }),
        WorkspaceAPI.getAllWorkspaces({ page: 1, limit: 1000 }),
      ])
        .then(([rolesResp, wsResp]) => {
          setRoles(rolesResp.data.data)
          setWorkspaces(wsResp.data.data)
          reset({
            name: user.name,
            email: user.email,
            role_id: user.role.id,
            workspace_id: user.workspace.id,
          })
        })
        .catch((err) => {
          toast.error(err.message || 'Failed loading data')
        })
        .finally(() => setLoadingData(false))
    }
  }, [open, user, reset])

  const onSubmit = async (data: UpdateUserRequest) => {
    if (!user) return
    setUpdating(true)
    try {
      const resp = await apiUpdateUser(user.id, data)
      if (resp.success) {
        toast.success('User updated successfully')
        onSuccess()
        onClose()
      } else {
        toast.error(resp.message)
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to update user'
      toast.error(msg)
    } finally {
      setUpdating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update user details below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input placeholder="Name" {...field} />
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input type="email" placeholder="Email" {...field} />
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Role</label>
            <Controller
              name="role_id"
              control={control}
              render={({ field }) => (
                <Select value={String(field.value)} onValueChange={(v) => field.onChange(Number(v))}>
                  <SelectTrigger className="min-w-[200px]">
                    <SelectValue>{roles.find((r) => r.id === field.value)?.role || 'Select Role'}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => (
                      <SelectItem key={r.id} value={String(r.id)}>{r.role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Workspace</label>
            <Controller
              name="workspace_id"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={(v) => field.onChange(v)}>
                  <SelectTrigger className="min-w-[200px]">
                    <SelectValue>{workspaces.find((w) => w.id === field.value)?.name || 'Select Workspace'}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {workspaces.map((w) => (
                      <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={updating}>
              Cancel
            </Button>
            <Button type="submit" disabled={updating || loadingData}>
              {updating ? 'Updating...' : 'Update User'}
            </Button>
          </DialogFooter>
        </form>
        <DialogClose className="sr-only">Close</DialogClose>
      </DialogContent>
    </Dialog>
  )
}
