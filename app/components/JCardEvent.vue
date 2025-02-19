<template>
  <div class="w-full border">
    <div class="flex">
      <div class="w-full px-10 py-5 bg-[#FFFFFF]">
        <h5 class="text-xl font-bold">
          {{ event.name }} - {{ event.currency === 'PEN' ? 'S/' : '$' }}{{ event.price }}
        </h5>
        <span>{{ event.description }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  event: Object
})
</script>
