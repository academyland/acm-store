<template>
  <Form @submit="submit">
    <app-text-input name="username" :label="$t('username')" />
    <app-text-input name="email" :label="$t('email')" />
    <app-text-input name="password" :label="$t('password')" type="password" />

    <app-button
      :loading="loading"
      class="btn btn-secondary btn-block"
      type="submit"
      >{{ $t("signup") }}</app-button
    >
  </Form>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";
import { Form } from "vee-validate";
import { useRegister } from "~/composables/auth/register/useRegister";
import { registerGetInputProps } from "~/composables/auth/register/register.validator";

const loading = ref(false);
const submit = () => {
  console.log("submit");
};
</script>
