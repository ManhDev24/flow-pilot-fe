export interface PackageResponse {
  success: boolean
  message: string
  data: PackageForm
}

export interface PackageForm {
  data: PackageData[]
  total: number
  page: number
  limit: number
}

export interface PackageData {
  id: string
  name: string
  duration_in_months: number
  price: number
  description: string
  created_at: string
  updated_at: string
  status: string
  features: Feature[]
}

export interface Feature {
  id: string
  name: string
  description: string
  created_at: string
  updated_at: string
  status: string
}

export interface PackageDetailsResponse {
  success: boolean
  message: string
  data: PackageData
}

export interface CreatePackageData {
  name: string
  duration_in_months: number
  price: number
  description: string
  status: 'active' | 'inactive'
}

export interface UpdatePackageData {
  name?: string
  duration_in_months?: number
  price?: number
  description?: string
  status?: 'active' | 'inactive'
}
