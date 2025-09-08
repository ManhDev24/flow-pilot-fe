import { PricingCard } from './partials/PricingCard'

import type { PricingCardProps } from './models/PricingPlan'

const pricingPlans: Omit<PricingCardProps, 'key'>[] = [
  {
    name: 'INDIVIDUALS',
    price: 10,
    period: 'Month',
    users: 'Limited users',
    usage: 'PERSONAL USAGE',
    features: [
      'Basic task and project management',
      'Personal dashboard',
      'Limited file storage',
      'Email support',
      'Access on web and mobile'
    ],
    buttonText: 'GET STARTED',
    buttonColor: 'blue',
    featured: false
  },
  {
    name: 'PRO',
    price: 100,
    period: 'Month',
    users: 'Limited users',
    usage: 'PROFESSIONAL USAGE',
    features: [
      'All Individual features',
      'Advanced analytics',
      'Priority email support',
      'Customizable workflows',
      '500GB file storage'
    ],
    buttonText: 'GET STARTED',
    buttonColor: 'purple',
    featured: true
  },
  {
    name: 'BUSINESS',
    price: 150,
    period: 'Month',
    users: 'Limited users',
    usage: 'AGENCY OR TEAM',
    features: [
      'All Pro features',
      'Team collaboration tools',
      'Role-based access control',
      '1TB file storage',
      'Dedicated onboarding support'
    ],
    buttonText: 'GET STARTED',
    buttonColor: 'orange',
    featured: false
  },
  {
    name: 'ENTERPRISE',
    price: 300,
    period: 'Month',
    users: 'Limited users',
    usage: 'COMMERCIAL USAGE',
    features: [
      'All Business features',
      'Custom integrations',
      '5TB file storage',
      'Premium support (24/7)',
      'Service Level Agreement (SLA)'
    ],
    buttonText: 'GET STARTED',
    buttonColor: 'red',
    featured: false
  }
]

function PricingPage() {
  return (
    <>
      <div className='max-w-full w-full px-2 sm:px-4 md:px-8 mb-16 sm:mb-20 mx-auto'>
        <div className='text-center mb-8 sm:mb-12'>
          <p className='text-xs sm:text-sm font-medium text-muted-foreground mb-1 sm:mb-2 tracking-wider'>PRICING</p>
          <h1 className='text-2xl sm:text-4xl font-bold text-foreground'>Choose Your Best Plan</h1>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto'>
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </>
  )
}

export default PricingPage
