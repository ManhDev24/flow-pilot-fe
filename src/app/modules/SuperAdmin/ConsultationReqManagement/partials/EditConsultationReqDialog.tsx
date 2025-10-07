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
import { Textarea } from '@/app/components/ui/textarea'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/app/components/ui/select'
import { ConsultationRequestAPI } from '@/app/apis/AUTH/consultation-req.api'
import { PackageApi } from '@/app/apis/AUTH/package.api'
import type { PackageData } from '@/app/modules/SuperAdmin/PackageManagement/models/package.type'
import type { ConsultationRequest, UpdateConsultationRequest } from '../models/ConsultationReqManagementInterface'
import { toast } from 'react-toastify'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  consultationRequest: ConsultationRequest | null
}

export default function EditConsultationReqDialog({ open, onClose, onSuccess, consultationRequest }: Props) {
  const [packages, setPackages] = useState<PackageData[]>([])
  const [loadingData, setLoadingData] = useState(false)
  const [updating, setUpdating] = useState(false)

  const { control, handleSubmit, reset, setValue } = useForm<UpdateConsultationRequest>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company_name: '',
      package_id: '',
      note: '',
      status: 'new'
    }
  })

  useEffect(() => {
    if (open && consultationRequest) {
      setValue('name', consultationRequest.name)
      setValue('email', consultationRequest.email)
      setValue('phone', consultationRequest.phone)
      setValue('company_name', consultationRequest.company_name)
      setValue('package_id', consultationRequest.package_id)
      setValue('note', consultationRequest.note)
      setValue('status', consultationRequest.status)
    }
  }, [open, consultationRequest, setValue])

  useEffect(() => {
    if (open) {
      loadPackages()
    }
  }, [open])

  const loadPackages = async () => {
    try {
      setLoadingData(true)
      const packagesData = await PackageApi.getAllPackagesForSelect()
      setPackages(packagesData || [])
    } catch (error) {
      console.error('Error loading packages:', error)
      toast.error('Failed to load packages')
    } finally {
      setLoadingData(false)
    }
  }

  const onSubmit = async (data: UpdateConsultationRequest) => {
    if (!consultationRequest) return
    
    try {
      setUpdating(true)
      const response = await ConsultationRequestAPI.updateConsultationRequest(consultationRequest.id, data)
      if (response.success) {
        toast.success('Consultation request updated successfully')
        onSuccess()
        onClose()
        reset()
      } else {
        toast.error(response.message || 'Failed to update consultation request')
      }
    } catch (error: any) {
      console.error('Error updating consultation request:', error)
      toast.error(error?.message || 'Failed to update consultation request')
    } finally {
      setUpdating(false)
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Consultation Request</DialogTitle>
          <DialogDescription>
            Update the consultation request information
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field, fieldState }) => (
                <div>
                  <Input
                    {...field}
                    placeholder="Full Name"
                    className={fieldState.error ? 'border-red-500' : ''}
                  />
                  {fieldState.error && (
                    <span className="text-red-500 text-sm">{fieldState.error.message}</span>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <Controller
              name="email"
              control={control}
              rules={{ 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              }}
              render={({ field, fieldState }) => (
                <div>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Email"
                    className={fieldState.error ? 'border-red-500' : ''}
                  />
                  {fieldState.error && (
                    <span className="text-red-500 text-sm">{fieldState.error.message}</span>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <Controller
              name="phone"
              control={control}
              rules={{ required: 'Phone is required' }}
              render={({ field, fieldState }) => (
                <div>
                  <Input
                    {...field}
                    placeholder="Phone Number"
                    className={fieldState.error ? 'border-red-500' : ''}
                  />
                  {fieldState.error && (
                    <span className="text-red-500 text-sm">{fieldState.error.message}</span>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <Controller
              name="company_name"
              control={control}
              rules={{ required: 'Company name is required' }}
              render={({ field, fieldState }) => (
                <div>
                  <Input
                    {...field}
                    placeholder="Company Name"
                    className={fieldState.error ? 'border-red-500' : ''}
                  />
                  {fieldState.error && (
                    <span className="text-red-500 text-sm">{fieldState.error.message}</span>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <Controller
              name="package_id"
              control={control}
              rules={{ required: 'Package is required' }}
              render={({ field, fieldState }) => (
                <div>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={fieldState.error ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select Package" />
                    </SelectTrigger>
                    <SelectContent>
                      {packages.map((pkg) => (
                        <SelectItem key={pkg.id} value={pkg.id}>
                          {pkg.name} - ${pkg.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <span className="text-red-500 text-sm">{fieldState.error.message}</span>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <Controller
              name="status"
              control={control}
              rules={{ required: 'Status is required' }}
              render={({ field, fieldState }) => (
                <div>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={fieldState.error ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <span className="text-red-500 text-sm">{fieldState.error.message}</span>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <Controller
              name="note"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Note"
                  rows={3}
                />
              )}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={updating}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={updating || loadingData}>
              {updating ? 'Updating...' : 'Update Request'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}