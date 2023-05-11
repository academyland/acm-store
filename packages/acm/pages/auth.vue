<template>
  <div
    :class="{
      'p-4 bg-white rounded-lg shadow mx-3 my-4 sm:mx-auto sm:min-w-xs lg:min-w-sm':
        !isDialog,
      'px-3': isDialog,
    }"
  >
    <div class="mx-auto w-min">
      <user-icon class="w-28 h-28 text-secondary"> </user-icon>
    </div>
    <login-form
      v-if="step == LoginStep.login"
      @resetPassword="step = LoginStep.resetPassword"
    ></login-form>
    <register-form v-else-if="step === LoginStep.register"></register-form>
    <reset-password-form
      v-else-if="step === LoginStep.resetPassword"
    ></reset-password-form>
    <div class="my-8"></div>
    <div
      class="py-2.5 text-center"
      :class="{ 't-center absolute bottom-0 inset-x-0 bg-gray-100': isDialog }"
    >
      <div
        role="button"
        @click="toggleRegisterAndLogin"
        class="text-link underline"
      >
        {{ LoginStep.login == step ? "ثبت نام می کنم" : "ورود به حساب کاربری" }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LoginStep } from "~/composables/auth/Auth.enum";
import { UserIcon } from "@heroicons/vue/outline/index.js";
interface Props {
  isDialog?: boolean;
}
withDefaults(defineProps<Props>(), {
  isDialog: false,
});
const step = ref<LoginStep>(LoginStep.login);
const toggleRegisterAndLogin = () => {
  step.value =
    unref(step) == LoginStep.login ? LoginStep.register : LoginStep.login;
};
</script>
