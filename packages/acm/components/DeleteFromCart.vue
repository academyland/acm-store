<template>
    <app-button class="btn-sm" :variant="ButtonVariantEnum.secondary" @click.stop.prevent="deleteFromCart" :loading="deleting">حذف از  سبد خرید</app-button>
</template>
 <script lang="ts" setup>
    import { useDeleteFromCart } from '~~/composables/cart/useDeleteFromCart';
    import { ButtonVariantEnum } from '~~/types';
    const props=defineProps<{id:number}>()
    const {deleting,deleteFromCart}=useDeleteFromCart(props.id)
 </script>