<template>
  <Form :validation-schema="schema" @submit="submit">
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
import { Form } from "vee-validate";
import { object, string } from "yup";
const { $t } = useNuxtApp();
const schema = object({
  username: string().required().label($t("username")),
  email: string().email().required().label($t("email")),
  password: string().required().label($t("password")),
});
const loading = ref(false);
const submit = () => {
  console.log("submit");
};
</script>
