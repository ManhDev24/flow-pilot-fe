import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Progress } from '@/app/components/ui/progress'
import { Button } from '@/app/components/ui/button'
import { Skeleton } from '@/app/components/ui/skeleton'
import { MyTaskApi } from '@/app/apis/AUTH/file.api'

export function StorageUsage() {
  const [loading, setLoading] = useState(true)
  const [usedStorage, setUsedStorage] = useState(0)
  const totalStorage = 100 // GB - fixed limit

  useEffect(() => {
    const fetchStorageUsage = async () => {
      try {
        setLoading(true)
        const response = await MyTaskApi.getMyFile()

        if (response?.data?.items) {
          // Calculate total file size in GB
          const totalBytes = response.data.items.reduce((sum, file) => sum + file.file_size, 0)
          const totalGB = Number((totalBytes / (1024 * 1024 * 1024)).toFixed(1))
          setUsedStorage(totalGB)
        }
      } catch (error) {
        console.error('Error fetching storage usage:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStorageUsage()
  }, [])

  const usagePercentage = (usedStorage / totalStorage) * 100

  if (loading) {
    return (
      <Card className='bg-card border-border'>
        <CardHeader className='pb-4'>
          <CardTitle className='text-lg font-semibold text-foreground'>Storage Usage</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='text-center space-y-2'>
            <Skeleton className='h-8 w-20 mx-auto' />
            <Skeleton className='h-4 w-24 mx-auto' />
          </div>
          <Skeleton className='h-2 w-full' />
          <Skeleton className='h-10 w-full' />
        </CardContent>
      </Card>
    )
  }

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
