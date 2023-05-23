<template>
<h1>hi socket</h1>
<h2>{{ messageFromServer }}</h2>
<div class="w-1/2 mx-auto">
<app-text-input v-model="token" placeholder="enter token..."></app-text-input>
<app-button @click="setToken" variant="primary">set token</app-button>
<app-button @click="executeEvent" variant="secondary">send custom event</app-button>
</div>
</template>
<script setup lang="ts">
const {$socket}=useNuxtApp()
const messageFromServer=ref("");
const token=ref("");
const setToken=()=>{
    $socket.createConnectionWithToken(unref(token));
}
const executeEvent=()=>{
    $socket.io.emit("myCustomEvent","this is a message from nuxt app")
}
onMounted(()=>{
    $socket.io.on('broadcast',(message)=>{
        messageFromServer.value=message;
    })
})
</script>