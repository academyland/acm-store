import { useCartStore } from "~~/composables/cart/cart.store";
import { ToastEnum } from "~~/types";
import { useAuthStore } from "../Auth.store";
import { useLoginService } from "./login.service";
import { useLoginDialog } from "./useLoginDialog";

export const useLogin = () => {
    const loading = ref(false);
    const { loginCallback, loginModel } = useLoginDialog()
    const { login } = useLoginService();
    const store = useAuthStore();
    const error = ref("");
    const onError = (e) => {
        if (e?.response?.status == 401) {
            error.value = "نام کاربری یا کلمه عبور نادرست است.";
        } else {
            error.value = "خطایی رخ داده است"
        }
    };
    const { showToast } = useToast()
    const router = useRouter()
    const cartStore = useCartStore();
    const submit = (values) => {
        loading.value = true;
        error.value = "";
        login(values, { ignoreErrors: true, onError }, cartStore.getCartIDs)
            .then((response) => {
                if (response != undefined) {
                    store.setToken(response.tokens);
                    store.setIdentity(response.identity);
                    if (typeof unref(loginCallback) == 'function') {
                        unref(loginCallback)(response)
                    }
                    loginModel.value = false;
                    showToast({ message: 'به آکادمی لند خوش آمدید.', type: ToastEnum.success })
                    router.replace('/')
                }
            })
            .finally(() => {
                loading.value = false;
            });
    };
    return { loading, error, submit }
}