<script setup lang="ts">
import type { NuxtError } from '#app'
import { type ErrorObject } from './interfaces/general'
const props = defineProps({
  error: Object as () => NuxtError
})

const objError = ref<ErrorObject>({})
if (props.error) {
  const { statusCode } = props.error
  if (statusCode) {
    objError.value = {
      img: `https://cdn.joinnus.com/files/ticket-${props.error.statusCode}.svg`,
      code: props.error.statusCode
    }
  }
  if (statusCode === 404) {
    objError.value.title = 'Página no encontrada'
    objError.value.description = 'No te preocupes te regresaremos a la diversión.'
    objError.value.redirectOut = true
    objError.value.redirectTo = 'https://www.joinnus.com/'
    objError.value.redirectlabel = 'Ver otros eventos'
    objError.value.refreshButton = false
  } else if (statusCode === 500) {
    objError.value.title = 'Parece que algo salió mal...'
    objError.value.description =
      'Intenta de nuevo en unos minutos. Si el problema continua puedes contactarnos a info@joinnus.com y veremos como ayudarte.'
    objError.value.redirectOut = false
    objError.value.redirectTo = '/'
    objError.value.redirectlabel = 'Ir al inicio'
    objError.value.refreshButton = true
  } else if (statusCode === 502) {
    objError.value.title = 'Tenemos un  problemita...'
    objError.value.description =
      'Puedes volver un paso atrás e intentar de nuevo en unos minutos. También puedes explorar otras opciones.'
    objError.value.redirectOut = false
    objError.value.redirectTo = '/'
    objError.value.redirectlabel = 'Ir al inicio'
    objError.value.refreshButton = true
  } else if (statusCode === 503) {
    objError.value.title = 'Estamos trabajando.'
    objError.value.description =
      'Estamos realizando algunos cambios para mejorar tu experiencia en Joinnus. Regresamos en breves. Intenta de nuevo más tarde.'
    objError.value.redirectOut = false
    objError.value.redirectTo = '/'
    objError.value.redirectlabel = 'Ir al inicio'
    objError.value.refreshButton = true
  } else {
    objError.value.title = 'Parece que algo salió mal...'
    objError.value.description =
      'Intenta de nuevo en unos minutos. Si el problema continua puedes contactarnos a info@joinnus.com y veremos como ayudarte.'
    objError.value.redirectOut = false
    objError.value.redirectTo = '/'
    objError.value.redirectlabel = 'Ir al inicio'
    objError.value.refreshButton = true
  }
}
useHead({
  title: `${props?.error?.statusCode} - ${props?.error?.message}`
})
</script>

<template>
  <div class="flex flex-col items-center justify-center m-auto h-screen gap-16 p-4">
    <img
      width="400"
      :height="
        props?.error?.statusCode === 502
          ? '285'
          : props?.error?.statusCode === 404
          ? '295'
          : props?.error?.statusCode === 503
          ? '345'
          : '250'
      "
      v-if="objError.img"
      fetch-priority="high"
      loading="eager"
      :src="objError.img"
      alt=""
    />
    <h1 class="font-extrabold text-[10rem] text-secondary leading-10">
      {{ objError.code ? objError.code : error?.statusCode }}
    </h1>
    <div class="flex flex-col gap-4 items-center">
      <h2 class="text-primary font-black text-2xl">{{ objError.title }}</h2>
      <h3 class="font-medium text-gray-500 text-sm text-center">{{ objError.description }}</h3>
    </div>
    <div class="flex gap-4 items-center">
      <template v-if="objError.code !== 503">
        <a
          :href="objError.redirectTo"
          v-if="objError.redirectOut"
          target="_blank"
          rel="noopener noreferrer"
          class="py-3 px-6"
          :class="objError.refreshButton ? 'text-white bg-secondary' : 'bg-primary text-secondary '"
        >
          {{ objError.redirectlabel }}
        </a>
        <nuxt-link
          v-else
          :to="objError.redirectTo"
          class="py-3 px-6"
          :class="objError.refreshButton ? 'text-white bg-secondary' : 'bg-primary text-secondary '"
        >
          {{ objError.redirectlabel }}
        </nuxt-link>
      </template>
      <button
        v-if="objError.refreshButton"
        class="py-3 px-6 text-secondary bg-primary"
        @click="reloadNuxtApp()"
      >
        Volver a intentar
      </button>
    </div>
  </div>
</template>
