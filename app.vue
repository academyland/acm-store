<template>
  <div>
    <nuxt-layout>
      <nuxt-page></nuxt-page>
    </nuxt-layout>
    <the-toast></the-toast>
    <app-modal v-model="loginModel">
      <auth is-dialog></auth>
    </app-modal>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "./composables/auth/Auth.store";
import Auth from "./pages/auth.vue";
import { useLoginDialog } from "~/composables/auth/login/useLoginDialog";
const authStore = useAuthStore();
onMounted(() => {
  authStore.fetchAndSetIdentityIfLoggedIn();
});
const { loginModel } = useLoginDialog();
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk}-acanet` : "آکادمی لند";
  },
});
</script>
