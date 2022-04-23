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
const { data, pending, error, refresh } = useLazyAsyncData(
  "home-mountains",
  () => $fetch("https://api.nuxtjs.dev/mountains"),
  {}
);
</script>
