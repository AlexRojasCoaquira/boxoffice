<template>
    <button
      @click="$emit('click')"
      :disabled="disabled || loading"
      :class="{ 'jn-btn--loading': loading }"
      type="button"
      class="jn-btn relative font-semibold"
    >
      <span class="btn-text">
        <slot></slot>
      </span>
      <div class="btn-loading">
        <i class="fa fa-spinner fa-pulse fa-sm fa-fw"></i>
      </div>
    </button>
  </template>

  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';

  defineProps<{
    loading?: boolean;
    disabled?: boolean;
  }>();

  defineEmits<{
    (event: 'click'): void;
  }>();
  </script>

  <style lang="scss">
    .jn-btn {
      position: relative;
      padding-left: 1rem;
      padding-right: 1rem;
      font-weight: 600;
      background: #00E0B1;
      border: none;
      border-radius: 24px;
      padding: 12px 16px;

      &.jn-btn--loading {
        .btn-text {
          opacity: 0;
        }
        .btn-loading {
          display: flex;
        }
      }

      .btn-loading {
        display: none;
        margin: 0 auto;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        align-items: center;
        justify-content: center;
      }
    }
  </style>
