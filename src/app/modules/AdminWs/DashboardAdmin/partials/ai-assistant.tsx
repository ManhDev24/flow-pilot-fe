import { Card } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Bot, Send, Sparkles } from 'lucide-react'
import { useAllPerformanceData } from '@/app/modules/AdminWs/DashboardAdmin/hooks/usePerformanceQueries'
import { usePerformanceContext } from '@/app/modules/AdminWs/DashboardAdmin/context/PerformanceContext'
import { Skeleton } from "@/app/components/ui/skeleton"

export function AIAssistant() {
  const { fromDate, toDate } = usePerformanceContext()
  const { allProjectsAIAnalysis, allProjectsOverview, evaluate, isLoading } = useAllPerformanceData(fromDate, toDate)

  // Tạo nội dung động dựa trên dữ liệu từ new interface structure
  const getAIInsights = () => {
    if (!evaluate && !allProjectsAIAnalysis && !allProjectsOverview) {
      return {
        greeting: "Hello! I am your Organization Performance AI. How can I assist you with performance analysis today?",
        mainSummary: "Loading performance data...",
        insights: "Please wait while I analyze the organization-wide performance metrics."
      }
    }

    const totalEmployees = allProjectsAIAnalysis?.totalEmployees || 0
    const totalProjects = allProjectsAIAnalysis?.totalProjects || allProjectsOverview?.totalProjects || 0
    const avgQuality = allProjectsAIAnalysis?.aggregateMetrics?.avgQuality || 0
    const avgBurnout = allProjectsAIAnalysis?.aggregateMetrics?.avgBurnout || 0
    const avgCompletionRate = allProjectsOverview?.aggregateMetrics?.averageCompletionRate || 0
    const evaluateName = evaluate?.name || 'organization'

    let mainSummary = "Performance analysis completed."
    if (allProjectsAIAnalysis?.organizationSummary) {
      mainSummary = allProjectsAIAnalysis.organizationSummary
    } else if (allProjectsAIAnalysis && totalEmployees > 0) {
      mainSummary = `Organization overview: ${totalEmployees} employees across ${totalProjects} projects. Average quality score: ${avgQuality.toFixed(1)}/100, Completion rate: ${avgCompletionRate.toFixed(1)}%.`
    } else if (evaluate?.summary) {
      mainSummary = evaluate.summary
    }

    const insights = allProjectsAIAnalysis 
      ? `Key metrics: Quality at ${avgQuality.toFixed(1)}/100, Burnout level at ${avgBurnout.toFixed(1)}%. ${totalProjects} active projects with ${allProjectsAIAnalysis.aggregateMetrics?.totalCompleted || 0} completed tasks.`
      : allProjectsOverview 
        ? `Project insights: ${totalProjects} projects with ${avgCompletionRate.toFixed(1)}% average completion rate. ${allProjectsOverview.aggregateMetrics?.totalTasks || 0} total tasks.`
        : `Individual assessment: ${evaluateName} shows ${evaluate?.status === 'active' ? 'active engagement' : 'standard performance'}.`

    return {
      greeting: "Hello! I am your Organization Performance AI. I've analyzed the comprehensive performance data.",
      mainSummary,
      insights
    }
  }

  const aiContent = getAIInsights()

  return (
    <Card className='p-4 h-full flex flex-col w-full'>
      <div className='flex items-center gap-2 mb-4'>
        <Bot className='w-4 h-4 text-blue-600' />
        <h3 className='font-semibold text-gray-900'>AI Assistant</h3>
        {evaluate && (
          <Sparkles className='w-3 h-3 text-amber-500' />
        )}
      </div>

      <div className='flex-1 space-y-4 mb-4 overflow-auto'>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-16 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-12 w-2/3" />
          </div>
        ) : (
          <>
            <div className='text-sm text-gray-600'>
              {aiContent.greeting}
            </div>

            {(evaluate || allProjectsAIAnalysis || allProjectsOverview) && (
              <div className='bg-blue-600 text-white p-3 rounded-lg text-sm max-w-xs ml-auto'>
                Can you analyze the current organization performance data?
              </div>
            )}
            
            <div className='flex justify-center my-2'>
              <span className='bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded'>
                {(evaluate || allProjectsAIAnalysis || allProjectsOverview) ? 'Live Data' : 'Waiting for Data'}
              </span>
            </div>

            <div className='text-sm text-gray-600'>
              {aiContent.mainSummary}
            </div>

            {(evaluate || allProjectsAIAnalysis || allProjectsOverview) && (
              <>
                <div className='text-sm text-gray-600'>
                  {aiContent.insights}
                </div>

                <div className='bg-blue-600 text-white p-3 rounded-lg text-sm max-w-xs ml-auto'>
                  What are the key opportunities and recommendations?
                </div>

                <div className='text-sm text-gray-600'>
                  {allProjectsAIAnalysis?.organizationSummary && (
                    <>Organization Summary: {allProjectsAIAnalysis.organizationSummary}. </>
                  )}
                  {allProjectsAIAnalysis?.aggregateMetrics && (
                    <>Performance Metrics: {allProjectsAIAnalysis.aggregateMetrics.totalCompleted} tasks completed, {allProjectsAIAnalysis.aggregateMetrics.totalDelay} delayed. Quality: {allProjectsAIAnalysis.aggregateMetrics.avgQuality.toFixed(1)}/100. </>
                  )}
                  {allProjectsOverview?.aggregateMetrics && (
                    <>Project Overview: {allProjectsOverview.aggregateMetrics.totalTasks} total tasks, {allProjectsOverview.aggregateMetrics.totalCompleted} completed ({allProjectsOverview.aggregateMetrics.averageCompletionRate.toFixed(1)}%). </>
                  )}
                  {evaluate?.stressRate?.[0] && (
                    <>Individual stress analysis: {evaluate.stressRate[0]?.label} at {evaluate.stressRate[0]?.value}%. </>
                  )}
                  Would you like detailed analysis on specific metrics?
                </div>
              </>
            )}
          </>
        )}
      </div>

      <div className='mt-auto space-y-4'>
        <div className='flex gap-2'>
          <Input 
            placeholder={(evaluate || allProjectsAIAnalysis || allProjectsOverview) ? 'Ask about performance insights...' : 'Ask about organization performance...'} 
            className='flex-1 text-sm' 
          />
          <Button size='sm' className='bg-blue-600 hover:bg-blue-700'>
            <Send className='w-4 h-4' />
          </Button>
        </div>

        <div className='p-3 bg-gray-50 rounded-lg'>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center'>
              <span className='text-xs font-medium'>
                {evaluate?.name ? evaluate.name.split(' ').map(n => n[0]).join('') : 'AI'}
              </span>
            </div>
            <div>
              <p className='text-sm font-medium'>{evaluate?.name || 'AI Assistant'}</p>
              <p className='text-xs text-gray-500'>{evaluate?.position || 'Organization Performance Analyst'}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
