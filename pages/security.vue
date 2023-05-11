<template>
    <div>
    security page
    </div>
    <a v-if="route.query.callback" :href="route.query.callback">{{route.query.callbackText}}</a>
    <h1 v-html="route.query.title"></h1>
   
</template>
<script lang="ts" setup>
 const route = useRoute();

</script>