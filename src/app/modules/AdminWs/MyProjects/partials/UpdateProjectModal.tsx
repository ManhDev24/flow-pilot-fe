import type React from 'react'
import type { UpdateProjectPayload } from '../models/ProjectInterface'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { Textarea } from '@/app/components/ui/textarea'
import { getAllUserByAdmin } from '@/app/apis/AUTH/user.api'
import { projectApi } from '@/app/apis/AUTH/project.api'
import { toast } from 'react-toastify'
import type { AxiosError } from 'axios'
import type { ProjectData } from '../models/ProjectInterface'

interface UpdateProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: ProjectData | null
  onUpdate?: () => void
}

interface UpdateFormData {
  name: string
  description: string
  start_date: string
  end_date: string
  team_size: number
  manager_id: string
  status: string
}

export function UpdateProjectModal({ isOpen, onClose, project, onUpdate }: UpdateProjectModalProps) {
  const [formData, setFormData] = useState<UpdateFormData>({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    team_size: 1,
    manager_id: '',
    status: 'not_started'
  })
  const [isLoading, setIsLoading] = useState(false)

  // Fetch managers (users with role Project Manager or Admin)
  const { data: usersData } = useQuery<any, AxiosError>({
    queryKey: ['admin-ws-users'],
    queryFn: () => getAllUserByAdmin(1, 10)
  })

  // Filter users to get only managers (role_id 2 = Admin, 3 = Project Manager)
  const managers = (usersData?.data?.items || []).filter((user: any) => user.role_id === 2 || user.role_id === 3)

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        description: project.description || '',
        start_date: project.start_date ? project.start_date.split('T')[0] : '',
        end_date: project.end_date ? project.end_date.split('T')[0] : '',
        team_size: project.team_size || 1,
        manager_id: project.manager_id || '',
        status: project.status || 'not_started'
      })
    }
  }, [project])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!project) return

    setIsLoading(true)

    try {
      const updatePayload: UpdateProjectPayload = {
        name: formData.name,
        description: formData.description,
        start_date: formData.start_date,
        end_date: formData.end_date,
        team_size: formData.team_size,
        manager_id: formData.manager_id,
        status: formData.status
      }

      await projectApi.updateProject(project.id, updatePayload)

      if (onUpdate) {
        onUpdate()
      }
      onClose()
    } catch (error) {
      console.error('Error updating project:', error)
      toast.error('Failed to update project.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof UpdateFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px] p-0 max-h-[90vh] overflow-y-auto'>
        <DialogHeader className='px-6 py-4 border-b'>
          <div>
            <DialogTitle className='text-lg font-semibold'>Update Project Information</DialogTitle>
            <p className='text-sm text-muted-foreground mt-1'>View and update project details.</p>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='px-6 py-4 space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Project Name *</Label>
            <Input
              id='name'
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder='Enter project name'
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder='Enter project description'
              rows={3}
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='start-date'>Start Date *</Label>
              <Input
                id='start-date'
                type='date'
                value={formData.start_date}
                onChange={(e) => handleInputChange('start_date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='end-date'>End Date *</Label>
              <Input
                id='end-date'
                type='date'
                value={formData.end_date}
                onChange={(e) => handleInputChange('end_date', e.target.value)}
                min={formData.start_date || new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='team-size'>Team Size *</Label>
              <Input
                id='team-size'
                type='number'
                min='1'
                value={formData.team_size}
                onChange={(e) => handleInputChange('team_size', parseInt(e.target.value) || 1)}
                required
              />
            </div>

            <div className='space-y-2'>
              <Label>Project Manager *</Label>
              <Select value={formData.manager_id} onValueChange={(value) => handleInputChange('manager_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder='Select project manager' />
                </SelectTrigger>
                <SelectContent>
                  {managers.map((manager: any) => (
                    <SelectItem key={manager.id} value={manager.id}>
                      {manager.name} ({manager.role?.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='space-y-2'>
            <Label>Status *</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder='Select status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='not_started'>Not Started</SelectItem>
                <SelectItem value='active'>Active</SelectItem>
                <SelectItem value='completed'>Completed</SelectItem>
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
