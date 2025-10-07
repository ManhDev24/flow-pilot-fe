import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import type { AxiosError } from 'axios'

import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table'
import { Checkbox } from '@/app/components/ui/checkbox'
import { Badge } from '@/app/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/app/components/ui/dropdown-menu'

import { Search, Plus, ChevronLeft, ChevronRight, X, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react'

import { projectApi } from '@/app/apis/AUTH/project.api'
import type { ProjectResponse, ProjectData, CreateProjectPayload } from './models/ProjectInterface'
import { CreateProjectModal } from './partials/CreateProjectModal'
import { UpdateProjectModal } from './partials/UpdateProjectModal'
import { DeleteProjectModal } from './partials/DeleteProjectModal'

function MyProjects() {
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  // Filter states
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedManager, setSelectedManager] = useState('all')

  const [currentPage, setCurrentPage] = useState(1)
  const [limit] = useState(10)

  const { data, isLoading, isError, error } = useQuery<ProjectResponse, AxiosError>({
    queryKey: ['projects', currentPage, limit],
    queryFn: () => projectApi.getAllProjects(currentPage, limit)
  })

  // Filter projects based on search query and filters
  const filteredProjects = (data?.data.data || []).filter((project: ProjectData) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.manager?.name?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus
    const matchesManager = selectedManager === 'all' || project.manager?.name === selectedManager

    return matchesSearch && matchesStatus && matchesManager
  })

  // Get unique values for filter options
  const statuses = Array.from(new Set((data?.data.data || []).map((project) => project.status).filter(Boolean)))
  const managers = Array.from(new Set((data?.data.data || []).map((project) => project.manager?.name).filter(Boolean)))

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedStatus('all')
    setSelectedManager('all')
  }

  const hasActiveFilters = searchQuery || selectedStatus !== 'all' || selectedManager !== 'all'

  const queryClient = useQueryClient()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error?.message}</div>

  // Handle project deletion
  const handleDeleteProject = async () => {
    if (!selectedProject) return
    try {
      await projectApi.deleteProject(selectedProject.id)
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      setIsDeleteModalOpen(false)
      toast.success(`Project "${selectedProject.name}" deleted successfully!`)
    } catch (error) {
      console.error('Delete failed:', error)
      toast.error('Failed to delete project.')
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProjects(filteredProjects.map((project) => project.id))
    } else {
      setSelectedProjects([])
    }
  }

  const handleSelectProject = (projectId: string, checked: boolean) => {
    if (checked) {
      setSelectedProjects([...selectedProjects, projectId])
    } else {
      setSelectedProjects(selectedProjects.filter((id) => id !== projectId))
    }
  }

  // Handle project update success
  const handleUpdateSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['projects'] })
    toast.success('Project updated successfully!')
  }

  // Handle project creation
  const handleCreateProject = async (project: Omit<CreateProjectPayload, 'workspace_id'>) => {
    try {
      await projectApi.createProject(project)
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast.success('Project created successfully!')
      setIsCreateModalOpen(false)
    } catch (error) {
      toast.error('Failed to create project.')
      console.error('Create failed:', error)
    }
  }

  // Status badge styling function
  const getStatusBadgeProps = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 hover:bg-green-100 border-0 font-medium capitalize'
      case 'completed':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-100 border-0 font-medium capitalize'
      case 'not_started':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-0 font-medium capitalize'
      case 'inactive':
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100 border-0 font-medium capitalize'
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100 border-0 font-medium capitalize'
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className='flex h-screen bg-white container mx-auto'>
      <div className='flex-1 flex flex-col'>
        <header className='bg-white border-gray-200 px-6 py-4'>
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-extrabold text-gray-900'>Manage Projects</h1>
            <div className='flex items-center gap-4'>
              <Button className='bg-blue-600 hover:bg-blue-700' onClick={() => setIsCreateModalOpen(true)}>
                <Plus className='w-4 h-4 mr-2' />
                Add new
              </Button>
            </div>
          </div>
        </header>

        {/* Filters and Search */}
        <div className='bg-white px-6 py-4 mb-6 border border-gray-200 rounded-lg'>
          <div className='flex items-center gap-4 flex-wrap'>
            <div className='relative flex-1 min-w-[250px]'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <Input
                placeholder='Search by project name...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-10'
              />
            </div>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className='w-[150px]'>
                <SelectValue placeholder='All Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Status</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    <span className='capitalize'>{status.replace('_', ' ')}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedManager} onValueChange={setSelectedManager}>
              <SelectTrigger className='w-[170px]'>
                <SelectValue placeholder='All Managers' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Managers</SelectItem>
                {managers.map((manager) => (
                  <SelectItem key={manager} value={manager}>
                    {manager}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant='ghost'
                size='sm'
                onClick={clearAllFilters}
                className='h-9 w-9 p-0 text-gray-400 hover:text-gray-600'
              >
                <X className='w-4 h-4' />
              </Button>
            )}
          </div>
        </div>

        <div className='flex-1 overflow-auto bg-white'>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', overflow: 'hidden' }}>
            <Table>
              <TableHeader>
                <TableRow className='border-b border-gray-200'>
                  <TableHead className='w-12'>
                    <Checkbox
                      checked={filteredProjects.length > 0 && selectedProjects.length === filteredProjects.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className='text-gray-500 font-medium text-xs uppercase'>PROJECT NAME</TableHead>
                  <TableHead className='text-gray-500 font-medium text-xs uppercase'>DESCRIPTION</TableHead>
                  <TableHead className='text-gray-500 font-medium text-xs uppercase'>MANAGER</TableHead>
                  <TableHead className='text-gray-500 font-medium text-xs uppercase'>START DATE</TableHead>
                  <TableHead className='text-gray-500 font-medium text-xs uppercase'>END DATE</TableHead>
                  <TableHead className='text-gray-500 font-medium text-xs uppercase'>TEAM SIZE</TableHead>
                  <TableHead className='text-gray-500 font-medium text-xs uppercase'>STATUS</TableHead>
                  <TableHead className='text-gray-500 font-medium text-xs uppercase'>PROGRESS</TableHead>
                  <TableHead className='text-gray-500 font-medium text-xs uppercase'>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project: ProjectData) => (
                  <TableRow key={project.id} className='border-b border-gray-100 hover:bg-gray-50'>
                    <TableCell>
                      <Checkbox
                        checked={selectedProjects.includes(project.id)}
                        onCheckedChange={(checked) => handleSelectProject(project.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className='font-medium text-gray-900'>
                      <div className='font-semibold'>{project.name}</div>
                    </TableCell>
                    <TableCell className='text-gray-600 max-w-[200px]'>
                      <div className='truncate' title={project.description || 'No description'}>
                        {project.description || 'No description'}
                      </div>
                    </TableCell>
                    <TableCell className='text-gray-600'>
                      <div className='flex items-center gap-2'>
                        <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium'>
                          {project.manager?.name
                            ?.split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase() || 'N/A'}
                        </div>
                        <div>
                          <div className='font-medium'>{project.manager?.name || 'Not assigned'}</div>
                          <div className='text-xs text-gray-500'>{project.manager?.email || ''}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className='text-gray-600'>{formatDate(project.start_date)}</TableCell>
                    <TableCell className='text-gray-600'>{formatDate(project.end_date)}</TableCell>
                    <TableCell className='text-gray-600'>{project.team_size}</TableCell>
                    <TableCell>
                      <Badge variant='secondary' className={getStatusBadgeProps(project.status)}>
                        {project.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-gray-600'>{project.process || 0}%</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem>
                            <Eye className='mr-2 h-4 w-4' />
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedProject(project)
                              setIsUpdateModalOpen(true)
                            }}
                          >
                            <Edit className='mr-2 h-4 w-4' />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className='text-red-600'
                            onClick={() => {
                              setSelectedProject(project)
                              setIsDeleteModalOpen(true)
                            }}
                          >
                            <Trash2 className='mr-2 h-4 w-4' />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        <div className='bg-white border-t border-gray-200 px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='text-sm text-gray-500'>
              Showing {(currentPage - 1) * limit + 1} to {Math.min(currentPage * limit, data?.data.total || 0)} of{' '}
              {data?.data.total || 0} results
              {searchQuery && ` (filtered from ${data?.data.data?.length || 0})`}
            </div>
            <div className='flex items-center gap-2'>
              <Button
                variant='ghost'
                size='sm'
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                <ChevronLeft className='w-4 h-4' />
              </Button>
              <Button variant='default' size='sm' className='bg-blue-600 hover:bg-blue-700'>
                {currentPage}
              </Button>
              <Button
                variant='ghost'
                size='sm'
                disabled={!data?.data.total || currentPage >= Math.ceil(data.data.total / limit)}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                <ChevronRight className='w-4 h-4' />
              </Button>
            </div>
          </div>
        </div>

        {/* Modals */}
        <CreateProjectModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateProject}
        />
        <UpdateProjectModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          project={selectedProject}
          onUpdate={handleUpdateSuccess}
        />
        <DeleteProjectModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          projectName={selectedProject?.name || ''}
          onConfirm={handleDeleteProject}
        />
      </div>
    </div>
  )
}

export default MyProjects
