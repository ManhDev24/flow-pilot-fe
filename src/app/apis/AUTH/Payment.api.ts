import { fetcher } from '../fetcher'
import type { PaymentListResponse, PaymentDetailResponse } from '@/app/modules/SuperAdmin/Payment/models/PaymentInterface'

export const paymentApi = {
  // Get all payments with pagination
  getAllPayments: async (page: number = 1, limit: number = 10): Promise<PaymentListResponse> => {
    const response = await fetcher.get(`/payment?page=${page}&limit=${limit}`)
    return response.data
  },

  // Get payment by ID
  getPaymentById: async (id: number): Promise<PaymentDetailResponse> => {
    const response = await fetcher.get(`/payment/${id}`)
    return response.data
  }
}