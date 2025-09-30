import * as React from 'react'
import { cn } from '@/app/components/lib/utils'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
}

function Progress({ className, value = 0, max = 100, ...props }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div
      data-slot='progress'
      className={cn('relative h-2 w-full overflow-hidden rounded-full bg-secondary', className)}
      {...props}
    >
      <div
        data-slot='progress-indicator'
        className='h-full bg-primary transition-all duration-500 ease-out'
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

export { Progress }
