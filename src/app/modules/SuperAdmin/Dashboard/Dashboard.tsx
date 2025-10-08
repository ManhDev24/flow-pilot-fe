import { useEffect, useState } from 'react'
import {
  DollarSign,
  UserCheck,
  UserX,
  Building,
  Building2,
  Shield
} from 'lucide-react'
import MetricCard from './components/MetricCard'
import MonthlyRevenueChart from './components/MonthlyRevenueChart'
import RevenueByPackageChart from './components/RevenueByPackageChart'
import UserGrowthChart from './components/UserGrowthChart'
import UsersByRoleChart from './components/UsersByRoleChart'
import DashboardAPI from '@/app/apis/AUTH/dashboard.api'
import type {
  DashboardMetrics,
  MonthlyRevenueData,
  RevenueByPackageData,
  UserGrowthData,
  UsersByRoleData
} from './models/DashboardInterface'
import { toast } from 'react-toastify'

function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalRevenue: 0,
    totalActiveUsers: 0,
    totalInactiveUsers: 0,
    totalActiveWorkspaces: 0,
    totalInactiveWorkspaces: 0,
    totalAdmins: 0
  })
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenueData[]>([])
  const [revenueByPackage, setRevenueByPackage] = useState<RevenueByPackageData[]>([])
  const [userGrowth, setUserGrowth] = useState<UserGrowthData[]>([])
  const [usersByRole, setUsersByRole] = useState<UsersByRoleData[]>([])

  const [chartsLoading, setChartsLoading] = useState({
    monthlyRevenue: true,
    revenueByPackage: true,
    userGrowth: true,
    usersByRole: true
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch metrics first
      const metricsData = await DashboardAPI.getDashboardMetrics()
      setMetrics(metricsData)
      setLoading(false)

      // Fetch charts data in parallel
      const [monthlyRevenueData, revenueByPackageData, userGrowthData, usersByRoleData] = await Promise.all([
        DashboardAPI.getMonthlyRevenue().finally(() =>
          setChartsLoading((prev) => ({ ...prev, monthlyRevenue: false }))
        ),
        DashboardAPI.getRevenueByPackage().finally(() =>
          setChartsLoading((prev) => ({ ...prev, revenueByPackage: false }))
        ),
        DashboardAPI.getUserGrowth().finally(() =>
          setChartsLoading((prev) => ({ ...prev, userGrowth: false }))
        ),
        DashboardAPI.getUsersByRole().finally(() =>
          setChartsLoading((prev) => ({ ...prev, usersByRole: false }))
        )
      ])

      setMonthlyRevenue(monthlyRevenueData)
      setRevenueByPackage(revenueByPackageData)
      setUserGrowth(userGrowthData)
      setUsersByRole(usersByRoleData)
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error)
      toast.error('Failed to load dashboard data')
      setLoading(false)
      setChartsLoading({
        monthlyRevenue: false,
        revenueByPackage: false,
        userGrowth: false,
        usersByRole: false
      })
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to FlowPilot SuperAdmin Dashboard</p>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(metrics.totalRevenue)}
          icon={<DollarSign className="w-6 h-6" />}
          color="#10b981"
          loading={loading}
        />
        <MetricCard
          title="Active Users"
          value={metrics.totalActiveUsers}
          icon={<UserCheck className="w-6 h-6" />}
          color="#3b82f6"
          loading={loading}
        />
        <MetricCard
          title="Inactive Users"
          value={metrics.totalInactiveUsers}
          icon={<UserX className="w-6 h-6" />}
          color="#ef4444"
          loading={loading}
        />
        <MetricCard
          title="Active Workspaces"
          value={metrics.totalActiveWorkspaces}
          icon={<Building className="w-6 h-6" />}
          color="#f59e0b"
          loading={loading}
        />
        <MetricCard
          title="Inactive Workspaces"
          value={metrics.totalInactiveWorkspaces}
          icon={<Building2 className="w-6 h-6" />}
          color="#6b7280"
          loading={loading}
        />
        <MetricCard
          title="Total Admins"
          value={metrics.totalAdmins}
          icon={<Shield className="w-6 h-6" />}
          color="#8b5cf6"
          loading={loading}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <MonthlyRevenueChart data={monthlyRevenue} loading={chartsLoading.monthlyRevenue} />
        <RevenueByPackageChart data={revenueByPackage} loading={chartsLoading.revenueByPackage} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <UserGrowthChart data={userGrowth} loading={chartsLoading.userGrowth} />
        <UsersByRoleChart data={usersByRole} loading={chartsLoading.usersByRole} />
      </div>
    </div>
  )
}

export default Dashboard