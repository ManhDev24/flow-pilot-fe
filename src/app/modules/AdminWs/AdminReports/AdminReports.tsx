import { ChartsGridForReports } from '@/app/modules/AdminWs/AdminReports/partials/charts-grid'
import { MetricsCardsForReports } from '@/app/modules/AdminWs/AdminReports/partials/metrics-cards'

const AdminReports = () => {
  return (
    <div className='flex-1 space-y-6 p-6'>
      <MetricsCardsForReports />
      <ChartsGridForReports />
    </div>
  )
}

export default AdminReports
