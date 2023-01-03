<template>
    <div class="t-center flex-col h-screen space-y-2   bg-gradient-to-tr  from-purple-300 via-purple-100 to-purple-50 ">
        <h1 class="font-black text-5xl">
            {{ error.statusCode }}
        </h1>
        <p>
            {{ error.statusMessage }}
        </p>
            <button class="btn btn-secondary" @click="handleError">بازگشت به صفحه اصلی</button>
    </div>
  </template>
<script setup lang="ts">
    type ErrorProp= {
        statusCode: string;
        statusMessage: string;
    }
    const props = defineProps<{error:ErrorProp}>();
    const handleError = () => clearError({ redirect: '/' })
</script>
