import { fetcher } from '../fetcher'
import type {
  PaymentListResponse,
  PaymentDetailResponse
} from '@/app/modules/SuperAdmin/Payment/models/PaymentInterface'

export const paymentApi = {
  getAllPayments: async (page: number = 1, limit: number = 10): Promise<PaymentListResponse> => {
    const response = await fetcher.get(`/payment?page=${page}&limit=${limit}`)
    return response.data
  },

  getAllPaymentsInSystem: async (): Promise<PaymentListResponse> => {
    const response = await fetcher.get(`/payment?page=1&limit=10000`)
    return response.data
  },

  getPaymentById: async (id: number): Promise<PaymentDetailResponse> => {
    const response = await fetcher.get(`/payment/${id}`)
    return response.data
  }
}
