<template>
  <Form :validation-schema="schema" @submit="submit">
    <app-error center :message="error" class="mt-1 mb-4"></app-error>
    <app-text-input name="username" :label="$t('username')" />
    <app-text-input name="password" :label="$t('password')" type="password" />
    <div class="w-full flex justify-end -mt-2 mb-2">
      <div
        @click="resetPasswordClick"
        role="button"
        class="text-gray-500 text-sm underline"
      >
        کلمه عبورم را فراموش کرده ام
      </div>
    </div>

    <app-button
      :loading="loading"
      class="btn btn-secondary btn-block"
      type="submit"
      >{{ $t("login") }}</app-button
    >
  </Form>
</template>

<script lang="ts" setup>
import { Form } from "vee-validate";
import { useLogin } from "~~/composables/auth/login/useLogin";
import { useLoginValidator } from "~~/composables/auth/login/login.validator";
const emit = defineEmits(["resetPassword"]);
const resetPasswordClick = () => {
  emit("resetPassword");
};
const { schema } = useLoginValidator();
const { loading, error, submit } = useLogin();
</script>
