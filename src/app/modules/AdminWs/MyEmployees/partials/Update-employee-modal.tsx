import type React from 'react'

import { useState, useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { AdminWsApi } from '@/app/apis/AUTH/Admin-ws.api'
import type { Employee, UpdateEmployeePayload } from '@/app/modules/AdminWs/MyEmployees/models/AdminwsInterface'
import { toast } from 'react-toastify'
import type { AxiosError } from 'axios'

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
    // default role to Employee (4) until we initialize from employee prop
    role_id: 4
  })
  const [isLoading, setIsLoading] = useState(false)

  // Fetch departments to populate select
  const { data: departmentsData } = useQuery<any, AxiosError>({
    queryKey: ['admin-ws-departments'],
    queryFn: () => AdminWsApi.getAllDepartments(1, 100)
  })

  // Memoize department list so reference is stable for useEffect dependencies
  const departments = useMemo(
    () => (departmentsData?.data?.items as { id: number; name: string }[]) || [],
    // depend on the raw items array so memo updates only when API data changes
    [departmentsData?.data?.items]
  )

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        avatar_url: employee.avatar_url || '',
        // initialize with employee's current values when available
        department_id: employee.department_id || 0,
        role_id: employee.role_id || 4
      })
    }
  }, [employee])

  // When departments are loaded, if formData.department_id is not set,
  // prefer the employee's department if available, otherwise pick the first department
  useEffect(() => {
    if (!departments || departments.length === 0) return

    setFormData((prev) => {
      // If department is already set (non-zero), keep it
      if (prev.department_id && prev.department_id !== 0) return prev

      // If employee has a department_id, use it
      if (employee && employee.department_id) {
        return { ...prev, department_id: employee.department_id }
      }

      // Fallback to first department in the list
      return { ...prev, department_id: departments[0].id }
    })
  }, [departments, employee])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!employee) return

    setIsLoading(true)

    try {
      const updatePayload: UpdateEmployeePayload = {
        name: formData.name,
        email: formData.email,
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
      toast.error('Failed to update employee.')
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
                  {/* Only Project Manager and Employee are allowed for updates */}
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
                  {departments.length === 0 ? (
                    <SelectItem value='0'>No departments</SelectItem>
                  ) : (
                    departments.map((d) => (
                      <SelectItem key={d.id} value={d.id.toString()}>
                        {d.name}
                      </SelectItem>
                    ))
                  )}
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
