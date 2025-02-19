<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white w-96 rounded-lg shadow-lg p-8">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
interface Props {
  isOpen: boolean
}
withDefaults(defineProps<Props>(), {
  isOpen: true,
})
</script>
