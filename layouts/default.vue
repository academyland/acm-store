<template>
  <div>
    <button @click="openLoginDialog">click</button>
    <nuxt-page></nuxt-page>
    <footer>footer from layout default</footer>
  </div>
</template>

<script lang="ts" setup>
import { useLoginDialog } from "~~/composables/auth/login/useLoginDialog";

const { open } = useLoginDialog();
const openLoginDialog = () => {
  open(() => {
    console.log("executed!");
  });
};
</script>
