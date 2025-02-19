import { defineStore } from 'pinia'
import { login } from '../api/index'
import type { User } from '~/interfaces/auth'
import type { Profile } from '~/interfaces/Profile'

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
}

interface Response {
  status: boolean
  user?: User
  message?: string
  isOTPRequired?: boolean
  profile?: Profile
  token: string
}
export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isLoading: false,
    error: null
  }),
  getters: {
    getUser: (state): User | null => {
      const user = useCookie<User | null>('user').value
      return state.user ?? user
    },
    getToken: (state): string | null => {
      const token = useCookie<string | null>('token').value
      return state.token ?? token
    },
    isAuthenticated: (state): boolean => !!state.token || !!useCookie('token').value
  },
  actions: {
    async login(data: { payload: FormData; captcha: string }): Promise<Response> {
      try {
        const { payload, captcha } = data
        const res = await login(payload, captcha)
        if (res.status) {
          if (!res.isOTPRequired) {
            this.setAuth(res.token, res.user)
          }
          return {
            status: true,
            isOTPRequired: res.isOTPRequired,
            profile: res.profile,
            user: res.user,
            token: res.token,
            message: 'Logueado!'
          }
        }
        return { status: false, message: 'Usuario no válido', token: res.token }
      } catch (error) {
        return { status: false, message: 'Ocurrió un error:' + error, token: '' }
      }
    },
    setAuth(token: string, user: User) {
      const tokenCookies = useCookie('token', { maxAge: 86400 })
      const userCookies = useCookie('user', { maxAge: 86400 })
      tokenCookies.value = token
      userCookies.value = JSON.stringify(user)
      this.token = token
      this.user = user
    },
    logout() {
      const tokenCookies = useCookie('token')
      const userCookies = useCookie<User | null>('user')

      tokenCookies.value = null
      userCookies.value = null

      this.token = null
      this.user = null
      navigateTo('/login')
    }
  }
})
