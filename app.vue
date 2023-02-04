<template>
  <div>
  <template v-if="isAuthRoute">
  <client-only>
    <nuxt-layout>
      <nuxt-page></nuxt-page>
    </nuxt-layout>
  </client-only>
  </template>
  <template v-else>
    <nuxt-layout>
      <nuxt-page></nuxt-page>
    </nuxt-layout>
  </template>
  
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
import { useCartStore } from "./composables/cart/cart.store";
const authStore = useAuthStore();
const cartStore=useCartStore();
onMounted(() => {
  authStore.fetchAndSetIdentityIfLoggedIn();
});
const {isAuthRoute}=useAuthWrapper()
const { loginModel } = useLoginDialog();
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk}-acanet` : "آکادمی لند";
  },
});
</script>
