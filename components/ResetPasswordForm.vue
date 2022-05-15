<template>
  <Form :validation-schema="schema" @submit="submit">
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
import { object, string } from "yup";
const { $t } = useNuxtApp();
const schema = object({
  email: string().email().required().label($t("email")),
});
const loading = ref(false);
const submit = () => {
  console.log("submit");
};
</script>
