export interface Payment {
  id: number
  order_id: string
  payment_date: string
  amount: number
  status: 'pending' | 'success' | 'failed'
  created_at: string
  updated_at: string
}

export interface PaymentData {
  data: Payment[]
  total: number
  page: number
  limit: number
}

export interface PaymentListResponse {
  success: boolean
  message: string
  data: PaymentData
}

export interface PaymentDetailResponse {
  success: boolean
  message: string
  data: Payment
}
