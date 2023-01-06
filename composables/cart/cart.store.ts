import { acceptHMRUpdate, defineStore } from 'pinia'
import { useAuthStore } from '../auth/Auth.store';
import { CartDto } from './Cart.dto';
import { useAddToCartService, useCartListService } from './cart.service';
const defaultState = () => ({
    data: [] as unknown as CartDto[]
})
export const useCartStore = defineStore('cart', {
    state: defaultState,
    getters: {
        getCartCount(state) {
            return state.data.length;
        },
        getLocalIds() {
            const data = localStorage.getItem("cart");
            return data ? JSON.parse(data) : [];
        }
    },
    actions: {
        fetchCart() {
            if (process.server) {
                throw Error("call fetchCart on server");
            }
            const authStore = useAuthStore();
            const { listWhenLoggedIn, listWhenNotLoggedIn } = useCartListService();
            if (authStore.isLoggedIn) {
                listWhenLoggedIn().then((response) => {
                    if (response) {
                        this.data = response
                    }
                })
            } else {
                const ids = this.getLocalIds();
                if (ids.length) {
                    listWhenNotLoggedIn(ids).then((response) => {
                        if (response) {
                            this.data = response
                        }
                    })
                }
            }
        },
        addToCart(id) {
            const authStore = useAuthStore();
            const addToCart = useAddToCartService();
            if (authStore.isLoggedIn) {
                addToCart(id).then((response) => {
                    if (response) {
                        this.data = response
                    }
                })
            } else {
                const ids = this.getLocalIds();
                //TODO check if id exist in ids show toast error
                ids.push(id);
                localStorage.setItem("cart", ids);
                this.fetchCart();
            }
        }
    },
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
