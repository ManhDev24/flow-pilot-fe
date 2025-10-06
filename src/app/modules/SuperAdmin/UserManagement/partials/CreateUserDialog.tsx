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
import { createUser as apiCreateUser } from '@/app/apis/AUTH/user.api'
import type { CreateUserRequest } from '../models/UserManagementInterface'
import type { Role } from '@/app/apis/AUTH/role.api'
import type { Workspace } from '@/app/apis/AUTH/workspace.api'
import { toast } from 'react-toastify'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function CreateUserDialog({ open, onClose, onSuccess }: Props) {
  const [roles, setRoles] = useState<Role[]>([])
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [loadingData, setLoadingData] = useState(false)
  const [creating, setCreating] = useState(false)

  const { control, handleSubmit, reset } = useForm<CreateUserRequest>({
    defaultValues: {
      name: '',
      email: '',
      role_id: 0,
      workspace_id: '',
    },
  })

  useEffect(() => {
    if (open) {
      setLoadingData(true)
      Promise.all([
        RoleAPI.getAllRoles({ page: 1, pageSize: 1000 }),
        WorkspaceAPI.getAllWorkspaces({ page: 1, limit: 1000 }),
      ])
        .then(([rolesResp, wsResp]) => {
          setRoles(rolesResp.data.data)
          setWorkspaces(wsResp.data.data)
          const firstRole = rolesResp.data.data[0]
          const firstWs = wsResp.data.data[0]
          reset({
            name: '',
            email: '',
            role_id: firstRole?.id ?? 0,
            workspace_id: firstWs?.id ?? '',
          })
        })
        .catch((err) => {
          toast.error(err.message || 'Failed loading data')
        })
        .finally(() => setLoadingData(false))
    }
  }, [open, reset])

  const onSubmit = async (data: CreateUserRequest) => {
    setCreating(true)
    try {
      const resp = await apiCreateUser(data)
      if (resp.success) {
        toast.success('User created successfully')
        onSuccess()
        onClose()
      } else {
        toast.error(resp.message)
      }
    } catch (err: any) {
      // Show API error message if available
      const msg = err.response?.data?.message || err.message || 'Failed to create user'
      toast.error(msg)
    } finally {
      setCreating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>Fill in user details below.</DialogDescription>
        </DialogHeader>
        {/* form */}
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
                    <SelectValue>
                      {roles.find((r) => r.id === field.value)?.role || 'Select Role'}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => (
                      <SelectItem key={r.id} value={String(r.id)}>
                        {r.role}
                      </SelectItem>
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
                    <SelectValue>
                      {workspaces.find((w) => w.id === field.value)?.name || 'Select Workspace'}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {workspaces.map((w) => (
                      <SelectItem key={w.id} value={w.id}>
                        {w.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={creating}>
              Cancel
            </Button>
            <Button type="submit" disabled={creating || loadingData}>
              {creating ? 'Creating...' : 'Create User'}
            </Button>
          </DialogFooter>
        </form>
        <DialogClose className="sr-only">Close</DialogClose>
      </DialogContent>
    </Dialog>
  )
}
