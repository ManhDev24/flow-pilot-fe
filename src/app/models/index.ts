import type { ReactNode } from "react"

export type LayoutProps = {
  children: ReactNode
}

export type IUserStatePayload = {
  accessToken: string
  refreshToken: string
  wsid: string
  projectId: string
  role: string
}

export type IUserState = {
  currentUser: IUserStatePayload | null
}

export type IRoleState = {
  currentRole: string
}
