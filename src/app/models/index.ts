import type { ReactNode } from 'react'

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

export interface IRole {
  id: number
  role: string
}
export interface IWorkspace {
  id: string
  name: string
}

export interface IProfile {
  id: string
  name: string
  email: string
  avatar_url: string | null
  phone: string | null
  address: string | null
  bio: string | null
  nickname: string | null
  role: IRole | null
  status: string
  workspace: IWorkspace | null
  created_at: string
  updated_at: string
}

export type IProfileState = {
  currentProfile: IProfile | null
}