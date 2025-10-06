import { fetcher } from '@/app/apis/fetcher'
import type {
  CreatePackageData,
  PackageDetailsResponse,
  PackageResponse,
  UpdatePackageData
} from '@/app/modules/SuperAdmin/PackageManagement/models/package.type'

import type { AxiosError } from 'axios'

export const PackageApi = {
  getAllPackages: async (page: number, pageSize: number) => {
    try {
      const response: PackageResponse = await fetcher.get(`/package/superadmin?page=${page}&limit=${pageSize}`)
      return response.data.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  getPackageDetail: async (packageId: string) => {
    try {
      const response: PackageDetailsResponse = await fetcher.get(`/package/${packageId}`)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  createPackage: async (packageData: CreatePackageData) => {
    try {
      const response = await fetcher.post('/package/create', packageData)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  updatePackage: async (packageId: string, packageData: Partial<UpdatePackageData>) => {
    try {
      const response = await fetcher.put(`/package/${packageId}`, packageData)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  deletePackage: async (packageId: string) => {
    try {
      const response = await fetcher.delete(`/package/${packageId}`)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  }
}
