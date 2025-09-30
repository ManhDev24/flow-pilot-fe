import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Progress } from '@/app/components/ui/progress'
import { Button } from '@/app/components/ui/button'

export function StorageUsage() {
  const usedStorage = 75 // GB
  const totalStorage = 100 // GB
  const usagePercentage = (usedStorage / totalStorage) * 100

  return (
    <Card className='bg-card border-border'>
      <CardHeader className='pb-4'>
        <CardTitle className='text-lg font-semibold text-foreground'>Storage Usage</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Storage Amount */}
        <div className='text-center'>
          <div className='text-3xl font-bold text-primary mb-1'>{usedStorage} GB</div>
          <div className='text-sm text-muted-foreground'>of {totalStorage}GB used</div>
        </div>

        {/* Progress Bar */}
        <div className='space-y-2'>
          <Progress value={usagePercentage} className='h-2' />
          <div className='flex justify-between text-xs text-muted-foreground'>
            <span>0 GB</span>
            <span>{totalStorage} GB</span>
          </div>
        </div>

        {/* Manage Storage Button */}
        <Button variant='outline' className='w-full mt-4' onClick={() => console.log('Manage storage clicked')}>
          Manage Storage
        </Button>
      </CardContent>
    </Card>
  )
}
