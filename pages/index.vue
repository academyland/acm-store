<template>
  <div>
    <ul>
      <li v-for="(item, index) in data" :key="index">
        {{ item.title }}
      </li>
    </ul>
    <ul>
      <li v-for="(item, index) in mountedData" :key="index">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { data, pending, error, refresh } = useFetch(
  "https://api.nuxtjs.dev/mountains"
);
const mountedData = ref([]);
onMounted(async () => {
  mountedData.value = await $fetch("https://api.nuxtjs.dev/mountains");
});
</script>
