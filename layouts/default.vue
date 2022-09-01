<template>
  <div>
    <div>
      <client-only>
        <template v-if="authStore.isLoggedIn">
          <span>{{ authStore.getFullName }}</span>
          <button @click="logout">خروج</button>
        </template>
        <button v-else @click="() => open()">ورود/ثبت نام</button>
      </client-only>
    </div>

    <nuxt-page></nuxt-page>
    <footer>footer from layout default</footer>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~~/composables/auth/Auth.store";
import { useLoginDialog } from "~~/composables/auth/login/useLoginDialog";
import { useLogout } from "~~/composables/auth/useLogout";
const authStore = useAuthStore();
const { open } = useLoginDialog();
const { logout } = useLogout();
</script>
