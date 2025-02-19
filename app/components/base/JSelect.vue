<template>
  <div class="w-full">
    <label for="countries">{{ label }}</label>
    <select
      id="countries"
      class="border px-5 py-2 border-gray-800 text-gray-600 text-md rounded-md outline-none focus:ring-gray-600 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-6000 dark:focus:border-gray-600"
      :required="required"
      v-model="selectedValue"
      @change="emitValue"
    >
      <option :value="i" v-for="i of items">{{ i }}</option>
    </select>
  </div>
</template>
<script setup lang="ts">
interface Props {
  label?: string
  items?: any[]
  required?: boolean
  modelValue?: string | null
}
const props = withDefaults(defineProps<Props>(), {
  required: false,
  modelValue: null,
})

const emit = defineEmits(['update:modelValue'])

const selectedValue = ref(props.modelValue)
const emitValue = () => {
  emit('update:modelValue', selectedValue.value)
}
</script>
