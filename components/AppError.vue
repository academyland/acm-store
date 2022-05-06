<template>
  <div
    v-if="message != ''"
    class="text-red-500 bg-red-100 prose-sm rounded border-red-300 p-3"
    :class="{ 'text-center': center }"
  >
    <slot>
      {{ message }}
    </slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ message?: string; center?: boolean }>();
</script>

<style lang="scss" scoped></style>
