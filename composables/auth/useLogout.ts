import { isAuthRoute } from "~~/helpers/authHelper";
import { useAuthStore } from "./Auth.store";

export const useLogout = () => {
    const route = useRoute();
    const authStore = useAuthStore();
    const $router = useRouter();
    const logout = async () => {
        authStore.clearStore();
        if (isAuthRoute(route.path)) {
            $router.replace("/")
        }
    }
    return { logout };
}