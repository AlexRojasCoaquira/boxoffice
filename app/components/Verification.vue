<template>
  <div class="mx-auto border border-[#bcd1e7] rounded-lg p-8 max-w-md w-full bg-[#FFFFFF]">
    <h5 class="text-center text-3xl font-bold mb-5">{{ sentCode ? 'Código enviado' : 'Código de verificación' }}</h5>
    <p v-if="!sentCode" class="text-sm text-justify mb-2">
      Para acceder a tu cuenta Joinnus y descubrir la ciudad,
      necesitas solicitar un código de verificación.
    </p>
    <p v-if="sentCode" class="description">
      <template v-if="selectedMethod === 'email'">
        Hemos enviado el código al correo que tienes
        registrado en Joinnus: <b>{{ secureEmail(user.email) }}</b>.
        Revisa tu bandeja de entrada o spam e ingrésalo
        para acceder a tu cuenta.
      </template>
      <template v-else-if="selectedMethod === 'alt-email'">
        ¡Listo! Hemos enviado el código de verificación
        a tu correo alterno registrado en Joinnus {{ secureEmail(profile.contactEmail) }}.
        En cuanto lo recibas, introdúcelo aquí para acceder a tu cuenta.
      </template>
      <template v-else-if="selectedMethod === 'phone'">
        ¡Listo! Hemos enviado el código de verificación a tu celular por
        {{ phoneVerificationMode === 'sms' ? 'SMS' : 'Whatsapp' }}
        al {{ profile.phoneCode }} {{ securePhone(profile.phone) }}. En cuanto lo recibas,
        introdúcelo aquí para acceder a tu cuenta.
      </template>
    </p>
    <p v-if="justEmail && !sentCode" class="text-sm text-justify mb-3">Te enviaremos un código al correo registrado en Joinnus {{ secureEmail(user?.email) }}</p>
    <div v-if="sentCode">
      <!-- Componente por aplicar mejora TS -->
      <VerificationCode
        :code="verificationCode"
        @change="verificationCode = $event; verificationError = ''"
      ></VerificationCode>
    </div>
    <div v-else-if="!selectingMethod && selectedMethod === 'phone'" class="">
      <p class="description">Te enviaremos un código al correo registrado en Joinnus {{ profile?.phoneCode }} {{ securePhone(profile?.phone) }}</p>
      <p class="description">¿Por dónde quieres que te enviemos el código?</p>
      <div class="phone-methods">
        <div class="phone-method">
          <input
            :checked="phoneVerificationMode === 'whatsapp'"
            @change="phoneVerificationMode = 'whatsapp'"
            type="radio"
            id="codeByWsp"
            name="code"
          />
          <label for="codeByWsp" class="m-0 pl-2 font-medium">Whatsapp</label>
        </div>
      </div>
      <p class="help">
        ¿Este no es tu número? No te preocupes.
        Si no es tuyo o no puedes acceder,
        pide que lo actualicemos en
        <a href="mailto:info@joinnus.com">Ayuda y contacto</a>.
      </p>
    </div>
    <p v-else-if="!selectingMethod && selectedMethod === 'alt-email'" class="description">
      Te enviaremos un código al correo alterno que registraste
      en Joinnus {{ secureEmail(profile?.contactEmail) }}
    </p>
    <p v-else-if="!selectingMethod && selectedMethod === 'email'" class="text-justify">
      Te enviaremos un código al correo registrado
      en Joinnus {{ secureEmail(profile?.email) }}
    </p>
    <div v-else-if="!justEmail" class="methods">
      <label
        for="two-step-email"
        class="method"
      >
        <input
          :checked="selectedMethod === 'email'"
          @change="selectedMethod = 'email'"
          type="radio"
          id="two-step-email"
          name="methods-radio"
        />
        <div>
          <span class="method-label">Correo principal</span>
          <div class="method-value">
            <!-- <simple-mail-icon></simple-mail-icon> -->
            <p class="value-text">{{ secureEmail(user?.email) }}</p>
          </div>
        </div>
      </label>
      <label
        v-if="withPhone"
        for="two-step-phone"
        class="method"
      >
        <input
          :checked="selectedMethod === 'phone'"
          @change="selectedMethod = 'phone'"
          type="radio"
          id="two-step-phone"
          name="methods-radio"
        />
        <div>
          <span class="method-label">Número celular</span>
          <div class="method-value">
            <!-- <call-icon></call-icon> -->
            <p class="value-text">{{ profile?.phoneCode }} {{ securePhone(profile?.phone) }}</p>
          </div>
        </div>
      </label>
      <label
        v-if="withAltEmail"
        for="two-step-alt-email"
        class="method"
      >
        <input
          :checked="selectedMethod === 'alt-email'"
          @change="selectedMethod = 'alt-email'"
          type="radio"
          id="two-step-alt-email"
          name="methods-radio"
        />
        <div>
          <span class="method-label">Correo alterno</span>
          <div class="method-value">
            <!-- <simple-mail-icon></simple-mail-icon> -->
            <p class="value-text">{{ secureEmail(profile?.contactEmail) }}</p>
          </div>
        </div>
      </label>
    </div>
    <p
      v-if="!sentCode && (justEmail || (!selectingMethod && ['email', 'alt-email'].includes(selectedMethod)))"
      class="text-xs text-justify"
    >
      ¿Este no es tu correo? No te preocupes.
      Si no es tuyo o no puedes acceder,
      pide que lo actualicemos en <a href="mailto:info@joinnus.com">Ayuda y contacto</a>.
    </p>
    <p v-if="verificationError" class="error-msg">{{ verificationError }}</p>
    <div class="mt-4 flex justify-between gap-2 flex-wrap sm:flex-nowrap">
      <button
        type="button"
        class="border border-black w-full sm:w-1/2"
        @click="goBack()"
      >
        Volver
      </button>
      <BaseJButton
        type="button"
        class="border w-full sm:w-1/2"
        size="lg"
        :disabled="sentCode ? verificationCode.length !== 6 : false"
        :text="continueBtnText"
        @click="onContinue()"
        :loading="btnLoading"
      ></BaseJButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Profile } from '~/interfaces/Profile'
import { secureEmail, securePhone } from '~/utils'
import { validateLoginCode, sendLoginCode } from '~/api'
import { useAuthStore } from '~/store/auth'
import type { User } from '~/interfaces/auth'

interface Props {
  profile: Profile
  user: User
  token: string
  userPriv ?: any
}
const props = defineProps<Props>()
const emit = defineEmits(['goBack'])
const authStore = useAuthStore()
const withEmail = props.user?.email && props.profile?.twoStepVerify.isEmailVerified;
const withPhone = withEmail && props.profile?.phone && props.profile?.twoStepVerify?.isPhoneVerified;
const withAltEmail = withEmail && props.profile?.contactEmail && props.profile?.twoStepVerify?.isEmailAlternativeVerified && withPhone;
const justEmail = !withPhone && !withAltEmail;
const sentCode = ref<boolean>(false);
const selectingMethod = ref<boolean>(true);
const btnLoading = ref<boolean>(false);
const selectedMethod = ref<string>('email');
const verificationError = ref<string>('');
const verificationCode = ref<string>('');
const phoneVerificationMode = ref<string>('whatsapp');
const router = useRouter();
const continueBtnText = computed(() => {
  let text = 'Continuar';
  if (sentCode.value) text = 'Validar código';
  else if (justEmail || !selectingMethod.value) text = 'Solicitar código';
  return text;
})
const onContinue = async () => {
  btnLoading.value = true
  const token = props.token
  if (sentCode.value) {
    try {
      const res = await validateLoginCode({
        type: selectedMethod.value,
        code: verificationCode.value,
        token
      });
      if (res.success) {
        authStore.setAuth(token, props.user);
        router.push('/')
      }
    } catch (error) {
    }
  } else if (justEmail) {
    try {
      const res = await sendLoginCode( 'email', props.profile, token );
      sentCode.value = true;
    } catch (error) {}
  } else if (selectingMethod) {
    selectingMethod.value = false;
  } else if (selectedMethod) {
    const type = selectedMethod.value === 'phone' ? phoneVerificationMode.value : selectedMethod.value;
    try {
      await sendLoginCode(type, props.profile, token);
      sentCode.value = true;
    } catch (error) {
    }
  }
  btnLoading.value = false
}
const goBack = () => {
  emit('goBack');
}
</script>
