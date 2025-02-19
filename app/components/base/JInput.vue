<template>
  <div class="w-full">
    <div class="relative w-full">
      <label v-if="label">
        {{ label }}
      </label>
      <input
        class="peer transition-all px-5 py-2 w-full text-md text-gray-600 bg-white rounded-md border border-gray-800 outline-none select-all"
        :type="type"
        :value="modelValue"
        @input="handleInput($event)"
        @keypress="handleKeyPress($event)"
        :required="required"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :disabled="disabled"
      />
      <label
        v-if="!placeholder"
        class="z-2 text-gray-500 pointer-events-none absolute left-5 inset-y-0 h-fit flex items-center select-none transition-all text-sm peer-focus:text-sm peer-placeholder-shown:text-lg px-1 peer-focus:px-1 peer-placeholder-shown:px-0 bg-white peer-focus:bg-white peer-placeholder-shown:bg-transparent m-0 peer-focus:m-0 peer-placeholder-shown:m-auto -translate-y-1/2 peer-focus:-translate-y-1/2 peer-placeholder-shown:translate-y-0 duration-200"
        >{{ name }}</label
      >
    </div>
    <div v-show="msgError">
      {{ msgError }}
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  modelValue: string | number;
  name?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  msgError?: string;
  maxlength?: number;
  disabled?: boolean;
}
withDefaults(defineProps<Props>(), {
  modelValue: '',
  required: false,
  type: 'text',
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | number): void;
  (event: 'key-press', key: string): void;
}>();

const handleInput = (event: Event): void => {
  const inputElement = event.target as HTMLInputElement;
  emit('update:modelValue', inputElement.value);
};

const handleKeyPress = (event: KeyboardEvent): void => {
  emit('key-press', event.key);
};
</script>
