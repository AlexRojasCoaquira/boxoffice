<template>
  <div class="border border-gray-200">
    <div
      class="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
      @click="toggle"
    >
      <span>{{ title }}</span>
      <svg
        :class="{ 'rotate-180': isOpen }"
        class="w-5 h-5 transform transition-transform"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <div ref="content" :style="style" class="overflow-hidden transition-all duration-300">
      <div class="px-4 py-3 text-gray-600 border-t border-gray-200 bg-white">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title: string
}>()

const isOpen = ref(false)
const content = ref<HTMLElement | null>(null)
const style = ref({ maxHeight: '0px' })

const toggle = () => {
  if(!content.value) return;
  isOpen.value = !isOpen.value
  style.value = {
    maxHeight: isOpen.value ? `${content.value.scrollHeight}px` : '0px'
  }
}
</script>
