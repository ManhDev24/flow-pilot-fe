import type React from 'react'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { X } from 'lucide-react'

interface InviteEmployeeData {
  name: string
  email: string
  role: string
  jobTitle: string
  department: string
  project: string
}

interface InviteEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  onInvite: (employee: InviteEmployeeData) => void
}

export function InviteEmployeeModal({ isOpen, onClose, onInvite }: InviteEmployeeModalProps) {
  const [formData, setFormData] = useState<InviteEmployeeData>({
    name: '',
    email: '',
    role: '',
    jobTitle: '',
    department: '',
    project: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onInvite(formData)
    setIsLoading(false)
    onClose()

    // Reset form
    setFormData({
      name: '',
      email: '',
      role: '',
      jobTitle: '',
      department: '',
      project: ''
    })
  }

  const handleInputChange = (field: keyof InviteEmployeeData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[500px] p-0'>
        <DialogHeader className='px-6 py-4 border-b'>
          <div className='flex items-center justify-between'>
            <div>
              <DialogTitle className='text-lg font-semibold'>Invite New Employee</DialogTitle>
              <p className='text-sm text-muted-foreground mt-1'>Create a new employee account.</p>
            </div>
            <Button variant='ghost' size='icon' onClick={onClose}>
              <X className='h-4 w-4' />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='px-6 py-4 space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='invite-name'>Name</Label>
            <Input
              id='invite-name'
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder='Vu Hanhname'
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='invite-email'>Email</Label>
            <Input
              id='invite-email'
              type='email'
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder='vuhanhname.work@example.com'
              required
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label>Role</Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)} required>
                <SelectTrigger>
                  <SelectValue placeholder='Project Manager' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Project Manager'>Project Manager</SelectItem>
                  <SelectItem value='Employee'>Employee</SelectItem>
                  <SelectItem value='Admin'>Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Job Title</Label>
              <Select
                value={formData.jobTitle}
                onValueChange={(value) => handleInputChange('jobTitle', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder='Tech Leader' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Tech Leader'>Tech Leader</SelectItem>
                  <SelectItem value='UX Leader'>UX Leader</SelectItem>
                  <SelectItem value='Senior UI/UX Designer'>Senior UI/UX Designer</SelectItem>
                  <SelectItem value='UI/UX Designer'>UI/UX Designer</SelectItem>
                  <SelectItem value='UX Designer'>UX Designer</SelectItem>
                  <SelectItem value='Graphic Designer'>Graphic Designer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='space-y-2'>
            <Label>Department</Label>
            <Select
              value={formData.department}
              onValueChange={(value) => handleInputChange('department', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder='Select department' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='IT Dept'>IT Dept</SelectItem>
                <SelectItem value='Products'>Products</SelectItem>
                <SelectItem value='Marketing'>Marketing</SelectItem>
                <SelectItem value='Growth'>Growth</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label>Assigned Project</Label>
            <Select value={formData.project} onValueChange={(value) => handleInputChange('project', value)}>
              <SelectTrigger>
                <SelectValue placeholder='e.g. Alpha Project' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Alpha Project'>Alpha Project</SelectItem>
                <SelectItem value='Beta system'>Beta system</SelectItem>
                <SelectItem value='Delta system'>Delta system</SelectItem>
                <SelectItem value='Not assigned'>Not assigned</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white mt-6' disabled={isLoading}>
            {isLoading ? 'INVITING...' : 'INVITE USER'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
