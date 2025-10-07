import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog'
import { Clock, DollarSign, List, Package } from 'lucide-react'
import type { PackageData } from '../models/package.type'

type Props = {
  open: boolean
  package: PackageData | null
  onClose: () => void
}

export default function ViewPackageDialog({ open, package: pkg, onClose }: Props) {
  if (!pkg) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const formatDuration = (months: number) => {
    if (months === 1) return '1 month'
    if (months < 12) return `${months} months`
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    if (remainingMonths === 0) {
      return years === 1 ? '1 year' : `${years} years`
    }
    return `${years}y ${remainingMonths}m`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose()
      }}
    >
      <DialogContent className='min-w-3xl max-h-[90vh] flex flex-col'>
        {/* Header cố định */}
        <DialogHeader className='flex-shrink-0'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center'>
              <Package className='w-6 h-6 text-purple-600' />
            </div>
            <div>
              <DialogTitle className='text-2xl'>{pkg.name}</DialogTitle>
              <div className='flex items-center gap-2 mt-1'>
                <Badge
                  variant={pkg.status === 'active' ? 'default' : 'destructive'}
                  className={
                    pkg.status === 'active'
                      ? 'bg-green-100 text-green-800 border-transparent'
                      : 'bg-red-100 text-red-800 border-transparent'
                  }
                >
                  {pkg.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Content có scroll riêng */}
        <div className='flex-1 overflow-y-auto space-y-6 pr-2'>
          {/* Package Overview */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Package Overview</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <h4 className='font-medium text-sm text-gray-600 mb-1'>Description</h4>
                <p className='text-gray-900'>{pkg.description}</p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                  <DollarSign className='w-5 h-5 text-green-600' />
                  <div>
                    <p className='text-sm font-medium text-gray-600'>Price</p>
                    <p className='text-lg font-semibold text-green-600'>{formatPrice(pkg.price)}</p>
                  </div>
                </div>

                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                  <Clock className='w-5 h-5 text-blue-600' />
                  <div>
                    <p className='text-sm font-medium text-gray-600'>Duration</p>
                    <p className='text-lg font-semibold text-blue-600'>{formatDuration(pkg.duration_in_months)}</p>
                  </div>
                </div>

                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                  <List className='w-5 h-5 text-purple-600' />
                  <div>
                    <p className='text-sm font-medium text-gray-600'>Features</p>
                    <p className='text-lg font-semibold text-purple-600'>{pkg.features?.length || 0}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features List */}
          {pkg.features && pkg.features.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Package Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {pkg.features.map((feature, index) => (
                    <div key={feature.id || index} className='flex items-start gap-3 p-3 border rounded-lg'>
                      <div className='w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0'></div>
                      <div className='flex-1'>
                        <h4 className='font-medium text-gray-900'>{feature.name}</h4>
                        {feature.description && <p className='text-sm text-gray-600 mt-1'>{feature.description}</p>}
                        <div className='flex items-center gap-4 mt-2'>
                          <Badge
                            variant={feature.status === 'active' ? 'default' : 'destructive'}
                            className={
                              feature.status === 'active'
                                ? 'bg-green-100 text-green-800 border-transparent text-xs'
                                : 'bg-red-100 text-red-800 border-transparent text-xs'
                            }
                          >
                            {feature.status}
                          </Badge>
                          {feature.created_at && (
                            <span className='text-xs text-gray-500'>Created: {formatDate(feature.created_at)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className='flex justify-end pt-4 border-t'>
          <Button variant='outline' onClick={onClose}>
            Close
          </Button>
        </div>

        <DialogClose className='sr-only'>Close</DialogClose>
      </DialogContent>
    </Dialog>
  )
}
