import { useCartStore } from "./cart.store";

export const useDeleteFromCart = (id) => {
    const deleting = useState(`deleting-${id}`, () => false);
    const cartStore = useCartStore();
    const deleteFromCart = () => {
        deleting.value = true;
        cartStore.deleteFromCart(id).finally(() => {
            deleting.value = false;
        })
    }
    return { deleting, deleteFromCart }
}