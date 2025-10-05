import type React from 'react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Textarea } from '@/app/components/ui/textarea'
import { X } from 'lucide-react'

interface CreateDepartmentData {
  name: string
  description: string
}

interface CreateDepartmentModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (name: string, description: string) => void
}

export function CreateDepartmentModal({ isOpen, onClose, onCreate }: CreateDepartmentModalProps) {
  const [formData, setFormData] = useState<CreateDepartmentData>({
    name: '',
    description: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onCreate(formData.name, formData.description)
    setIsLoading(false)
    onClose()

    // Reset form
    setFormData({
      name: '',
      description: ''
    })
  }

  const handleInputChange = (field: keyof CreateDepartmentData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[500px] p-0'>
        <DialogHeader className='px-6 py-4 border-b'>
          <div className='flex items-center justify-between'>
            <div>
              <DialogTitle className='text-lg font-semibold'>Create New Department</DialogTitle>
              <p className='text-sm text-muted-foreground mt-1'>Add a new department to your workspace.</p>
            </div>
            <Button variant='ghost' size='icon' onClick={onClose}>
              <X className='h-4 w-4' />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='px-6 py-4 space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='dept-name'>Department Name</Label>
            <Input
              id='dept-name'
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder='e.g. Human Resources, Engineering, Marketing'
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='dept-description'>Description</Label>
            <Textarea
              id='dept-description'
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder='Brief description of the department...'
              rows={4}
            />
          </div>

          <Button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white mt-6' disabled={isLoading}>
            {isLoading ? 'CREATING...' : 'CREATE DEPARTMENT'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}