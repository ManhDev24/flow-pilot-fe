import { FeatureApi } from '@/app/apis/AUTH/feature.api'
import { PackageApi } from '@/app/apis/AUTH/package.api'
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
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import type { PackageData, UpdatePackageData } from '../models/package.type'
import type { Feature } from '@/app/modules/SuperAdmin/FeatureManagement/models/feature.type'

interface Props {
  open: boolean
  package: PackageData | null
  onClose: () => void
  onSuccess: () => void
}

export default function EditPackageDialog({ open, package: pkg, onClose, onSuccess }: Props) {
  const [updating, setUpdating] = useState(false)
  const [features, setFeatures] = useState<Feature>()
  const [loadingFeatures, setLoadingFeatures] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UpdatePackageData>({
    defaultValues: {
      name: '',
      duration_in_months: 1,
      price: 0,
      description: '',
      status: 'active',
      featureIds: []
    }
  })

  useEffect(() => {
    if (open && pkg) {
      reset({
        name: pkg.name,
        duration_in_months: pkg.duration_in_months,
        price: pkg.price,
        description: pkg.description,
        status: pkg.status as 'active' | 'inactive',
        featureIds: pkg.features?.map((f) => f.id) || []
      })
    }
  }, [open, pkg, reset])

  useEffect(() => {
    if (open) {
      setLoadingFeatures(true)
      FeatureApi.getAllFeaturesForSelect()
        .then((featuresData) => {
          setFeatures(featuresData || [])
        })
        .catch((err) => {
          toast.error('Failed to load features')
          console.error(err)
        })
        .finally(() => setLoadingFeatures(false))
    }
  }, [open])

  const onSubmit = async (data: UpdatePackageData) => {
    if (!pkg) return

    setUpdating(true)
    try {
      const resp = await PackageApi.updatePackage(pkg.id, data)
      if (resp?.success) {
        toast.success('Package updated successfully')
        onSuccess()
        onClose()
      } else {
        toast.error(resp?.message || 'Failed to update package')
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to update package'
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

  if (!pkg) return null

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) handleClose()
      }}
    >
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Edit Package</DialogTitle>
          <DialogDescription>Update package details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>Package Name</label>
            <Controller
              name='name'
              control={control}
              rules={{ required: 'Package name is required' }}
              render={({ field }) => (
                <Input placeholder='Enter package name' {...field} className={errors.name ? 'border-red-500' : ''} />
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
                  placeholder='Enter package description'
                  {...field}
                  rows={3}
                  className={errors.description ? 'border-red-500' : ''}
                />
              )}
            />
            {errors.description && <p className='text-red-500 text-xs mt-1'>{errors.description.message}</p>}
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Duration (months)</label>
              <Controller
                name='duration_in_months'
                control={control}
                rules={{
                  required: 'Duration is required',
                  min: { value: 1, message: 'Duration must be at least 1 month' }
                }}
                render={({ field }) => (
                  <Input
                    type='number'
                    placeholder='1'
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className={errors.duration_in_months ? 'border-red-500' : ''}
                  />
                )}
              />
              {errors.duration_in_months && (
                <p className='text-red-500 text-xs mt-1'>{errors.duration_in_months.message}</p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Price (VND)</label>
              <Controller
                name='price'
                control={control}
                rules={{
                  required: 'Price is required',
                  min: { value: 0, message: 'Price must be positive' }
                }}
                render={({ field }) => (
                  <Input
                    type='number'
                    placeholder='0'
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className={errors.price ? 'border-red-500' : ''}
                  />
                )}
              />
              {errors.price && <p className='text-red-500 text-xs mt-1'>{errors.price.message}</p>}
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Features</label>
            <Controller
              name='featureIds'
              control={control}
              render={({ field }) => (
                <div className='space-y-2'>
                  <div className='border rounded-md p-2 max-h-36 overflow-y-auto'>
                    {loadingFeatures ? (
                      <p className='text-sm text-gray-500'>Loading features...</p>
                    ) : (features?.data?.length as any) > 0 ? (
                      features?.data?.map((feature) => (
                        <label
                          key={feature.id}
                          className='flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded'
                        >
                          <input
                            type='checkbox'
                            checked={field.value?.includes(feature.id) || false}
                            onChange={(e) => {
                              const currentIds = field.value || []
                              if (e.target.checked) {
                                field.onChange([...currentIds, feature.id])
                              } else {
                                field.onChange(currentIds.filter((id) => id !== feature.id))
                              }
                            }}
                            className='rounded'
                          />
                          <span className='text-sm'>{feature.name}</span>
                        </label>
                      ))
                    ) : (
                      <p className='text-sm text-gray-500'>No features available</p>
                    )}
                  </div>
                  <p className='text-xs text-gray-500'>Selected: {field.value?.length || 0} feature(s)</p>
                </div>
              )}
            />
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
            <Button type='submit' disabled={updating} className='bg-purple-500 hover:bg-purple-600'>
              {updating ? 'Updating...' : 'Update Package'}
            </Button>
          </DialogFooter>
        </form>

        <DialogClose className='sr-only'>Close</DialogClose>
      </DialogContent>
    </Dialog>
  )
}
