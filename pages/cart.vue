<template>

</template>
<script lang="ts" setup>
import { useCartStore } from '~~/composables/cart/cart.store';

const cartStore=useCartStore();
onMounted(()=>{
    cartStore.fetchCart();
    cartStore.addToCart(1)
})
</script>