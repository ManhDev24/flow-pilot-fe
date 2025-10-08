import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Skeleton } from '@/app/components/ui/skeleton'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts'
import type { UsersByRoleData } from '../models/DashboardInterface'

interface UsersByRoleChartProps {
  data: UsersByRoleData[]
  loading?: boolean
}

const ROLE_COLORS: Record<string, string> = {
  SUPERADMIN: '#8b5cf6',
  ADMIN: '#3b82f6',
  MANAGER: '#10b981',
  EMPLOYEE: '#f59e0b',
  'No Role': '#6b7280'
}

function UsersByRoleChart({ data, loading }: UsersByRoleChartProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Users by System Role</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[350px] w-full" />
        </CardContent>
      </Card>
    )
  }

  const getColor = (role: string) => {
    return ROLE_COLORS[role] || '#6b7280'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users by System Role</CardTitle>
        <p className="text-sm text-muted-foreground">Distribution of users across different roles</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="role"
              className="text-sm"
              tick={{ fill: 'currentColor' }}
              tickLine={{ stroke: 'currentColor' }}
            />
            <YAxis
              className="text-sm"
              tick={{ fill: 'currentColor' }}
              tickLine={{ stroke: 'currentColor' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
              formatter={(value: number, _name: string, props: any) => [
                `${value} users (${props.payload.percentage}%)`,
                'Count'
              ]}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend />
            <Bar dataKey="count" name="Users" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.role)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default UsersByRoleChart
