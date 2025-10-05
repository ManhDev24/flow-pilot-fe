import { useState, useEffect, useCallback, useRef } from 'react'
import { performanceApi } from '@/app/apis/AUTH/performance.api'
import type {
  AllProjectsStatsResponse,
  AllProjectsOverviewResponse,
  AllProjectsKPIResponse,
  AllProjectsAIAnalysisResponse
} from '@/app/modules/AdminWs/models/performanceInterface'

interface UseProjectsPerformanceReturn {
  projectsStats: AllProjectsStatsResponse | null
  projectsOverview: AllProjectsOverviewResponse | null
  projectsKPI: AllProjectsKPIResponse | null
  projectsAIAnalysis: AllProjectsAIAnalysisResponse | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export const useProjectsPerformance = (fromDate?: string, toDate?: string): UseProjectsPerformanceReturn => {
  const [projectsStats, setProjectsStats] = useState<AllProjectsStatsResponse | null>(null)
  const [projectsOverview, setProjectsOverview] = useState<AllProjectsOverviewResponse | null>(null)
  const [projectsKPI, setProjectsKPI] = useState<AllProjectsKPIResponse | null>(null)
  const [projectsAIAnalysis, setProjectsAIAnalysis] = useState<AllProjectsAIAnalysisResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  
  // Cache để tránh gọi API trùng lặp
  const lastParamsRef = useRef<string>('')
  const isMountedRef = useRef<boolean>(false)

  const fetchData = useCallback(async () => {
    // Serialize params để so sánh
    const paramsString = JSON.stringify({ fromDate, toDate })
    
    // Kiểm tra nếu params giống lần trước và đã có data
    if (paramsString === lastParamsRef.current && projectsStats && !loading) {
      return
    }
    
    // Cập nhật cache
    lastParamsRef.current = paramsString
    
    try {
      setLoading(true)
      setError(null)

      // Fetch all project performance APIs in parallel
      const [statsResponse, overviewResponse, kpiResponse, aiAnalysisResponse] = await Promise.all([
        performanceApi.getAllProjectsStats(fromDate, toDate),
        performanceApi.getAllProjectsOverview(fromDate, toDate),
        performanceApi.getAllProjectsKPI(fromDate, toDate),
        performanceApi.getAllProjectsAIAnalysis(fromDate, toDate)
      ])

      setProjectsStats(statsResponse)
      setProjectsOverview(overviewResponse)
      setProjectsKPI(kpiResponse)
      setProjectsAIAnalysis(aiAnalysisResponse)
    } catch (err: any) {
      console.error('Error fetching projects performance data:', err)
      setError(err?.response?.data?.message || 'Failed to fetch projects performance data')
    } finally {
      setLoading(false)
    }
  }, [fromDate, toDate, projectsStats, loading])

  useEffect(() => {
    // Chỉ gọi API nếu là lần đầu mount hoặc params thực sự thay đổi
    if (!isMountedRef.current) {
      isMountedRef.current = true
      fetchData()
    } else {
      const paramsString = JSON.stringify({ fromDate, toDate })
      if (paramsString !== lastParamsRef.current) {
        fetchData()
      }
    }
  }, [fetchData, fromDate, toDate])

  return {
    projectsStats,
    projectsOverview,
    projectsKPI,
    projectsAIAnalysis,
    loading,
    error,
    refetch: fetchData
  }
}