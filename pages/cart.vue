<template>
<div>
<ClientOnly>
{{cartStore.data }}
</ClientOnly>
</div>
</template>
<script lang="ts" setup>
import { useCartStore } from '~~/composables/cart/cart.store';

const cartStore=useCartStore();
onMounted(()=>{
  if(!cartStore.fetching){
      cartStore.fetchCart();
  }
})
</script>