import { useCartStore } from "~~/composables/cart/cart.store"

export default defineNuxtPlugin(({ pinia }) => {
    const cartStore = useCartStore(pinia);
    cartStore.$subscribe(() => {
        cartStore.syncIdsToStorage();
    })
    cartStore.fetchCart();
})