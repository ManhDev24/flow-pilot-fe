export interface LoginForm {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  statusCode?: number
  message: string | ErrorMessageObject
  timestamp?: string
  path?: string
  data?: LoginResponseData
}

export interface ErrorMessageObject {
  code: string
  message: string
}
export interface LoginResponseData {
  accessToken: string
  refreshToken: string
  role: string
}
