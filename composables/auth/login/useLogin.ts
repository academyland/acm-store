import { ToastEnum } from "~~/types";
import { useAuthStore } from "../Auth.store";
import { useLoginService } from "./login.service";

export const useLogin = () => {
    const loading = ref(false);
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
    const submit = (values) => {
        loading.value = true;
        error.value = "";
        login(values, { ignoreErrors: true, onError })
            .then((response) => {
                console.log("then", response);
                if (response != undefined) {
                    store.setToken(response.tokens);
                    store.setIdentity(response.identity);
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