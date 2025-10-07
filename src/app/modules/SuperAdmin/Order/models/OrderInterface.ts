export interface Order {
  id: string
  workspace_id: string | null
  email: string
  package_id: string
  total_amount: number
  created_at: string
  updated_at: string
  status: 'pending' | 'completed' | 'cancelled'
}

export interface OrderData {
  data: Order[]
  total: number
  page: number
  limit: number
}

export interface OrderListResponse {
  success: boolean
  message: string
  data: OrderData
}

export interface OrderDetailResponse {
  success: boolean
  message: string
  data: Order
}
