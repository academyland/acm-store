<template>
  <Form @submit="submit">
    <app-text-input name="email" :label="$t('email')" />
    <app-button
      :loading="loading"
      class="btn btn-secondary btn-block"
      type="submit"
    >
      ارسال ایمیل بازنشانی</app-button
    >
  </Form>
</template>

<script lang="ts" setup>
import { Form } from "vee-validate";
import { useRequestPasswordReset } from "~/composables/auth/resetPassword/useResetPassword";
import { resetPasswordGetInputProps } from "~/composables/auth/resetPassword/resetPassword.validator";
import { defineComponent } from "vue";
import { useRegister } from "~/composables/auth/register/useRegister";
import { registerGetInputProps } from "~/composables/auth/register/register.validator";

const loading = ref(false);
const submit = () => {
  console.log("submit");
};
</script>
