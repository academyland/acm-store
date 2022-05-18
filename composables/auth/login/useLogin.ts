import { useAuthStore } from "../Auth.store";
import { useLoginService } from "./login.service";

export const useLogin = () => {
    const loading = ref(false);
    const { login } = useLoginService();
    const store = useAuthStore();
    const error = ref("");
    const onError = () => {
        error.value = "نام کاربری یا کلمه عبور نادرست است.";
    };
    const submit = (values) => {
        loading.value = true;
        error.value = "";
        login(values, { ignoreErrors: true, onError })
            .then((response) => {
                console.log("then", response);
                if (response != undefined) {
                    store.setToken(response.tokens);
                    store.setIdentity(response.identity);
                }
            })
            .finally(() => {
                loading.value = false;
            });
    };
    return { loading, error, submit }
}