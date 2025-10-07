import { fetcher } from '../fetcher'
import type { OrderListResponse, OrderDetailResponse } from '@/app/modules/SuperAdmin/Order/models/OrderInterface'

export const orderApi = {
  // Get all orders with pagination
  getAllOrders: async (page: number = 1, limit: number = 10): Promise<OrderListResponse> => {
    const response = await fetcher.get(`/Order?page=${page}&limit=${limit}`)
    return response.data
  },

  // Get order by ID
  getOrderById: async (id: string): Promise<OrderDetailResponse> => {
    const response = await fetcher.get(`/Order/${id}`)
    return response.data
  },

  // Place order
  placeOrder: async (email: string, package_id: string, workspace_id?: string) => {

    const orderData = { email, workspace_id, package_id }

    const response = await fetcher.post('/Order/create', orderData)
    return response.data
  }
}