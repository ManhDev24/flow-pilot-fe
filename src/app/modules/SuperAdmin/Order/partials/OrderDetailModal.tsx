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
import { orderApi } from '@/app/apis/AUTH/Order.api'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import type { Order } from '../models/OrderInterface'

interface OrderDetailModalProps {
  isOpen: boolean
  onClose: () => void
  orderId: string | null
}

export function OrderDetailModal({ isOpen, onClose, orderId }: OrderDetailModalProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['order-detail', orderId],
    queryFn: () => orderApi.getOrderById(orderId!),
    enabled: !!orderId && isOpen
  })

  const order: Order | undefined = data?.data

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
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
            <div className='text-gray-500'>Loading order details...</div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (isError || !order) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='max-w-2xl'>
          <div className='flex justify-center items-center py-8'>
            <div className='text-red-500'>Failed to load order details</div>
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
            Order Details
            <Badge className={getStatusColor(order.status)}>{order.status.toUpperCase()}</Badge>
          </DialogTitle>
          <DialogDescription>View detailed information about this order</DialogDescription>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='text-sm font-medium text-gray-600'>Order ID</label>
              <p className='text-sm font-mono bg-gray-100 p-2 rounded mt-1'>{order.id}</p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-600'>Package ID</label>
              <p className='text-sm font-mono bg-gray-100 p-2 rounded mt-1'>{order.package_id}</p>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='text-sm font-medium text-gray-600'>Email</label>
              <p className='text-sm bg-gray-100 p-2 rounded mt-1'>{order.email}</p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-600'>Workspace ID</label>
              <p className='text-sm bg-gray-100 p-2 rounded mt-1'>{order.workspace_id || 'Not assigned'}</p>
            </div>
          </div>

          <div>
            <label className='text-sm font-medium text-gray-600'>Total Amount</label>
            <p className='text-lg font-bold text-green-600 bg-gray-100 p-2 rounded mt-1'>
              {formatCurrency(order.total_amount)}
            </p>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='text-sm font-medium text-gray-600'>Created At</label>
              <p className='text-sm bg-gray-100 p-2 rounded mt-1'>
                {format(new Date(order.created_at), 'dd/MM/yyyy HH:mm:ss')}
              </p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-600'>Updated At</label>
              <p className='text-sm bg-gray-100 p-2 rounded mt-1'>
                {format(new Date(order.updated_at), 'dd/MM/yyyy HH:mm:ss')}
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
