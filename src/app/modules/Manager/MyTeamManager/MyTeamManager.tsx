import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Eye } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table'
import { Badge } from '@/app/components/ui/badge'
import { projectApi } from '@/app/apis/AUTH/project.api'
import { getLocalStorage } from '@/app/utils'
import type { IUserStatePayload } from '@/app/models'
import type { ITeamMember } from './models/TeamInterface'
import { useNavigate } from 'react-router-dom'
import { PATH } from '@/app/routes/path'

function MyTeamManager() {
  const [projectId, setProjectId] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    const userLocalStorage: IUserStatePayload = getLocalStorage('user')
    if (userLocalStorage?.projectId) {
      setProjectId(userLocalStorage.projectId)
    }
  }, [])

  const {
    data: projectData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectApi.getProjectById(projectId),
    enabled: !!projectId
  })

  const members = projectData?.data?.members || []

  const handleViewDetail = (memberId: string) => {
    console.log('Navigating to detail page with userId:', memberId)
    navigate(PATH.EMPLOYEE_MANAGE_MY_TEAM_DETAIL.replace(':id', memberId))
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'product manager':
      case 'project manager':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'developer':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'designer':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSystemRoleBadgeColor = (role: string) => {
    switch (role.toUpperCase()) {
      case 'PROJECTMANAGER':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'EMPLOYEE':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'ADMIN':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-gray-500'>Loading team members...</div>
      </div>
    )
  }

  if (error || !projectData?.success) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-red-500'>Error loading team members</div>
      </div>
    )
  }

  return (
    <div className='p-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>My Team</h1>
          <p className='text-gray-600 mt-1'>Manage and view your team members for project: {projectData.data?.name}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members ({members.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {members.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>No team members found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Project Role</TableHead>
                  <TableHead>System Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member: ITeamMember) => (
                  <TableRow key={member.id}>
                    <TableCell className='font-medium'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center'>
                          {member.user.avatar_url ? (
                            <img
                              src={member.user.avatar_url}
                              alt={member.user.name}
                              className='w-8 h-8 rounded-full object-cover'
                            />
                          ) : (
                            <span className='text-sm font-medium text-gray-600'>
                              {member.user.name.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <span>{member.user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{member.user.email}</TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(member.role)}>{member.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getSystemRoleBadgeColor(member.user.role.role)}>{member.user.role.role}</Badge>
                    </TableCell>
                    <TableCell>{member.user.department.name}</TableCell>
                    <TableCell className='text-right'>
                      <Button variant='ghost' size='sm' onClick={() => handleViewDetail(member.user.id)}>
                        <Eye className='w-4 h-4 mr-2' />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default MyTeamManager
