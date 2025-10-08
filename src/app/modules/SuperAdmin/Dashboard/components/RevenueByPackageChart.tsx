import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Skeleton } from '@/app/components/ui/skeleton'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import type { RevenueByPackageData } from '../models/DashboardInterface'

interface RevenueByPackageChartProps {
  data: RevenueByPackageData[]
  loading?: boolean
}

function RevenueByPackageChart({ data, loading }: RevenueByPackageChartProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Package</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[350px] w-full" />
        </CardContent>
      </Card>
    )
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const renderCustomLabel = (entry: any) => {
    return `${entry.percentage}%`
  }

  const chartData = data.map((item) => ({
    ...item,
    name: item.packageName
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue by Package</CardTitle>
        <p className="text-sm text-muted-foreground">Distribution of revenue across packages</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={chartData as any}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={renderCustomLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="revenue"
              nameKey="packageName"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
              formatter={(value: number, name: string) => [formatCurrency(value), name]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry: any) => {
                const item = data.find((d) => d.packageName === entry.payload.packageName)
                return `${value} (${formatCurrency(item?.revenue || 0)})`
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default RevenueByPackageChart
