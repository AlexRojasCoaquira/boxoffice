<template>
  <div class="h-full w-full flex items-center bg-[#F5F5F5]">
    <Verification
      v-if="isAuthentication"
      :profile="userProfile!"
      :user="userData!"
      :token="token"
      @goBack="isAuthentication = false"
    ></Verification>
    <template v-else>
      <template v-if="step === 1">
        <form
          @submit.prevent="submitForm()"
          class="mx-auto border border-[#bcd1e7] rounded-lg p-8 w-96 bg-[#FFFFFF]"
        >
          <h1 class="text-3xl font-bold text-center">Box Office</h1>
          <div class="border-t border-gray-300 my-5"></div>
          <div class="w-full">
            <BaseJInput
              class="mt-5"
              name="Email"
              type="email"
              v-model="user.username"
              :disabled="loading"
              required
            ></BaseJInput>
            <BaseJInput
              class="mt-5"
              name="Contraseña"
              type="password"
              v-model="user.password"
              :disabled="loading"
              required
            ></BaseJInput>
          </div>
          <div @click="step = 2; user.username = ''" class="cursor-pointer text-sm my-5">Olvidaste tu contraseña?</div>
          <BaseJButton
            type="submit"
            text="Iniciar sesión"
            size="xl"
            :loading="loading"
            :disabled="loading"
          ></BaseJButton>
        </form>
      </template>
      <template v-if="step === 2">
        <form
          @submit.prevent="forgotPassword(user.username)"
          class="mx-auto border border-[#bcd1e7] rounded-lg p-10 w-96 md:w-1/2 bg-[#FFFFFF]"
        >
          <h1 class="text-3xl font-bold text-center mb-5">Reestablecer contraseña</h1>
          <p>
            Ingresa tu correo electrónico registrado y te enviaremos un enlace para restablecer tu
            contraseña.
          </p>
          <div class="border-t border-gray-300 mt-5"></div>
          <div class="w-full">
            <BaseJInput v-model="user.username" name="Email" type="email" :disabled="loading"></BaseJInput>
          </div>
          <button
            type="submit"
            :disabled="loading"
            class="mt-5 w-full bg-[#00E0B1] py-3 rounded-3xl text-center cursor-pointer hover:bg-[#BCD1E7]"
          >
            Enviar
          </button>
          <small class="text-red-600">{{ errorMsg }}</small>
        </form>
      </template>
      <template v-if="step === 3">
        <div
          class="mx-auto border border-[#bcd1e7] rounded-lg p-10 w-96 md:w-1/2 bg-[#FFFFFF]"
        >
          <h1 class="text-3xl font-bold text-center mb-5">Revisa tu correo</h1>
          <p>Se ha enviado un correo a {{user.username}} con instrucciones para reiniciar tu contraseña</p>
          <button
            @click="step = 1"
            class="mt-5 w-full bg-[#00E0B1] py-3 rounded-3xl text-center cursor-pointer hover:bg-[#BCD1E7]"
          >
            Regresar
          </button>
        </div>
      </template>
    </template>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '~/store/auth'
import { forgotPassword as forgot } from '~/api'
import type { Profile } from '../interfaces/Profile';
import type { User } from '~/interfaces/auth';
interface UserData {
  username: string,
  password: string,
}
const payload: UserData = {
  username: '',
  password: ''
}
const captcha = 'joinnus4ever'

definePageMeta({
  layout: 'default',
})

//STORE
const step = ref<number>(1)
const user = reactive<UserData>(payload)
const router = useRouter()
//STATE
const authStore = useAuthStore()
const loading = ref<boolean>(false);
const token = ref<string>('')
const errorMsg = ref<string>('')
const userProfile = ref<Profile | undefined>()
const userData = ref<User>()
const isAuthentication = ref<boolean>(false);

const submitForm = async (): Promise<void> => {
  try {
    loading.value = true;
    const data = new window.FormData()
    data.append('email', String(user.username))
    data.append('password', String(user.password))
    const res = await authStore.login({ payload: data, captcha })
    if(res.status){
      if(res.isOTPRequired) {
        isAuthentication.value = true;
        userProfile.value = res.profile;
        userData.value = res.user;
        token.value = res.token || '';
      } else {
        router.push('/')
      }
    }
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
}
const forgotPassword = async (email: string) => {
  try {
    loading.value = true;
    const res = await forgot(email.trim());
    if(res.status) {
      step.value = 3
    } else {
      errorMsg.value = res.message;
      setTimeout(() => {
        errorMsg.value = '';
      }, 3000);
    }
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
}
</script>
