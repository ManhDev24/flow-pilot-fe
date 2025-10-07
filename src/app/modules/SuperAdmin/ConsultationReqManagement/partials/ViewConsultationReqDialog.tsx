import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Separator } from '@/app/components/ui/separator'
import { Calendar, Mail, Phone, Building, Package, FileText, ShoppingCart } from 'lucide-react'
import type { ConsultationRequest } from '../models/ConsultationReqManagementInterface'
import { STATUS_CONFIG } from '../models/ConsultationReqManagementInterface'

interface Props {
  open: boolean
  onClose: () => void
  consultationRequest: ConsultationRequest | null
  onPlaceOrder?: (consultationRequest: ConsultationRequest) => void
}

export default function ViewConsultationReqDialog({ open, onClose, consultationRequest, onPlaceOrder }: Props) {
  const handlePlaceOrder = () => {
    if (consultationRequest && onPlaceOrder) {
      onPlaceOrder(consultationRequest)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const statusConfig = consultationRequest?.status ? STATUS_CONFIG[consultationRequest.status] : STATUS_CONFIG.new

  return (
    consultationRequest && (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className='min-w-3xl max-h-[95vh] flex flex-col'>
          <DialogHeader className='flex-shrink-0'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center'>
                <FileText className='w-6 h-6 text-purple-600' />
              </div>
              <div>
                <DialogTitle className='text-2xl'>{consultationRequest.name}</DialogTitle>
                <div className='flex items-center gap-2 mt-1'>
                  <Badge variant={statusConfig.variant} className='text-xs'>
                    {statusConfig.label}
                  </Badge>
                </div>
              </div>
            </div>
          </DialogHeader>

          <Separator />

          <div className='flex-1 overflow-y-auto space-y-6 pr-2'>
            {/* Contact Information */}
            <div className='space-y-4'>
              <h4 className='font-medium text-gray-700'>Contact Information</h4>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex items-center gap-3'>
                  <Mail className='h-4 w-4 text-gray-500' />
                  <div>
                    <p className='text-sm text-gray-600'>Email</p>
                    <p className='font-medium'>{consultationRequest.email}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <Phone className='h-4 w-4 text-gray-500' />
                  <div>
                    <p className='text-sm text-gray-600'>Phone</p>
                    <p className='font-medium'>{consultationRequest.phone}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <Building className='h-4 w-4 text-gray-500' />
                  <div>
                    <p className='text-sm text-gray-600'>Company</p>
                    <p className='font-medium'>{consultationRequest.company_name}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Package Information */}
            <div className='space-y-4'>
              <h4 className='font-medium text-gray-700'>Package Information</h4>
              {consultationRequest.package ? (
                <div className='bg-blue-50 p-4 rounded-lg'>
                  <div className='flex items-start gap-3'>
                    <Package className='h-5 w-5 text-blue-600 mt-0.5' />
                    <div className='flex-1'>
                      <h5 className='font-semibold text-blue-900'>{consultationRequest.package.name}</h5>
                      <p className='text-blue-700 mb-2'>{consultationRequest.package.description}</p>
                      <div className='grid grid-cols-2 gap-4'>
                        <div>
                          <span className='text-blue-600'>Duration:</span>
                          <span className='ml-1 font-medium'>
                            {consultationRequest.package.duration_in_months} months
                          </span>
                        </div>
                        <div>
                          <span className='text-blue-600'>Price:</span>
                          <span className='ml-1 font-medium text-green-600'>
                            {consultationRequest.package.price.toLocaleString('vi-VN', {
                              style: 'currency',
                              currency: 'VND'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className='text-gray-500'>No package information available</p>
              )}
            </div>

            <Separator />

            {/* Note */}
            {consultationRequest.note && (
              <div className='space-y-4'>
                <h4 className='font-medium text-gray-700'>Note</h4>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <p className='text-gray-700 whitespace-pre-wrap'>{consultationRequest.note}</p>
                </div>
              </div>
            )}

            <Separator />

            {/* Timestamps */}
            <div className='space-y-4'>
              <h4 className='font-medium text-gray-700'>Timeline</h4>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4 text-gray-500' />
                  <div>
                    <p className='text-gray-600'>Created</p>
                    <p className='font-medium'>{formatDate(consultationRequest.created_at)}</p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4 text-gray-500' />
                  <div>
                    <p className='text-gray-600'>Last Updated</p>
                    <p className='font-medium'>{formatDate(consultationRequest.updated_at)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                Close
              </Button>
            </DialogClose>
            {consultationRequest && onPlaceOrder && (
              <Button type='button' onClick={handlePlaceOrder} className='bg-green-600 hover:bg-green-700'>
                <ShoppingCart className='h-4 w-4 mr-2' />
                Place Order
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  )
}
