import { Card } from '@/app/components/ui/card'
import { Progress } from '@/app/components/ui/progress'
import { Badge } from '@/app/components/ui/badge'
import { useAllPerformanceData } from '@/app/modules/AdminWs/DashboardAdmin/hooks/usePerformanceQueries'
import { usePerformanceContext } from '@/app/modules/AdminWs/DashboardAdmin/context/PerformanceContext'
import { Skeleton } from '@/app/components/ui/skeleton'
import { Users, TrendingUp, UserCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { MyTaskApi } from '@/app/apis/AUTH/performance.api'
import type { Member } from '@/app/modules/AdminWs/models/performanceInterface'

// Interface cho role data
interface RoleData {
  employeeRoleDistribution: {
    [key: string]: number
  }
  topActiveRoles: Array<{
    roleName: string
    count: number
    percentage: number
  }>
}

const getRoleColor = (roleName: string) => {
  const colorMap: { [key: string]: string } = {
    'Software Engineer': 'bg-blue-500',
    'Product Manager': 'bg-green-500',
    'Designer': 'bg-purple-500',
    'DevOps Engineer': 'bg-orange-500',
    'QA Engineer': 'bg-red-500',
    'Data Analyst': 'bg-indigo-500',
    'Marketing': 'bg-pink-500'
  }
  return colorMap[roleName] || 'bg-gray-500'
}

const getRoleBadgeColor = (roleName: string) => {
  const colorMap: { [key: string]: string } = {
    'Software Engineer': 'bg-blue-100 text-blue-800',
    'Product Manager': 'bg-green-100 text-green-800',
    'Designer': 'bg-purple-100 text-purple-800',
    'DevOps Engineer': 'bg-orange-100 text-orange-800',
    'QA Engineer': 'bg-red-100 text-red-800',
    'Data Analyst': 'bg-indigo-100 text-indigo-800',
    'Marketing': 'bg-pink-100 text-pink-800'
  }
  return colorMap[roleName] || 'bg-gray-100 text-gray-800'
}

// Helper functions để process role data từ members
const processRoleData = (members: Member[]): RoleData => {
  if (members.length === 0) {
    return {
      employeeRoleDistribution: {},
      topActiveRoles: []
    }
  }

  // Đếm số lượng theo job title
  const roleCounts: { [key: string]: number } = {}
  members.forEach(member => {
    const role = member.job_title || 'Unknown'
    roleCounts[role] = (roleCounts[role] || 0) + 1
  })

  const totalMembers = members.length
  
  // Tạo top active roles
  const topActiveRoles = Object.entries(roleCounts)
    .map(([roleName, count]) => ({
      roleName,
      count,
      percentage: Math.round((count / totalMembers) * 100)
    }))
    .sort((a, b) => b.count - a.count) // Sort descending by count
    .slice(0, 5) // Top 5

  // Tạo distribution cho top 3 roles
  const employeeRoleDistribution: { [key: string]: number } = {}
  topActiveRoles.slice(0, 3).forEach(role => {
    // Normalize role name để match với key format
    const normalizedKey = role.roleName.toLowerCase().replace(/\s+/g, '')
    employeeRoleDistribution[normalizedKey] = role.percentage
  })

  return {
    employeeRoleDistribution,
    topActiveRoles
  }
}

export function EmployeeRoleOverview() {
  const { fromDate, toDate } = usePerformanceContext()
  const { allProjectsOverview, isLoading } = useAllPerformanceData(fromDate, toDate)
  
  const [allMembers, setAllMembers] = useState<Member[]>([])
  const [membersLoading, setMembersLoading] = useState(false)
  const [roleData, setRoleData] = useState<RoleData>({
    employeeRoleDistribution: {},
    topActiveRoles: []
  })

  // Fetch all project members
  useEffect(() => {
    const fetchAllProjectMembers = async () => {
      if (!allProjectsOverview?.projectOverviews?.length) {
        setRoleData({
          employeeRoleDistribution: {},
          topActiveRoles: []
        })
        return
      }
      
      setMembersLoading(true)
      try {
        const membersPromises = allProjectsOverview.projectOverviews.map(project =>
          MyTaskApi.getProjectMembers(project.projectId).catch(err => {
            console.warn(`Failed to fetch members for project ${project.projectId}:`, err)
            return []
          })
        )
        
        const allMembersArrays = await Promise.all(membersPromises)
        const allMembersFlat = allMembersArrays.flat().filter(Boolean)
        
        // Remove duplicates based on member id
        const uniqueMembers = allMembersFlat.filter((member, index, self) => 
          index === self.findIndex(m => m.id === member.id)
        )
        
        setAllMembers(uniqueMembers)
        
        // Process role data
        const processedRoleData = processRoleData(uniqueMembers)
        setRoleData(processedRoleData)
        
      } catch (error) {
        console.error('Error fetching project members:', error)
        setAllMembers([])
        setRoleData({
          employeeRoleDistribution: {},
          topActiveRoles: []
        })
      } finally {
        setMembersLoading(false)
      }
    }

    fetchAllProjectMembers()
  }, [allProjectsOverview])

  const hasRealData = allMembers.length > 0

  return (
    <Card className='p-4'>
      <div className='flex items-center justify-between mb-2'>
        <div className='flex items-center gap-2'>
          <Users className='w-5 h-5 text-blue-600' />
          <h3 className='font-semibold text-gray-900'>Employee Role Overview</h3>
        </div>
        {!hasRealData && <span className='text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded'>No Data</span>}
      </div>
      <p className='text-sm text-gray-600 mb-4'>
        {hasRealData 
          ? `Role distribution across ${allMembers.length} team members from active projects.`
          : 'No employee role data available. Add team members to projects to see role distribution.'
        }
      </p>

      {(isLoading || membersLoading) ? (
        // Loading state
        <div className='space-y-4'>
          <div>
            <Skeleton className='h-4 w-32 mb-2' />
            <Skeleton className='h-2 w-full mb-1' />
            <Skeleton className='h-2 w-3/4 mb-1' />
            <Skeleton className='h-2 w-1/2' />
          </div>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-24 mb-2' />
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className='flex items-center justify-between'>
                <Skeleton className='h-6 w-28' />
                <Skeleton className='h-4 w-12' />
              </div>
            ))}
          </div>
        </div>
      ) : hasRealData ? (
        <div className='space-y-4'>
          {/* Role Distribution */}
          {Object.keys(roleData.employeeRoleDistribution).length > 0 && (
            <div>
              <div className='flex items-center gap-2 mb-3'>
                <TrendingUp className='w-4 h-4 text-green-600' />
                <h4 className='text-sm font-medium text-gray-700'>Top Role Distribution</h4>
              </div>
              
              <div className='space-y-2'>
                {Object.entries(roleData.employeeRoleDistribution).map(([key, percentage]) => (
                  <div key={key}>
                    <div className='flex items-center justify-between text-sm mb-1'>
                      <span className='text-gray-600 capitalize'>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className='font-medium'>{percentage}%</span>
                    </div>
                    <Progress value={percentage} className='h-2' />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Active Roles */}
          {roleData.topActiveRoles.length > 0 && (
            <div>
              <div className='flex items-center gap-2 mb-3'>
                <UserCheck className='w-4 h-4 text-purple-600' />
                <h4 className='text-sm font-medium text-gray-700'>All Active Roles</h4>
              </div>
              
              <div className='space-y-2'>
                {roleData.topActiveRoles.map((role) => (
                  <div key={role.roleName} className='flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors'>
                    <div className='flex items-center gap-2'>
                      <div className={`w-3 h-3 rounded-full ${getRoleColor(role.roleName)}`}></div>
                      <Badge variant="secondary" className={`text-xs ${getRoleBadgeColor(role.roleName)}`}>
                        {role.roleName}
                      </Badge>
                    </div>
                    <div className='text-right'>
                      <div className='text-sm font-medium text-gray-900'>{role.count} member{role.count > 1 ? 's' : ''}</div>
                      <div className='text-xs text-gray-500'>{role.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Summary */}
              <div className='mt-3 pt-3 border-t border-gray-100'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-gray-600 font-medium'>Total Active Members</span>
                  <span className='text-gray-900 font-semibold'>{allMembers.length}</span>
                </div>
                <div className='flex items-center justify-between text-xs text-gray-500 mt-1'>
                  <span>Unique Roles</span>
                  <span>{roleData.topActiveRoles.length}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className='text-center py-8 text-gray-500'>
          <Users className='w-12 h-12 mx-auto mb-3 text-gray-300' />
          <div className='text-sm'>No role data available</div>
          <div className='text-xs mt-1'>Add team members to projects to see role distribution and statistics</div>
        </div>
      )}
    </Card>
  )
}