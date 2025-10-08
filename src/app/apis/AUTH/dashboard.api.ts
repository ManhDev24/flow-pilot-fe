import { UserSuperAdminAPI } from './user.api'
import { WorkspaceAPI } from './workspace.api'
import { paymentApi } from './Payment.api'
import { orderApi } from './Order.api'
import { PackageApi } from './package.api'
import type {
  DashboardMetrics,
  MonthlyRevenueData,
  RevenueByPackageData,
  UserGrowthData,
  UsersByRoleData
} from '@/app/modules/SuperAdmin/Dashboard/models/DashboardInterface'
import type { User } from '@/app/modules/SuperAdmin/UserManagement/models/UserManagementInterface'

export class DashboardAPI {
  /**
   * Get dashboard metrics
   */
  static async getDashboardMetrics(): Promise<DashboardMetrics> {
    try {
      // Fetch all required data in parallel
      const [usersResponse, workspacesResponse, paymentsResponse] = await Promise.all([
        UserSuperAdminAPI.getAllUsersInSystem(),
        WorkspaceAPI.getAllWorkspacesInSystem(),
        paymentApi.getAllPaymentsInSystem()
      ])

      const users = usersResponse.data.items || []
      const workspaces = workspacesResponse.data.data || []
      const payments = paymentsResponse.data.data || []

      // Calculate metrics
      const totalActiveUsers = users.filter((user: User) => user.status === 'active').length
      const totalInactiveUsers = users.filter((user: User) => user.status === 'inactive').length
      const totalActiveWorkspaces = workspaces.filter((ws) => ws.status === 'active').length
      const totalInactiveWorkspaces = workspaces.filter((ws) => ws.status === 'inactive').length
      const totalAdmins = users.filter((user: User) => user.role?.role === 'ADMIN').length

      // Calculate total revenue from successful payments
      const totalRevenue = payments
        .filter((payment) => payment.status === 'success')
        .reduce((sum, payment) => sum + Number(payment.amount), 0)

      return {
        totalRevenue,
        totalActiveUsers,
        totalInactiveUsers,
        totalActiveWorkspaces,
        totalInactiveWorkspaces,
        totalAdmins
      }
    } catch (error) {
      console.error('Error fetching dashboard metrics:', error)
      throw error
    }
  }

  /**
   * Get monthly revenue data for the last 12 months
   */
  static async getMonthlyRevenue(): Promise<MonthlyRevenueData[]> {
    try {
      const paymentsResponse = await paymentApi.getAllPaymentsInSystem()
      const payments = paymentsResponse.data.data || []

      // Filter successful payments
      const successfulPayments = payments.filter((payment) => payment.status === 'success')

      // Group by month
      const monthlyData = new Map<string, { revenue: number; year: number; month: string }>()

      successfulPayments.forEach((payment) => {
        const date = new Date(payment.created_at)
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        const monthName = date.toLocaleString('en-US', { month: 'short' })
        const year = date.getFullYear()

        if (!monthlyData.has(monthKey)) {
          monthlyData.set(monthKey, { revenue: 0, year, month: monthName })
        }

        const current = monthlyData.get(monthKey)!
        current.revenue += Number(payment.amount)
      })

      // Convert to array and sort by date
      const result = Array.from(monthlyData.entries())
        .map(([, data]) => ({
          month: data.month,
          revenue: Math.round(data.revenue * 100) / 100,
          year: data.year
        }))
        .sort((a, b) => {
          if (a.year !== b.year) return a.year - b.year
          const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
        })
        .slice(-12) // Last 12 months

      return result
    } catch (error) {
      console.error('Error fetching monthly revenue:', error)
      throw error
    }
  }

  /**
   * Get revenue by package
   */
  static async getRevenueByPackage(): Promise<RevenueByPackageData[]> {
    try {
      const [ordersResponse, packagesResponse, paymentsResponse] = await Promise.all([
        orderApi.getAllOrdersInSystem(),
        PackageApi.getAllPackagesInSystem(),
        paymentApi.getAllPaymentsInSystem()
      ])

      const orders = ordersResponse.data.data || []
      const packages = packagesResponse.data || []
      const payments = paymentsResponse.data.data || []

      // Create a map of payment amounts by order_id
      const paymentByOrder = new Map<string, number>()
      payments
        .filter((payment) => payment.status === 'success')
        .forEach((payment) => {
          paymentByOrder.set(payment.order_id, Number(payment.amount))
        })

      // Calculate revenue per package
      const packageRevenue = new Map<string, { name: string; revenue: number }>()

      orders.forEach((order) => {
        const packageId = order.package_id
        const paymentAmount = paymentByOrder.get(order.id) || 0

        if (!packageRevenue.has(packageId)) {
          const pkg = packages.find((p: any) => p.id === packageId)
          packageRevenue.set(packageId, {
            name: pkg?.name || 'Unknown Package',
            revenue: 0
          })
        }

        const current = packageRevenue.get(packageId)!
        current.revenue += paymentAmount
      })

      // Calculate total revenue for percentage
      const totalRevenue = Array.from(packageRevenue.values()).reduce((sum, item) => sum + item.revenue, 0)

      // Define colors for charts
      const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

      // Convert to array format
      const result = Array.from(packageRevenue.values())
        .map((item, index) => ({
          packageName: item.name,
          revenue: Math.round(item.revenue * 100) / 100,
          percentage: totalRevenue > 0 ? Math.round((item.revenue / totalRevenue) * 100) : 0,
          color: colors[index % colors.length]
        }))
        .sort((a, b) => b.revenue - a.revenue)

      return result
    } catch (error) {
      console.error('Error fetching revenue by package:', error)
      throw error
    }
  }

  /**
   * Get user growth data by month
   */
  static async getUserGrowth(): Promise<UserGrowthData[]> {
    try {
      const usersResponse = await UserSuperAdminAPI.getAllUsersInSystem()
      const users = usersResponse.data.items || []

      // Group users by month of creation
      const monthlyData = new Map<
        string,
        { activeUsers: number; inactiveUsers: number; totalUsers: number; year: number; month: string }
      >()

      users.forEach((user: User) => {
        const date = new Date(user.created_at)
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        const monthName = date.toLocaleString('en-US', { month: 'short' })
        const year = date.getFullYear()

        if (!monthlyData.has(monthKey)) {
          monthlyData.set(monthKey, {
            activeUsers: 0,
            inactiveUsers: 0,
            totalUsers: 0,
            year,
            month: monthName
          })
        }

        const current = monthlyData.get(monthKey)!
        current.totalUsers += 1
        if (user.status === 'active') {
          current.activeUsers += 1
        } else {
          current.inactiveUsers += 1
        }
      })

      // Convert to array and sort
      const result = Array.from(monthlyData.entries())
        .map(([, data]) => data)
        .sort((a, b) => {
          if (a.year !== b.year) return a.year - b.year
          const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
        })
        .slice(-12) // Last 12 months

      return result
    } catch (error) {
      console.error('Error fetching user growth:', error)
      throw error
    }
  }

  /**
   * Get users by role
   */
  static async getUsersByRole(): Promise<UsersByRoleData[]> {
    try {
      const usersResponse = await UserSuperAdminAPI.getAllUsersInSystem()
      const users = usersResponse.data.items || []

      // Count users by role
      const roleCount = new Map<string, number>()

      users.forEach((user: User) => {
        const roleName = user.role?.role || 'No Role'
        roleCount.set(roleName, (roleCount.get(roleName) || 0) + 1)
      })

      const totalUsers = users.length

      // Convert to array format
      const result = Array.from(roleCount.entries())
        .map(([role, count]) => ({
          role,
          count,
          percentage: totalUsers > 0 ? Math.round((count / totalUsers) * 100) : 0
        }))
        .sort((a, b) => b.count - a.count)

      return result
    } catch (error) {
      console.error('Error fetching users by role:', error)
      throw error
    }
  }

  /**
   * Get all dashboard data
   */
  static async getAllDashboardData() {
    try {
      const [metrics, monthlyRevenue, revenueByPackage, userGrowth, usersByRole] = await Promise.all([
        this.getDashboardMetrics(),
        this.getMonthlyRevenue(),
        this.getRevenueByPackage(),
        this.getUserGrowth(),
        this.getUsersByRole()
      ])

      return {
        metrics,
        monthlyRevenue,
        revenueByPackage,
        userGrowth,
        usersByRole
      }
    } catch (error) {
      console.error('Error fetching all dashboard data:', error)
      throw error
    }
  }
}

export default DashboardAPI
