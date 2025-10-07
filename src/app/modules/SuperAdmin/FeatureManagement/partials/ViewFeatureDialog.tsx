import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Calendar, FileText, Settings } from 'lucide-react'
import type { FeatureData } from '../models/feature.type'

interface Props {
  open: boolean
  feature: FeatureData | null
  onClose: () => void
}

export default function ViewFeatureDialog({ open, feature, onClose }: Props) {
  if (!feature) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
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
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
              <Settings className='w-6 h-6 text-blue-600' />
            </div>
            <div>
              <DialogTitle className='text-xl'>{feature.name}</DialogTitle>
              <div className='flex items-center gap-2 mt-1'>
                <Badge
                  variant={feature.status === 'active' ? 'default' : 'destructive'}
                  className={
                    feature.status === 'active'
                      ? 'bg-green-100 text-green-800 border-transparent'
                      : 'bg-red-100 text-red-800 border-transparent'
                  }
                >
                  {feature.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Description */}
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <FileText className='w-4 h-4 text-gray-600' />
              <h3 className='text-sm font-medium text-gray-900'>Description</h3>
            </div>
            <p className='text-sm text-gray-600 pl-6'>{feature.description || 'No description provided'}</p>
          </div>

          {/* Timestamps */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <Calendar className='w-4 h-4 text-gray-600' />
                <h3 className='text-sm font-medium text-gray-900'>Created</h3>
              </div>
              <p className='text-sm text-gray-600 pl-6'>{formatDate(feature.created_at)}</p>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <Calendar className='w-4 h-4 text-gray-600' />
                <h3 className='text-sm font-medium text-gray-900'>Last Updated</h3>
              </div>
              <p className='text-sm text-gray-600 pl-6'>{formatDate(feature.updated_at)}</p>
            </div>
          </div>

          {/* Feature ID */}
          <div className='space-y-2'>
            <h3 className='text-sm font-medium text-gray-900'>Feature ID</h3>
            <p className='text-sm text-gray-600 font-mono bg-gray-50 px-3 py-2 rounded border'>{feature.id}</p>
          </div>
        </div>

        <div className='flex justify-end pt-4'>
          <Button variant='outline' onClick={onClose}>
            Close
          </Button>
        </div>

        <DialogClose className='sr-only'>Close</DialogClose>
      </DialogContent>
    </Dialog>
  )
}
