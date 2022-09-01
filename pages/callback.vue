<template>
  <client-only>
    <div>
      <h1>callback</h1>
      <nuxt-link to="/">home</nuxt-link>
    </div>
  </client-only>
</template>
<script lang="ts" setup>
onMounted(() => {
  console.log("mounted called");
});
</script>
