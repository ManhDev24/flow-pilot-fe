import { Button } from '@/app/components/ui/button'
import { Checkbox } from '@/app/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/app/components/ui/dialog'

interface FilterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  allTags: string[]
  selectedTags: string[]
  onSelectedTagsChange: (tags: string[]) => void
}

export function FilterDialog({ open, onOpenChange, allTags, selectedTags, onSelectedTagsChange }: FilterDialogProps) {
  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onSelectedTagsChange(selectedTags.filter((t) => t !== tag))
    } else {
      onSelectedTagsChange([...selectedTags, tag])
    }
  }

  const handleClearAll = () => {
    onSelectedTagsChange([])
  }

  const handleSelectAll = () => {
    onSelectedTagsChange(allTags)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Filter Tasks</DialogTitle>
          <DialogDescription>
            Filter tasks by tags. Select one or more tags to show only matching tasks.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4 py-4'>
          <div className='flex gap-2'>
            <Button variant='outline' size='sm' onClick={handleSelectAll}>
              Select All
            </Button>
            <Button variant='outline' size='sm' onClick={handleClearAll}>
              Clear All
            </Button>
          </div>
          <div className='space-y-3'>
            {allTags.map((tag) => (
              <div key={tag} className='flex items-center space-x-2'>
                <Checkbox id={tag} checked={selectedTags.includes(tag)} onCheckedChange={() => handleToggleTag(tag)} />
                <label
                  htmlFor={tag}
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {tag}
                </label>
              </div>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <div className='rounded-lg bg-muted p-3 text-sm'>
              <span className='font-medium'>Active filters:</span> {selectedTags.join(', ')}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
