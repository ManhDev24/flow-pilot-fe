import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import type { Workspace } from '../models/WorkspaceManagementInterface'

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  workspace: Workspace | null
  loading?: boolean
}

export default function DeleteWorkspaceDialog({ open, onClose, onConfirm, workspace, loading = false }: Props) {
  if (!workspace) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Delete Workspace</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this workspace? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='p-4 bg-gray-50 rounded-lg space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='font-medium'>Name:</span>
              <span>{workspace.name}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='font-medium'>Company:</span>
              <span>{workspace.company_name}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='font-medium'>Status:</span>
              <Badge
                variant={workspace.status === 'active' ? 'default' : 'destructive'}
                className={
                  workspace.status === 'active'
                    ? 'bg-green-100 text-green-800 border-transparent'
                    : 'bg-red-100 text-red-800 border-transparent'
                }
              >
                {workspace.status.toUpperCase()}
              </Badge>
            </div>
            {workspace.package && (
              <div className='flex items-center justify-between'>
                <span className='font-medium'>Package:</span>
                <span>{workspace.package.name}</span>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className='gap-2'>
          <DialogClose asChild>
            <Button type='button' variant='outline' disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button 
            type='button' 
            variant='destructive' 
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Workspace'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}