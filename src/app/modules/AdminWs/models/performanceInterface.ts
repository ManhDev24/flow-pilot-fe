// --kpi-- //

export interface ProjectKpiResponse {
  message: string
  data: ProjectKpiData
}

export interface ProjectKpiData {
  projectId: string
  process: number
  completionRate: number
  completedTasks: number
  inProgressTasks: number
  kpiValue: number
}

// --evaluate-- //

export interface EvaluateResponse {
  success: boolean
  message: string
  data: EvaluateData
}

export interface EvaluateData {
  summary: string
  stressRate: StressRate[]
  workPerformance: WorkPerformance[]
  stressAnalyzing: StressAnalyzing[]
  status: string
  joined: string
  name: string
  position: string
  department: string
}

export interface StressRate {
  label: string
  value: number
}

export interface WorkPerformance {
  label: string
  value: number
}

export interface StressAnalyzing {
  label: string
  data: any[]
}

// --project-overview-- //

export interface ProjectOverviewResponse {
  message: string
  data: ProjectOverviewData
}

export interface ProjectOverviewData {
  project: Project
  totalTasks: number
  completedTasks: number
  overdueTasks: number
  inProgressTasks: number
  completionRate: number
}

export interface Project {
  id: string
  name: string
  description: any
  start_date: string
  end_date: string
  process: number
  team_size: any
  status: string
}

// --project-members-- //

export interface ProjectMembersResponse {
  message: string
  data: Member[]
}

export interface Member {
  id: string
  name: string
  avatar_url: any
  job_title: string
  status: string
  assignedTasks: number
  completedTasks: number
  overdueTasks: number
  avgQuality: any
}

/**
 * INTERFACES CHÍNH XÁC DỰA TRÊN CODE THỰC TẾ
 * Updated: 2025-10-04
 */

/**
 * 1. GET /performance/all-projects-stats
 */
export interface AllProjectsStatsResponse {
  success: boolean
  message: string // "All projects stats fetched successfully"
  data: {
    period: string // "2025-09-04 to 2025-10-04"
    totalProjects: number
    totalProjectTasks: number
    totalCompletedTasks: number
    overallCompletionRate: number // Rounded to 2 decimal places
    projectStats: {
      projectId: string
      projectName: string
      totalTasks: number
      completedTasks: number
      completionRate: number // Rounded to 2 decimal places
      status: string
      process: number // Project process || 0
    }[]
  }
}

/**
 * 2. GET /performance/all-projects-overview
 */
export interface AllProjectsOverviewResponse {
  success: boolean
  message: string // "All projects overview fetched successfully"
  data: {
    period: string // "2025-09-04 to 2025-10-04"
    totalProjects: number
    aggregateMetrics: {
      totalTasks: number
      totalCompleted: number
      totalOverdue: number
      totalInProgress: number
      averageCompletionRate: number // Rounded to 2 decimal places
    }
    projectOverviews: {
      projectId: string
      projectName: string
      overview: any // Data from getProjectOverview method
    }[]
  }
}

/**
 * 3. GET /performance/all-projects-kpi
 */
export interface AllProjectsKPIResponse {
  success: boolean
  message: string // "All projects KPI fetched successfully"
  data: {
    period: string // "2025-09-04 to 2025-10-04"
    totalProjects: number
    aggregateKpi: {
      totalKpiValue: number // Rounded to 2 decimal places
      averageProcess: number // Rounded to 2 decimal places
      averageCompletionRate: number // Rounded to 2 decimal places
    }
    projectKpis: {
      projectId: string
      projectName: string
      kpi: any // Data from getProjectKpi method
    }[]
  }
}

/**
 * 4. GET /performance/all-projects-ai-analysis
 * ✅ CHÍNH XÁC 100% - ĐÃ VERIFY
 */
export interface AllProjectsAIAnalysisResponse {
  success: boolean
  message: string // "All projects AI analysis fetched successfully"
  data: {
    period: string // "2025-09-04 to 2025-10-04"
    totalProjects: number
    totalEmployees: number
    organizationSummary: string // AI generated summary
    aggregateMetrics: {
      totalCompleted: number
      totalDelay: number
      avgBurnout: number // Rounded to 2 decimal places
      avgQuality: number // Rounded to 2 decimal places
    }
  }
}

/**
 * 5. GET /performance/organization-performance-summary
 */
export interface OrganizationPerformanceSummaryResponse {
  success: boolean
  message: string // "Organization performance summary fetched successfully"
  data: {
    period: string // "2025-09-04 to 2025-10-04"
    summary: {
      projects: {
        total: number
        overallCompletionRate: number
        totalTasks: number
        completedTasks: number
      }
      employees: {
        total: number
        averageCompletionRate: number
        averageDeadlineAdherence: number
        totalThroughput: number
      }
      kpi: {
        totalKpiValue: number
        averageProcess: number
      }
    }
    detailedData: {
      projectsStats: AllProjectsStatsResponse['data'] // Reference to #1
      projectsOverview: AllProjectsOverviewResponse['data'] // Reference to #2
      employeeMetrics: {
        taskCompletion: any // Data from getAverageTaskCompletionRate
        deadlineAdherence: any // Data from getAverageDeadlineAdherence
        throughput: any // Data from getTotalThroughput
      }
    }
  }
}


/**
 * 1. ORGANIZATION PERFORMANCE SUMMARY API
 * GET /performance/organization-performance-summary
 * Dành cho toàn bộ dashboard với tất cả metrics
 */
export interface OrganizationDashboardSummary {
  // Metrics tổng quan (4 ô trên cùng)
  totalEmployees: number // 2,350
  activeAccountScore: number // 3.7/10
  roleAssignPercentage: number // 92%
  newHiresPercentage: number // 78%

  // Thông tin thời gian
  period: string // "monthly", "quarterly"
  lastUpdated: string // ISO date string

  // Employee Role Distribution (Biểu đồ tròn)
  employeeRoleDistribution: {
    softwareEngineer: number // 65% (1527.5 người)
    productManager: number // 25% (587.5 người)
    designer: number // 10% (235 người)
  }

  // Account Status Over Time (Biểu đồ đường)
  accountStatusOverTime: Array<{
    month: string // "Jan", "Feb", "Mar"...
    active: number // Số lượng active
    inactive: number // Số lượng inactive
    pending: number // Số lượng pending
  }>

  // Employee Growth Trends (Biểu đồ cột)
  employeeGrowthTrends: Array<{
    quarter: string // "Q1 2023", "Q2 2023"...
    newHires: number // Cột xanh - số người tuyển mới
    departures: number // Cột hồng - số người nghỉ việc
    netGrowth: number // new hires - departures
  }>

  // Top 5 Active Roles (Biểu đồ thanh ngang)
  topActiveRoles: Array<{
    roleName: string // "Software Engineer", "Product Manager"...
    count: number // 65, 45, 35, 25, 15
    percentage: number // % so với tổng
  }>

  // Metadata
  hrManager: {
    name: string // "John Doe"
    title: string // "HR Manager"
  }
}

/**
 * 2. ALL PROJECTS AI ANALYSIS API
 * GET /performance/all-projects-ai-analysis
 * Phân tích AI về hiệu suất tổng thể
 */
export interface ProjectsAIAnalysis {
  // AI Generated insights
  aiSummary: string // Tóm tắt phân tích của AI
  overallScore: number // 3.7/10 (điểm tổng thể)

  // Detailed analysis
  performanceInsights: {
    strengths: string[] // Điểm mạnh
    weaknesses: string[] // Điểm yếu
    recommendations: string[] // Khuyến nghị cải thiện
  }

  // Trend analysis
  trendAnalysis: {
    growthTrend: 'increasing' | 'decreasing' | 'stable'
    retentionRate: number // 92% role assign
    recruitmentEfficiency: number // 78% new hires success
  }

  // Risk assessment
  riskFactors: Array<{
    factor: string // "High turnover in Q1"
    severity: 'low' | 'medium' | 'high'
    impact: string // Mô tả tác động
  }>

  generatedAt: string // Thời gian tạo báo cáo
}

/**
 * 3. EVALUATE ORGANIZATION PERFORMANCE API
 * GET /performance/evaluate
 * Đánh giá hiệu suất chi tiết của tổ chức
 */
export interface OrganizationPerformanceEvaluation {
  // Overall evaluation score
  overallPerformanceScore: number // 0-10 scale
  evaluationPeriod: {
    from: string // ISO date
    to: string // ISO date
    periodType: 'monthly' | 'quarterly' | 'yearly'
  }

  // Detailed metrics breakdown
  metricsBreakdown: {
    employeeProductivity: {
      score: number // 0-10
      metrics: {
        taskCompletionRate: number // %
        deadlineAdherence: number // %
        qualityScore: number // 0-10
      }
    }

    organizationalHealth: {
      score: number // 0-10
      metrics: {
        employeeRetention: number // 92%
        newHireIntegration: number // 78%
        roleDistributionBalance: number // Score based on distribution
      }
    }

    growthMetrics: {
      score: number // 0-10
      metrics: {
        headcountGrowth: number // % growth
        departmentExpansion: number // Number of new departments
        skillDiversification: number // Skill variety score
      }
    }
  }

  // Comparative analysis
  benchmarking: {
    industryAverage: number // So sánh với trung bình ngành
    previousPeriod: number // So sánh với kỳ trước
    targetGoals: number // So sánh với mục tiêu đề ra
  }

  // Action items
  actionItems: Array<{
    priority: 'high' | 'medium' | 'low'
    category: string // "recruitment", "retention", "productivity"
    action: string // Hành động cần thực hiện
    expectedImpact: string // Tác động mong đợi
    timeline: string // Thời gian thực hiện
  }>
}

// ====================================
// UTILITY TYPES
// ====================================

export interface DashboardFilters {
  period?: 'monthly' | 'quarterly' | 'yearly'
  fromDate?: string
  toDate?: string
  department?: string
  projectId?: string
}

export interface APIResponse<T> {
  success: boolean
  data: T
  message: string
  timestamp: string
}
