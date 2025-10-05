import { AdminWsApi } from '@/app/apis/AUTH/Admin-ws.api'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { Checkbox } from '@/app/components/ui/checkbox'
import { Input } from '@/app/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Building2, ChevronLeft, ChevronRight, Edit, Eye, Plus, Search, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import type { Department } from './models/MyDepartmentInterface'
import { CreateDepartmentModal, DeleteDepartmentModal, UpdateDepartmentModal } from './partials'

// API returns { success: boolean, message: string, data: { items: Department[], total: number, page?: number, limit?: number } }
type DepartmentsApiResponse = {
  success: boolean
  message?: string
  data: {
    items: Department[]
    total: number
    page?: number
    limit?: number
  }
}

function MyDepartment() {
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)

  const { data, isLoading, isError, error } = useQuery<DepartmentsApiResponse, Error>({
    queryKey: ['departments', currentPage, pageSize],
    queryFn: () => AdminWsApi.getAllDepartments(currentPage, pageSize)
  })

  // Local typed alias to satisfy TS when reading nested `data` field
  const apiData = data as unknown as DepartmentsApiResponse | undefined

  // Debug: Log dữ liệu để kiểm tra cấu trúc
  console.log('Debug - API Response:', data)
  console.log('Debug - Data Object:', apiData?.data)
  console.log('Debug - Items:', apiData?.data?.items)
  console.log('Debug - Total:', apiData?.data?.total)
  console.log('Debug - Is Loading:', isLoading)
  console.log('Debug - Is Error:', isError)
  console.log('Debug - Error:', error)

  // Filter departments based on search query and status
  // Handle API response structure: {success: true, data: {items: [], total: ...}}
  const departmentsList: Department[] = apiData?.data?.items || []
  const filteredDepartments = departmentsList.filter((department: Department) => {
    const matchesSearch =
      department.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      department.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      department.workspace.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = selectedStatus === 'all' || department.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  // Debug: Log filtered results
  console.log('Debug - Filtered Departments:', filteredDepartments)
  console.log('Debug - Search Query:', searchQuery)
  console.log('Debug - Selected Status:', selectedStatus)

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedStatus('all')
  }

  const hasActiveFilters = searchQuery || selectedStatus !== 'all'

  const queryClient = useQueryClient()

  if (isLoading) {
    return (
      <div className='flex h-screen bg-white container mx-auto'>
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600'></div>
            <p className='mt-4 text-gray-600'>Loading departments...</p>
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className='flex h-screen bg-white container mx-auto'>
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-center'>
            <p className='text-red-600'>Error: {error?.message}</p>
            <p className='text-gray-600 mt-2'>Failed to load departments</p>
          </div>
        </div>
      </div>
    )
  }

  // Handle department deletion
  const handleDeleteDepartment = async () => {
    if (!selectedDepartment) return
    try {
      await AdminWsApi.deleteDepartment(selectedDepartment.id)
      queryClient.invalidateQueries({ queryKey: ['departments'] })
      setIsDeleteModalOpen(false)
      toast.success(`Department "${selectedDepartment.name}" deleted successfully!`)
    } catch (error) {
      console.error('Delete failed:', error)
      toast.error('Failed to delete department.')
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDepartments(filteredDepartments.map((dept: Department) => dept.id))
    } else {
      setSelectedDepartments([])
    }
  }

  const handleSelectDepartment = (departmentId: number, checked: boolean) => {
    if (checked) {
      setSelectedDepartments([...selectedDepartments, departmentId])
    } else {
      setSelectedDepartments(selectedDepartments.filter((id) => id !== departmentId))
    }
  }

  // Handle department update success
  const handleUpdateSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['departments'] })
    toast.success('Department updated successfully!')
  }

  // Handle department creation
  const handleCreateDepartment = async (name: string, description: string) => {
    try {
      await AdminWsApi.createDepartment(name, description)
      queryClient.invalidateQueries({ queryKey: ['departments'] })
      toast.success('Department created successfully!')
      setIsCreateModalOpen(false)
    } catch (error) {
      toast.error('Failed to create department.')
      console.error('Create failed:', error)
    }
  }

  // Pagination handlers - use server's total when available
  const totalItems = apiData?.data?.total ?? departmentsList.length
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / pageSize) : 1

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1)
  }

  return (
    <div className='flex h-screen bg-white container mx-auto'>
      <div className='flex-1 flex flex-col'>
        <header className='bg-white border-gray-200 px-6 py-4'>
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-extrabold text-gray-900'>Manage Departments</h1>
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
                placeholder='Search by name or description...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-10'
              />
            </div>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className='w-[130px]'>
                <SelectValue placeholder='All Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Status</SelectItem>
                <SelectItem value='active'>Active</SelectItem>
                <SelectItem value='inactive'>Inactive</SelectItem>
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
                      checked={
                        filteredDepartments.length > 0 && selectedDepartments.length === filteredDepartments.length
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className='text-gray-500 font-medium text-xs uppercase'>ICON</TableHead>
                  <TableHead className='text-gray-500 font-medium text-xs uppercase'>NAME</TableHead>
                  <TableHead className='text-gray-500 font-medium text-xs uppercase'>DESCRIPTION</TableHead>
                  <TableHead className='text-gray-500 font-medium text-xs uppercase'>WORKSPACE</TableHead>
                  <TableHead className='text-gray-500 font-medium text-xs uppercase'>EMPLOYEES</TableHead>
                  <TableHead className='text-gray-500 font-medium text-xs uppercase'>STATUS</TableHead>
                  <TableHead className='text-gray-500 font-medium text-xs uppercase'>CREATED</TableHead>
                  <TableHead className='text-gray-500 font-medium text-xs uppercase'>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDepartments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className='text-center py-8'>
                      <div className='flex flex-col items-center justify-center text-gray-500'>
                        <Building2 className='w-12 h-12 mb-4 text-gray-300' />
                        <p className='text-lg font-medium mb-2'>No departments found</p>
                        <p className='text-sm'>
                          {searchQuery || selectedStatus !== 'all'
                            ? 'Try adjusting your search or filters'
                            : 'Get started by creating your first department'}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDepartments.map((department: Department) => (
                    <TableRow key={department.id} className='border-b border-gray-100 hover:bg-gray-50'>
                      <TableCell>
                        <Checkbox
                          checked={selectedDepartments.includes(department.id)}
                          onCheckedChange={(checked) => handleSelectDepartment(department.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                          <Building2 className='w-4 h-4 text-blue-600' />
                        </div>
                      </TableCell>
                      <TableCell className='font-medium text-gray-900'>{department.name}</TableCell>
                      <TableCell className='text-gray-600 max-w-[200px] truncate'>
                        {department.description || 'No description'}
                      </TableCell>
                      <TableCell className='text-gray-600'>{department.workspace.name}</TableCell>
                      <TableCell className='text-gray-600'>{department._count.users}</TableCell>
                      <TableCell>
                        <Badge
                          variant='secondary'
                          className={
                            department.status === 'active'
                              ? 'bg-green-100 text-green-700 hover:bg-green-100 border-0 font-medium capitalize'
                              : 'bg-red-100 text-red-700 hover:bg-red-100 border-0 font-medium capitalize'
                          }
                        >
                          {department.status}
                        </Badge>
                      </TableCell>
                      <TableCell className='text-gray-600'>
                        {new Date(department.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                            <Eye className='w-4 h-4 text-gray-400' />
                          </Button>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='h-8 w-8 p-0'
                            title='Edit department'
                            onClick={() => {
                              setSelectedDepartment(department)
                              setIsUpdateModalOpen(true)
                            }}
                          >
                            <Edit className='w-4 h-4 text-blue-500' />
                          </Button>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='h-8 w-8 p-0'
                            title='Delete department'
                            onClick={() => {
                              setSelectedDepartment(department)
                              setIsDeleteModalOpen(true)
                            }}
                          >
                            <Trash2 className='w-4 h-4 text-red-500' />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        <div className='bg-white border-t border-gray-200 px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='text-sm text-gray-500'>
              Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalItems)} of{' '}
              {totalItems} results
              {searchQuery && ` (filtered from ${departmentsList.length})`}
            </div>
            <div className='flex items-center gap-2'>
              <Button variant='ghost' size='sm' onClick={handlePreviousPage} disabled={currentPage === 1}>
                <ChevronLeft className='w-4 h-4' />
              </Button>
              <Button variant='default' size='sm' className='bg-blue-600 hover:bg-blue-700'>
                {currentPage}
              </Button>

              {/* Show the immediate next page only when it exists and is not the last page to avoid duplicates */}
              {currentPage + 1 < totalPages && (
                <Button variant='ghost' size='sm' onClick={handleNextPage}>
                  {currentPage + 1}
                </Button>
              )}

              {/* If there are more than one page between current+1 and last, show ellipsis */}
              {currentPage + 2 < totalPages && <span className='text-gray-400'>...</span>}

              {/* Always show last page when it's not the current page and wasn't already shown above */}
              {totalPages > 1 && currentPage !== totalPages && (
                <Button variant='ghost' size='sm' onClick={() => setCurrentPage(totalPages)}>
                  {totalPages}
                </Button>
              )}
              <Button variant='ghost' size='sm' onClick={handleNextPage} disabled={currentPage === totalPages}>
                <ChevronRight className='w-4 h-4' />
              </Button>
            </div>
          </div>
        </div>

        {/* Modals */}
        <CreateDepartmentModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateDepartment}
        />
        <UpdateDepartmentModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          department={selectedDepartment}
          onUpdate={handleUpdateSuccess}
        />
        <DeleteDepartmentModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          departmentName={selectedDepartment?.name || ''}
          onConfirm={handleDeleteDepartment}
        />
      </div>
    </div>
  )
}

export default MyDepartment
