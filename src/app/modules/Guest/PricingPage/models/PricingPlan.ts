export interface PricingCardProps {
  name: string
  price: number
  period: string
  users: string
  usage: string
  features: string[]
  buttonText: string
  buttonColor: 'blue' | 'purple' | 'orange' | 'red'
  featured?: boolean
}

export interface PricingButtonProps {
  children: React.ReactNode
  color: 'blue' | 'purple' | 'orange' | 'red'
  className?: string
  onClick?: () => void
}
