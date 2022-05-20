<template>
  <div>
    <nuxt-layout>
      <nuxt-page></nuxt-page>
    </nuxt-layout>
    <the-toast></the-toast>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "./composables/auth/Auth.store";

const authStore = useAuthStore();
onMounted(() => {
  authStore.fetchAndSetIdentityIfLoggedIn();
});
</script>
