// Consultation Request interfaces
export interface ConsultationRequest {
  id: number
  name: string
  email: string
  phone: string
  company_name: string
  package_id: string
  note: string
  status: 'new' | 'contacted' | 'closed'
  created_at: string
  updated_at: string
  package?: RequestPackage
}

// Consultation Request list response interface
export interface ConsultationRequestListResponse {
  success: boolean
  message: string
  data: {
    data: ConsultationRequest[]
    total: number
    page: number
    limit: number
  }
}

// Single consultation request response interface
export interface ConsultationRequestDetailResponse {
  success: boolean
  message: string
  data: ConsultationRequest
}

export interface RequestPackage {
  id: string
  name: string
  duration_in_months: number
  price: number
  description: string
  created_at: string
  updated_at: string
  status: string
}

// Create consultation request interface
export interface CreateConsultationRequest {
  name: string
  email: string
  phone: string
  company_name: string
  package_id: string
  note: string
  status: 'new' | 'contacted' | 'closed'
}

// Update consultation request interface
export interface UpdateConsultationRequest {
  name: string
  email: string
  phone: string
  company_name: string
  package_id: string
  note: string
  status: 'new' | 'contacted' | 'closed'
}

// Pagination parameters
export interface ConsultationRequestPaginationParams {
  page?: number
  limit?: number
}

// Generic API response interface
export interface ApiResponse {
  success: boolean
  message: string
  data?: any
}

// Dialog props interfaces
export interface ConsultationRequestDialogProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export interface EditConsultationRequestDialogProps extends ConsultationRequestDialogProps {
  consultationRequest: ConsultationRequest | null
}

export interface DeleteConsultationRequestDialogProps extends ConsultationRequestDialogProps {
  consultationRequest: ConsultationRequest | null
  loading?: boolean
  onConfirm: () => void
}

export interface ViewConsultationRequestDialogProps {
  open: boolean
  onClose: () => void
  consultationRequest: ConsultationRequest | null
  onPlaceOrder?: (consultationRequest: ConsultationRequest) => void
}

// Form data interfaces
export interface ConsultationRequestFormData {
  name: string
  email: string
  phone: string
  company_name: string
  package_id: string
  note: string
  status: 'new' | 'contacted' | 'closed'
}

// Filter interfaces
export interface ConsultationRequestFilters {
  search: string
  status: string
  package: string
}

// Status badge variant mapping
export type StatusBadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline'

export interface StatusConfig {
  variant: StatusBadgeVariant
  label: string
}

export const STATUS_CONFIG: Record<string, StatusConfig> = {
  new: { variant: 'destructive', label: 'New' },
  contacted: { variant: 'default', label: 'Contacted' },
  closed: { variant: 'outline', label: 'Closed' }
}