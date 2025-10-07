import { Button } from '@/app/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/app/components/ui/dialog'
import { Badge } from '@/app/components/ui/badge'
import { paymentApi } from '@/app/apis/AUTH/Payment.api'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import type { Payment } from '../models/PaymentInterface'

interface PaymentDetailModalProps {
  isOpen: boolean
  onClose: () => void
  paymentId: number | null
}

export function PaymentDetailModal({ isOpen, onClose, paymentId }: PaymentDetailModalProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['payment-detail', paymentId],
    queryFn: () => paymentApi.getPaymentById(paymentId!),
    enabled: !!paymentId && isOpen
  })

  const payment: Payment | undefined = data?.data

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='max-w-2xl'>
          <div className='flex justify-center items-center py-8'>
            <div className='text-gray-500'>Loading payment details...</div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (isError || !payment) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='max-w-2xl'>
          <div className='flex justify-center items-center py-8'>
            <div className='text-red-500'>Failed to load payment details</div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            Payment Details
            <Badge className={getStatusColor(payment.status)}>{payment.status.toUpperCase()}</Badge>
          </DialogTitle>
          <DialogDescription>View detailed information about this payment</DialogDescription>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='text-sm font-medium text-gray-600'>Payment ID</label>
              <p className='text-sm font-mono bg-gray-100 p-2 rounded mt-1'>{payment.id}</p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-600'>Order ID</label>
              <p className='text-sm font-mono bg-gray-100 p-2 rounded mt-1'>{payment.order_id}</p>
            </div>
          </div>

          <div>
            <label className='text-sm font-medium text-gray-600'>Amount</label>
            <p className='text-lg font-bold text-green-600 bg-gray-100 p-2 rounded mt-1'>
              {formatCurrency(payment.amount)}
            </p>
          </div>

          <div>
            <label className='text-sm font-medium text-gray-600'>Payment Date</label>
            <p className='text-sm bg-gray-100 p-2 rounded mt-1'>
              {format(new Date(payment.payment_date), 'dd/MM/yyyy HH:mm:ss')}
            </p>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='text-sm font-medium text-gray-600'>Created At</label>
              <p className='text-sm bg-gray-100 p-2 rounded mt-1'>
                {format(new Date(payment.created_at), 'dd/MM/yyyy HH:mm:ss')}
              </p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-600'>Updated At</label>
              <p className='text-sm bg-gray-100 p-2 rounded mt-1'>
                {format(new Date(payment.updated_at), 'dd/MM/yyyy HH:mm:ss')}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
