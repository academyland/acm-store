<template>
  <div class="min-h-[4.25rem]">
    <div
      id="the-menu"
      class="t-row justify-between px-10 py-2.5 3xl:text-sm bg-white shadow-lg"
    >
      <section>
        <!-- TODO implement menu -->
      </section>
      <section class="t-row">
        <client-only>
          <button
            class="btn btn-link no-animation lg:ml-4"
            @click="() => open()"
            v-if="!authStore.isLoggedIn"
          >
            ورود / ثبت نام
          </button>
          <template v-else>
            <the-menu-auth></the-menu-auth>
          </template>
        </client-only>

        <router-link class="!text-gray-600 font-bold" to="/">
          آکادمی لند
        </router-link>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";

import { useMenu } from "~/composables/useMenu";
import { useAuthStore } from "~~/composables/auth/Auth.store";
import { useLoginDialog } from "~~/composables/auth/login/useLoginDialog";

const links = [
  {
    title: "صفحه اصلی",
    to: "/",
  },
  {
    title: "دوره های آموزشی",
    to: "/courses",
  },
  {
    title: "مقالات",
    to: "/articles",
  },
  {
    title: "درباره آکادمی لند",
    to: "/about",
  },
];
const { toggleMenu, target } = useMenu();
// const disable = useEnableByRoute([{ name: "courses-slug" }]);
// const { isFixed } = useFixMenu("#the-menu", disable);
const authStore = useAuthStore();
const { open } = useLoginDialog();
</script>

<style scoped lang="postcss">
.router-link-exact-active {
  @apply text-primary;
}
</style>
