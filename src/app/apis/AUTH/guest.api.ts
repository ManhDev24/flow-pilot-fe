import type { AxiosError } from "axios"
import { fetcher } from "../fetcher"

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
  }
}