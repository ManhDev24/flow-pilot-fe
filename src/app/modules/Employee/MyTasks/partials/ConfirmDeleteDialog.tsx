import { AlertTriangle, Loader2 } from 'lucide-react'
import { Dialog, DialogContent } from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'

interface ConfirmDeleteDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  itemName?: string
  isLoading?: boolean
}

export function ConfirmDeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  itemName,
  isLoading = false
}: ConfirmDeleteDialogProps) {
  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[400px] p-0'>
        <div className='px-6 py-8 text-center'>
          <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4'>
            <AlertTriangle className='h-6 w-6 text-red-600' />
          </div>

          <h3 className='text-lg font-semibold text-gray-900 mb-2'>{title}</h3>

          <p className='text-sm text-gray-500 mb-6'>
            {description}
            {itemName && (
              <>
                {' '}
                <span className='font-medium'>"{itemName}"</span>
              </>
            )}
            ? This action cannot be undone.
          </p>

          <div className='flex gap-3 justify-center'>
            <Button variant='outline' onClick={onClose} disabled={isLoading} className='px-6 bg-transparent'>
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isLoading}
              className='px-6 bg-red-600 hover:bg-red-700 text-white'
            >
              {isLoading ? (
                <>
                  <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
