<template>
  <div
    class="relative min-w-min-w-24 transition duration-1000"
    :class="{ 'opacity-0': !authStore.getFullName }"
  >
    <button @click="openMenu" class="btn btn-link no-animation lg:ml-4 t-row">
      <span>
        {{ authStore.getFullName }}
      </span>

      <chevron-down-icon class="w-4 h-4 mr-1"></chevron-down-icon>
    </button>
    <div
      class="absolute inset-x-0 h-0 invisible border rounded-box top-10 z-30 bg-white"
      ref="target"
    >
      <button @click="logout" class="p-4 text-error lg:ml-4">خروج</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useMenu } from "~/composables/useMenu";
import { ChevronDownIcon } from "@heroicons/vue/outline/index.js";
import { useAuthStore } from "~~/composables/auth/Auth.store";
import { useLogout } from "~~/composables/auth/useLogout";
export default defineComponent({
  name: "MenuAuth",
  components: {
    ChevronDownIcon,
  },
  setup() {
    const { openMenu, closeMenu, target } = useMenu();
    const { logout } = useLogout();
    const authStore = useAuthStore();
    return {
      target,
      logout,
      openMenu,
      closeMenu,
      authStore,
    };
  },
});
</script>

<style scoped lang="postcss">
.router-link-exact-active {
  @apply text-primary;
}
</style>
