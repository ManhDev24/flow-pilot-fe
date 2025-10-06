import { cn } from '@/app/components/lib/utils'
import { Button } from '@/app/components/ui/button'
import type { PricingButtonProps } from '../models'

export function PricingButton({ children, color, className, onClick }: PricingButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        'font-semibold py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105',
        className,
        color
      )}
    >
      {children}
    </Button>
  )
}
