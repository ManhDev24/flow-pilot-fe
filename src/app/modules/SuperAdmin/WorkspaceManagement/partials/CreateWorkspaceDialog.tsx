import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/app/components/ui/dialog'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/app/components/ui/select'
import { WorkspaceAPI, type CreateWorkspaceRequest } from '@/app/apis/AUTH/workspace.api'
import { PackageApi } from '@/app/apis/AUTH/package.api'
import type { PackageData } from '@/app/modules/SuperAdmin/PackageManagement/models/package.type'
import { toast } from 'react-toastify'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function CreateWorkspaceDialog({ open, onClose, onSuccess }: Props) {
  const [packages, setPackages] = useState<PackageData[]>([])
  const [loadingData, setLoadingData] = useState(false)
  const [creating, setCreating] = useState(false)

  const { control, handleSubmit, reset, watch } = useForm<CreateWorkspaceRequest>({
    defaultValues: {
      name: '',
      company_code: '',
      company_name: '',
      package_id: '',
      start_date: new Date().toISOString().slice(0, 10),
      expire_date: '',
      status: 'active'
    }
  })

  const watchStartDate = watch('start_date')

  useEffect(() => {
    if (open) {
      setLoadingData(true)
      // Fetch package plans from Package API
      PackageApi.getAllPackages(1, 10)
        .then((res: any) => {
          setPackages(res?.data || [])
        })
        .finally(() => setLoadingData(false))
      reset({
        name: '',
        company_code: '',
        company_name: '',
        package_id: '',
        start_date: new Date().toISOString().slice(0, 10),
        expire_date: '',
        status: 'active'
      })
    }
  }, [open, reset])

  const onSubmit = async (data: CreateWorkspaceRequest) => {
    setCreating(true)
    try {
      const resp = await WorkspaceAPI.createWorkspace(data)
      if (resp?.success) {
        toast.success('Workspace created successfully')
        onSuccess()
        onClose()
        reset()
      } else {
        toast.error(resp?.message || 'Failed to create workspace')
      }
    } catch (error: any) {
      console.error('Error creating workspace:', error)
      toast.error(error?.response?.data?.message || 'Failed to create workspace')
    } finally {
      setCreating(false)
    }
  }

  const handleClose = () => {
    onClose()
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='max-w-md max-h-[100vh]'>
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogDescription>Create a new workspace for your customer</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Workspace Name</label>
            <Controller
              name='name'
              control={control}
              rules={{ required: 'Workspace name is required' }}
              render={({ field, fieldState }) => (
                <>
                  <Input placeholder='Enter workspace name' {...field} />
                  {fieldState.error && <p className='text-sm text-red-500'>{fieldState.error.message}</p>}
                </>
              )}
            />
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium'>Company Code</label>
            <Controller
              name='company_code'
              control={control}
              render={({ field }) => <Input placeholder='Enter company code (optional)' {...field} />}
            />
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium'>Company Name</label>
            <Controller
              name='company_name'
              control={control}
              rules={{ required: 'Company name is required' }}
              render={({ field, fieldState }) => (
                <>
                  <Input placeholder='Enter company name' {...field} />
                  {fieldState.error && <p className='text-sm text-red-500'>{fieldState.error.message}</p>}
                </>
              )}
            />
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium'>Package</label>
            <Controller
              name='package_id'
              control={control}
              rules={{ required: 'Package is required' }}
              render={({ field, fieldState }) => (
                <>
                  <Select onValueChange={field.onChange} value={field.value} disabled={loadingData}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select package' />
                    </SelectTrigger>
                    <SelectContent>
                      {packages?.map((pkg) => (
                        <SelectItem key={pkg.id} value={pkg.id}>
                          {pkg.name} - {pkg.price.toLocaleString('vi-VN')} ₫
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.error && <p className='text-sm text-red-500'>{fieldState.error.message}</p>}
                </>
              )}
            />
          </div>

          <div className='flex gap-4'>
            <div className='space-y-2 flex-1'>
              <label className='text-sm font-medium'>Start Date</label>
              <Controller
                name='start_date'
                control={control}
                rules={{ required: 'Start date is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <Input type='date' {...field} />
                    {fieldState.error && <p className='text-sm text-red-500'>{fieldState.error.message}</p>}
                  </>
                )}
              />
            </div>
            <div className='space-y-2 flex-1'>
              <label className='text-sm font-medium'>Expire Date</label>
              <Controller
                name='expire_date'
                control={control}
                rules={{
                  required: 'Expire date is required',
                  validate: (value) => {
                    if (watchStartDate && value && new Date(value) <= new Date(watchStartDate)) {
                      return 'Expire date must be after start date'
                    }
                    return true
                  }
                }}
                render={({ field, fieldState }) => (
                  <>
                    <Input type='date' {...field} />
                    {fieldState.error && <p className='text-sm text-red-500'>{fieldState.error.message}</p>}
                  </>
                )}
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium'>Status</label>
            <Controller
              name='status'
              control={control}
              rules={{ required: 'Status is required' }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='active'>Active</SelectItem>
                    <SelectItem value='inactive'>Inactive</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <DialogFooter className='gap-2'>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                Cancel
              </Button>
            </DialogClose>
            <Button type='submit' disabled={creating || loadingData}>
              {creating ? 'Creating...' : 'Create Workspace'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
