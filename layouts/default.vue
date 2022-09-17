<template>
  <div>
    <div>
      <!-- <client-only>
        <template v-if="authStore.isLoggedIn">
          <span>{{ authStore.getFullName }}</span>
          <button @click="logout">خروج</button>
        </template>
        <button v-else @click="() => open()">ورود/ثبت نام</button>
      </client-only> -->
    </div>
    <section class="t-col min-h-screen">
      <the-menu />
      <div class="flex flex-col flex-1">
        <nuxt-page></nuxt-page>
      </div>
      <footer>footer from layout default</footer>
    </section>
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
