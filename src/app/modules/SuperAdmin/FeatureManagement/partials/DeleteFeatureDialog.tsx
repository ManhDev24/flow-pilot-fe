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
import type { FeatureData } from '../models/feature.type'

type Props = {
  open: boolean
  feature: FeatureData | null
  loading?: boolean
  onClose: () => void
  onConfirm: () => Promise<void> | void
}

export default function DeleteFeatureDialog({ open, feature, loading, onClose, onConfirm }: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete Feature</DialogTitle>
          <DialogDescription>
            {feature ? (
              <>
                Are you sure you want to delete <strong>{feature.name}</strong>? This action cannot be undone and will
                remove all associated data.
              </>
            ) : (
              'This action cannot be undone. All data will be permanently removed.'
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className='flex gap-2'>
            <Button variant='destructive' onClick={onConfirm} disabled={Boolean(loading)}>
              {loading ? 'Deleting...' : 'Delete Feature'}
            </Button>
            <Button variant='outline' onClick={onClose}>
              Cancel
            </Button>
          </div>
        </DialogFooter>

        <DialogClose className='sr-only'>Close</DialogClose>
      </DialogContent>
    </Dialog>
  )
}
