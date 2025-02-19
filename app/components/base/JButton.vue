<script lang="ts" setup>
interface ButtonObject {
  size?: 'sm' | 'md' | 'lg' | 'xl' | undefined
  loading?: boolean
  disabled?: boolean
  text: string
  type: string
}
const props = withDefaults(defineProps<ButtonObject>(), {
  size: 'md',
  type: 'button'
})
const emit = defineEmits(['onClick'])
const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-24 text-sm border-2 rounded-lg'
    case 'md':
      return 'w-full md:w-32 text-base rounded-3xl'
    case 'lg':
      return 'w-full md:w-64 text-md rounded-3xl'
    case 'xl':
      return 'w-full md:w-80 text-md rounded-3xl'
    default:
      return 'w-full rounded-3xl text-center'
  }
})
</script>
<template>
  <button
    @click="$emit('onClick')"
    :disabled="disabled"
    class="bg-[#00E0B1]  flex justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
    :class="[' text-center cursor-pointer hover:bg-[#BCD1E7] border-solid', sizeClasses]"
  >
    <template v-if="loading" class="text-center">
      <svg
        class="h-5 w-5 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
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
    <span v-else>{{ text }}</span>
  </button>
</template>
