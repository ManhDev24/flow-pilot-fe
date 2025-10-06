import { useQuery } from '@tanstack/react-query'
import { MyTaskApi } from '@/app/apis/AUTH/performance.api'
import type {
  AllProjectsStatsResponse,
  AllProjectsOverviewResponse,
  AllProjectsKPIResponse,
  AllProjectsAIAnalysisResponse,
  OrganizationPerformanceSummaryResponse,
  EvaluateResponse
} from '@/app/modules/AdminWs/models/performanceInterface'

// Keys cho React Query cache
export const performanceQueryKeys = {
  allProjectsStats: (fromDate?: string, toDate?: string) =>
    ['performance', 'all-projects-stats', fromDate, toDate] as const,
  allProjectsOverview: (fromDate?: string, toDate?: string) =>
    ['performance', 'all-projects-overview', fromDate, toDate] as const,
  allProjectsKPI: (fromDate?: string, toDate?: string) =>
    ['performance', 'all-projects-kpi', fromDate, toDate] as const,
  allProjectsAIAnalysis: (fromDate?: string, toDate?: string) =>
    ['performance', 'all-projects-ai-analysis', fromDate, toDate] as const,
  organizationSummary: (fromDate?: string, toDate?: string) =>
    ['performance', 'organization-summary', fromDate, toDate] as const,
  evaluate: () => ['performance', 'evaluate'] as const
}

// Hook để lấy thống kê tất cả dự án
export const useAllProjectsStats = (fromDate?: string, toDate?: string) => {
  return useQuery<AllProjectsStatsResponse>({
    queryKey: performanceQueryKeys.allProjectsStats(fromDate, toDate),
    queryFn: () => MyTaskApi.getAllProjectsStats(fromDate, toDate),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  })
}

// Hook để lấy tổng quan tất cả dự án
export const useAllProjectsOverview = (fromDate?: string, toDate?: string) => {
  return useQuery<AllProjectsOverviewResponse>({
    queryKey: performanceQueryKeys.allProjectsOverview(fromDate, toDate),
    queryFn: () => MyTaskApi.getAllProjectsOverview(fromDate, toDate),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  })
}

// Hook để lấy KPI tất cả dự án
export const useAllProjectsKPI = (fromDate?: string, toDate?: string) => {
  return useQuery<AllProjectsKPIResponse>({
    queryKey: performanceQueryKeys.allProjectsKPI(fromDate, toDate),
    queryFn: () => MyTaskApi.getAllProjectsKPI(fromDate, toDate),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  })
}

// Hook để lấy phân tích AI tất cả dự án
export const useAllProjectsAIAnalysis = (fromDate?: string, toDate?: string) => {
  return useQuery<AllProjectsAIAnalysisResponse>({
    queryKey: performanceQueryKeys.allProjectsAIAnalysis(fromDate, toDate),
    queryFn: () => MyTaskApi.getAllProjectsAIAnalysis(fromDate, toDate),
    staleTime: 10 * 60 * 1000, // 10 minutes (AI analysis có thể cache lâu hơn)
    retry: 2
  })
}

// Hook để lấy báo cáo tổng hợp tổ chức
export const useOrganizationPerformanceSummary = (fromDate?: string, toDate?: string) => {
  return useQuery<OrganizationPerformanceSummaryResponse>({
    queryKey: performanceQueryKeys.organizationSummary(fromDate, toDate),
    queryFn: () => MyTaskApi.getOrganizationPerformanceSummary(fromDate, toDate),
    staleTime: 15 * 60 * 1000, // 15 minutes (báo cáo tổng hợp cache lâu nhất)
    retry: 2
  })
}

// Hook để lấy dữ liệu đánh giá (không phụ thuộc vào date range)
export const useEvaluateData = () => {
  return useQuery<EvaluateResponse>({
    queryKey: performanceQueryKeys.evaluate(),
    queryFn: () => MyTaskApi.getEvaluate(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  })
}

// Hook tổng hợp để lấy tất cả dữ liệu performance cần thiết
export const useAllPerformanceData = (fromDate?: string, toDate?: string) => {
  const statsQuery = useAllProjectsStats(fromDate, toDate)
  const overviewQuery = useAllProjectsOverview(fromDate, toDate)
  const kpiQuery = useAllProjectsKPI(fromDate, toDate)
  const aiAnalysisQuery = useAllProjectsAIAnalysis(fromDate, toDate)
  const evaluateQuery = useEvaluateData()

  return {
    // Dữ liệu
    allProjectsStats: statsQuery.data?.data,
    allProjectsOverview: overviewQuery.data?.data,
    allProjectsKPI: kpiQuery.data?.data,
    allProjectsAIAnalysis: aiAnalysisQuery.data?.data,
    evaluate: evaluateQuery.data?.data,

    // Trạng thái loading
    isLoading:
      statsQuery.isLoading ||
      overviewQuery.isLoading ||
      kpiQuery.isLoading ||
      aiAnalysisQuery.isLoading ||
      evaluateQuery.isLoading,

    // Trạng thái lỗi
    isError:
      statsQuery.isError ||
      overviewQuery.isError ||
      kpiQuery.isError ||
      aiAnalysisQuery.isError ||
      evaluateQuery.isError,

    // Lỗi chi tiết
    errors: {
      stats: statsQuery.error,
      overview: overviewQuery.error,
      kpi: kpiQuery.error,
      aiAnalysis: aiAnalysisQuery.error,
      evaluate: evaluateQuery.error
    },

    // Hàm refetch
    refetch: () => {
      statsQuery.refetch()
      overviewQuery.refetch()
      kpiQuery.refetch()
      aiAnalysisQuery.refetch()
      evaluateQuery.refetch()
    },

    // Các query objects để có thể sử dụng các features khác của React Query
    queries: {
      statsQuery,
      overviewQuery,
      kpiQuery,
      aiAnalysisQuery,
      evaluateQuery
    }
  }
}
