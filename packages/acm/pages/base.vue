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

    <div class="py-5 min-h-[12rem]">
      <app-collapse a="a" class="aaaaa">
        <template #title> title of collapse </template>
        <h2>content of collapse</h2>
      </app-collapse>
    </div>
    <h2>menu</h2>
    <div class="relative">
      <button class="btn btn-primary no-animation" @click="openMenu">
        open menu
      </button>
      <div class="bg-orange-200">
        <div
          class="absolute top-14 inset-x-0 h-0 invisible border rounded-box opacity-0 z-30 bg-white"
          ref="target"
        >
          <ul class="p-4 space-y-1">
            <li v-for="i in 3">item{{ i }}</li>
          </ul>
        </div>
      </div>
    </div>
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
    const { target, openMenu } = useMenu();
    return { ButtonVariantEnum, modal, showMessage, title, target, openMenu };
  },
});
</script>
