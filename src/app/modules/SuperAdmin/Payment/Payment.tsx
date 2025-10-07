import { useState } from 'react'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table'
import { paymentApi } from '@/app/apis/AUTH/Payment.api'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { ChevronLeft, ChevronRight, Eye, Search, X } from 'lucide-react'
import { format } from 'date-fns'
import type { PaymentListResponse, Payment as PaymentType } from './models/PaymentInterface'
import { PaymentDetailModal } from './partials/PaymentDetailModal'

function Payment() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const { data, isLoading, isError, error } = useQuery<PaymentListResponse, AxiosError>({
    queryKey: ['payments', currentPage, pageSize],
    queryFn: () => paymentApi.getAllPayments(currentPage, pageSize)
  })

  // Filter payments based on search query and filters
  const filteredPayments = (data?.data.data || []).filter((payment: PaymentType) => {
    const matchesSearch =
      payment.id.toString().includes(searchQuery) || payment.order_id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  // Get unique values for filter options
  const statuses = Array.from(new Set((data?.data.data || []).map((payment) => payment.status)))

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedStatus('all')
  }

  const hasActiveFilters = searchQuery || selectedStatus !== 'all'

  const handleViewDetails = (paymentId: number) => {
    setSelectedPaymentId(paymentId)
    setIsDetailModalOpen(true)
  }

  const closeDetailModal = () => {
    setIsDetailModalOpen(false)
    setSelectedPaymentId(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
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

  const totalPages = Math.ceil((data?.data.total || 0) / pageSize)

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-gray-500'>Loading payments...</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-red-500'>Error loading payments: {error?.message}</div>
      </div>
    )
  }

  return (
    <div className='flex flex-col min-h-screen gap-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-4xl font-semibold'>Payment Management</h1>
          <p className='text-muted-foreground'>Manage and view all payments in the system</p>
        </div>
      </div>

      {/* Filters */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center'>
        <div className='flex flex-1 items-center space-x-2'>
          <div className='relative'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Search by payment ID or order ID...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='pl-8 w-80'
            />
          </div>
        </div>

        <div className='flex items-center space-x-2'>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className='w-[150px]'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Status</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant='ghost' onClick={clearAllFilters} className='h-8 px-2 lg:px-3'>
              Reset
              <X className='ml-2 h-4 w-4' />
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment ID</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className='h-24 text-center'>
                  No payments found.
                </TableCell>
              </TableRow>
            ) : (
              filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className='font-mono font-medium'>#{payment.id}</TableCell>
                  <TableCell className='font-mono text-sm'>{payment.order_id.substring(0, 8)}...</TableCell>
                  <TableCell className='font-medium text-green-600'>{formatCurrency(payment.amount)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payment.status)}>{payment.status.toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell>{format(new Date(payment.payment_date), 'dd/MM/yyyy HH:mm')}</TableCell>
                  <TableCell>{format(new Date(payment.created_at), 'dd/MM/yyyy HH:mm')}</TableCell>
                  <TableCell className='text-right'>
                    <div className='flex items-center justify-end gap-2'>
                      <Button variant='ghost' size='icon' onClick={() => handleViewDetails(payment.id)}>
                        <Eye className='h-4 w-4' />
                        <span className='sr-only'>View details</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-6 lg:space-x-8'>
            <div className='flex items-center space-x-2'>
              <p className='text-sm font-medium'>
                Page {currentPage} of {totalPages}
              </p>
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='icon'
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className='h-4 w-4' />
              <span className='sr-only'>Previous page</span>
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className='h-4 w-4' />
              <span className='sr-only'>Next page</span>
            </Button>
          </div>
        </div>
      )}

      {/* Payment Detail Modal */}
      <PaymentDetailModal isOpen={isDetailModalOpen} onClose={closeDetailModal} paymentId={selectedPaymentId} />
    </div>
  )
}

export default Payment
