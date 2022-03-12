<template>
  <div class="flex flex-col space-y-3 justify-center items-center h-[120vh]">
    <h1>my base components</h1>
    <app-button @click="modal = true" :variant="ButtonVariantEnum.secondary"
      >دکمه</app-button
    >
    <app-modal v-model="modal">
      <h1>hi</h1>
    </app-modal>
    <app-button @click="showMessage" :variant="ButtonVariantEnum.secondary"
      >show toast</app-button
    >
    <app-text-input name="title" v-model="title"></app-text-input>
    {{ title }}
    <base-text-input v-model="title"></base-text-input>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ButtonVariantEnum, ToastEnum } from "~/types";
export default defineComponent({
  setup() {
    const modal = ref(false);
    const { showToast } = useToast();
    const showMessage = () => {
      showToast({ message: "با موفقیت انجام شد.", type: ToastEnum.success });
    };
    const title = ref("hi");
    return { ButtonVariantEnum, modal, showMessage, title };
  },
});
</script>
