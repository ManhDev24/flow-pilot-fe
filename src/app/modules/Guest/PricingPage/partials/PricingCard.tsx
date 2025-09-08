import { Card, CardContent, CardHeader } from '@/app/components/ui/card'
import { PricingButton } from './PricingButton'
import { cn } from '@/app/components/lib/utils'
import type { PricingCardProps } from '../models'

export function PricingCard(props: PricingCardProps) {
  const { name, price, period, users, usage, features, buttonText, buttonColor, featured = false } = props
  return (
    <Card
      className={cn(
        'relative h-full flex flex-col transition-all duration-200 hover:shadow-lg',
        featured ? 'border border-purple-500 shadow-lg sm:border-2 sm:scale-105 sm:hover:scale-105' : '',
        'px-2 py-4 sm:px-4 sm:py-6',
        'w-full',
        'mx-auto',
  'lg:w-[280px]',
        'mb-6 lg:mb-0'
      )}
    >
      <CardHeader className='text-center pb-2 sm:pb-4'>
        <h3
          className={cn('text-base sm:text-lg font-bold tracking-wide', featured ? 'text-purple-600' : 'text-blue-600')}
        >
          {name}
        </h3>

        <div className='mt-2 sm:mt-4'>
          <span className='text-2xl sm:text-4xl font-bold text-foreground'>${price}</span>
          <span className='text-xs sm:text-sm text-muted-foreground ml-1'>/{period}</span>
        </div>

        <p className='text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2'>{users}</p>
      </CardHeader>

      <CardContent className='pt-0 flex flex-col flex-1'>
        <div className='mb-4 sm:mb-6'>
          <h4 className='text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-4 tracking-wide'>{usage}</h4>

          <ul className='space-y-2 sm:space-y-3'>
            {features.map((feature, index) => (
              <li key={index} className='text-xs sm:text-sm text-muted-foreground leading-relaxed'>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className='mt-auto'>
          <PricingButton color={buttonColor} className='w-full'>
            {buttonText}
          </PricingButton>
        </div>
      </CardContent>
    </Card>
  )
}
