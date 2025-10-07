import { useState } from 'react'
import { Dialog, DialogContent } from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { AlertTriangle } from 'lucide-react'

interface DeleteProjectModalProps {
  isOpen: boolean
  onClose: () => void
  projectName: string
  onConfirm: () => void
}

export function DeleteProjectModal({ isOpen, onClose, projectName, onConfirm }: DeleteProjectModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onConfirm()
    setIsLoading(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[400px] p-0'>
        <div className='px-6 py-8 text-center'>
          <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4'>
            <AlertTriangle className='h-6 w-6 text-red-600' />
          </div>

          <h3 className='text-lg font-semibold text-gray-900 mb-2'>Confirm Delete Project</h3>

          <p className='text-sm text-gray-500 mb-6'>
            Are you sure you want to permanently delete <span className='font-medium'>{projectName}</span>? All project
            data will be permanently removed and cannot be recovered.
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
              {isLoading ? 'Deleting...' : 'Delete Project'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
