import { Card, CardContent } from '@/app/components/ui/card'
import { Brain } from 'lucide-react'
import { useState, useEffect } from 'react'
import { ProjectAdminApi } from '@/app/apis/AUTH/project-admin.api'
import type { ProjectAIAnalysisResponse } from '../models/project-detail.type'

interface AIAnalysisComponentProps {
  projectId?: string
}

export function AIAnalysisComponent({ projectId }: AIAnalysisComponentProps) {
  const [analysis, setAnalysis] = useState<ProjectAIAnalysisResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAIAnalysis = async () => {
      if (!projectId) return

      try {
        setIsLoading(true)
        const aiData = await ProjectAdminApi.getProjectAiAnalysis(projectId)
        setAnalysis(aiData)
      } catch (error) {
        console.error('Error fetching AI analysis:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAIAnalysis()
  }, [projectId])

  if (isLoading) {
    return (
      <Card className='border-0 shadow-sm h-full'>
        <CardContent className='p-6 flex items-center justify-center h-full min-h-[400px]'>
          <div className='flex items-center space-x-2'>
            <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600'></div>
            <span className='text-sm text-gray-600'>Loading AI Analysis...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!analysis) {
    return (
      <Card className='border-0 shadow-sm h-full'>
        <CardContent className='p-6 flex items-center justify-center h-full min-h-[400px]'>
          <div className='text-center'>
            <Brain className='w-12 h-12 text-gray-400 mx-auto mb-4' />
            <p className='text-gray-500'>No AI analysis available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='border-0 shadow-sm h-full'>
      <CardContent className='p-6'>
        <div className='flex items-center gap-3 mb-6'>
          <div className='p-3 rounded-xl bg-indigo-400'>
            <Brain className='w-5 h-5 text-white' />
          </div>
          <h3 className='text-lg font-semibold text-gray-900'>AI Performance Analysis</h3>
        </div>

        <div className='space-y-6'>
          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>AI Evaluation Summary</h4>
            <p className='text-gray-700 leading-relaxed'>{analysis.summary}</p>
          </div>

          <div className='grid grid-cols-2 gap-4 pt-4 border-t border-gray-100'>
            <div>
              <p className='text-xs font-medium text-gray-500 uppercase tracking-wider'>Total Completed</p>
              <p className='text-sm font-semibold text-gray-900 mt-1'>{analysis.totalCompleted} tasks</p>
            </div>
            <div>
              <p className='text-xs font-medium text-gray-500 uppercase tracking-wider'>Total Delayed</p>
              <p className='text-sm font-semibold text-gray-900 mt-1'>{analysis.totalDelay} tasks</p>
            </div>
            <div>
              <p className='text-xs font-medium text-gray-500 uppercase tracking-wider'>Avg Quality</p>
              <p className='text-sm font-semibold text-gray-900 mt-1'>{analysis.avgQuality.toFixed(1)}/5</p>
            </div>
            <div>
              <p className='text-xs font-medium text-gray-500 uppercase tracking-wider'>Avg Burnout</p>
              <p className='text-sm font-semibold text-gray-900 mt-1'>{analysis.avgBurnout.toFixed(1)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
