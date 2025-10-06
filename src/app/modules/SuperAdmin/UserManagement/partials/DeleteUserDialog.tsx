// React is not referenced directly (JSX runtime handles it)
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import type { User } from '../models/UserManagementInterface'

type Props = {
  open: boolean
  user: User | null
  loading?: boolean
  onClose: () => void
  onConfirm: () => Promise<void> | void
}

export default function DeleteUserDialog({ open, user, loading, onClose, onConfirm }: Props) {
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deactivate User</DialogTitle>
          <DialogDescription>
            {user ? (
              <>
                Are you sure you want to deactivate <strong>{user.name}</strong>? This action cannot be undone.
              </>
            ) : (
              'This action cannot be undone. All data will be permanently removed.'
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className="flex gap-2">
            <Button variant="destructive" onClick={onConfirm} disabled={Boolean(loading)}>
              {loading ? 'Deactivating...' : 'Deactivate User'}
            </Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </DialogFooter>

        <DialogClose className="sr-only">Close</DialogClose>
      </DialogContent>
    </Dialog>
  )
}
