import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { ArrowLeft, Users, Building, FolderOpen } from 'lucide-react'
import { WorkspaceAPI } from '@/app/apis/AUTH/workspace.api'
import type { Workspace } from '../WorkspaceManagement/models/WorkspaceManagementInterface'
import { PATH } from '@/app/routes/path'

function WorkspaceDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [workspace, setWorkspace] = useState<Workspace | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWorkspaceDetail = useCallback(async () => {
    if (!id) return

    setLoading(true)
    try {
      const response = await WorkspaceAPI.getWorkspaceById(id)
      if (response.success) {
        setWorkspace(response.data)
      } else {
        setError('Failed to load workspace details')
      }
    } catch (error) {
      console.error('Error fetching workspace details:', error)
      setError('Failed to load workspace details')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (id) {
      fetchWorkspaceDetail()
    }
  }, [id, fetchWorkspaceDetail])

  const handleBack = () => {
    navigate(PATH.SUPER_ADMIN_WORKSPACES)
  }

  if (loading) {
    return (
      <div className='flex flex-col min-h-screen'>
        <div className='flex items-center gap-4 mb-6'>
          <Button variant='outline' onClick={handleBack}>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Workspace Management
          </Button>
        </div>
        <div className='flex items-center justify-center py-12'>
          <div className='text-center'>
            <div className='text-lg'>Loading workspace details...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !workspace) {
    return (
      <div className='flex flex-col min-h-screen'>
        <div className='flex items-center gap-4 mb-6'>
          <Button variant='outline' onClick={handleBack}>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Workspace Management
          </Button>
        </div>
        <div className='flex items-center justify-center py-12'>
          <div className='text-center'>
            <div className='text-lg text-red-500'>{error || 'Workspace not found'}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col min-h-screen gap-6'>
      {/* Header */}
      <Button className='w-fit' variant='link' onClick={handleBack}>
        <ArrowLeft className='w-4 h-4 mr-2' />
        Back to Workspace Management
      </Button>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>{workspace.name}</h1>
          <p className='text-gray-600'>{workspace.company_name}</p>
        </div>
        <Badge
          variant={workspace.status === 'active' ? 'default' : 'destructive'}
          className={`text-sm ${
            workspace.status === 'active'
              ? 'bg-green-100 text-green-800 border-transparent'
              : 'bg-red-100 text-red-800 border-transparent'
          }`}
        >
          {workspace.status.toUpperCase()}
        </Badge>
      </div>

      {/* Statistics Cards */}
      {workspace.users && workspace.departments && workspace.projects && (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
              <Users className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-blue-600'>{workspace.users.length}</div>
              <p className='text-xs text-muted-foreground'>Active users in this workspace</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Departments</CardTitle>
              <Building className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-green-600'>{workspace.departments.length}</div>
              <p className='text-xs text-muted-foreground'>Organizational departments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Projects</CardTitle>
              <FolderOpen className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-purple-600'>{workspace.projects.length}</div>
              <p className='text-xs text-muted-foreground'>Active and completed projects</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-medium text-gray-500'>Workspace Name</label>
                <p className='text-base mt-1'>{workspace.name}</p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>Company Name</label>
                <p className='text-base mt-1'>{workspace.company_name}</p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>Company Code</label>
                <p className='text-base mt-1'>{workspace.company_code || 'N/A'}</p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>Status</label>
                <div className='mt-1'>
                  <Badge
                    variant={workspace.status === 'active' ? 'default' : 'destructive'}
                    className={
                      workspace.status === 'active'
                        ? 'bg-green-100 text-green-800 border-transparent'
                        : 'bg-red-100 text-red-800 border-transparent'
                    }
                  >
                    {workspace.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline Information */}
        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-medium text-gray-500'>Start Date</label>
                <p className='text-base mt-1'>{new Date(workspace.start_date).toLocaleDateString()}</p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>Expire Date</label>
                <p className='text-base mt-1'>{new Date(workspace.expire_date).toLocaleDateString()}</p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>Created At</label>
                <p className='text-base mt-1'>{new Date(workspace.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>Last Updated</label>
                <p className='text-base mt-1'>{new Date(workspace.updated_at).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Package Information */}
      {workspace.package && (
        <Card>
          <CardHeader>
            <CardTitle>Package Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              <div>
                <label className='text-sm font-medium text-gray-500'>Package Name</label>
                <p className='text-base mt-1 font-semibold'>{workspace.package.name}</p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>Price</label>
                <p className='text-base mt-1 font-semibold text-green-600'>
                  {workspace.package.price.toLocaleString('vi-VN')} ₫
                </p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>Duration</label>
                <p className='text-base mt-1'>{workspace.package.duration_in_months} months</p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>Package Status</label>
                <div className='mt-1'>
                  <Badge
                    variant={workspace.package.status === 'active' ? 'default' : 'destructive'}
                    className={
                      workspace.package.status === 'active'
                        ? 'bg-green-100 text-green-800 border-transparent'
                        : 'bg-red-100 text-red-800 border-transparent'
                    }
                  >
                    {workspace.package.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
              {workspace.package.description && (
                <div className='col-span-full'>
                  <label className='text-sm font-medium text-gray-500'>Package Description</label>
                  <p className='text-base mt-1'>{workspace.package.description}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default WorkspaceDetail
