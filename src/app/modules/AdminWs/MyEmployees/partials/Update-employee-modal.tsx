import type React from 'react'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { AdminWsApi } from '@/app/apis/AUTH/Admin-ws.api'
import type { Employee, UpdateEmployeePayload } from '@/app/modules/AdminWs/MyEmployees/models/AdminwsInterface'

interface UpdateEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  employee: Employee | null
  onUpdate?: () => void
}

interface UpdateFormData {
  name: string
  email: string
  avatar_url: string
  department_id: number
  role_id: number
}

export function UpdateEmployeeModal({ isOpen, onClose, employee, onUpdate }: UpdateEmployeeModalProps) {
  const [formData, setFormData] = useState<UpdateFormData>({
    name: '',
    email: '',
    avatar_url: '',
    department_id: 0,
    role_id: 0
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        avatar_url: employee.avatar_url || '',
        department_id: employee.department_id || 0,
        role_id: employee.role_id || 0
      })
    }
  }, [employee])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!employee) return

    setIsLoading(true)
    
    try {
      const updatePayload: UpdateEmployeePayload = {
        name: formData.name,
        email: formData.email,
        avatar_url: formData.avatar_url,
        department_id: formData.department_id,
        role_id: formData.role_id
      }

      await AdminWsApi.updateUser(employee.id, updatePayload)
      
      if (onUpdate) {
        onUpdate()
      }
      onClose()
    } catch (error) {
      console.error('Error updating employee:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof UpdateFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!employee) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[500px] p-0'>
        <DialogHeader className='px-6 py-4 border-b'>
          <div>
            <DialogTitle className='text-lg font-semibold'>Update Employee Information</DialogTitle>
            <p className='text-sm text-muted-foreground mt-1'>View and update employee account.</p>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='px-6 py-4 space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder='Vu Hanhname'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder='vuhanhname.work@example.com'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='avatar_url'>Avatar URL</Label>
            <Input
              id='avatar_url'
              value={formData.avatar_url}
              onChange={(e) => handleInputChange('avatar_url', e.target.value)}
              placeholder='https://example.com/avatar.jpg'
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label>Role ID</Label>
              <Select 
                value={formData.role_id.toString()} 
                onValueChange={(value) => handleInputChange('role_id', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select Role' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='1'>Super Admin</SelectItem>
                  <SelectItem value='2'>Admin</SelectItem>
                  <SelectItem value='3'>Project Manager</SelectItem>
                  <SelectItem value='4'>Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Department ID</Label>
              <Select 
                value={formData.department_id.toString()} 
                onValueChange={(value) => handleInputChange('department_id', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select Department' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='1'>IT Dept</SelectItem>
                  <SelectItem value='2'>Products</SelectItem>
                  <SelectItem value='3'>Marketing</SelectItem>
                  <SelectItem value='4'>Growth</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white mt-6' disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
