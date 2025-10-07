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
import type { ConsultationRequest } from '../models/ConsultationReqManagementInterface'

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  consultationRequest: ConsultationRequest | null
  loading?: boolean
}

export default function DeleteConsultationReqDialog({
  open,
  onClose,
  onConfirm,
  consultationRequest,
  loading = false
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Delete Consultation Request</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this consultation request from{' '}
            <span className='font-semibold'>{consultationRequest?.name}</span>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className='bg-gray-50 p-4 rounded-lg space-y-2'>
          <p className='text-sm'>
            <span className='font-medium'>Name:</span> {consultationRequest?.name}
          </p>
          <p className='text-sm'>
            <span className='font-medium'>Email:</span> {consultationRequest?.email}
          </p>
          <p className='text-sm'>
            <span className='font-medium'>Company:</span> {consultationRequest?.company_name}
          </p>
          <p className='text-sm'>
            <span className='font-medium'>Package:</span> {consultationRequest?.package?.name || 'N/A'}
          </p>
        </div>

        <DialogFooter>
          <Button type='button' variant='destructive' onClick={onConfirm} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Request'}
          </Button>
          <DialogClose asChild>
            <Button type='button' variant='outline' disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
