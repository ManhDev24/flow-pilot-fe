import type React from 'react'
import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { Textarea } from '@/app/components/ui/textarea'
import { AdminWsApi } from '@/app/apis/AUTH/Admin-ws.api'
import type { Department } from '../models/MydepartmentInterface'

interface UpdateDepartmentModalProps {
  isOpen: boolean
  onClose: () => void
  department: Department | null
  onUpdate?: () => void
}

interface UpdateFormData {
  name: string
  description: string
  status: 'active' | 'inactive'
}

export function UpdateDepartmentModal({ isOpen, onClose, department, onUpdate }: UpdateDepartmentModalProps) {
  const [formData, setFormData] = useState<UpdateFormData>({
    name: '',
    description: '',
    status: 'active'
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name || '',
        description: department.description || '',
        status: department.status || 'active'
      })
    }
  }, [department])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!department) return

    setIsLoading(true)
    
    try {
      await AdminWsApi.updateDepartment(formData.name, formData.description, formData.status, department.id)
      
      if (onUpdate) {
        onUpdate()
      }
      onClose()
    } catch (error) {
      console.error('Error updating department:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof UpdateFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!department) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[500px] p-0'>
        <DialogHeader className='px-6 py-4 border-b'>
          <div>
            <DialogTitle className='text-lg font-semibold'>Update Department Information</DialogTitle>
            <p className='text-sm text-muted-foreground mt-1'>Edit department details and status.</p>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='px-6 py-4 space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='update-name'>Department Name</Label>
            <Input
              id='update-name'
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder='Department name'
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='update-description'>Description</Label>
            <Textarea
              id='update-description'
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder='Department description'
              rows={4}
            />
          </div>

          <div className='space-y-2'>
            <Label>Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value: 'active' | 'inactive') => handleInputChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='active'>Active</SelectItem>
                <SelectItem value='inactive'>Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white mt-6' disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}