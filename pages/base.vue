<template>
  <div class="flex flex-col space-y-3 justify-center items-center">
    <h1>my base components</h1>
    <app-button :variant="ButtonVariantEnum.secondary">دکمه</app-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ButtonVariantEnum } from "~/types";
export default defineComponent({
  setup() {
    return { ButtonVariantEnum };
  },
});
</script>
