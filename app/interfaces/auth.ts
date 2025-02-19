export interface User {
  id: number
  name: string
  lastname: string
  avatar: string
  email: string
  telephone: number
  document: string
  businessName: string | null
  ruc: string | null
  userCode: string
}
export interface LoginResponse {
  status: boolean
  token: string
  user: User
  [key: string]: any
}

export interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
}
