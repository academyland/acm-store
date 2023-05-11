<template>
  <div class="min-h-[4.25rem]">
    <div
      id="the-menu"
      class="t-row justify-between px-10 py-2.5 3xl:text-sm bg-white shadow-lg"
    >
      <section>
        <button class="lg:hidden block" @click="toggleMenu">
          <the-menu-toggle-icon />
        </button>
        <div
          ref="target"
          v-bind="$attrs"
          class="rounded-box lg:rounded-none border lg:border-none shadow-lg lg:shadow-none absolute z-20 mt-3 lg:mt-0 bg-white inset-x-10 text-base-content divide-y divide-gray-200 lg:divide-y-0 lg:bg-transparent lg:static flex flex-col items-start h-0 lg:h-auto invisible lg:visible lg:flex lg:flex-row lg:items-center lg:space-x-reverse lg:space-x-2"
        >
          <router-link
            v-for="(item, index) in links"
            :key="`menu-${index}`"
            :to="item.to"
            class="w-full lg:w-auto py-3 pr-4 cursor-pointer"
          >
            {{ item.title }}
          </router-link>
        </div>
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
          <template v-if="cartStore.fetchedOnce&&cartStore.getCartCount>0">
          {{ cartStore.getCartCount }}
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
import { useCartStore } from "~~/composables/cart/cart.store";
const cartStore=useCartStore();
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
const disable = useEnableByRoute([{ name: "courses-slug" }]);
useFixMenu("#the-menu", disable);
const authStore = useAuthStore();
const { open } = useLoginDialog();
</script>

<style scoped lang="postcss">
.router-link-exact-active {
  @apply text-primary;
}
</style>
