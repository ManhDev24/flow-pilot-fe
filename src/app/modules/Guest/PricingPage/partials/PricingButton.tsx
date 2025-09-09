import { cn } from '@/app/components/lib/utils'
import { Button } from '@/app/components/ui/button'
import type { PricingButtonProps } from '../models'

const colorVariants = {
  blue: 'bg-blue-600 hover:bg-blue-700 text-white',
  purple: 'bg-purple-600 hover:bg-purple-700 text-white',
  orange: 'bg-orange-600 hover:bg-orange-700 text-white',
  red: 'bg-red-600 hover:bg-red-700 text-white'
}

export function PricingButton({ children, color, className, onClick }: PricingButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        'font-semibold py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105',
        colorVariants[color],
        className
      )}
    >
      {children}
    </Button>
  )
}
