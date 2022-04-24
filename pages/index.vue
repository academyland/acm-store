<template>
  <div>
    <div v-if="pending">loading...</div>
    <ul v-else>
      <li v-for="(item, index) in data" :key="index">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useFetchApi } from "~/composables/api/useFetchApi.ts";
const $fetch = useFetchApi();
const { data, pending, error, refresh } = useLazyAsyncData(
  "home-mountains",
  () => $fetch("/course/index"),
  { server: false }
);
</script>
