export interface FeatureResponse {
  success: boolean
  message: string
  data: Feature
}

export interface Feature {
  data: FeatureData[]
  total: number
  page: number
  limit: number
}

export interface FeatureData {
  id: string
  name: string
  description: string
  created_at: string
  updated_at: string
  status: string
}

export interface FeatureCreate {
  name: string
  description: string
  status: 'active' | 'inactive'
  package_id: string
}

export interface FeatureUpdate {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive'
  package_id: string
}
