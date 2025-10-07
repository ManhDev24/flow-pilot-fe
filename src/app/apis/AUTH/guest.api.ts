import type { AxiosError } from "axios"
import { fetcher } from "../fetcher"
import type { GetAllPackagesResponse } from "@/app/modules/Guest/PricingPage/models"

export const guestApi = {
  // Define guest-related API methods here
  createConsultationRequest: async (name: string, email: string, phone: string, company_name: string, package_id: string, note: string) => {
    try {
      const body = {
        name,
        email,
        phone,
        company_name,
        package_id,
        note
      }

      const response = await fetcher.post('/consultation-request/create', body)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError.response
    }
  },

  getAllPackages: async (): Promise<GetAllPackagesResponse> => {
    try {
      const response = await fetcher.get('/package?page=1&limit=10')
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError.response
    }
  }
}