import type { ApiResponse, ConsultationRequestDetailResponse, ConsultationRequestListResponse, ConsultationRequestPaginationParams, CreateConsultationRequest, UpdateConsultationRequest } from '@/app/modules/SuperAdmin/ConsultationReqManagement/models/ConsultationReqManagementInterface'
import { fetcher } from '../fetcher'

// Consultation Request API Class
export class ConsultationRequestAPI {
  /**
   * Get all consultation requests with pagination
   * GET /consultation-request
   */
  static async getAllConsultationRequests(params: ConsultationRequestPaginationParams = {}): Promise<ConsultationRequestListResponse> {
    const { page = 1, limit = 10 } = params

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    const response = await fetcher.get(`/consultation-request?${queryParams.toString()}`)
    return response.data
  }

  /**
   * Get consultation request by ID
   * GET /consultation-request/:id
   */
  static async getConsultationRequestById(id: number): Promise<ConsultationRequestDetailResponse> {
    const response = await fetcher.get(`/consultation-request/${id}`)
    return response.data
  }

  /**
   * Create new consultation request
   * POST /consultation-request
   */
  static async createConsultationRequest(requestData: CreateConsultationRequest): Promise<ApiResponse> {
    const response = await fetcher.post(`/consultation-request`, requestData)
    return response.data
  }

  /**
   * Update consultation request
   * PUT /consultation-request/:id
   */
  static async updateConsultationRequest(id: number, requestData: UpdateConsultationRequest): Promise<ApiResponse> {
    const response = await fetcher.put(`/consultation-request/${id}`, requestData)
    return response.data
  }

  /**
   * Delete consultation request
   * DELETE /consultation-request/delete/:id
   */
  static async deleteConsultationRequest(id: number): Promise<ApiResponse> {
    const response = await fetcher.delete(`/consultation-request/delete/${id}`)
    return response.data
  }
}

// Export individual functions for easier imports
export const {
  getAllConsultationRequests,
  getConsultationRequestById,
  createConsultationRequest,
  updateConsultationRequest,
  deleteConsultationRequest,
} = ConsultationRequestAPI

// Default export
export default ConsultationRequestAPI