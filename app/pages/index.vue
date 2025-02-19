<template>
  <div class="h-screen w-full flex justify-center bg-[#F5F5F5] print:bg-[#FFFFFF]">
    <div class="container mt-8">
      <template v-if="step === 1">
        <div class="mx-auto w-full border flex gap-2 flex-wrap md:flex-nowrap p-5 bg-[#FFFFFF]">
          <div class="w-full relative">
            <BaseJInput
              class="w-full relative"
              v-model.trim="search"
              type="text"
              placeholder="Buscar plan"
              :disabled="loadSearch"
              @keydown.enter="searchPlans()"
            />
            <div @click="searchPlans(true)" class="absolute right-2 top-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                v-if="search"
              >
                <path
                  d="M8.00016 8.9335L9.9335 10.8668C10.0557 10.9891 10.2113 11.0502 10.4002 11.0502C10.5891 11.0502 10.7446 10.9891 10.8668 10.8668C10.9891 10.7446 11.0502 10.5891 11.0502 10.4002C11.0502 10.2113 10.9891 10.0557 10.8668 9.9335L8.9335 8.00016L10.8668 6.06683C10.9891 5.94461 11.0502 5.78905 11.0502 5.60016C11.0502 5.41127 10.9891 5.25572 10.8668 5.1335C10.7446 5.01127 10.5891 4.95016 10.4002 4.95016C10.2113 4.95016 10.0557 5.01127 9.9335 5.1335L8.00016 7.06683L6.06683 5.1335C5.94461 5.01127 5.78905 4.95016 5.60016 4.95016C5.41127 4.95016 5.25572 5.01127 5.1335 5.1335C5.01127 5.25572 4.95016 5.41127 4.95016 5.60016C4.95016 5.78905 5.01127 5.94461 5.1335 6.06683L7.06683 8.00016L5.1335 9.9335C5.01127 10.0557 4.95016 10.2113 4.95016 10.4002C4.95016 10.5891 5.01127 10.7446 5.1335 10.8668C5.25572 10.9891 5.41127 11.0502 5.60016 11.0502C5.78905 11.0502 5.94461 10.9891 6.06683 10.8668L8.00016 8.9335ZM8.00016 14.6668C7.07794 14.6668 6.21127 14.4918 5.40016 14.1418C4.58905 13.7918 3.8835 13.3168 3.2835 12.7168C2.6835 12.1168 2.2085 11.4113 1.8585 10.6002C1.5085 9.78905 1.3335 8.92239 1.3335 8.00016C1.3335 7.07794 1.5085 6.21127 1.8585 5.40016C2.2085 4.58905 2.6835 3.8835 3.2835 3.2835C3.8835 2.6835 4.58905 2.2085 5.40016 1.8585C6.21127 1.5085 7.07794 1.3335 8.00016 1.3335C8.92239 1.3335 9.78905 1.5085 10.6002 1.8585C11.4113 2.2085 12.1168 2.6835 12.7168 3.2835C13.3168 3.8835 13.7918 4.58905 14.1418 5.40016C14.4918 6.21127 14.6668 7.07794 14.6668 8.00016C14.6668 8.92239 14.4918 9.78905 14.1418 10.6002C13.7918 11.4113 13.3168 12.1168 12.7168 12.7168C12.1168 13.3168 11.4113 13.7918 10.6002 14.1418C9.78905 14.4918 8.92239 14.6668 8.00016 14.6668ZM8.00016 13.3335C9.48905 13.3335 10.7502 12.8168 11.7835 11.7835C12.8168 10.7502 13.3335 9.48905 13.3335 8.00016C13.3335 6.51127 12.8168 5.25016 11.7835 4.21683C10.7502 3.1835 9.48905 2.66683 8.00016 2.66683C6.51127 2.66683 5.25016 3.1835 4.21683 4.21683C3.1835 5.25016 2.66683 6.51127 2.66683 8.00016C2.66683 9.48905 3.1835 10.7502 4.21683 11.7835C5.25016 12.8168 6.51127 13.3335 8.00016 13.3335Z"
                  fill="#96a7b9"
                />
              </svg>
            </div>
          </div>
          <BaseJButton
            @click="searchPlans()"
            type="button"
            :disabled="loadSearch"
            :loading="loadSearch"
            text="Buscar"
          ></BaseJButton>
          <!-- <button
            @click="searchPlans()"
            type="button"
            class="w-full md:w-60 bg-[#00E0B1] rounded-3xl text-center cursor-pointer hover:bg-[#BCD1E7]"
            :disabled="loadSearch"
          >
            <template v-if="loadSearch">
              <svg class="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <circle
                  fill="currentColor"
                  class="opacity-0"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path class="" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            </template>
            <span v-else>Buscar</span>
          </button> -->
        </div>
        <template v-if="loadEvents">
          <div class="flex justify-center mt-5">Cargando planes...</div>
        </template>
        <template v-else-if="eventsAux && events && eventsAux.length > 0 && events.length > 0">
          <div v-for="(event, idx) of eventsAux" :key="idx" class="flex my-4">
            <JCardEvent :event="event" @click="chooseEvent(event)" class="cursor-pointer" />
          </div>
        </template>
        <template v-else="eventsAux.length === 0">
          <div class="flex justify-center mt-5">No se encontraron planes disponibles.</div>
        </template>
      </template>
      <template v-if="step === 2">
        <h1 class="font-bold text-2xl m-2">Datos del suscriptor</h1>
        <form @submit.prevent="saveSubscriptor()" class="bg-[#FFFFFF] border p-5">
          <div class="grid gap-x-8 gap-y-5 grid-cols-1 md:grid-cols-2">
            <BaseJSelect
              required
              v-model="user.documentType"
              label="Tipo de documento"
              :disabled="loadSearch"
              :items="docTypes"
              @change="user.document = ''"
            />
            <div class="w-full">
              <div class="flex items-end">
                <BaseJInput
                  required
                  v-model.trim="user.document"
                  :disabled="loadSearch"
                  class="w-full"
                  label="N° de documento"
                  type="text"
                  :maxlength="user.documentType === 'DNI' ? 8 : 15"
                  @keypress="user.documentType === 'DNI' ? onlyNumber($event) : alphaNumeric($event)"
                />
                <BaseJButton
                  class="ml-2 h-11"
                  @click="verifyIntimo()"
                  type="button"
                  size="sm"
                  :disabled="!isDisabledSearch || loadSearch"
                  :loading="loadSearch"
                  text="Buscar"
                ></BaseJButton>
              </div>
              <p v-if="isIntimo" class="w-full text-sm" :class="isIntimo === 2 ? 'text-green-500' : 'text-red-500'">
                Este usuario {{ isIntimo === 1 ? 'no' : '' }} es Intimo
              </p>
            </div>
            <BaseJInput
              required
              v-model.trim="user.phone"
              class="w-full"
              label="Teléfono"
              type="text"
              @keypress="onlyNumber($event)"
              :maxlength="9"
            />
            <BaseJInput required v-model="user.email" class="w-full" label="Email" type="email" />
            <BaseJInput
              required
              v-model.trim="user.name"
              class="w-full"
              label="Nombres"
              type="text"
              @keypress="onlyText($event, user.document)"
            />
            <BaseJInput
              required
              v-model.trim="user.lastname"
              class="w-full"
              label="Apellidos"
              type="text"
              @keypress="onlyText($event, user.lastname)"
            />
            <div class="">
              <label for="">Género</label>
              <div class="text-center flex flex-wrap mt-2">
                <div class="flex items-center mr-4 mb-4">
                  <input
                    v-model="user.sexo"
                    id="genderm"
                    type="radio"
                    value="M"
                    name="radio"
                    class="hidden"
                  />
                  <label for="genderm" class="flex items-center cursor-pointer">
                    <span class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
                    Masculino
                  </label>
                </div>
                <div class="flex items-center mr-4 mb-4">
                  <input
                    v-model="user.sexo"
                    id="genderf"
                    type="radio"
                    value="F"
                    name="radio"
                    class="hidden"
                    required
                  />
                  <label for="genderf" class="flex items-center cursor-pointer">
                    <span class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
                    Femenino
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full text-right">
            <button
              type="submit"
              class="w-full sm:w-60 bg-[#00E0B1] rounded-3xl text-center cursor-pointer hover:bg-[#BCD1E7]"
            >
              Continuar
            </button>
          </div>
        </form>
      </template>
      <template v-if="step === 3">
        <form @submit.prevent="isModalOpen = true">
          <h1>Formas de pago {{ paymentMethod }}</h1>
          <div class="mt-3 w-full flex flex-wrap border">
            <label
              class="w-full rounded-none p-5 cursor-pointer"
              :class="paymentMethod === 'EFECTIVO' ? 'bg-[#42A692]' : 'bg-[#ffffff]'"
              @click="paymentMethod = 'EFECTIVO'"
              for="EFECTIVO"
            >
              <input
                type="radio"
                name="paymentmethod"
                id="EFECTIVO"
                value="EFECTIVO"
                v-model="paymentMethod"
              />
              <span class="ml-5">EFECTIVO</span>
            </label>
            <label
              class="w-full rounded-none p-5 cursor-pointer"
              :class="paymentMethod === 'POS' ? 'bg-[#42A692]' : 'bg-[#ffffff]'"
              @click="paymentMethod = 'POS'"
              for="POS"
            >
              <div class="">
                <input
                  type="radio"
                  name="paymentmethod"
                  id="POS"
                  value="POS"
                  v-model="paymentMethod"
                />
                <span class="ml-5">POS</span>
                <div class="flex flex-wrap md:flex-nowrap gap-5 mt-5">
                  <BaseJSelect
                    :required="paymentMethod === 'POS'"
                    v-model="POS.typeCard"
                    :items="typeCard"
                  />
                  <BaseJSelect
                    :required="paymentMethod === 'POS'"
                    v-model="POS.card"
                    :items="cards"
                  />
                  <BaseJInput
                    :required="paymentMethod === 'POS'"
                    v-model="POS.numberPost"
                    placeholder="Código de referencia"
                    type="text"
                  />
                </div>
              </div>
            </label>
          </div>
          <div class="flex flex-col items-end text-right mt-5">
            <div v-if="eventSelected.price" class="mb-2">
              <span class="ml-5 text-xl">Total a pagar:</span>
              <span class="ml-5 text-xl"
                >{{ eventSelected.currency === 'PEN' ? 'S/' : '$'
                }}{{ eventSelected.price.toFixed(2) }}</span
              >
            </div>
            <BaseJButton
              type="submit"
              :disabled="!paymentMethod"
              text="Generar entrada"
              size="lg"
            ></BaseJButton>
            <!-- <button
              type="submit"

              class="w-60 mt-4 bg-[#00E0B1] rounded-3xl text-center cursor-pointer hover:bg-[#BCD1E7]"
            >

            </button> -->
          </div>
        </form>
        <JModal :isOpen="isModalOpen">
          <div class="">
            <h5 class="text-center font-bold">Total a pagar</h5>
            <p class="mt-3">
              ¿Estás seguro que deseas realizar la reserva con método de pago:
              <b class="uppercase"> {{ paymentMethod }} </b>?
            </p>
            <div class="flex gap-5 text-[#ffffff] text-md mt-5">
              <button
                type="button"
                class="w-full bg-gray-500 rounded-none"
                @click.prevent="isModalOpen = false"
                :disabled="isLoading"
              >
                Cerrar
              </button>
              <button
                class="w-full bg-red-500 rounded-none"
                type="button"
                :disabled="isLoading"
                @click.prevent="generateTicket()"
              >
                {{ !isLoading ? 'Procesar' : '...' }}
              </button>
            </div>
            <small class="text-red-500 mt-2">{{ msgError }}</small>
          </div>
        </JModal>
      </template>
      <template v-if="step === 4">
        <div class="border p-8 bg-[#FFFFFF]">
          <h1 class="text-3xl text-center font-bold">Suscripción exitosa!!</h1>
          <div class="mt-5">
            <p>Nombres: {{ `${user.name} ${user.lastname}` }}</p>
            <p>Nro de documento: {{ `${user.document} (${user.documentType})` }}</p>
            <p>Método de pago: {{ paymentMethod }}</p>
            <p>Plan: {{ eventSelected.name }}</p>
            <p>
              Precio: {{ eventSelected.currency === 'PEN' ? 'S/' : '$' }} {{ eventSelected.price }}
            </p>
          </div>
          <div class="flex gap-5 mt-5 print:hidden">
            <button
              class="w-60 bg-[#00E0B1] rounded-3xl text-center cursor-pointer hover:bg-[#BCD1E7]"
              @click="print()"
            >
              Imprimir
            </button>
            <button
              class="w-60 bg-[#00E0B1] rounded-3xl text-center cursor-pointer hover:bg-[#BCD1E7]"
            >
              Enviar correo
            </button>
            <button
              class="w-60 bg-[#00E0B1] rounded-3xl text-center cursor-pointer hover:bg-[#BCD1E7]"
              type="button"
              @click="reloadPage()"
            >
              Nueva venta
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getEvents, verifySuscription, reservation, payToReservation } from '../api/index'
import { useAuthStore } from '@/store/auth'
import { docTypes, typeCard, cards } from '~/constants'
import type { UserData, PosData, Event } from '~/interfaces/Event'
import { onlyText, onlyNumber, alphaNumeric } from '~/utils'

const userData: UserData = {
  name: '',
  lastname: '',
  email: '',
  document: '',
  documentType: 'DNI',
  phone: '',
  sexo: 'M',
  id: ''
}
const posData: PosData = {
  numberPost: '',
  typeCard: 'NIUBIZ',
  card: 'VISA'
}
definePageMeta({
  layout: 'default',
})
const authStore = useAuthStore()
const step = ref<number>(1)
const search = ref<string>('')
const events = ref<Event[]>([])
const eventsAux = ref<Event[]>([])
let eventSelected = reactive<Event>({} as Event)
const paymentMethod = ref('EFECTIVO')
const loadEvents = ref<boolean>(false)
const isModalOpen = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const loadSearch = ref<boolean>(false)
const isIntimo = ref<number>(0)
const msgError = ref<string>('')

const isDisabledSearch = computed(() => {
  const maxLength = user.documentType === 'DNI' ? 8 : 10;
  return (user.document.length >= maxLength);
})
const user = reactive<UserData>(userData)
const POS = reactive<PosData>(posData)
const { getToken } = storeToRefs(authStore)


onMounted(async () => {
  await getEvent()
})

const verifyIntimo = async () => {
  try {
    loadSearch.value = true;
    const payload = {
      slug: 'alianzalima',
      documentType: user.documentType,
      document: user.document
    }
    const res = await verifySuscription(payload)
    isIntimo.value = Boolean(res.data && res.data.suscriptionMembershipId) ? 2 : 1
    setTimeout(() => {
      isIntimo.value = 0
    }, 3000)
    loadSearch.value = false;
  } catch (error) {
    loadSearch.value = false;
  }
}

const getEvent = async (q?: string): Promise<void> => {
  try {
    loadEvents.value = true
    const token = getToken.value
    if (token) {
      const res = await getEvents(q, token)
      events.value = res.data
      eventsAux.value = events.value
    } else {
      events.value = []
      eventsAux.value = events.value
    }
    loadEvents.value = false
  } catch (error) {
    console.log('error', error) // eslint-disable-line
    loadEvents.value = false
  }
}

const searchPlans = (reset?: boolean): void => {
  loadSearch.value = true
  loadEvents.value = true
  if (reset || search.value === '') {
    eventsAux.value = events.value
    search.value = ''
  }
  if (events.value?.length && search.value?.trim()) {
    const query = search.value.toLowerCase()
    const eventFilter = events.value.filter((event) => event.name?.toLowerCase().includes(query))
    eventsAux.value = eventFilter
  }
  loadEvents.value = false
  loadSearch.value = false
}
const chooseEvent = (event: Event) => {
  eventSelected = event
  step.value = 2
}

const saveSubscriptor = (): void => {
  step.value = 3
}

const generateTicket = async () => {
  try {
    isLoading.value = true
    const token = getToken.value
    const payload = {
      name: user.name,
      lastName: user.lastname,
      document: user.document,
      email: user.email,
      documentType: user.documentType,
      phone: user.phone,
      sexo: user.sexo,
      subscriptionPlanId: eventSelected.id
    }
    if (!token) return
    const res = await reservation(payload, token)
    if (res && res.success && res.data && res.data.membership) {
      const data = {
        membershipId: res.data.membership.id,
        paymentMethod: paymentMethod.value,
        ...(paymentMethod.value === 'POS' && { paymentTransactionId: Number(POS.numberPost) })
      }
      const resp = await payToReservation(data, token)
      if (resp && resp.success) {
        step.value = 4
        isModalOpen.value = false
        isLoading.value = false
      }
    } else if (res && !res.status) {
      msgError.value = res.data.message;
      setTimeout(() => {
        msgError.value = '';
      }, 3000);
      isLoading.value = false
    }
  } catch (error) {
    isLoading.value = false
  }
}

const print = () => {
  window.print()
}
const reloadPage = () => {
  window.location.reload()
}
</script>
<style lang="css">
input[type='radio'] + label span {
  transition: background 0.2s, transform 0.2s;
}

input[type='radio'] + label span:hover,
input[type='radio'] + label:hover span {
  transform: scale(1.2);
}

input[type='radio']:checked + label span {
  background-color: #00e5b5;
  box-shadow: 0px 0px 0px 2px white inset;
}
</style>
