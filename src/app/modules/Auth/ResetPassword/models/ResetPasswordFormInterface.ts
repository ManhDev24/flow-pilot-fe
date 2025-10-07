export interface ResetPasswordForm {
  code: string
  newPassword: string
  confirmPassword: string
}

export interface ResetPasswordResponse {
  success: boolean
  statusCode?: number
  message: string | ErrorMessageObject
  timestamp?: string
  path?: string
  data?: ResetPasswordResponseData
}

export interface ErrorMessageObject {
  code: string
  message: string
}

export interface ResetPasswordResponseData {
  success: boolean
}
