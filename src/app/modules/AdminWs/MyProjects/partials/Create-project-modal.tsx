import type { CreateProjectFormData } from '@/app/modules/AdminWs/MyProjects/MyProjects'
import type React from 'react'

export interface Manager {
  id: string
  name: string
  email: string
  avatar_url: string | null
  status: string
}

import { Button } from '@/app/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { Slider } from '@/app/components/ui/slider'
import { Textarea } from '@/app/components/ui/textarea'
import { useState } from 'react'

interface CreateProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (project: CreateProjectFormData) => void
  managers: Manager[]
}

export function CreateProjectModal({ isOpen, onClose, onCreate, managers }: CreateProjectModalProps) {
  const [formData, setFormData] = useState<CreateProjectFormData>({
    name: '',
    manager_id: '',
    description: '',
    start_date: '',
    end_date: '',
    process: 0,
    team_size: 1,
    status: 'active'
  })
  const [isLoading, setIsLoading] = useState(false)

  // Filter to only active managers
  const activeManagers = managers.filter((manager) => manager.status === 'active')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    onCreate(formData)
    setIsLoading(false)
    onClose()

    // Reset form
    setFormData({
      name: '',
      manager_id: '',
      description: '',
      start_date: '',
      end_date: '',
      process: 0,
      team_size: 1,
      status: 'active'
    })
  }

  const handleInputChange = (field: keyof CreateProjectFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleProgressChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, process: value[0] }))
  }

  const handleTeamSizeChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, team_size: value[0] }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px] p-0 max-h-[90vh] overflow-y-auto'>
        <DialogHeader className='px-6 py-4 border-b'>
          <div className='flex items-center justify-between'>
            <div>
              <DialogTitle className='text-lg font-semibold'>Create New Project</DialogTitle>
              <p className='text-sm text-muted-foreground mt-1'>Add a new project to your workspace.</p>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='px-6 py-4 space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='project-name'>Project Name</Label>
            <Input
              id='project-name'
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder='Enter project name'
              required
            />
          </div>

          <div className='space-y-2'>
            <Label>Project Manager</Label>
            <Select
              value={formData.manager_id}
              onValueChange={(value) => handleInputChange('manager_id', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder='Select a project manager' />
              </SelectTrigger>
              <SelectContent>
                {activeManagers.length === 0 ? (
                  <SelectItem value='' disabled>
                    No project managers available
                  </SelectItem>
                ) : (
                  activeManagers.map((manager) => (
                    <SelectItem key={manager.id} value={manager.id}>
                      {manager.name} ({manager.email})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='project-description'>Description</Label>
            <Textarea
              id='project-description'
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder='Enter project description'
              rows={3}
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='start-date'>Start Date</Label>
              <Input
                id='start-date'
                type='date'
                value={formData.start_date}
                onChange={(e) => handleInputChange('start_date', e.target.value)}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='end-date'>End Date</Label>
              <Input
                id='end-date'
                type='date'
                value={formData.end_date}
                onChange={(e) => handleInputChange('end_date', e.target.value)}
                required
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label>Progress: {formData.process}%</Label>
            <Slider
              value={[formData.process]}
              onValueChange={handleProgressChange}
              max={100}
              step={1}
              className='w-full'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='team-size'>Team Size</Label>
            <Input
              id='team-size'
              type='number'
              min={1}
              max={50}
              value={formData.team_size}
              onChange={(e) => handleInputChange('team_size', Number(e.target.value))}
              placeholder='Enter team size'
              required
            />
          </div>

          <div className='space-y-2'>
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: 'active' | 'inactive') => handleInputChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='active'>Active</SelectItem>
                <SelectItem value='inactive'>Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white mt-6' disabled={isLoading}>
            {isLoading ? 'CREATING...' : 'CREATE PROJECT'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
