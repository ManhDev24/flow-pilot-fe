// Dashboard Metrics Interfaces
export interface DashboardMetrics {
  totalRevenue: number
  totalActiveUsers: number
  totalInactiveUsers: number
  totalActiveWorkspaces: number
  totalInactiveWorkspaces: number
  totalAdmins: number
}

// Monthly Revenue Chart Data
export interface MonthlyRevenueData {
  month: string
  revenue: number
  year: number
}

// Revenue by Package Chart Data
export interface RevenueByPackageData {
  packageName: string
  revenue: number
  percentage: number
  color: string
}

// User Growth Chart Data
export interface UserGrowthData {
  month: string
  activeUsers: number
  inactiveUsers: number
  totalUsers: number
  year: number
}

// Users by Role Chart Data
export interface UsersByRoleData {
  role: string
  count: number
  percentage: number
}

// API Response Interfaces
export interface DashboardDataResponse {
  success: boolean
  message: string
  data: {
    metrics: DashboardMetrics
    monthlyRevenue: MonthlyRevenueData[]
    revenueByPackage: RevenueByPackageData[]
    userGrowth: UserGrowthData[]
    usersByRole: UsersByRoleData[]
  }
}

// Metric Card Props
export interface MetricCardProps {
  title: string
  value: number | string
  icon: React.ReactNode
  trend?: number
  trendDirection?: 'up' | 'down'
  color: string
  loading?: boolean
}
