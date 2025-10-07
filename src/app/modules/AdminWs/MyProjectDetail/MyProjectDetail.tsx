import { ProjectAdminApi } from '@/app/apis/AUTH/project-admin.api'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { PATH } from '@/app/routes/path'
import { ChevronLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { AIAnalysisComponent } from '@/app/modules/AdminWs/MyProjectDetail/partials/AIAnalysisComponent'
import { ProjectMembersTable } from '@/app/modules/AdminWs/MyProjectDetail/partials/ProjectMembersTable'
import { ProjectProgressComponent } from '@/app/modules/AdminWs/MyProjectDetail/partials/ProjectProgressComponent'
import { TaskStatsCards } from '@/app/modules/AdminWs/MyProjectDetail/partials/TaskStatsCards'
import { TeamKPIComponent } from '@/app/modules/AdminWs/MyProjectDetail/partials/TeamKPIComponent'
import type {
  ProjectDetailData,
  ProjectMember,
  ProjectProgress,
  TaskStats,
  TeamKPI
} from './models/project-detail.type'

function MyProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [project, setProject] = useState<ProjectDetailData | null>(null)
  const [taskStats, setTaskStats] = useState<TaskStats>({
    completed: 0,
    incomplete: 0,
    overdue: 0,
    total: 0
  })
  const [teamKPI, setTeamKPI] = useState<TeamKPI>({
    percentage: 0,
    value: '0',
    amount: '0'
  })
  const [projectProgress, setProjectProgress] = useState<ProjectProgress>({
    completed: 0,
    inProgress: 0,
    total: 0
  })
  const [members, setMembers] = useState<ProjectMember[]>([])

  useEffect(() => {
    const fetchProjectDetail = async () => {
      if (!id) return

      try {
        setIsLoading(true)

        // Fetch basic data (excluding AI analysis which will be loaded separately)
        const [overviewData, kpiData, membersData] = await Promise.all([
          ProjectAdminApi.getProjectOverview(id),
          ProjectAdminApi.getProjectKpis(id),
          ProjectAdminApi.getProjectMembers(id)
        ])

        // Set project basic info
        setProject(overviewData.project)

        // Set task stats from overview
        setTaskStats({
          completed: overviewData.completedTasks,
          incomplete: overviewData.inProgressTasks,
          overdue: overviewData.overdueTasks,
          total: overviewData.totalTasks
        })

        // Set project progress
        setProjectProgress({
          completed: overviewData.completedTasks,
          inProgress: overviewData.inProgressTasks,
          total: overviewData.totalTasks
        })

        // Set team KPI
        setTeamKPI({
          percentage: kpiData.completionRate,
          value: kpiData.kpiValue.toString(),
          amount: kpiData.completedTasks.toString()
        })

        // Set members
        setMembers(membersData)
      } catch (error) {
        console.error('Error fetching project details:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjectDetail()
  }, [id])

  const handleBackToProjects = () => {
    navigate(PATH.ADMIN_MY_PROJECTS)
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='flex items-center space-x-2'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
          <span className='text-sm text-gray-600'>Loading Project Details...</span>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen  p-6'>
      <div className='max-w-[1400px] mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <Button
            variant='ghost'
            onClick={handleBackToProjects}
            className='mb-4 text-gray-600 hover:text-gray-900 px-0'
          >
            <ChevronLeft className='w-4 h-4 mr-1' />
            Back to project management
          </Button>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <h1 className='text-3xl font-bold text-gray-900'>{project?.name || 'Project Details'}</h1>
              <Badge className='bg-green-100 text-green-700 hover:bg-green-100 border-0'>
                {project?.status === 'active' ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Task Stats Cards */}
        <TaskStatsCards stats={taskStats} />

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8'>
          {/* Left Column - AI Analysis */}
          <div className='lg:col-span-2 h-full'>
            <AIAnalysisComponent projectId={id} />
          </div>

          {/* Right Column */}
          <div className='space-y-8 h-fit'>
            <TeamKPIComponent kpi={teamKPI} />
            <ProjectProgressComponent progress={projectProgress} />
          </div>
        </div>

        {/* Project Members Table */}
        <ProjectMembersTable members={members} />
      </div>
    </div>
  )
}

export default MyProjectDetail
