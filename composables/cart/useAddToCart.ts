import { useCartStore } from "./cart.store";

export const useAddToCart = (id) => {
    const adding = useState(`adding-${id}`, () => false);
    const cartStore = useCartStore();
    const addToCart = () => {
        adding.value = true;
        cartStore.addToCart(id).finally(() => {
            adding.value = false;
        })
    }
    return { adding, addToCart }
}