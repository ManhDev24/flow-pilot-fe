import { fetcher } from '@/app/apis/fetcher'
import type {
  FeatureCreate,
  FeatureResponse,
  FeatureUpdate
} from '@/app/modules/SuperAdmin/FeatureManagement/models/feature.type'

import type { AxiosError } from 'axios'

export const FeatureApi = {
  getAllFeature: async (page: number, pageSize: number) => {
    try {
      const response: FeatureResponse = await fetcher.get(`/feature?page=${page}&limit=${pageSize}`)
      return response.data.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  getAllPackagesForSelect: async () => {
    try {
      const response = await fetcher.get('/package/superadmin')
      return response.data.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  getAllFeaturesForSelect: async () => {
    try {
      const response = await fetcher.get('/feature?page=1&limit=1000')
      return response.data.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  createFeature: async (featureData: FeatureCreate) => {
    try {
      const response = await fetcher.post('/feature/create', featureData)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  updateFeature: async (featureId: string, featureData: Partial<FeatureUpdate>) => {
    try {
      const response = await fetcher.put(`/feature/${featureId}`, featureData)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  },
  deleteFeature: async (featureId: string) => {
    try {
      const response = await fetcher.delete(`/feature/delete/${featureId}`)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError
    }
  }
}
