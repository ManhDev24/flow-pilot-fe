
import type React from 'react'

import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/app/components/ui/dialog'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { Textarea } from '@/app/components/ui/textarea'

interface AddUserModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddUserModal({ open, onOpenChange }: AddUserModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    workspace: '',
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    onOpenChange(false)
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      workspace: '',
      notes: ''
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold text-gray-900'>Add New User</DialogTitle>
          <DialogDescription className='text-gray-600'>
            Create a new user account and assign their role and workspace access.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='firstName' className='text-sm font-medium text-gray-700'>
                First Name *
              </Label>
              <Input
                id='firstName'
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder='Enter first name'
                required
                className='border-gray-300'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='lastName' className='text-sm font-medium text-gray-700'>
                Last Name *
              </Label>
              <Input
                id='lastName'
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder='Enter last name'
                required
                className='border-gray-300'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email' className='text-sm font-medium text-gray-700'>
              Email Address *
            </Label>
            <Input
              id='email'
              type='email'
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder='Enter email address'
              required
              className='border-gray-300'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='role' className='text-sm font-medium text-gray-700'>
              Role *
            </Label>
            <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
              <SelectTrigger className='border-gray-300'>
                <SelectValue placeholder='Select a role' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='super-admin'>Super Admin</SelectItem>
                <SelectItem value='admin-workspace'>Admin Workspace</SelectItem>
                <SelectItem value='team-leader'>Team Leader</SelectItem>
                <SelectItem value='employee'>Employee</SelectItem>
                <SelectItem value='member'>Member</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='workspace' className='text-sm font-medium text-gray-700'>
              Workspace
            </Label>
            <Select value={formData.workspace} onValueChange={(value) => handleInputChange('workspace', value)}>
              <SelectTrigger className='border-gray-300'>
                <SelectValue placeholder='Select workspace' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='global-admin'>Global Admin</SelectItem>
                <SelectItem value='alpha-corp'>Alpha Corp</SelectItem>
                <SelectItem value='beta-solutions'>Beta Solutions</SelectItem>
                <SelectItem value='gamma-inc'>Gamma Inc</SelectItem>
                <SelectItem value='delta-systems'>Delta Systems</SelectItem>
                <SelectItem value='epsilon-innovations'>Epsilon Innovations</SelectItem>
                <SelectItem value='zeta-group'>Zeta Group</SelectItem>
                <SelectItem value='eta-solutions'>Eta Solutions</SelectItem>
                <SelectItem value='theta-systems'>Theta Systems</SelectItem>
                <SelectItem value='iota-corp'>Iota Corp</SelectItem>
                <SelectItem value='kappa-group'>Kappa Group</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='notes' className='text-sm font-medium text-gray-700'>
              Notes (Optional)
            </Label>
            <Textarea
              id='notes'
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder='Add any additional notes about this user...'
              className='border-gray-300 min-h-[80px]'
            />
          </div>

          <DialogFooter className='flex space-x-2 pt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
              className='border-gray-300 text-gray-700 hover:bg-gray-50'
            >
              Cancel
            </Button>
            <Button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white'>
              Add User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
