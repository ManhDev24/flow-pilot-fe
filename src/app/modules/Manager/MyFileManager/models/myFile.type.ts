export interface MyFileResponse {
  success: boolean
  message: string
  data: MyFile
}

export interface MyFile {
  items: FileItem[]
  total: number
  page: number
  limit: number
}

export interface FileItem {
  id: number
  task_id: any
  file_name: string
  file_url: string
  file_size: number
  mime_type: string
  uploaded_at: string
  uploaded_by: string
  created_at: string
  updated_at: string
}
