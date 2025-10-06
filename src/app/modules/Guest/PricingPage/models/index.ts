export interface GetAllPackagesResponse  {
  success: boolean
  message: string
  data: {
    data: Package[]
    total: number
    page: number
    limit: number
  }
}

export interface Package {
  id: string
  name: string
  duration_in_months: number
  price: number
  description: string
  created_at: string
  updated_at: string
  status: 'active' | 'inactive'
  features: Feature[]
}

export interface Feature {
  id: string
  name: string
  description: string
  package_id: string
  created_at: string
  updated_at: string
  status: 'active' | 'inactive'
}

export interface PricingButtonProps {
  children: React.ReactNode
  color: string
  className?: string
  onClick?: () => void
}

export interface PricingCardProps {
  key?: string | number
  packageId: string
  name: string
  price: number
  period: string
  users: string
  usage: string
  features: string[]
  buttonText: string
  buttonColor: string
  featured?: boolean
  bgClass?: string
}