<template>
<app-button class="btn-sm" :variant="ButtonVariantEnum.primary" @click.stop.prevent="addToCart" :loading="adding">اضافه به سبد خرید</app-button>
</template>
<script lang="ts" setup>
import { useAddToCart } from '~~/composables/cart/useAddToCart';
import { ButtonVariantEnum } from '~~/types';
// const addToCart=()=>{
// //    alert("add to cart clicked")
// }
// const adding=ref()
const props=defineProps<{id:number}>()
const {adding,addToCart}=useAddToCart(props.id)
</script>