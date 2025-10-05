import { fetcher } from '@/app/apis/fetcher'
import type {
  AllProjectsAIAnalysisResponse,
  AllProjectsKPIResponse,
  AllProjectsOverviewResponse,
  AllProjectsStatsResponse,
  APIResponse,
  DashboardFilters,
  EvaluateResponse,
  OrganizationDashboardSummary,
  OrganizationPerformanceEvaluation,
  OrganizationPerformanceSummaryResponse,
  ProjectKpiResponse,
  ProjectOverviewResponse,
  ProjectsAIAnalysis
} from '@/app/modules/AdminWs/models/performanceInterface'
import type { PerformanceResponse } from '@/app/modules/Employee/MyPerformance/models/perfomance.type'
import type { AxiosError, AxiosResponse } from 'axios'

export const performanceApi = {
  getProjectKpi: async (projectId: string): Promise<ProjectKpiResponse> => {
    try {
      const response = await fetcher.get(`/performance/project-kpi?projectId=${projectId}`)
      return response.data as ProjectKpiResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  getEvaluate: async (): Promise<EvaluateResponse> => {
    try {
      const response = await fetcher.get(`/performance/evaluate`)
      return response.data as EvaluateResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  getProjectOverview: async (projectId: string): Promise<ProjectOverviewResponse> => {
    try {
      const response = await fetcher.get(`/performance/project-overview?projectId=${projectId}`)
      return response.data as ProjectOverviewResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  getProjectMembers: async (projectId: string) => {
    try {
      const response = await fetcher.get(`/performance/project-members?projectId=${projectId}`)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },

  // Thống kê tổng hợp của tất cả dự án
  getAllProjectsStats: async (fromDate?: string, toDate?: string): Promise<AllProjectsStatsResponse> => {
    try {
      let url = '/performance/all-projects-stats'
      const params = new URLSearchParams()
      if (fromDate) params.append('fromDate', fromDate)
      if (toDate) params.append('toDate', toDate)
      if (params.toString()) url += `?${params.toString()}`

      const response = await fetcher.get(url)
      return response.data as AllProjectsStatsResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },

  // Tổng quan hiệu suất trung bình của tất cả dự án
  getAllProjectsOverview: async (fromDate?: string, toDate?: string): Promise<AllProjectsOverviewResponse> => {
    try {
      let url = '/performance/all-projects-overview'
      const params = new URLSearchParams()
      if (fromDate) params.append('fromDate', fromDate)
      if (toDate) params.append('toDate', toDate)
      if (params.toString()) url += `?${params.toString()}`

      const response = await fetcher.get(url)
      return response.data as AllProjectsOverviewResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },

  // KPI trung bình của tất cả dự án
  getAllProjectsKPI: async (fromDate?: string, toDate?: string): Promise<AllProjectsKPIResponse> => {
    try {
      let url = '/performance/all-projects-kpi'
      const params = new URLSearchParams()
      if (fromDate) params.append('fromDate', fromDate)
      if (toDate) params.append('toDate', toDate)
      if (params.toString()) url += `?${params.toString()}`

      const response = await fetcher.get(url)
      return response.data as AllProjectsKPIResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },

  // Phân tích hiệu suất tổng hợp tất cả dự án bằng AI
  getAllProjectsAIAnalysis: async (fromDate?: string, toDate?: string): Promise<AllProjectsAIAnalysisResponse> => {
    try {
      let url = '/performance/all-projects-ai-analysis'
      const params = new URLSearchParams()
      if (fromDate) params.append('fromDate', fromDate)
      if (toDate) params.append('toDate', toDate)
      if (params.toString()) url += `?${params.toString()}`

      const response = await fetcher.get(url)
      console.log('response: ', response)
      return response.data as AllProjectsAIAnalysisResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },

  // Báo cáo hiệu suất tổng hợp của toàn tổ chức
  getOrganizationPerformanceSummary: async (
    fromDate?: string,
    toDate?: string
  ): Promise<OrganizationPerformanceSummaryResponse> => {
    try {
      let url = '/performance/organization-performance-summary'
      const params = new URLSearchParams()
      if (fromDate) params.append('fromDate', fromDate)
      if (toDate) params.append('toDate', toDate)
      if (params.toString()) url += `?${params.toString()}`

      const response = await fetcher.get(url)
      return response.data as OrganizationPerformanceSummaryResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },

  // Tổng quan dashboard hiệu suất tổ chức
  getOrganizationDashboardSummary: async (
    filters?: DashboardFilters
  ): Promise<APIResponse<OrganizationDashboardSummary>> => {
    try {
      let url = '/performance/organization-dashboard-summary'
      const params = new URLSearchParams()

      if (filters?.period) params.append('period', filters.period)
      if (filters?.fromDate) params.append('fromDate', filters.fromDate)
      if (filters?.toDate) params.append('toDate', filters.toDate)
      if (filters?.department) params.append('department', filters.department)

      if (params.toString()) url += `?${params.toString()}`

      const response = await fetcher.get(url)
      return response.data as APIResponse<OrganizationDashboardSummary>
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },

  // Phân tích AI về hiệu suất các dự án
  getProjectsAIAnalysis: async (filters?: DashboardFilters): Promise<APIResponse<ProjectsAIAnalysis>> => {
    try {
      let url = '/performance/projects-ai-analysis'
      const params = new URLSearchParams()

      if (filters?.fromDate) params.append('fromDate', filters.fromDate)
      if (filters?.toDate) params.append('toDate', filters.toDate)
      if (filters?.projectId) params.append('projectId', filters.projectId)

      if (params.toString()) url += `?${params.toString()}`

      const response = await fetcher.get(url)
      return response.data as APIResponse<ProjectsAIAnalysis>
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },

  // Đánh giá hiệu suất tổ chức chi tiết
  getOrganizationPerformanceEvaluation: async (
    filters?: DashboardFilters
  ): Promise<APIResponse<OrganizationPerformanceEvaluation>> => {
    try {
      let url = '/performance/organization-evaluation'
      const params = new URLSearchParams()

      if (filters?.period) params.append('period', filters.period)
      if (filters?.fromDate) params.append('fromDate', filters.fromDate)
      if (filters?.toDate) params.append('toDate', filters.toDate)
      if (filters?.department) params.append('department', filters.department)

      if (params.toString()) url += `?${params.toString()}`

      const response = await fetcher.get(url)
      return response.data as APIResponse<OrganizationPerformanceEvaluation>
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  }
}

export const MyTaskApi = {
  getMyPerformance: async (userId: string, date: string) => {
    try {
      const response: AxiosResponse<PerformanceResponse> = await fetcher.get(
        `/performance/dashboard-summary/${userId}`,
        {
          params: { date }
        }
      )
      return response.data as PerformanceResponse
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  postFocusTime: async (focused_minutes: number) => {
    try {
      const response: AxiosResponse = await fetcher.post(`/focus-log`, {
        focused_minutes
      })
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  }
}
