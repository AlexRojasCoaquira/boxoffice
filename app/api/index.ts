import axios, { AxiosError } from 'axios'
import type { Plan } from './../interfaces/services'
import type { LoginResponse } from '~/interfaces/auth'
import type { Profile } from '~/interfaces/Profile';
import { encryptData } from '~/utils'
import { useAuthStore } from '~/store/auth';
const { VITE_API_BASE_URL, VITE_API_PLATFORM, VITE_APP_API_CHECKOUT, VITE_APP_BRAND } = import.meta
  .env

const suscription = `${VITE_API_PLATFORM}/suscription`
const payment = `${VITE_API_PLATFORM}/payment`
const profile = `${VITE_API_PLATFORM}/profile`
axios.defaults.baseURL = VITE_API_BASE_URL

const joinnus = axios.create({
  baseURL: `${VITE_API_BASE_URL}/v1`,
  timeout: 30000
})

const apiSuscription = axios.create({
  baseURL: `${suscription}/v1`,
  timeout: 30000
})

const apiPayment = axios.create({
  baseURL: `${payment}/v1`,
  timeout: 30000
})

const apiProfile = axios.create({
  baseURL: `${profile}`,
  timeout: 30000
})

const apiCheckout = axios.create({
  baseURL: `${VITE_APP_API_CHECKOUT}`,
  timeout: 30000
})

interface PayloadVerify {
  slug: string
  documentType: string
  document: string
}

interface ApiErrorResponse {
  error?: {
    code?: number
  }
}
interface codeParams {
  type: string;
  code: string;
  token: string;
}
apiSuscription.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.data) {
      const responseData = error.response?.data as ApiErrorResponse
      const code = responseData.error?.code
      if (code === 401) {
        const authStore = useAuthStore()
        authStore.logout()
        navigateTo('/login')
      }
    }
    return Promise.reject(error)
  }
)

export async function login(payload: FormData, captcha: string): Promise<LoginResponse> {
  const headers = {
    captcha
  }
  const { data } = await joinnus.post('/auth/login', payload, { headers })
  return data
}

export async function forgotPassword(email: string) {
  try {
    const { data } = await joinnus.post('/account/forget-password', { email })
    return data
  } catch (e) {
    console.log(e, 'forgotPassword') // eslint-disable-line
  }
}

export async function getEvents(q = '', token: string) {
  const url = `/subscription/plans${q}`
  const headers = {
    Authorization: token,
    organizerSlug: VITE_APP_BRAND
  }
  const params = {
    type: 'basic'
  }
  const { data } = await joinnus.get(url, { params, headers })
  return data
}

export async function verifySuscription(payload: PayloadVerify) {
  try {
    const url = `${'alianzalima'}/subscriptions/membership/validate`
    const { data } = await apiSuscription.post(url, payload)
    return data
  } catch (e) {
    console.log(e, 'verifySuscription') // eslint-disable-line
    return { status: false }
  }
}

export async function generateSuscription(token: string) {
  try {
    const url = '/payment/process/point-of-sale'
    await apiCheckout.post(url, { data: token })
  } catch (e) {
    console.log(e, 'generateSuscription') // eslint-disable-line
    return { status: false }
  }
}

export async function reservation(payload: Plan, token: string) {
  try {
    const headers = {
      cookie_joinnus: token
    }
    const url = `${VITE_APP_BRAND}/subscriptions/boxoffice/reservation`
    const { data } = await apiSuscription.post(url, payload, { headers })
    return data
  } catch (e) {
    if (e instanceof AxiosError) {
      const msgErrorDefault = 'Hubo un error'
      const msgError = e.response?.data?.error?.message || msgErrorDefault
      return { status: false, data: msgError[0] || msgErrorDefault }
    }
    console.log(e, 'reservation') // eslint-disable-line
    return { status: false }
  }
}

export async function payToReservation(payload: any, token: string) {
  try {
    const headers = {
      cookie_joinnus: token
    }
    const url = `${VITE_APP_BRAND}/subscription/payment/offline`
    const { data } = await apiPayment.post(url, payload, { headers })
    return data
  } catch (e) {
    console.log(e, 'payToReservation') // eslint-disable-line
  }
}

export async function sendLoginCode (type: string = 'email', user: Profile, token: string ) {
  const OPT_TYPE = 'otp-login-two-auth';
  const types = {
    email: 'token-login-two-auth',
    'alt-email': 'token-login-two-auth-email-alternative',
    sms: OPT_TYPE,
    whatsapp: OPT_TYPE,
  };
  type TypeKey = keyof typeof types;
  const typeKey = types[type as TypeKey];
  const params = {
    type: typeKey,
    token,
  };
  if (['sms', 'whatsapp'].includes(type)) {
    const body = {
      code: user.phoneCode,
      phone: user.phone.toString(),
      option: 'otp',
      type: typeKey,
      token,
    };
    const encripted = await encryptData(JSON.stringify(body))
    const dataFinal = btoa(String.fromCharCode(...encripted!))
    const url = `/v2/joinnus/auth/phone/send/${type}`
    const { data } = await apiProfile.post(url, {data : dataFinal});
    return data;
  }
  const encripted = await encryptData(JSON.stringify(params))
  const dataFinal = btoa(String.fromCharCode(...encripted!))
  try {
    const url = `/v1/joinnus/auth/generate/token`
    const { data } = await apiProfile.post(url, { data: dataFinal });
    return data;
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
    throw error;
  }
}

export async function validateLoginCode ({ type = 'email', code, token } : codeParams) {
  const VERIFY_TYPE = 'verify-login-two-auth';
  const types = {
    email: VERIFY_TYPE,
    'alt-email': 'verify-login-two-auth-email-alternative',
    phone: VERIFY_TYPE,
  };
  type TypeKey = keyof typeof types;

  const body = {
    otp: code,
    type: types[type as TypeKey],
    token,
  };
  const url = '/v2/joinnus/auth/verify-otp';
  const encripted = await encryptData(JSON.stringify(body))
  const dataFinal = btoa(String.fromCharCode(...encripted!))
  const { data } = await apiProfile.post(url, { data: dataFinal });
  return data;
}