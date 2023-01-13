import { acceptHMRUpdate, defineStore } from 'pinia'
import { ToastEnum } from '~~/types';
import { useAuthStore } from '../auth/Auth.store';
import { CartDto } from './Cart.dto';
import { useAddToCartService, useCartListService } from './cart.service';
const defaultState = () => ({
    data: [] as unknown as CartDto[],
    fetching: true,
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
        isExistInTheCart(id) {
            return this.data.findIndex((item) => item.id === id) != -1
        },
        fetchCart(): Promise<any> {
            this.fetching = true;
            if (process.server) {
                throw Error("call fetchCart on server");
            }
            const authStore = useAuthStore();
            const { listWhenLoggedIn, listWhenNotLoggedIn } = useCartListService();
            if (authStore.isLoggedIn) {
                return listWhenLoggedIn().then((response) => {
                    if (response) {
                        this.data = response
                    }
                }).finally(() => {
                    this.fetching = false;
                })
            } else {
                const ids = this.getLocalIds;
                if (ids.length) {
                    return listWhenNotLoggedIn(ids).then((response) => {
                        if (response) {
                            this.data = response
                        }
                    }).finally(() => {
                        this.fetching = false;
                    })
                } else {
                    this.fetching = false;
                    return new Promise((resolve) => {
                        return resolve("")
                    })
                }
            }
        },
        addToCart(id): Promise<any> {
            const { showToast } = useToast();
            const authStore = useAuthStore();
            const addToCart = useAddToCartService();
            if (authStore.isLoggedIn) {

                return addToCart(id).then((response) => {
                    if (response) {
                        this.data = response
                    }
                })
            } else {
                const ids = this.getLocalIds;
                if (this.isExistInTheCart(id)) {
                    showToast({ message: 'این دوره در سبد خرید شما موجود است', type: ToastEnum.error })
                    return new Promise((resolve) => {
                        resolve("")
                    });
                }
                ids.push(id);
                localStorage.setItem("cart", JSON.stringify(ids));
                return this.fetchCart();
            }
        },
        syncIdsToStorage() {
            localStorage.setItem('cart', JSON.stringify(this.data.map((item) => item.id)))
        }
    },
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
