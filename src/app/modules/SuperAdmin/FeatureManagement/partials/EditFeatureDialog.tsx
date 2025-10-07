import { FeatureApi } from '@/app/apis/AUTH/feature.api'
import { Button } from '@/app/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/app/components/ui/dialog'
import { Input } from '@/app/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { Textarea } from '@/app/components/ui/textarea'
import type { PackageForm } from '@/app/modules/SuperAdmin/PackageManagement/models/package.type'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import type { FeatureData, FeatureUpdate } from '../models/feature.type'

interface Props {
  open: boolean
  feature: FeatureData | null
  onClose: () => void
  onSuccess: () => void
}

export default function EditFeatureDialog({ open, feature, onClose, onSuccess }: Props) {
  const [updating, setUpdating] = useState(false)
  const [packages, setPackages] = useState<PackageForm>()
  const [loadingPackages, setLoadingPackages] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Omit<FeatureUpdate, 'id'>>({
    defaultValues: {
      name: '',
      description: '',
      status: 'active',
      package_id: ''
    }
  })

  useEffect(() => {
    if (open && feature) {
      reset({
        name: feature.name,
        description: feature.description,
        status: feature.status as 'active' | 'inactive',
        package_id: ''
      })
    }
  }, [open, feature, reset])

  useEffect(() => {
    if (open) {
      setLoadingPackages(true)
      FeatureApi.getAllPackagesForSelect()
        .then((packagesData) => {
          setPackages(packagesData || [])
        })
        .catch((err) => {
          toast.error('Failed to load packages')
          console.error(err)
        })
        .finally(() => setLoadingPackages(false))
    }
  }, [open])

  const onSubmit = async (data: Omit<FeatureUpdate, 'id'>) => {
    if (!feature) return

    setUpdating(true)
    try {
      const updateData = { ...data, id: feature.id }
      const resp = await FeatureApi.updateFeature(feature.id, updateData)
      if (resp?.success) {
        toast.success('Feature updated successfully')
        onSuccess()
        onClose()
      } else {
        toast.error(resp?.message || 'Failed to update feature')
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to update feature'
      toast.error(msg)
    } finally {
      setUpdating(false)
    }
  }

  const handleClose = () => {
    if (!updating) {
      onClose()
    }
  }

  if (!feature) return null

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) handleClose()
      }}
    >
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Edit Feature</DialogTitle>
          <DialogDescription>Update feature details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>Feature Name</label>
            <Controller
              name='name'
              control={control}
              rules={{ required: 'Feature name is required' }}
              render={({ field }) => (
                <Input placeholder='Enter feature name' {...field} className={errors.name ? 'border-red-500' : ''} />
              )}
            />
            {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>}
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Description</label>
            <Controller
              name='description'
              control={control}
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <Textarea
                  placeholder='Enter feature description'
                  {...field}
                  rows={3}
                  className={errors.description ? 'border-red-500' : ''}
                />
              )}
            />
            {errors.description && <p className='text-red-500 text-xs mt-1'>{errors.description.message}</p>}
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Package</label>
            <Controller
              name='package_id'
              control={control}
              rules={{ required: 'Package is required' }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={(v) => field.onChange(v)} disabled={loadingPackages}>
                  <SelectTrigger className={errors.package_id ? 'border-red-500' : ''}>
                    <SelectValue placeholder={loadingPackages ? 'Loading packages...' : 'Select a package'} />
                  </SelectTrigger>
                  <SelectContent>
                    {packages?.data.map((pkg) => (
                      <SelectItem key={pkg.id} value={pkg.id}>
                        {pkg.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.package_id && <p className='text-red-500 text-xs mt-1'>{errors.package_id.message}</p>}
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Status</label>
            <Controller
              name='status'
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={(v) => field.onChange(v as 'active' | 'inactive')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='active'>Active</SelectItem>
                    <SelectItem value='inactive'>Inactive</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <DialogFooter className='flex justify-end gap-2 pt-4'>
            <Button type='button' variant='outline' onClick={handleClose} disabled={updating}>
              Cancel
            </Button>
            <Button type='submit' disabled={updating} className='bg-blue-500 hover:bg-blue-600'>
              {updating ? 'Updating...' : 'Update Feature'}
            </Button>
          </DialogFooter>
        </form>

        <DialogClose className='sr-only'>Close</DialogClose>
      </DialogContent>
    </Dialog>
  )
}
