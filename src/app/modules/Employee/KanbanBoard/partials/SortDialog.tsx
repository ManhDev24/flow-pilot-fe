'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/app/components/ui/dialog'
import { Label } from '@/app/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group'

interface SortDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sortBy: 'title' | 'subtasks' | 'comments'
  sortOrder: 'asc' | 'desc'
  onSortByChange: (sortBy: 'title' | 'subtasks' | 'comments') => void
  onSortOrderChange: (sortOrder: 'asc' | 'desc') => void
}

export function SortDialog({
  open,
  onOpenChange,
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange
}: SortDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Sort Tasks</DialogTitle>
          <DialogDescription>Choose how to sort tasks within each column.</DialogDescription>
        </DialogHeader>
        <div className='space-y-6 py-4'>
          <div className='space-y-3'>
            <Label className='text-base font-semibold'>Sort By</Label>
            <RadioGroup value={sortBy} onValueChange={(value) => onSortByChange(value as any)}>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='title' id='title' />
                <Label htmlFor='title' className='font-normal'>
                  Title (A-Z)
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='subtasks' id='subtasks' />
                <Label htmlFor='subtasks' className='font-normal'>
                  Number of Subtasks
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='comments' id='comments' />
                <Label htmlFor='comments' className='font-normal'>
                  Number of Comments
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className='space-y-3'>
            <Label className='text-base font-semibold'>Order</Label>
            <RadioGroup value={sortOrder} onValueChange={(value) => onSortOrderChange(value as any)}>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='asc' id='asc' />
                <Label htmlFor='asc' className='font-normal'>
                  Ascending
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='desc' id='desc' />
                <Label htmlFor='desc' className='font-normal'>
                  Descending
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
