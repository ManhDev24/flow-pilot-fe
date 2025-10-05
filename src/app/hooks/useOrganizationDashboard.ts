import { useState, useEffect, useCallback, useRef } from 'react'
import { performanceApi } from '@/app/apis/AUTH/performance.api'
import type {
  OrganizationDashboardSummary,
  ProjectsAIAnalysis,
  OrganizationPerformanceEvaluation,
  DashboardFilters
} from '@/app/modules/AdminWs/models/performanceInterface'

interface UseOrganizationDashboardReturn {
  dashboardData: OrganizationDashboardSummary | null
  aiAnalysis: ProjectsAIAnalysis | null
  evaluation: OrganizationPerformanceEvaluation | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export const useOrganizationDashboard = (filters?: DashboardFilters): UseOrganizationDashboardReturn => {
  const [dashboardData, setDashboardData] = useState<OrganizationDashboardSummary | null>(null)
  const [aiAnalysis, setAiAnalysis] = useState<ProjectsAIAnalysis | null>(null)
  const [evaluation, setEvaluation] = useState<OrganizationPerformanceEvaluation | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  
  // Cache để tránh gọi API trùng lặp
  const lastFiltersRef = useRef<string>('')
  const isMountedRef = useRef<boolean>(false)

  const fetchData = useCallback(async () => {
    // Serialize filters để so sánh
    const filtersString = JSON.stringify(filters || {})
    
    // Kiểm tra nếu filters giống lần trước và đã có data
    if (filtersString === lastFiltersRef.current && dashboardData && !loading) {
      return
    }
    
    // Cập nhật cache
    lastFiltersRef.current = filtersString
    
    try {
      setLoading(true)
      setError(null)

      // Fetch all three APIs in parallel
      const [dashboardResponse, aiAnalysisResponse, evaluationResponse] = await Promise.all([
        performanceApi.getOrganizationDashboardSummary(filters),
        performanceApi.getProjectsAIAnalysis(filters),
        performanceApi.getOrganizationPerformanceEvaluation(filters)
      ])

      setDashboardData(dashboardResponse.data)
      setAiAnalysis(aiAnalysisResponse.data)
      setEvaluation(evaluationResponse.data)
    } catch (err: any) {
      console.error('Error fetching organization dashboard data:', err)
      setError(err?.response?.data?.message || 'Failed to fetch dashboard data')
    } finally {
      setLoading(false)
    }
  }, [filters, dashboardData, loading])

  useEffect(() => {
    // Chỉ gọi API nếu là lần đầu mount hoặc filters thực sự thay đổi
    if (!isMountedRef.current) {
      isMountedRef.current = true
      fetchData()
    } else {
      const filtersString = JSON.stringify(filters || {})
      if (filtersString !== lastFiltersRef.current) {
        fetchData()
      }
    }
  }, [fetchData, filters])

  return {
    dashboardData,
    aiAnalysis,
    evaluation,
    loading,
    error,
    refetch: fetchData
  }
}