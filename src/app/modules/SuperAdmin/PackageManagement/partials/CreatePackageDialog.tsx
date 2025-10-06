import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/app/components/ui/select'
import { Controller, useForm } from 'react-hook-form'
import { PackageApi } from '@/app/apis/AUTH/package.api'
import type { CreatePackageData } from '../models/package.type'
import { toast } from 'react-toastify'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function CreatePackageDialog({ open, onClose, onSuccess }: Props) {
  const [creating, setCreating] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreatePackageData>({
    defaultValues: {
      name: '',
      duration_in_months: 1,
      price: 0,
      description: '',
      status: 'active'
    }
  })

  const onSubmit = async (data: CreatePackageData) => {
    setCreating(true)
    try {
      const resp = await PackageApi.createPackage(data)
      if (resp?.success) {
        toast.success('Package created successfully')
        onSuccess()
        onClose()
        reset()
      } else {
        toast.error(resp?.message || 'Failed to create package')
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to create package'
      toast.error(msg)
    } finally {
      setCreating(false)
    }
  }

  const handleClose = () => {
    if (!creating) {
      reset()
      onClose()
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) handleClose()
      }}
    >
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Create New Package</DialogTitle>
          <DialogDescription>Fill in package details below.</DialogDescription>
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
            <Button type='button' variant='outline' onClick={handleClose} disabled={creating}>
              Cancel
            </Button>
            <Button type='submit' disabled={creating} className='bg-purple-500 hover:bg-purple-600'>
              {creating ? 'Creating...' : 'Create Package'}
            </Button>
          </DialogFooter>
        </form>

        <DialogClose className='sr-only'>Close</DialogClose>
      </DialogContent>
    </Dialog>
  )
}
