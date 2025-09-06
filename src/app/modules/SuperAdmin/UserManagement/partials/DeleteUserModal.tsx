import { Button } from '@/app/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/app/components/ui/dialog'
import { AlertTriangle } from 'lucide-react'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  workspace: string
}

interface DeleteUserModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
}

export function DeleteUserModal({ open, onOpenChange, user }: DeleteUserModalProps) {
  const handleDelete = () => {
    console.log('Deleting user:', user)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-red-100'>
              <AlertTriangle className='h-5 w-5 text-red-600' />
            </div>
            <div>
              <DialogTitle>Delete User</DialogTitle>
              <DialogDescription>This action cannot be undone.</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className='py-4'>
          <p className='text-sm text-gray-600'>
            Are you sure you want to delete <span className='font-medium text-gray-900'>{user?.name}</span>? This will
            permanently remove their account and all associated data from the system.
          </p>
          <div className='mt-4 p-3 bg-gray-50 rounded-md'>
            <div className='text-sm'>
              <p>
                <span className='font-medium'>Email:</span> {user?.email}
              </p>
              <p>
                <span className='font-medium'>Role:</span> {user?.role}
              </p>
              <p>
                <span className='font-medium'>Workspace:</span> {user?.workspace}
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type='button' variant='destructive' onClick={handleDelete} className='bg-red-600 hover:bg-red-700'>
            Delete User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
