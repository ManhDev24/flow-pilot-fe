import { AlertTriangle, Loader2 } from 'lucide-react'
import { Dialog, DialogContent } from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'

interface ConfirmDeleteFileDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  fileName: string
  isLoading?: boolean
}

export function ConfirmDeleteFileDialog({
  isOpen,
  onClose,
  onConfirm,
  fileName,
  isLoading = false
}: ConfirmDeleteFileDialogProps) {
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

          <h3 className='text-lg font-semibold text-gray-900 mb-2'>Confirm Delete File</h3>

          <p className='text-sm text-gray-500 mb-6'>
            Are you sure you want to permanently delete <span className='font-medium'>"{fileName}"</span>? This action
            cannot be undone.
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
                'Delete File'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
