export interface FirstLoginForm {
  newPassword: string
  confirmPassword: string
}

export interface FirstLoginResponse {
  success: boolean
  statusCode?: number
  message: string | ErrorMessageObject
  timestamp?: string
  path?: string
  data?: FirstLoginResponseData
}

export interface ErrorMessageObject {
  code: string
  message: string
}

export interface FirstLoginResponseData {
  // Add response data structure based on your API
  success: boolean
}
